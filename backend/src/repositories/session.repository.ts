import type { Prisma, Session } from '@prisma/client'
import { prisma } from '../utils/prisma.js'

type Db = Prisma.TransactionClient | typeof prisma

export interface CreateSessionInput {
  publicId: string
  userId: bigint
  familyId: string
  refreshHash: string
  userAgent: string | null
  ip: string | null
  expiresAt: Date
}

export async function createSession(db: Db, input: CreateSessionInput): Promise<Session> {
  return db.session.create({
    data: {
      publicId: input.publicId,
      userId: input.userId,
      familyId: input.familyId,
      refreshHash: input.refreshHash,
      status: 'active',
      userAgent: input.userAgent,
      ip: input.ip,
      expiresAt: input.expiresAt
    }
  })
}

export async function findActiveByRefreshHash(db: Db, refreshHash: string): Promise<Session | null> {
  return db.session.findUnique({ where: { refreshHash } })
}

export async function markRotated(
  db: Db,
  sessionId: bigint,
  expiresAt: Date
): Promise<void> {
  await db.session.update({
    where: { id: sessionId },
    data: { status: 'rotated', lastUsedAt: new Date(), expiresAt }
  })
}

export async function revokeFamily(db: Db, familyId: string): Promise<number> {
  const result = await db.session.updateMany({
    where: { familyId, status: { in: ['active', 'rotated'] } },
    data: { status: 'revoked' }
  })
  return result.count
}

export async function revokeByIdPublic(
  db: Db,
  userId: bigint,
  sessionPublicId: string
): Promise<number> {
  const result = await db.session.updateMany({
    where: { publicId: sessionPublicId, userId, status: 'active' },
    data: { status: 'revoked' }
  })
  return result.count
}

export async function revokeAllForUser(db: Db, userId: bigint): Promise<number> {
  const result = await db.session.updateMany({
    where: { userId, status: 'active' },
    data: { status: 'revoked' }
  })
  return result.count
}

export async function revokeAllExcept(
  db: Db,
  userId: bigint,
  keepPublicId: string
): Promise<number> {
  const result = await db.session.updateMany({
    where: { userId, status: 'active', publicId: { not: keepPublicId } },
    data: { status: 'revoked' }
  })
  return result.count
}

export async function listActiveForUser(db: Db, userId: bigint): Promise<Session[]> {
  return db.session.findMany({
    where: { userId, status: 'active' },
    orderBy: { lastUsedAt: 'desc' }
  })
}

export async function distinctIpsForUser(db: Db, userId: bigint): Promise<string[]> {
  const grouped = await db.session.groupBy({
    by: ['ip'],
    where: { userId, ip: { not: null } }
  })
  return grouped.map((row) => row.ip).filter((ip): ip is string => Boolean(ip))
}
