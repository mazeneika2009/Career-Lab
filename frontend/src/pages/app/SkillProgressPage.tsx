import { learningApi } from '../../api/learning'
import { useAsync } from '../../hooks/useAsync'
import { careerGateOrError } from './LearningPathPage'
import { LoadingState, PageHeader, ProgressBar } from '../../components/app/primitives'

export default function SkillProgressPage(): React.JSX.Element {
  const state = useAsync(() => learningApi.skills(), [])

  if (state.loading) return <LoadingState />
  if (state.error) return careerGateOrError(state.error)

  const data = state.data!

  return (
    <div>
      <PageHeader
        eyebrow={data.career.name}
        title="Skill progress"
        description="Per-skill development built from your completed learning, exam results, assignments, practical work, simulation, communication and interview performance."
      />

      <ul className="space-y-4">
        {data.skills.map((s) => (
          <li key={s.skill} className="rounded-lg border border-border bg-surface p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-base font-semibold tracking-tight text-primary">{s.skill}</h2>
              <span className="text-sm font-medium text-primary/70">{s.currentLevel}</span>
            </div>

            <div className="mt-3 max-w-md">
              <ProgressBar
                percent={s.percent}
                label={
                  s.learningTotal > 0
                    ? `${s.learningDone}/${s.learningTotal} topics completed`
                    : 'No linked lessons yet'
                }
              />
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4 text-sm sm:grid-cols-3 lg:grid-cols-6">
              <Metric label="Exams" value={s.examPerformance} />
              <Metric label="Assignments" value={s.assignmentPerformance} />
              <Metric label="Practical" value={s.practicalPerformance} />
              <Metric label="Simulation" value={s.simulationPerformance} />
              <Metric label="Communication" value={s.communicationPerformance} />
              <Metric label="Interview" value={s.interviewPerformance} />
            </dl>
          </li>
        ))}
      </ul>
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
