import { Link } from 'react-router-dom'
import { ROUTES } from '../constants/routes'

export function NotFoundPage(): React.JSX.Element {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-bg px-4 text-center">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="text-2xl font-semibold tracking-tight text-primary">Page not found</h1>
      <p className="max-w-md text-sm text-primary/60">
        The page you are looking for does not exist or was moved.
      </p>
      <Link to={ROUTES.landing} className="text-sm font-medium text-info hover:text-primary">
        Back to the start
      </Link>
    </div>
  )
}
