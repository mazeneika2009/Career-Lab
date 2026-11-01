import { useEffect, useState } from 'react'
import { usersApi } from '../../api'
import type { MeView } from '../../types/api'
import { ApiError } from '../../services/api-client'
import { toast } from '../../store/uiStore'
import { Card, CardHeader } from '../../components/ui/card/Card'
import { Button } from '../../components/ui/button/Button'
import { FormField, Input } from '../../components/ui/form-field/FormField'

const TIMEZONES = (() => {
  try {
    return Array.from(Intl.supportedValuesOf('timeZone'))
  } catch {
    return ['UTC']
  }
})()

export function AccountOverviewPage(): React.JSX.Element {
  const [me, setMe] = useState<MeView | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [editing, setEditing] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const [timezone, setTimezone] = useState('UTC')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    let cancelled = false
    usersApi
      .me()
      .then((data) => {
        if (cancelled) return
        setMe(data)
        setDisplayName(data.displayName)
        setTimezone(data.timezone)
      })
      .catch(() => setError('Could not load your profile.'))
    return () => {
      cancelled = true
    }
  }, [])

  const save = async (): Promise<void> => {
    setSaving(true)
    try {
      const updated = await usersApi.updateMe({ displayName, timezone })
      setMe(updated)
      setEditing(false)
      toast('success', 'Profile updated.')
    } catch (err) {
      if (err instanceof ApiError && err.code === 'VALIDATION_ERROR') {
        toast('danger', 'Please check the submitted values.')
      } else {
        toast('danger', 'Update failed. Please try again.')
      }
    } finally {
      setSaving(false)
    }
  }

  if (error) return <p className="text-sm text-error">{error}</p>
  if (!me) return <div className="py-12 text-center text-sm text-primary/50">Loading…</div>

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-primary">Account</h1>
        <p className="mt-1 text-sm text-primary/60">Your profile and account status.</p>
      </div>

      <Card>
        <CardHeader title="Profile" />
        {!editing ? (
          <dl className="grid gap-4 sm:grid-cols-2">
            <ProfileItem label="Name" value={me.displayName} />
            <ProfileItem label="Email" value={me.email} />
            <ProfileItem label="Timezone" value={me.timezone} />
            <div>
              <dt className="text-xs uppercase tracking-wide text-primary/50">Status</dt>
              <dd className="mt-1 text-sm text-primary/70">
                {me.status === 'active'
                  ? 'Active'
                  : me.status === 'pending_verification'
                    ? 'Pending verification'
                    : me.status === 'suspended'
                      ? 'Suspended'
                      : 'Deleted'}
              </dd>
            </div>
            <ProfileItem label="Member since" value={formatDate(me.createdAt)} />
            <ProfileItem label="Roles" value={me.roles.join(', ')} />
          </dl>
        ) : (
          <form
            className="flex max-w-md flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault()
              void save()
            }}
          >
            <FormField label="Display name" required>
              {(ids) => (
                <Input id={ids.id} value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
              )}
            </FormField>
            <FormField label="Timezone">
              {(ids) => (
                <select
                  id={ids.id}
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="h-10 w-full rounded-md border border-border bg-surface px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                >
                  {TIMEZONES.map((tz) => (
                    <option key={tz} value={tz}>
                      {tz}
                    </option>
                  ))}
                </select>
              )}
            </FormField>
            <div className="flex gap-2">
              <Button type="submit" loading={saving}>
                Save changes
              </Button>
              <Button variant="secondary" onClick={() => setEditing(false)}>
                Cancel
              </Button>
            </div>
          </form>
        )}
        {!editing ? (
          <div className="mt-6">
            <Button variant="secondary" size="sm" onClick={() => setEditing(true)}>
              Edit profile
            </Button>
          </div>
        ) : null}
      </Card>
    </div>
  )
}

function ProfileItem({ label, value }: { label: string; value: string }): React.JSX.Element {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-primary/50">{label}</dt>
      <dd className="mt-1 text-sm font-medium text-primary">{value}</dd>
    </div>
  )
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(iso))
}
