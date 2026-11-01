import { useState } from 'react'
import { assignmentsApi } from '../../../api/learning'
import { useAsync } from '../../../hooks/useAsync'
import type {
  AssignmentSubmitResult,
  LearningFlowLesson
} from '../../../types/domain'
import { Button } from '../../ui/button/Button'
import { ErrorState, LoadingState, Panel, StatusText } from '../../app/primitives'
import { AssignmentSubmissionPanel } from './AssignmentSubmissionPanel'

/**
 * Fourth course-player stage. The assignment belongs to this lesson and is
 * only reachable after the practical exam has passed and been verified.
 */
export function AssignmentStep({
  lesson,
  nextLessonNumber,
  onGraded,
  onContinue
}: {
  lesson: LearningFlowLesson
  nextLessonNumber: number | null
  onGraded: () => void
  onContinue: () => void
}): React.JSX.Element {
  const assignment = lesson.assignment
  const state = useAsync(
    () => assignmentsApi.detail(assignment.assignmentPublicId),
    [assignment.assignmentPublicId]
  )
  const [graded, setGraded] = useState<AssignmentSubmitResult | null>(null)

  if (state.loading) return <LoadingState />
  if (state.error) return <ErrorState error={state.error} />

  const detail = state.data!
  const passed = graded?.passed ?? assignment.passed
  const failedAttempt = graded ? !graded.passed : assignment.submissionCount > 0

  return (
    <section className="rounded-lg border border-border bg-surface">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border px-5 py-4">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
            Assignment · Lesson {String(lesson.number).padStart(2, '0')}
          </p>
          <h2 className="mt-1 text-balance font-display text-lg font-bold tracking-tight text-primary">
            {detail.title}
          </h2>
          <p className="mt-1 max-w-3xl text-sm leading-relaxed text-primary/65">
            {detail.objective}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2 text-xs text-primary/55">
          <span>Pass mark {assignment.passScore}</span>
          <StatusText tone={passed ? 'passed' : failedAttempt ? 'failed' : 'open'} />
        </div>
      </div>

      <div className="space-y-4 px-5 py-4">
        <Panel title="Requirements">
          <ol className="space-y-2">
            {detail.requirements.map((requirement, index) => (
              <li key={index} className="flex gap-2 text-sm leading-relaxed text-primary/80">
                <span aria-hidden className="font-medium tabular-nums text-accent">
                  {index + 1}.
                </span>
                {requirement}
              </li>
            ))}
          </ol>
        </Panel>

        <Panel title={`Submission area — ${detail.submissionSpec.textLabel}`}>
          <AssignmentSubmissionPanel
            assignment={detail}
            onGraded={(result) => {
              setGraded(result)
              onGraded()
            }}
          />
        </Panel>

        {passed ? (
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
            <p className="text-sm leading-relaxed text-primary/70">
              {nextLessonNumber
                ? `Assignment complete. Lesson ${String(nextLessonNumber).padStart(2, '0')} is now unlocked.`
                : 'Assignment complete. You have finished the final lesson.'}
            </p>
            <Button size="sm" onClick={onContinue}>
              {nextLessonNumber
                ? `Continue to Lesson ${String(nextLessonNumber).padStart(2, '0')}`
                : 'Finish course'}
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  )
}
