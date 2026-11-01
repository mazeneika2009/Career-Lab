import type { Prisma } from '@prisma/client'
import { prisma } from '../utils/prisma.js'

type Db = Prisma.TransactionClient | typeof prisma

export interface AuditEntry {
  actorType: 'user' | 'system' | 'anonymous'
  actorId?: string | null
  action: string
  entityType: string
  entityId: string
  before?: object | null
  after?: object | null
  ip?: string | null
  ua?: string | null
  requestId: string
}

export async function insertAuditLog(db: Db, entry: AuditEntry): Promise<void> {
  await db.auditLog.create({
    data: {
      actorType: entry.actorType,
      actorId: entry.actorId ?? null,
      action: entry.action,
      entityType: entry.entityType,
      entityId: entry.entityId,
      before: (entry.before ?? undefined) as Prisma.InputJsonValue | undefined,
      after: (entry.after ?? undefined) as Prisma.InputJsonValue | undefined,
      ip: entry.ip ?? null,
      ua: entry.ua ?? null,
      requestId: entry.requestId
    }
  })
}

export async function insertSecurityEvent(
  db: Db,
  input: {
    kind: 'login_fail' | 'refresh_reuse' | 'rate_limit_hit' | 'perm_denied'
    subject?: string | null
    meta?: object | null
    severity?: number
  }
): Promise<void> {
  await db.securityEvent.create({
    data: {
      kind: input.kind,
      subject: input.subject ?? null,
      meta: (input.meta ?? undefined) as Prisma.InputJsonValue | undefined,
      severity: input.severity ?? 1
    }
  })
}
