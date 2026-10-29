import { prisma } from '../utils/prisma.js'
import { updateProfile } from '../repositories/user.repository.js'
import { writeAudit } from './audit.service.js'
import { AUDIT_ACTIONS } from '../config/constants.js'
import type { RequestMeta } from '../utils/http.js'
import type { AuthUser } from '../models/index.js'
import type { UpdateMeDto } from '../validators/auth.validators.js'
import { getMe, type MeView } from './auth.service.js'

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
