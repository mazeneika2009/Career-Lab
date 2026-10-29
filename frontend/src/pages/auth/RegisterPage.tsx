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

const registerSchema = z.object({
  fullName: z.string().trim().min(2, 'Full name is required.').max(120),
  email: z.string().trim().min(1, 'Email is required.').email('Enter a valid email address.'),
  password: z.string().min(12, 'Password must be at least 12 characters.').max(128),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms to continue.' })
  })
})

type RegisterForm = z.infer<typeof registerSchema>

export function RegisterPage(): React.JSX.Element {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) })

  const onSubmit = async (values: RegisterForm): Promise<void> => {
    try {
      await authApi.register(values)
    } catch (error) {
      if (!(error instanceof ApiError) || error.code !== 'VALIDATION_ERROR') {
        toast('danger', 'Registration failed. Please try again.')
        return
      }
    }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="rounded-[10px] border border-border bg-surface px-6 py-10 text-center">
        <h1 className="text-xl font-semibold text-primary">Check your inbox</h1>
        <p className="mt-2 text-sm leading-relaxed text-primary/60">
          If this email address was not already registered, a verification link is on its way.
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
        <h1 className="text-2xl font-semibold tracking-tight text-primary">Create your account</h1>
        <p className="mt-1 text-sm text-primary/60">
          We will send a verification link to your inbox.
        </p>
      </div>

      <form onSubmit={(e) => void handleSubmit(onSubmit)(e)} className="flex flex-col gap-4" noValidate>
        <FormField label="Full name" error={errors.fullName?.message} required>
          {(ids) => (
            <Input id={ids.id} autoComplete="name" aria-invalid={ids.invalid} {...register('fullName')} />
          )}
        </FormField>

        <FormField label="Email" error={errors.email?.message} required>
          {(ids) => (
            <Input id={ids.id} type="email" autoComplete="email" aria-invalid={ids.invalid} {...register('email')} />
          )}
        </FormField>

        <FormField
          label="Password"
          hint="At least 12 characters."
          error={errors.password?.message}
          required
        >
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

        <label className="flex items-start gap-2 text-sm text-primary/80">
          <input type="checkbox" className="mt-0.5 h-4 w-4 accent-[#173F35]" {...register('acceptTerms')} />
          I accept the terms of use and privacy policy.
        </label>
        {errors.acceptTerms ? (
          <p role="alert" className="text-xs text-error">
            {errors.acceptTerms.message}
          </p>
        ) : null}

        <Button type="submit" size="lg" loading={isSubmitting}>
          Create account
        </Button>

        <p className="text-center text-sm text-primary/70">
          Already have an account?{' '}
          <Link to={ROUTES.login} className="text-info hover:text-primary">
            Sign in
          </Link>
        </p>
      </form>
    </>
  )
}
