import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createApp } from '../src/create-app.js'
import { prisma } from '../src/utils/prisma.js'
import { ulid } from '../src/utils/ids.js'
import { jsonBigIntReplacer } from '../src/utils/http.js'
import { createActiveUser, resetDb, VALID_PASSWORD } from './helpers/db.js'

const app = createApp()

describe('JSON serialization', () => {
  it('converts nested BigInt values to exact decimal strings', () => {
    const payload = {
      id: 42n,
      nested: { userId: 7n },
      name: 'ok'
    }

    expect(JSON.parse(JSON.stringify(payload, jsonBigIntReplacer))).toEqual({
      id: '42',
      nested: { userId: '7' },
      name: 'ok'
    })
  })
})

describe('POST /api/v1/interview/start', () => {
  let token: string
  let userId: bigint
  let careerId: bigint

  beforeAll(async () => {
    await resetDb()
    const user = await createActiveUser('interview-start@example.com')
    userId = user.internalId

    const login = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: user.email, password: VALID_PASSWORD })
    token = login.body.data.accessToken

    await request(app)
      .post('/api/v1/careers/select')
      .set('Authorization', `Bearer ${token}`)
      .send({ slug: 'frontend-developer' })
      .expect(200)

    const career = await prisma.career.findUniqueOrThrow({ where: { slug: 'frontend-developer' } })
    careerId = career.id
  })

  afterAll(async () => {
    await prisma.user.delete({ where: { id: userId } }).catch(() => undefined)
  })

  it('returns a JSON-safe payload without internal BigInt fields', async () => {
    const res = await request(app)
      .post('/api/v1/interview/start')
      .set('Authorization', `Bearer ${token}`)
      .send({ stage: 'hr' })

    expect(res.status).toBe(201)
    expect(res.body.success).toBe(true)
    expect(res.body.data.stage).toBe('hr')
    expect(res.body.data.questions.length).toBeGreaterThan(0)
    expect(res.body.data).not.toHaveProperty('id')
    expect(res.body.data).not.toHaveProperty('userId')
    expect(res.body.data).not.toHaveProperty('careerId')
  })

  it('starts the simulation with a JSON-safe payload after both interviews pass', async () => {
    const completed = {
      userId,
      careerId,
      questions: [],
      status: 'completed' as const,
      score: 80,
      completedAt: new Date()
    }
    await prisma.interviewSession.createMany({
      data: [
        { ...completed, publicId: ulid(), stage: 'hr' },
        { ...completed, publicId: ulid(), stage: 'technical' }
      ]
    })

    const res = await request(app)
      .post('/api/v1/simulation/start')
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(201)
    expect(res.body.success).toBe(true)
    expect(typeof res.body.data.publicId).toBe('string')
    expect(res.body.data.companyName).toBeTruthy()
    expect(res.body.data).not.toHaveProperty('id')
    expect(res.body.data).not.toHaveProperty('userId')
    expect(res.body.data).not.toHaveProperty('careerId')
  })
})
