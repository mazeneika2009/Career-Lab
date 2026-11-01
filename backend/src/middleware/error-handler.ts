import type { NextFunction, Request, Response } from 'express'
import { AppError } from '../utils/http.js'
import { ERROR_CODES } from '../config/constants.js'
import { getRequestContext } from './request-context.js'
import { logger } from '../utils/logger.js'

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
