import { useState } from 'react'
import { Link } from 'react-router-dom'
import { assignmentsApi, learningApi } from '../../../api/learning'
import type {
  AssignmentListItem,
  ExamListItem
} from '../../../types/domain'
import type { PracticeExerciseView } from '../../../api/learning'
import { useAsync } from '../../../hooks/useAsync'
import { ROUTES } from '../../../constants/routes'
import { useRoadmapStore } from '../../../store/roadmapStore'
import { Button } from '../../ui/button/Button'
import { Icon } from '../../ui/icon/Icon'
import { LoadingState, Panel, ProgressBar, StatusText } from '../../app/primitives'
import { TheoryExamRunner } from '../TheoryExamRunner'
import type { Lesson, LessonStatus } from './buildLessons'
import { downloadTopicPdf } from './lessonNotes'
import { buildTopicVideo, isVideoUrl } from './lessonVideo'
import { LessonVideoSection } from './LessonVideoPlayer'

type AssignmentsData = Awaited<ReturnType<typeof assignmentsApi.list>>

/**
 * Single-hub chapter node. Consolidates everything a lesson needs in one
 * dashboard view — no page navigation required:
 * video hub, reading material, hands-on lab and the module exam.
 */
export function ChapterHub({
  lesson,
  status,
  exam,
  exercises,
  assignments,
  careerSlug,
  onProgressChanged,
  onLessonPassed
}: {
  lesson: Lesson
  status: LessonStatus
  exam: ExamListItem | undefined
  exercises: PracticeExerciseView[]
  assignments: AssignmentsData | null
  careerSlug: string
  onProgressChanged: () => void
  /** Called after the module exam is passed so the parent can auto-advance. */
  onLessonPassed?: () => void
}): React.JSX.Element {
  const markLessonPassed = useRoadmapStore((s) => s.markLessonPassed)
  const [examOpen, setExamOpen] = useState(false)

  const lessonExercises = exercises.filter(
    (e) => e.chapter === lesson.chapterTitle || lesson.topics.some((t) => t.title === e.topic)
  )
  const stageAssignments = (assignments?.assignments ?? []).filter((a) => a.stage === lesson.stage)

  const doneTopics = lesson.topics.filter((t) => t.status === 'completed').length
  const examAlreadyPassed = exam?.attempts.some((a) => a.passed === true) ?? false

  return (
    <div className="space-y-4">
      <Panel
        icon="layers"
        title={`Lesson ${String(lesson.number).padStart(2, '0')} · ${lesson.chapterTitle}${lesson.partsTotal > 1 ? ` (Part ${lesson.part}/${lesson.partsTotal})` : ''}`}
      >
        <div className="flex flex-wrap items-center gap-2">
          <StatusText tone={status} />
          <span className="text-xs uppercase tracking-widest text-primary/50">{lesson.stage}</span>
          {lesson.carriesExam && exam ? (
            <span className="text-xs text-primary/55">
              Module exam: {exam.title} · pass {exam.passScore}/100
              {examAlreadyPassed ? ` · best ${exam.bestScore}` : ''}
            </span>
          ) : null}
        </div>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-primary/70">{lesson.description}</p>
        <div className="mt-3 max-w-xs">
          <ProgressBar
            percent={lesson.topics.length ? (doneTopics / lesson.topics.length) * 100 : 0}
            label={`${doneTopics}/${lesson.topics.length} topics`}
          />
        </div>
      </Panel>

      <ReadingSection
        lesson={lesson}
        careerSlug={careerSlug}
        onProgressChanged={onProgressChanged}
      />

      <PracticeLab exercises={lessonExercises} onSubmitted={onProgressChanged} />

      {lesson.carriesExam && exam ? (
        <section aria-label="Module exam" className="rounded-lg border border-border bg-surface p-5">
          <h2 className="flex items-center gap-1.5 text-sm font-semibold tracking-tight text-primary">
            <Icon name="clipboard-check" className="h-4 w-4 text-accent/80" />
            Assessment · Module exam
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-primary/65">
            {exam.title} — pass with {exam.passScore}/100 to unlock Lesson{' '}
            {String(lesson.number + 1).padStart(2, '0')}.
            {examAlreadyPassed ? ` You already passed with best score ${exam.bestScore}. Retaking is allowed.` : ''}
          </p>
          <div className="mt-3">
            {examOpen ? (
              <TheoryExamRunner
                examPublicId={exam.publicId}
                onClose={() => {
                  setExamOpen(false)
                  onProgressChanged()
                }}
                onPassed={() => {
                  // Instant timeline update; server refetch reconciles.
                  markLessonPassed(lesson.id)
                  onProgressChanged()
                  onLessonPassed?.()
                }}
              />
            ) : (
              <Button
                size="sm"
                onClick={() => {
                  setExamOpen(true)
                }}
              >
                {examAlreadyPassed ? 'Retake module exam' : 'Start module exam'}
              </Button>
            )}
          </div>
        </section>
      ) : null}

      {stageAssignments.length > 0 ? (
        <AssignmentStrip assignments={stageAssignments} stage={lesson.stage} />
      ) : null}
    </div>
  )
}

/* ------------------------------- Reading -------------------------------- */

function ReadingSection({
  lesson,
  careerSlug,
  onProgressChanged
}: {
  lesson: Lesson
  careerSlug: string
  onProgressChanged: () => void
}): React.JSX.Element {
  const [openTopic, setOpenTopic] = useState<string | null>(null)

  return (
    <section aria-label="Reading material" className="rounded-lg border border-border bg-surface p-5">
      <h2 className="flex items-center gap-1.5 text-sm font-semibold tracking-tight text-primary">
        <Icon name="folder" className="h-4 w-4 text-accent/80" />
        Digital book · Reading
      </h2>
      <p className="mt-1 text-sm text-primary/60">
        Study each topic below. Everything opens inline — no need to leave this lesson.
      </p>
      <ul className="mt-3 space-y-2">
        {lesson.topics.map((t) => (
          <li key={t.publicId} className="rounded-md border border-border/80">
            <button
              type="button"
              onClick={() => setOpenTopic((cur) => (cur === t.publicId ? null : t.publicId))}
              aria-expanded={openTopic === t.publicId}
              className="flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left"
            >
              <span>
                <span className="block text-sm font-medium text-primary">{t.title}</span>
                <span className="block text-xs tabular-nums text-primary/50">{t.minutes} min</span>
              </span>
              <span className="flex shrink-0 items-center gap-2">
                <StatusText tone={t.status} />
                <span aria-hidden className="text-primary/40">{openTopic === t.publicId ? '▴' : '▾'}</span>
              </span>
            </button>
            {openTopic === t.publicId ? (
              <div className="border-t border-border/70 px-3 py-3">
                <InlineTopicReader
                  topicPublicId={t.publicId}
                  careerSlug={careerSlug}
                  lessonNumber={lesson.number}
                  onCompleted={onProgressChanged}
                />
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  )
}

function InlineTopicReader({
  topicPublicId,
  careerSlug,
  lessonNumber,
  onCompleted
}: {
  topicPublicId: string
  careerSlug: string
  lessonNumber: number
  onCompleted: () => void
}): React.JSX.Element {
  const state = useAsync(() => learningApi.topicContent(topicPublicId), [topicPublicId])
  const [saving, setSaving] = useState(false)

  if (state.loading) return <LoadingState />
  if (state.error || !state.data) {
    return <p className="text-sm text-attention">Reading failed to load.</p>
  }
  const d = state.data
  const links = d.resources.links.filter((resource) => !isVideoUrl(resource.url))

  const complete = async (): Promise<void> => {
    setSaving(true)
    try {
      await learningApi.completeTopic(d.topic.publicId)
      onCompleted()
      state.reload()
    } finally {
      setSaving(false)
    }
  }

  return (
    <article>
      <ul className="space-y-1.5">
        {d.topic.objectives.map((o, i) => (
          <li key={i} className="flex gap-2 text-sm leading-relaxed text-primary/80">
            <span aria-hidden className="mt-0.5 text-accent">–</span>
            {o}
          </li>
        ))}
      </ul>
      <div className="mt-4 space-y-4">
        {d.topic.sections.map((s, i) => (
          <div key={i}>
            <h4 className="text-sm font-semibold tracking-tight text-primary">{s.heading}</h4>
            <p className="mt-1 text-sm leading-[1.75] text-primary/85">{s.body}</p>
          </div>
        ))}
      </div>
      {d.resources.videos.length > 0 ? (
        <div className="mt-4 space-y-3">
          {d.resources.videos.map((resource) => {
            const video = buildTopicVideo(resource, d.topic.objectives)
            return video ? (
              <LessonVideoSection
                key={resource.id}
                video={video}
                careerSlug={careerSlug}
                lessonId={`${d.topic.publicId}-${resource.id}`}
              />
            ) : null
          })}
        </div>
      ) : null}
      {links.length > 0 ? (
        <ul className="mt-3 space-y-1.5 border-t border-border/70 pt-3">
          {links.map((r) => (
            <li key={String(r.id)} className="text-sm">
              <a href={r.url} target="_blank" rel="noreferrer" className="font-medium text-accent hover:underline">
                {r.title}
              </a>
              {r.platform ? <span className="ml-1.5 text-xs text-primary/50">{r.platform}</span> : null}
            </li>
          ))}
        </ul>
      ) : null}
      <div className="mt-4 flex flex-wrap gap-2">
        <Button size="sm" disabled={saving} onClick={() => void complete()}>
          {saving ? 'Saving…' : 'Mark topic complete'}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            void downloadTopicPdf(d, lessonNumber).catch((error) => {
              console.error('lesson_pdf_download_failed', error)
            })
          }}
        >
          Download PDF
        </Button>
        <Button variant="secondary" size="sm" onClick={() => window.print()}>
          Print
        </Button>
      </div>
    </article>
  )
}



/* ------------------------------ Practice lab ----------------------------- */

function PracticeLab({
  exercises,
  onSubmitted
}: {
  exercises: PracticeExerciseView[]
  onSubmitted: () => void
}): React.JSX.Element {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section aria-label="Hands-on lab" className="rounded-lg border border-border bg-surface p-5">
      <h2 className="flex items-center gap-1.5 text-sm font-semibold tracking-tight text-primary">
        <Icon name="terminal" className="h-4 w-4 text-accent/80" />
        Practical assignment · Hands-on lab
      </h2>
      {exercises.length === 0 ? (
        <p className="mt-2 text-sm leading-relaxed text-primary/60">
          No hands-on lab is attached to this lesson yet — complete the reading and module exam to
          advance.
        </p>
      ) : (
        <ul className="mt-3 space-y-2">
          {exercises.map((e) => (
            <li key={e.publicId} className="rounded-md border border-border/80 px-3 py-2.5">
              <button
                type="button"
                onClick={() => setOpenId((cur) => (cur === e.publicId ? null : e.publicId))}
                aria-expanded={openId === e.publicId}
                className="flex w-full items-center justify-between gap-3 text-left"
              >
                <span>
                  <span className="block text-sm font-medium text-primary">{e.title}</span>
                  <span className="block text-xs text-primary/50">
                    {e.lastAttemptAt ? `Last attempt ${new Date(e.lastAttemptAt).toLocaleString()}` : 'Not attempted yet'}
                  </span>
                </span>
                <span aria-hidden className="text-primary/40">{openId === e.publicId ? '▴' : '▾'}</span>
              </button>
              {openId === e.publicId ? (
                <PracticeSubmission exercise={e} onSubmitted={onSubmitted} />
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

function PracticeSubmission({
  exercise,
  onSubmitted
}: {
  exercise: PracticeExerciseView
  onSubmitted: () => void
}): React.JSX.Element {
  const [response, setResponse] = useState('')
  const [phase, setPhase] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  const submit = async (): Promise<void> => {
    if (response.trim().length < 10) {
      setPhase('error')
      return
    }
    setPhase('sending')
    try {
      await learningApi.submitPractice(exercise.publicId, response.trim())
      setPhase('done')
      onSubmitted()
    } catch {
      setPhase('error')
    }
  }

  return (
    <div className="mt-2 border-t border-border/70 pt-2">
      <p className="text-sm leading-relaxed text-primary/75">{exercise.instructions}</p>
      <label className="mt-2 block text-xs font-medium uppercase tracking-wide text-primary/50" htmlFor={`lab-${exercise.publicId}`}>
        Your solution
      </label>
      <textarea
        id={`lab-${exercise.publicId}`}
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        rows={4}
        placeholder="Describe what you built, the steps you took and how you verified it…"
        className="mt-1 w-full rounded-md border border-border bg-bg px-3 py-2 text-sm text-primary placeholder:text-primary/40 focus:border-accent/60 focus:outline-none"
      />
      {phase === 'error' ? (
        <p className="mt-1 text-xs text-attention">Write at least a few sentences (10+ characters) before submitting.</p>
      ) : null}
      {phase === 'done' ? (
        <p className="mt-1 text-xs text-success">Submitted — recorded on your learning path.</p>
      ) : null}
      <div className="mt-2">
        <Button size="sm" disabled={phase === 'sending'} onClick={() => void submit()}>
          {phase === 'sending' ? 'Submitting…' : 'Submit lab solution'}
        </Button>
      </div>
    </div>
  )
}

/* ------------------------------- Assignments ----------------------------- */

function AssignmentStrip({
  assignments,
  stage
}: {
  assignments: AssignmentListItem[]
  stage: string
}): React.JSX.Element | null {
  if (assignments.length === 0) return null
  return (
    <section aria-label="Stage assignments" className="rounded-lg border border-border bg-surface p-5">
      <h2 className="flex items-center gap-1.5 text-sm font-semibold tracking-tight text-primary">
        <Icon name="file-text" className="h-4 w-4 text-accent/80" />
        Professional work · {stage} assignments
      </h2>
      <ul className="mt-3 space-y-2">
        {assignments.map((a) => (
          <li key={a.publicId} className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-border/80 px-3 py-2.5">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-primary">{a.title}</p>
              <p className="text-xs text-primary/55">
                {a.difficulty} · due day {a.dueDays} · {(a.skillsEvaluated ?? []).join(', ')}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <StatusText tone={a.status} />
              <Link
                to={ROUTES.assignmentSubmission(a.publicId)}
                className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-surface hover:brightness-110"
              >
                {a.status === 'submitted' ? 'Review' : 'Submit'}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
