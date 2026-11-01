import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { simulationApi } from '../../api/learning'
import { useAsync } from '../../hooks/useAsync'
import { invalidateWorkplaceGate } from '../../store/workplaceGateStore'
import { careerGateOrError } from './LearningPathPage'
import { ROUTES } from '../../constants/routes'
import { INTERVIEW_PASS_SCORE } from '../../constants/simulation'
import type { SimulationInterviewStatus } from '../../types/domain'
import {
  EmptyState,
  KeyValue,
  LoadingState,
  PageHeader,
  Panel,
  StatusText
} from '../../components/app/primitives'

export default function SimulationDashboardPage(): React.JSX.Element {
  const navigate = useNavigate()
  const state = useAsync(() => simulationApi.overview(), [])
  const [starting, setStarting] = useState(false)
  const [startError, setStartError] = useState<string | null>(null)
  const start = async (): Promise<void> => {
    setStarting(true)
    setStartError(null)
    try {
      await simulationApi.start()
      // Starting the company simulation opens the client, deadline and scenario
      // modules. Invalidate the shared gate before moving into the task board so
      // the sidebar and every route guard see the new state immediately.
      invalidateWorkplaceGate()
      navigate(ROUTES.simulationTasks)
    } catch (e) {
      setStartError(e instanceof Error ? e.message : 'Could not start the simulation.')
    } finally {
      setStarting(false)
    }
  }

  if (state.loading) return <LoadingState />
  if (state.error) return careerGateOrError(state.error)

  const d = state.data!

  if (d.status === 'interview_required') {
    const interview = d.interview
    const hr = interview?.hr
    const technical = interview?.technical
    const firstStage = !hr || hr.status !== 'passed'
    const stage = firstStage ? hr : technical
    const failed = stage?.status === 'failed'
    const inProgress = stage?.status === 'in_progress'
    const stageName = firstStage ? 'virtual' : 'technical'
    const path = firstStage ? ROUTES.virtualInterview : ROUTES.technicalInterview

    return (
      <div>
        <PageHeader
          eyebrow={d.career.name}
          title="Company simulation"
          description="Two sequential interviews unlock the workplace: pass the virtual screening, then the technical interview."
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
              ? `Your latest ${stageName} attempt scored ${stage?.score ?? 0}/100. Reach ${INTERVIEW_PASS_SCORE}/100 in a retake to continue.`
              : inProgress
                ? `Your ${stageName} interview is in progress. Submit all answers and score at least ${INTERVIEW_PASS_SCORE}/100 to unlock the next step.`
                : firstStage
                  ? `No virtual interview has been passed yet. Score at least ${INTERVIEW_PASS_SCORE}/100 to unlock the technical interview, then pass both stages to open the workplace.`
                  : `Your virtual interview is passed. Score at least ${INTERVIEW_PASS_SCORE}/100 in the technical interview to unlock the simulation, tasks, team and client channels.`
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

        <div className="mx-auto mt-5 max-w-xl divide-y divide-border rounded-lg border border-border bg-surface">
          <InterviewStageRow
            label="Virtual interview"
            status={hr?.status ?? 'not_started'}
            score={hr?.score ?? null}
            verified={hr?.verified ?? false}
            href={ROUTES.virtualInterview}
            accessible
          />
          <InterviewStageRow
            label="Technical interview"
            status={technical?.status ?? 'not_started'}
            score={technical?.score ?? null}
            verified={technical?.verified ?? false}
            href={ROUTES.technicalInterview}
            accessible={hr?.status === 'passed'}
          />
        </div>
      </div>
    )
  }

  if (d.status === 'not_started') {
    return (
      <div>
        <PageHeader
          eyebrow={d.career.name}
          title="Company simulation"
          description="Enter a simulated company environment for your profession: real tasks, colleagues, clients, deadlines and scenarios."
        />
        {startError ? (
          <p role="alert" className="mb-3 rounded-md bg-attention/10 px-3 py-2 text-sm text-attention">
            {startError}
          </p>
        ) : null}
        <EmptyState
          icon="building"
          title="Simulation not started"
          description="Starting creates your workplace for this career — role, team and client channels, task board and deadlines."
          action={
            <button
              type="button"
              onClick={() => void start()}
              disabled={starting}
              className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:brightness-95 disabled:opacity-60"
            >
              {starting ? 'Preparing your workplace…' : 'Enter company simulation'}
            </button>
          }
        />
      </div>
    )
  }

  const stageLabel = (status: SimulationInterviewStatus | undefined): string =>
    status === 'passed'
      ? 'Passed'
      : status === 'failed'
        ? 'Not passed'
        : status === 'in_progress'
          ? 'In progress'
          : 'Not started'

  return (
    <div>
      <PageHeader
        eyebrow={`${d.companyName} · ${d.roleTitle}`}
        title="Company simulation"
        description={`Your simulated workplace for the ${d.career.name} track.`}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Panel title="Current tasks" icon="check-square" className="md:col-span-2">
          {(d.currentTasks ?? []).length === 0 ? (
            <p className="text-sm text-primary/60">No open tasks — check back after new assignments arrive.</p>
          ) : (
            <ul className="divide-y divide-border/70">
              {(d.currentTasks ?? []).map((t) => (
                <li key={t.publicId} className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
                  <span className="truncate text-sm text-primary">{t.title}</span>
                  <div className="flex shrink-0 items-center gap-2">
                    <StatusText tone={t.priority} />
                    <Link to={ROUTES.simulationTasks} className="text-xs font-medium text-accent hover:underline">Open</Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-3 flex gap-3 border-t border-border pt-3 text-sm">
            <Link to={ROUTES.deadlines} className="font-medium text-primary underline decoration-border hover:decoration-accent">Deadlines & priorities</Link>
            <Link to={ROUTES.scenarios} className="font-medium text-primary underline decoration-border hover:decoration-accent">Workplace scenarios</Link>
          </div>
        </Panel>

        <Panel title="Status overview" icon="bar-chart">
          <dl className="space-y-3">
            <KeyValue label="Team communication" value={d.teamCommunicationStatus ? `${d.teamCommunicationStatus.total - d.teamCommunicationStatus.open}/${d.teamCommunicationStatus.total} resolved` : '—'} />
            <KeyValue label="Client communication" value={d.clientCommunicationStatus ? `${d.clientCommunicationStatus.total - d.clientCommunicationStatus.open}/${d.clientCommunicationStatus.total} resolved` : '—'} />
            <KeyValue label="Scenario progress" value={d.scenarioProgress ? `${d.scenarioProgress.responded} responded` : '—'} />
            <KeyValue label="Virtual interview" value={stageLabel(d.interview?.hr.status)} />
            <KeyValue label="Technical interview" value={stageLabel(d.interview?.technical.status)} />
          </dl>
        </Panel>

        <Panel title="Priorities" icon="target" className="md:col-span-1">
          <ul className="space-y-2">
            {(d.currentPriorities ?? []).map((p, i) => (
              <li key={i} className="flex items-center justify-between gap-2 text-sm">
                <span className="truncate text-primary/85">{p.title}</span>
                <StatusText tone={p.priority} />
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Upcoming deadlines" icon="calendar-clock" className="md:col-span-2">
          <ul className="space-y-2">
            {(d.deadlines ?? []).slice(0, 5).map((x, i) => (
              <li key={i} className="flex items-center justify-between gap-2 text-sm">
                <span className="truncate text-primary/85">{x.title}</span>
                <span className={`shrink-0 tabular-nums ${x.dueInDays <= 1 ? 'text-error' : 'text-primary/60'}`}>
                  {x.dueInDays <= 0 ? 'Due today' : `${x.dueInDays} day${x.dueInDays === 1 ? '' : 's'} left`}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex gap-3 border-t border-border pt-3 text-sm">
            <Link to={ROUTES.teamCommunication} className="font-medium text-primary underline decoration-border hover:decoration-accent">Team channel</Link>
            <Link to={ROUTES.clientCommunication} className="font-medium text-primary underline decoration-border hover:decoration-accent">Client channel</Link>
            <Link to={ROUTES.technicalInterview} className="font-medium text-primary underline decoration-border hover:decoration-accent">Interviews</Link>
          </div>
        </Panel>
      </div>
    </div>
  )
}

function InterviewStageRow({
  label,
  status,
  score,
  verified,
  href,
  accessible
}: {
  label: string
  status: SimulationInterviewStatus
  score: number | null
  verified: boolean
  href: string
  accessible: boolean
}): React.JSX.Element {
  const body = (
    <div className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
      <div className="min-w-0">
        <p className={`truncate text-sm ${accessible ? 'text-primary' : 'text-primary/40'}`}>{label}</p>
        <p className="mt-0.5 text-xs text-primary/50">
          {score !== null ? `${score}/100` : 'Not evaluated yet'}
          {verified ? ' · Verified' : ''}
        </p>
      </div>
      <StatusText tone={status} />
    </div>
  )

  if (!accessible) {
    return <div className="cursor-not-allowed select-none px-5 py-1 opacity-70" aria-disabled="true">{body}</div>
  }

  return (
    <Link to={href} className="block px-5 py-1 transition-colors hover:bg-bg/60">
      {body}
    </Link>
  )
}
