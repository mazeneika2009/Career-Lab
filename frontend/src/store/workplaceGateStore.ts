import { create } from 'zustand'

/**
 * Workplace gate invalidation store.
 *
 * The sidebar and route guards each read the server-side gate on their own.
 * Completing an interview or starting the simulation changes that gate outside
 * the component that owns the request, so those surfaces need a shared signal.
 * Bumping `refreshToken` makes every mounted `useSimulationGate` consumer refetch
 * immediately instead of waiting for the next navigation or a full reload.
 */
interface WorkplaceGateState {
  refreshToken: number
  invalidate: () => void
  reset: () => void
}

export const useWorkplaceGateStore = create<WorkplaceGateState>()((set) => ({
  refreshToken: 0,
  invalidate: () => set((state) => ({ refreshToken: state.refreshToken + 1 })),
  reset: () => set({ refreshToken: 0 })
}))

/** Mark the server-side workplace gate as stale. Safe to call from any page. */
export function invalidateWorkplaceGate(): void {
  useWorkplaceGateStore.getState().invalidate()
}
