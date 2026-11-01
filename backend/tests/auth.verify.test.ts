import { beforeEach, describe, expect, it, vi } from 'vitest'
import request from 'supertest'
import { createApp } from '../src/create-app.js'
import { prisma } from '../src/utils/prisma.js'
import { resetDb } from './helpers/db.js'

vi.mock('../src/services/email.service.js', () => ({
  sendVerificationEmail: vi.fn(async () => {}),
  sendPasswordResetEmail: vi.fn(async () => {}),
  sendPasswordChangedEmail: vi.fn(async () => {}),
  sendNewDeviceEmail: vi.fn(async () => {}),
  sendLoginAlertEmail: vi.fn(async () => {})
}))

const { sendVerificationEmail } = await import('../src/services/email.service.js')
const mockedSendVerification = vi.mocked(sendVerificationEmail)

const app = createApp()

async function registerAndGetToken(email: string): Promise<string> {
  await request(app)
    .post('/api/v1/auth/register')
    .send({ fullName: 'Ada Lovelace', email, password: 'SuperSecret123!', acceptTerms: true })

  const call = mockedSendVerification.mock.calls.at(-1)
  expect(call).toBeDefined()
  const link = call![1]
  return link.split('token=')[1] as string
}

beforeEach(async () => {
  await resetDb()
  mockedSendVerification.mockClear()
})

describe('POST /api/v1/auth/email/verify', () => {
  it('activates a pending user with a valid token', async () => {
    const token = await registerAndGetToken('verify@example.com')

    const res = await request(app).post('/api/v1/auth/email/verify').send({ token })

    expect(res.status).toBe(200)
    expect(res.body.data.status).toBe('active')

    const user = await prisma.user.findUnique({ where: { email: 'verify@example.com' } })
    expect(user?.status).toBe('active')
  })

  it('is idempotent when an already-consumed token belongs to an active account', async () => {
    const token = await registerAndGetToken('reuse@example.com')
    await request(app).post('/api/v1/auth/email/verify').send({ token })
    const res = await request(app).post('/api/v1/auth/email/verify').send({ token })
    expect(res.status).toBe(200)
    expect(res.body.data.status).toBe('active')

    const user = await prisma.user.findUnique({ where: { email: 'reuse@example.com' } })
    expect(user?.status).toBe('active')
  })

  it('rejects an unknown token with validation error', async () => {
    const res = await request(app)
      .post('/api/v1/auth/email/verify')
      .send({ token: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' })
    expect(res.status).toBe(400)
    expect(res.body.error.code).toBe('VALIDATION_ERROR')
  })

  it('returns 410 for an expired token', async () => {
    const token = await registerAndGetToken('expired@example.com')
    await prisma.emailToken.updateMany({
      data: { expiresAt: new Date(Date.now() - 60_000) }
    })
    const res = await request(app).post('/api/v1/auth/email/verify').send({ token })
    expect(res.status).toBe(410)
    expect(res.body.error.code).toBe('TOKEN_EXPIRED')
  })

  it('rejects malformed token shapes', async () => {
    const res = await request(app).post('/api/v1/auth/email/verify').send({ token: 'x' })
    expect(res.status).toBe(400)
    expect(res.body.error.code).toBe('VALIDATION_ERROR')
  })
})

describe('POST /api/v1/auth/password/forgot + /password/reset', () => {
  beforeEach(() => {
    mockedSendVerification.mockClear()
  })

  it('resets the password and revokes sessions', async () => {
    const { sendPasswordResetEmail } = await import('../src/services/email.service.js')
    const mockedResetMail = vi.mocked(sendPasswordResetEmail)

    const reg = await request(app)
      .post('/api/v1/auth/register')
      .send({ fullName: 'Reset User', email: 'reset@example.com', password: 'SuperSecret123!', acceptTerms: true })
    expect(reg.status).toBe(201)

    const forgotRes = await request(app)
      .post('/api/v1/auth/password/forgot')
      .send({ email: 'reset@example.com' })
    expect(forgotRes.status).toBe(202)

    expect(mockedResetMail).toHaveBeenCalledTimes(1)
    const resetLink = mockedResetMail.mock.calls[0]![1]
    const token = resetLink.split('token=')[1] as string

    const weak = await request(app)
      .post('/api/v1/auth/password/reset')
      .send({ token, password: 'short' })
    expect(weak.status).toBe(400)
    expect(weak.body.error.code).toBe('VALIDATION_ERROR')

    const ok = await request(app)
      .post('/api/v1/auth/password/reset')
      .send({ token, password: 'NewPassword789!' })
    expect(ok.status).toBe(204)

    const loginOld = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'reset@example.com', password: 'SuperSecret123!' })
    expect(loginOld.status).toBe(401)

    const loginNew = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'reset@example.com', password: 'NewPassword789!' })
    expect(loginNew.status).toBe(200)
  })

  it('responds identically for unknown emails', async () => {
    const res = await request(app)
      .post('/api/v1/auth/password/forgot')
      .send({ email: 'nobody@example.com' })
    expect(res.status).toBe(202)
    expect(res.body.success).toBe(true)
  })
})
