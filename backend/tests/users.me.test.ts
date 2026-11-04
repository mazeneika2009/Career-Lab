import { beforeEach, describe, expect, it, vi } from 'vitest'
import request from 'supertest'
import { createApp } from '../src/create-app.js'
import { createActiveUser, resetDb } from './helpers/db.js'
import { prisma } from '../src/utils/prisma.js'

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

describe('authorization matrix v1 (identity surface)', () => {
  it('anonymous callers are rejected on protected endpoints', async () => {
    const cases: Array<{ method: 'get' | 'patch' | 'post' | 'delete'; path: string }> = [
      { method: 'get', path: '/api/v1/users/me' },
      { method: 'patch', path: '/api/v1/users/me' },
      { method: 'delete', path: '/api/v1/users/me' },
      { method: 'get', path: '/api/v1/auth/sessions' },
      { method: 'post', path: '/api/v1/auth/logout' }
    ]

    for (const c of cases) {
      const pending =
        c.method === 'get'
          ? request(app).get(c.path)
          : c.method === 'patch'
            ? request(app).patch(c.path)
            : c.method === 'delete'
              ? request(app).delete(c.path)
              : request(app).post(c.path)
      const res = await pending
      expect(res.status, `${c.method.toUpperCase()} ${c.path}`).toBe(401)
      expect(['UNAUTHENTICATED']).toContain(res.body.error.code)
    }
  })

  it('garbage bearer tokens are rejected as expired/invalid', async () => {
    const res = await request(app)
      .get('/api/v1/users/me')
      .set('Authorization', 'Bearer not.a.jwt')
    expect(res.status).toBe(401)
    expect(res.body.error.code).toBe('TOKEN_EXPIRED')
  })
})

describe('GET/PATCH /api/v1/users/me', () => {
  it('returns the authenticated profile with roles and permissions', async () => {
    const user = await createActiveUser('me@example.com', 'ValidPassword123!', 'Ada Lovelace')

    const loginRes = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: user.email, password: user.password })
    const token = loginRes.body.data.accessToken

    const res = await request(app).get('/api/v1/users/me').set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(200)
    expect(res.body.data.email).toBe('me@example.com')
    expect(res.body.data.displayName).toBe('Ada Lovelace')
    expect(res.body.data.roles).toEqual(['student'])
    expect(res.body.data.permissions).toContain('courses.read')
    expect(res.body.data.timezone).toBe('UTC')
  })

  it('patches allowed fields only and persists them', async () => {
    const user = await createActiveUser('patch@example.com')

    const loginRes = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: user.email, password: user.password })
    const token = loginRes.body.data.accessToken

    const res = await request(app)
      .patch('/api/v1/users/me')
      .set('Authorization', `Bearer ${token}`)
      .send({ displayName: 'Renamed User', timezone: 'Europe/Berlin' })

    expect(res.status).toBe(200)
    expect(res.body.data.displayName).toBe('Renamed User')
    expect(res.body.data.timezone).toBe('Europe/Berlin')

    const again = await request(app)
      .get('/api/v1/users/me')
      .set('Authorization', `Bearer ${token}`)
    expect(again.body.data.displayName).toBe('Renamed User')
  })

  it('rejects unknown fields, empty patches and bad timezones', async () => {
    const user = await createActiveUser('strict@example.com')

    const loginRes = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: user.email, password: user.password })
    const token = loginRes.body.data.accessToken
    const auth = { Authorization: `Bearer ${token}` }

    const unknown = await request(app)
      .patch('/api/v1/users/me')
      .set(auth)
      .send({ isAdmin: true })
    expect(unknown.status).toBe(400)

    const empty = await request(app).patch('/api/v1/users/me').set(auth).send({})
    expect(empty.status).toBe(400)

    const badTz = await request(app)
      .patch('/api/v1/users/me')
      .set(auth)
      .send({ timezone: 'Mars/Olympus_Mons' })
    expect(badTz.status).toBe(400)
  })

  it('requires an exact profile name and preserves the account on mismatch', async () => {
    const user = await createActiveUser(
      'delete-mismatch@example.com',
      undefined,
      'Ada Lovelace'
    )
    const login = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: user.email, password: user.password })
    const token = login.body.data.accessToken

    const response = await request(app)
      .delete('/api/v1/users/me')
      .set('Authorization', `Bearer ${token}`)
      .send({ confirmationName: 'ada lovelace' })

    expect(response.status).toBe(400)
    expect(response.body.error.message).toContain('exact profile name')
    expect(await prisma.user.findUnique({ where: { id: user.internalId } })).not.toBeNull()
    expect(await prisma.userProfile.findUnique({ where: { userId: user.internalId } })).not.toBeNull()
  })

  it('deletes the authenticated account, cascades its records and preserves an audit event', async () => {
    const user = await createActiveUser(
      'delete-account@example.com',
      undefined,
      'Ada Lovelace'
    )
    const login = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: user.email, password: user.password })
    const token = login.body.data.accessToken

    const response = await request(app)
      .delete('/api/v1/users/me')
      .set('Authorization', `Bearer ${token}`)
      .send({ confirmationName: 'Ada Lovelace' })

    expect(response.status).toBe(200)
    expect(response.body.data).toEqual({ deleted: true })
    expect(await prisma.user.findUnique({ where: { id: user.internalId } })).toBeNull()
    expect(await prisma.userProfile.findUnique({ where: { userId: user.internalId } })).toBeNull()
    expect(await prisma.session.count({ where: { userId: user.internalId } })).toBe(0)
    expect(
      await prisma.auditLog.findFirst({
        where: { actorId: user.publicId, action: 'user.account.deleted' }
      })
    ).not.toBeNull()
  })

  it('exposes health endpoints publicly', async () => {
    const live = await request(app).get('/api/v1/health/live')
    expect(live.status).toBe(200)

    const ready = await request(app).get('/api/v1/health/ready')
    expect(ready.status).toBe(200)
  })

  it('wraps unknown routes in the standard error envelope', async () => {
    const res = await request(app).get('/api/v1/nope')
    expect(res.status).toBe(404)
    expect(res.body.success).toBe(false)
    expect(res.body.error.code).toBe('NOT_FOUND')
  })
})
