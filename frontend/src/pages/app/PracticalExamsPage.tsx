import { useState } from 'react'
import { examsApi } from '../../api/learning'
import type { PracticalExamDetail } from '../../types/domain'
import { useAsync } from '../../hooks/useAsync'
import { careerGateOrError } from './LearningPathPage'
import { Button } from '../../components/ui/button/Button'
import { ErrorState, LoadingState, PageHeader, Panel, StatusText } from '../../components/app/primitives'

export default function PracticalExamsPage(): React.JSX.Element {
  const list = useAsync(() => examsApi.practicalList(), [])
  const [openExam, setOpenExam] = useState<string | null>(null)

  if (list.loading) return <LoadingState />
  if (list.error) return careerGateOrError(list.error)

  const data = list.data!

  return (
    <div>
      <PageHeader
        eyebrow={data.career.name}
        title="Practical Exams"
        description="Profession-specific practical tasks. Submissions are assessed against the career rubric on the server."
      />

      <ul className="space-y-3">
        {data.exams.map((exam) => (
          <li key={exam.publicId}>
            {openExam === exam.publicId ? (
              <PracticalRunner examPublicId={exam.publicId} onClose={() => setOpenExam(null)} />
            ) : (
              <Panel>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-base font-semibold tracking-tight text-primary">{exam.title}</h2>
                    <p className="mt-1 text-xs text-primary/55">Passing requirement: {exam.passScore}/100</p>
                  </div>
                  {exam.attempts.length > 0 ? (
                    <div className="flex items-center gap-2">
                      <StatusText tone={exam.attempts[0]?.passed ? 'passed' : 'failed'} />
                      <span className="text-sm font-semibold tabular-nums text-primary">{exam.bestScore}</span>
                    </div>
                  ) : (
                    <StatusText tone="not_started" />
                  )}
                </div>

                <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-primary/60">
                  {(Array.isArray(exam.coverage) ? (exam.coverage as string[]) : []).map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>

                <div className="mt-4">
                  <Button size="sm" onClick={() => setOpenExam(exam.publicId)}>
                    {exam.attempts.length > 0 ? 'Review / retake' : 'Open task'}
                  </Button>
                </div>
              </Panel>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

function PracticalRunner({ examPublicId, onClose }: { examPublicId: string; onClose: () => void }): React.JSX.Element {
  const detail = useAsync(() => examsApi.detail(examPublicId), [examPublicId])
  const [submission, setSubmission] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<{ score: number; passed: boolean; evaluationPublicId: string } | null>(null)
  const [error, setError] = useState<string | null>(null)

  if (detail.loading) return <LoadingState />
  if (detail.error) return <ErrorState error={detail.error} />

  const exam = detail.data as PracticalExamDetail

  if (result) {
    return (
      <Panel title={`Assessed · ${result.score}/100`}>
        <div className="mb-4">
          <StatusText tone={result.passed ? 'passed' : 'failed'} />
        </div>
        <p className="text-sm leading-relaxed text-primary/75">
          Your evaluation is available with per-skill assessment and recommendations.
        </p>
        <Button variant="secondary" size="sm" onClick={onClose} className="mt-3">Back</Button>
      </Panel>
    )
  }

  const submit = async (): Promise<void> => {
    setSubmitting(true)
    setError(null)
    try {
      const r = await examsApi.submitPractical(examPublicId, submission)
      setResult(r)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Submission failed.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Panel
      title={exam.title}
      footer={
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs tabular-nums text-primary/50">{submission.trim().split(/\s+/).filter(Boolean).length} words</span>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={onClose}>Cancel</Button>
            <Button
              size="sm"
              disabled={submitting || submission.trim().length < 200}
              onClick={() => void submit()}
            >
              {submitting ? 'Submitting…' : 'Submit for evaluation'}
            </Button>
          </div>
        </div>
      }
    >
      {error ? <p className="mb-3 rounded-md bg-attention/10 px-3 py-2 text-sm text-attention">{error}</p> : null}

      <section aria-label="Brief" className="rounded-md bg-bg px-4 py-3">
        <p className="text-sm leading-relaxed text-primary/85">{exam.brief}</p>
      </section>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-primary/55">Requirements</h3>
          <ul className="mt-2 space-y-1.5">
            {exam.requirements.map((r, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed text-primary/80">
                <span aria-hidden className="text-accent">–</span>{r}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-primary/55">Assessment rubric</h3>
          <ul className="mt-2 space-y-2">
            {exam.rubric.map((r) => (
              <li key={r.skill} className="text-sm leading-relaxed text-primary/80">
                <span className="font-medium">{r.skill}</span> · {r.weight}% — <span className="text-primary/60">{r.criteria}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-5 border-t border-border pt-4">
        <label htmlFor="practical-submission" className="block text-sm font-medium text-primary">
          Expected output format: {exam.expectedOutput}
        </label>
        <textarea
          id="practical-submission"
          rows={14}
          value={submission}
          onChange={(e) => setSubmission(e.target.value)}
          placeholder="Write your full practical submission here — structured exactly as the requirements demand."
          className="mt-2 w-full rounded-md border border-border bg-white px-3 py-2 font-mono text-sm text-primary placeholder:text-primary/35 focus:border-accent/60 focus:outline-none"
        />
      </section>
    </Panel>
  )
}
