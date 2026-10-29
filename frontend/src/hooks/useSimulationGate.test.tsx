import { act, renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { simulationApi } from '../api/learning'
import type { SimulationGateView } from '../types/domain'
import { useWorkplaceGateStore } from '../store/workplaceGateStore'
import { useSimulationGate } from './useSimulationGate'

vi.mock('../api/learning', () => ({
  simulationApi: { gate: vi.fn() }
}))

function gate(companySimulation: boolean): SimulationGateView {
  return {
    unlocked: companySimulation,
    hr: { status: companySimulation ? 'passed' : 'not_started', score: null, sessionPublicId: null, verified: false },
    technical: {
      status: companySimulation ? 'passed' : 'not_started',
      score: null,
      sessionPublicId: null,
      verified: false
    },
    workplace: {
      companySimulation,
      teamCommunication: companySimulation,
      clientCommunication: false,
      deadlines: false,
      scenarios: false
    },
    companyName: null,
    roleTitle: null,
    simulationStarted: false
  }
}

describe('useSimulationGate', () => {
  beforeEach(() => {
    vi.mocked(simulationApi.gate).mockReset()
    useWorkplaceGateStore.getState().reset()
  })

  it('refetches immediately when the workplace gate is invalidated', async () => {
    vi.mocked(simulationApi.gate)
      .mockResolvedValueOnce(gate(false))
      .mockResolvedValueOnce(gate(true))

    const { result } = renderHook(() => useSimulationGate())

    await waitFor(() => expect(result.current.gate?.workplace.companySimulation).toBe(false))

    act(() => {
      useWorkplaceGateStore.getState().invalidate()
    })

    await waitFor(() => expect(result.current.gate?.workplace.companySimulation).toBe(true))
    expect(simulationApi.gate).toHaveBeenCalledTimes(2)
  })
})
