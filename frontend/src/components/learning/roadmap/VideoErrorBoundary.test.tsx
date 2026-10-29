import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { VideoErrorBoundary } from './VideoErrorBoundary'

function BrokenPlayer(): React.JSX.Element {
  throw new Error('player exploded')
}

describe('VideoErrorBoundary', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders children when the player is healthy', () => {
    render(
      <VideoErrorBoundary
        title="Healthy video"
        provider="YouTube"
        embedUrl="https://www.youtube.com/embed/abc123XYZ-_"
      >
        <p>Player content</p>
      </VideoErrorBoundary>
    )

    expect(screen.getByText('Player content')).toBeInTheDocument()
  })

  it('replaces a crashed player with the watch fallback instead of a blank box', () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined)

    render(
      <VideoErrorBoundary
        title="Crashing video"
        provider="YouTube"
        embedUrl="https://www.youtube.com/embed/abc123XYZ-_"
      >
        <BrokenPlayer />
      </VideoErrorBoundary>
    )

    expect(screen.getByRole('heading', { name: /hit a snag/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /watch on youtube/i })).toHaveAttribute(
      'href',
      'https://www.youtube.com/watch?v=abc123XYZ-_'
    )
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument()
  })
})
