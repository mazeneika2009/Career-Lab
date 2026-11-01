export function FieldError({
  id,
  children
}: {
  id?: string
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <p id={id} role="alert" className="text-xs text-error">
      {children}
    </p>
  )
}
