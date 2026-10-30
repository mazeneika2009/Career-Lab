export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  UNAUTHENTICATED: 'UNAUTHENTICATED',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  REFRESH_REUSE_DETECTED: 'REFRESH_REUSE_DETECTED',
  EMAIL_NOT_VERIFIED: 'EMAIL_NOT_VERIFIED',
  ACCOUNT_LOCKED: 'ACCOUNT_LOCKED',
  WEAK_PASSWORD: 'WEAK_PASSWORD',
  CSRF_INVALID: 'CSRF_INVALID',
  PERMISSION_DENIED: 'PERMISSION_DENIED',
  RATE_LIMITED: 'RATE_LIMITED',
  NOT_FOUND: 'NOT_FOUND',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  MAINTENANCE_MODE: 'MAINTENANCE_MODE'
} as const

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES]

export const RATE_CLASSES = {
  public: { windowMs: 60_000, limit: 60 },
  authSensitive: { windowMs: 60_000, limit: 5 },
  standardAuthed: { windowMs: 60_000, limit: 120 }
} as const

export type RateClassName = keyof typeof RATE_CLASSES

export const COOKIES = {
  refresh: 'cl_refresh',
  csrf: 'cl_csrf'
} as const

export const AUTH_LIMITS = {
  failedLoginThreshold: 5,
  lockBackoffBaseSeconds: 30,
  lockBackoffMaxSeconds: 86_400,
  emailTokenTtlHours: 24
} as const

export const AUDIT_ACTIONS = {
  register: 'auth.register',
  loginSuccess: 'auth.login.success',
  loginFailure: 'auth.login.failure',
  logout: 'auth.logout',
  logoutAll: 'auth.logout_all',
  emailVerified: 'auth.email.verified',
  emailResent: 'auth.email.resent',
  passwordResetRequested: 'auth.password.reset_requested',
  passwordReset: 'auth.password.reset',
  passwordChanged: 'auth.password.changed',
  sessionRevoked: 'auth.session.revoked',
  profileUpdated: 'user.profile.updated'
} as const

export const ISSUER = 'career-lab'
export const AUDIENCE = 'career-lab-web'

/**
 * Two sequential interviews gate the workplace. The virtual/HR screening is
 * step one; the technical interview unlocks only after it is passed. Passing
 * the technical interview unlocks Company Simulation and Team Communication
 * together. Client communication, deadlines and scenarios follow after the
 * simulated company is entered.
 */
export const INTERVIEW_PASS_SCORE = 65

export const INTERVIEW_STAGES = ['hr', 'technical'] as const
export type InterviewStage = (typeof INTERVIEW_STAGES)[number]

export function isInterviewStage(value: unknown): value is InterviewStage {
  return typeof value === 'string' && (INTERVIEW_STAGES as readonly string[]).includes(value)
}

/** Sessions and questions created before stages existed were technical interviews. */
export function normalizeInterviewStage(value: unknown): InterviewStage {
  return value === 'hr' ? 'hr' : 'technical'
}
