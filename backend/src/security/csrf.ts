import type { Request } from 'express'
import { COOKIES } from '../config/constants.js'
import { parseCookies, AppError } from '../utils/http.js'
import { randomToken, safeEqual } from '../utils/ids.js'

const CSRF_HEADER = 'x-csrf-token'

export function newCsrfToken(): string {
  return randomToken()
}

export function assertDoubleSubmitCsrf(req: Request): void {
  const cookies = parseCookies(req.headers.cookie)
  const cookieToken = cookies[COOKIES.csrf]
  const headerToken = req.headers[CSRF_HEADER]
  if (
    !cookieToken ||
    typeof headerToken !== 'string' ||
    headerToken.length > 128 ||
    !safeEqual(cookieToken, headerToken)
  ) {
    throw new AppError(403, 'CSRF_INVALID', 'Request rejected. Please retry.')
  }
}
