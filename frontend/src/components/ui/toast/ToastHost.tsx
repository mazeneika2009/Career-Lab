import { cn } from '../../../utils/cn'
import type { ToastTone } from '../../../store/uiStore'
import { Icon, type IconName } from '../icon/Icon'

const TONE_STYLE: Record<ToastTone, string> = {
  info: 'border-info',
  success: 'border-success',
  warning: 'border-warning',
  danger: 'border-error'
}

const TONE_ICON: Record<ToastTone, IconName> = {
  info: 'lightbulb',
  success: 'check-circle',
  warning: 'alert-triangle',
  danger: 'alert-triangle'
}

const TONE_ICON_STYLE: Record<ToastTone, string> = {
  info: 'text-info',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-error'
}

export function ToastHost({
  toasts,
  onDismiss
}: {
  toasts: Array<{ id: number; tone: ToastTone; message: string }>
  onDismiss: (id: number) => void
}): React.JSX.Element {
  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex flex-col gap-2 sm:left-auto sm:right-4 sm:w-80"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          role={t.tone === 'danger' ? 'alert' : 'status'}
          className={cn(
            'toast-enter pointer-events-auto flex items-start gap-3 rounded-md border border-l-4 border-border bg-surface px-4 py-3 text-sm text-primary shadow-sm',
            TONE_STYLE[t.tone]
          )}
        >
          <Icon
            name={TONE_ICON[t.tone]}
            className={cn('mt-0.5 h-4 w-4 shrink-0', TONE_ICON_STYLE[t.tone])}
          />
          <span className="min-w-0 flex-1 pt-0.5 leading-relaxed">{t.message}</span>
          <button
            type="button"
            onClick={() => onDismiss(t.id)}
            aria-label="Dismiss notification"
            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded text-primary/40 transition-colors hover:bg-primary/5 hover:text-primary"
          >
            <Icon name="close" className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
    </div>
  )
}
