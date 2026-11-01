import { achievementsApi } from '../../api/learning'
import { useAsync } from '../../hooks/useAsync'
import { careerGateOrError } from './LearningPathPage'
import { LoadingState, PageHeader, Panel, StatusText } from '../../components/app/primitives'

const CHECKLIST_LABELS: Array<[key: string, label: string]> = [
  ['learningComplete', 'Complete all learning topics'],
  ['allTheoryExamsPassed', 'Pass every chapter theory exam'],
  ['practicalExamPassed', 'Pass the practical exam'],
  ['assignmentsPassed', 'Earn a passing assignment evaluation (1+)'],
  ['simulationEngaged', 'Simulation active with 2+ submitted tasks'],
  ['interviewCompleted', 'Complete the technical interview']
]

export default function CertificatePage(): React.JSX.Element {
  const state = useAsync(() => achievementsApi.certificate(), [])

  if (state.loading) return <LoadingState />
  if (state.error) return careerGateOrError(state.error)

  const data = state.data!

  if (data.status === 'issued' && data.certificate) {
    return (
      <div>
        <PageHeader eyebrow="Career Lab" title="Certificate" />
        <div className="mx-auto max-w-2xl">
          <div className="rounded-lg border-4 border-double border-primary bg-surface px-8 py-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/55">Certificate of completion</p>
            <h1 className="mt-4 text-2xl font-semibold tracking-tight text-primary">
              This certifies that the student has completed the professional training program
            </h1>
            <p className="mt-6 text-sm uppercase tracking-[0.14em] text-primary/60">Serial number</p>
            <p className="mt-1 font-mono text-lg text-primary">{data.certificate.serial}</p>
            <p className="mt-6 text-xs tabular-nums text-primary/50">
              Issued {new Date(data.certificate.issuedAt).toLocaleDateString()} · Verified by Career Lab
            </p>
          </div>
        </div>
      </div>
    )
  }

  const missing = data.requirements?.missing ?? []

  return (
    <div>
      <PageHeader
        eyebrow="Requirements-controlled"
        title="Certificate"
        description="Certificates are issued by the platform when every requirement below is satisfied. Progress cannot be self-reported."
      />

      <Panel title={`Outstanding requirements (${missing.length})`} icon="shield-check">
        <ul className="space-y-2.5">
          {CHECKLIST_LABELS.map(([key, label]) => {
            const done = data.requirements ? Boolean(data.requirements.checklist[key]) : false
            return (
              <li key={key} className="flex items-center gap-3 text-sm">
                <StatusText tone={done ? 'completed' : 'not_started'} />
                <span className={done ? 'text-primary/60 line-through' : 'font-medium text-primary'}>{label}</span>
              </li>
            )
          })}
        </ul>
        <p className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-primary/55">
          Eligibility depends on learning completion, required exams, required assignments, practical performance,
          simulation engagement and the technical interview — verified server-side.
        </p>
      </Panel>
    </div>
  )
}
