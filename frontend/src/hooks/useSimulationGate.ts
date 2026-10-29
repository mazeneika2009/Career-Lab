import { useEffect, useRef } from 'react'
import { simulationApi } from '../api/learning'
import { useWorkplaceGateStore } from '../store/workplaceGateStore'
import type { SimulationGateView } from '../types/domain'
import { useAsync } from './useAsync'

/**
 * Reads the server-side workflow gate for the active career. The technical
 * stage opens after the virtual stage passes. Passing the technical interview
 * unlocks Company Simulation and Team Communication together; the remaining
 * workplace areas open when the simulated company is started.
 */
export function useSimulationGate(refreshKey: unknown = null): {
  gate: SimulationGateView | null
  loading: boolean
  error: unknown
  reload: () => void
} {
  const state = useAsync(() => simulationApi.gate(), [refreshKey])

  // Invalidation is a background refresh: keep the current gate visible while
  // the new one loads so the sidebar and completed interview results never
  // flash a loading state. `useAsync`'s reload preserves the mounted view.
  const refreshToken = useWorkplaceGateStore((store) => store.refreshToken)
  const seenToken = useRef(refreshToken)

  useEffect(() => {
    if (seenToken.current === refreshToken) return
    seenToken.current = refreshToken
    state.reload()
    // `state.reload` is recreated on every render by design; the token guard
    // above ensures a request is only fired once per invalidation.
  }, [refreshToken, state.reload])

  return { gate: state.data, loading: state.loading, error: state.error, reload: state.reload }
}
