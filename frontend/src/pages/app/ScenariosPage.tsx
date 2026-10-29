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

export default function ScenariosPage(): React.JSX.Element {
  const state = useAsync(() => simulationApi.scenarios(), [])

  if (state.loading) return <LoadingState />
  if (state.error) return careerGateOrError(state.error)

  const scenarios = state.data?.scenarios ?? []

  return (
    <div>
      <PageHeader
        eyebrow="Company simulation"
        title="Workplace scenarios"
        description="Difficult, realistic situations from your profession. Choose the actions you would actually take — decisions are evaluated."
      />

      {scenarios.length === 0 ? (
        <EmptyState
          title="No scenarios yet"
          description="Start the company simulation to receive workplace scenarios for your career."
        />
      ) : (
        <ul className="space-y-4">
          {scenarios.map((s) => (
            <li key={s.publicId}>
              <ScenarioCard scenario={s} onDone={() => state.reload()} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function ScenarioCard({ scenario, onDone }: { scenario: { publicId: string; category: string; situation: string; actions: string[]; status: string; score: number | null }; onDone: () => void }): React.JSX.Element {
  const [selected, setSelected] = useState<number[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{ score: number; feedback: Array<{ action?: string; assessment: string }>; missed: Array<{ action?: string; note?: string }> } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const toggle = (i: number): void => {
    setSelected((cur) => (cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i]))
  }

  const submit = async (): Promise<void> => {
    setSubmitting(true)
    setError(null)
    try {
      const r = await simulationApi.respondScenario(scenario.publicId, selected)
      setFeedback(r)
      onDone()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Submission failed.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Panel
      title={`Scenario · ${scenario.category}`}
      footer={
        scenario.status === 'open' && !feedback ? (
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-primary/55">Select every action you would take.</span>
            <Button size="sm" disabled={submitting || selected.length === 0} onClick={() => void submit()}>
              {submitting ? 'Submitting…' : 'Commit decisions'}
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-primary/70">Decisions committed.</span>
            {(feedback ?? null) || scenario.score !== null ? (
              <span className="text-sm font-semibold tabular-nums text-primary">
                {feedback?.score ?? scenario.score}/100
              </span>
            ) : null}
          </div>
        )
      }
    >
      <p className="text-sm leading-relaxed text-primary/85">{scenario.situation}</p>

      {error ? <p className="mt-3 rounded-md bg-attention/10 px-3 py-2 text-sm text-attention">{error}</p> : null}

      <fieldset className="mt-4 space-y-2">
        <legend className="sr-only">Available actions</legend>
        {scenario.actions.map((action, i) => {
          const isPicked = selected.includes(i)
          return (
            <label
              key={i}
              aria-disabled={scenario.status !== 'open'}
              className={`flex cursor-pointer items-start gap-2 rounded-md border px-3 py-2.5 text-sm leading-relaxed transition-colors ${
                isPicked ? 'border-accent/70 bg-accent/5 text-primary' : 'border-border text-primary/80 hover:border-accent/40'
              } ${scenario.status !== 'open' ? 'pointer-events-none opacity-70' : ''}`}
            >
              <input type="checkbox" checked={isPicked} onChange={() => toggle(i)} disabled={scenario.status !== 'open'} />
              <span>{action}</span>
            </label>
          )
        })}
      </fieldset>

      {feedback ? (
        <div className="mt-4 rounded-md bg-bg px-4 py-3">
          <div className="mb-2 flex items-center gap-2">
            <StatusText tone={feedback.score >= 70 ? 'passed' : 'failed'} />
          </div>
          <ul className="space-y-1.5">
            {feedback.feedback.map((f, i) => (
              <li key={i} className="text-sm leading-relaxed text-primary/75">
                · <span className="font-medium">{f.action}</span> — {f.assessment}
              </li>
            ))}
            {feedback.missed.map((m, i) => (
              <li key={`m${i}`} className="text-sm leading-relaxed text-attention">
                · Missed: <span className="font-medium">{m.action}</span> — {m.note}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Panel>
  )
}
