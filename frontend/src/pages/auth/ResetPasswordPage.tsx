import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import { ROUTES } from '../../constants/routes'
import { authApi } from '../../api'
import { ApiError } from '../../services/api-client'
import { toast } from '../../store/uiStore'
import { Button } from '../../components/ui/button/Button'
import { Callout } from '../../components/ui/callout/Callout'
import { FormField, Input } from '../../components/ui/form-field/FormField'

const resetSchema = z
  .object({
    password: z.string().min(12, 'Password must be at least 12 characters.').max(128),
    confirm: z.string().min(1, 'Please confirm the password.')
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Passwords do not match.',
    path: ['confirm']
  })

type ResetForm = z.infer<typeof resetSchema>

export function ResetPasswordPage(): React.JSX.Element {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') ?? ''
  const [done, setDone] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ResetForm>({ resolver: zodResolver(resetSchema) })

  const onSubmit = async (values: ResetForm): Promise<void> => {
    try {
      await authApi.resetPassword(token, values.password)
      setDone(true)
    } catch (error) {
      if (error instanceof ApiError) {
        toast('danger', error.message)
        return
      }
      toast('danger', 'Password reset failed. Please try again.')
    }
  }

  if (!token) {
    return (
      <Callout tone="danger" title="Invalid link">
        This page requires a valid reset token. Request a new reset email from the{' '}
        <Link to={ROUTES.forgotPassword} className="underline">
          forgot password
        </Link>{' '}
        page.
      </Callout>
    )
  }

  if (done) {
    return (
      <div className="rounded-[10px] border border-border bg-surface px-6 py-10 text-center">
        <h1 className="text-xl font-semibold text-primary">Password updated</h1>
        <p className="mt-2 text-sm leading-relaxed text-primary/60">
          All previous sessions were signed out. You can now sign in with your new password.
        </p>
        <Link to={ROUTES.login} className="mt-6 inline-block text-sm font-medium text-info hover:text-primary">
          Sign in
        </Link>
      </div>
    )
  }

  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-primary">Choose a new password</h1>
        <p className="mt-1 text-sm text-primary/60">
          Signing out all other devices once the new password is saved.
        </p>
      </div>

      <form onSubmit={(e) => void handleSubmit(onSubmit)(e)} className="flex flex-col gap-4" noValidate>
        <FormField label="New password" hint="At least 12 characters." error={errors.password?.message} required>
          {(ids) => (
            <Input
              id={ids.id}
              type="password"
              autoComplete="new-password"
              aria-invalid={ids.invalid}
              {...register('password')}
            />
          )}
        </FormField>

        <FormField label="Confirm new password" error={errors.confirm?.message} required>
          {(ids) => (
            <Input
              id={ids.id}
              type="password"
              autoComplete="new-password"
              aria-invalid={ids.invalid}
              {...register('confirm')}
            />
          )}
        </FormField>

        <Button type="submit" size="lg" loading={isSubmitting}>
          Update password
        </Button>
      </form>
    </>
  )
}
