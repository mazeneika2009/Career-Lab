import { useState } from 'react'
import { Link } from 'react-router-dom'
import { interviewApi } from '../../api/learning'
import type { InterviewAnswerReview, InterviewSessionView, InterviewStage } from '../../types/domain'
import { useAsync } from '../../hooks/useAsync'
import { useSimulationGate } from '../../hooks/useSimulationGate'
import { invalidateWorkplaceGate } from '../../store/workplaceGateStore'
import { careerGateOrError } from './LearningPathPage'
import { ROUTES } from '../../constants/routes'
import { INTERVIEW_PASS_SCORE } from '../../constants/simulation'
import { Button } from '../../components/ui/button/Button'
import {
  EmptyState,
  LoadingState,
  PageHeader,
  Panel,
  StatusText
} from '../../components/app/primitives'

const DIMENSION_LABELS: Record<string, string> = {
  technical_knowledge: 'Technical knowledge',
  problem_solving: 'Problem solving',
  professional_reasoning: 'Professional reasoning',
  communication: 'Communication'
}

const STAGE_COPY: Record<
  InterviewStage,
  { step: string; title: string; description: string; emptyTitle: string; emptyDescription: string }
> = {
  hr: {
    step: 'Workplace workflow · Step 1',
    title: 'Virtual interview',
    description: `A simulated HR screening for your career. Pass it with at least ${INTERVIEW_PASS_SCORE}/100 to unlock the technical interview.`,
    emptyTitle: 'No virtual interview scheduled',
    emptyDescription:
      'Start when you feel prepared. The screener focuses on your motivation, communication and self-awareness rather than technical trivia.'
  },
  technical: {
    step: 'Workplace workflow · Step 2',
    title: 'Technical interview',
    description: `A role-specific technical interview. Pass it with at least ${INTERVIEW_PASS_SCORE}/100 to unlock the company simulation and workplace channels.`,
    emptyTitle: 'No technical interview scheduled',
    emptyDescription:
      'Questions are drawn from your career’s technical question bank and evaluated against authored guidance.'
  }
}

export default function InterviewPage({ stage }: { stage: InterviewStage }): React.JSX.Element {
  const gateState = useSimulationGate(stage)
  const current = useAsync(() => interviewApi.getCurrent(stage), [stage])
  const [starting, setStarting] = useState(false)
  const [startError, setStartError] = useState<string | null>(null)

  if (gateState.loading || current.loading) return <LoadingState />
  if (gateState.error) return careerGateOrError(gateState.error)
  if (current.error) return careerGateOrError(current.error)

  const copy = STAGE_COPY[stage]

  if (stage === 'technical' && gateState.gate && gateState.gate.hr.status !== 'passed') {
    const hr = gateState.gate.hr
    return (
      <div>
        <PageHeader eyebrow={copy.step} title={copy.title} description={copy.description} />
        <EmptyState
          icon="lock"
          title="The technical interview is locked"
          description={
            hr.status === 'failed'
              ? `Your virtual interview scored ${hr.score ?? 0}/100. Reach ${INTERVIEW_PASS_SCORE}/100 in a retake to unlock the technical interview.`
              : hr.status === 'in_progress'
                ? 'Finish and submit your virtual interview first. Passing it unlocks this stage.'
                : 'Pass the virtual interview first. The technical stage opens automatically once the screening is verified.'
          }
          action={
            <Link
              to={ROUTES.virtualInterview}
              className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:brightness-95"
            >
              {hr.status === 'in_progress' ? 'Continue virtual interview' : hr.status === 'failed' ? 'Retake virtual interview' : 'Start virtual interview'}
            </Link>
          }
        />
      </div>
    )
  }

  const session = current.data

  const start = async (): Promise<void> => {
    setStarting(true)
    setStartError(null)
    try {
      await interviewApi.start(stage)
      current.reload()
      gateState.reload()
    } catch (e) {
      setStartError(e instanceof Error ? e.message : 'Could not start the interview.')
    } finally {
      setStarting(false)
    }
  }

  return (
    <div>
      <PageHeader eyebrow={copy.step} title={copy.title} description={copy.description} />

      {startError ? (
        <p role="alert" className="mb-3 rounded-md bg-attention/10 px-3 py-2 text-sm text-attention">
          {startError}
        </p>
      ) : null}

      {!session ? (
        <EmptyState
          icon="mic"
          title={copy.emptyTitle}
          description={copy.emptyDescription}
          action={
            <Button disabled={starting} onClick={() => void start()}>
              {starting ? 'Preparing…' : 'Start interview'}
            </Button>
          }
        />
      ) : (
        <InterviewRunner
          key={session.publicId}
          session={session}
          stage={stage}
          onDone={() => {
            current.reload()
            // Passing the virtual or technical stage changes the sidebar and
            // route-guard gate; refresh every mounted consumer in place.
            invalidateWorkplaceGate()
          }}
          onRetake={() => void start()}
          retaking={starting}
        />
      )}
    </div>
  )
}

function InterviewRunner({
  session,
  stage,
  onDone,
  onRetake,
  retaking
}: {
  session: InterviewSessionView
  stage: InterviewStage
  onDone: () => void
  onRetake: () => void
  retaking: boolean
}): React.JSX.Element {
  const isDone = session.status === 'completed'
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {}
    if (session.answers) {
      for (const a of session.answers) initial[a.questionPublicId] = a.body
    }
    return initial
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (): Promise<void> => {
    setSubmitting(true)
    setError(null)
    try {
      await interviewApi.submit(
        session.publicId,
        session.questions.map((q) => ({ questionPublicId: q.publicId, body: answers[q.publicId] ?? '' }))
      )
      onDone()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Submission failed.')
    } finally {
      setSubmitting(false)
    }
  }

  if (isDone) {
    const passed = (session.score ?? 0) >= INTERVIEW_PASS_SCORE
    const next =
      stage === 'hr'
        ? {
            to: ROUTES.technicalInterview,
            label: 'Continue to technical interview',
            detail: 'The technical interview is now unlocked. Pass it to open the workplace.'
          }
        : {
            to: ROUTES.simulation,
            label: 'Continue to company simulation',
            detail: 'Both interviews are passed. The company simulation, tasks, team and client channels are unlocked.'
          }

    return (
      <div className="space-y-4">
        <Panel title={`${stage === 'hr' ? 'Virtual' : 'Technical'} interview completed`} icon="mic">
          <div className="flex flex-wrap items-center gap-3">
            <StatusText tone={passed ? 'passed' : 'failed'} />
            <span className="text-2xl font-semibold tabular-nums text-primary">{session.score}/100</span>
            <span className="text-sm text-primary/60">
              Completed {session.completedAt ? new Date(session.completedAt).toLocaleString() : ''}
            </span>
          </div>
          {session.evaluation ? (
            <p className="mt-3 text-sm leading-relaxed text-primary/80">{session.evaluation.verdict}</p>
          ) : null}
          <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border pt-4">
            {passed ? (
              <Link
                to={next.to}
                className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:brightness-95"
              >
                {next.label}
              </Link>
            ) : (
              <Button size="sm" disabled={retaking} onClick={onRetake}>
                {retaking ? 'Preparing…' : 'Retake interview'}
              </Button>
            )}
            <span className="text-sm text-primary/60">
              {passed
                ? next.detail
                : `Reach ${INTERVIEW_PASS_SCORE}/100 to ${stage === 'hr' ? 'unlock the technical interview' : 'unlock the workplace'}.`}
            </span>
          </div>
        </Panel>

        {session.answerReviews && session.answerReviews.length > 0 ? (
          <AnswerReviewPanel session={session} />
        ) : (
          <Panel title="Your answers on record">
            <ol className="space-y-4">
              {session.questions.map((q) => (
                <li key={q.publicId}>
                  <p className="text-sm font-medium text-primary">{q.prompt}</p>
                  <p className="mt-1 whitespace-pre-wrap rounded-md bg-bg px-3 py-2 text-sm leading-relaxed text-primary/75">
                    {session.answers?.find((a) => a.questionPublicId === q.publicId)?.body ?? '—'}
                  </p>
                </li>
              ))}
            </ol>
          </Panel>
        )}
      </div>
    )
  }

  const allAnswered = session.questions.every((q) => (answers[q.publicId] ?? '').trim().length >= 30)

  return (
    <Panel
      title={`Interview in progress · started ${new Date(session.startedAt).toLocaleDateString()}`}
      footer={
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs tabular-nums text-primary/50">
            {session.questions.filter((q) => (answers[q.publicId] ?? '').trim().length >= 30).length}/{session.questions.length} answered
          </span>
          <Button size="sm" disabled={submitting || !allAnswered} onClick={() => void submit()}>
            {submitting ? 'Reviewing answers…' : 'Submit all answers'}
          </Button>
        </div>
      }
    >
      {error ? <p className="mb-3 rounded-md bg-attention/10 px-3 py-2 text-sm text-attention">{error}</p> : null}
      {submitting ? (
        <p className="mb-3 rounded-md bg-accent/5 px-3 py-2 text-xs leading-relaxed text-primary/60">
          Scoring every answer against the interview rubric and building your study plan. This can take up to a minute.
        </p>
      ) : null}
      <ol className="space-y-6">
        {session.questions.map((q, i) => (
          <li key={q.publicId}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
              Question {i + 1} · {DIMENSION_LABELS[q.dimension] ?? q.dimension}
            </p>
            <p className="mt-1 text-sm font-medium text-primary">{q.prompt}</p>
            <label htmlFor={`ans-${q.publicId}`} className="sr-only">Your answer</label>
            <textarea
              id={`ans-${q.publicId}`}
              rows={5}
              value={answers[q.publicId] ?? ''}
              onChange={(e) => setAnswers((a) => ({ ...a, [q.publicId]: e.target.value }))}
              placeholder="Answer as you would in the room — structure, reasoning, concrete examples, outcome."
              className="mt-2 w-full rounded-md border border-border bg-white px-3 py-2 text-sm leading-relaxed text-primary placeholder:text-primary/35 focus:border-accent/60 focus:outline-none"
            />
          </li>
        ))}
      </ol>
    </Panel>
  )
}

function ReviewList({
  title,
  items,
  tone = 'default'
}: {
  title: string
  items: string[]
  tone?: 'default' | 'warning' | 'positive'
}): React.JSX.Element | null {
  if (items.length === 0) return null
  const toneClass =
    tone === 'warning' ? 'text-attention' : tone === 'positive' ? 'text-info' : 'text-primary/50'
  return (
    <div>
      <p className={`text-[10px] font-semibold uppercase tracking-[0.14em] ${toneClass}`}>{title}</p>
      <ul className="mt-1 space-y-1">
        {items.map((item, index) => (
          <li key={index} className="flex gap-1.5 text-sm leading-relaxed text-primary/75">
            <span className="text-primary/35">·</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function AnswerReviewPanel({ session }: { session: InterviewSessionView }): React.JSX.Element {
  const reviews: InterviewAnswerReview[] = session.answerReviews ?? []
  const answerByQuestion = new Map(
    (session.answers ?? []).map((answer) => [answer.questionPublicId, answer.body])
  )
  const studyPlan = [
    ...new Set(reviews.flatMap((review) => review.studyTopics.map((topic) => topic.topic)))
  ].slice(0, 6)

  return (
    <Panel title="Answer-by-answer review">
      <p className="text-sm leading-relaxed text-primary/65">
        Every answer is scored against the question rubric. The report explains why you received each
        score, names the exact gaps, and gives you a study plan for your next attempt.
      </p>
      <ol className="mt-4 space-y-5">
        {reviews.map((review, index) => (
          <li key={review.questionPublicId} className="rounded-lg border border-border bg-bg/40 p-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
                  Question {index + 1} ·{' '}
                  {DIMENSION_LABELS[review.dimension] ?? review.dimension.replace(/_/g, ' ')}
                </p>
                <p className="mt-1 text-sm font-medium text-primary">{review.question}</p>
              </div>
              <div className="text-right">
                <p
                  className={`text-xl font-semibold tabular-nums ${review.passed ? 'text-info' : 'text-attention'}`}
                >
                  {review.score}/100
                </p>
                <p className="text-[10px] uppercase tracking-[0.12em] text-primary/40">
                  {review.passed ? 'Meets bar' : 'Below bar'}
                </p>
              </div>
            </div>

            <p className="mt-3 whitespace-pre-wrap rounded-md bg-surface px-3 py-2 text-sm leading-relaxed text-primary/70">
              <span className="font-medium text-primary/85">Your answer: </span>
              {answerByQuestion.get(review.questionPublicId) ?? '—'}
            </p>

            <p className="mt-3 text-sm leading-relaxed text-primary/80">{review.verdict}</p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <ReviewList title="Why this score" items={review.whyThisScore} />
              <ReviewList title="Strengths" items={review.strengths} tone="positive" />
              <ReviewList title="Mistakes & gaps" items={review.mistakes} tone="warning" />
              <ReviewList title="How to fix it" items={review.feedback} />
            </div>

            {review.studyTopics.length > 0 ? (
              <div className="mt-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
                  Study next
                </p>
                <ul className="mt-1 space-y-2">
                  {review.studyTopics.map((topic) => (
                    <li
                      key={topic.topic}
                      className="rounded-md border border-border bg-surface px-3 py-2"
                    >
                      <p className="text-sm font-medium text-primary">{topic.topic}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-primary/60">{topic.why}</p>
                      <p className="mt-1 text-xs leading-relaxed text-primary/75">
                        <span className="font-medium">Practise:</span> {topic.action}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <p className="mt-3 text-[10px] uppercase tracking-[0.12em] text-primary/35">
              Reviewed by{' '}
              {review.gradedBy === 'ai'
                ? `AI${review.model ? ` · ${review.model}` : ''}`
                : 'Career Lab rubric engine'}
            </p>
          </li>
        ))}
      </ol>

      {studyPlan.length > 0 ? (
        <div className="mt-5 rounded-md border border-accent/25 bg-accent/5 px-4 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
            Priority study plan
          </p>
          <ul className="mt-1 flex flex-wrap gap-2">
            {studyPlan.map((topic) => (
              <li
                key={topic}
                className="rounded-full border border-accent/25 bg-surface px-2.5 py-1 text-xs text-primary/75"
              >
                {topic}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Panel>
  )
}
