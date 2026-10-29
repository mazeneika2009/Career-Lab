import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import { INTERVIEW_PASS_SCORE } from '../../constants/simulation'
import { useSimulationGate } from '../../hooks/useSimulationGate'
import { isNoCareerError } from '../../hooks/useAsync'
import type { SimulationGateView } from '../../types/domain'
import { EmptyState, ErrorState, LoadingState, PageHeader } from './primitives'

export type WorkplaceGuardModule = 'company' | 'team' | 'client' | 'deadlines' | 'scenarios'

const MODULE_LABEL: Record<WorkplaceGuardModule, string> = {
  company: 'Company Simulation',
  team: 'Team Communication',
  client: 'Client Communication',
  deadlines: 'Deadlines & Priorities',
  scenarios: 'Workplace Scenarios'
}

function moduleUnlocked(gate: SimulationGateView, module: WorkplaceGuardModule): boolean {
  switch (module) {
    case 'company':
      return gate.workplace.companySimulation
    case 'team':
      return gate.workplace.teamCommunication
    case 'client':
      return gate.workplace.clientCommunication
    case 'deadlines':
      return gate.workplace.deadlines
    case 'scenarios':
      return gate.workplace.scenarios
  }
}

/**
 * Route guard for every workplace surface after the technical interview.
 *
 * Company Simulation and Team Communication share one unlock condition, so
 * they become available together. The subsequent client/deadline/scenario
 * areas open once the simulated company has been started. Locked areas render
 * a clear next step instead of exposing a raw 403.
 */
export function SimulationGate({
  children,
  module = 'company'
}: {
  children: React.ReactNode
  module?: WorkplaceGuardModule
}): React.JSX.Element {
  const { gate, loading, error } = useSimulationGate()

  if (loading) return <LoadingState />

  if (error) {
    if (isNoCareerError(error)) {
      return (
        <EmptyState
          icon="compass"
          title="No career selected yet"
          description="Select a career first — your interviews and company simulation are built from its curriculum."
          action={
            <Link to={ROUTES.careers} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-surface">
              Go to career selection
            </Link>
          }
        />
      )
    }
    return <ErrorState error={error} />
  }

  if (!gate || moduleUnlocked(gate, module)) return <>{children}</>

  // The technical interview is still the blocker for every workplace module.
  if (!gate.unlocked) {
    const firstStage = gate.hr.status !== 'passed'
    const stage = firstStage ? gate.hr : gate.technical
    const failed = stage.status === 'failed'
    const inProgress = stage.status === 'in_progress'
    const stageName = firstStage ? 'virtual' : 'technical'
    const path = firstStage ? ROUTES.virtualInterview : ROUTES.technicalInterview

    return (
      <div>
        <PageHeader
          eyebrow="Company simulation"
          title={firstStage ? 'Virtual interview required' : 'Technical interview required'}
          description="The workplace opens after two sequential interviews: virtual screening first, then the technical interview."
        />
        <EmptyState
          icon="lock"
          title={
            failed
              ? `${firstStage ? 'Virtual' : 'Technical'} interview retake required`
              : inProgress
                ? `Finish your ${stageName} interview`
                : `Complete the ${stageName} interview first`
          }
          description={
            failed
              ? `Your latest ${stageName} attempt scored ${stage.score ?? 0}/100. Reach ${INTERVIEW_PASS_SCORE}/100 in a retake to continue.`
              : inProgress
                ? `Your ${stageName} interview is in progress. Submit all answers and reach ${INTERVIEW_PASS_SCORE}/100 to unlock the next step.`
                : firstStage
                  ? `Pass the virtual screening at ${INTERVIEW_PASS_SCORE}/100 or higher to unlock the technical interview. Company Simulation and Team Communication open together after the technical stage passes.`
                  : `Your virtual interview is passed. Complete the technical interview at ${INTERVIEW_PASS_SCORE}/100 or higher to unlock Company Simulation and Team Communication together.`
          }
          action={
            <Link
              to={path}
              className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:brightness-95"
            >
              {failed ? 'Retake interview' : inProgress ? 'Continue interview' : 'Start interview'}
            </Link>
          }
        />
        {!firstStage && gate.hr.verified ? (
          <p className="mt-3 text-center text-xs text-primary/50">
            Virtual interview verified · {gate.hr.score}/100
          </p>
        ) : null}
      </div>
    )
  }

  // Technical interview passed: Company Simulation and Team Communication are
  // open, but the remaining areas wait for the simulated company to start.
  return (
    <div>
      <PageHeader
        eyebrow="Company simulation"
        title={`${MODULE_LABEL[module]} opens with your workplace`}
        description="Company Simulation and Team Communication are already unlocked. Start your simulated company to open client communication, deadlines and workplace scenarios."
      />
      <EmptyState
        icon="lock"
        title="Start the company simulation first"
        description="Enter your simulated company to receive your role, teammates, client channel, task board and workplace scenarios."
        action={
          <Link
            to={ROUTES.simulation}
            className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:brightness-95"
          >
            Enter company simulation
          </Link>
        }
      />
    </div>
  )
}
