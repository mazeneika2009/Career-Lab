import type { Prisma, EmailToken } from '@prisma/client'
import { prisma } from '../utils/prisma.js'

type Db = Prisma.TransactionClient | typeof prisma

export interface CreateEmailTokenInput {
  userId: bigint
  purpose: EmailToken['purpose']
  tokenHash: string
  expiresAt: Date
}

export async function insertToken(db: Db, input: CreateEmailTokenInput): Promise<void> {
  await db.emailToken.create({
    data: {
      userId: input.userId,
      purpose: input.purpose,
      tokenHash: input.tokenHash,
      expiresAt: input.expiresAt
    }
  })
}

export async function invalidatePendingTokens(
  db: Db,
  userId: bigint,
  purpose: EmailToken['purpose']
): Promise<void> {
  await db.emailToken.updateMany({
    where: { userId, purpose, consumedAt: null },
    data: { consumedAt: new Date() }
  })
}

export async function findByHashAndPurpose(
  db: Db,
  tokenHash: string,
  purpose: EmailToken['purpose']
): Promise<EmailToken | null> {
  return db.emailToken.findUnique({
    where: { tokenHash },
    select: {
      id: true,
      userId: true,
      purpose: true,
      tokenHash: true,
      expiresAt: true,
      consumedAt: true
    }
  })
}

export async function consumeToken(db: Db, tokenId: bigint): Promise<void> {
  await db.emailToken.update({
    where: { id: tokenId },
    data: { consumedAt: new Date() }
  })
}
