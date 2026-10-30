import type { NextFunction, Request, Response } from 'express'
import { AppError, errorEnvelope } from '../utils/http.js'
import { ERROR_CODES } from '../config/constants.js'
import { getRequestContext } from './request-context.js'
import { JwtKeyConfigurationError } from '../security/tokens.js'

/**
 * Prisma codes that mean "the service cannot reach/use its database", not
 * "the request was bad". Mapping these to 503 keeps the API contract honest
 * and lets the frontend show a service message instead of "invalid input".
 */
const DATABASE_UNAVAILABLE_CODES = new Set([
  'P1000', // authentication failed
  'P1001', // cannot reach database server
  'P1002', // database server timed out
  'P1003', // database does not exist
  'P1008', // operation timed out
  'P1010', // user denied access
  'P1017', // server closed the connection
  'P2021', // table does not exist (schema not deployed)
  'P2022', // column does not exist (schema not deployed)
  'P2024' // connection pool timeout
])

const DATABASE_UNAVAILABLE_MESSAGE =
  /(can't reach database server|failed to load the (prisma client )?query engine|could not locate the query engine|libquery_engine|unable to require\(.*query_engine|timed out fetching a new connection|prisma client initialization)/i

function isDatabaseUnavailable(error: unknown, depth = 0): boolean {
  if (!(error instanceof Error) || depth > 2) return false

  const code = (error as { code?: unknown }).code
  if (typeof code === 'string' && DATABASE_UNAVAILABLE_CODES.has(code)) return true
  if (
    error.name === 'PrismaClientInitializationError' ||
    error.name === 'PrismaClientRustPanicError'
  ) {
    return true
  }
  if (DATABASE_UNAVAILABLE_MESSAGE.test(error.message)) return true
  return error.cause ? isDatabaseUnavailable(error.cause, depth + 1) : false
}

function sendServiceUnavailable(
  req: Request,
  res: Response,
  error: unknown,
  reason: 'database' | 'jwt_keys'
): void {
  const ctx = getRequestContext()
  ctx.logger.error(
    { err: error, method: req.method, path: req.originalUrl, reason },
    'service unavailable'
  )
  res.status(503).json({
    success: false,
    error: {
      code: ERROR_CODES.SERVICE_UNAVAILABLE,
      message: 'Service is temporarily unavailable. Please try again in a moment.',
      requestId: ctx.requestId
    }
  })
}

export function requirePermission(permission: string) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const user = req.user
    if (!user) {
      next(AppError.unauthenticated())
      return
    }
    if (!user.permissions.includes(permission)) {
      void import('../services/audit.service.js').then(({ writeSecurityEvent }) =>
        writeSecurityEvent('perm_denied', user.publicId, { permission }, 1)
      )
      next(AppError.forbidden(ERROR_CODES.PERMISSION_DENIED, 'You do not have access to this resource.'))
      return
    }
    next()
  }
}

export function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  const ctx = getRequestContext()

  // Body-parser errors are client mistakes, not server bugs. Without this,
  // malformed JSON surfaced as 500 INTERNAL_ERROR.
  const bodyParserType =
    error !== null && typeof error === 'object' && 'type' in error
      ? (error as { type?: unknown }).type
      : undefined
  if (bodyParserType === 'entity.parse.failed') {
    res
      .status(400)
      .json(
        errorEnvelope(
          ERROR_CODES.VALIDATION_ERROR,
          'Request body must be valid JSON.',
          undefined,
          ctx.requestId
        )
      )
    return
  }
  if (bodyParserType === 'entity.too.large') {
    res
      .status(413)
      .json(
        errorEnvelope(
          ERROR_CODES.VALIDATION_ERROR,
          'Request body is too large.',
          undefined,
          ctx.requestId
        )
      )
    return
  }

  if (error instanceof JwtKeyConfigurationError) {
    sendServiceUnavailable(req, res, error, 'jwt_keys')
    return
  }

  if (isDatabaseUnavailable(error)) {
    sendServiceUnavailable(req, res, error, 'database')
    return
  }

  if (error instanceof AppError) {
    if (error.statusCode >= 500) {
      ctx.logger.error({ err: error }, 'app error')
    }
    res.status(error.statusCode).json({
      success: false,
      error: {
        code: error.code,
        message: error.message,
        ...(error.details !== undefined ? { details: error.details } : {}),
        requestId: ctx.requestId
      }
    })
    return
  }

  ctx.logger.error({ err: error, method: req.method, path: req.originalUrl }, 'unhandled error')
  res.status(500).json({
    success: false,
    error: {
      code: ERROR_CODES.INTERNAL_ERROR,
      message: 'Something went wrong. Please try again.',
      requestId: ctx.requestId
    }
  })
}
