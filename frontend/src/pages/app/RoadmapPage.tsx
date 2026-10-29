import { progressApi } from '../../api/learning'
import { useAsync } from '../../hooks/useAsync'
import { careerGateOrError } from './LearningPathPage'
import { LoadingState, PageHeader } from '../../components/app/primitives'

export default function RoadmapPage(): React.JSX.Element {
  const state = useAsync(() => progressApi.roadmap(), [])

  if (state.loading) return <LoadingState />
  if (state.error) return careerGateOrError(state.error)

  const data = state.data!

  return (
    <div>
      <PageHeader
        eyebrow={data.career.name}
        title="Career roadmap"
        description="The complete professional journey generated from your selected career's curriculum and pipeline."
      />

      <ol className="space-y-4">
        {data.stages.map((stage) => (
          <li key={stage.name}>
            <div className={`rounded-lg border bg-surface p-4 ${stage.complete ? 'border-success/50' : 'border-border'}`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-sm font-semibold tracking-tight text-primary">{stage.name}</h2>
                <span className="text-xs tabular-nums text-primary/55">
                  {stage.kind === 'learning'
                    ? `${stage.completedTopics}/${stage.totalTopics} topics`
                    : statusLabel(stage.status)}
                </span>
              </div>
              {stage.chapters.length > 0 ? (
                <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-primary/60">
                  {stage.chapters.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

function statusLabel(status?: string): string {
  switch (status) {
    case 'complete': return 'Complete'
    case 'in_progress': return 'In progress'
    case 'available': return 'Available'
    default: return 'Locked'
  }
}
