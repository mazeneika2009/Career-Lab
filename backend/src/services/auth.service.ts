import { env } from '../config/env.js'
import { AUDIT_ACTIONS, AUTH_LIMITS, ERROR_CODES } from '../config/constants.js'
import { AppError, describeUserAgent } from '../utils/http.js'
import type { RequestMeta } from '../utils/http.js'
import { ulid, randomToken, sha256Hex } from '../utils/ids.js'
import { logger } from '../utils/logger.js'
import { prisma } from '../utils/prisma.js'
import {
  dummyVerify,
  hashPassword,
  paramsDrift,
  verifyPassword
} from '../security/password.js'
import {
  createUserWithProfile,
  assignRole,
  findByEmail,
  findByPublicId,
  recordFailedLogin,
  recordLoginSuccess,
  updatePasswordHash,
  setStatusActive,
  findProfileByUserId
} from '../repositories/user.repository.js'
import * as sessionRepo from '../repositories/session.repository.js'
import * as emailTokenRepo from '../repositories/email-token.repository.js'
import { issueAccessToken, mintOpaqueToken } from './token.service.js'
import {
  sendLoginAlertEmail,
  sendPasswordChangedEmail,
  sendPasswordResetEmail,
  sendVerificationEmail
} from './email.service.js'
import { writeAudit, writeSecurityEvent } from './audit.service.js'
import type { AuthUser, EmailToken, User } from '../models/index.js'
import type {
  ChangePasswordDto,
  LoginDto,
  PasswordResetDto,
  RegisterDto
} from '../validators/auth.validators.js'

const EMAIL_TOKEN_TTL_MS = AUTH_LIMITS.emailTokenTtlHours * 60 * 60 * 1000

export interface UserSnapshot {
  id: string
  email: string
  displayName: string
  status: User['status']
  roles: string[]
  permissions: string[]
}

export interface AuthTokensPayload {
  accessToken: string
  expiresIn: number
  refreshToken: string
  csrfToken: string
  user: UserSnapshot
}

interface SnapshotData {
  user: Pick<User, 'id' | 'publicId' | 'email' | 'status' | 'createdAt'>
  displayName: string
  roles: string[]
  permissions: string[]
}

async function loadSnapshot(userId: bigint): Promise<SnapshotData> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      publicId: true,
      email: true,
      status: true,
      createdAt: true,
      profile: { select: { displayName: true } },
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
  if (!user) throw new Error('user disappeared during transaction')
  const roles = [...new Set(user.userRoles.map((r) => r.role.name))]
  const permissions = [
    ...new Set(
      user.userRoles.flatMap((r) => r.role.rolePermissions.map((p) => p.permission.codename))
    )
  ].sort()
  return { user, displayName: user.profile?.displayName ?? '', roles, permissions }
}

function toSnapshot(data: SnapshotData): UserSnapshot {
  return {
    id: data.user.publicId,
    email: data.user.email,
    displayName: data.displayName,
    status: data.user.status,
    roles: data.roles,
    permissions: data.permissions
  }
}

async function createSessionWithTokens(
  userId: bigint,
  meta: RequestMeta
): Promise<AuthTokensPayload> {
  let snapshot: SnapshotData
  try {
    snapshot = await loadSnapshot(userId)
  } catch (err) {
    logger.error({ stage: 'load_snapshot', err }, 'failed to load user snapshot')
    throw err
  }

  const refreshToken = mintOpaqueToken()
  let session
  try {
    session = await sessionRepo.createSession(prisma, {
      publicId: ulid(),
      userId,
      familyId: ulid(),
      refreshHash: sha256Hex(refreshToken),
      userAgent: meta.userAgent ? meta.userAgent.slice(0, 512) : null,
      ip: meta.ip,
      expiresAt: new Date(Date.now() + env.SESSION_TTL_DAYS * 24 * 60 * 60 * 1000)
    })
  } catch (err) {
    logger.error({ stage: 'create_session', userId: snapshot.user.publicId, err }, 'failed to create session record')
    throw err
  }

  let accessToken: string
  try {
    accessToken = await issueAccessToken({
      subjectPublicId: snapshot.user.publicId,
      sessionPublicId: session.publicId,
      roles: snapshot.roles,
      permissions: snapshot.permissions
    })
  } catch (err) {
    logger.error({ stage: 'sign_jwt', userId: snapshot.user.publicId, err }, 'failed to sign access token')
    throw err
  }

  return {
    accessToken,
    expiresIn: env.ACCESS_TOKEN_TTL_MINUTES * 60,
    refreshToken,
    csrfToken: randomToken(),
    user: toSnapshot(snapshot)
  }
}

async function resolveEmailToken(
  rawToken: string,
  purpose: EmailToken['purpose']
): Promise<EmailToken> {
  const record = await emailTokenRepo.findByHashAndPurpose(prisma, sha256Hex(rawToken), purpose)
  if (!record || record.purpose !== purpose) {
    throw AppError.validation('This link is invalid.')
  }
  if (record.consumedAt) {
    throw AppError.validation('This link has already been used.')
  }
  if (record.expiresAt.getTime() <= Date.now()) {
    throw new AppError(410, ERROR_CODES.TOKEN_EXPIRED, 'This link has expired.')
  }
  return record
}

export async function register(dto: RegisterDto, meta: RequestMeta): Promise<{ email: string }> {
  const existing = await findByEmail(prisma, dto.email)
  if (existing) {
    logger.info({ action: 'register.duplicate' }, 'registration attempted for existing email')
    return { email: dto.email }
  }

  const { hash, params } = await hashPassword(dto.password)
  const publicId = ulid()

  const verificationLink = await prisma.$transaction(async (tx) => {
    const { user } = await createUserWithProfile(tx, {
      publicId,
      email: dto.email,
      passwordHash: hash,
      argonParams: params,
      displayName: dto.fullName
    })
    await assignRole(tx, user.id, 'student')
    const rawToken = randomToken()
    await emailTokenRepo.insertToken(tx, {
      userId: user.id,
      purpose: 'email_verify',
      tokenHash: sha256Hex(rawToken),
      expiresAt: new Date(Date.now() + EMAIL_TOKEN_TTL_MS)
    })
    return `${env.APP_WEB_URL}/verify-email?token=${rawToken}`
  })

  writeAudit(
    {
      actorType: 'user',
      actorId: publicId,
      action: AUDIT_ACTIONS.register,
      entityType: 'user',
      entityId: publicId
    },
    meta
  )

  void sendVerificationEmail(dto.email, verificationLink).catch(() => undefined)

  return { email: dto.email }
}

export async function verifyEmail(rawToken: string): Promise<void> {
  const record = await emailTokenRepo.findByHashAndPurpose(
    prisma,
    sha256Hex(rawToken),
    'email_verify'
  )
  if (!record || record.purpose !== 'email_verify') {
    throw AppError.validation('This link is invalid.')
  }

  if (record.consumedAt) {
    const existing = await prisma.user.findUnique({
      where: { id: record.userId },
      select: { status: true }
    })
    if (existing && existing.status === 'active') {
      return
    }
    throw new AppError(
      410,
      ERROR_CODES.TOKEN_EXPIRED,
      'This link was replaced by a newer verification email. Open the most recent Career Lab email and use its button.'
    )
  }

  if (record.expiresAt.getTime() <= Date.now()) {
    throw new AppError(410, ERROR_CODES.TOKEN_EXPIRED, 'This link has expired.')
  }

  const user = await prisma.$transaction(async (tx) => {
    await emailTokenRepo.consumeToken(tx, record.id)
    const row = await tx.user.findUnique({ where: { id: record.userId } })
    if (row && row.status === 'pending_verification') {
      await setStatusActive(tx, row.id)
    }
    return row!
  })

  writeAudit({
    actorType: 'user',
    actorId: user.publicId,
    action: AUDIT_ACTIONS.emailVerified,
    entityType: 'user',
    entityId: user.publicId
  })
}

export async function resendVerification(
  input: { publicId?: string; email?: string },
  meta: RequestMeta
): Promise<void> {
  let user: User | null = null
  if (input.publicId) {
    user = await findByPublicId(prisma, input.publicId)
  } else if (input.email) {
    user = await findByEmail(prisma, input.email)
  }

  if (!user || user.status !== 'pending_verification') {
    logger.info({ action: 'verification.resend.skipped' }, 'resend skipped')
    return
  }

  const rawToken = randomToken()
  await prisma.$transaction(async (tx) => {
    await emailTokenRepo.invalidatePendingTokens(tx, user!.id, 'email_verify')
    await emailTokenRepo.insertToken(tx, {
      userId: user!.id,
      purpose: 'email_verify',
      tokenHash: sha256Hex(rawToken),
      expiresAt: new Date(Date.now() + EMAIL_TOKEN_TTL_MS)
    })
  })

  writeAudit(
    {
      actorType: 'user',
      actorId: user.publicId,
      action: AUDIT_ACTIONS.emailResent,
      entityType: 'user',
      entityId: user.publicId
    },
    meta
  )

  void sendVerificationEmail(
    user.email,
    `${env.APP_WEB_URL}/verify-email?token=${rawToken}`
  ).catch(() => undefined)
}

function lockUntilForFailure(count: number): Date | null {
  if (count < AUTH_LIMITS.failedLoginThreshold) return null
  const exponent = count - AUTH_LIMITS.failedLoginThreshold
  const seconds = Math.min(
    AUTH_LIMITS.lockBackoffBaseSeconds * 2 ** exponent,
    AUTH_LIMITS.lockBackoffMaxSeconds
  )
  return new Date(Date.now() + seconds * 1000)
}

export async function login(dto: LoginDto, meta: RequestMeta): Promise<AuthTokensPayload> {
  let user: User | null
  try {
    user = await findByEmail(prisma, dto.email)
  } catch (err) {
    logger.error({ stage: 'user_lookup', err }, 'login stage failed: user_lookup')
    throw err
  }

  if (!user) {
    await dummyVerify(dto.password)
    throw AppError.invalidCredentials()
  }

  if (user.lockedUntil && user.lockedUntil.getTime() > Date.now()) {
    throw new AppError(423, ERROR_CODES.ACCOUNT_LOCKED, 'Account temporarily locked.', {
      retryAfterSeconds: Math.ceil((user.lockedUntil.getTime() - Date.now()) / 1000)
    })
  }

  if (user.status === 'suspended' || user.status === 'deleted') {
    throw new AppError(423, ERROR_CODES.ACCOUNT_LOCKED, 'Account unavailable.')
  }
  if (user.status === 'pending_verification') {
    throw AppError.forbidden(
      ERROR_CODES.EMAIL_NOT_VERIFIED,
      'Verify your email address before signing in.'
    )
  }

  let passwordValid = false
  try {
    passwordValid = await verifyPassword(user.passwordHash, dto.password)
  } catch (err) {
    logger.error({ stage: 'password_verification', userId: user.publicId, err }, 'login stage failed: password_verification')
    throw err
  }

  if (!passwordValid) {
    const nextCount = user.failedLoginCount + 1
    const lockedUntil = lockUntilForFailure(nextCount)
    await recordFailedLogin(prisma, user.id, nextCount, lockedUntil)
    writeSecurityEvent('login_fail', user.publicId, { attempt: nextCount }, lockedUntil ? 3 : 1)
    writeAudit(
      {
        actorType: 'anonymous',
        actorId: user.publicId,
        action: AUDIT_ACTIONS.loginFailure,
        entityType: 'user',
        entityId: user.publicId
      },
      meta
    )
    throw AppError.invalidCredentials()
  }

  try {
    if (paramsDrift(user.argonParams)) {
      const { hash, params } = await hashPassword(dto.password)
      await updatePasswordHash(prisma, user.id, hash, params)
    }

    await recordLoginSuccess(prisma, user)
  } catch (err) {
    logger.error({ stage: 'record_login_success', userId: user.publicId, err }, 'login stage failed: record_login_success')
    throw err
  }

  let payload: AuthTokensPayload
  try {
    payload = await createSessionWithTokens(user.id, meta)
  } catch (err) {
    logger.error({ stage: 'create_session_tokens', userId: user.publicId, err }, 'login stage failed: create_session_tokens')
    throw err
  }

  writeAudit(
    {
      actorType: 'user',
      actorId: user.publicId,
      action: AUDIT_ACTIONS.loginSuccess,
      entityType: 'session',
      entityId: ''
    },
    meta
  )

  // Security alert for every successful login. Profile lookup and SMTP run in
  // the background so neither can delay or block the auth response.
  const loginAt = new Date()
  void (async () => {
    const profile = await findProfileByUserId(prisma, user.id)
    await sendLoginAlertEmail(user.email, {
      when: loginAt,
      timeZone: profile?.timezone ?? 'UTC',
      ip: meta.ip,
      device: describeUserAgent(meta.userAgent)
    })
  })().catch((error) => {
    logger.warn({ err: error, userId: user.publicId }, 'login_alert_email_failed')
  })

  return payload
}

export async function refresh(
  rawRefreshToken: string | undefined,
  meta: RequestMeta
): Promise<AuthTokensPayload> {
  if (!rawRefreshToken) throw AppError.tokenExpired()

  const hashed = sha256Hex(rawRefreshToken)
  const session = await sessionRepo.findActiveByRefreshHash(prisma, hashed)

  if (!session) throw AppError.tokenExpired()

  if (session.status === 'revoked') throw AppError.tokenExpired()

  if (session.status === 'rotated') {
    await prisma.$transaction(async (tx) => {
      await sessionRepo.revokeFamily(tx, session.familyId)
    })
    writeSecurityEvent('refresh_reuse', String(session.userId), { familyId: session.familyId }, 4)
    throw new AppError(
      401,
      ERROR_CODES.REFRESH_REUSE_DETECTED,
      'Session invalidated for security reasons. Please sign in again.'
    )
  }

  const now = Date.now()
  if (session.expiresAt.getTime() <= now) {
    await sessionRepo.revokeFamily(prisma, session.familyId)
    throw AppError.tokenExpired()
  }

  const absoluteDeadline =
    session.createdAt.getTime() + env.SESSION_ABSOLUTE_TTL_DAYS * 24 * 60 * 60 * 1000
  if (now >= absoluteDeadline) {
    await sessionRepo.revokeFamily(prisma, session.familyId)
    throw AppError.tokenExpired()
  }

  const user = await prisma.user.findUnique({ where: { id: session.userId } })
  if (!user) throw AppError.tokenExpired()
  if (user.status === 'pending_verification') {
    throw AppError.forbidden(ERROR_CODES.EMAIL_NOT_VERIFIED, 'Verify your email to continue.')
  }
  if (user.status !== 'active') {
    throw new AppError(423, ERROR_CODES.ACCOUNT_LOCKED, 'Account unavailable.')
  }

  const snapshot = await loadSnapshot(session.userId)
  const newRefreshToken = mintOpaqueToken()
  const newExpiresAt = new Date(now + env.SESSION_TTL_DAYS * 24 * 60 * 60 * 1000)

  const newSession = await prisma.$transaction(async (tx) => {
    await sessionRepo.markRotated(tx, session.id, newExpiresAt)
    return sessionRepo.createSession(tx, {
      publicId: ulid(),
      userId: session.userId,
      familyId: session.familyId,
      refreshHash: sha256Hex(newRefreshToken),
      userAgent: session.userAgent,
      ip: meta.ip ?? session.ip,
      expiresAt: newExpiresAt
    })
  })

  const accessToken = await issueAccessToken({
    subjectPublicId: snapshot.user.publicId,
    sessionPublicId: newSession.publicId,
    roles: snapshot.roles,
    permissions: snapshot.permissions
  })

  return {
    accessToken,
    expiresIn: env.ACCESS_TOKEN_TTL_MINUTES * 60,
    refreshToken: newRefreshToken,
    csrfToken: randomToken(),
    user: toSnapshot(snapshot)
  }
}

export async function logout(authUser: AuthUser, meta: RequestMeta): Promise<void> {
  const revoked = await sessionRepo.revokeByIdPublic(
    prisma,
    authUser.internalId,
    authUser.sessionPublicId
  )
  if (revoked > 0) {
    writeAudit(
      {
        actorType: 'user',
        actorId: authUser.publicId,
        action: AUDIT_ACTIONS.logout,
        entityType: 'session',
        entityId: authUser.sessionPublicId
      },
      meta
    )
  }
}

export async function logoutAll(authUser: AuthUser, meta: RequestMeta): Promise<number> {
  const count = await sessionRepo.revokeAllForUser(prisma, authUser.internalId)
  writeAudit(
    {
      actorType: 'user',
      actorId: authUser.publicId,
      action: AUDIT_ACTIONS.logoutAll,
      entityType: 'user',
      entityId: authUser.publicId,
      after: { sessionsRevoked: count }
    },
    meta
  )
  return count
}

export async function requestPasswordReset(email: string, meta: RequestMeta): Promise<void> {
  const user = await findByEmail(prisma, email)
  if (!user || user.status === 'deleted') {
    logger.info({ action: 'password.reset.request.unknown' }, 'reset requested')
    return
  }

  const rawToken = randomToken()
  await prisma.$transaction(async (tx) => {
    await emailTokenRepo.invalidatePendingTokens(tx, user.id, 'password_reset')
    await emailTokenRepo.insertToken(tx, {
      userId: user.id,
      purpose: 'password_reset',
      tokenHash: sha256Hex(rawToken),
      expiresAt: new Date(Date.now() + EMAIL_TOKEN_TTL_MS)
    })
  })

  writeAudit(
    {
      actorType: 'anonymous',
      actorId: user.publicId,
      action: AUDIT_ACTIONS.passwordResetRequested,
      entityType: 'user',
      entityId: user.publicId
    },
    meta
  )

  void sendPasswordResetEmail(user.email, `${env.APP_WEB_URL}/reset-password?token=${rawToken}`).catch(
    () => undefined
  )
}

export async function resetPassword(
  dto: PasswordResetDto,
  meta: RequestMeta
): Promise<void> {
  const record = await resolveEmailToken(dto.token, 'password_reset')

  const { hash, params } = await hashPassword(dto.password)

  const user = await prisma.$transaction(async (tx) => {
    await emailTokenRepo.consumeToken(tx, record.id)
    await updatePasswordHash(tx, record.userId, hash, params)
    await sessionRepo.revokeAllForUser(tx, record.userId)
    const row = await tx.user.findUnique({ where: { id: record.userId } })
    if (row && row.status === 'pending_verification') {
      await setStatusActive(tx, row.id)
    }
    return row!
  })

  writeAudit(
    {
      actorType: 'anonymous',
      actorId: user.publicId,
      action: AUDIT_ACTIONS.passwordReset,
      entityType: 'user',
      entityId: user.publicId
    },
    meta
  )

  void sendPasswordChangedEmail(user.email).catch(() => undefined)
}

export async function changePassword(
  authUser: AuthUser,
  dto: ChangePasswordDto,
  meta: RequestMeta
): Promise<void> {
  const user = await findByPublicId(prisma, authUser.publicId)
  if (!user) throw AppError.invalidCredentials()

  const currentValid = await verifyPassword(user.passwordHash, dto.currentPassword)
  if (!currentValid) throw AppError.invalidCredentials()

  const { hash, params } = await hashPassword(dto.newPassword)

  const revokedOthers = await prisma.$transaction(async (tx) => {
    await updatePasswordHash(tx, user.id, hash, params)
    return sessionRepo.revokeAllExcept(tx, user.id, authUser.sessionPublicId)
  })

  writeAudit(
    {
      actorType: 'user',
      actorId: user.publicId,
      action: AUDIT_ACTIONS.passwordChanged,
      entityType: 'user',
      entityId: user.publicId,
      after: { otherSessionsRevoked: revokedOthers }
    },
    meta
  )
}

export interface SessionView {
  id: string
  device: string
  ip: string | null
  createdAt: string
  lastUsedAt: string
  isCurrent: boolean
}

export async function listSessions(authUser: AuthUser): Promise<SessionView[]> {
  const sessions = await sessionRepo.listActiveForUser(prisma, authUser.internalId)
  return sessions.map((session) => ({
    id: session.publicId,
    device: describeUserAgent(session.userAgent),
    ip: session.ip,
    createdAt: session.createdAt.toISOString(),
    lastUsedAt: session.lastUsedAt.toISOString(),
    isCurrent: session.publicId === authUser.sessionPublicId
  }))
}

export async function revokeSession(
  authUser: AuthUser,
  sessionPublicId: string,
  meta: RequestMeta
): Promise<void> {
  const revoked = await sessionRepo.revokeByIdPublic(
    prisma,
    authUser.internalId,
    sessionPublicId
  )
  if (revoked === 0) throw AppError.notFound()
  writeAudit(
    {
      actorType: 'user',
      actorId: authUser.publicId,
      action: AUDIT_ACTIONS.sessionRevoked,
      entityType: 'session',
      entityId: sessionPublicId
    },
    meta
  )
}

export interface MeView {
  id: string
  email: string
  displayName: string
  timezone: string
  bio: string | null
  status: User['status']
  roles: string[]
  permissions: string[]
  createdAt: string
}

export async function getMe(authUser: AuthUser): Promise<MeView> {
  const [profile, snapshot] = await Promise.all([
    findProfileByUserId(prisma, authUser.internalId),
    loadSnapshot(authUser.internalId)
  ])
  return {
    id: snapshot.user.publicId,
    email: snapshot.user.email,
    displayName: snapshot.displayName,
    timezone: profile?.timezone ?? 'UTC',
    bio: profile?.bio ?? null,
    status: snapshot.user.status,
    roles: snapshot.roles,
    permissions: snapshot.permissions,
    createdAt: snapshot.user.createdAt.toISOString()
  }
}
