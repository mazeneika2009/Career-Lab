import { beforeEach, describe, expect, it, vi } from 'vitest'
import request from 'supertest'
import type { Response } from 'supertest'
import { createApp } from '../src/app.js'
import { createActiveUser, getCookie, resetDb } from './helpers/db.js'

vi.mock('../src/services/email.service.js', () => ({
  sendVerificationEmail: vi.fn(async () => {}),
  sendPasswordResetEmail: vi.fn(async () => {}),
  sendPasswordChangedEmail: vi.fn(async () => {}),
  sendNewDeviceEmail: vi.fn(async () => {}),
  sendLoginAlertEmail: vi.fn(async () => {})
}))

const app = createApp()

interface CapturedLogin {
  accessToken: string
  refreshCookie: string
  csrf: string
}

async function login(
  email: string,
  password: string,
  ua = 'Chrome/126.0'
): Promise<CapturedLogin> {
  const res: Response = await request(app)
    .post('/api/v1/auth/login')
    .set('User-Agent', `Mozilla/5.0 (Windows NT 10.0) ${ua}`)
    .send({ email, password })
  expect(res.status).toBe(200)
  return {
    accessToken: res.body.data.accessToken,
    refreshCookie: getCookie(res.headers['set-cookie'], 'cl_refresh') as string,
    csrf: getCookie(res.headers['set-cookie'], 'cl_csrf') as string
  }
}

beforeEach(async () => {
  await resetDb()
})

describe('PATCH /api/v1/auth/password', () => {
  it('rejects a wrong current password', async () => {
    const user = await createActiveUser('chpw@example.com')
    const session = await login(user.email, user.password)

    const res = await request(app)
      .patch('/api/v1/auth/password')
      .set('Authorization', `Bearer ${session.accessToken}`)
      .send({ currentPassword: 'WrongPassword123!', newPassword: 'FreshPassword999!' })

    expect(res.status).toBe(401)
    expect(res.body.error.code).toBe('INVALID_CREDENTIALS')
  })

  it('changes the password, keeps the current session and revokes others', async () => {
    const user = await createActiveUser('chpw2@example.com')
    const currentSession = await login(user.email, user.password, 'Chrome/126.0')
    const otherDevice = await login(user.email, user.password, 'Firefox/128.0')

    const res = await request(app)
      .patch('/api/v1/auth/password')
      .set('Authorization', `Bearer ${currentSession.accessToken}`)
      .send({ currentPassword: user.password, newPassword: 'FreshPassword999!' })

    expect(res.status).toBe(204)

    const stillWorks = await request(app)
      .get('/api/v1/users/me')
      .set('Authorization', `Bearer ${currentSession.accessToken}`)
    expect(stillWorks.status).toBe(200)

    const revokedRefresh = await request(app)
      .post('/api/v1/auth/refresh')
      .set('Cookie', `${otherDevice.refreshCookie}; ${otherDevice.csrf}`)
      .set('x-csrf-token', otherDevice.csrf.replace('cl_csrf=', ''))
    expect(revokedRefresh.status).toBe(401)

    const loginOld = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: user.email, password: user.password })
    expect(loginOld.status).toBe(401)

    const loginNew = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: user.email, password: 'FreshPassword999!' })
    expect(loginNew.status).toBe(200)
  })

  it('rejects when the new password equals the current one', async () => {
    const user = await createActiveUser('chpw3@example.com')
    const session = await login(user.email, user.password)

    const res = await request(app)
      .patch('/api/v1/auth/password')
      .set('Authorization', `Bearer ${session.accessToken}`)
      .send({ currentPassword: user.password, newPassword: user.password })

    expect(res.status).toBe(400)
    expect(res.body.error.code).toBe('VALIDATION_ERROR')
  })
})
