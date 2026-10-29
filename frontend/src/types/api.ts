export type UserStatus = 'pending_verification' | 'active' | 'suspended' | 'deleted'

export interface UserSnapshot {
  id: string
  email: string
  displayName: string
  status: UserStatus
  roles: string[]
  permissions: string[]
}

export interface AuthResponse {
  accessToken: string
  expiresIn: number
  user: UserSnapshot
}

export interface MeView extends UserSnapshot {
  timezone: string
  bio: string | null
  createdAt: string
}

export interface SessionView {
  id: string
  device: string
  ip: string | null
  createdAt: string
  lastUsedAt: string
  isCurrent: boolean
}
