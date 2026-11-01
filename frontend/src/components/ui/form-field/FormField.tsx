import { forwardRef, useId } from 'react'
import { cn } from '../../../utils/cn'
import { Label } from '../label/Label'
import { FieldError } from '../field-error/FieldError'

export interface FormFieldProps {
  label: string
  error?: string
  hint?: string
  required?: boolean
  children: (ids: { id: string; describedBy: string | undefined; invalid: boolean }) => React.ReactNode
  className?: string
}

export function FormField({
  label,
  error,
  hint,
  required,
  children,
  className
}: FormFieldProps): React.JSX.Element {
  const id = useId()
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      {children({ id, describedBy, invalid: Boolean(error) })}
      {hint && !error ? (
        <p id={hintId} className="text-xs text-info">
          {hint}
        </p>
      ) : null}
      {error ? <FieldError id={errorId}>{error}</FieldError> : null}
    </div>
  )
}

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }>(
  function Input({ className, invalid, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cn(
          'h-10 w-full rounded-md border bg-surface px-3 text-sm text-primary placeholder:text-primary/40',
          'focus:outline-none focus:ring-2 focus:ring-accent/40',
          invalid ? 'border-error' : 'border-border',
          className
        )}
        {...props}
      />
    )
  }
)
