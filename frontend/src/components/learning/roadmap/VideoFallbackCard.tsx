import { useState } from 'react'
import type { VideoProvider } from './lessonVideo'

export type VideoFailureReason =
  | 'embedding-disabled'
  | 'unavailable'
  | 'invalid'
  | 'network'
  | 'player-error'
  | 'crash'

export interface VideoFailure {
  reason: VideoFailureReason
}

export interface VideoFallbackCardProps {
  title: string
  provider: VideoProvider
  watchUrl: string
  failure: VideoFailure
  /** Optional YouTube thumbnail; the card gracefully degrades without one. */
  thumbnailUrl?: string | null
  /** Offered only for failures that a retry can realistically resolve. */
  onRetry?: () => void
  /** Provider-specific copy override (e.g. an HLS-only playback error). */
  message?: string
}

const COPY: Record<VideoFailureReason, { heading: string; message: string }> = {
  'embedding-disabled': {
    heading: "This video can't be embedded",
    message:
      'The owner has restricted playback to YouTube. Watch it there instead — your lesson and reading are unaffected.'
  },
  unavailable: {
    heading: 'This video is unavailable',
    message:
      'It may have been removed or made private. Open it on YouTube to check, or continue with the reading below.'
  },
  invalid: {
    heading: 'This video link is invalid',
    message:
      'The lesson is missing a valid video ID, so the player cannot start. The reading below covers the same material.'
  },
  network: {
    heading: 'The video player could not be loaded',
    message:
      'Your browser or network blocked the embed. You can still watch on YouTube, or continue with the reading below.'
  },
  'player-error': {
    heading: 'The video player could not start',
    message:
      'The embedded player reported an error. You can still watch on YouTube, or continue with the reading below.'
  },
  crash: {
    heading: 'The video player hit a snag',
    message:
      'Something unexpected happened while loading the player. Watch the video on YouTube, or continue with the reading below.'
  }
}

function watchLabel(provider: VideoProvider): string {
  if (provider === 'YouTube') return 'Watch on YouTube'
  if (provider === 'Vimeo') return 'Watch on Vimeo'
  return 'Open video'
}

function providerLabel(provider: VideoProvider): string {
  if (provider === 'HTML5') return 'Direct video'
  if (provider === 'Link') return 'External video'
  return `${provider} video`
}

export function VideoFallbackCard({
  title,
  provider,
  watchUrl,
  failure,
  thumbnailUrl,
  onRetry,
  message
}: VideoFallbackCardProps): React.JSX.Element {
  const copy = COPY[failure.reason]
  // Remember which thumbnail URL failed instead of resetting with an effect:
  // a different video gets a fresh attempt automatically.
  const [brokenThumbnail, setBrokenThumbnail] = useState<string | null>(null)
  const showThumbnail = Boolean(thumbnailUrl && thumbnailUrl !== brokenThumbnail)
  const label = watchLabel(provider)

  return (
    <div className="overflow-hidden rounded-md border border-border bg-surface">
      <div className="relative flex min-h-[12rem] items-end bg-primary sm:min-h-[14rem]">
        {showThumbnail ? (
          <img
            src={thumbnailUrl as string}
            alt=""
            aria-hidden="true"
            width={1280}
            height={720}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover opacity-45"
            onError={() => setBrokenThumbnail(thumbnailUrl ?? null)}
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-secondary-dark"
          />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/25"
        />

        <div className="relative flex w-full flex-col gap-4 p-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0 max-w-xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-surface/55">
              {providerLabel(provider)}
            </p>
            <h3 className="mt-1 font-display text-base font-semibold leading-snug text-surface">
              {copy.heading}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-surface/75">
              {message ?? copy.message}
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <a
              href={watchUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 items-center justify-center rounded-md bg-surface px-3.5 text-sm font-medium text-primary transition-colors hover:bg-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              {label}
              <span aria-hidden="true" className="ml-1.5 text-xs">
                ↗
              </span>
            </a>
            {onRetry ? (
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex h-9 items-center justify-center rounded-md border border-surface/30 px-3.5 text-sm font-medium text-surface transition-colors hover:bg-surface/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              >
                Try again
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-border px-5 py-3">
        <p className="min-w-0 truncate text-xs font-medium text-primary/70">{title}</p>
        <p className="text-xs text-primary/50">The lesson continues below.</p>
      </div>
    </div>
  )
}
