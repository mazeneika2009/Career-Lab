import { describe, expect, it } from 'vitest'
import express from 'express'
import request from 'supertest'
import { errorHandler } from '../src/middleware/error-handler.js'
import { AppError } from '../src/utils/http.js'
import { JwtKeyConfigurationError } from '../src/security/tokens.js'

function appWith(error: unknown): express.Express {
  const app = express()
  app.get('/boom', (_req, _res, next) => {
    next(error)
  })
  app.use(errorHandler)
  return app
}

function prismaError(name: string, code: string, message: string): Error {
  return Object.assign(new Error(message), { name, code })
}

describe('error classification', () => {
  it('maps database connectivity and engine failures to 503', async () => {
    const cases: unknown[] = [
      prismaError('PrismaClientInitializationError', 'P1001', "Can't reach database server"),
      prismaError('PrismaClientKnownRequestError', 'P2024', 'Timed out fetching a new connection'),
      prismaError('PrismaClientKnownRequestError', 'P2021', 'The table does not exist'),
      prismaError(
        'PrismaClientInitializationError',
        'P1012',
        'Prisma Client could not locate the Query Engine for runtime "rhel-openssl-3.0.x"'
      )
    ]

    for (const error of cases) {
      const res = await request(appWith(error)).get('/boom')
      expect(res.status, (error as Error).message).toBe(503)
      expect(res.body.success).toBe(false)
      expect(res.body.error.code).toBe('SERVICE_UNAVAILABLE')
    }
  })

  it('maps JWT key configuration failures to 503', async () => {
    const res = await request(appWith(new JwtKeyConfigurationError('keys missing'))).get('/boom')
    expect(res.status).toBe(503)
    expect(res.body.error.code).toBe('SERVICE_UNAVAILABLE')
  })

  it('treats malformed JSON bodies as client errors', async () => {
    const app = express()
    app.use(express.json())
    app.post('/json', (_req, res) => {
      res.json({ ok: true })
    })
    app.use(errorHandler)

    const res = await request(app)
      .post('/json')
      .set('Content-Type', 'application/json')
      .send('{"email":')
    expect(res.status).toBe(400)
    expect(res.body.error.code).toBe('VALIDATION_ERROR')
  })

  it('keeps genuine application errors and bugs unchanged', async () => {
    const validation = await request(appWith(AppError.validation('Bad input'))).get('/boom')
    expect(validation.status).toBe(400)
    expect(validation.body.error.code).toBe('VALIDATION_ERROR')

    const bug = await request(appWith(new Error('unexpected null'))).get('/boom')
    expect(bug.status).toBe(500)
    expect(bug.body.error.code).toBe('INTERNAL_ERROR')
  })
})
