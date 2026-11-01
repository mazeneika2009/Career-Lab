import { prisma } from '../utils/prisma.js'
import { AppError } from '../utils/http.js'

export async function listNotifications(userId: bigint) {
  const rows = await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 50
  })
  return {
    unreadCount: rows.filter((r) => !r.readAt).length,
    notifications: rows.map((r) => ({
      publicId: r.publicId,
      kind: r.kind,
      title: r.title,
      body: r.body,
      linkPath: r.linkPath,
      readAt: r.readAt,
      createdAt: r.createdAt
    }))
  }
}

export async function markRead(userId: bigint, publicId: string): Promise<void> {
  const row = await prisma.notification.findUnique({ where: { publicId } })
  if (!row || row.userId !== userId) throw AppError.notFound('Notification not found.')
  await prisma.notification.update({ where: { id: row.id }, data: { readAt: new Date() } })
}

export async function markAllRead(userId: bigint): Promise<void> {
  await prisma.notification.updateMany({
    where: { userId, readAt: null },
    data: { readAt: new Date() }
  })
}
