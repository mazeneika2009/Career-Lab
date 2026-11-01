import { create } from 'zustand'

export type ToastTone = 'info' | 'success' | 'warning' | 'danger'

export interface ToastItem {
  id: number
  tone: ToastTone
  message: string
}

interface UiState {
  toasts: ToastItem[]
  pushToast: (tone: ToastTone, message: string) => void
  dismissToast: (id: number) => void
}

let nextId = 1

export const useUiStore = create<UiState>()((set, get) => ({
  toasts: [],
  pushToast: (tone, message) => {
    const id = nextId++
    set({ toasts: [...get().toasts, { id, tone, message }] })
    window.setTimeout(() => get().dismissToast(id), 5000)
  },
  dismissToast: (id) => set({ toasts: get().toasts.filter((t) => t.id !== id) })
}))

export function toast(tone: ToastTone, message: string): void {
  useUiStore.getState().pushToast(tone, message)
}
