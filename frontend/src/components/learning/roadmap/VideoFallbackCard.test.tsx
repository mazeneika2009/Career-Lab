import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { VideoFallbackCard } from './VideoFallbackCard'

describe('VideoFallbackCard', () => {
  it('shows a thumbnail, a clear reason, a watch link and a retry action', () => {
    const onRetry = vi.fn()
    const { container } = render(
      <VideoFallbackCard
        title="Learn HTML & CSS — Full Course"
        provider="YouTube"
        failure={{ reason: 'embedding-disabled' }}
        watchUrl="https://www.youtube.com/watch?v=abc123XYZ-_"
        thumbnailUrl="https://i.ytimg.com/vi/abc123XYZ-_/hqdefault.jpg"
        onRetry={onRetry}
      />
    )

    expect(
      screen.getByRole('heading', { name: /this video can't be embedded/i })
    ).toBeInTheDocument()
    expect(screen.getByText(/owner has restricted playback/i)).toBeInTheDocument()

    const thumbnail = container.querySelector('img')
    expect(thumbnail).toHaveAttribute('src', 'https://i.ytimg.com/vi/abc123XYZ-_/hqdefault.jpg')

    const watch = screen.getByRole('link', { name: /watch on youtube/i })
    expect(watch).toHaveAttribute('href', 'https://www.youtube.com/watch?v=abc123XYZ-_')
    expect(watch).toHaveAttribute('target', '_blank')
    expect(watch).toHaveAttribute('rel', 'noreferrer')

    fireEvent.click(screen.getByRole('button', { name: /try again/i }))
    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  it('omits retry for failures that retrying cannot fix', () => {
    render(
      <VideoFallbackCard
        title="Private video"
        provider="YouTube"
        failure={{ reason: 'unavailable' }}
        watchUrl="https://www.youtube.com/watch?v=abc123XYZ-_"
      />
    )

    expect(screen.queryByRole('button', { name: /try again/i })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: /watch on youtube/i })).toBeInTheDocument()
  })

  it('labels the external link for Vimeo and direct video fallbacks', () => {
    const { rerender } = render(
      <VideoFallbackCard
        title="Vimeo lesson"
        provider="Vimeo"
        failure={{ reason: 'player-error' }}
        watchUrl="https://vimeo.com/123456789"
        onRetry={() => undefined}
      />
    )
    expect(screen.getByRole('link', { name: /watch on vimeo/i })).toBeInTheDocument()

    rerender(
      <VideoFallbackCard
        title="Direct stream"
        provider="HTML5"
        failure={{ reason: 'player-error' }}
        watchUrl="https://cdn.example.com/lesson.mp4"
      />
    )
    expect(screen.getByRole('link', { name: /open video/i })).toHaveAttribute(
      'href',
      'https://cdn.example.com/lesson.mp4'
    )
  })
})
