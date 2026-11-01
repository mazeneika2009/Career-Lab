import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../../utils/cn'
import { Spinner } from '../spinner/Spinner'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md font-medium tracking-[-0.01em] transition-[background-color,border-color,color,box-shadow,transform] duration-150 active:translate-y-px disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-surface hover:bg-primary-dark hover:shadow-sm',
        secondary: 'bg-surface text-primary border border-border hover:border-accent/35 hover:bg-bg',
        ghost: 'text-primary hover:bg-bg',
        destructive: 'bg-error text-white hover:bg-attention',
        link: 'text-info underline underline-offset-2 hover:text-primary p-0 h-auto active:translate-y-0 focus-visible:ring-offset-0'
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-11 px-5 text-base'
      }
    },
    defaultVariants: { variant: 'primary', size: 'md' }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, loading = false, disabled, children, type, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type={type ?? 'button'}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Spinner className="h-4 w-4" /> : null}
      {children}
    </button>
  )
})
