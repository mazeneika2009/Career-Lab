import type { SimulationGateView } from '../types/domain'

/**
 * Sidebar access levels for the sequential workplace flow.
 *
 * - technical: unlocked by passing the virtual interview
 * - workplace: Company Simulation and Team Communication, unlocked together by
 *   the technical interview
 * - simulation: client communication, deadlines and scenarios, unlocked when
 *   the student enters the simulated company
 */
export type WorkAccess = 'technical' | 'workplace' | 'simulation'

export function isNavItemLocked(
  access: WorkAccess | undefined,
  gate: SimulationGateView | null
): boolean {
  if (!access) return false
  // Until the gate has loaded, keep gated items inert instead of letting a
  // click hit a route guard before the real state is known.
  if (!gate) return true

  if (access === 'technical') return gate.hr.status !== 'passed'
  if (access === 'workplace') {
    return !gate.workplace.companySimulation || !gate.workplace.teamCommunication
  }
  return !gate.simulationStarted || !gate.workplace.clientCommunication
}

export function navLockHint(
  access: WorkAccess | undefined,
  gate: SimulationGateView | null
): string | undefined {
  if (!access) return undefined
  if (!gate) return 'Checking your interview progress…'

  if (access === 'technical') {
    if (gate.hr.status === 'failed') {
      return 'Retake the virtual interview to unlock the technical interview'
    }
    if (gate.hr.status === 'in_progress') {
      return 'Finish the virtual interview to unlock the technical interview'
    }
    return 'Pass the virtual interview to unlock the technical interview'
  }

  if (access === 'workplace') {
    if (gate.hr.status !== 'passed') {
      return 'Pass the virtual interview first; the workplace opens after the technical interview'
    }
    if (gate.technical.status === 'failed') {
      return 'Retake the technical interview to unlock the company simulation and team communication'
    }
    if (gate.technical.status === 'in_progress') {
      return 'Finish the technical interview to unlock the company simulation and team communication'
    }
    return 'Pass the technical interview to unlock the company simulation and team communication'
  }

  if (!gate.unlocked) return 'Pass the technical interview to unlock the workplace'
  return 'Start the company simulation to unlock this workplace area'
}
