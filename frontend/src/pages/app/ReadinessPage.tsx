import { achievementsApi } from '../../api/learning'
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

export default function ReadinessPage(): React.JSX.Element {
  const state = useAsync(() => achievementsApi.readiness(), [])

  if (state.loading) return <LoadingState />
  if (state.error) return careerGateOrError(state.error)

  const d = state.data!

  return (
    <div>
      <PageHeader
        eyebrow={d.career.name}
        title="Career readiness"
        description="Whether you are ready to enter professional work — computed from real performance across every pipeline stage, not just content completion."
      />

      <Panel className="mb-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-4xl font-semibold tabular-nums text-primary">{d.overallPercent}%</p>
            <p className="mt-2 text-sm text-primary/65">
              {d.ready ? 'Ready for professional work' : 'Not yet ready for professional work'}
            </p>
          </div>
          <dl className="grid grid-cols-3 gap-x-6 gap-y-2 text-sm">
            <Metric label="Practical" value={d.practicalPerformance} />
            <Metric label="Workplace" value={d.workplacePerformance} />
            <Metric label="Interview" value={d.interviewPerformance} />
          </dl>
        </div>
      </Panel>

      <div className="grid gap-4 md:grid-cols-2">
        <Panel title="Component scores" icon="bar-chart">
          <ul className="space-y-2.5">
            {Object.entries(d.components).map(([key, value]) => (
              <li key={key}>
                <ProgressBar percent={value ?? 0} label={labelFor(key)} />
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Required skills — current level" icon="target">
          <ul className="space-y-2.5">
            {d.requiredSkills.map((s) => (
              <li key={s.skill}>
                <ProgressBar percent={s.currentLevel} label={s.skill} />
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Missing requirements" icon="alert-triangle">
          {d.missingRequirements.length === 0 ? (
            <p className="inline-flex items-center gap-1.5 text-sm text-success">
              <Icon name="check-circle" className="h-4 w-4" />
              All requirements satisfied.
            </p>
          ) : (
            <ul className="space-y-1.5">
              {d.missingRequirements.map((m, i) => (
                <li key={i} className="text-sm leading-relaxed text-attention">· {m}</li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel title="Recommended improvements" icon="lightbulb">
          {d.recommendedImprovements.length > 0 ? (
            <ul className="space-y-2.5">
              {d.recommendedImprovements.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-primary/80">
                  <Icon name="arrow-right" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent/75" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-primary/60">
              No targeted recommendations — keep maintaining performance across all areas.
            </p>
          )}
        </Panel>
      </div>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: number | null }): React.JSX.Element {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-primary/50">{label}</dt>
      <dd className="mt-0.5 font-semibold tabular-nums text-primary">{value !== null ? `${value}/100` : '—'}</dd>
    </div>
  )
}

function labelFor(key: string): string {
  const labels: Record<string, string> = {
    learning: 'Learning completion',
    theory: 'Theory exams',
    practical: 'Practical exams',
    assignments: 'Assignments',
    simulation: 'Simulation',
    communication: 'Communication',
    interview: 'Technical interview'
  }
  return labels[key] ?? key
}
