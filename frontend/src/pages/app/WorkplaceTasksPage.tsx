import { useState } from 'react'
import { simulationApi } from '../../api/learning'
import { useAsync } from '../../hooks/useAsync'
import { careerGateOrError } from './LearningPathPage'
import { Button } from '../../components/ui/button/Button'
import {
  EmptyState,
  LoadingState,
  PageHeader,
  Panel,
  StatusText
} from '../../components/app/primitives'

export default function WorkplaceTasksPage(): React.JSX.Element {
  const state = useAsync(() => simulationApi.tasks(), [])
  const [openTask, setOpenTask] = useState<string | null>(null)

  if (state.loading) return <LoadingState />
  if (state.error) return careerGateOrError(state.error)

  const data = state.data!

  return (
    <div>
      <PageHeader
        eyebrow={data.companyName ? `${data.companyName} · ${data.career.name}` : data.career.name}
        title="Workplace tasks"
        description="Professional assignments from your simulated team — realistic context, requirements, priorities and deadlines."
      />

      {openTask ? (
        <TaskSubmitter taskPublicId={openTask} onClose={() => setOpenTask(null)} onDone={() => state.reload()} />
      ) : data.tasks.length === 0 ? (
        <EmptyState
          icon="check-square"
          title="No tasks assigned"
          description="Start the company simulation to receive your task board."
        />
      ) : (
        <ul className="space-y-4">
          {data.tasks.map((t) => (
            <li key={t.publicId} className="rounded-lg border border-border bg-surface p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-base font-semibold tracking-tight text-primary">{t.title}</h2>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-primary/60">
                    <StatusText tone={t.priority} />
                    <span>Due: day {t.dueDayOffset}</span>
                    {t.submittedAt ? <span className="tabular-nums">Submitted</span> : null}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {t.score !== null ? (
                    <span className="text-sm font-semibold tabular-nums text-primary">{t.score}/100</span>
                  ) : null}
                  <StatusText tone={t.status === 'completed' && t.score !== null ? 'completed' : t.status} />
                </div>
              </div>

              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-primary/75">{t.context}</p>

              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <section>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-primary/55">Requirements</h3>
                  <ul className="mt-1.5 space-y-1">
                    {t.requirements.map((r, i) => (
                      <li key={i} className="text-sm leading-relaxed text-primary/80">· {r}</li>
                    ))}
                  </ul>
                </section>
                <section>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-primary/55">Expected output · Skills evaluated</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-primary/80">{t.expectedOutput}</p>
                  <p className="mt-1 text-xs text-primary/60">{t.skillsEvaluated.join(', ')}</p>
                </section>
              </div>

              {t.status !== 'completed' || t.score === null ? (
                <div className="mt-4">
                  <Button size="sm" onClick={() => setOpenTask(t.publicId)}>
                    Submit work
                  </Button>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function TaskSubmiterPlaceholder(): null {
  return null
}

function TaskSubmitter({
  taskPublicId,
  onClose,
  onDone
}: {
  taskPublicId: string
  onClose: () => void
  onDone: () => void
}): React.JSX.Element {
  const [response, setResponse] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [score, setScore] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const submit = async (): Promise<void> => {
    setSubmitting(true)
    setError(null)
    try {
      const r = await simulationApi.submitTask(taskPublicId, response)
      setScore(r.score)
      onDone()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Submission failed.')
    } finally {
      setSubmitting(false)
    }
  }

  void TaskSubmiterPlaceholder

  if (score !== null) {
    return (
      <Panel title={`Submitted · scored ${score}/100`}>
        <p className="text-sm text-primary/75">The evaluation with strengths and recommendations is available under Evaluations.</p>
        <Button variant="secondary" size="sm" onClick={onClose} className="mt-3">Back to tasks</Button>
      </Panel>
    )
  }

  return (
    <Panel
      title="Deliver your work"
      footer={
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs tabular-nums text-primary/50">{response.trim().split(/\s+/).filter(Boolean).length} words</span>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={onClose}>Cancel</Button>
            <Button size="sm" disabled={submitting || response.trim().length < 60} onClick={() => void submit()}>
              {submitting ? 'Submitting…' : 'Submit for review'}
            </Button>
          </div>
        </div>
      }
    >
      {error ? <p className="mb-3 rounded-md bg-attention/10 px-3 py-2 text-sm text-attention">{error}</p> : null}
      <label htmlFor="task-response" className="sr-only">Task deliverable</label>
      <textarea
        id="task-response"
        rows={10}
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        placeholder="Describe your completed work exactly as your lead expects to receive it — decisions made, artifacts produced, checks performed."
        className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm leading-relaxed text-primary placeholder:text-primary/35 focus:border-accent/60 focus:outline-none"
      />
    </Panel>
  )
}
