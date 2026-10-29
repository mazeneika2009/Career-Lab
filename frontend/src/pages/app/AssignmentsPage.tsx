import { Link } from 'react-router-dom'
import { assignmentsApi } from '../../api/learning'
import { useAsync } from '../../hooks/useAsync'
import { careerGateOrError } from './LearningPathPage'
import { ROUTES } from '../../constants/routes'
import {
  EmptyState,
  LoadingState,
  PageHeader,
  StatusText
} from '../../components/app/primitives'
import { Icon } from '../../components/ui/icon/Icon'

export default function AssignmentsPage(): React.JSX.Element {
  const state = useAsync(() => assignmentsApi.list(), [])

  if (state.loading) return <LoadingState />
  if (state.error) return careerGateOrError(state.error)

  const data = state.data!

  return (
    <div>
      <PageHeader
        eyebrow={data.career.name}
        title="Assignments"
        description="Each assignment is the final stage of its lesson. Pass the lesson content, theory exam and practical exam to unlock it — then submit work that is evaluated against every requirement."
      />

      {data.assignments.length === 0 ? (
        <EmptyState
          icon="file-text"
          title="No assignments yet"
          description="Assignments for your career will appear here."
        />
      ) : (
        <ul className="space-y-4">
          {data.assignments.map((a) => {
            const locked = a.locked
            const tone = a.passed ? 'passed' : locked ? 'locked' : a.status
            return (
              <li
                key={a.publicId}
                className={`rounded-lg border bg-surface p-5 transition-colors ${
                  locked
                    ? 'border-border'
                    : 'card-lift border-border hover:border-accent/45'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                      {a.lesson
                        ? `Lesson ${String(a.lesson.number).padStart(2, '0')} · ${a.stage}`
                        : a.stage}
                    </p>
                    <h2 className="mt-0.5 text-base font-semibold tracking-tight text-primary">
                      {a.title}
                    </h2>
                  </div>
                  <StatusText tone={tone} />
                </div>

                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-primary/75">
                  {a.objective}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-primary/60">
                  {a.lesson ? <span>{a.lesson.title}</span> : null}
                  <span>Due: day {a.dueDays}</span>
                  <span>Skills evaluated: {(a.skillsEvaluated ?? []).join(', ')}</span>
                  {a.score !== null ? <span>Latest score: {a.score}/100</span> : null}
                </div>

                {locked ? (
                  <div className="mt-4 flex flex-wrap items-center gap-3 rounded-md border border-border bg-bg/70 px-4 py-3">
                    <Icon name="lock" className="h-4 w-4 shrink-0 text-primary/40" />
                    <p className="min-w-0 flex-1 text-sm leading-relaxed text-primary/60">
                      {a.lockReason ??
                        'Finish this lesson’s practical exam to unlock its assignment.'}
                    </p>
                    <Link
                      to={ROUTES.learn}
                      className="shrink-0 text-sm font-medium text-primary underline decoration-border underline-offset-2 transition-colors hover:decoration-accent"
                    >
                      Go to course
                    </Link>
                  </div>
                ) : (
                  <div className="mt-4">
                    <Link
                      to={ROUTES.assignmentSubmission(a.publicId)}
                      className="inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-surface hover:brightness-110"
                    >
                      {a.passed
                        ? 'View completion & evaluation'
                        : a.status === 'submitted'
                          ? 'Revise submission'
                          : 'Open submission'}
                    </Link>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
