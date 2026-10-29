import { evaluationsApi } from '../../api/learning'
import { useAsync } from '../../hooks/useAsync'
import { careerGateOrError } from './LearningPathPage'
import { Icon } from '../../components/ui/icon/Icon'
import {
  EmptyState,
  LoadingState,
  PageHeader,
  Panel,
  ProgressBar
} from '../../components/app/primitives'

/** Evaluation / Feedback — professional assessment output with structured next-step guidance. */
export default function EvaluationsPage(): React.JSX.Element {
  const state = useAsync(() => evaluationsApi.list(), [])

  if (state.loading) return <LoadingState />
  if (state.error) return careerGateOrError(state.error)

  const data = state.data!

  return (
    <div>
      <PageHeader
        eyebrow={data.career.name}
        title="Evaluations & feedback"
        description="Structured assessments of your submitted work: what met the standard, what did not, and what to improve next."
      />

      {data.evaluations.length === 0 ? (
        <EmptyState
          icon="message-square"
          title="No evaluations yet"
          description="Submit assignments, practical exams, workplace tasks, scenarios or your interview — each is assessed against its requirements."
        />
      ) : (
        <ul className="space-y-4">
          {data.evaluations.map((e) => (
            <li key={e.publicId}>
              <Panel>
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                      {labelTargetType(e.targetType)} · {new Date(e.createdAt).toLocaleDateString()}
                    </p>
                    <h2 className="mt-0.5 text-base font-semibold tracking-tight text-primary">{e.targetTitle}</h2>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-semibold tabular-nums text-primary">{e.overallScore}</p>
                    <p className="text-xs text-primary/50">overall score</p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-primary/80">{e.verdict}</p>

                <div className="mt-5 grid gap-5 md:grid-cols-3">
                  <section>
                    <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary/55">
                      <Icon name="check-circle" className="h-3.5 w-3.5 text-success" />
                      Three strengths
                    </h3>
                    <ul className="mt-2 space-y-1.5">
                      {(e.strengths as string[]).map((s, i) => (
                        <li key={i} className="text-sm leading-relaxed text-primary/80">· {s}</li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary/55">
                      <Icon name="alert-triangle" className="h-3.5 w-3.5 text-attention" />
                      Errors & weaknesses
                    </h3>
                    <ul className="mt-2 space-y-1.5">
                      {(e.weaknesses as string[]).length > 0 ? (
                        (e.weaknesses as string[]).map((w, i) => (
                          <li key={i} className="text-sm leading-relaxed text-attention">{w}</li>
                        ))
                      ) : (
                        <li className="text-sm text-primary/60">No significant weaknesses recorded.</li>
                      )}
                    </ul>
                    {(e.errorNotes as string[]).length > 0 ? (
                      <ul className="mt-2 space-y-1">
                        {(e.errorNotes as string[]).map((n, i) => (
                          <li key={i} className="text-xs leading-relaxed text-primary/60">{n}</li>
                        ))}
                      </ul>
                    ) : null}
                  </section>

                  <section>
                    <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary/55">
                      <Icon name="lightbulb" className="h-3.5 w-3.5 text-accent" />
                      Improvement recommendations
                    </h3>
                    <ul className="mt-2 space-y-1.5">
                      {(e.recommendations as string[]).map((r, i) => (
                        <li key={i} className="text-sm leading-relaxed text-primary/80">· {r}</li>
                      ))}
                    </ul>
                  </section>
                </div>

                <div className="mt-5 border-t border-border pt-4">
                  <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary/55">
                    <Icon name="bar-chart" className="h-3.5 w-3.5 text-primary/45" />
                    Skill-level assessment
                  </h3>
                  <ul className="mt-2 grid gap-2 md:grid-cols-2">
                    {(e.skillLevels as Array<{ skill: string; level: string; percent: number }>).map((s) => (
                      <li key={s.skill}>
                        <ProgressBar percent={s.percent} label={`${s.skill} · ${s.level}`} />
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="mt-5 flex items-start gap-2 rounded-md border border-accent/20 bg-accent/5 px-3 py-2 text-sm leading-relaxed text-primary/75">
                  <Icon name="arrow-right" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>
                    <span className="font-medium text-primary">Next recommended learning area:</span> {e.nextArea}
                  </span>
                </p>
              </Panel>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function labelTargetType(t: string): string {
  const labels: Record<string, string> = {
    assignment: 'Assignment',
    practical_exam: 'Practical exam',
    sim_task: 'Workplace task',
    scenario: 'Workplace scenario',
    communication: 'Communication',
    interview: 'Technical interview'
  }
  return labels[t] ?? t
}
