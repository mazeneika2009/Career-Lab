import type { Request } from 'express'
import type { ErrorCode } from '../config/constants.js'

export interface RequestMeta {
  ip: string | null
  userAgent: string | null
}

export function parseCookies(header: string | undefined): Record<string, string> {
  if (!header) return {}
  const out: Record<string, string> = {}
  for (const part of header.split(';')) {
    const idx = part.indexOf('=')
    if (idx === -1) continue
    const key = part.slice(0, idx).trim()
    const value = part.slice(idx + 1).trim()
    if (key) out[key] = decodeURIComponent(value)
  }
  return out
}

export function getBearerToken(req: Request): string | null {
  const header = req.headers.authorization
  if (!header) return null
  const [scheme, token] = header.split(' ')
  if (!token || scheme?.toLowerCase() !== 'bearer') return null
  return token
}

export function clientIp(req: Request): string | null {
  const ip = req.ip ?? null
  if (!ip) return null
  return ip.startsWith('::ffff:') ? ip.slice(7) : ip
}

export function requestMeta(req: Request): RequestMeta {
  return { ip: clientIp(req), userAgent: req.headers['user-agent'] ?? null }
}

export function describeUserAgent(ua: string | null): string {
  if (!ua) return 'Unknown device'
  const browser =
    /(Edg|Firefox|OPR|SamsungBrowser)\/([\d.]+)/.exec(ua) ??
    /(?:Chrome|CriOS)\/([\d.]+)/.exec(ua) ??
    /Version\/([\d.]+).*Safari/.exec(ua)
  if (!browser) return 'Unknown device'
  const name =
    browser[0].startsWith('Edg') ? 'Edge'
    : browser[0].startsWith('Firefox') ? 'Firefox'
    : browser[0].startsWith('OPR') ? 'Opera'
    : browser[0].startsWith('Samsung') ? 'Samsung Internet'
    : browser[0].startsWith('CriOS') || browser[0].startsWith('Chrome') ? 'Chrome'
    : 'Safari'
  const platform = /Windows/.test(ua) ? 'Windows'
    : /Mac OS X/.test(ua) ? 'macOS'
    : /Android/.test(ua) ? 'Android'
    : /iPhone|iPad/.test(ua) ? 'iOS'
    : /Linux/.test(ua) ? 'Linux'
    : ''
  return platform ? `${name} · ${platform}` : name
}

/**
 * Express JSON replacer for Prisma values. BigInt cannot be passed to
 * JSON.stringify directly; emit decimal strings so ids stay exact instead of
 * losing precision through Number().
 */
export function jsonBigIntReplacer(_key: string, value: unknown): unknown {
  return typeof value === 'bigint' ? value.toString() : value
}

export function successEnvelope<T>(data: T, meta?: unknown): { success: true; data: T; meta?: unknown } {
  return meta === undefined ? { success: true, data } : { success: true, data, meta }
}

export function errorEnvelope(
  code: ErrorCode | string,
  message: string,
  details?: unknown,
  requestId?: string
): {
  success: false
  error: { code: string; message: string; details?: unknown; requestId?: string }
} {
  return {
    success: false,
    error: {
      code,
      message,
      ...(details !== undefined ? { details } : {}),
      ...(requestId ? { requestId } : {})
    }
  }
}

export class AppError extends Error {
  readonly statusCode: number
  readonly code: string
  readonly details?: unknown

  constructor(statusCode: number, code: string, message: string, details?: unknown) {
    super(message)
    this.name = 'AppError'
    this.statusCode = statusCode
    this.code = code
    this.details = details
  }

  static validation(message = 'The submitted data is invalid.', fields?: unknown): AppError {
    return new AppError(400, 'VALIDATION_ERROR', message, fields ? { fields } : undefined)
  }

  static unauthenticated(message = 'Authentication required.'): AppError {
    return new AppError(401, 'UNAUTHENTICATED', message)
  }

  static tokenExpired(message = 'Your session has expired. Please sign in again.'): AppError {
    return new AppError(401, 'TOKEN_EXPIRED', message)
  }

  static invalidCredentials(): AppError {
    return new AppError(401, 'INVALID_CREDENTIALS', 'Invalid credentials.')
  }

  static forbidden(code: string, message: string): AppError {
    return new AppError(403, code, message)
  }

  static notFound(message = 'Resource not found.'): AppError {
    return new AppError(404, 'NOT_FOUND', message)
  }
}
