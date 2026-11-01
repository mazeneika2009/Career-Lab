import type { Response } from 'express'
import { env } from '../config/env.js'
import { COOKIES } from '../config/constants.js'

const BASE_OPTIONS = {
  sameSite: 'strict' as const,
  path: '/api/v1/auth',
  secure: env.COOKIE_SECURE
}

/**
 * The CSRF token is a double-submit cookie: the SPA must read it with
 * document.cookie and echo it in X-CSRF-Token. A path scoped to the auth
 * endpoints hides it from app routes, so refresh would always fail after a
 * reload. Keep the refresh token scoped, but expose only the CSRF token.
 */
const CSRF_OPTIONS = { ...BASE_OPTIONS, path: '/' }

export function setRefreshCookie(res: Response, value: string): void {
  const maxAge = env.SESSION_TTL_DAYS * 24 * 60 * 60 * 1000
  res.cookie(COOKIES.refresh, value, { ...BASE_OPTIONS, httpOnly: true, maxAge })
}

export function clearRefreshCookie(res: Response): void {
  res.cookie(COOKIES.refresh, '', { ...BASE_OPTIONS, httpOnly: true, maxAge: 0 })
}

export function setCsrfCookie(res: Response, value: string): void {
  const maxAge = env.SESSION_TTL_DAYS * 24 * 60 * 60 * 1000
  res.cookie(COOKIES.csrf, value, { ...CSRF_OPTIONS, httpOnly: false, maxAge })
}

export function clearCsrfCookie(res: Response): void {
  res.cookie(COOKIES.csrf, '', { ...CSRF_OPTIONS, httpOnly: false, maxAge: 0 })
}
