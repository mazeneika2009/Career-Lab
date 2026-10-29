import { Link } from 'react-router-dom'
import { learningApi } from '../../api/learning'
import { useAsync, isNoCareerError } from '../../hooks/useAsync'
import { ROUTES } from '../../constants/routes'
import {
  EmptyState,
  ErrorState,
  KeyValue,
  LoadingState,
  PageHeader,
  Panel,
  ProgressBar,
  StatusText
} from '../../components/app/primitives'
import { Icon } from '../../components/ui/icon/Icon'

export default function DashboardPage(): React.JSX.Element {
  const state = useAsync(() => learningApi.dashboard(), [])

  if (state.loading) return <LoadingState />
  if (state.error) {
    if (isNoCareerError(state.error)) {
      return (
        <EmptyState
          icon="compass"
          title="No career selected yet"
          description="Choose the career you want to train for to unlock your dashboard, learning path and simulation."
          action={
            <Link to={ROUTES.careers} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-surface">
              Go to career selection
            </Link>
          }
        />
      )
    }
    return <ErrorState error={state.error} />
  }

  const d = state.data!

  return (
    <div>
      <PageHeader
        eyebrow="Student dashboard"
        title={`Welcome back, ${d.studentName.split(' ')[0]}`}
        description={`Training track: ${d.career.name} · ${d.career.category}`}
        actions={
          d.continueLearningTarget ? (
            <Link
              to={ROUTES.learn}
              className="group inline-flex h-9 items-center gap-1.5 rounded-md bg-accent px-4 text-sm font-medium text-white transition-colors duration-150 hover:brightness-95"
            >
              Continue learning
              <Icon name="arrow-right" className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
            </Link>
          ) : null
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Panel title="Overall progress" icon="target" className="md:col-span-1">
          <p className="text-3xl font-semibold tabular-nums text-primary">{d.overallProgress}%</p>
          <div className="mt-3">
            <ProgressBar
              percent={d.overallProgress}
              label={`${d.completedTopics}/${d.totalTopics} topics completed`}
            />
          </div>
          {d.currentStage ? (
            <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary/45">
              Current stage · <span className="text-primary/75">{d.currentStage}</span>
            </p>
          ) : null}
        </Panel>

        <Panel title="Where you are" icon="compass" className="md:col-span-2">
          {d.currentChapter && d.currentTopic ? (
            <dl className="grid gap-4 sm:grid-cols-2">
              <KeyValue label="Current chapter" value={d.currentChapter} />
              <KeyValue label="Current topic" value={d.currentTopic.title} />
              <KeyValue
                label="Next lesson"
                value={d.nextLesson ? `${d.nextLesson.title}${d.nextLesson.chapter ? ` — ${d.nextLesson.chapter}` : ''}` : null}
              />
              <KeyValue
                label="Upcoming exam"
                value={
                  d.upcomingExam ? (
                    <Link to={ROUTES.learn} className="text-primary underline decoration-border hover:decoration-accent">
                      {d.upcomingExam.title}
                    </Link>
                  ) : (
                    'None pending'
                  )
                }
              />
            </dl>
          ) : (
            <p className="text-sm text-primary/70">
              {d.overallProgress >= 100
                ? 'Learning complete. Focus on assessments and the company simulation.'
                : 'Start learning to see your current position here.'}
            </p>
          )}
        </Panel>

        <Panel title="Assignments" icon="file-text">
          <p className="text-sm text-primary">
            <span className="text-xl font-semibold tabular-nums">{d.assignmentStatus.submitted}</span>
            <span className="text-primary/60"> / {d.assignmentStatus.total} submitted</span>
          </p>
          <Link to={ROUTES.assignments} className="mt-2 inline-block text-sm text-primary underline decoration-border transition-colors hover:decoration-accent">
            View assignments
          </Link>
        </Panel>

        <Panel title="Latest evaluation" icon="message-square">
          {d.latestEvaluation ? (
            <>
              <div className="flex items-baseline justify-between gap-2">
                <p className="truncate text-sm font-medium text-primary">{d.latestEvaluation.targetTitle}</p>
                <span className="shrink-0 text-lg font-semibold tabular-nums text-primary">
                  {d.latestEvaluation.overallScore}
                </span>
              </div>
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-primary/60">{d.latestEvaluation.verdict}</p>
            </>
          ) : (
            <p className="text-sm text-primary/60">Submit an assignment or exam to receive evaluations.</p>
          )}
        </Panel>

        <Panel title="Readiness & simulation" icon="shield-check">
          <dl className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <dt className="text-sm text-primary/70">Career readiness</dt>
              <dd>{d.careerReadiness ? `${d.careerReadiness.overallPercent}%` : 'Not computed'}</dd>
            </div>
            <div className="flex items-center justify-between gap-2">
              <dt className="text-sm text-primary/70">Company simulation</dt>
              <dd>{d.companySimulation.status === 'not_started' ? 'Not started' : 'Active'}</dd>
            </div>
          </dl>
          <Link to={ROUTES.readiness} className="mt-3 inline-block text-sm text-primary underline decoration-border transition-colors hover:decoration-accent">
            Readiness details
          </Link>
        </Panel>

        <Panel title="Skill progress summary" icon="bar-chart" className="md:col-span-2">
          {d.skillSummary.length > 0 ? (
            <ul className="space-y-3">
              {d.skillSummary.map((s) => (
                <li key={s.skill}>
                  <ProgressBar percent={s.percent} label={s.skill} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-primary/60">Skills appear as you complete topics.</p>
          )}
        </Panel>

        <Panel
          title="Recent notifications"
          icon="bell"
          footer={
            <Link to={ROUTES.notifications} className="text-sm text-primary underline decoration-border transition-colors hover:decoration-accent">
              All notifications
            </Link>
          }
        >
          {d.recentNotifications.length === 0 ? (
            <p className="text-sm text-primary/60">Nothing new right now.</p>
          ) : (
            <ul className="space-y-3">
              {d.recentNotifications.map((n) => (
                <li key={n.publicId}>
                  <p className="text-sm font-medium text-primary">{n.title}</p>
                  <p className="line-clamp-2 text-xs leading-relaxed text-primary/60">{n.body}</p>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
        <StatusText tone={d.overallProgress >= 100 ? 'completed' : d.overallProgress > 0 ? 'in_progress' : 'not_started'} />
        <Link to={ROUTES.learningPath} className="text-primary underline decoration-border transition-colors hover:decoration-accent">
          Open learning path
        </Link>
      </div>
    </div>
  )
}
