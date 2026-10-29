import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { learningApi } from '../../api/learning'
import { useAsync } from '../../hooks/useAsync'
import type {
  CourseFlow,
  LearningFlowLesson,
  LearningStepKey,
  TheoryLessonReference
} from '../../types/domain'
import { ROUTES } from '../../constants/routes'
import { careerGateOrError } from './LearningPathPage'
import {
  EmptyState,
  ErrorState,
  LoadingState,
  PageHeader,
  ProgressBar
} from '../../components/app/primitives'
import { FlowSidebar, type FlowTarget } from '../../components/learning/flow/FlowSidebar'
import {
  LessonContentStep,
  type LessonContentFocus
} from '../../components/learning/flow/LessonContentStep'
import { AssignmentStep } from '../../components/learning/flow/AssignmentStep'
import { TheoryExamRunner } from '../../components/learning/TheoryExamRunner'
import { Button } from '../../components/ui/button/Button'
import { Icon } from '../../components/ui/icon/Icon'

// Monaco is only needed for the practical step. Keep it out of the initial
// course-player bundle so reading and theory load without the editor payload.
const PracticalExamWorkspace = lazy(async () => {
  const module = await import('../../components/learning/flow/PracticalExamWorkspace')
  return { default: module.PracticalExamWorkspace }
})

const STEP_ORDER: Array<{ key: LearningStepKey; label: string; short: string }> = [
  { key: 'content', label: 'Lesson content', short: 'Content' },
  { key: 'theory', label: 'Theory exam', short: 'Theory' },
  { key: 'practical', label: 'Practical exam', short: 'Practical' },
  { key: 'assignment', label: 'Assignment', short: 'Assignment' }
]

const OUTLINE_STORAGE_KEY = 'career-lab:course-outline-open'

function stepFor(lesson: LearningFlowLesson, key: LearningStepKey) {
  return key === 'content'
    ? lesson.content
    : key === 'theory'
      ? lesson.theory.step
      : key === 'practical'
        ? lesson.practical.step
        : lesson.assignment.step
}

function defaultTarget(flow: CourseFlow): FlowTarget {
  const current = flow.currentLesson
  if (current) {
    return {
      chapterPublicId: current.chapterPublicId,
      step: current.currentStep === 'complete' ? 'assignment' : current.currentStep
    }
  }
  const last = flow.lessons[flow.lessons.length - 1]
  return last
    ? { chapterPublicId: last.chapterPublicId, step: 'assignment' }
    : { chapterPublicId: '', step: 'content' }
}

function readOutlinePreference(): boolean {
  if (typeof window === 'undefined') return true
  try {
    const stored = window.localStorage.getItem(OUTLINE_STORAGE_KEY)
    if (stored === 'closed') return false
    if (stored === 'open') return true
  } catch {
    // Storage can be unavailable in private contexts; keep the desktop default.
  }
  return true
}

/**
 * Unified course player. One lesson at a time, in a strict order:
 * lesson content → theory exam → practical coding exam → assignment → next lesson.
 *
 * Access is never decided in the browser. The server computes every step's
 * lock state from Supabase-backed completion records, and the exam/assignment
 * endpoints re-check that same state before returning content or accepting work.
 */
export default function UnifiedLearningPage(): React.JSX.Element {
  const [target, setTarget] = useState<FlowTarget | null>(null)
  const [reviewFocus, setReviewFocus] = useState<LessonContentFocus | null>(null)
  const [outlineOpen, setOutlineOpen] = useState<boolean>(readOutlinePreference)
  const [outlineDrawerOpen, setOutlineDrawerOpen] = useState(false)
  const desktopOutlineRef = useRef<HTMLElement>(null)
  const drawerCloseRef = useRef<HTMLButtonElement>(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const state = useAsync(async () => {
    const flow = await learningApi.courseFlow()
    return { flow }
  }, [])

  const flow = state.data?.flow ?? null
  const activeTarget = useMemo(() => {
    if (!flow) return target
    const fallback = defaultTarget(flow)
    if (!target) return fallback
    const lesson = flow.lessons.find((item) => item.chapterPublicId === target.chapterPublicId)
    if (!lesson || !lesson.unlocked || !stepFor(lesson, target.step).unlocked) return fallback
    return target
  }, [flow, target])

  // Deep links from theory-exam hints land here with the exact topic and
  // section to re-study. Consume the params once, then clean the URL.
  useEffect(() => {
    if (!flow) return
    const topicId = searchParams.get('topic')
    const chapterParam = searchParams.get('chapter')
    if (!topicId && !chapterParam) return

    const lesson =
      (topicId
        ? flow.lessons.find((item) =>
            item.topics.some((topic) => topic.publicId === topicId)
          )
        : null) ?? flow.lessons.find((item) => item.chapterPublicId === chapterParam)
    setSearchParams({}, { replace: true })
    if (!lesson || !lesson.unlocked) return

    setTarget({ chapterPublicId: lesson.chapterPublicId, step: 'content' })
    if (topicId) {
      const rawSection = Number.parseInt(searchParams.get('section') ?? '', 10)
      const rawParagraph = Number.parseInt(searchParams.get('paragraph') ?? '', 10)
      setReviewFocus({
        topicPublicId: topicId,
        sectionIndex: Number.isFinite(rawSection) && rawSection >= 0 ? rawSection : 0,
        paragraphNumber: Number.isFinite(rawParagraph) && rawParagraph > 0 ? rawParagraph : 1,
        nonce: Date.now()
      })
    } else {
      setReviewFocus(null)
    }
  }, [flow, searchParams, setSearchParams])

  // Remember the desktop outline preference across lessons, exams and visits.
  useEffect(() => {
    try {
      window.localStorage.setItem(OUTLINE_STORAGE_KEY, outlineOpen ? 'open' : 'closed')
    } catch {
      // Persistence is a convenience; the player still works without storage.
    }
  }, [outlineOpen])

  // A width-collapsed panel must also leave the keyboard tab order.
  useEffect(() => {
    const panel = desktopOutlineRef.current
    if (!panel) return
    if (outlineOpen) panel.removeAttribute('inert')
    else panel.setAttribute('inert', '')
  }, [outlineOpen])

  // Mobile outline behaves as a focused drawer over the workspace.
  useEffect(() => {
    if (!outlineDrawerOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    drawerCloseRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') setOutlineDrawerOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [outlineDrawerOpen])

  // A drawer left open while the viewport grows must not keep the page locked.
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return
    const desktop = window.matchMedia('(min-width: 1280px)')
    const handleChange = (): void => {
      if (desktop.matches) setOutlineDrawerOpen(false)
    }
    handleChange()
    desktop.addEventListener('change', handleChange)
    return () => desktop.removeEventListener('change', handleChange)
  }, [])

  const reloadFlow = async (): Promise<CourseFlow | null> => {
    try {
      const latest = await learningApi.courseFlow()
      state.setData({ flow: latest })
      return latest
    } catch {
      state.reload()
      return null
    }
  }

  if (state.loading && !state.data) return <LoadingState />
  if (state.error && !state.data) return careerGateOrError(state.error)
  if (!flow || !activeTarget) return <LoadingState />

  if (flow.lessons.length === 0) {
    return (
      <div>
        <PageHeader eyebrow={flow.career.name} title="Your course" />
        <EmptyState
          title="No lessons available yet"
          description="This career's curriculum is being prepared. Choose another career or check back shortly."
          action={
            <Link
              to={ROUTES.careers}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-surface hover:brightness-110"
            >
              Choose a career
            </Link>
          }
        />
      </div>
    )
  }

  const lessonIndex = flow.lessons.findIndex(
    (lesson) => lesson.chapterPublicId === activeTarget.chapterPublicId
  )
  const lesson = flow.lessons[lessonIndex] ?? flow.lessons[0]!
  const nextLesson = flow.lessons[lessonIndex + 1] ?? null
  const step = stepFor(lesson, activeTarget.step)
  const courseComplete = flow.progress.total > 0 && flow.progress.completed === flow.progress.total
  const moveTo = (chapterPublicId: string, nextStep: LearningStepKey): void => {
    setReviewFocus(null)
    setTarget({ chapterPublicId, step: nextStep })
    setOutlineDrawerOpen(false)
  }
  const focusLessonSegment = (reference: TheoryLessonReference): void => {
    setReviewFocus({
      topicPublicId: reference.topicPublicId,
      sectionIndex: reference.sectionIndex,
      paragraphNumber: reference.paragraphNumber,
      nonce: Date.now()
    })
    setTarget({ chapterPublicId: reference.chapterPublicId, step: 'content' })
  }

  return (
    <div>
      <PageHeader
        eyebrow={flow.career.name}
        title="Your course"
        description="Follow every lesson in order: study the content, pass the theory exam, pass the practical coding exam, then complete the lesson assignment. The next lesson unlocks only after all four stages are verified."
        actions={
          <div className="w-52">
            <ProgressBar
              percent={flow.progress.percent}
              label={`${flow.progress.completed}/${flow.progress.total} lessons`}
            />
          </div>
        }
      />

      {state.loading ? (
        <p className="mb-3 text-xs tabular-nums text-primary/50" role="status">
          Refreshing course…
        </p>
      ) : null}

      {courseComplete ? (
        <div className="mb-4 rounded-lg border border-success/45 bg-surface px-5 py-4">
          <p className="font-display text-sm font-semibold text-primary">Course complete</p>
          <p className="mt-1 text-sm leading-relaxed text-primary/65">
            Every lesson, theory exam, practical exam and assignment is finished. Review any
            stage from the outline, or continue into your career simulation.
          </p>
        </div>
      ) : null}

      <div className="flex items-start gap-4">
        <div className="min-w-0 flex-1 space-y-4">
          <section className="rounded-lg border border-border bg-surface">
            <div className="flex flex-wrap items-end justify-between gap-3 px-5 py-4">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/45">
                  Lesson {String(lesson.number).padStart(2, '0')} of {flow.lessons.length} ·{' '}
                  {lesson.stage}
                </p>
                <h1 className="mt-1 text-balance font-display text-xl font-bold tracking-tight text-primary">
                  {lesson.title}
                </h1>
              </div>
              <div className="flex flex-wrap items-center justify-end gap-2">
                <p className="text-xs text-primary/50">
                  {lesson.completed
                    ? 'Lesson complete'
                    : step.completed
                      ? `${step.label} complete`
                      : `Current stage: ${step.label}`}
                </p>
                <button
                  type="button"
                  onClick={() => setOutlineOpen((open) => !open)}
                  aria-expanded={outlineOpen}
                  aria-controls="course-outline-panel"
                  className="hidden h-8 items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 text-xs font-medium text-primary/65 transition-colors hover:border-accent/45 hover:text-primary xl:inline-flex"
                >
                  <Icon
                    name={outlineOpen ? 'arrow-right' : 'arrow-left'}
                    className="h-3.5 w-3.5"
                  />
                  {outlineOpen ? 'Hide outline' : 'Show outline'}
                </button>
                <button
                  type="button"
                  onClick={() => setOutlineDrawerOpen(true)}
                  aria-expanded={outlineDrawerOpen}
                  aria-controls="course-outline-drawer"
                  className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 text-xs font-medium text-primary/65 transition-colors hover:border-accent/45 hover:text-primary xl:hidden"
                >
                  <Icon name="menu" className="h-3.5 w-3.5" />
                  Outline
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-px border-t border-border bg-border sm:grid-cols-4">
              {STEP_ORDER.map((stepDef, index) => {
                const info = stepFor(lesson, stepDef.key)
                const active = activeTarget.step === stepDef.key
                return (
                  <button
                    key={stepDef.key}
                    type="button"
                    disabled={!info.unlocked}
                    title={info.lockReason ?? undefined}
                    onClick={() => moveTo(lesson.chapterPublicId, stepDef.key)}
                    aria-current={active ? 'step' : undefined}
                    className={`px-4 py-3 text-left transition-colors ${
                      active
                        ? 'bg-primary text-surface'
                        : info.unlocked
                          ? 'bg-surface text-primary hover:bg-primary/[0.035]'
                          : 'cursor-not-allowed bg-surface text-primary/35'
                    }`}
                  >
                    <span className={`font-mono text-[10px] font-semibold uppercase tracking-[0.14em] ${active ? 'text-surface/60' : 'text-primary/40'}`}>
                      Step {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="mt-1 flex items-baseline justify-between gap-2">
                      <span className={`text-sm ${active ? 'font-semibold' : 'font-medium'}`}>
                        {stepDef.short}
                      </span>
                      <span className={`text-[10px] font-medium ${active ? 'text-surface/65' : info.completed ? 'text-info' : info.unlocked ? 'text-primary/55' : 'text-primary/35'}`}>
                        {info.completed ? 'Completed' : info.unlocked ? 'Available' : 'Locked'}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          </section>

          {!step.unlocked ? (
            <ErrorState
              error={
                new Error(step.lockReason ?? 'Complete the previous stage before opening this one.')
              }
            />
          ) : activeTarget.step === 'content' ? (
            <div className="space-y-4">
              {reviewFocus ? (
                <div className="sticky top-20 z-20 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-accent/35 bg-surface px-4 py-3 shadow-sm">
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
                      Re-studying a missed question
                    </p>
                    <p className="mt-0.5 text-sm leading-relaxed text-primary/65">
                      The referenced section is highlighted below. Return to the theory exam when you
                      are ready to retry.
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setReviewFocus(null)}>
                      Dismiss
                    </Button>
                    <Button size="sm" onClick={() => moveTo(lesson.chapterPublicId, 'theory')}>
                      Return to theory exam
                    </Button>
                  </div>
                </div>
              ) : null}
              <LessonContentStep
                key={lesson.chapterPublicId}
                lesson={lesson}
                careerSlug={flow.career.slug}
                focus={reviewFocus}
                onTopicSaved={() => {
                  void reloadFlow()
                }}
                onContentComplete={() => {
                  void (async () => {
                    await reloadFlow()
                    moveTo(lesson.chapterPublicId, 'theory')
                  })()
                }}
              />
            </div>
          ) : activeTarget.step === 'theory' ? (
            <TheoryExamRunner
              key={lesson.theory.examPublicId}
              examPublicId={lesson.theory.examPublicId}
              onClose={() => moveTo(lesson.chapterPublicId, 'content')}
              onReviewSegment={focusLessonSegment}
              onPassed={() => {
                void (async () => {
                  await reloadFlow()
                  moveTo(lesson.chapterPublicId, 'practical')
                })()
              }}
            />
          ) : activeTarget.step === 'practical' ? (
            <Suspense fallback={<LoadingState />}>
              <PracticalExamWorkspace
                key={lesson.practical.examPublicId}
                examPublicId={lesson.practical.examPublicId}
                lessonNumber={lesson.number}
                alreadyPassed={lesson.practical.passed}
                bestScore={lesson.practical.bestScore}
                onGraded={() => {
                  void reloadFlow()
                }}
                onContinue={() => moveTo(lesson.chapterPublicId, 'assignment')}
              />
            </Suspense>
          ) : (
            <AssignmentStep
              key={lesson.assignment.assignmentPublicId}
              lesson={lesson}
              nextLessonNumber={nextLesson?.number ?? null}
              onGraded={() => {
                void reloadFlow()
              }}
              onContinue={() => {
                void (async () => {
                  const latest = await reloadFlow()
                  const source = latest ?? flow
                  const index = source.lessons.findIndex(
                    (item) => item.chapterPublicId === lesson.chapterPublicId
                  )
                  const following = source.lessons[index + 1]
                  if (following) moveTo(following.chapterPublicId, 'content')
                  else moveTo(lesson.chapterPublicId, 'assignment')
                })()
              }}
            />
          )}
        </div>

        <aside
          ref={desktopOutlineRef}
          id="course-outline-panel"
          aria-label="Course outline"
          className={`sticky top-20 hidden shrink-0 overflow-hidden transition-[width,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] xl:block ${
            outlineOpen ? 'w-[320px] opacity-100' : 'w-0 opacity-0'
          }`}
        >
          <div
            className={`w-[320px] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              outlineOpen ? 'translate-x-0' : 'translate-x-10'
            }`}
          >
            <FlowSidebar
              flow={flow}
              target={activeTarget}
              onSelect={(next) => moveTo(next.chapterPublicId, next.step)}
            />
          </div>
        </aside>
      </div>

      {!outlineOpen ? (
        <button
          type="button"
          onClick={() => setOutlineOpen(true)}
          aria-label="Expand course outline"
          aria-controls="course-outline-panel"
          className="fixed right-0 top-1/2 z-30 hidden -translate-y-1/2 items-center justify-center rounded-l-lg border border-r-0 border-border bg-surface px-1.5 py-4 text-primary/55 shadow-sm transition-colors hover:bg-primary hover:text-surface xl:flex"
        >
          <Icon name="arrow-left" className="h-4 w-4" />
        </button>
      ) : null}

      {outlineDrawerOpen ? (
        <div className="fixed inset-0 z-50 xl:hidden">
          <button
            type="button"
            aria-label="Close course outline"
            onClick={() => setOutlineDrawerOpen(false)}
            className="overlay-enter absolute inset-0 h-full w-full cursor-default bg-primary/45 backdrop-blur-[2px]"
          />
          <div
            id="course-outline-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Course outline"
            className="drawer-right-enter relative ml-auto flex h-full w-[min(21rem,90vw)] flex-col bg-bg shadow-2xl"
          >
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-surface px-4">
              <div className="min-w-0">
                <p className="font-display text-sm font-semibold text-primary">Course outline</p>
                <p className="text-xs tabular-nums text-primary/50">
                  {flow.progress.completed} of {flow.progress.total} lessons complete
                </p>
              </div>
              <button
                ref={drawerCloseRef}
                type="button"
                onClick={() => setOutlineDrawerOpen(false)}
                aria-label="Close course outline"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-primary/65 transition-colors hover:bg-primary/5 hover:text-primary"
              >
                <Icon name="close" className="h-5 w-5" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto p-3">
              <FlowSidebar
                flow={flow}
                target={activeTarget}
                onSelect={(next) => moveTo(next.chapterPublicId, next.step)}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
