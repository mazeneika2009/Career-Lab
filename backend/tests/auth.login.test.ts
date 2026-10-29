import { beforeEach, describe, expect, it, vi } from 'vitest'
import request from 'supertest'
import { createApp } from '../src/app.js'
import { prisma } from '../src/utils/prisma.js'
import { createActiveUser, getCookie, resetDb } from './helpers/db.js'

vi.mock('../src/services/email.service.js', () => ({
  sendVerificationEmail: vi.fn(async () => {}),
  sendPasswordResetEmail: vi.fn(async () => {}),
  sendPasswordChangedEmail: vi.fn(async () => {}),
  sendNewDeviceEmail: vi.fn(async () => {}),
  sendLoginAlertEmail: vi.fn(async () => {})
}))

const app = createApp()

beforeEach(async () => {
  await resetDb()
})

describe('POST /api/v1/auth/login', () => {
  it('rejects unverified accounts with EMAIL_NOT_VERIFIED', async () => {
    await request(app)
      .post('/api/v1/auth/register')
      .send({ fullName: 'Pending User', email: 'pending@example.com', password: 'SuperSecret123!', acceptTerms: true })

    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'pending@example.com', password: 'SuperSecret123!' })

    expect(res.status).toBe(403)
    expect(res.body.error.code).toBe('EMAIL_NOT_VERIFIED')
  })

  it('returns identical errors for unknown email and wrong password', async () => {
    await createActiveUser('known@example.com')

    const unknownEmail = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'ghost@example.com', password: 'Whatever123!' })
    const wrongPassword = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'known@example.com', password: 'Whatever123!' })

    expect(unknownEmail.status).toBe(401)
    expect(wrongPassword.status).toBe(401)
    expect(unknownEmail.body.error.code).toBe('INVALID_CREDENTIALS')
    expect(wrongPassword.body.error.code).toBe('INVALID_CREDENTIALS')
    expect(unknownEmail.body.error.message).toBe(wrongPassword.body.error.message)
  })

  it('logs in an active user, sets cookies and returns a usable access token', async () => {
    await createActiveUser('active@example.com', 'ValidPassword123!')

    const res = await request(app)
      .post('/api/v1/auth/login')
      .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0) Chrome/126.0')
      .send({ email: 'active@example.com', password: 'ValidPassword123!' })

    expect(res.status).toBe(200)
    expect(typeof res.body.data.accessToken).toBe('string')
    expect(res.body.data.expiresIn).toBeGreaterThan(0)
    expect(res.body.data.user.email).toBe('active@example.com')
    expect(res.body.data.user.roles).toEqual(['student'])

    expect(getCookie(res.headers['set-cookie'], 'cl_refresh')).toMatch(/^cl_refresh=/)
    expect(getCookie(res.headers['set-cookie'], 'cl_csrf')).toMatch(/^cl_csrf=/)

    // Double-submit CSRF must be readable by the SPA on app routes; the
    // refresh token stays scoped to the auth endpoints.
    const setCookies = res.headers['set-cookie'] as unknown as string[]
    const csrfCookie = setCookies.find((cookie) => cookie.startsWith('cl_csrf='))
    const refreshCookie = setCookies.find((cookie) => cookie.startsWith('cl_refresh='))
    expect(csrfCookie).toMatch(/Path=\/(?:;|$)/)
    expect(refreshCookie).toMatch(/Path=\/api\/v1\/auth(?:;|$)/)

    const me = await request(app)
      .get('/api/v1/users/me')
      .set('Authorization', `Bearer ${res.body.data.accessToken}`)
    expect(me.status).toBe(200)
    expect(me.body.data.displayName).toBe('Test User')
  })

  it('sends a login security alert after every successful login', async () => {
    await createActiveUser('alert@example.com', 'ValidPassword123!')
    const { sendLoginAlertEmail } = await import('../src/services/email.service.js')
    const alertMock = vi.mocked(sendLoginAlertEmail)
    alertMock.mockClear()

    const res = await request(app)
      .post('/api/v1/auth/login')
      .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0) Chrome/126.0')
      .send({ email: 'alert@example.com', password: 'ValidPassword123!' })

    expect(res.status).toBe(200)
    await vi.waitFor(() => expect(alertMock).toHaveBeenCalledTimes(1))
    expect(alertMock).toHaveBeenCalledWith(
      'alert@example.com',
      expect.objectContaining({
        when: expect.any(Date),
        timeZone: 'UTC',
        device: 'Chrome · Windows'
      })
    )
  })

  it('still completes login when the security alert email fails', async () => {
    await createActiveUser('alert-fail@example.com', 'ValidPassword123!')
    const { sendLoginAlertEmail } = await import('../src/services/email.service.js')
    const alertMock = vi.mocked(sendLoginAlertEmail)
    alertMock.mockClear()
    alertMock.mockRejectedValueOnce(new Error('smtp unavailable'))

    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'alert-fail@example.com', password: 'ValidPassword123!' })

    expect(res.status).toBe(200)
    expect(typeof res.body.data.accessToken).toBe('string')
    await vi.waitFor(() => expect(alertMock).toHaveBeenCalledTimes(1))
  })

  it('locks the account after repeated failures with exponential backoff', async () => {
    await createActiveUser('lockout@example.com')

    for (let i = 0; i < 5; i++) {
      const fail = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'lockout@example.com', password: 'WrongPassword123!' })
      expect(fail.status).toBe(401)
    }

    const locked = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'lockout@example.com', password: 'WrongPassword123!' })

    expect(locked.status).toBe(423)
    expect(locked.body.error.code).toBe('ACCOUNT_LOCKED')
    expect(locked.body.error.details.retryAfterSeconds).toBeGreaterThan(0)

    const user = await prisma.user.findUnique({ where: { email: 'lockout@example.com' } })
    expect(user?.failedLoginCount).toBeGreaterThanOrEqual(5)
    expect(user?.lockedUntil?.getTime()).toBeGreaterThan(Date.now())
  })

  it('resets failure counters after a successful login', async () => {
    await createActiveUser('recover@example.com')

    await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'recover@example.com', password: 'WrongPassword123!' })

    const ok = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'recover@example.com', password: 'ValidPassword123!' })
    expect(ok.status).toBe(200)

    const user = await prisma.user.findUnique({ where: { email: 'recover@example.com' } })
    expect(user?.failedLoginCount).toBe(0)
    expect(user?.lockedUntil).toBeNull()
  })
})
