import rateLimit from 'express-rate-limit'
import type { NextFunction, Request, Response } from 'express'
import type { RateClassName } from '../config/constants.js'
import { RATE_CLASSES } from '../config/constants.js'
import { errorEnvelope } from '../utils/http.js'
import { getRequestContext } from './request-context.js'
import { env } from '../config/env.js'
import type { AuthUser } from '../models/index.js'

function handler(_req: Request, res: Response): void {
  const { requestId } = getRequestContext()
  res.status(429).json(
    errorEnvelope(
      'RATE_LIMITED',
      'Too many requests. Please slow down and try again shortly.',
      undefined,
      requestId
    )
  )
}

const noop = (_req: Request, _res: Response, next: NextFunction): void => {
  next()
}

export function rateLimiter(className: RateClassName, keyFn?: (req: Request) => string) {
  if (env.APP_ENV === 'test') return noop

  const config = RATE_CLASSES[className]
  return rateLimit({
    windowMs: config.windowMs,
    limit: config.limit,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    keyGenerator: keyFn ?? ((req: Request) => req.ip ?? 'unknown'),
    handler
  })
}

export function userKey(req: Request): string {
  const user = req.user as AuthUser | undefined
  return user?.publicId ?? req.ip ?? 'unknown'
}
