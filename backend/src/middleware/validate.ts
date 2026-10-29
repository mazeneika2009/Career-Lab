import type { ErrorRequestHandler, RequestHandler } from 'express'
import { ZodError, type ZodTypeAny } from 'zod'
import { AppError, errorEnvelope } from '../utils/http.js'
import { ERROR_CODES } from '../config/constants.js'
import { getRequestContext } from './request-context.js'

interface SchemaMap {
  body?: ZodTypeAny
  query?: ZodTypeAny
  params?: ZodTypeAny
}

export function validate(schemas: SchemaMap): RequestHandler {
  return (req, _res, next): void => {
    try {
      if (schemas.body) req.body = schemas.body.parse(req.body)
      if (schemas.query) {
        // Express 5 exposes `query` as a getter-only property.
        const parsed = schemas.query.parse(req.query ?? {})
        Object.defineProperty(req, 'query', { value: parsed, writable: true, configurable: true })
      }
      if (schemas.params) req.params = schemas.params.parse(req.params) as typeof req.params
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        next(AppError.validation(undefined, flattenFieldErrors(error)))
        return
      }
      next(error)
    }
  }
}

export const notFound: RequestHandler = (req, res): void => {
  const ctx = getRequestContext()
  res.status(404).json(
    errorEnvelope(ERROR_CODES.NOT_FOUND, 'The requested resource was not found.', undefined, ctx.requestId)
  )
}

export const zodSafetyNet: ErrorRequestHandler = (error, _req, res, next): void => {
  if (error instanceof ZodError) {
    res.status(400).json({
      success: false,
      error: {
        code: ERROR_CODES.VALIDATION_ERROR,
        message: 'The submitted data is invalid.',
        details: { fields: flattenFieldErrors(error) },
        requestId: getRequestContext().requestId
      }
    })
    return
  }
  next(error)
}

function flattenFieldErrors(error: ZodError): Record<string, string[]> {
  const flattened = error.flatten().fieldErrors
  const output: Record<string, string[]> = {}
  for (const [key, value] of Object.entries(flattened)) {
    if (value !== undefined) output[key] = value as string[]
  }
  return output
}
