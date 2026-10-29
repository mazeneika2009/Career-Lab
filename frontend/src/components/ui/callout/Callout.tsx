import { cn } from '../../../utils/cn'

type CalloutTone = 'info' | 'success' | 'warning' | 'danger'

const TONE_STYLE: Record<CalloutTone, string> = {
  info: 'border-l-info bg-[color-mix(in_srgb,#527568_8%,#FFFDF7)]',
  success: 'border-l-success bg-[color-mix(in_srgb,#8FB996_15%,#FFFDF7)]',
  warning: 'border-l-warning bg-[color-mix(in_srgb,#D9A441_15%,#FFFDF7)]',
  danger: 'border-l-error bg-[color-mix(in_srgb,#C94C4C_8%,#FFFDF7)]'
}

export function Callout({
  tone = 'info',
  title,
  children
}: {
  tone?: CalloutTone
  title?: string
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <div role={tone === 'danger' ? 'alert' : undefined} className={cn('rounded-md border border-border border-l-4 px-4 py-3 text-sm', TONE_STYLE[tone])}>
      {title ? <p className="font-semibold text-primary">{title}</p> : null}
      <div className={cn('text-primary/80', title && 'mt-1')}>{children}</div>
    </div>
  )
}
