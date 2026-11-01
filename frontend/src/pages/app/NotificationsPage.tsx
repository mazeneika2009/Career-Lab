import { Link } from 'react-router-dom'
import { notificationsApi } from '../../api/learning'
import { useAsync } from '../../hooks/useAsync'
import { ROUTES } from '../../constants/routes'
import { Button } from '../../components/ui/button/Button'
import { EmptyState, LoadingState, PageHeader } from '../../components/app/primitives'

export default function NotificationsPage(): React.JSX.Element {
  const state = useAsync(() => notificationsApi.list(), [])

  const markAll = async (): Promise<void> => {
    await notificationsApi.markAllRead()
    state.reload()
  }

  const markOne = async (publicId: string): Promise<void> => {
    await notificationsApi.markRead(publicId)
    state.reload()
  }

  return (
    <div>
      <PageHeader
        eyebrow="System events"
        title="Notifications"
        description="Assignments, exams, results, evaluations, simulation events and readiness updates tied to your actual activity."
        actions={
          state.data && state.data.unreadCount > 0 ? (
            <Button variant="secondary" size="sm" onClick={() => void markAll()}>
              Mark all read ({state.data.unreadCount})
            </Button>
          ) : null
        }
      />

      {state.loading ? (
        <LoadingState />
      ) : state.error ? (
        <p className="text-sm text-attention">Notifications failed to load.</p>
      ) : state.data && state.data.notifications.length === 0 ? (
        <EmptyState title="No notifications" description="Events appear here as you progress through your career." />
      ) : (
        <ul className="divide-y divide-border rounded-lg border border-border bg-surface">
          {(state.data?.notifications ?? []).map((n) => (
            <li key={n.publicId} className={`px-5 py-4 ${n.readAt ? '' : 'bg-accent/[0.04]'}`}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className={`text-sm ${n.readAt ? 'font-normal text-primary/80' : 'font-semibold text-primary'}`}>
                    {n.title}
                  </p>
                  <p className="mt-0.5 text-sm leading-relaxed text-primary/65">{n.body}</p>
                  <p className="mt-1 text-xs tabular-nums text-primary/45">{new Date(n.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  {n.linkPath ? (
                    <Link to={n.linkPath} className="text-sm font-medium text-accent hover:underline">
                      Open
                    </Link>
                  ) : null}
                  {!n.readAt ? (
                    <button
                      type="button"
                      onClick={() => void markOne(n.publicId)}
                      className="text-xs font-medium text-primary/55 hover:text-primary"
                    >
                      Mark read
                    </button>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
