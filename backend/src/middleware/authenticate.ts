import type { NextFunction, Request, Response } from 'express'
import { getBearerToken, AppError } from '../utils/http.js'
import { verifyAccessToken } from '../security/tokens.js'
import { ERROR_CODES } from '../config/constants.js'
import { prisma } from '../utils/prisma.js'
import { permissionSetHash } from '../services/token.service.js'
import { setContextUserId } from './request-context.js'
import type { AuthUser } from '../models/index.js'

export async function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const token = getBearerToken(req)
    if (!token) throw AppError.unauthenticated()

    let claims
    try {
      claims = await verifyAccessToken(token)
    } catch (error) {
      const message = error instanceof Error ? error.message : ''
      if (message === 'unknown_kid' || message === 'malformed_claims') {
        throw new AppError(401, ERROR_CODES.TOKEN_EXPIRED, 'Invalid session token.')
      }
      throw AppError.tokenExpired()
    }

    const session = await prisma.session.findUnique({
      where: { publicId: claims.sid },
      select: { status: true, expiresAt: true }
    })
    if (!session || session.status !== 'active' || session.expiresAt.getTime() <= Date.now()) {
      throw AppError.tokenExpired()
    }

    const user = await prisma.user.findUnique({
      where: { publicId: claims.sub },
      select: {
        id: true,
        publicId: true,
        email: true,
        status: true,
        userRoles: {
          select: {
            role: {
              select: {
                name: true,
                rolePermissions: { select: { permission: { select: { codename: true } } } }
              }
            }
          }
        }
      }
    })
    if (!user) throw AppError.tokenExpired()
    if (user.status === 'pending_verification') {
      throw AppError.forbidden(ERROR_CODES.EMAIL_NOT_VERIFIED, 'Verify your email to continue.')
    }
    if (user.status !== 'active') {
      throw new AppError(423, ERROR_CODES.ACCOUNT_LOCKED, 'This account is unavailable.')
    }

    const roles = [...new Set(user.userRoles.map((r) => r.role.name))]
    const permissions = [
      ...new Set(
        user.userRoles.flatMap((r) =>
          r.role.rolePermissions.map((p) => p.permission.codename)
        )
      )
    ].sort()
    if (permissionSetHash(permissions) !== claims.phash) {
      throw AppError.tokenExpired('Your permissions changed. Please sign in again.')
    }

    const authUser: AuthUser = {
      publicId: user.publicId,
      internalId: user.id,
      email: user.email,
      status: user.status,
      roles,
      permissions,
      sessionPublicId: claims.sid
    }
    req.user = authUser
    setContextUserId(authUser.publicId)
    next()
  } catch (error) {
    next(error)
  }
}
