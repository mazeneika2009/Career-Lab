import { AsyncLocalStorage } from 'node:async_hooks'
import type { NextFunction, Request, Response } from 'express'
import type { Logger } from 'pino'
import { logger } from '../utils/logger.js'
import { ulid } from '../utils/ids.js'

export interface RequestContextData {
  requestId: string
  userId?: string
  logger: Logger
}

const asyncStorage = new AsyncLocalStorage<RequestContextData>()

const REQUEST_ID_PATTERN = /^[A-Za-z0-9_-]{8,64}$/

export function requestContext(req: Request, res: Response, next: NextFunction): void {
  const provided = req.headers['x-request-id']
  const requestId =
    typeof provided === 'string' && REQUEST_ID_PATTERN.test(provided) ? provided : ulid()

  res.setHeader('X-Request-Id', requestId)

  const childLogger = logger.child({ requestId })
  const start = Date.now()

  res.on('finish', () => {
    childLogger.info(
      {
        event: 'http.request',
        method: req.method,
        path: req.originalUrl,
        status: res.statusCode,
        durMs: Date.now() - start
      },
      'http request completed'
    )
  })

  asyncStorage.run({ requestId, logger: childLogger }, () => {
    next()
  })
}

export function getRequestContext(): RequestContextData {
  return asyncStorage.getStore() ?? { requestId: 'no-context', logger }
}

export function setContextUserId(userId: string): void {
  const ctx = asyncStorage.getStore()
  if (ctx) ctx.userId = userId
}
