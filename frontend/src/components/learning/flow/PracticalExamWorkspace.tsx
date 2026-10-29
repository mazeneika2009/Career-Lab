import { Suspense, lazy, useEffect, useMemo, useState } from 'react'
import { examsApi } from '../../../api/learning'
import { useAsync } from '../../../hooks/useAsync'
import type { PracticalExamDetail, PracticalExamResult } from '../../../types/domain'
import { Button } from '../../ui/button/Button'
import { ErrorState, LoadingState, ProgressBar, StatusText } from '../../app/primitives'

// The editor (and its Monaco language workers) is a large, separate chunk.
// Defer it until the practical step actually renders.
const MonacoCodeEditor = lazy(() => import('./MonacoCodeEditor'))

const LANGUAGE_EXTENSIONS: Record<string, string> = {
  javascript: 'js',
  typescript: 'ts',
  python: 'py',
  sql: 'sql',
  html: 'html',
  css: 'css',
  kotlin: 'kt',
  swift: 'swift',
  dart: 'dart',
  java: 'java',
  csharp: 'cs',
  go: 'go',
  rust: 'rs'
}

const LANGUAGE_ALIASES: Record<string, string> = {
  'html / css': 'html',
  html: 'html',
  css: 'css',
  js: 'javascript',
  ts: 'typescript',
  py: 'python'
}

function editorLanguage(language: string): string {
  const normalized = language.trim().toLowerCase()
  return LANGUAGE_ALIASES[normalized] ?? normalized
}

export function PracticalExamWorkspace({
  examPublicId,
  lessonNumber,
  alreadyPassed,
  bestScore,
  onGraded,
  onContinue
}: {
  examPublicId: string
  lessonNumber: number
  alreadyPassed: boolean
  bestScore: number | null
  onGraded: () => void
  onContinue: () => void
}): React.JSX.Element {
  const detail = useAsync(() => examsApi.detail(examPublicId), [examPublicId])
  const exam = detail.data && detail.data.kind === 'practical' ? (detail.data as PracticalExamDetail) : null

  const [code, setCode] = useState('')
  const [result, setResult] = useState<PracticalExamResult | null>(null)
  const [phase, setPhase] = useState<'editing' | 'grading'>('editing')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!exam) return
    setCode(exam.starterCode)
    setResult(null)
    setError(null)
    setPhase('editing')
  }, [exam])

  const language = exam ? editorLanguage(exam.language) : 'javascript'
  const extension = LANGUAGE_EXTENSIONS[language] ?? 'txt'
  const lineCount = useMemo(() => code.split('\n').length, [code])

  if (detail.loading) return <LoadingState />
  if (detail.error) return <ErrorState error={detail.error} />
  if (!exam) return <ErrorState error={new Error('This practical exam is not available.')} />

  const submit = async (): Promise<void> => {
    if (code.trim().length < 20) {
      setError('Write a real implementation (at least 20 characters) before submitting.')
      return
    }
    setError(null)
    setPhase('grading')
    try {
      const graded = await examsApi.submitPractical(examPublicId, code, exam.language)
      setResult(graded)
      setPhase('editing')
      if (graded.passed) onGraded()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Submission failed. Please try again.')
      setPhase('editing')
    }
  }

  const requirementResults = result?.feedback.requirementResults ?? []

  return (
    <div className="space-y-4">
      <section className="rounded-lg border border-border bg-surface">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border px-5 py-4">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/45">
              Lesson {String(lessonNumber).padStart(2, '0')} · Practical exam
            </p>
            <h2 className="mt-1 font-display text-lg font-semibold tracking-tight text-primary">
              {exam.title}
            </h2>
            <p className="mt-1 text-sm text-primary/60">
              {exam.languageLabel} · pass with {exam.passScore}/100
              {alreadyPassed && bestScore !== null ? ` · best score ${bestScore}/100` : ''}
            </p>
          </div>
          {alreadyPassed ? <StatusText tone="passed" /> : null}
        </div>

        {alreadyPassed ? (
          <p className="border-b border-border bg-primary/[0.035] px-5 py-3 text-sm leading-relaxed text-primary/70">
            You have already completed this practical exam. You can keep the completed score or
            resubmit an improved solution below.
          </p>
        ) : null}

        <div className="grid items-start gap-0 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
          {/* Instructions */}
          <div className="space-y-5 border-b border-border px-5 py-5 lg:border-b-0 lg:border-r">
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/55">
                Brief
              </h3>
              <p className="mt-2 text-sm leading-7 text-primary/85">{exam.brief}</p>
            </section>

            <section>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/55">
                Requirements
              </h3>
              <ol className="mt-2 space-y-2.5">
                {exam.requirements.map((requirement, index) => {
                  const outcome = requirementResults.find((row) => row.requirement === requirement)
                  return (
                    <li key={`${requirement}-${index}`} className="flex gap-2.5 text-sm leading-relaxed">
                      <span className="mt-0.5 font-mono text-[11px] font-semibold tabular-nums text-accent">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-primary/85">{requirement}</span>
                        {outcome ? (
                          <span className={`mt-0.5 block text-xs font-medium ${outcome.met ? 'text-info' : 'text-attention'}`}>
                            {outcome.met ? 'Met' : 'Needs work'} — {outcome.note}
                          </span>
                        ) : null}
                      </span>
                    </li>
                  )
                })}
              </ol>
            </section>

            <section>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/55">
                Expected output
              </h3>
              <p className="mt-2 text-sm leading-7 text-primary/75">{exam.expectedOutput}</p>
            </section>

            {exam.rubric.length > 0 ? (
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/55">
                  How the work is assessed
                </h3>
                <ul className="mt-2 space-y-2">
                  {exam.rubric.map((row, index) => (
                    <li key={`${row.skill}-${index}`} className="rounded-md border border-border/80 px-3 py-2">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-sm font-medium text-primary">{row.skill}</span>
                        <span className="text-xs tabular-nums text-primary/50">{row.weight}%</span>
                      </div>
                      <p className="mt-0.5 text-xs leading-relaxed text-primary/60">{row.criteria}</p>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>

          {/* Editor */}
          <div className="min-w-0 px-5 py-5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
              <div className="flex min-w-0 items-center gap-2 text-xs text-primary/55">
                <span className="truncate font-mono text-primary/70">solution.{extension}</span>
                <span aria-hidden>·</span>
                <span className="shrink-0">{exam.languageLabel}</span>
                <span aria-hidden>·</span>
                <span className="shrink-0 tabular-nums">{lineCount} lines</span>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setCode(exam.starterCode)
                  setResult(null)
                  setError(null)
                }}
              >
                Reset starter code
              </Button>
            </div>

            <div className="h-[420px] overflow-hidden rounded-md border border-border sm:h-[520px]">
              <Suspense
                fallback={
                  <div
                    className="flex h-full items-center justify-center bg-surface text-sm text-primary/50"
                    role="status"
                  >
                    Loading code editor…
                  </div>
                }
              >
                <MonacoCodeEditor value={code} language={language} onChange={setCode} />
              </Suspense>
            </div>

            {error ? (
              <p className="mt-3 rounded-md bg-attention/10 px-3 py-2 text-sm text-attention">{error}</p>
            ) : null}

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs leading-relaxed text-primary/50">
                Your code is reviewed against every requirement above. Passing unlocks the
                lesson assignment.
              </p>
              <Button size="sm" disabled={phase === 'grading'} onClick={() => void submit()}>
                {phase === 'grading' ? 'Reviewing submission…' : result?.passed ? 'Submit improved solution' : 'Submit for review'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {result ? (
        <PracticalResult
          result={result}
          onRetry={() => setResult(null)}
          onContinue={onContinue}
        />
      ) : null}
    </div>
  )
}

function PracticalResult({
  result,
  onRetry,
  onContinue
}: {
  result: PracticalExamResult
  onRetry: () => void
  onContinue: () => void
}): React.JSX.Element {
  return (
    <section className="rounded-lg border border-border bg-surface">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/45">
            Reviewer feedback
          </p>
          <h2 className="mt-1 font-display text-lg font-semibold tracking-tight text-primary">
            {result.score}/100 · {result.passed ? 'Practical passed' : 'Practical not passed'}
          </h2>
        </div>
        <StatusText tone={result.passed ? 'passed' : 'failed'} />
      </header>

      <div className="space-y-5 px-5 py-4">
        <ProgressBar percent={result.score} label="Practical score" />
        <p className="text-sm leading-7 text-primary/85">{result.feedback.summary}</p>

        {result.feedback.missingRequirements.length > 0 ? (
          <div className="rounded-md border border-attention/35 bg-attention/[0.045] px-4 py-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-attention">
              Missing requirements
            </h3>
            <ul className="mt-2 space-y-1.5">
              {result.feedback.missingRequirements.map((requirement, index) => (
                <li key={index} className="flex gap-2 text-sm leading-relaxed text-primary/80">
                  <span aria-hidden className="mt-0.5 text-attention">–</span>
                  {requirement}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-primary/55">
              What works
            </h3>
            <ul className="mt-2 space-y-1.5">
              {result.feedback.strengths.map((strength, index) => (
                <li key={index} className="flex gap-2 text-sm leading-relaxed text-primary/80">
                  <span aria-hidden className="mt-0.5 text-info">–</span>
                  {strength}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-primary/55">
              What to improve
            </h3>
            <ul className="mt-2 space-y-1.5">
              {result.feedback.improvements.map((improvement, index) => (
                <li key={index} className="flex gap-2 text-sm leading-relaxed text-primary/80">
                  <span aria-hidden className="mt-0.5 text-accent">–</span>
                  {improvement}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {result.feedback.requirementResults.length > 0 ? (
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-primary/55">
              Requirement checklist
            </h3>
            <ul className="mt-2 divide-y divide-border/70 rounded-md border border-border/80">
              {result.feedback.requirementResults.map((row, index) => (
                <li key={index} className="flex flex-wrap items-start justify-between gap-2 px-3 py-2.5">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-primary/85">{row.requirement}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-primary/55">{row.note}</p>
                  </div>
                  <span className={`shrink-0 text-xs font-medium ${row.met ? 'text-info' : 'text-attention'}`}>
                    {row.met ? 'Met' : 'Needs work'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          <p className="text-sm leading-relaxed text-primary/70">
            {result.passed
              ? 'Practical exam passed. Your assignment for this lesson is now unlocked.'
              : `A score of ${result.score}/100 is below the pass mark. Improve the missing requirements and resubmit.`}
          </p>
          <div className="flex flex-wrap gap-2">
            {!result.passed ? (
              <Button size="sm" variant="secondary" onClick={onRetry}>
                Keep editing
              </Button>
            ) : null}
            {result.passed ? (
              <Button size="sm" onClick={onContinue}>
                Continue to assignment
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
