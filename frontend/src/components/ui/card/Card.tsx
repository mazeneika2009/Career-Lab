import { cn } from '../../../utils/cn'

export function Card({
  className,
  children
}: {
  className?: string
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <div className={cn('rounded-[10px] border border-border bg-surface p-6', className)}>
      {children}
    </div>
  )
}

export function CardHeader({ title, description }: { title: string; description?: string }): React.JSX.Element {
  return (
    <div className="mb-4">
      <h2 className="text-base font-semibold text-primary">{title}</h2>
      {description ? <p className="mt-1 text-sm text-primary/60">{description}</p> : null}
    </div>
  )
}
