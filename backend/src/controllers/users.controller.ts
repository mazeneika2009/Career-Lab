import type { Request, Response } from 'express'
import {
  deleteMyAccount,
  getMyProfile,
  updateMyProfile
} from '../services/users.service.js'
import { clearCsrfCookie, clearRefreshCookie } from '../security/cookies.js'
import { successEnvelope, requestMeta } from '../utils/http.js'
import type { AuthUser } from '../models/index.js'

function authUser(req: Request): AuthUser {
  return req.user as AuthUser
}

export async function getMe(req: Request, res: Response): Promise<void> {
  const me = await getMyProfile(authUser(req))
  res.status(200).json(successEnvelope(me))
}

export async function patchMe(req: Request, res: Response): Promise<void> {
  const me = await updateMyProfile(authUser(req), req.body, requestMeta(req))
  res.status(200).json(successEnvelope(me))
}

export async function deleteMe(req: Request, res: Response): Promise<void> {
  await deleteMyAccount(authUser(req), req.body.confirmationName, requestMeta(req))
  clearRefreshCookie(res)
  clearCsrfCookie(res)
  res.status(200).json(successEnvelope({ deleted: true }))
}
