import { Link, useParams } from 'react-router-dom'
import { assignmentsApi } from '../../api/learning'
import { ApiError } from '../../services/api-client'
import { useAsync } from '../../hooks/useAsync'
import { ROUTES } from '../../constants/routes'
import {
  ErrorState,
  KeyValue,
  LoadingState,
  PageHeader,
  Panel,
  StatusText
} from '../../components/app/primitives'
import { Icon } from '../../components/ui/icon/Icon'
import { AssignmentSubmissionPanel } from '../../components/learning/flow/AssignmentSubmissionPanel'

/** Assignment Submission: requirements, instructions and the submission area. */
export default function AssignmentSubmissionPage(): React.JSX.Element {
  const { assignmentId } = useParams<{ assignmentId: string }>()
  const state = useAsync(() => assignmentsApi.detail(assignmentId ?? ''), [assignmentId])

  if (state.loading) return <LoadingState />
  if (state.error) {
    if (state.error instanceof ApiError && state.error.code === 'ASSIGNMENT_LOCKED') {
      return (
        <div>
          <PageHeader
            eyebrow="Assignment locked"
            title="This assignment is not available yet"
            description="Assignments are the fourth stage of their lesson and stay sealed until the practical exam has passed."
            actions={
              <Link
                to={ROUTES.assignments}
                className="text-sm text-primary underline decoration-border hover:decoration-accent"
              >
                All assignments
              </Link>
            }
          />
          <div className="flex items-start gap-3 rounded-lg border border-border bg-surface px-5 py-4">
            <Icon name="lock" className="mt-0.5 h-5 w-5 shrink-0 text-primary/45" />
            <div>
              <p className="font-display text-sm font-semibold text-primary">
                Locked until the lesson is complete
              </p>
              <p className="mt-1 text-sm leading-relaxed text-primary/65">
                {state.error.message}
              </p>
              <Link
                to={ROUTES.learn}
                className="mt-3 inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-surface hover:brightness-110"
              >
                Continue the lesson
              </Link>
            </div>
          </div>
        </div>
      )
    }
    return <ErrorState error={state.error} />
  }

  const a = state.data!
  const spec = a.submissionSpec

  return (
    <div>
      <PageHeader
        eyebrow={
          a.lesson
            ? `Lesson ${String(a.lesson.number).padStart(2, '0')} assignment`
            : 'Assignment submission'
        }
        title={a.title}
        description={a.objective}
        actions={
          <Link to={ROUTES.assignments} className="text-sm text-primary underline decoration-border hover:decoration-accent">
            All assignments
          </Link>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
        <div className="space-y-4">
          <Panel title="Requirements">
            <ul className="space-y-2">
              {(a.requirements as string[]).map((r, i) => (
                <li key={i} className="flex gap-2 text-sm leading-relaxed text-primary/80">
                  <span aria-hidden className="font-medium tabular-nums text-accent">{i + 1}.</span>
                  {r}
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title={`Submission area — ${spec.textLabel}`}>
            <AssignmentSubmissionPanel
              assignment={a}
              onGraded={() => state.reload()}
            />
          </Panel>
        </div>

        <aside className="space-y-4">
          <Panel title="Details">
            <dl className="space-y-3">
              {a.lesson ? (
                <KeyValue
                  label="Lesson"
                  value={`${String(a.lesson.number).padStart(2, '0')} · ${a.lesson.title}`}
                />
              ) : null}
              <KeyValue label="Stage" value={a.stage} />
              <KeyValue label="Difficulty" value={a.difficulty} />
              <KeyValue label="Due" value={`Day ${a.dueDays}`} />
              <KeyValue label="Pass mark" value="70 / 100" />
              <KeyValue
                label="Current score"
                value={a.score !== null ? `${a.score} / 100` : 'Not submitted'}
              />
              <KeyValue label="Skills evaluated" value={(a.skillsEvaluated as string[]).join(', ')} />
            </dl>
          </Panel>

          <Panel title="Status">
            <StatusText tone={a.passed ? 'passed' : a.previousSubmissions.length > 0 ? 'submitted' : 'open'} />
            <p className="mt-2 text-xs leading-relaxed text-primary/55">
              A passing submission completes this lesson’s fourth stage and unlocks the next
              lesson. Failed submissions can be revised and resubmitted.
            </p>
          </Panel>

          <Panel title="Previous submissions">
            {a.previousSubmissions.length === 0 ? (
              <p className="text-sm text-primary/60">No submissions yet.</p>
            ) : (
              <ul className="space-y-2">
                {a.previousSubmissions.map((s) => (
                  <li key={s.publicId} className="flex items-center justify-between gap-2 text-sm">
                    <span className="tabular-nums text-primary/70">{new Date(s.submittedAt).toLocaleDateString()}</span>
                    <StatusText tone={s.status === 'evaluated' ? 'completed' : 'submitted'} />
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </aside>
      </div>
    </div>
  )
}
