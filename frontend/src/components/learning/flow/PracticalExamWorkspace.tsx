import { useEffect, useState } from 'react'
import { examsApi } from '../../../api/learning'
import { useAsync } from '../../../hooks/useAsync'
import type { PracticalExamDetail, PracticalExamResult } from '../../../types/domain'
import { cn } from '../../../utils/cn'
import { Button } from '../../ui/button/Button'
import { Icon, type IconName } from '../../ui/icon/Icon'
import { ErrorState, LoadingState, ProgressBar, StatusText } from '../../app/primitives'
import { translate, useTranslation } from '../../../i18n'
import { DynamicPracticalWorkbench, environmentMeta } from './practical/environments'

type GuideTab = 'brief' | 'rubric' | 'feedback'
type MobilePane = 'brief' | 'code' | 'feedback'

function historicalResult(
  exam: PracticalExamDetail,
  t: (key: string, variables?: Record<string, string | number>) => string
): PracticalExamResult | null {
  const prior = exam.lastAttempt
  if (!prior) return null
  return {
    attemptPublicId: prior.attemptPublicId,
    submissionPublicId: prior.attemptPublicId,
    evaluationPublicId: prior.evaluationPublicId ?? '',
    score: prior.score,
    passed: prior.passed,
    feedback: prior.feedback ?? {
      summary: prior.passed ? t('practical.historicalPassed') : t('practical.historicalFailed', { score: prior.score }),
      strengths: [],
      improvements: [],
      missingRequirements: [],
      requirementResults: []
    },
    gradedBy: 'deterministic',
    model: null,
    nextLessonUnlocked: prior.passed,
    submittedAt: prior.submittedAt
  }
}

export function PracticalExamWorkspace({
  examPublicId,
  lessonNumber,
  alreadyPassed,
  onGraded,
  onContinue
}: {
  examPublicId: string
  lessonNumber: number
  alreadyPassed: boolean
  onGraded: () => void
  onContinue: () => void
}): React.JSX.Element {
  const { t, language } = useTranslation()
  const detail = useAsync(() => examsApi.detail(examPublicId), [examPublicId])
  const exam = detail.data && detail.data.kind === 'practical' ? (detail.data as PracticalExamDetail) : null

  const [result, setResult] = useState<PracticalExamResult | null>(null)
  const [phase, setPhase] = useState<'editing' | 'grading'>('editing')
  const [error, setError] = useState<string | null>(null)
  const [guideTab, setGuideTab] = useState<GuideTab>('brief')
  const [mobilePane, setMobilePane] = useState<MobilePane>('brief')
  const [submittedCode, setSubmittedCode] = useState<string | null>(null)

  useEffect(() => {
    if (!exam) return
    const localize = (key: string, variables?: Record<string, string | number>): string =>
      translate(language, key, variables)
    const prior = historicalResult(exam, localize)
    setResult(prior)
    setSubmittedCode(exam.lastAttempt?.code ?? null)
    setError(null)
    setPhase('editing')
    setGuideTab(prior ? 'feedback' : 'brief')
    setMobilePane(prior ? 'feedback' : 'brief')
  }, [exam, language])

  const completed = alreadyPassed || exam?.completed === true || result?.passed === true

  if (detail.loading) return <LoadingState />
  if (detail.error) return <ErrorState error={detail.error} />
  if (!exam) return <ErrorState error={new Error('This practical exam is not available.')} />

  const submit = async (submission: string): Promise<void> => {
    if (submission.trim().length < 20) {
      setError(t('practical.tooShort'))
      return
    }
    setError(null)
    setPhase('grading')
    try {
      const graded = await examsApi.submitPractical(examPublicId, submission, exam.language)
      setResult(graded)
      setSubmittedCode(submission)
      setPhase('editing')
      setGuideTab('feedback')
      setMobilePane('feedback')
      if (graded.passed) onGraded()
    } catch (e) {
      setError(e instanceof Error ? e.message : t('practical.submitFailed'))
      setPhase('editing')
    }
  }

  const resetWorkspace = (): void => {
    setResult(null)
    setError(null)
    setGuideTab('brief')
    setMobilePane('code')
  }

  const openGuide = (tab: GuideTab): void => {
    setGuideTab(tab)
    setMobilePane(tab === 'feedback' ? 'feedback' : 'brief')
  }

  const meta = environmentMeta(exam.environment)

  const mobileTabs: Array<{ key: MobilePane; label: string; icon: IconName }> = [
    { key: 'brief', label: t('practical.brief'), icon: 'book-open' },
    { key: 'code', label: meta.label, icon: meta.icon },
    ...(result ? [{ key: 'feedback' as const, label: t('practical.feedback'), icon: 'clipboard-check' as const }] : [])
  ]

  return (
    <div className="@container space-y-4">
      <section className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
        <div className="px-5 py-5 sm:px-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/45">
            {t('practical.lessonLabel', { number: String(lessonNumber).padStart(2, '0') })}
          </p>
          <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-balance font-display text-xl font-bold tracking-tight text-primary sm:text-2xl">
              {exam.title}
            </h2>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg/40 px-2.5 py-1 text-[11px] font-medium text-primary/60">
              <Icon name={meta.icon} className="h-3.5 w-3.5" />
              {meta.label}
            </span>
          </div>
        </div>
        {completed ? (
          <div className="flex items-start gap-2 border-t border-info/20 bg-info/[0.035] px-5 py-2.5 text-xs leading-relaxed text-primary/65 sm:px-6">
            <Icon name="award" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-info" />
            <span>
              <span className="font-semibold text-primary/80">{t('practical.completedTitle')}.</span>{' '}
              {t('practical.completedBody')}
              {typeof (result?.score ?? exam.finalScore) === 'number' ? (
                <span className="ms-1 font-semibold tabular-nums text-primary/80">
                  {t('practical.finalScore')}: {result?.score ?? exam.finalScore}/100
                </span>
              ) : null}
            </span>
          </div>
        ) : null}
      </section>

      <div className="@5xl:hidden">
        <div
          role="tablist"
          aria-label="Practical workspace"
          className={cn(
            'grid gap-1 rounded-xl border border-border bg-surface p-1 shadow-sm',
            result ? 'grid-cols-3' : 'grid-cols-2'
          )}
        >
          {mobileTabs.map((tab) => {
            const active = mobilePane === tab.key
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setMobilePane(tab.key)
                  if (tab.key === 'brief') setGuideTab('brief')
                  if (tab.key === 'feedback') setGuideTab('feedback')
                }}
                className={cn(
                  'flex items-center justify-center gap-2 rounded-lg px-2 py-2.5 text-xs font-semibold transition-colors duration-150',
                  active
                    ? 'bg-primary text-surface shadow-sm'
                    : 'text-primary/55 hover:bg-primary/[0.04] hover:text-primary'
                )}
              >
                <Icon name={tab.icon} className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid items-start gap-4 @5xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.6fr)]">
        <div className={cn('min-w-0', mobilePane !== 'code' && 'hidden @5xl:block')}>
          {completed ? (
            <CompletedExamWorkspace
              environment={exam.environment}
              languageLabel={exam.languageLabel}
              score={result?.score ?? exam.finalScore}
              submittedCode={submittedCode}
            />
          ) : (
            <DynamicPracticalWorkbench
              key={exam.publicId}
              environment={exam.environment}
              examPublicId={exam.publicId}
              starterCode={exam.starterCode}
              restoreCode={exam.lastAttempt?.code ?? null}
              title={exam.title}
              brief={exam.brief}
              requirements={exam.requirements}
              language={exam.language}
              languageLabel={exam.languageLabel}
              submitting={phase === 'grading'}
              error={error}
              submitLabel={
                phase === 'grading'
                  ? t('practical.reviewingSubmission')
                  : result
                    ? t('practical.submitRevision')
                    : t('practical.submitForReview')
              }
              meta={t('practical.workbenchMeta', {
                count: exam.requirements.length,
                pass: exam.passScore
              })}
              onSubmit={(submission) => void submit(submission)}
              onReset={resetWorkspace}
            />
          )}
        </div>

        <aside
          aria-label={t('practical.examGuide')}
          className={cn('min-w-0 @5xl:sticky @5xl:top-20', mobilePane === 'code' && 'hidden @5xl:block')}
        >
          <section className="flex flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm @5xl:max-h-[calc(100dvh-6rem)]">
            <header className="shrink-0 border-b border-border px-4 pb-3 pt-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/45">
                  {t('practical.examGuide')}
                </p>
                <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-primary/35">
                  {guideTab === 'brief'
                    ? t('practical.readFirst')
                    : guideTab === 'rubric'
                      ? t('practical.assessment')
                      : t('practical.result')}
                </span>
              </div>
              <div
                role="tablist"
                aria-label={t('practical.examGuide')}
                className={cn(
                  'mt-3 grid gap-1 rounded-lg bg-bg/65 p-1',
                  result ? 'grid-cols-3' : 'grid-cols-2'
                )}
              >
                <GuideTabButton
                  active={guideTab === 'brief'}
                  label={t('practical.brief')}
                  onClick={() => setGuideTab('brief')}
                />
                <GuideTabButton
                  active={guideTab === 'rubric'}
                  label={t('practical.rubric')}
                  onClick={() => setGuideTab('rubric')}
                />
                {result ? (
                  <GuideTabButton
                    active={guideTab === 'feedback'}
                    label={t('practical.feedback')}
                    onClick={() => setGuideTab('feedback')}
                    attention
                  />
                ) : null}
              </div>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
              {guideTab === 'brief' ? (
                <BriefPanel exam={exam} result={result} />
              ) : guideTab === 'rubric' ? (
                <RubricPanel exam={exam} />
              ) : result ? (
                <FeedbackPanel
                  result={result}
                  onRefine={() => setMobilePane('code')}
                  onReview={() => openGuide('brief')}
                  onContinue={onContinue}
                />
              ) : null}
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}

function CompletedExamWorkspace({
  environment,
  languageLabel,
  score,
  submittedCode
}: {
  environment: PracticalExamDetail['environment']
  languageLabel: string
  score: number | null
  submittedCode: string | null
}): React.JSX.Element {
  const { t } = useTranslation()
  const meta = environmentMeta(environment)
  return (
    <section className="flex min-h-[520px] flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
      <header className="flex items-center gap-2.5 border-b border-border px-4 py-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-info/10 text-info">
          <Icon name={meta.icon} className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-primary">{meta.label}</p>
          <p className="truncate text-[11px] text-primary/45">{languageLabel}</p>
        </div>
      </header>
      <div className="flex-1 space-y-4 p-5">
        <div className="rounded-lg border border-info/25 bg-info/[0.04] p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-primary">{t('practical.completedTitle')}</p>
            <StatusText tone="passed" />
          </div>
          <p className="mt-2 text-sm leading-relaxed text-primary/65">{t('practical.completedBody')}</p>
          {typeof score === 'number' ? (
            <p className="mt-3 font-display text-2xl font-bold tabular-nums text-primary">
              {t('practical.finalScore')}: {score}/100
            </p>
          ) : null}
        </div>
        {submittedCode ? (
          <details className="overflow-hidden rounded-lg border border-border/80 bg-bg/20">
            <summary className="cursor-pointer px-3.5 py-3 text-sm font-medium text-primary">
              {t('practical.reviewSubmittedWork')}
            </summary>
            <pre className="max-h-[360px] overflow-auto border-t border-border/70 px-3.5 py-3 font-mono text-xs leading-5 text-primary/75">
              <code>{submittedCode}</code>
            </pre>
          </details>
        ) : null}
      </div>
    </section>
  )
}

function GuideTabButton({
  active,
  label,
  onClick,
  attention = false
}: {
  active: boolean
  label: string
  onClick: () => void
  attention?: boolean
}): React.JSX.Element {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        'relative flex items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium transition-colors duration-150',
        active
          ? 'bg-surface text-primary shadow-sm'
          : 'text-primary/50 hover:bg-surface/70 hover:text-primary'
      )}
    >
      {label}
      {attention ? (
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
      ) : null}
    </button>
  )
}

function SectionHeading({
  icon,
  label,
  accent = false
}: {
  icon: IconName
  label: string
  accent?: boolean
}): React.JSX.Element {
  return (
    <h3
      className={cn(
        'flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em]',
        accent ? 'text-accent' : 'text-primary/55'
      )}
    >
      <Icon name={icon} className="h-3.5 w-3.5" />
      {label}
    </h3>
  )
}

function BriefPanel({
  exam,
  result
}: {
  exam: PracticalExamDetail
  result: PracticalExamResult | null
}): React.JSX.Element {
  const { t } = useTranslation()
  const outcomes = result?.feedback.requirementResults ?? []

  return (
    <div className="space-y-5">
      <section>
        <SectionHeading icon="lightbulb" label={t('practical.yourMission')} />
        <p className="mt-2 text-sm leading-7 text-primary/85">{exam.brief}</p>
      </section>

      <section>
        <div className="flex items-center justify-between gap-2">
          <SectionHeading icon="check-square" label={t('practical.requirements')} />
          <span className="rounded-full bg-primary/[0.055] px-2 py-0.5 text-[10px] font-semibold tabular-nums text-primary/50">
            {exam.requirements.length}
          </span>
        </div>
        <ol className="mt-2 space-y-2">
          {exam.requirements.map((requirement, index) => {
            const outcome = outcomes.find((row) => row.requirement === requirement)
            return (
              <li
                key={`${requirement}-${index}`}
                className={cn(
                  'rounded-lg border px-3 py-2.5 transition-colors duration-150',
                  outcome
                    ? outcome.met
                      ? 'border-info/25 bg-info/[0.035]'
                      : 'border-attention/30 bg-attention/[0.035]'
                    : 'border-border/70 bg-bg/30'
                )}
              >
                <div className="flex gap-2.5">
                  <span
                    className={cn(
                      'flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-semibold',
                      outcome
                        ? outcome.met
                          ? 'bg-info/15 text-info'
                          : 'bg-attention/15 text-attention'
                        : 'bg-primary/[0.055] text-primary/50'
                    )}
                  >
                    {outcome ? (
                      <Icon name={outcome.met ? 'check' : 'alert-triangle'} className="h-3 w-3" />
                    ) : (
                      String(index + 1).padStart(2, '0')
                    )}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm leading-relaxed text-primary/85">{requirement}</p>
                    {outcome ? (
                      <p
                        className={cn(
                          'mt-1 text-xs leading-relaxed',
                          outcome.met ? 'text-info' : 'text-attention'
                        )}
                      >
                        {outcome.met ? t('practical.met') : t('practical.needsWork')}
                        {outcome.note ? ` - ${outcome.note}` : ''}
                      </p>
                    ) : null}
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </section>

      <section className="rounded-lg border border-accent/25 bg-accent/[0.045] p-4">
        <SectionHeading icon="target" label={t('practical.expectedOutput')} accent />
        <p className="mt-2 text-sm leading-7 text-primary/80">{exam.expectedOutput}</p>
      </section>
    </div>
  )
}

function RubricPanel({ exam }: { exam: PracticalExamDetail }): React.JSX.Element {
  const { t } = useTranslation()
  return (
    <div className="space-y-5">
      <section>
        <SectionHeading icon="bar-chart" label={t('practical.howScored')} />
        <p className="mt-2 text-sm leading-7 text-primary/65">
          {t('practical.rubricIntro', { pass: exam.passScore })}
        </p>
      </section>

      {exam.rubric.length > 0 ? (
        <ul className="space-y-2.5">
          {exam.rubric.map((row, index) => (
            <li key={`${row.skill}-${index}`} className="rounded-lg border border-border/70 bg-bg/30 p-3">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-sm font-medium text-primary">{row.skill}</span>
                <span className="shrink-0 text-xs tabular-nums text-primary/50">{row.weight}%</span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-primary/60">{row.criteria}</p>
              <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-border/60">
                <div
                  className="h-full rounded-full bg-accent/70"
                  style={{ width: `${Math.max(0, Math.min(100, row.weight))}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-lg border border-dashed border-border px-4 py-5 text-sm text-primary/55">
          {t('practical.noRubric')}
        </p>
      )}

      <div className="flex items-start gap-2.5 rounded-lg border border-info/25 bg-info/[0.04] px-3.5 py-3">
        <Icon name="check-circle" className="mt-0.5 h-4 w-4 shrink-0 text-info" />
        <div>
          <p className="text-xs leading-relaxed text-primary/60">{t('practical.passingNote')}</p>
        </div>
      </div>
    </div>
  )
}

function FeedbackPanel({
  result,
  onRefine,
  onReview,
  onContinue
}: {
  result: PracticalExamResult
  onRefine: () => void
  onReview: () => void
  onContinue: () => void
}): React.JSX.Element {
  const { t } = useTranslation()
  return (
    <div className="space-y-3.5">
      <div
        className={cn(
          'rounded-xl border p-4',
          result.passed
            ? 'border-info/30 bg-info/[0.045]'
            : 'border-attention/30 bg-attention/[0.045]'
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary/45">
              {t('practical.reviewerScore')}
            </p>
            <p className="mt-1 flex items-baseline gap-1 font-display text-3xl font-bold tabular-nums text-primary">
              {result.score}
              <span className="text-sm font-medium text-primary/45">/100</span>
            </p>
          </div>
          <StatusText tone={result.passed ? 'passed' : 'failed'} />
        </div>
        <div className="mt-3">
          <ProgressBar percent={result.score} />
        </div>
        <p className="mt-3 text-sm leading-7 text-primary/80">{result.feedback.summary}</p>
      </div>

      <FeedbackDetails
        title={t('practical.missingRequirements')}
        icon="alert-triangle"
        items={result.feedback.missingRequirements}
        tone="attention"
        open
      />
      <FeedbackDetails title={t('practical.whatWorks')} icon="check-circle" items={result.feedback.strengths} />
      <FeedbackDetails title={t('practical.whatToImprove')} icon="lightbulb" items={result.feedback.improvements} />

      {result.feedback.requirementResults.length > 0 ? (
        <details className="group rounded-lg border border-border/80 bg-bg/20">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-3.5 py-3 [&::-webkit-details-marker]:hidden">
            <span className="flex items-center gap-2 text-sm font-medium text-primary">
              <Icon name="check-square" className="h-4 w-4 text-accent/80" />
              {t('practical.requirementChecklist')}
            </span>
            <span className="flex items-center gap-2 text-[11px] text-primary/40">
              {result.feedback.requirementResults.length}
              <Icon
                name="arrow-right"
                className="h-3.5 w-3.5 transition-transform duration-150 group-open:rotate-90"
              />
            </span>
          </summary>
          <ul className="divide-y divide-border/70 border-t border-border/70">
            {result.feedback.requirementResults.map((row, index) => (
              <li key={index} className="flex items-start justify-between gap-3 px-3.5 py-2.5">
                <div className="min-w-0">
                  <p className="text-sm leading-relaxed text-primary/85">{row.requirement}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-primary/55">{row.note}</p>
                </div>
                <span
                  className={cn(
                    'shrink-0 text-[11px] font-semibold',
                    row.met ? 'text-info' : 'text-attention'
                  )}
                >
                  {row.met ? t('practical.met') : t('practical.needsWork')}
                </span>
              </li>
            ))}
          </ul>
        </details>
      ) : null}

      <div className="space-y-2.5 border-t border-border pt-4">
        <p className="text-sm leading-relaxed text-primary/70">
          {result.passed ? t('practical.passedNote') : t('practical.failedNote')}
        </p>
        <div className="flex flex-wrap gap-2">
          {result.passed ? (
            <>
              <Button size="sm" onClick={onContinue}>
                {t('practical.continueAssignment')}
                <Icon name="arrow-right" className="h-3.5 w-3.5" />
              </Button>
            </>
          ) : (
            <>
              <Button size="sm" onClick={onRefine}>
                {t('practical.backToEditor')}
              </Button>
              <Button variant="secondary" size="sm" onClick={onReview}>
                {t('practical.reviewRequirements')}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function FeedbackDetails({
  title,
  icon,
  items,
  tone = 'default',
  open = false
}: {
  title: string
  icon: IconName
  items: string[]
  tone?: 'default' | 'attention'
  open?: boolean
}): React.JSX.Element | null {
  if (items.length === 0) return null

  return (
    <details open={open} className="group rounded-lg border border-border/80 bg-bg/20">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-3.5 py-3 [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-2 text-sm font-medium text-primary">
          <Icon
            name={icon}
            className={cn('h-4 w-4', tone === 'attention' ? 'text-attention' : 'text-accent/80')}
          />
          {title}
        </span>
        <span className="flex items-center gap-2 text-[11px] text-primary/40">
          {items.length}
          <Icon
            name="arrow-right"
            className="h-3.5 w-3.5 transition-transform duration-150 group-open:rotate-90"
          />
        </span>
      </summary>
      <ul className="space-y-1.5 border-t border-border/70 px-3.5 py-3">
        {items.map((item, index) => (
          <li key={index} className="flex gap-2 text-sm leading-relaxed text-primary/80">
            <span
              aria-hidden
              className={cn(
                'mt-1.5 h-1 w-1 shrink-0 rounded-full',
                tone === 'attention' ? 'bg-attention' : 'bg-accent/70'
              )}
            />
            {item}
          </li>
        ))}
      </ul>
    </details>
  )
}
