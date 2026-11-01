import { useState } from 'react'
import { Link } from 'react-router-dom'
import { assignmentsApi } from '../../../api/learning'
import { ROUTES } from '../../../constants/routes'
import type { AssignmentDetail, AssignmentSubmitResult } from '../../../types/domain'
import { Button } from '../../ui/button/Button'
import { Icon } from '../../ui/icon/Icon'

/**
 * Submission area shared by the standalone assignment page and the course
 * player's fourth stage. The server is the only authority on whether the
 * assignment is unlocked, passing, or complete.
 */
export function AssignmentSubmissionPanel({
  assignment,
  onGraded
}: {
  assignment: AssignmentDetail
  onGraded?: (result: AssignmentSubmitResult) => void
}): React.JSX.Element {
  const [payload, setPayload] = useState('')
  const [links, setLinks] = useState<string[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<AssignmentSubmitResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const spec = assignment.submissionSpec
  const minChars = Math.min(spec.minTextLength, 200)
  const wordCount = payload.trim().split(/\s+/).filter(Boolean).length
  const passed =
    result?.passed ??
    assignment.passed ??
    ((assignment.evaluation?.overallScore ?? 0) >= 70)
  const latestScore =
    result?.score ?? assignment.score ?? assignment.evaluation?.overallScore ?? null
  const hasSubmitted = assignment.previousSubmissions.length > 0 || result !== null

  const submit = async (): Promise<void> => {
    setSubmitting(true)
    setError(null)
    try {
      const graded = await assignmentsApi.submit(
        assignment.publicId,
        payload,
        links.filter(Boolean)
      )
      setResult(graded)
      onGraded?.(graded)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Submission failed.')
    } finally {
      setSubmitting(false)
    }
  }

  if (passed) {
    return (
      <div className="rounded-md border border-success/45 bg-success/10 px-4 py-4">
        <div className="flex items-start gap-3">
          <Icon name="check-circle" className="mt-0.5 h-5 w-5 shrink-0 text-info" />
          <div>
            <p className="font-display text-sm font-semibold text-primary">
              Assignment complete
            </p>
            <p className="mt-1 text-sm leading-relaxed text-primary/70">
              {latestScore !== null
                ? `Scored ${latestScore}/100 against the ${assignment.lesson?.title ?? 'lesson'} standard.`
                : 'This assignment has been evaluated and marked complete.'}{' '}
              This lesson is complete.
            </p>
            <Link
              to={ROUTES.evaluations}
              className="mt-3 inline-block rounded-md border border-border bg-surface px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:border-accent/60"
            >
              View full evaluation
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {hasSubmitted && latestScore !== null ? (
        <p className="mb-3 rounded-md border border-attention/30 bg-attention/10 px-3 py-2 text-xs leading-relaxed text-primary/75">
          Your previous submission scored <span className="font-semibold">{latestScore}/100</span>.
          A score of 70 is required to complete the lesson. Address the feedback and resubmit.
        </p>
      ) : null}
      <p className="mb-3 rounded-md bg-bg px-3 py-2 text-xs leading-relaxed text-primary/65">
        {spec.instructions}
      </p>
      <label htmlFor="assignment-payload" className="sr-only">
        {spec.textLabel}
      </label>
      <textarea
        id="assignment-payload"
        rows={16}
        value={payload}
        onChange={(e) => setPayload(e.target.value)}
        placeholder={`Write your ${spec.textLabel.toLowerCase()} here, addressing every requirement in order.`}
        className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm leading-relaxed text-primary placeholder:text-primary/35 focus:border-accent/60 focus:outline-none"
      />
      {spec.linkLabels ? (
        <div className="mt-3 space-y-2">
          {spec.linkLabels.map((label, i) => (
            <input
              key={i}
              type="url"
              placeholder={`${label} (URL)`}
              value={links[i] ?? ''}
              onChange={(e) => {
                const next = [...links]
                next[i] = e.target.value
                setLinks(next)
              }}
              className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-primary placeholder:text-primary/35 focus:border-accent/60 focus:outline-none"
            />
          ))}
        </div>
      ) : null}
      {error ? (
        <p className="mt-3 rounded-md bg-attention/10 px-3 py-2 text-sm text-attention" role="alert">
          {error}
        </p>
      ) : null}
      {result && !result.passed ? (
        <p className="mt-3 rounded-md border border-attention/30 bg-attention/10 px-3 py-2 text-sm leading-relaxed text-primary/80">
          Scored {result.score}/100. Review the requirement feedback in{' '}
          <Link to={ROUTES.evaluations} className="text-accent underline">
            Evaluations
          </Link>{' '}
          and resubmit when you have addressed the gaps.
        </p>
      ) : null}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs tabular-nums text-primary/50">
          {wordCount} words · minimum {minChars} characters
        </span>
        <Button
          size="sm"
          loading={submitting}
          disabled={submitting || payload.trim().length < minChars}
          onClick={() => void submit()}
        >
          {submitting
            ? 'Submitting…'
            : hasSubmitted
              ? 'Resubmit assignment'
              : 'Submit assignment'}
        </Button>
      </div>
    </div>
  )
}
