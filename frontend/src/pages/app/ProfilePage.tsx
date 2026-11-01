import { Link } from 'react-router-dom'
import { usersApi } from '../../api'
import { learningApi, achievementsApi } from '../../api/learning'
import { useAsync } from '../../hooks/useAsync'
import { ROUTES } from '../../constants/routes'
import {
  EmptyState,
  ErrorState,
  KeyValue,
  LoadingState,
  PageHeader,
  Panel,
  ProgressBar
} from '../../components/app/primitives'

export default function ProfilePage(): React.JSX.Element {
  const me = useAsync(() => usersApi.me(), [])
  const dash = useAsync(() => learningApi.dashboard(), [])
  const skills = useAsync(() => learningApi.skills(), [])
  const portfolio = useAsync(() => achievementsApi.portfolio(), [])

  if (me.loading) return <LoadingState />
  if (me.error) return <ErrorState error={me.error} />

  const user = me.data!

  return (
    <div>
      <PageHeader
        eyebrow="Profile"
        title={user.displayName}
        description={user.email}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Panel title="Student information">
          <dl className="grid gap-4 sm:grid-cols-2">
            <KeyValue label="Display name" value={user.displayName} />
            <KeyValue label="Timezone" value={user.timezone} />
            <KeyValue label="Account status" value={user.status.replace(/_/g, ' ')} />
            <KeyValue label="Member since" value={new Date(user.createdAt).toLocaleDateString()} />
            <div className="sm:col-span-2">
              <KeyValue label="Bio" value={user.bio ?? null} />
            </div>
          </dl>
          <p className="mt-4 text-xs leading-relaxed text-primary/50">
            Evaluation results, exam scores, certificates and progress records are protected — they are managed by the
            platform and cannot be edited from your profile.
          </p>
        </Panel>

        <Panel
          title="Selected career"
          footer={
            <Link to={ROUTES.careers} className="text-sm text-primary underline decoration-border hover:decoration-accent">
              Change career
            </Link>
          }
        >
          {isNoCareer(dash) ? (
            <p className="text-sm text-primary/60">No career selected yet.</p>
          ) : (
            <>
              <p className="text-lg font-semibold text-primary">{dash.data?.career.name}</p>
              <div className="mt-3 max-w-xs">
                <ProgressBar percent={dash.data?.overallProgress ?? 0} label="Career progress" />
              </div>
              {dash.data?.careerReadiness ? (
                <p className="mt-3 text-sm text-primary/70">
                  Career readiness: <span className="font-medium text-primary">{dash.data.careerReadiness.overallPercent}%</span>
                  {!dash.data.careerReadiness.ready ? ' (requirements outstanding)' : ''}
                </p>
              ) : null}
            </>
          )}
        </Panel>

        <Panel title="Skills">
          {skills.data && skills.data.skills.length > 0 ? (
            <ul className="space-y-3">
              {skills.data.skills.slice(0, 6).map((s) => (
                <li key={s.skill}>
                  <ProgressBar percent={s.percent} label={`${s.skill} · ${s.currentLevel}`} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-primary/60">Skills appear as you progress through your career.</p>
          )}
        </Panel>

        <Panel
          title="Achievements & certificates"
          footer={
            <Link to={ROUTES.portfolio} className="text-sm text-primary underline decoration-border hover:decoration-accent">
              Open portfolio
            </Link>
          }
        >
          {portfolio.data && portfolio.data.items.length > 0 ? (
            <ul className="space-y-2">
              {portfolio.data.items.slice(0, 5).map((i) => (
                <li key={i.publicId} className="text-sm text-primary">
                  {i.title}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-primary/60">Complete assignments, exams and simulation work to build achievements.</p>
          )}
        </Panel>
      </div>
    </div>
  )
}

function isNoCareer(state: { data: unknown; loading: boolean; error: unknown }): boolean {
  if (!state.loading && !state.data) return true
  return false
}
