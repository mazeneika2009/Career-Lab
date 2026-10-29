import { Link } from 'react-router-dom'
import { learningApi } from '../../api/learning'
import { isNoCareerError, useAsync } from '../../hooks/useAsync'
import { ROUTES } from '../../constants/routes'
import {
  EmptyState,
  ErrorState,
  LoadingState,
  PageHeader,
  ProgressBar,
  StatusText
} from '../../components/app/primitives'

export default function LearningPathPage(): React.JSX.Element {
  const state = useAsync(() => learningApi.learningPath(), [])

  if (state.loading) return <LoadingState />
  if (state.error) return careerGateOrError(state.error)

  const data = state.data!

  return (
    <div>
      <PageHeader
        eyebrow={data.career.name}
        title="Your learning path"
        description={data.career.pathSummary}
      />

      <ol className="space-y-4">
        {data.stages.map((stage) => (
          <li key={stage.stage + stage.title}>
            <article className="rounded-lg border border-border bg-surface p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">{stage.stage}</p>
                  <h2 className="mt-0.5 text-base font-semibold tracking-tight text-primary">{stage.title}</h2>
                </div>
                <div className="w-40">
                  <ProgressBar
                    percent={
                      stage.progress.total ? (stage.progress.completed / stage.progress.total) * 100 : 0
                    }
                    label={`${stage.progress.completed}/${stage.progress.total} topics`}
                  />
                </div>
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-primary/70">{stage.description}</p>

              <ul className="mt-4 divide-y divide-border/70 border-t border-border/70">
                {stage.topics.map((topic) => (
                  <li key={topic.publicId} className="flex items-center justify-between gap-3 py-2.5">
                    <div className="min-w-0">
                      <p className={`truncate text-sm ${topic.locked ? 'text-primary/40' : 'text-primary'}`}>
                        {topic.title}
                      </p>
                      <p className="text-xs tabular-nums text-primary/50">{topic.minutes} min</p>
                    </div>
                    <div className="shrink-0">
                      {topic.status === 'completed' ? (
                        <StatusText tone="completed" />
                      ) : topic.locked ? (
                        <StatusText tone="locked" />
                      ) : (
                        <Link to={ROUTES.learn} className="text-sm font-medium text-accent hover:underline">
                          {topic.status === 'in_progress' ? 'Continue' : 'Start'}
                        </Link>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}

        <li>
          <p className="text-sm text-primary/60">
            After the advanced stage: virtual interview → technical interview → professional simulation → career readiness.
          </p>
        </li>
      </ol>
    </div>
  )
}

export function careerGateOrError(error: unknown): React.JSX.Element {
  if (isNoCareerError(error)) {
    return (
      <EmptyState
        icon="compass"
        title="No career selected yet"
        description="Select a career first — your learning path is built from its curriculum."
        action={
          <Link to={ROUTES.careers} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-surface">
            Go to career selection
          </Link>
        }
      />
    )
  }
  return <ErrorState error={error} />
}
