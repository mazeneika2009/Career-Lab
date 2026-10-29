import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { examsApi } from '../../api/learning'
import { ROUTES } from '../../constants/routes'
import type {
  TheoryExamDetail,
  TheoryExamResult,
  TheoryLessonReference
} from '../../types/domain'
import { useAsync } from '../../hooks/useAsync'
import { Button } from '../ui/button/Button'
import { ErrorState, LoadingState, Panel, StatusText } from '../app/primitives'

interface StoredReviewState {
  result: TheoryExamResult
  /** Segment keys (chapter/topic/section/paragraph) already re-studied. */
  reviewed: string[]
}

function storageKey(examPublicId: string): string {
  return `career-lab:theory-review:${examPublicId}`
}

function readStoredReview(examPublicId: string): StoredReviewState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.sessionStorage.getItem(storageKey(examPublicId))
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<StoredReviewState>
    if (
      !parsed.result ||
      parsed.result.passed ||
      typeof parsed.result.score !== 'number' ||
      !Array.isArray(parsed.result.review)
    ) {
      return null
    }
    return {
      result: parsed.result,
      reviewed: Array.isArray(parsed.reviewed)
        ? parsed.reviewed.filter((key): key is string => typeof key === 'string')
        : []
    }
  } catch {
    return null
  }
}

function reviewKey(reference: TheoryLessonReference): string {
  return [
    reference.chapterPublicId,
    reference.topicPublicId,
    reference.sectionIndex,
    reference.paragraphNumber
  ].join('|')
}

function writeStoredReview(examPublicId: string, result: TheoryExamResult, reviewed: string[]): void {
  if (typeof window === 'undefined') return
  try {
    window.sessionStorage.setItem(storageKey(examPublicId), JSON.stringify({ result, reviewed }))
  } catch {
    // Review gating is a UX aid; storage failures must not block the exam.
  }
}

function clearStoredReview(examPublicId: string): void {
  if (typeof window === 'undefined') return
  try {
    window.sessionStorage.removeItem(storageKey(examPublicId))
  } catch {
    // Ignore storage failures.
  }
}

function reviewHref(reference: TheoryLessonReference): string {
  const params = new URLSearchParams({
    chapter: reference.chapterPublicId,
    step: 'content',
    topic: reference.topicPublicId,
    section: String(reference.sectionIndex),
    paragraph: String(reference.paragraphNumber)
  })
  return `${ROUTES.learn}?${params.toString()}`
}

/**
 * Module theory exam. Used inline inside the sequential course player.
 * The server grades the attempt and persists the step completion before the
 * runner offers the next stage.
 *
 * Missed questions never reveal their answer key. They show a study hint plus
 * an exact lesson reference, and retry unlocks only after every referenced
 * segment has been opened for re-study.
 */
export function TheoryExamRunner({
  examPublicId,
  onClose,
  onPassed,
  onReviewSegment
}: {
  examPublicId: string
  onClose?: () => void
  onPassed?: (result: TheoryExamResult) => void
  onReviewSegment?: (reference: TheoryLessonReference) => void
}): React.JSX.Element {
  const navigate = useNavigate()
  const detail = useAsync(() => examsApi.detail(examPublicId), [examPublicId])
  const [restored] = useState(() => readStoredReview(examPublicId))
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [phase, setPhase] = useState<'running' | 'submitting'>('running')
  const [result, setResult] = useState<TheoryExamResult | null>(restored?.result ?? null)
  const [reviewed, setReviewed] = useState<string[]>(restored?.reviewed ?? [])
  const [error, setError] = useState<string | null>(null)

  if (detail.loading) return <LoadingState />
  if (detail.error) return <ErrorState error={detail.error} />

  const exam = detail.data as TheoryExamDetail
  if (exam.kind !== 'theory') return <ErrorState error={new Error('This is not a theory exam.')} />

  const submit = async (): Promise<void> => {
    setError(null)
    const unanswered = exam.questions.findIndex((_, index) => answers[index] === undefined)
    if (unanswered !== -1) {
      setError(`Answer question ${unanswered + 1} before submitting.`)
      return
    }
    setPhase('submitting')
    try {
      await examsApi.start(examPublicId)
      const graded = await examsApi.submitTheory(
        examPublicId,
        exam.questions.map((_, index) => answers[index] as number)
      )
      setResult(graded)
      setReviewed([])
      if (graded.passed) {
        clearStoredReview(examPublicId)
      } else {
        writeStoredReview(examPublicId, graded, [])
      }
      setPhase('running')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Submission failed.')
      setPhase('running')
    }
  }

  const retry = (): void => {
    clearStoredReview(examPublicId)
    setAnswers({})
    setResult(null)
    setReviewed([])
    setError(null)
    setPhase('running')
    detail.reload()
  }

  const markReviewed = (reference: TheoryLessonReference, key: string): void => {
    const next = [...new Set([...reviewed, key])]
    setReviewed(next)
    if (result && !result.passed) writeStoredReview(examPublicId, result, next)
    if (onReviewSegment) {
      onReviewSegment(reference)
    } else {
      navigate(reviewHref(reference))
    }
  }

  if (result) {
    // Several missed questions can reference the same paragraph. Reading it
    // once should unlock every question that points there.
    const reviewable = new Map<string, TheoryLessonReference>()
    for (const row of result.review) {
      if (row.correct) continue
      const reference = row.lessonRef
      if (!reference?.topicPublicId) continue
      const key = reviewKey(reference)
      if (!reviewable.has(key)) reviewable.set(key, reference)
    }
    const reviewedSet = new Set(reviewed)
    const pendingReview = [...reviewable.keys()].filter((key) => !reviewedSet.has(key))
    const retryUnlocked = pendingReview.length === 0

    return (
      <Panel
        title={`${exam.title} · ${result.score}/100`}
        footer={
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs tabular-nums text-primary/50">
              {result.correctCount}/{result.total} correct · pass mark {exam.passScore}/100
            </span>
            <div className="flex flex-wrap items-start gap-2">
              {onClose ? (
                <Button variant="secondary" size="sm" onClick={onClose}>
                  Back to lesson
                </Button>
              ) : null}
              {result.passed && onPassed ? (
                <Button size="sm" onClick={() => onPassed(result)}>
                  Continue to practical exam
                </Button>
              ) : null}
              {!result.passed ? (
                <div className="flex flex-col items-end gap-1">
                  <Button
                    size="sm"
                    disabled={!retryUnlocked}
                    title={
                      retryUnlocked
                        ? undefined
                        : 'Review every highlighted lesson segment before retrying.'
                    }
                    onClick={retry}
                  >
                    Retry theory exam
                  </Button>
                  {reviewable.size > 0 ? (
                    <span className="max-w-64 text-right text-[11px] leading-snug text-primary/55">
                      {retryUnlocked
                        ? 'Review complete — retry unlocked.'
                        : `${reviewable.size - pendingReview.length}/${reviewable.size} lesson segment${
                            reviewable.size === 1 ? '' : 's'
                          } reviewed before retry unlocks.`}
                    </span>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        }
      >
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <StatusText tone={result.passed ? 'passed' : 'failed'} />
          <span className="text-sm text-primary/60">
            {result.passed
              ? 'Theory passed. The practical coding exam is now unlocked.'
              : `You need ${exam.passScore}/100 to unlock the practical exam. Correct answers stay hidden; use each hint to revisit the referenced lesson segment, then retry.`}
          </span>
        </div>

        <ol className="space-y-4">
          {result.review.map((row, index) => {
            const reference = row.lessonRef ?? null
            const key = reference?.topicPublicId ? reviewKey(reference) : null
            const wasReviewed = key !== null && reviewedSet.has(key)
            return (
              <li
                key={index}
                className={`rounded-md border p-3 ${
                  row.correct
                    ? 'border-border'
                    : wasReviewed
                      ? 'border-info/30 bg-info/[0.02]'
                      : 'border-attention/35 bg-attention/[0.025]'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="min-w-0 text-sm font-medium text-primary">
                    {index + 1}. {row.prompt}
                  </p>
                  <span
                    className={`shrink-0 text-[11px] font-medium ${
                      row.correct || wasReviewed ? 'text-info' : 'text-attention'
                    }`}
                  >
                    {row.correct ? 'Correct' : wasReviewed ? 'Reviewed' : 'Review needed'}
                  </span>
                </div>
                <p className={`mt-1 text-sm ${row.correct ? 'text-info' : 'text-attention'}`}>
                  Your answer: {row.yourAnswer}
                </p>

                {row.correct ? (
                  row.explanation ? (
                    <p className="mt-1 text-xs leading-relaxed text-primary/60">{row.explanation}</p>
                  ) : null
                ) : (
                  <div className="mt-3 rounded-md border border-accent/25 bg-accent/[0.035] px-3 py-2.5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
                      Hint
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-primary/80">
                      {row.hint ??
                        'Re-read the lesson material for this topic and compare each option against the rule it describes.'}
                    </p>

                    {reference && key ? (
                      <div className="mt-2 flex flex-wrap items-end justify-between gap-2 border-t border-accent/15 pt-2">
                        <div className="min-w-0">
                          <p className="text-[11px] font-medium text-primary/70">
                            Lesson {String(reference.lessonNumber).padStart(2, '0')} ·{' '}
                            {reference.lessonTitle}
                          </p>
                          <p className="text-[11px] leading-relaxed text-primary/55">
                            Topic: {reference.topicTitle} · Section {reference.sectionIndex + 1}:{' '}
                            {reference.sectionHeading} · Paragraph {reference.paragraphNumber}
                          </p>
                        </div>
                        <Button
                          variant={wasReviewed ? 'ghost' : 'secondary'}
                          size="sm"
                          onClick={() => markReviewed(reference, key)}
                        >
                          {wasReviewed ? 'Review again' : 'Review Lesson Segment'}
                        </Button>
                      </div>
                    ) : null}
                  </div>
                )}
              </li>
            )
          })}
        </ol>
      </Panel>
    )
  }

  return (
    <Panel
      title={exam.title}
      footer={
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs tabular-nums text-primary/50">
            {Object.keys(answers).length}/{exam.questions.length} answered · pass mark{' '}
            {exam.passScore}/100
          </span>
          <div className="flex gap-2">
            {onClose ? (
              <Button variant="secondary" size="sm" onClick={onClose}>
                Back to lesson
              </Button>
            ) : null}
            <Button size="sm" disabled={phase === 'submitting'} onClick={() => void submit()}>
              {phase === 'submitting' ? 'Submitting…' : 'Submit for grading'}
            </Button>
          </div>
        </div>
      }
    >
      {error ? (
        <p className="mb-3 rounded-md bg-attention/10 px-3 py-2 text-sm text-attention">{error}</p>
      ) : null}
      <ol className="space-y-5">
        {exam.questions.map((question, questionIndex) => (
          <li key={questionIndex}>
            <fieldset>
              <legend className="text-sm font-medium text-primary">
                {questionIndex + 1}. {question.prompt}
              </legend>
              <div className="mt-2 space-y-1.5">
                {question.options.map((option, optionIndex) => (
                  <label
                    key={optionIndex}
                    className={`flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors ${
                      answers[questionIndex] === optionIndex
                        ? 'border-accent/60 bg-accent/[0.055]'
                        : 'border-border hover:border-accent/45'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`q-${examPublicId}-${questionIndex}`}
                      checked={answers[questionIndex] === optionIndex}
                      onChange={() =>
                        setAnswers((current) => ({ ...current, [questionIndex]: optionIndex }))
                      }
                    />
                    <span className="text-primary/85">{option}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </li>
        ))}
      </ol>
    </Panel>
  )
}
