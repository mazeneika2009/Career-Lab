import { create } from 'zustand'
import type { UserSnapshot } from '../types/api'

type SessionStatus = 'initial' | 'checking' | 'authenticated' | 'anonymous'

interface SessionState {
  status: SessionStatus
  user: UserSnapshot | null
  accessToken: string | null
  setSession: (user: UserSnapshot, accessToken: string) => void
  setStatus: (status: SessionStatus) => void
  clear: () => void
}

export const useSessionStore = create<SessionState>()((set) => ({
  status: 'initial',
  user: null,
  accessToken: null,
  setSession: (user, accessToken) => set({ user, accessToken, status: 'authenticated' }),
  setStatus: (status) => set({ status }),
  clear: () => set({ status: 'anonymous', user: null, accessToken: null })
}))

export function getSessionAccessToken(): string | null {
  return useSessionStore.getState().accessToken
}
