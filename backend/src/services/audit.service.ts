import { prisma } from '../utils/prisma.js'
import { getRequestContext } from '../middleware/request-context.js'
import type { RequestMeta } from '../utils/http.js'
import {
  insertAuditLog,
  insertSecurityEvent,
  type AuditEntry
} from '../repositories/audit.repository.js'

export function writeAudit(
  entry: Omit<AuditEntry, 'requestId' | 'ip' | 'ua'> & Partial<Pick<AuditEntry, 'ip' | 'ua'>>,
  meta?: RequestMeta
): void {
  const ctx = getRequestContext()
  insertAuditLog(prisma, {
    ...entry,
    ip: entry.ip ?? meta?.ip ?? null,
    ua: entry.ua ?? meta?.userAgent ?? null,
    requestId: ctx.requestId
  }).catch((error: unknown) => {
    ctx.logger.error({ err: error, action: entry.action }, 'failed to write audit log')
  })
}

export function writeSecurityEvent(
  kind: 'login_fail' | 'refresh_reuse' | 'rate_limit_hit' | 'perm_denied',
  subject: string | null,
  meta: object,
  severity: number
): void {
  const ctx = getRequestContext()
  insertSecurityEvent(prisma, { kind, subject, meta, severity }).catch((error: unknown) => {
    ctx.logger.error({ err: error, kind }, 'failed to write security event')
  })
}
