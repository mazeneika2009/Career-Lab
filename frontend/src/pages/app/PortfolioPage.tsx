import { achievementsApi } from '../../api/learning'
import { useAsync } from '../../hooks/useAsync'
import { careerGateOrError } from './LearningPathPage'
import { Icon, type IconName } from '../../components/ui/icon/Icon'
import { EmptyState, LoadingState, PageHeader } from '../../components/app/primitives'

const SOURCE_LABELS: Record<string, string> = {
  assignment: 'Assignment',
  practical_exam: 'Practical exam',
  simulation: 'Simulation work',
  achievement: 'Achievement'
}

const SOURCE_ICONS: Record<string, IconName> = {
  assignment: 'file-text',
  practical_exam: 'terminal',
  simulation: 'building',
  achievement: 'award'
}

export default function PortfolioPage(): React.JSX.Element {
  const state = useAsync(() => achievementsApi.portfolio(), [])

  if (state.loading) return <LoadingState />
  if (state.error) return careerGateOrError(state.error)

  const data = state.data!

  return (
    <div>
      <PageHeader
        eyebrow={data.career.name}
        title="Portfolio"
        description="Your professional portfolio, assembled automatically from completed and qualifying work in this program."
      />

      {data.items.length === 0 ? (
        <EmptyState
          icon="folder"
          title="Nothing to show yet"
          description="Passed assignments, passed practical exams, strong simulation work and issued certificates appear here automatically."
        />
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {data.items.map((item) => (
            <li key={item.publicId} className="card-lift rounded-lg border border-border bg-surface p-5 hover:border-accent/45">
              <div className="flex items-start justify-between gap-2">
                <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                  <Icon
                    name={SOURCE_ICONS[item.sourceType] ?? 'award'}
                    className="h-3.5 w-3.5 shrink-0"
                  />
                  {SOURCE_LABELS[item.sourceType] ?? item.sourceType}
                </p>
                <span className="shrink-0 text-xs tabular-nums text-primary/50">
                  {new Date(item.completedAt).toLocaleDateString()}
                </span>
              </div>
              <h2 className="mt-1 font-display text-base font-semibold tracking-tight text-primary">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-primary/70">{item.summary}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
