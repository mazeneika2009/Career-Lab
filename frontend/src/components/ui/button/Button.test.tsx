import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renders its label', () => {
    render(<Button>Sign in</Button>)
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument()
  })

  it('defaults to type=button', () => {
    render(<Button>Click</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })

  it('disables and shows a spinner while loading', () => {
    render(<Button loading>Submit</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button.querySelector('[role="status"]')).not.toBeNull()
  })

  it('applies primary variant classes by default', () => {
    render(<Button>Action</Button>)
    expect(screen.getByRole('button').className).toContain('bg-primary')
  })
})
