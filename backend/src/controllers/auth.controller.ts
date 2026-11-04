import type { Request, Response } from 'express'
import * as authService from '../services/auth.service.js'
import { assertDoubleSubmitCsrf } from '../security/csrf.js'
import {
  clearCsrfCookie,
  clearRefreshCookie,
  setCsrfCookie,
  setRefreshCookie
} from '../security/cookies.js'
import { parseCookies, requestMeta, successEnvelope } from '../utils/http.js'
import { COOKIES } from '../config/constants.js'
import { env } from '../config/env.js'
import type { AuthUser } from '../models/index.js'

function authUser(req: Request): AuthUser {
  return req.user as AuthUser
}

export async function register(req: Request, res: Response): Promise<void> {
  const result = await authService.register(req.body, requestMeta(req))
  res.status(201).json(successEnvelope(result))
}

export async function login(req: Request, res: Response): Promise<void> {
  const payload = await authService.login(req.body, requestMeta(req))
  setRefreshCookie(res, payload.refreshToken)
  setCsrfCookie(res, payload.csrfToken)
  res.status(200).json(
    successEnvelope({
      accessToken: payload.accessToken,
      expiresIn: payload.expiresIn,
      user: payload.user
    })
  )
}

export async function refresh(req: Request, res: Response): Promise<void> {
  assertDoubleSubmitCsrf(req)
  const cookies = parseCookies(req.headers.cookie)
  const payload = await authService.refresh(cookies[COOKIES.refresh], requestMeta(req))
  setRefreshCookie(res, payload.refreshToken)
  setCsrfCookie(res, payload.csrfToken)
  res.status(200).json(
    successEnvelope({
      accessToken: payload.accessToken,
      expiresIn: payload.expiresIn,
      user: payload.user
    })
  )
}

export async function logout(req: Request, res: Response): Promise<void> {
  await authService.logout(authUser(req), requestMeta(req))
  clearRefreshCookie(res)
  clearCsrfCookie(res)
  res.status(204).end()
}

export async function logoutAll(req: Request, res: Response): Promise<void> {
  await authService.logoutAll(authUser(req), requestMeta(req))
  clearRefreshCookie(res)
  clearCsrfCookie(res)
  res.status(204).end()
}

export async function verifyEmail(req: Request, res: Response): Promise<void> {
  await authService.verifyEmail(req.body.token)
  res.status(200).json(successEnvelope({ status: 'active' }))
}

/**
 * Email clients open links with GET, so the link generated at registration
 * points at the API and lands here. Verify once, then redirect to the SPA with
 * a status instead of leaving the token in the browser history.
 */
export async function verifyEmailLink(req: Request, res: Response): Promise<void> {
  const target = new URL(`${env.APP_WEB_URL.replace(/\/$/, '')}/verify-email`)
  const token = typeof req.query.token === 'string' ? req.query.token : ''

  if (!token) {
    target.searchParams.set('status', 'error')
    target.searchParams.set('message', 'This verification link is missing its token.')
    res.redirect(302, target.toString())
    return
  }

  try {
    await authService.verifyEmail(token)
    target.searchParams.set('status', 'success')
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Verification failed.'
    const expired = (error as { status?: number }).status === 410
    target.searchParams.set('status', 'error')
    target.searchParams.set('message', message)
    target.searchParams.set('expired', expired ? '1' : '0')
  }

  res.redirect(302, target.toString())
}

export async function sendVerification(req: Request, res: Response): Promise<void> {
  const user = authUser(req)
  if (user) {
    await authService.resendVerification({ publicId: user.publicId }, requestMeta(req))
  } else if (req.body?.email) {
    await authService.resendVerification({ email: req.body.email }, requestMeta(req))
  }
  res.status(202).json(successEnvelope({ queued: true }))
}

export async function forgotPassword(req: Request, res: Response): Promise<void> {
  await authService.requestPasswordReset(req.body.email, requestMeta(req))
  res.status(202).json(successEnvelope({ queued: true }))
}

export async function resetPassword(req: Request, res: Response): Promise<void> {
  await authService.resetPassword(req.body, requestMeta(req))
  clearRefreshCookie(res)
  clearCsrfCookie(res)
  res.status(204).end()
}

export async function changePassword(req: Request, res: Response): Promise<void> {
  await authService.changePassword(authUser(req), req.body, requestMeta(req))
  res.status(204).end()
}

export async function listSessions(req: Request, res: Response): Promise<void> {
  const sessions = await authService.listSessions(authUser(req))
  res.status(200).json(successEnvelope(sessions))
}

export async function revokeSession(req: Request, res: Response): Promise<void> {
  const sessionId = req.params.sessionId as string
  await authService.revokeSession(authUser(req), sessionId, requestMeta(req))
  res.status(204).end()
}
