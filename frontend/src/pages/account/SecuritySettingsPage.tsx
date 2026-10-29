import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { ROUTES } from '../../constants/routes'
import { authApi } from '../../api'
import type { SessionView } from '../../types/api'
import { ApiError } from '../../services/api-client'
import { toast } from '../../store/uiStore'
import { formatDate } from '../../utils/format'
import { Card, CardHeader } from '../../components/ui/card/Card'
import { Button } from '../../components/ui/button/Button'
import { Callout } from '../../components/ui/callout/Callout'
import { FormField, Input } from '../../components/ui/form-field/FormField'

const changeSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required.'),
    newPassword: z.string().min(12, 'Password must be at least 12 characters.').max(128)
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: 'New password must differ from the current password.',
    path: ['newPassword']
  })

type ChangeForm = z.infer<typeof changeSchema>

export function SecuritySettingsPage(): React.JSX.Element {
  const [sessions, setSessions] = useState<SessionView[] | null>(null)
  const [revokingAll, setRevokingAll] = useState(false)
  const navigate = useNavigate()

  const loadSessions = useCallback(async (): Promise<void> => {
    try {
      setSessions(await authApi.sessions())
    } catch {
      toast('danger', 'Could not load your sessions.')
    }
  }, [])

  useEffect(() => {
    void loadSessions()
  }, [loadSessions])

  const revoke = async (sessionId: string): Promise<void> => {
    try {
      await authApi.revokeSession(sessionId)
      await loadSessions()
      toast('success', 'Session signed out.')
    } catch {
      toast('danger', 'Could not sign out that session.')
    }
  }

  const signOutAllDevices = async (): Promise<void> => {
    setRevokingAll(true)
    try {
      await authApi.logoutAll()
      toast('success', 'Signed out on all devices.')
      navigate(ROUTES.login, { replace: true })
    } catch {
      toast('danger', 'Could not sign out all devices. Please try again.')
    } finally {
      setRevokingAll(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-primary">Security</h1>
        <p className="mt-1 text-sm text-primary/60">Password and device management.</p>
      </div>

      <Card>
        <CardHeader title="Change password" description="Other devices will be signed out." />
        <PasswordChangeForm onDone={() => void loadSessions()} />
      </Card>

      <Card>
        <CardHeader title="Active sessions" description="Devices currently signed in to your account." />
        {sessions === null ? (
          <p className="text-sm text-primary/50">Loading…</p>
        ) : sessions.length === 0 ? (
          <Callout tone="info">No active sessions found.</Callout>
        ) : (
          <ul className="divide-y divide-border">
            {sessions.map((session) => (
              <li key={session.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div>
                  <p className="text-sm font-medium text-primary">
                    {session.device}
                    {session.isCurrent ? (
                      <span className="ml-2 text-xs font-normal text-primary/50">· This device</span>
                    ) : null}
                  </p>
                  <p className="mt-0.5 font-mono text-xs text-primary/50">
                    IP {session.ip ?? 'unknown'} · last active {formatDate(session.lastUsedAt)}
                  </p>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={session.isCurrent}
                  onClick={() => void revoke(session.id)}
                >
                  Sign out
                </Button>
              </li>
            ))}
          </ul>
        )}
        {sessions !== null && sessions.length > 1 ? (
          <div className="mt-4">
            <Button variant="destructive" size="sm" loading={revokingAll} onClick={() => void signOutAllDevices()}>
              Sign out all other devices
            </Button>
          </div>
        ) : null}
      </Card>
    </div>
  )
}

function PasswordChangeForm({ onDone }: { onDone: () => void }): React.JSX.Element {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ChangeForm>({ resolver: zodResolver(changeSchema) })

  const onSubmit = async (values: ChangeForm): Promise<void> => {
    try {
      await authApi.changePassword(values.currentPassword, values.newPassword)
      reset()
      toast('success', 'Password changed. Other devices were signed out.')
      onDone()
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.code === 'INVALID_CREDENTIALS') {
          toast('danger', 'Current password is incorrect.')
        } else {
          toast('danger', error.message)
        }
        return
      }
      toast('danger', 'Password change failed. Please try again.')
    }
  }

  return (
    <form
      onSubmit={(e) => void handleSubmit(onSubmit)(e)}
      className="flex max-w-md flex-col gap-4"
      noValidate
    >
      <FormField label="Current password" error={errors.currentPassword?.message} required>
        {(ids) => (
          <Input
            id={ids.id}
            type="password"
            autoComplete="current-password"
            aria-invalid={ids.invalid}
            {...register('currentPassword')}
          />
        )}
      </FormField>

      <FormField
        label="New password"
        hint="At least 12 characters."
        error={errors.newPassword?.message}
        required
      >
        {(ids) => (
          <Input
            id={ids.id}
            type="password"
            autoComplete="new-password"
            aria-invalid={ids.invalid}
            {...register('newPassword')}
          />
        )}
      </FormField>

      <Button type="submit" loading={isSubmitting}>
        Update password
      </Button>
    </form>
  )
}
