import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import { refreshSession } from '../services/api-client'
import { useSessionStore } from '../store/sessionStore'
import { Spinner } from '../components/ui/spinner/Spinner'

export function ProtectedRoute({ children }: { children: React.ReactNode }): React.JSX.Element {
  const status = useSessionStore((s) => s.status)
  const location = useLocation()

  useEffect(() => {
    if (status === 'initial') {
      void refreshSession()
    }
  }, [status])

  if (status === 'authenticated') {
    return <>{children}</>
  }

  if (status === 'anonymous') {
    return (
      <Navigate to={ROUTES.login} state={{ from: location.pathname }} replace />
    )
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-bg">
      <Spinner className="h-8 w-8" />
    </div>
  )
}
