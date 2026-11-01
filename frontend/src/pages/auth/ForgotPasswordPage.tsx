import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { ROUTES } from '../../constants/routes'
import { authApi } from '../../api'
import { ApiError } from '../../services/api-client'
import { toast } from '../../store/uiStore'
import { Button } from '../../components/ui/button/Button'
import { FormField, Input } from '../../components/ui/form-field/FormField'

const forgotSchema = z.object({
  email: z.string().trim().min(1, 'Email is required.').email('Enter a valid email address.')
})

type ForgotForm = z.infer<typeof forgotSchema>

export function ForgotPasswordPage(): React.JSX.Element {
  const [sent, setSent] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ForgotForm>({ resolver: zodResolver(forgotSchema) })

  const onSubmit = async (values: ForgotForm): Promise<void> => {
    try {
      await authApi.forgotPassword(values.email)
    } catch (error) {
      if (!(error instanceof ApiError)) {
        toast('danger', 'Request failed. Please try again.')
        return
      }
    }
    setSent(true)
  }

  if (sent) {
    return (
      <div className="rounded-[10px] border border-border bg-surface px-6 py-10 text-center">
        <h1 className="text-xl font-semibold text-primary">Check your inbox</h1>
        <p className="mt-2 text-sm leading-relaxed text-primary/60">
          If an account exists for this address, a password reset link is on its way.
          The link expires in 24 hours.
        </p>
        <Link
          to={ROUTES.login}
          className="mt-6 inline-block text-sm font-medium text-info hover:text-primary"
        >
          Back to sign in
        </Link>
      </div>
    )
  }

  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-primary">Reset your password</h1>
        <p className="mt-1 text-sm text-primary/60">
          Enter your email address and we will send you a reset link.
        </p>
      </div>

      <form onSubmit={(e) => void handleSubmit(onSubmit)(e)} className="flex flex-col gap-4" noValidate>
        <FormField label="Email" error={errors.email?.message} required>
          {(ids) => (
            <Input
              id={ids.id}
              type="email"
              autoComplete="email"
              aria-invalid={ids.invalid}
              {...register('email')}
            />
          )}
        </FormField>

        <Button type="submit" size="lg" loading={isSubmitting}>
          Send reset link
        </Button>

        <p className="text-center text-sm text-primary/70">
          <Link to={ROUTES.login} className="text-info hover:text-primary">
            Back to sign in
          </Link>
        </p>
      </form>
    </>
  )
}
