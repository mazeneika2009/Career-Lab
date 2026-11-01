import { afterEach, describe, expect, it, vi } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import { LessonVideoSection, IFRAME_ALLOW } from './LessonVideoPlayer'
import type { LessonVideoContent } from './lessonVideo'

type ResolvedVideo = NonNullable<LessonVideoContent['videoContent']>

function video(overrides: Partial<ResolvedVideo> = {}): ResolvedVideo {
  return {
    title: 'Learn HTML & CSS — Full Course for Beginners',
    provider: 'YouTube',
    embedUrl: 'https://www.youtube.com/embed/abc123XYZ-_',
    duration: '14:20',
    durationSec: 860,
    durationBadge: '14 mins • Industry Insider Breakdown',
    summary: 'A complete web foundations lesson.',
    markers: [],
    takeaways: ['Write semantic HTML'],
    isWatched: false,
    mandatory: true,
    ...overrides
  }
}

describe('LessonVideoSection iframe configuration', () => {
  afterEach(() => {
    delete (window as { YT?: unknown }).YT
    vi.useRealTimers()
  })

  it('renders the canonical embed URL with permissions set before navigation', () => {
    const { container, unmount } = render(
      <LessonVideoSection video={video()} careerSlug="frontend-developer" lessonId="chapter-1" />
    )

    const iframe = container.querySelector('iframe')
    expect(iframe).not.toBeNull()

    const src = iframe!.getAttribute('src') ?? ''
    expect(src.startsWith('https://www.youtube.com/embed/abc123XYZ-_?')).toBe(true)
    const params = new URL(src).searchParams
    expect(params.get('enablejsapi')).toBe('1')
    expect(params.get('playsinline')).toBe('1')
    expect(params.get('rel')).toBe('0')

    expect(iframe).toHaveAttribute('title', 'Learn HTML & CSS — Full Course for Beginners')
    expect(iframe).toHaveAttribute('allow', IFRAME_ALLOW)
    expect(iframe).toHaveAttribute('allowfullscreen')
    expect(iframe).toHaveAttribute('referrerpolicy', 'strict-origin-when-cross-origin')
    expect(IFRAME_ALLOW).toContain('accelerometer')
    expect(IFRAME_ALLOW).toContain('autoplay')
    expect(IFRAME_ALLOW).toContain('clipboard-write')
    expect(IFRAME_ALLOW).toContain('encrypted-media')
    expect(IFRAME_ALLOW).toContain('gyroscope')
    expect(IFRAME_ALLOW).toContain('picture-in-picture')

    unmount()
  })

  it('shows the fallback card when the video id is invalid', () => {
    render(
      <LessonVideoSection
        video={video({
          embedUrl: 'https://www.youtube.com/watch?v=too-short',
          title: 'Broken video link'
        })}
        careerSlug="frontend-developer"
        lessonId="chapter-2"
      />
    )

    expect(screen.getByRole('heading', { name: /this video link is invalid/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /watch on youtube/i })).toHaveAttribute(
      'href',
      'https://www.youtube.com/watch?v=too-short'
    )
    expect(screen.queryByRole('button', { name: /try again/i })).not.toBeInTheDocument()
  })

  it('offers Watch on YouTube without retry when embedding is disabled', async () => {
    vi.useFakeTimers()
    class EmbedBlockedPlayer {
      constructor(
        _el: HTMLElement | string,
        opts: { events?: { onError?: (e: { data: number }) => void } }
      ) {
        setTimeout(() => opts.events?.onError?.({ data: 101 }), 0)
      }
    }
    ;(window as unknown as { YT: unknown }).YT = { Player: EmbedBlockedPlayer }

    render(
      <LessonVideoSection video={video()} careerSlug="frontend-developer" lessonId="chapter-4" />
    )

    await act(async () => {
      await Promise.resolve()
    })
    act(() => {
      vi.advanceTimersByTime(0)
    })

    expect(
      screen.getByRole('heading', { name: /this video can't be embedded/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /watch on youtube/i })).toHaveAttribute(
      'href',
      'https://www.youtube.com/watch?v=abc123XYZ-_'
    )
    expect(screen.queryByRole('button', { name: /try again/i })).not.toBeInTheDocument()
  })

  it('shows the fallback card when the API loads but the embed never becomes ready', async () => {
    vi.useFakeTimers()
    // A stalled player: the API script is present and constructs a player, but
    // it never fires onReady (offline, DNS, firewall, or a blocked embed).
    ;(window as unknown as { YT: unknown }).YT = { Player: class {} }

    render(
      <LessonVideoSection video={video()} careerSlug="frontend-developer" lessonId="chapter-3" />
    )

    expect(
      screen.queryByRole('heading', { name: /video player could not be loaded/i })
    ).not.toBeInTheDocument()

    // Flush the API-ready promise, then run the 10s readiness timeout.
    await act(async () => {
      await Promise.resolve()
    })
    act(() => {
      vi.advanceTimersByTime(10_000)
    })

    expect(
      screen.getByRole('heading', { name: /video player could not be loaded/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /watch on youtube/i })).toHaveAttribute(
      'href',
      'https://www.youtube.com/watch?v=abc123XYZ-_'
    )
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument()
    expect(screen.queryByTitle('Learn HTML & CSS — Full Course for Beginners')).toBeNull()
  })
})
