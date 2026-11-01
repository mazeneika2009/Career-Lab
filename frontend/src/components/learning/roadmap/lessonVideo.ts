import type { Lesson } from './buildLessons'

/** Fraction of a video that must be viewed to count as watched. */
export const WATCH_THRESHOLD = 0.9

export type VideoProvider = 'YouTube' | 'Vimeo' | 'HTML5' | 'Link'

export interface VideoMarker {
  /** Seconds into the video; null until the runtime duration is known. */
  timeSec: number | null
  /** 0..1 position, used to resolve timeSec once duration loads. */
  fraction: number
  label: string
}

export interface LessonVideoContent {
  lessonId: number
  lessonTitle: string
  videoContent: {
    title: string
    provider: VideoProvider
    /** Embeddable player URL (YouTube/Vimeo/HTML5) or the external link. */
    embedUrl: string
    /** Human duration, e.g. "14:20". Null when unknown. */
    duration: string | null
    durationSec: number | null
    /** Badge text, e.g. "14 mins • Industry Insider Breakdown". */
    durationBadge: string
    summary: string
    markers: VideoMarker[]
    takeaways: string[]
    isWatched: boolean
    mandatory: boolean
  } | null
}

/** A fully resolved video ready for the embedded player. */
export type ResolvedVideo = NonNullable<LessonVideoContent['videoContent']>

/** Minimal shape of a topic video resource returned by `/me/topics/:id`. */
export interface TopicVideoResource {
  title: string
  url: string
  platform?: string | null
  durationSec?: number | null
  relationship?: string
}

/** Raw video candidate resolved from backend data (videos endpoint or topic links). */
export interface VideoCandidate {
  title: string
  url: string
  platform: string | null
  durationSec: number | null
  description: string
}

export function detectProvider(url: string): VideoProvider {
  if (/youtube\.com\/(watch|embed|shorts|playlist)|youtu\.be\//i.test(url)) return 'YouTube'
  if (/vimeo\.com\//i.test(url)) return 'Vimeo'
  if (/\.(mp4|webm|m3u8)(\?|#|$)/i.test(url)) return 'HTML5'
  return 'Link'
}

/**
 * True when a URL belongs to a video host or media container. Resource lists
 * use this to keep raw video URLs out of plain link rows — video content is
 * always rendered through the embedded player instead.
 */
export function isVideoUrl(url: string): boolean {
  if (detectProvider(url) !== 'Link') return true
  // Catch channel, playlist and other YouTube/Vimeo pages that the player
  // cannot embed but that must still never surface as a text link.
  return /youtube\.com|youtu\.be|vimeo\.com/i.test(url)
}

/**
 * Validate and extract a YouTube video ID from watch, embed, Shorts or
 * `youtu.be` share URLs. YouTube video IDs are always exactly 11 URL-safe
 * characters — anything shorter/longer is rejected so a malformed ID can
 * never reach the player (a common Error 153 trigger).
 */
export function youtubeVideoId(url: string): string | null {
  if (!/youtube\.com|youtu\.be/i.test(url)) return null
  // `/embed/videoseries` is the 11-character playlist path, not a video ID.
  if (/youtube\.com\/embed\/videoseries/i.test(url)) return null
  const id = `[A-Za-z0-9_-]{11}(?![A-Za-z0-9_-])`
  return (
    url.match(new RegExp(`[?&]v=(${id})`))?.[1] ??
    url.match(new RegExp(`youtu\\.be\\/(${id})`))?.[1] ??
    url.match(new RegExp(`youtube\\.com\\/shorts\\/(${id})`))?.[1] ??
    url.match(new RegExp(`youtube\\.com\\/embed\\/(${id})`))?.[1] ??
    null
  )
}

/**
 * Convert a watch/share URL into the standard embed endpoint
 * (`https://www.youtube.com/embed/{VIDEO_ID}`).
 * Returns null when the URL cannot be embedded (plain article links).
 */
export function toEmbedUrl(url: string): string | null {
  const id = youtubeVideoId(url)
  if (id && /youtube\.com|youtu\.be/i.test(url)) return `https://www.youtube.com/embed/${id}`
  const list = url.match(/[?&]list=([A-Za-z0-9_-]+)/)
  if (/youtube\.com/i.test(url) && list?.[1]) {
    return `https://www.youtube.com/embed/videoseries?list=${list[1]}`
  }
  const vimeo = url.match(/vimeo\.com\/(\d+)/)
  if (vimeo?.[1]) return `https://player.vimeo.com/video/${vimeo[1]}`
  if (/\.(mp4|webm|m3u8)(\?|#|$)/i.test(url)) return url
  return null
}

export function vimeoVideoId(url: string): string | null {
  // Accept both share URLs (vimeo.com/123) and the player embed URL that
  // toEmbedUrl() produces (player.vimeo.com/video/123).
  return url.match(/vimeo\.com\/(?:video\/)?(\d+)/)?.[1] ?? null
}

/**
 * Canonical YouTube embed endpoint with the parameters the player needs.
 * Always returns `https://www.youtube.com/embed/{VIDEO_ID}?…`; the origin is
 * included when available so YouTube can verify the embedding page (Error 153
 * guard) and enable postMessage control.
 */
export function youtubeEmbedUrl(
  videoId: string,
  options: { origin?: string | null; startSec?: number | null } = {}
): string {
  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
    enablejsapi: '1'
  })
  if (options.origin) params.set('origin', options.origin)
  if (options.startSec && options.startSec > 0) {
    params.set('start', String(Math.floor(options.startSec)))
  }
  return `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?${params.toString()}`
}

/** Canonical watch page for a YouTube video or embed URL. */
export function youtubeWatchUrl(url: string): string | null {
  const id = youtubeVideoId(url)
  return id ? `https://www.youtube.com/watch?v=${id}` : null
}

/** Thumbnail served by YouTube for a valid video ID; null for other hosts. */
export function youtubeThumbnailUrl(url: string): string | null {
  const id = youtubeVideoId(url)
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null
}

/**
 * Best available public page for watching a resolved video outside the app.
 * YouTube embeds map back to their watch page, Vimeo player URLs map back to
 * vimeo.com, and direct media/links are returned unchanged.
 */
export function videoWatchUrl(provider: VideoProvider, embedUrl: string): string {
  const youtube = youtubeWatchUrl(embedUrl)
  if (youtube) return youtube

  const playlist = embedUrl.match(/[?&]list=([A-Za-z0-9_-]+)/)?.[1]
  if (provider === 'YouTube' && playlist) {
    return `https://www.youtube.com/playlist?list=${playlist}`
  }

  const vimeo = vimeoVideoId(embedUrl)
  if (vimeo) return `https://vimeo.com/${vimeo}`

  return embedUrl
}

/** 620 → "10:20", 3723 → "1:02:03". */
export function formatDuration(totalSec: number): string {
  const s = Math.max(0, Math.round(totalSec))
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  const mm = h > 0 ? String(m).padStart(2, '0') : String(m)
  return `${h > 0 ? `${h}:` : ''}${mm}:${String(sec).padStart(2, '0')}`
}

/** 620 → "10 mins", 3600 → "1 hr", 5400 → "1 hr 30 mins". */
export function formatDurationLong(totalSec: number): string {
  const mins = Math.round(totalSec / 60)
  if (mins < 1) return 'Under a minute'
  if (mins < 60) return `${mins} min${mins === 1 ? '' : 's'}`
  const h = Math.floor(mins / 60)
  const rest = mins % 60
  return rest === 0 ? `${h} hr${h === 1 ? '' : 's'}` : `${h} hr ${rest} min${rest === 1 ? '' : 's'}`
}

function truncate(label: string, max = 48): string {
  return label.length > max ? `${label.slice(0, max - 1)}…` : label
}

/**
 * Build evenly-spaced chapter markers from the lesson's own topics so
 * students can jump to each module section inside the video.
 */
export function buildMarkers(topicTitles: string[], durationSec: number | null): VideoMarker[] {
  const titles = topicTitles.slice(0, 5)
  if (titles.length === 0) return []
  if (titles.length === 1) {
    return [{ timeSec: 0, fraction: 0, label: `Intro · ${truncate(titles[0]!)}` }]
  }
  return titles.map((t, i) => {
    const fraction = i / titles.length
    return {
      timeSec: durationSec ? Math.round(fraction * durationSec) : null,
      fraction,
      label: truncate(t)
    }
  })
}

export function videoKindLabel(title: string): string {
  const t = title.toLowerCase()
  if (/intro|overview|getting started|fundamental/.test(t)) return 'Industry Insider Breakdown'
  if (/interview|career|day in the life|workflow|role/.test(t)) return 'Career Deep Dive'
  if (/project|build|hands|practice|lab/.test(t)) return 'Practical Walkthrough'
  return 'Expert Technical Tutorial'
}

/**
 * Resolve one topic-part video resource into the embedded-player shape.
 * Returns null for non-embeddable URLs so the UI never falls back to a raw
 * external video link.
 */
export function buildTopicVideo(
  resource: TopicVideoResource,
  takeaways: string[] = []
): ResolvedVideo | null {
  const provider = detectProvider(resource.url)
  const embedUrl = toEmbedUrl(resource.url)
  if (!embedUrl) return null

  const duration =
    resource.durationSec != null ? formatDuration(resource.durationSec) : null
  return {
    title: resource.title,
    provider,
    embedUrl,
    duration,
    durationSec: resource.durationSec ?? null,
    durationBadge:
      resource.durationSec != null
        ? `${formatDurationLong(resource.durationSec)} • ${videoKindLabel(resource.title)}`
        : `${resource.platform ?? provider} • ${videoKindLabel(resource.title)}`,
    summary:
      resource.relationship?.trim() ||
      `${resource.title} — targeted crash course for this lesson part.`,
    markers: [],
    takeaways: takeaways.slice(0, 4),
    isWatched: false,
    mandatory: true
  }
}

/**
 * Resolve the structured `videoContent` for one lesson node from real
 * backend candidates (videos endpoint first, then playable topic links).
 * `takeaways` should be real topic objectives resolved by the caller.
 * Returns `videoContent: null` when the career has no authored video for
 * this lesson yet — the caller renders an honest empty state and the lesson
 * is NOT video-gated.
 */
export function buildLessonVideo(
  lesson: Lesson,
  candidates: VideoCandidate[],
  isWatched: boolean,
  takeaways: string[] = []
): LessonVideoContent {
  const lessonTitle = `Lesson ${String(lesson.number).padStart(2, '0')}: ${lesson.chapterTitle}${
    lesson.partsTotal > 1 ? ` — Part ${lesson.part}` : ''
  }`
  const topicTitles = lesson.topics.map((t) => t.title)

  const pick =
    candidates.find((c) =>
      lesson.topics.some((t) =>
        c.title.toLowerCase().includes((t.title.toLowerCase().split(' ')[0] ?? '').slice(0, 12))
      )
    ) ?? candidates[0]

  if (!pick) return { lessonId: lesson.number, lessonTitle, videoContent: null }

  const provider = detectProvider(pick.url)
  const embedUrl = toEmbedUrl(pick.url) ?? pick.url
  const duration = pick.durationSec != null ? formatDuration(pick.durationSec) : null

  return {
    lessonId: lesson.number,
    lessonTitle,
    videoContent: {
      title: pick.title,
      provider,
      embedUrl,
      duration,
      durationSec: pick.durationSec,
      durationBadge:
        pick.durationSec != null
          ? `${formatDurationLong(pick.durationSec)} • ${videoKindLabel(pick.title)}`
          : `${provider} video • ${videoKindLabel(pick.title)}`,
      summary:
        pick.description ||
        `${pick.title} — career video for ${lesson.chapterTitle}${
          pick.platform ? ` via ${pick.platform}` : ''
        }.`,
      markers: buildMarkers(topicTitles, pick.durationSec),
      takeaways: takeaways.slice(0, 4),
      isWatched,
      mandatory: true
    }
  }
}
