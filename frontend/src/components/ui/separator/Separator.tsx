export function Separator({ className }: { className?: string }): React.JSX.Element {
  return <hr className={`border-0 border-t border-border ${className ?? ''}`} />
}
