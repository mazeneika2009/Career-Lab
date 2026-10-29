import { beforeEach, describe, expect, it, vi } from 'vitest'
import request from 'supertest'
import { createApp } from '../src/app.js'
import { prisma } from '../src/utils/prisma.js'
import { resetDb } from './helpers/db.js'

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

describe('POST /api/v1/auth/register', () => {
  it('creates a pending user with student role and profile', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({ fullName: 'Ada Lovelace', email: 'ada@example.com', password: 'SuperSecret123!', acceptTerms: true })

    expect(res.status).toBe(201)
    expect(res.body.success).toBe(true)

    const user = await prisma.user.findUnique({
      where: { email: 'ada@example.com' },
      include: { profile: true, userRoles: { include: { role: true } } }
    })
    expect(user?.status).toBe('pending_verification')
    expect(user?.profile?.displayName).toBe('Ada Lovelace')
    expect(user?.userRoles.map((r) => r.role.name)).toEqual(['student'])
  })

  it('responds identically for a duplicate email and creates no second user', async () => {
    const payload = { fullName: 'Ada Lovelace', email: 'ada@example.com', password: 'SuperSecret123!', acceptTerms: true }

    const first = await request(app).post('/api/v1/auth/register').send(payload)
    const second = await request(app).post('/api/v1/auth/register').send(payload)

    expect(first.status).toBe(201)
    expect(second.status).toBe(201)
    expect(Object.keys(second.body)).toEqual(Object.keys(first.body))
    expect(second.body.error).toBeUndefined()

    const users = await prisma.user.findMany({ where: { email: 'ada@example.com' } })
    expect(users).toHaveLength(1)
  })

  it('rejects weak passwords with field errors', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({ fullName: 'A', email: 'weak@example.com', password: 'short', acceptTerms: true })

    expect(res.status).toBe(400)
    expect(res.body.error.code).toBe('VALIDATION_ERROR')
    expect(res.body.error.details.fields.password).toBeDefined()
    expect(res.body.error.details.fields.fullName).toBeDefined()
  })

  it('rejects when terms are not accepted', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({ fullName: 'Ada Lovelace', email: 'terms@example.com', password: 'SuperSecret123!', acceptTerms: false })

    expect(res.status).toBe(400)
    expect(res.body.error.details.fields.acceptTerms).toBeDefined()
  })

  it('normalizes emails case-insensitively', async () => {
    await request(app)
      .post('/api/v1/auth/register')
      .send({ fullName: 'Ada Lovelace', email: 'Mixed@Example.COM', password: 'SuperSecret123!', acceptTerms: true })

    const user = await prisma.user.findUnique({ where: { email: 'mixed@example.com' } })
    expect(user).not.toBeNull()
  })
})
