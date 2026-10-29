import { cn } from '../../../utils/cn'

export function Spinner({ className }: { className?: string }): React.JSX.Element {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn(
        'inline-block h-5 w-5 animate-spin rounded-full border-2 border-border border-t-primary',
        className
      )}
    />
  )
}
