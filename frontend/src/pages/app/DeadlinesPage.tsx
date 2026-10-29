import { simulationApi } from '../../api/learning'
import { useAsync } from '../../hooks/useAsync'
import { careerGateOrError } from './LearningPathPage'
import { EmptyState, LoadingState, PageHeader, StatusText } from '../../components/app/primitives'

export default function DeadlinesPage(): React.JSX.Element {
  const state = useAsync(() => simulationApi.deadlines(), [])

  if (state.loading) return <LoadingState />
  if (state.error) return careerGateOrError(state.error)

  const items = state.data?.items ?? []

  return (
    <div>
      <PageHeader
        eyebrow="Company simulation"
        title="Deadlines & priorities"
        description="Organize your workload: every task carries a priority, a deadline and required actions. How you order them is part of your professional training."
      />

      {items.length === 0 ? (
        <EmptyState
          icon="calendar-clock"
          title="Nothing scheduled"
          description="Start the company simulation to receive your task board with deadlines and dependencies."
        />
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <li
              key={item.publicId}
              className={`rounded-lg border bg-surface p-4 ${item.overdue ? 'border-error/50' : 'border-border'}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h2 className="text-sm font-semibold tracking-tight text-primary">{item.title}</h2>
                <div className="flex shrink-0 items-center gap-2">
                  <StatusText tone={item.priority} />
                  <StatusText tone={item.status} />
                </div>
              </div>
              <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-primary/70">{item.context}</p>
              <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                <span className={item.overdue ? 'font-medium text-error' : 'tabular-nums text-primary/60'}>
                  {item.overdue ? 'Overdue' : `${item.daysRemaining} day${item.daysRemaining === 1 ? '' : 's'} remaining`}
                </span>
                <span className="text-primary/60">Required action: {item.requiredAction}</span>
                {item.dependencies.length > 0 ? (
                  <span className="text-primary/60">
                    Depends on: {item.dependencies.map((d) => d.title).join(', ')}
                  </span>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
