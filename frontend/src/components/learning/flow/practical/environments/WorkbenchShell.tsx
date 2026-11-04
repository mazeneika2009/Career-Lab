import type { ReactNode } from 'react'
import { cn } from '../../../../../utils/cn'
import { Button } from '../../../../ui/button/Button'
import { Icon, type IconName } from '../../../../ui/icon/Icon'
import type { PracticalWorkbenchProps } from './types'

export function WorkbenchShell({
  title,
  icon,
  badge,
  meta,
  error,
  submitting,
  submitLabel,
  disabled = false,
  canReset = true,
  onSubmit,
  onReset,
  toolbar,
  footerNote,
  className,
  children
}: {
  title: string
  icon: IconName
  badge: string
  meta?: string
  error: string | null
  submitting: boolean
  submitLabel: string
  disabled?: boolean
  canReset?: boolean
  onSubmit: () => void
  onReset: () => void
  toolbar?: ReactNode
  footerNote?: string
  className?: string
  children: ReactNode
}): React.JSX.Element {
  return (
    <section
      className={cn(
        'flex min-h-[520px] flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm',
        className
      )}
    >
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/[0.055] text-primary/70">
            <Icon name={icon} className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-primary">{title}</p>
            <p className="truncate text-[11px] text-primary/45">
              {badge}
              {meta ? ` / ${meta}` : ''}
            </p>
          </div>
        </div>
        {toolbar ? <div className="flex flex-wrap items-center gap-2">{toolbar}</div> : null}
      </header>

      {error ? (
        <p className="mx-4 mt-3 rounded-md bg-attention/10 px-3 py-2 text-sm text-attention">{error}</p>
      ) : null}

      <div className="flex min-h-0 flex-1 flex-col">{children}</div>

      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-bg/40 px-4 py-3">
        <span className="text-[11px] text-primary/45">{footerNote ?? 'Saved locally as you work.'}</span>
        <div className="flex items-center gap-2">
          {canReset ? (
            <Button variant="secondary" size="sm" onClick={onReset} disabled={submitting}>
              Reset
            </Button>
          ) : null}
          <Button size="sm" onClick={onSubmit} loading={submitting} disabled={disabled || submitting}>
            {submitLabel}
          </Button>
        </div>
      </footer>
    </section>
  )
}

export function EnvironmentNote({ children }: { children: ReactNode }): React.JSX.Element {
  return (
    <div className="flex items-start gap-2.5 rounded-lg border border-info/25 bg-info/[0.04] px-3.5 py-3 text-xs leading-relaxed text-primary/65">
      <Icon name="lightbulb" className="mt-0.5 h-4 w-4 shrink-0 text-info" />
      <div>{children}</div>
    </div>
  )
}

export function FieldLabel({ children }: { children: ReactNode }): React.JSX.Element {
  return (
    <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-primary/45">{children}</span>
  )
}

export function submitGuard(
  value: string,
  minimum: number,
  setError: (message: string | null) => void
): boolean {
  if (value.trim().length >= minimum) return true
  setError(`Add at least ${minimum} characters before submitting your work.`)
  return false
}

export type { PracticalWorkbenchProps }
