import { beforeEach, describe, expect, it, vi } from 'vitest'
import request from 'supertest'
import type { Response } from 'supertest'
import { createApp } from '../src/create-app.js'
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

async function login(email: string, password: string): Promise<CapturedLogin> {
  const res: Response = await request(app)
    .post('/api/v1/auth/login')
    .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0) Chrome/126.0')
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

describe('POST /api/v1/auth/refresh', () => {
  it('rotates the refresh token and issues a new access token', async () => {
    await createActiveUser('refresh@example.com')
    const first = await login('refresh@example.com', 'ValidPassword123!')

    const res = await request(app)
      .post('/api/v1/auth/refresh')
      .set('Cookie', `${first.refreshCookie}; ${first.csrf}`)
      .set('x-csrf-token', first.csrf.replace('cl_csrf=', ''))

    expect(res.status).toBe(200)
    const newAccess = res.body.data.accessToken as string
    expect(newAccess).not.toBe(first.accessToken)

    const me = await request(app).get('/api/v1/users/me').set('Authorization', `Bearer ${newAccess}`)
    expect(me.status).toBe(200)
  })

  it('rejects refresh without a matching CSRF token', async () => {
    await createActiveUser('csrf@example.com')
    const session = await login('csrf@example.com', 'ValidPassword123!')

    const res = await request(app)
      .post('/api/v1/auth/refresh')
      .set('Cookie', session.refreshCookie)

    expect(res.status).toBe(403)
    expect(res.body.error.code).toBe('CSRF_INVALID')
  })

  it('rejects an unknown refresh token', async () => {
    await createActiveUser('unknown-token@example.com')
    const session = await login('unknown-token@example.com', 'ValidPassword123!')

    const res = await request(app)
      .post('/api/v1/auth/refresh')
      .set('Cookie', `cl_refresh=definitely-not-a-real-token-value-1234567890; ${session.csrf}`)
      .set('x-csrf-token', session.csrf.replace('cl_csrf=', ''))

    expect(res.status).toBe(401)
    expect(res.body.error.code).toBe('TOKEN_EXPIRED')
  })

  it('detects reuse of a rotated token and revokes the whole family', async () => {
    await createActiveUser('reuse@example.com')
    const original = await login('reuse@example.com', 'ValidPassword123!')

    const rotated = await request(app)
      .post('/api/v1/auth/refresh')
      .set('Cookie', `${original.refreshCookie}; ${original.csrf}`)
      .set('x-csrf-token', original.csrf.replace('cl_csrf=', ''))
    expect(rotated.status).toBe(200)
    const rotatedRefresh = getCookie(rotated.headers['set-cookie'], 'cl_refresh') as string

    const replay = await request(app)
      .post('/api/v1/auth/refresh')
      .set('Cookie', `${original.refreshCookie}; ${original.csrf}`)
      .set('x-csrf-token', original.csrf.replace('cl_csrf=', ''))
    expect(replay.status).toBe(401)
    expect(replay.body.error.code).toBe('REFRESH_REUSE_DETECTED')

    const afterReuse = await request(app)
      .post('/api/v1/auth/refresh')
      .set('Cookie', `${rotatedRefresh}; ${original.csrf}`)
      .set('x-csrf-token', original.csrf.replace('cl_csrf=', ''))
    expect(afterReuse.status).toBe(401)
    expect(afterReuse.body.error.code).toBe('TOKEN_EXPIRED')
  })
})
