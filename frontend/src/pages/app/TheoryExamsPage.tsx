import { useState } from 'react'
import { examsApi } from '../../api/learning'
import { useAsync } from '../../hooks/useAsync'
import { careerGateOrError } from './LearningPathPage'
import { Button } from '../../components/ui/button/Button'
import { TheoryExamRunner } from '../../components/learning/TheoryExamRunner'
import {
  LoadingState,
  PageHeader,
  Panel,
  StatusText
} from '../../components/app/primitives'

export default function TheoryExamsPage(): React.JSX.Element {
  const list = useAsync(() => examsApi.theoryList(), [])
  const [openExam, setOpenExam] = useState<string | null>(null)

  if (list.loading) return <LoadingState />
  if (list.error) return careerGateOrError(list.error)

  const data = list.data!

  return (
    <div>
      <PageHeader
        eyebrow={data.career.name}
        title="Theoretical Exams"
        description="Chapter exams built from the topics you studied. Answers are graded on the server. Missed questions stay hidden and point you back to the exact lesson section to review before retrying."
      />

      <ul className="space-y-3">
        {data.exams.map((exam) => (
          <li key={exam.publicId}>
            {openExam === exam.publicId ? (
              <TheoryExamRunner examPublicId={exam.publicId} onClose={() => setOpenExam(null)} />
            ) : (
              <Panel>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                      {exam.chapter ? `${exam.chapter.stage} · ${exam.chapter.title}` : 'Final assessment'}
                    </p>
                    <h2 className="mt-0.5 text-base font-semibold tracking-tight text-primary">{exam.title}</h2>
                    <p className="mt-1 text-xs text-primary/55">Passing requirement: {exam.passScore}/100</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {exam.attempts.length > 0 ? (
                      <>
                        <StatusText tone={exam.attempts[0]?.passed ? 'passed' : 'failed'} />
                        <span className="text-sm font-semibold tabular-nums text-primary">{exam.bestScore}</span>
                      </>
                    ) : (
                      <StatusText tone="not_started" />
                    )}
                  </div>
                </div>

                <details className="mt-2">
                  <summary className="cursor-pointer text-xs text-primary/60">Coverage</summary>
                  <ul className="mt-1 flex flex-wrap gap-x-3 gap-y-1 pt-1 text-xs text-primary/60">
                    {(Array.isArray(exam.coverage) ? (exam.coverage as string[]) : []).map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </details>

                <div className="mt-3">
                  <Button size="sm" onClick={() => setOpenExam(exam.publicId)}>
                    {exam.attempts.length > 0 ? 'Retake exam' : 'Start exam'}
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
