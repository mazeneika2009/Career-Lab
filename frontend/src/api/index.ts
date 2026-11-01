import { apiRequest } from '../services/api-client'
import type { AuthResponse, MeView, SessionView, UserSnapshot } from '../types/api'

export interface RegisterDto {
  fullName: string
  email: string
  password: string
  acceptTerms: boolean
}

export interface LoginDto {
  email: string
  password: string
}

export const authApi = {
  register: (dto: RegisterDto) =>
    apiRequest<{ email: string }>('/auth/register', { method: 'POST', body: dto, auth: false }),

  login: (dto: LoginDto) =>
    apiRequest<AuthResponse>('/auth/login', { method: 'POST', body: dto, auth: false }),

  verifyEmail: (token: string) =>
    apiRequest<{ status: string }>('/auth/email/verify', {
      method: 'POST',
      body: { token },
      auth: false
    }),

  sendVerification: (email?: string) =>
    apiRequest<{ queued: boolean }>('/auth/email/send-verification', {
      method: 'POST',
      body: email ? { email } : {},
      auth: false
    }),

  forgotPassword: (email: string) =>
    apiRequest<{ queued: boolean }>('/auth/password/forgot', {
      method: 'POST',
      body: { email },
      auth: false
    }),

  resetPassword: (token: string, password: string) =>
    apiRequest<null>('/auth/password/reset', {
      method: 'POST',
      body: { token, password },
      auth: false
    }),

  changePassword: (currentPassword: string, newPassword: string) =>
    apiRequest<null>('/auth/password', {
      method: 'PATCH',
      body: { currentPassword, newPassword }
    }),

  logoutAll: () => apiRequest<null>('/auth/logout-all', { method: 'POST' }),

  sessions: () => apiRequest<SessionView[]>('/auth/sessions'),

  revokeSession: (sessionId: string) =>
    apiRequest<null>(`/auth/sessions/${sessionId}`, { method: 'DELETE' })
}

export const usersApi = {
  me: () => apiRequest<MeView>('/users/me'),
  updateMe: (dto: { displayName?: string; timezone?: string }) =>
    apiRequest<MeView>('/users/me', { method: 'PATCH', body: dto })
}

export type { AuthResponse, MeView, SessionView, UserSnapshot }
