import { progressApi } from '../../api/learning'
import { useAsync } from '../../hooks/useAsync'
import { careerGateOrError } from './LearningPathPage'
import { LoadingState, PageHeader, Panel, ProgressBar, KeyValue } from '../../components/app/primitives'

export default function CareerReportPage(): React.JSX.Element {
  const state = useAsync(() => progressApi.careerReport(), [])

  if (state.loading) return <LoadingState />
  if (state.error) return careerGateOrError(state.error)

  const r = state.data!

  return (
    <div>
      <PageHeader
        eyebrow={`Generated ${new Date(r.generatedAt).toLocaleDateString()}`}
        title={`${r.career.name} — professional progress report`}
        description="The complete record of your journey through this career track."
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Panel title="Learning completion" icon="target">
          <ProgressBar
            percent={r.learningCompletion.percent}
            label={`${r.learningCompletion.completedTopics}/${r.learningCompletion.totalTopics} topics`}
          />
          <dl className="mt-4 grid grid-cols-2 gap-3">
            <KeyValue label="Career" value={r.career.name} />
            <KeyValue label="Category" value={r.career.category} />
          </dl>
        </Panel>

        <Panel title="Skill development" icon="bar-chart">
          <ul className="space-y-2.5">
            {r.skillDevelopment.map((s) => (
              <li key={s.skill}>
                <ProgressBar percent={s.percent} label={s.skill} />
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Exam results" icon="clipboard-check">
          <ReportList rows={[...r.examResults.theory, ...r.examResults.practical]} emptyLabel="No exam attempts yet." />
        </Panel>

        <Panel title="Assignment results" icon="file-text">
          <ReportList rows={r.assignmentResults} emptyLabel="No evaluated assignments yet." />
        </Panel>

        <Panel title="Simulation results" icon="building">
          <dl className="grid grid-cols-2 gap-3">
            <KeyValue label="Tasks submitted" value={String(r.simulationResults.tasksSubmitted)} />
            <KeyValue label="Average score" value={r.simulationResults.averageScore !== null ? `${r.simulationResults.averageScore}/100` : '—'} />
            <KeyValue label="Workplace scenarios" value={String(r.simulationResults.workplaceScenariosCompleted)} />
            <KeyValue label="Communication threads" value={String(r.simulationResults.communicationThreads)} />
          </dl>
        </Panel>

        <Panel title="Interview results" icon="mic">
          <dl className="grid grid-cols-2 gap-3">
            <KeyValue label="Sessions completed" value={String(r.interviewResults.completedSessions)} />
            <KeyValue label="Best score" value={r.interviewResults.bestScore !== null ? `${r.interviewResults.bestScore}/100` : '—'} />
          </dl>
        </Panel>

        <Panel title="Strengths" icon="trending-up">
          <ul className="space-y-1.5">
            {r.strengths.length > 0 ? (
              r.strengths.map((s, i) => <li key={i} className="text-sm leading-relaxed text-primary/80">· {s}</li>)
            ) : (
              <li className="text-sm text-primary/60">Recorded as evaluations accumulate.</li>
            )}
          </ul>
        </Panel>

        <Panel title="Development areas" icon="lightbulb">
          <ul className="space-y-1.5">
            {r.developmentAreas.length > 0 ? (
              r.developmentAreas.map((s, i) => <li key={i} className="text-sm leading-relaxed text-primary/80">· {s}</li>)
            ) : (
              <li className="text-sm text-primary/60">None recorded yet.</li>
            )}
          </ul>
        </Panel>

        <Panel title="Career readiness" icon="shield-check" className="md:col-span-2">
          {r.careerReadiness ? (
            <div className="max-w-md">
              <ProgressBar percent={r.careerReadiness.overallPercent} label={r.careerReadiness.ready ? 'Ready for professional work' : 'Not yet ready — requirements outstanding'} />
            </div>
          ) : (
            <p className="text-sm text-primary/60">Readiness is computed once assessments begin.</p>
          )}
          {r.certificate ? (
            <p className="mt-4 rounded-md border border-success/50 bg-success/10 px-4 py-3 text-sm font-medium text-primary">
              Certificate issued · Serial {r.certificate.serial}
            </p>
          ) : null}
        </Panel>
      </div>
    </div>
  )
}

function ReportList({ rows, emptyLabel }: { rows: Array<{ title: string; score: number }>; emptyLabel: string }): React.JSX.Element {
  if (rows.length === 0) return <p className="text-sm text-primary/60">{emptyLabel}</p>
  return (
    <ul className="space-y-1.5 text-sm">
      {rows.map((e, i) => (
        <li key={i} className="flex justify-between gap-3 text-primary/80">
          <span className="truncate">{e.title}</span>
          <span className="font-medium tabular-nums">{e.score}</span>
        </li>
      ))}
    </ul>
  )
}
