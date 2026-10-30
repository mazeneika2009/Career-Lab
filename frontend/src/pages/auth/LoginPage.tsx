import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { ROUTES } from '../../constants/routes'
import { authApi } from '../../api'
import { ApiError } from '../../services/api-client'
import { useSessionStore } from '../../store/sessionStore'
import { toast } from '../../store/uiStore'
import { Button } from '../../components/ui/button/Button'
import { Callout } from '../../components/ui/callout/Callout'
import { FormField, Input } from '../../components/ui/form-field/FormField'
import { loginErrorMessage } from './loginErrorMessage'

const loginSchema = z.object({
  email: z.string().trim().min(1, 'Email is required.').email('Enter a valid email address.'),
  password: z.string().min(1, 'Password is required.')
})

type LoginForm = z.infer<typeof loginSchema>

export function LoginPage(): React.JSX.Element {
  const navigate = useNavigate()
  const setSession = useSessionStore((s) => s.setSession)
  const [notVerified, setNotVerified] = useState(false)
  const [lockedMessage, setLockedMessage] = useState<string | null>(null)
  const [resending, setResending] = useState(false)

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting }
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) })

  const onSubmit = async (values: LoginForm): Promise<void> => {
    setNotVerified(false)
    setLockedMessage(null)
    try {
      const data = await authApi.login(values)
      setSession(data.user, data.accessToken)
      toast('success', `Welcome back, ${data.user.displayName}.`)
      navigate(ROUTES.account, { replace: true })
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.code === 'EMAIL_NOT_VERIFIED') {
          setNotVerified(true)
          return
        }
        if (error.code === 'ACCOUNT_LOCKED') {
          setLockedMessage(error.message)
          return
        }
      }
      toast('danger', loginErrorMessage(error))
    }
  }

  const handleResend = async (): Promise<void> => {
    setResending(true)
    try {
      await authApi.sendVerification(getValues('email'))
      toast('success', 'Verification email sent. Check your inbox.')
    } catch {
      toast('info', 'If the address needs verification, a new email was sent.')
    } finally {
      setResending(false)
    }
  }

  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-primary">Sign in</h1>
        <p className="mt-1 text-sm text-primary/60">Continue your career path.</p>
      </div>

      {notVerified ? (
        <Callout tone="warning" title="Verify your email">
          <p className="mb-2">
            Your email address is not verified yet. Confirm it through the link we sent you.
          </p>
          <Button variant="link" size="sm" loading={resending} onClick={() => void handleResend()}>
            Resend verification email
          </Button>
        </Callout>
      ) : null}

      {lockedMessage ? <Callout tone="danger" title="Account locked">{lockedMessage}</Callout> : null}

      <form onSubmit={(e) => void handleSubmit(onSubmit)(e)} className="flex flex-col gap-4" noValidate>
        <FormField label="Email" error={errors.email?.message} required>
          {(ids) => (
            <Input
              id={ids.id}
              type="email"
              autoComplete="email"
              aria-describedby={ids.describedBy}
              aria-invalid={ids.invalid}
              invalid={ids.invalid}
              {...register('email')}
            />
          )}
        </FormField>

        <FormField label="Password" error={errors.password?.message} required>
          {(ids) => (
            <Input
              id={ids.id}
              type="password"
              autoComplete="current-password"
              aria-describedby={ids.describedBy}
              aria-invalid={ids.invalid}
              invalid={ids.invalid}
              {...register('password')}
            />
          )}
        </FormField>

        <Button type="submit" size="lg" loading={isSubmitting}>
          Sign in
        </Button>
      </form>

      <div className="flex items-center justify-between text-sm">
        <Link to={ROUTES.forgotPassword} className="text-info hover:text-primary">
          Forgot password?
        </Link>
        <Link to={ROUTES.register} className="text-primary/70 hover:text-primary">
          Create account
        </Link>
      </div>
    </>
  )
}
