import type { ReactNode } from 'react'
import { Icon, type IconName } from '../ui/icon/Icon'

export function PageHeader({
  eyebrow,
  title,
  description,
  actions
}: {
  eyebrow?: string
  title: string
  description?: string
  actions?: ReactNode
}): React.JSX.Element {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-10">
      <div className="min-w-0 max-w-3xl">
        {eyebrow ? (
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/45">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-balance font-display text-2xl font-bold leading-tight tracking-[-0.03em] text-primary sm:text-[1.75rem] lg:text-3xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 max-w-2xl text-pretty text-sm leading-relaxed text-primary/65">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  )
}

export function Panel({
  title,
  children,
  footer,
  className = ''
}: {
  title?: string
  children: ReactNode
  footer?: ReactNode
  className?: string
  /** Kept for API compatibility; section headers no longer render decorative icons. */
  icon?: IconName
}): React.JSX.Element {
  return (
    <section className={`rounded-lg border border-border bg-surface ${className}`}>
      {title ? (
        <header className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-3">
          <div className="flex min-w-0 items-center gap-2">
            <h2 className="font-display text-sm font-semibold tracking-tight text-primary">{title}</h2>
          </div>
        </header>
      ) : null}
      <div className="px-5 py-4">{children}</div>
      {footer ? <footer className="border-t border-border px-5 py-3">{footer}</footer> : null}
    </section>
  )
}

export function ProgressBar({ percent, label }: { percent: number; label?: string }): React.JSX.Element {
  const clamped = Math.max(0, Math.min(100, Math.round(percent)))
  return (
    <div>
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-border/60"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clamped}
        aria-label={label ? `${label} progress` : 'Progress'}
      >
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-500 ease-out"
          style={{ width: `${clamped}%` }}
        />
      </div>
      {label ? (
        <p className="mt-1.5 text-xs tabular-nums text-primary/55">
          {label} · {clamped}%
        </p>
      ) : null}
    </div>
  )
}

const STATUS_LABELS: Record<string, string> = {
  completed: 'Completed',
  in_progress: 'In progress',
  not_started: 'Not started',
  passed: 'Passed',
  failed: 'Not passed',
  open: 'Open',
  submitted: 'Submitted',
  evaluated: 'Evaluated',
  locked: 'Locked',
  responded: 'Responded'
}

const STATUS_TEXT_TONES: Record<string, string> = {
  completed: 'text-info',
  passed: 'text-info',
  evaluated: 'text-info',
  in_progress: 'text-primary/70',
  submitted: 'text-primary/70',
  open: 'text-primary/60',
  responded: 'text-primary/60',
  normal: 'text-primary/55',
  low: 'text-primary/40',
  not_started: 'text-primary/45',
  locked: 'text-primary/35',
  failed: 'text-attention'
}

/** Plain-text status label — deliberately not a pill, tag or indicator dot. */
export function StatusText({ tone }: { tone: string }): React.JSX.Element {
  const label = STATUS_LABELS[tone] ?? tone.replace(/_/g, ' ')
  const cls = STATUS_TEXT_TONES[tone] ?? 'text-primary/55'
  return <span className={`text-xs font-medium ${cls}`}>{label}</span>
}

export function EmptyState({
  title,
  description,
  action,
  icon
}: {
  title: string
  description: string
  action?: ReactNode
  icon?: IconName
}): React.JSX.Element {
  return (
    <div className="rounded-lg border border-dashed border-border bg-surface px-6 py-10 text-center">
      {icon ? <Icon name={icon} className="mx-auto mb-2 h-5 w-5 text-accent/70" /> : null}
      <p className="font-display text-sm font-semibold text-primary">{title}</p>
      <p className="mx-auto mt-1 max-w-md text-sm leading-relaxed text-primary/60">{description}</p>
      {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
    </div>
  )
}

export function LoadingState(): React.JSX.Element {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center gap-3" role="status" aria-label="Loading">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/15 border-t-accent" />
      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/35">Loading</span>
    </div>
  )
}

export function ErrorState({ error }: { error: unknown }): React.JSX.Element {
  const message =
    typeof error === 'object' && error !== null && 'message' in error
      ? String((error as { message: unknown }).message)
      : 'Something went wrong.'
  return (
    <div role="alert" className="flex items-start gap-3 rounded-lg border border-attention/40 bg-surface px-5 py-4">
      <Icon name="alert-triangle" className="mt-0.5 h-4 w-4 shrink-0 text-attention" />
      <div>
        <p className="font-display text-sm font-semibold text-attention">Unable to load</p>
        <p className="mt-1 text-sm leading-relaxed text-primary/65">{message}</p>
      </div>
    </div>
  )
}

export function KeyValue({ label, value }: { label: string; value: ReactNode }): React.JSX.Element {
  return (
    <div>
      <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-primary/45">{label}</dt>
      <dd className="mt-0.5 text-sm text-primary">{value ?? '—'}</dd>
    </div>
  )
}
