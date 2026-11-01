import type {
  CourseFlow,
  LearningFlowLesson,
  LearningStepKey
} from '../../../types/domain'
import { ProgressBar } from '../../app/primitives'

export interface FlowTarget {
  chapterPublicId: string
  step: LearningStepKey
}

const STEPS: Array<{ key: LearningStepKey; label: string }> = [
  { key: 'content', label: 'Lesson content' },
  { key: 'theory', label: 'Theory exam' },
  { key: 'practical', label: 'Practical exam' },
  { key: 'assignment', label: 'Assignment' }
]

function stepFor(lesson: LearningFlowLesson, key: LearningStepKey) {
  return key === 'content'
    ? lesson.content
    : key === 'theory'
      ? lesson.theory.step
      : key === 'practical'
        ? lesson.practical.step
        : lesson.assignment.step
}

function stepState(lesson: LearningFlowLesson, key: LearningStepKey): {
  label: string
  tone: string
  unlocked: boolean
  completed: boolean
} {
  const step = stepFor(lesson, key)
  // A locked lesson is authoritative even when historical progress left
  // completed records on its steps. Keep the data, but never present a locked
  // stage as completed or selectable.
  const unlocked = lesson.unlocked && step.unlocked
  return {
    label: !unlocked ? 'Locked' : step.completed ? 'Completed' : 'Available',
    tone: !unlocked
      ? 'text-primary/35'
      : step.completed
        ? 'text-info'
        : 'text-primary/70',
    unlocked,
    completed: unlocked && step.completed
  }
}

/**
 * Course outline for the strict lesson flow. Every lesson exposes the same
 * four ordered stages; only stages the server has unlocked are selectable.
 */
export function FlowSidebar({
  flow,
  target,
  onSelect
}: {
  flow: CourseFlow
  target: FlowTarget
  onSelect: (target: FlowTarget) => void
}): React.JSX.Element {
  const currentLesson = flow.lessons.find((lesson) => lesson.chapterPublicId === target.chapterPublicId)

  return (
    <nav aria-label="Course outline" className="rounded-lg border border-border bg-surface">
      <div className="border-b border-border px-4 py-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/45">
          Course progress
        </p>
        <p className="mt-1 font-display text-sm font-semibold text-primary">
          {flow.progress.completed} of {flow.progress.total} lessons complete
        </p>
        <div className="mt-2">
          <ProgressBar percent={flow.progress.percent} />
        </div>
      </div>

      <div className="max-h-[calc(100dvh-13rem)] overflow-y-auto px-2 py-2">
        <ol className="space-y-1">
          {flow.lessons.map((lesson) => {
            const lessonSelected = lesson.chapterPublicId === target.chapterPublicId
            return (
              <li key={lesson.chapterPublicId}>
                <button
                  type="button"
                  disabled={!lesson.unlocked}
                  onClick={() => onSelect({ chapterPublicId: lesson.chapterPublicId, step: lesson.currentStep === 'complete' ? 'assignment' : lesson.currentStep })}
                  aria-current={lessonSelected ? 'step' : undefined}
                  className={`w-full rounded-md px-3 py-2.5 text-left transition-colors ${
                    lessonSelected
                      ? 'bg-primary/[0.055]'
                      : lesson.unlocked
                        ? 'hover:bg-primary/[0.03]'
                        : 'cursor-not-allowed opacity-55'
                  }`}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-primary/45">
                      Lesson {String(lesson.number).padStart(2, '0')}
                    </span>
                    <span className={`text-[10px] font-medium ${lesson.completed ? 'text-info' : lesson.unlocked ? 'text-primary/55' : 'text-primary/35'}`}>
                      {lesson.completed ? 'Complete' : lesson.unlocked ? 'In progress' : 'Locked'}
                    </span>
                  </span>
                  <span className={`mt-1 block text-sm leading-snug ${lesson.unlocked ? 'text-primary' : 'text-primary/45'} ${lessonSelected ? 'font-semibold' : 'font-medium'}`}>
                    {lesson.title}
                  </span>
                </button>

                <ul className="mb-1 ml-3 border-l border-border/70 pl-2">
                  {STEPS.map((stepDef) => {
                    const state = stepState(lesson, stepDef.key)
                    const active = lessonSelected && target.step === stepDef.key
                    return (
                      <li key={stepDef.key}>
                        <button
                          type="button"
                          disabled={!state.unlocked}
                          onClick={() =>
                            onSelect({ chapterPublicId: lesson.chapterPublicId, step: stepDef.key })
                          }
                          aria-current={active ? 'step' : undefined}
                          className={`flex w-full items-center justify-between gap-2 rounded px-2 py-1.5 text-left text-xs transition-colors ${
                            active
                              ? 'bg-primary/[0.06] font-semibold text-primary'
                              : state.unlocked
                                ? 'text-primary/65 hover:bg-primary/[0.03] hover:text-primary'
                                : 'cursor-not-allowed text-primary/30'
                          }`}
                        >
                          <span className="truncate">{stepDef.label}</span>
                          <span className={`shrink-0 text-[10px] font-medium ${state.tone}`}>
                            {state.label}
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </li>
            )
          })}
        </ol>
      </div>

      {currentLesson && !currentLesson.unlocked ? (
        <p className="border-t border-border px-4 py-3 text-xs leading-relaxed text-primary/55">
          {currentLesson.content.lockReason}
        </p>
      ) : null}
    </nav>
  )
}
