import type {
  CourseFlow,
  LearningFlowLesson,
  LearningStepKey
} from '../../../types/domain'
import { cn } from '../../../utils/cn'
import { Icon, type IconName } from '../../ui/icon/Icon'

export interface FlowTarget {
  chapterPublicId: string
  step: LearningStepKey
}

const STEPS: Array<{ key: LearningStepKey; label: string; icon: IconName }> = [
  { key: 'content', label: 'Lesson content', icon: 'book-open' },
  { key: 'theory', label: 'Theory exam', icon: 'clipboard-check' },
  { key: 'practical', label: 'Practical exam', icon: 'terminal' },
  { key: 'assignment', label: 'Assignment', icon: 'check-square' }
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
  const unlocked = lesson.unlocked && step.unlocked
  const completed = unlocked && step.completed
  return {
    label: !unlocked ? 'Locked' : completed ? 'Complete' : 'Open',
    tone: !unlocked ? 'text-primary/35' : completed ? 'text-info' : 'text-primary/45',
    unlocked,
    completed
  }
}

function completedSteps(lesson: LearningFlowLesson): number {
  return STEPS.filter((step) => stepState(lesson, step.key).completed).length
}

function ProgressRing({ percent }: { percent: number }): React.JSX.Element {
  const clamped = Math.max(0, Math.min(100, Math.round(percent)))
  const radius = 22
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (clamped / 100) * circumference

  return (
    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
      <svg viewBox="0 0 56 56" className="h-14 w-14 -rotate-90" aria-hidden="true">
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          className="text-border/55"
        />
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-accent transition-[stroke-dashoffset] duration-500 ease-out"
        />
      </svg>
      <span className="absolute font-display text-xs font-bold tabular-nums text-primary">
        {clamped}%
      </span>
    </div>
  )
}

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
    <nav
      aria-label="Course outline"
      className="flex flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm xl:max-h-[calc(100dvh-6rem)]"
    >
      <div className="shrink-0 border-b border-border bg-primary/[0.025] px-4 py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/45">
              Course outline
            </p>
            <p className="mt-1 truncate font-display text-sm font-semibold tracking-tight text-primary">
              {flow.career.name}
            </p>
            <p className="mt-2 text-xs tabular-nums text-primary/55">
              <span className="font-semibold text-primary">{flow.progress.completed}</span> of{' '}
              {flow.progress.total} lessons complete
            </p>
          </div>
          <ProgressRing percent={flow.progress.percent} />
        </div>

        {flow.currentLesson ? (
          <div className="mt-3 flex items-center gap-2 rounded-lg border border-border/70 bg-surface/75 px-2.5 py-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
              <Icon name="route" className="h-3 w-3" />
            </span>
            <p className="min-w-0 truncate text-[11px] leading-relaxed text-primary/55">
              <span className="font-semibold text-primary">Up next</span> / Lesson{' '}
              {String(flow.currentLesson.number).padStart(2, '0')}: {flow.currentLesson.title}
            </p>
          </div>
        ) : null}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-2.5 py-3">
        <div className="flex items-center justify-between px-1.5 pb-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary/40">
            Lessons
          </p>
          <p className="text-[10px] tabular-nums text-primary/35">{flow.lessons.length} total</p>
        </div>

        <ol className="space-y-1">
          {flow.lessons.map((lesson) => {
            const lessonSelected = lesson.chapterPublicId === target.chapterPublicId
            const completeCount = completedSteps(lesson)
            return (
              <li key={lesson.chapterPublicId}>
                <button
                  type="button"
                  disabled={!lesson.unlocked}
                  onClick={() =>
                    onSelect({
                      chapterPublicId: lesson.chapterPublicId,
                      step: lesson.currentStep === 'complete' ? 'assignment' : lesson.currentStep
                    })
                  }
                  aria-current={lessonSelected ? 'step' : undefined}
                  aria-expanded={lessonSelected}
                  aria-controls={
                    lessonSelected ? `outline-steps-${lesson.chapterPublicId}` : undefined
                  }
                  className={cn(
                    'group w-full rounded-lg border px-2.5 py-2.5 text-left transition-colors duration-150',
                    lessonSelected
                      ? 'border-accent/35 bg-accent/[0.045] shadow-sm'
                      : lesson.unlocked
                        ? 'border-transparent hover:border-border hover:bg-primary/[0.025]'
                        : 'cursor-not-allowed border-transparent opacity-55'
                  )}
                >
                  <span className="flex items-start gap-2.5">
                    <span
                      className={cn(
                        'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border font-mono text-[10px] font-semibold',
                        lesson.completed
                          ? 'border-info/30 bg-info/10 text-info'
                          : lesson.unlocked
                            ? lessonSelected
                              ? 'border-accent/40 bg-accent/10 text-accent'
                              : 'border-border bg-bg/45 text-primary/55'
                            : 'border-border/60 bg-bg/30 text-primary/30'
                      )}
                    >
                      {lesson.completed ? (
                        <Icon name="check" className="h-3 w-3" />
                      ) : !lesson.unlocked ? (
                        <Icon name="lock" className="h-3 w-3" />
                      ) : (
                        String(lesson.number).padStart(2, '0')
                      )}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-primary/40">
                          Lesson {String(lesson.number).padStart(2, '0')}
                        </span>
                        <span
                          className={cn(
                            'shrink-0 text-[9px] font-semibold uppercase tracking-[0.08em]',
                            lesson.completed
                              ? 'text-info'
                              : lessonSelected
                                ? 'text-accent'
                                : lesson.unlocked
                                  ? 'text-primary/35'
                                  : 'text-primary/30'
                          )}
                        >
                          {lesson.completed
                            ? 'Done'
                            : lessonSelected
                              ? 'Current'
                              : lesson.unlocked
                                ? 'Open'
                                : 'Locked'}
                        </span>
                      </span>
                      <span
                        className={cn(
                          'mt-0.5 block text-[13px] leading-snug',
                          lessonSelected
                            ? 'font-semibold text-primary'
                            : lesson.unlocked
                              ? 'font-medium text-primary/80 group-hover:text-primary'
                              : 'font-medium text-primary/45'
                        )}
                      >
                        {lesson.title}
                      </span>
                      <span
                        className="mt-2 flex items-center gap-1"
                        role="img"
                        aria-label={`${completeCount} of ${STEPS.length} stages complete`}
                      >
                        {STEPS.map((stepDef) => {
                          const state = stepState(lesson, stepDef.key)
                          const current = lessonSelected && target.step === stepDef.key
                          return (
                            <span
                              key={stepDef.key}
                              className={cn(
                                'h-1 flex-1 rounded-full',
                                !state.unlocked
                                  ? 'bg-border/50'
                                  : state.completed
                                    ? 'bg-info/70'
                                    : current
                                      ? 'bg-accent'
                                      : 'bg-primary/20'
                              )}
                            />
                          )
                        })}
                      </span>
                    </span>
                  </span>
                </button>

                {lessonSelected ? (
                  <div
                    id={`outline-steps-${lesson.chapterPublicId}`}
                    className="mb-1.5 ml-5 border-l border-border/70 pl-2.5 pt-1"
                  >
                    <ul className="space-y-0.5">
                      {STEPS.map((stepDef) => {
                        const state = stepState(lesson, stepDef.key)
                        const active = target.step === stepDef.key
                        return (
                          <li key={stepDef.key}>
                            <button
                              type="button"
                              disabled={!state.unlocked}
                              onClick={() =>
                                onSelect({
                                  chapterPublicId: lesson.chapterPublicId,
                                  step: stepDef.key
                                })
                              }
                              aria-current={active ? 'step' : undefined}
                              className={cn(
                                'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors duration-150',
                                active
                                  ? 'bg-primary text-surface shadow-sm'
                                  : state.unlocked
                                    ? 'text-primary/65 hover:bg-primary/[0.035] hover:text-primary'
                                    : 'cursor-not-allowed text-primary/30'
                              )}
                            >
                              <Icon
                                name={
                                  !state.unlocked
                                    ? 'lock'
                                    : state.completed
                                      ? 'check'
                                      : stepDef.icon
                                }
                                className={cn(
                                  'h-3.5 w-3.5 shrink-0',
                                  active
                                    ? 'text-accent'
                                    : state.completed
                                      ? 'text-info'
                                      : 'text-primary/40'
                                )}
                              />
                              <span className="min-w-0 flex-1 truncate font-medium">
                                {stepDef.label}
                              </span>
                              <span
                                className={cn(
                                  'shrink-0 text-[9px] font-semibold uppercase tracking-[0.06em]',
                                  active ? 'text-surface/65' : state.tone
                                )}
                              >
                                {active ? 'Current' : state.label}
                              </span>
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ) : null}
              </li>
            )
          })}
        </ol>
      </div>

      <div className="shrink-0 border-t border-border bg-bg/20 px-4 py-3">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[10px] font-medium text-primary/45">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-info" />
            Complete
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Current
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary/20" />
            Open
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-border" />
            Locked
          </span>
        </div>
      </div>

      {currentLesson && !currentLesson.unlocked ? (
        <p className="shrink-0 border-t border-border px-4 py-3 text-xs leading-relaxed text-primary/55">
          {currentLesson.content.lockReason}
        </p>
      ) : null}
    </nav>
  )
}
