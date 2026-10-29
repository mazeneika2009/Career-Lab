import { progressApi } from '../../api/learning'
import { useAsync } from '../../hooks/useAsync'
import { careerGateOrError } from './LearningPathPage'
import { LoadingState, PageHeader, Panel } from '../../components/app/primitives'

const CATEGORY_LABEL: Record<string, string> = {
  theory: 'Theory exam',
  practical: 'Practical exam',
  assignment: 'Assignment',
  communication: 'Communication',
  simulation: 'Simulation',
  interview: 'Interview'
}

export default function PerformanceReviewPage(): React.JSX.Element {
  const state = useAsync(() => progressApi.performanceReview(), [])

  if (state.loading) return <LoadingState />
  if (state.error) return careerGateOrError(state.error)

  const data = state.data!
  const p = data.performance

  const rows: Array<[string, number | null]> = [
    ['Learning', p.learning ?? null],
    ['Theory', p.theory ?? null],
    ['Practical', p.practical ?? null],
    ['Assignments', p.assignments ?? null],
    ['Communication', p.communication ?? null],
    ['Simulation', p.simulation ?? null],
    ['Technical interview', p.technicalInterview ?? null]
  ]

  return (
    <div>
      <PageHeader
        eyebrow={data.career.name}
        title="Performance review"
        description="An overall professional review compiled from your actual learning, assessment, communication, simulation and interview data."
      />

      <Panel title="Performance by area" icon="bar-chart" className="mb-4">
        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
          {rows.map(([label, score]) => (
            <div key={label}>
              <dt className="text-xs uppercase tracking-wide text-primary/50">{label}</dt>
              <dd className={`mt-1 text-xl font-semibold tabular-nums ${score === null ? 'text-primary/30' : score >= 70 ? 'text-primary' : 'text-attention'}`}>
                {score !== null ? `${score}` : '—'}
              </dd>
            </div>
          ))}
        </dl>
      </Panel>

      <div className="grid gap-4 md:grid-cols-2">
        <Panel title="Assessment history">
          {data.detail.assessmentHistory.length === 0 ? (
            <p className="text-sm text-primary/60">
              Complete an exam, assignment, simulation task or interview to build your history.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {data.detail.assessmentHistory.map((item) => (
                <li key={item.publicId} className="flex items-start justify-between gap-3 py-2 first:pt-0 last:pb-0">
                  <div className="min-w-0">
                    <p className="truncate text-sm text-primary/85">{item.title}</p>
                    <p className="mt-0.5 text-[11px] uppercase tracking-wide text-primary/45">
                      {CATEGORY_LABEL[item.category] ?? item.category} ·{' '}
                      {new Date(item.occurredAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 text-sm font-semibold tabular-nums ${
                      item.status === 'failed' ? 'text-attention' : 'text-primary'
                    }`}
                  >
                    {item.score}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-3 border-t border-border pt-3 text-xs tabular-nums text-primary/55">
            Communication threads: {data.detail.communicationThreads} · Workplace scenarios:{' '}
            {data.detail.workplaceScenarios} · Simulation submissions: {data.detail.simulationSubmissions} ·
            Interviews: {data.detail.interviews}
          </p>
        </Panel>

        <div className="space-y-4">
          <Panel title="Strengths">
            {data.strengths.length > 0 ? (
              <ul className="space-y-1.5">
                {data.strengths.map((s, i) => (
                  <li key={i} className="text-sm leading-relaxed text-primary/80">· {s}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-primary/60">Strengths appear once assessments are complete.</p>
            )}
          </Panel>

          <Panel title="Weaknesses">
            {data.weaknesses.length > 0 ? (
              <ul className="space-y-1.5">
                {data.weaknesses.map((w, i) => (
                  <li key={i} className="text-sm leading-relaxed text-attention">{w}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-primary/60">No areas currently below the professional bar.</p>
            )}
          </Panel>

          <Panel title="Improvement areas (priority order)">
            {data.improvementAreas.length > 0 ? (
              <ol className="space-y-1.5">
                {data.improvementAreas.map((a, i) => (
                  <li key={i} className="text-sm text-primary/80">{i + 1}. {a}</li>
                ))}
              </ol>
            ) : (
              <p className="text-sm text-primary/60">Complete more assessments to identify priorities.</p>
            )}
          </Panel>
        </div>
      </div>
    </div>
  )
}
