import { prisma } from '../utils/prisma.js'
import { updateProfile } from '../repositories/user.repository.js'
import { writeAudit } from './audit.service.js'
import { insertAuditLog } from '../repositories/audit.repository.js'
import { AUDIT_ACTIONS } from '../config/constants.js'
import { AppError, type RequestMeta } from '../utils/http.js'
import type { AuthUser } from '../models/index.js'
import type { UpdateMeDto } from '../validators/auth.validators.js'
import { getMe, type MeView } from './auth.service.js'
import { getRequestContext } from '../middleware/request-context.js'

export async function getMyProfile(authUser: AuthUser): Promise<MeView> {
  return getMe(authUser)
}

export async function updateMyProfile(
  authUser: AuthUser,
  dto: UpdateMeDto,
  meta: RequestMeta
): Promise<MeView> {
  const before = await prisma.userProfile.findUnique({ where: { userId: authUser.internalId } })

  const updated = await updateProfile(prisma, authUser.internalId, {
    displayName: dto.displayName,
    timezone: dto.timezone
  })

  writeAudit(
    {
      actorType: 'user',
      actorId: authUser.publicId,
      action: AUDIT_ACTIONS.profileUpdated,
      entityType: 'user_profile',
      entityId: authUser.publicId,
      before: {
        displayName: before?.displayName ?? null,
        timezone: before?.timezone ?? null
      },
      after: { displayName: updated.displayName, timezone: updated.timezone }
    },
    meta
  )

  return getMe(authUser)
}

export async function deleteMyAccount(
  authUser: AuthUser,
  confirmationName: string,
  meta: RequestMeta
): Promise<void> {
  const context = getRequestContext()
  await prisma.$transaction(async (tx) => {
    const profile = await tx.userProfile.findUnique({
      where: { userId: authUser.internalId },
      select: { displayName: true }
    })
    if (!profile) throw AppError.notFound('Account profile not found.')
    if (confirmationName !== profile.displayName) {
      throw AppError.validation('Type your exact profile name to delete this account.')
    }

    await insertAuditLog(tx, {
      actorType: 'user',
      actorId: authUser.publicId,
      action: AUDIT_ACTIONS.accountDeleted,
      entityType: 'user',
      entityId: authUser.publicId,
      before: { status: authUser.status },
      after: { deleted: true },
      ip: meta.ip,
      ua: meta.userAgent,
      requestId: context.requestId
    })
    await tx.user.delete({ where: { id: authUser.internalId } })
  })
}
