import { describe, expect, it } from 'vitest'
import type { SimulationGateView } from '../types/domain'
import { isNavItemLocked, navLockHint } from './workplaceAccess'

function gate(overrides: Partial<SimulationGateView> = {}): SimulationGateView {
  return {
    unlocked: false,
    hr: { status: 'not_started', score: null, sessionPublicId: null, verified: false },
    technical: { status: 'not_started', score: null, sessionPublicId: null, verified: false },
    workplace: {
      companySimulation: false,
      teamCommunication: false,
      clientCommunication: false,
      deadlines: false,
      scenarios: false
    },
    companyName: null,
    roleTitle: null,
    simulationStarted: false,
    ...overrides
  }
}

const technicalPassed = gate({
  unlocked: true,
  hr: { status: 'passed', score: 80, sessionPublicId: 'hr', verified: true },
  technical: { status: 'passed', score: 82, sessionPublicId: 'tech', verified: true },
  workplace: {
    companySimulation: true,
    teamCommunication: true,
    clientCommunication: false,
    deadlines: false,
    scenarios: false
  }
})

const simulationStarted = gate({
  ...technicalPassed,
  simulationStarted: true,
  workplace: {
    companySimulation: true,
    teamCommunication: true,
    clientCommunication: true,
    deadlines: true,
    scenarios: true
  }
})

describe('workplace sidebar access', () => {
  it('keeps gated items inert until the gate has loaded', () => {
    expect(isNavItemLocked('technical', null)).toBe(true)
    expect(isNavItemLocked('workplace', null)).toBe(true)
    expect(isNavItemLocked('simulation', null)).toBe(true)
    expect(isNavItemLocked(undefined, null)).toBe(false)
  })

  it('locks the technical interview until the virtual interview passes', () => {
    expect(isNavItemLocked('technical', gate())).toBe(true)
    expect(navLockHint('technical', gate())).toBe(
      'Pass the virtual interview to unlock the technical interview'
    )
  })

  it('unlocks company simulation and team communication together after the technical interview', () => {
    expect(isNavItemLocked('workplace', gate())).toBe(true)
    expect(isNavItemLocked('workplace', technicalPassed)).toBe(false)

    // Neither module can be open without the other.
    const halfOpen = gate({
      ...technicalPassed,
      workplace: { ...technicalPassed.workplace, teamCommunication: false }
    })
    expect(isNavItemLocked('workplace', halfOpen)).toBe(true)
  })

  it('keeps client communication, deadlines and scenarios locked until the simulation starts', () => {
    expect(isNavItemLocked('simulation', technicalPassed)).toBe(true)
    expect(navLockHint('simulation', technicalPassed)).toBe(
      'Start the company simulation to unlock this workplace area'
    )
    expect(isNavItemLocked('simulation', simulationStarted)).toBe(false)
  })
})
