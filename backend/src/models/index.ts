import type {
  User,
  UserProfile,
  Session,
  EmailToken,
  Role,
  Permission,
  AuditLog,
  SecurityEvent
} from '@prisma/client'

export type { User, UserProfile, Session, EmailToken, Role, Permission, AuditLog, SecurityEvent }

export interface AuthUser {
  publicId: string
  internalId: bigint
  email: string
  status: User['status']
  roles: string[]
  permissions: string[]
  sessionPublicId: string
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser
      requestId?: string
    }
  }
}
