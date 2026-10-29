import { prisma } from '../utils/prisma.js'
import { AppError } from '../utils/http.js'
import { ulid } from '../utils/ids.js'
import type { NotificationKind } from '@prisma/client'

export async function notify(
  userId: bigint,
  kind: NotificationKind,
  title: string,
  body: string,
  linkPath?: string
): Promise<void> {
  await prisma.notification.create({
    data: { publicId: ulid(), userId, kind, title, body: body.slice(0, 400), linkPath }
  })
}

/**
 * Resolve the student's active selected career row.
 * Throws NOT_FOUND when no career has been selected yet.
 */
export async function requireActiveCareer(userId: bigint) {
  const row = await prisma.studentCareer.findFirst({
    where: { userId, active: true },
    orderBy: { selectedAt: 'desc' },
    include: { career: true }
  })
  if (!row) {
    throw new AppError(404, 'NO_CAREER_SELECTED', 'Select a career to unlock this area.')
  }
  return row
}
