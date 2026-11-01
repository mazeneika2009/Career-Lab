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

async function login(email: string, password: string, ua = 'Chrome/126.0'): Promise<CapturedLogin> {
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

interface CapturedLogin {
  accessToken: string
  refreshCookie: string
  csrf: string
}

beforeEach(async () => {
  await resetDb()
})

describe('GET/DELETE /api/v1/auth/sessions', () => {
  it('lists active sessions and marks the current one', async () => {
    const user = await createActiveUser('sessions@example.com')
    const a = await login(user.email, user.password, 'Chrome/126.0')
    await login(user.email, user.password, 'Firefox/128.0')

    const res: Response = await request(app)
      .get('/api/v1/auth/sessions')
      .set('Authorization', `Bearer ${a.accessToken}`)

    expect(res.status).toBe(200)
    expect(res.body.data).toHaveLength(2)

    const current = res.body.data.filter((s: { isCurrent: boolean }) => s.isCurrent)
    expect(current).toHaveLength(1)
    expect(current[0].device).toContain('Chrome')
  })

  it('revokes an owned session but returns 404 for another user session', async () => {
    const owner = await createActiveUser('owner@example.com')
    const attacker = await createActiveUser('attacker@example.com', 'OtherPassword456!')

    const ownerSession = await login(owner.email, owner.password, 'Firefox/128.0')
    const ownerOtherDevice = await login(owner.email, owner.password, 'Edge/126.0')
    const attackerSession = await login(attacker.email, attacker.password)

    const listRes: Response = await request(app)
      .get('/api/v1/auth/sessions')
      .set('Authorization', `Bearer ${ownerSession.accessToken}`)
    expect(listRes.body.data).toHaveLength(2)
    const targetId = listRes.body.data.find(
      (s: { isCurrent: boolean }) => !s.isCurrent
    ).id as string

    const forbidden = await request(app)
      .delete(`/api/v1/auth/sessions/${targetId}`)
      .set('Authorization', `Bearer ${attackerSession.accessToken}`)
    expect(forbidden.status).toBe(404)
    expect(forbidden.body.error.code).toBe('NOT_FOUND')

    const ok = await request(app)
      .delete(`/api/v1/auth/sessions/${targetId}`)
      .set('Authorization', `Bearer ${ownerSession.accessToken}`)
    expect(ok.status).toBe(204)

    const revokedRefresh = await request(app)
      .post('/api/v1/auth/refresh')
      .set('Cookie', `${ownerOtherDevice.refreshCookie}; ${ownerOtherDevice.csrf}`)
      .set('x-csrf-token', ownerOtherDevice.csrf.replace('cl_csrf=', ''))
    expect(revokedRefresh.status).toBe(401)
  })
})

describe('POST /api/v1/auth/logout + /logout-all', () => {
  it('logs out the current session only', async () => {
    const user = await createActiveUser('logout@example.com')
    const first = await login(user.email, user.password, 'Chrome/126.0')
    const second = await login(user.email, user.password, 'Firefox/128.0')

    const out = await request(app)
      .post('/api/v1/auth/logout')
      .set('Authorization', `Bearer ${first.accessToken}`)
    expect(out.status).toBe(204)

    const meFirst = await request(app)
      .get('/api/v1/users/me')
      .set('Authorization', `Bearer ${first.accessToken}`)
    expect(meFirst.status).toBe(401)

    const meSecond = await request(app)
      .get('/api/v1/users/me')
      .set('Authorization', `Bearer ${second.accessToken}`)
    expect(meSecond.status).toBe(200)
  })

  it('logs out every session on logout-all', async () => {
    const user = await createActiveUser('logoutall@example.com')
    const a = await login(user.email, user.password, 'Chrome/126.0')
    const b = await login(user.email, user.password, 'Firefox/128.0')

    const all = await request(app)
      .post('/api/v1/auth/logout-all')
      .set('Authorization', `Bearer ${a.accessToken}`)
    expect(all.status).toBe(204)

    for (const session of [a, b]) {
      const me = await request(app)
        .get('/api/v1/users/me')
        .set('Authorization', `Bearer ${session.accessToken}`)
      expect(me.status).toBe(401)
    }
  })
})
