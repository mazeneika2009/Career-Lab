import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { usersApi } from '../../api'
import { learningApi, achievementsApi, jobHubApi } from '../../api/learning'
import { useAsync } from '../../hooks/useAsync'
import { ROUTES } from '../../constants/routes'
import { toast } from '../../store/uiStore'
import { Button } from '../../components/ui/button/Button'
import { Icon } from '../../components/ui/icon/Icon'
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
  const navigate = useNavigate()
  const me = useAsync(() => usersApi.me(), [])
  const dash = useAsync(() => learningApi.dashboard(), [])
  const skills = useAsync(() => learningApi.skills(), [])
  const portfolio = useAsync(() => achievementsApi.portfolio(), [])
  const jobHub = useAsync(() => jobHubApi.list(), [])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [confirmationName, setConfirmationName] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  useEffect(() => {
    if (!deleteDialogOpen) return
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && !deleting) setDeleteDialogOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [deleteDialogOpen, deleting])

  if (me.loading) return <LoadingState />
  if (me.error) return <ErrorState error={me.error} />

  const user = me.data!

  const deleteAccount = async (): Promise<void> => {
    if (confirmationName !== user.displayName || deleting) return
    setDeleting(true)
    setDeleteError(null)
    try {
      await usersApi.deleteMe(confirmationName)
      toast('success', 'Your account has been permanently deleted.')
      navigate(ROUTES.login, { replace: true })
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : 'Account deletion failed. Please try again.')
      setDeleting(false)
    }
  }

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

        {jobHub.data && !jobHub.data.locked ? (
          <Panel
            title="Saved jobs"
            footer={
              <Link to={ROUTES.jobHub} className="text-sm text-primary underline decoration-border hover:decoration-accent">
                Open Job Opportunities
              </Link>
            }
          >
            {jobHub.data.jobs.some((job) => job.saved) ? (
              <ul className="space-y-2">
                {jobHub.data.jobs
                  .filter((job) => job.saved)
                  .slice(0, 4)
                  .map((job) => (
                    <li key={job.publicId} className="text-sm text-primary">
                      <span className="font-medium">{job.title}</span>
                      <span className="text-primary/50"> · {job.companyName}</span>
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="text-sm text-primary/60">
                Bookmark roles in the Career Bridge to build a shortlist here.
              </p>
            )}
          </Panel>
        ) : null}

        <Panel title="Delete account" className="md:col-span-2 !border-attention/30">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-primary">Permanently remove your account</p>
              <p className="mt-1 text-sm leading-relaxed text-primary/60">
                This permanently deletes your profile, learning progress, exam results, certificates,
                saved jobs and other account data. This action cannot be undone.
              </p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                setConfirmationName('')
                setDeleteError(null)
                setDeleteDialogOpen(true)
              }}
              className="shrink-0"
            >
              <Icon name="trash" className="h-4 w-4" />
              Delete account
            </Button>
          </div>
        </Panel>
      </div>

      {deleteDialogOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-primary/55 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !deleting) setDeleteDialogOpen(false)
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-account-title"
            aria-describedby="delete-account-description"
            className="w-full max-w-lg rounded-2xl border border-attention/25 bg-surface p-5 shadow-2xl sm:p-6"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-attention/10 text-attention">
                <Icon name="alert-triangle" className="h-5 w-5" />
              </span>
              <div>
                <h2 id="delete-account-title" className="font-display text-lg font-semibold text-primary">
                  Permanently delete your account?
                </h2>
                <p id="delete-account-description" className="mt-1 text-sm leading-relaxed text-primary/65">
                  Your account and associated learning records will be permanently deleted. You will be
                  signed out immediately, and this action cannot be reversed.
                </p>
              </div>
            </div>

            <form
              className="mt-5"
              onSubmit={(event) => {
                event.preventDefault()
                void deleteAccount()
              }}
            >
              <label htmlFor="delete-account-confirmation" className="text-sm font-medium text-primary">
                Type <span className="font-semibold">{user.displayName}</span> to confirm
              </label>
              <input
                id="delete-account-confirmation"
                autoFocus
                autoComplete="off"
                spellCheck={false}
                value={confirmationName}
                onChange={(event) => {
                  setConfirmationName(event.target.value)
                  setDeleteError(null)
                }}
                className="mt-2 h-10 w-full rounded-lg border border-border bg-bg px-3 text-sm text-primary outline-none transition-colors placeholder:text-primary/35 focus:border-attention/60 focus:ring-2 focus:ring-attention/15"
                aria-invalid={Boolean(deleteError)}
                aria-describedby={deleteError ? 'delete-account-error' : undefined}
              />
              {deleteError ? (
                <p id="delete-account-error" role="alert" className="mt-2 text-sm text-attention">
                  {deleteError}
                </p>
              ) : null}
              <div className="mt-5 flex flex-wrap justify-end gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={deleting}
                  onClick={() => setDeleteDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  type="submit"
                  loading={deleting}
                  disabled={confirmationName !== user.displayName}
                >
                  Confirm delete
                </Button>
              </div>
            </form>
          </section>
        </div>
      ) : null}
    </div>
  )
}

function isNoCareer(state: { data: unknown; loading: boolean; error: unknown }): boolean {
  if (!state.loading && !state.data) return true
  return false
}
