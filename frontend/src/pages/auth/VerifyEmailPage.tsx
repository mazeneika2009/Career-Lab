import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import { authApi } from '../../api'
import { ApiError } from '../../services/api-client'
import { Spinner } from '../../components/ui/spinner/Spinner'
import { Callout } from '../../components/ui/callout/Callout'

type VerifyState =
  | { kind: 'loading' }
  | { kind: 'success' }
  | { kind: 'error'; message: string; expired: boolean }

export function VerifyEmailPage(): React.JSX.Element {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') ?? ''
  const [state, setState] = useState<VerifyState>({ kind: 'loading' })
  const attempted = useRef(false)

  useEffect(() => {
    if (attempted.current) return
    attempted.current = true

    if (!token) {
      setState({
        kind: 'error',
        message: 'This page requires a verification token.',
        expired: false
      })
      return
    }

    authApi
      .verifyEmail(token)
      .then(() => setState({ kind: 'success' }))
      .catch((error: unknown) => {
        const message =
          error instanceof ApiError ? error.message : 'Verification failed. Please try again.'
        const expired = error instanceof ApiError && error.status === 410
        setState({ kind: 'error', message, expired })
      })
  }, [token])

  if (state.kind === 'loading') {
    return (
      <div className="flex flex-col items-center gap-3 py-12">
        <Spinner className="h-8 w-8" />
        <p className="text-sm text-primary/60">Verifying your email…</p>
      </div>
    )
  }

  if (state.kind === 'success') {
    return (
      <div className="rounded-[10px] border border-border bg-surface px-6 py-10 text-center">
        <h1 className="text-xl font-semibold text-primary">Email verified</h1>
        <p className="mt-2 text-sm leading-relaxed text-primary/60">
          Your account is active. Sign in to choose your career path.
        </p>
        <Link to={ROUTES.login} className="mt-6 inline-block text-sm font-medium text-info hover:text-primary">
          Sign in
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <Callout tone={state.expired ? 'warning' : 'danger'} title="Verification failed">
        {state.message}
        {state.expired ? ' Request a new verification email after signing in.' : ''}
      </Callout>
      <Link to={ROUTES.login} className="self-center text-sm font-medium text-info hover:text-primary">
        Back to sign in
      </Link>
    </div>
  )
}
