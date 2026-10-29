export function Label({
  htmlFor,
  required,
  children
}: {
  htmlFor?: string
  required?: boolean
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium text-primary">
      {children}
      {required ? <span aria-hidden="true" className="ml-0.5 text-accent">*</span> : null}
    </label>
  )
}
