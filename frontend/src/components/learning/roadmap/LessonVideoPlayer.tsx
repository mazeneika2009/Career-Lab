import { useCallback, useEffect, useRef, useState } from 'react'
import { useVideoProgressStore } from '../../../store/videoProgressStore'
import { Button } from '../../ui/button/Button'
import { StatusText } from '../../app/primitives'
import { VideoErrorBoundary } from './VideoErrorBoundary'
import { VideoFallbackCard, type VideoFailure } from './VideoFallbackCard'
import {
  WATCH_THRESHOLD,
  formatDuration,
  videoWatchUrl,
  vimeoVideoId,
  youtubeEmbedUrl,
  youtubeThumbnailUrl,
  youtubeVideoId,
  youtubeWatchUrl,
  type ResolvedVideo,
  type VideoMarker,
  type VideoProvider
} from './lessonVideo'

/* ------------------------- third-party API loaders ------------------------ */

declare global {
  interface Window {
    YT?: {
      Player: new (
        el: HTMLElement | string,
        opts: {
          videoId?: string
          playerVars?: Record<string, string | number>
          events?: {
            onReady?: (e: { target: YtPlayer }) => void
            onStateChange?: (e: { data: number; target: YtPlayer }) => void
            /** 100 = removed/private, 101/150 = owner disallows embedding. */
            onError?: (e: { data: number }) => void
          }
        }
      ) => YtPlayer
    }
    Vimeo?: { Player: new (el: HTMLIFrameElement) => VimeoPlayer }
    onYouTubeIframeAPIReady?: () => void
  }
}

interface YtPlayer {
  getCurrentTime: () => number
  getDuration: () => number
  seekTo: (sec: number, allowSeekAhead?: boolean) => void
  getIframe: () => HTMLIFrameElement
  stopVideo: () => void
  destroy: () => void
}

/** Page origin for the YouTube player; omitted for non-http(s) contexts. */
function playerOrigin(): string | undefined {
  if (typeof window === 'undefined') return undefined
  return /^https?:\/\//.test(window.location.origin) ? window.location.origin : undefined
}

/**
 * Permissions for the embedded player. These are set on the iframe itself
 * before navigation (not after the API reports ready), so autoplay,
 * fullscreen, encrypted media and picture-in-picture all work from the start.
 */
export const IFRAME_ALLOW =
  'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'

let ytPromise: Promise<void> | null = null
function loadYouTubeApi(): Promise<void> {
  if (typeof window === 'undefined') return Promise.reject(new Error('No window'))
  if (window.YT?.Player) return Promise.resolve()
  if (ytPromise) return ytPromise

  ytPromise = new Promise<void>((resolve, reject) => {
    const previous = window.onYouTubeIframeAPIReady
    let settled = false
    let timer = 0

    const finish = (error?: Error): void => {
      if (settled) return
      settled = true
      window.clearTimeout(timer)
      if (error) {
        // Never cache a failed loader: a retry (or another lesson) should be
        // able to try again after a network blip or a blocked request.
        ytPromise = null
        window.onYouTubeIframeAPIReady = previous
        reject(error)
      } else {
        resolve()
      }
    }

    timer = window.setTimeout(() => finish(new Error('YouTube API timed out')), 12_000)
    window.onYouTubeIframeAPIReady = () => {
      previous?.()
      if (window.YT?.Player) finish()
      else finish(new Error('YouTube API did not initialise'))
    }

    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    tag.async = true
    tag.onerror = () => finish(new Error('YouTube API failed to load'))
    document.head.appendChild(tag)
  })

  return ytPromise
}

interface VimeoPlayer {
  on: (event: string, cb: (data: unknown) => void) => void
  getDuration: () => Promise<number>
  setCurrentTime: (sec: number) => Promise<number>
  unload: () => Promise<void>
}

let vimeoPromise: Promise<void> | null = null
function loadVimeoApi(): Promise<void> {
  if (typeof window === 'undefined') return Promise.reject(new Error('No window'))
  if (window.Vimeo?.Player) return Promise.resolve()
  if (!vimeoPromise) {
    vimeoPromise = new Promise<void>((resolve, reject) => {
      const tag = document.createElement('script')
      tag.src = 'https://player.vimeo.com/api/player.js'
      tag.async = true
      tag.onload = () => resolve()
      tag.onerror = () => {
        // Allow a later mount/retry to reconstruct the player.
        vimeoPromise = null
        reject(new Error('Vimeo API failed to load'))
      }
      document.head.appendChild(tag)
    })
  }
  return vimeoPromise
}

/* ------------------------------- section ---------------------------------- */

export function LessonVideoSection({
  video,
  careerSlug,
  lessonId,
  variant = 'full'
}: {
  video: ResolvedVideo
  careerSlug: string
  lessonId: string
  /** `compact` renders only the responsive player (used in video libraries). */
  variant?: 'full' | 'compact'
}): React.JSX.Element {
  const watched = useVideoProgressStore((s) => s.watched[`${careerSlug}:${lessonId}`] === true)
  const savedProgress = useVideoProgressStore((s) => s.progress[`${careerSlug}:${lessonId}`] ?? 0)
  const markWatched = useVideoProgressStore((s) => s.markWatched)
  const setProgress = useVideoProgressStore((s) => s.setProgress)

  const [liveProgress, setLiveProgress] = useState(savedProgress)
  const [durationSec, setDurationSec] = useState<number | null>(video.durationSec)

  const handleProgress = useCallback(
    (fraction: number, totalSec?: number) => {
      const clamped = Math.max(0, Math.min(1, fraction))
      setLiveProgress(clamped)
      setProgress(careerSlug, lessonId, clamped)
      if (totalSec && totalSec > 0) setDurationSec(totalSec)
      if (clamped >= WATCH_THRESHOLD) markWatched(careerSlug, lessonId)
    },
    [careerSlug, lessonId, markWatched, setProgress]
  )

  const markers: VideoMarker[] = video.markers.map((m) => ({
    ...m,
    timeSec: m.timeSec ?? (durationSec ? Math.round(m.fraction * durationSec) : null)
  }))

  if (variant === 'compact') {
    return (
      <div className="mt-3">
        <VideoErrorBoundary
          title={video.title}
          provider={video.provider}
          embedUrl={video.embedUrl}
        >
          <ProviderPlayer
            video={video}
            watched={watched}
            onProgress={handleProgress}
            onWatched={() => markWatched(careerSlug, lessonId)}
          />
        </VideoErrorBoundary>
      </div>
    )
  }

  return (
    <section aria-label="Lesson part video" className="rounded-lg border border-border bg-surface p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <h2 className="text-sm font-semibold tracking-tight text-primary">{video.title}</h2>
          <p className="mt-1 flex flex-wrap items-center gap-x-2 text-xs">
            <span className="font-semibold tabular-nums text-primary">
              {video.duration ?? video.provider} • {video.provider}
            </span>
            <span className="text-primary/55">{video.durationBadge}</span>
          </p>
        </div>
        <StatusText tone={watched ? 'completed' : 'in_progress'} />
      </div>

      <div className="mt-3">
        <VideoErrorBoundary
          title={video.title}
          provider={video.provider}
          embedUrl={video.embedUrl}
        >
          <ProviderPlayer
            video={video}
            watched={watched}
            onProgress={handleProgress}
            onWatched={() => markWatched(careerSlug, lessonId)}
          />
        </VideoErrorBoundary>
      </div>

      {/* Watch progress */}
      <div className="mt-3" aria-label="Video watch progress">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-border/60">
          <div
            className={`h-full rounded-full transition-[width] ${watched ? 'bg-success' : 'bg-accent'}`}
            style={{ width: `${Math.round((watched ? 1 : liveProgress) * 100)}%` }}
          />
        </div>
        <p className="mt-1 text-xs tabular-nums text-primary/60">
          {watched
            ? 'Video watched — continue with the reading below'
            : liveProgress > 0
              ? `${Math.round(liveProgress * 100)}% watched — reach 90% to mark the video complete`
              : 'Watch to 90% to mark the video complete. The reading below is also part of this lesson.'}
        </p>
      </div>

      {markers.length > 0 ? (
        <MarkerBar markers={markers} onSeek={(sec) => seekRequest(sec)} />
      ) : null}

      {/* Key takeaways & summary */}
      <div className="mt-4 rounded-md border border-border/70 bg-bg px-4 py-3">
        <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/55">
          Key takeaways
        </h3>
        {video.takeaways.length > 0 ? (
          <ul className="mt-2 space-y-1.5">
            {video.takeaways.map((t, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed text-primary/85">
                <span aria-hidden className="font-bold text-success">✓</span>
                {t}
              </li>
            ))}
          </ul>
        ) : null}
        <p className="mt-2 border-t border-border/60 pt-2 text-sm leading-relaxed text-primary/70">
          {video.summary}
        </p>
      </div>
    </section>
  )
}

/* Seek bus: markers request a seek; the mounted provider player listens. */
const seekListeners = new Set<(sec: number) => void>()
function seekRequest(sec: number): void {
  seekListeners.forEach((fn) => fn(sec))
}

function MarkerBar({
  markers,
  onSeek
}: {
  markers: VideoMarker[]
  onSeek: (sec: number) => void
}): React.JSX.Element {
  return (
    <div className="mt-3">
      <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/55">
        Jump to a section
      </h3>
      <ul className="mt-2 flex flex-wrap gap-1.5">
        {markers.map((m, i) => (
          <li key={i}>
            <button
              type="button"
              disabled={m.timeSec == null}
              onClick={() => m.timeSec != null && onSeek(m.timeSec)}
              title={m.timeSec != null ? `Seek to ${formatDuration(m.timeSec)}` : 'Duration loading…'}
              className="text-xs font-medium tabular-nums text-primary/70 underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-accent disabled:cursor-wait disabled:opacity-50"
            >
              {m.timeSec != null ? formatDuration(m.timeSec) : '…'} · {m.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ---------------------------- provider players ---------------------------- */

function PlayerFrame({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-md border border-border bg-primary">
      {children}
    </div>
  )
}

function ProviderPlayer({
  video,
  watched,
  onProgress,
  onWatched
}: {
  video: ResolvedVideo
  watched: boolean
  onProgress: (fraction: number, totalSec?: number) => void
  onWatched: () => void
}): React.JSX.Element {
  // Playlists and plain links cannot be progress-tracked — manual completion.
  const isPlaylist = /videoseries|list=/.test(video.embedUrl) && video.provider === 'YouTube'

  if (video.provider === 'YouTube' && !isPlaylist) {
    return (
      <YouTubePlayer
        video={video}
        watched={watched}
        onProgress={onProgress}
        onWatched={onWatched}
      />
    )
  }
  if (video.provider === 'Vimeo') {
    return (
      <VimeoPlayer
        video={video}
        watched={watched}
        onProgress={onProgress}
        onWatched={onWatched}
      />
    )
  }
  if (video.provider === 'HTML5') {
    return <Html5Player video={video} onProgress={onProgress} />
  }

  const watchUrl = videoWatchUrl(video.provider, video.embedUrl)
  return (
    <div className="rounded-md border border-border bg-bg p-5 text-center">
      <p className="text-sm font-medium text-primary">{video.title}</p>
      <p className="mx-auto mt-1 max-w-md text-sm leading-relaxed text-primary/60">{video.summary}</p>
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        <a
          href={watchUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-primary hover:border-accent/60"
        >
          Open video in new tab
        </a>
        {watched ? (
          <StatusText tone="completed" />
        ) : (
          <Button size="sm" onClick={onWatched}>
            Mark as watched
          </Button>
        )}
      </div>
    </div>
  )
}

function useSeekRegistration(register: (sec: number) => void): void {
  useEffect(() => {
    seekListeners.add(register)
    return () => {
      seekListeners.delete(register)
    }
  }, [register])
}

function retryableFailure(failure: VideoFailure): boolean {
  return failure.reason === 'network' || failure.reason === 'player-error'
}

function TrackingUnavailableNotice({
  provider,
  watchUrl,
  watched,
  onWatched
}: {
  provider: VideoProvider
  watchUrl: string
  watched: boolean
  onWatched: () => void
}): React.JSX.Element {
  const label = provider === 'Vimeo' ? 'Watch on Vimeo' : 'Watch on YouTube'
  return (
    <div className="mt-2 flex flex-wrap items-center justify-between gap-2 rounded-md border border-border/70 bg-bg px-3 py-2">
      <p className="text-xs leading-relaxed text-primary/60">
        Inline progress tracking is unavailable, but the video still plays.
      </p>
      <div className="flex items-center gap-3">
        {!watched ? (
          <button
            type="button"
            onClick={onWatched}
            className="text-xs font-medium text-primary underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
          >
            Mark as watched
          </button>
        ) : null}
        <a
          href={watchUrl}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-medium text-primary underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
        >
          {label}
        </a>
      </div>
    </div>
  )
}

/* --------------------------------- YouTube -------------------------------- */

function YouTubePlayer({
  video,
  watched,
  onProgress,
  onWatched
}: {
  video: ResolvedVideo
  watched: boolean
  onProgress: (fraction: number, totalSec?: number) => void
  onWatched: () => void
}): React.JSX.Element {
  const id = youtubeVideoId(video.embedUrl)
  const [failure, setFailure] = useState<VideoFailure | null>(null)
  const [attempt, setAttempt] = useState(0)

  if (!id) {
    return (
      <VideoFallbackCard
        title={video.title}
        provider={video.provider}
        failure={{ reason: 'invalid' }}
        watchUrl={video.embedUrl}
      />
    )
  }

  if (failure) {
    return (
      <VideoFallbackCard
        title={video.title}
        provider={video.provider}
        failure={failure}
        watchUrl={youtubeWatchUrl(video.embedUrl) ?? video.embedUrl}
        thumbnailUrl={youtubeThumbnailUrl(video.embedUrl)}
        onRetry={
          retryableFailure(failure)
            ? () => {
                setFailure(null)
                setAttempt((value) => value + 1)
              }
            : undefined
        }
      />
    )
  }

  return (
    <YouTubeFrame
      key={`${id}:${attempt}`}
      video={video}
      videoId={id}
      watched={watched}
      onProgress={onProgress}
      onWatched={onWatched}
      onFailure={setFailure}
    />
  )
}

function YouTubeFrame({
  video,
  videoId,
  watched,
  onProgress,
  onWatched,
  onFailure
}: {
  video: ResolvedVideo
  videoId: string
  watched: boolean
  onProgress: (fraction: number, totalSec?: number) => void
  onWatched: () => void
  onFailure: (failure: VideoFailure) => void
}): React.JSX.Element {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const playerRef = useRef<YtPlayer | null>(null)
  const progressRef = useRef(onProgress)
  progressRef.current = onProgress
  const failureRef = useRef(onFailure)
  failureRef.current = onFailure

  const [tracking, setTracking] = useState<'connecting' | 'ready' | 'unavailable'>('connecting')
  const [frameLoaded, setFrameLoaded] = useState(false)
  const frameLoadedRef = useRef(false)
  const readyRef = useRef(false)

  const src = youtubeEmbedUrl(videoId, { origin: playerOrigin() })
  const watchUrl = youtubeWatchUrl(video.embedUrl) ?? video.embedUrl

  const seek = useCallback((sec: number) => {
    try {
      playerRef.current?.seekTo(sec, true)
    } catch {
      /* player not ready */
    }
  }, [])
  useSeekRegistration(seek)

  // If the embed itself never finishes navigating (offline, DNS, firewall),
  // surface the fallback card instead of leaving a blank black frame.
  useEffect(() => {
    if (frameLoaded || readyRef.current) return
    const timer = window.setTimeout(() => {
      if (!frameLoadedRef.current && !readyRef.current) {
        failureRef.current({ reason: 'network' })
      }
    }, 15_000)
    return () => window.clearTimeout(timer)
  }, [frameLoaded])

  useEffect(() => {
    const frame = iframeRef.current
    if (!frame) return
    let disposed = false
    let interval: ReturnType<typeof setInterval> | null = null
    let readyTimer: ReturnType<typeof setTimeout> | null = null

    const report = (): void => {
      const player = playerRef.current
      if (!player) return
      try {
        const total = player.getDuration()
        const current = player.getCurrentTime()
        if (total > 0) progressRef.current(Math.min(1, current / total), total)
      } catch {
        /* player not ready */
      }
    }

    const stopReporting = (): void => {
      if (interval) {
        clearInterval(interval)
        interval = null
      }
    }

    loadYouTubeApi()
      .then(() => {
        if (disposed || !window.YT?.Player) return
        try {
          playerRef.current = new window.YT.Player(frame, {
            events: {
              onReady: () => {
                if (disposed) return
                readyRef.current = true
                setTracking('ready')
                if (readyTimer) {
                  clearTimeout(readyTimer)
                  readyTimer = null
                }
                report()
              },
              onError: (event) => {
                if (disposed) return
                const reason: VideoFailure['reason'] =
                  event.data === 101 || event.data === 150
                    ? 'embedding-disabled'
                    : event.data === 100
                      ? 'unavailable'
                      : event.data === 2
                        ? 'invalid'
                        : event.data === 153
                          ? 'network'
                          : 'player-error'
                failureRef.current({ reason })
              },
              onStateChange: (event) => {
                if (event.data === 1) {
                  if (!interval) interval = setInterval(report, 1000)
                } else {
                  stopReporting()
                  report()
                }
              }
            }
          })
        } catch {
          if (!disposed) setTracking('unavailable')
          return
        }

        // The API script loaded and attached, but the player never signalled
        // ready. That means the embed itself failed to navigate (offline, DNS,
        // firewall) — `load` also fires for the browser's error page, so it is
        // not proof the video loaded. Swap in the fallback card, which offers a
        // retry and a direct watch link.
        readyTimer = setTimeout(() => {
          if (!disposed && !readyRef.current) failureRef.current({ reason: 'network' })
        }, 10_000)
      })
      .catch(() => {
        // The iframe was rendered independently of the API, so a blocked
        // iframe_api script no longer prevents playback. Just disable tracking.
        if (!disposed) setTracking('unavailable')
      })

    return () => {
      disposed = true
      stopReporting()
      if (readyTimer) clearTimeout(readyTimer)
      try {
        playerRef.current?.stopVideo()
      } catch {
        /* noop */
      }
      playerRef.current = null
    }
  }, [])

  return (
    <>
      <PlayerFrame>
        <iframe
          ref={iframeRef}
          src={src}
          title={video.title}
          allow={IFRAME_ALLOW}
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          className="h-full w-full border-0"
          onLoad={() => {
            frameLoadedRef.current = true
            setFrameLoaded(true)
          }}
        />
      </PlayerFrame>
      {tracking === 'unavailable' ? (
        <TrackingUnavailableNotice
          provider="YouTube"
          watchUrl={watchUrl}
          watched={watched}
          onWatched={onWatched}
        />
      ) : null}
    </>
  )
}

/* ---------------------------------- Vimeo --------------------------------- */

function VimeoPlayer({
  video,
  watched,
  onProgress,
  onWatched
}: {
  video: ResolvedVideo
  watched: boolean
  onProgress: (fraction: number, totalSec?: number) => void
  onWatched: () => void
}): React.JSX.Element {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const playerRef = useRef<VimeoPlayer | null>(null)
  const progressRef = useRef(onProgress)
  progressRef.current = onProgress
  const id = vimeoVideoId(video.embedUrl)
  const [failure, setFailure] = useState<VideoFailure | null>(null)
  const [attempt, setAttempt] = useState(0)
  const [tracking, setTracking] = useState<'connecting' | 'ready' | 'unavailable'>('connecting')

  const seek = useCallback((sec: number) => {
    void playerRef.current?.setCurrentTime(sec).catch(() => undefined)
  }, [])
  useSeekRegistration(seek)

  useEffect(() => {
    const frame = iframeRef.current
    if (!id || !frame || failure) return
    let disposed = false

    loadVimeoApi()
      .then(() => {
        if (disposed || !window.Vimeo?.Player) return
        const player = new window.Vimeo.Player(frame)
        playerRef.current = player
        setTracking('ready')

        player.on('timeupdate', (data) => {
          const update = data as { seconds?: number; duration?: number }
          if (
            typeof update.seconds === 'number' &&
            typeof update.duration === 'number' &&
            update.duration > 0
          ) {
            progressRef.current(Math.min(1, update.seconds / update.duration), update.duration)
          }
        })
        player.on('error', () => {
          if (!disposed) setFailure({ reason: 'player-error' })
        })

        // Resolve markers before playback starts.
        void player
          .getDuration()
          .then((duration) => {
            if (!disposed && duration > 0) progressRef.current(0, duration)
          })
          .catch(() => undefined)
      })
      .catch(() => {
        // The iframe is a normal Vimeo embed and keeps working without the
        // JS API; only time tracking is lost.
        if (!disposed) setTracking('unavailable')
      })

    return () => {
      disposed = true
      const player = playerRef.current
      playerRef.current = null
      void player?.unload().catch(() => undefined)
    }
  }, [id, attempt, failure])

  if (!id) {
    return (
      <VideoFallbackCard
        title={video.title}
        provider={video.provider}
        failure={{ reason: 'invalid' }}
        watchUrl={video.embedUrl}
      />
    )
  }

  if (failure) {
    return (
      <VideoFallbackCard
        title={video.title}
        provider={video.provider}
        failure={failure}
        watchUrl={videoWatchUrl('Vimeo', video.embedUrl)}
        onRetry={
          retryableFailure(failure)
            ? () => {
                setFailure(null)
                setTracking('connecting')
                setAttempt((value) => value + 1)
              }
            : undefined
        }
      />
    )
  }

  return (
    <>
      <PlayerFrame>
        <iframe
          key={attempt}
          ref={iframeRef}
          src={video.embedUrl}
          title={video.title}
          allow={IFRAME_ALLOW}
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          className="h-full w-full border-0"
        />
      </PlayerFrame>
      {tracking === 'unavailable' ? (
        <TrackingUnavailableNotice
          provider="Vimeo"
          watchUrl={videoWatchUrl('Vimeo', video.embedUrl)}
          watched={watched}
          onWatched={onWatched}
        />
      ) : null}
    </>
  )
}

/* ---------------------------------- HTML5 --------------------------------- */

function Html5Player({
  video,
  onProgress
}: {
  video: ResolvedVideo
  onProgress: (fraction: number, totalSec?: number) => void
}): React.JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [failure, setFailure] = useState<VideoFailure | null>(null)
  const [attempt, setAttempt] = useState(0)

  const seek = useCallback((sec: number) => {
    const element = videoRef.current
    if (element && Number.isFinite(element.duration)) {
      element.currentTime = Math.min(sec, element.duration)
    }
  }, [])
  useSeekRegistration(seek)

  if (failure) {
    return (
      <VideoFallbackCard
        title={video.title}
        provider={video.provider}
        failure={failure}
        message="The browser could not play this stream. Open the file directly to watch it, or continue with the reading below."
        watchUrl={video.embedUrl}
        onRetry={() => {
          setFailure(null)
          setAttempt((value) => value + 1)
        }}
      />
    )
  }

  return (
    <PlayerFrame>
      <video
        key={attempt}
        ref={videoRef}
        src={video.embedUrl}
        controls
        playsInline
        preload="metadata"
        className="h-full w-full bg-black"
        onTimeUpdate={(event) => {
          const element = event.currentTarget
          if (element.duration > 0) {
            onProgress(Math.min(1, element.currentTime / element.duration), element.duration)
          }
        }}
        onLoadedMetadata={(event) => {
          const element = event.currentTarget
          if (element.duration > 0) onProgress(element.currentTime / element.duration, element.duration)
        }}
        onError={() => setFailure({ reason: 'player-error' })}
      />
    </PlayerFrame>
  )
}
