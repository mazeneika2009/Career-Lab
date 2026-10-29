import express, { type RequestHandler } from 'express'
import cors from 'cors'
import fs from 'node:fs'
import path from 'node:path'
import { env, corsOrigins } from './config/env.js'
import { requestContext } from './middleware/request-context.js'
import { securityHeaders, spaSecurityHeaders } from './security/headers.js'
import { apiV1Router } from './routes/index.js'
import { notFound, zodSafetyNet } from './middleware/validate.js'
import { errorHandler } from './middleware/error-handler.js'
import { jsonBigIntReplacer } from './utils/http.js'

function resolveWebDist(): string | null {
  const candidates = [
    path.resolve(process.cwd(), '../frontend/dist'),
    path.resolve(process.cwd(), 'frontend/dist'),
    path.resolve(process.cwd(), '../../frontend/dist')
  ]
  for (const dir of candidates) {
    if (fs.existsSync(path.join(dir, 'index.html'))) return dir
  }
  return null
}

export function createApp(): express.Express {
  const app = express()

  app.disable('x-powered-by')
  app.set('trust proxy', env.APP_ENV === 'production')
  app.set('json replacer', jsonBigIntReplacer)

  app.use(requestContext)
  app.use((req, res, next) => {
    const handler = req.path.startsWith('/api') ? securityHeaders() : spaSecurityHeaders()
    handler(req, res, next)
  })
  app.use(
    cors({
      origin: corsOrigins,
      credentials: true,
      methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-Id', 'Idempotency-Key', 'X-CSRF-Token'],
      exposedHeaders: ['X-Request-Id', 'RateLimit-Limit', 'RateLimit-Remaining', 'RateLimit-Reset']
    })
  )
  app.use(express.json({ limit: '1mb' }))

  app.use('/api/v1', apiV1Router)

  const webDist = resolveWebDist()
  if (webDist) {
    app.use(
      express.static(webDist, {
        index: false,
        setHeaders(res, filePath) {
          if (filePath.endsWith('.html')) {
            res.setHeader('Cache-Control', 'no-cache')
          } else if (filePath.match(/-[A-Za-z0-9_-]{8}\.\w+$/)) {
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
          }
        }
      })
    )

    const spaFallback: RequestHandler = (req, res, next) => {
      if ((req.method !== 'GET' && req.method !== 'HEAD') || req.path.startsWith('/api')) {
        next()
        return
      }
      res.setHeader('Cache-Control', 'no-cache')
      res.sendFile(path.join(webDist, 'index.html'))
    }
    app.use(spaFallback)
  }

  app.use(notFound)
  app.use(zodSafetyNet)
  app.use(errorHandler)

  return app
}
