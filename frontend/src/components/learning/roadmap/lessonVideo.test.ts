import { describe, expect, it } from 'vitest'
import {
  buildLessonVideo,
  buildMarkers,
  detectProvider,
  formatDuration,
  formatDurationLong,
  isVideoUrl,
  toEmbedUrl,
  videoKindLabel,
  videoWatchUrl,
  vimeoVideoId,
  WATCH_THRESHOLD,
  youtubeEmbedUrl,
  youtubeThumbnailUrl,
  youtubeVideoId,
  youtubeWatchUrl,
  type VideoCandidate
} from './lessonVideo'
import type { Lesson } from './buildLessons'

function lesson(): Lesson {
  return {
    id: 'c1',
    number: 1,
    chapterPublicId: 'c1',
    chapterTitle: 'Web Platform Core',
    stage: 'Beginner',
    description: 'Core concepts',
    topics: [
      { publicId: 't1', title: 'HTML Semantics', minutes: 20, status: 'not_started' },
      { publicId: 't2', title: 'CSS Fundamentals', minutes: 25, status: 'not_started' }
    ],
    part: 1,
    partsTotal: 1,
    carriesExam: true
  }
}

function candidate(overrides: Partial<VideoCandidate> = {}): VideoCandidate {
  return {
    title: 'A Day in the Life of a Senior Software Engineer',
    url: 'https://www.youtube.com/watch?v=ExAmPleId01',
    platform: 'YouTube',
    durationSec: 860,
    description: 'Daily workflows and career progression paths.',
    ...overrides
  }
}

describe('detectProvider / toEmbedUrl', () => {
  it('detects YouTube, Vimeo, HTML5 and plain links', () => {
    expect(detectProvider('https://www.youtube.com/watch?v=abc123XYZ-_')).toBe('YouTube')
    expect(detectProvider('https://youtu.be/abc123XYZ-_')).toBe('YouTube')
    expect(detectProvider('https://vimeo.com/123456789')).toBe('Vimeo')
    expect(detectProvider('https://cdn.example.com/lesson.mp4')).toBe('HTML5')
    expect(detectProvider('https://cdn.example.com/stream.m3u8')).toBe('HTML5')
    expect(detectProvider('https://developer.mozilla.org/en-US/docs/Learn')).toBe('Link')
  })

  it('flags every video-host URL so plain resource lists can filter it', () => {
    expect(isVideoUrl('https://www.youtube.com/watch?v=abc123XYZ-_')).toBe(true)
    expect(isVideoUrl('https://www.youtube.com/playlist?list=PL123')).toBe(true)
    expect(isVideoUrl('https://www.youtube.com/@freecodecamp')).toBe(true)
    expect(isVideoUrl('https://youtu.be/abc123XYZ-_')).toBe(true)
    expect(isVideoUrl('https://vimeo.com/123456789')).toBe(true)
    expect(isVideoUrl('https://cdn.example.com/lesson.mp4')).toBe(true)
    expect(isVideoUrl('https://developer.mozilla.org/en-US/docs/Learn')).toBe(false)
    expect(isVideoUrl('https://learn.microsoft.com/en-us/azure/sentinel/watchlists')).toBe(false)
    expect(isVideoUrl('https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html')).toBe(false)
  })

  it('converts watch/share URLs to embed URLs', () => {
    expect(toEmbedUrl('https://www.youtube.com/watch?v=abc123XYZ-_')).toBe(
      'https://www.youtube.com/embed/abc123XYZ-_'
    )
    expect(toEmbedUrl('https://youtu.be/abc123XYZ-_')).toBe('https://www.youtube.com/embed/abc123XYZ-_')
    expect(toEmbedUrl('https://www.youtube.com/shorts/abc123XYZ-_')).toBe(
      'https://www.youtube.com/embed/abc123XYZ-_'
    )
    expect(toEmbedUrl('https://vimeo.com/123456789')).toBe('https://player.vimeo.com/video/123456789')
    expect(toEmbedUrl('https://cdn.example.com/lesson.mp4')).toBe('https://cdn.example.com/lesson.mp4')
    expect(toEmbedUrl('https://developer.mozilla.org/en-US/docs/Learn')).toBeNull()
  })

  it('extracts video ids', () => {
    expect(youtubeVideoId('https://www.youtube.com/watch?v=abc123XYZ-_')).toBe('abc123XYZ-_')
    expect(youtubeVideoId('https://youtu.be/abc123XYZ-_')).toBe('abc123XYZ-_')
    expect(youtubeVideoId('https://www.youtube.com/embed/abc123XYZ-_')).toBe('abc123XYZ-_')
    expect(youtubeVideoId('https://www.youtube.com/shorts/abc123XYZ-_')).toBe('abc123XYZ-_')
    expect(youtubeVideoId('https://example.com/noid')).toBeNull()
    expect(vimeoVideoId('https://vimeo.com/123456789')).toBe('123456789')
    expect(vimeoVideoId('https://player.vimeo.com/video/123456789')).toBe('123456789')
    expect(vimeoVideoId('https://www.youtube.com/watch?v=abc123XYZ-_')).toBeNull()
  })

  it('rejects malformed ids so they never reach the player (Error 153 guard)', () => {
    // 10 chars — too short.
    expect(youtubeVideoId('https://www.youtube.com/watch?v=abc123XYZ-')).toBeNull()
    // 12 chars — too long.
    expect(youtubeVideoId('https://www.youtube.com/watch?v=abc123XYZ-_Q')).toBeNull()
    expect(youtubeVideoId('https://youtu.be/abc123XYZ-_Q')).toBeNull()
    // Non-YouTube hosts never yield an id.
    expect(youtubeVideoId('https://example.com/watch?v=abc123XYZ-_')).toBeNull()
    expect(toEmbedUrl('https://www.youtube.com/watch?v=abc123XYZ-_Q')).toBeNull()
  })
})

describe('embed, watch and thumbnail URLs', () => {
  it('builds the canonical YouTube embed URL with the required player params', () => {
    const url = youtubeEmbedUrl('abc123XYZ-_')
    expect(url.startsWith('https://www.youtube.com/embed/abc123XYZ-_?')).toBe(true)
    const params = new URL(url).searchParams
    expect(params.get('enablejsapi')).toBe('1')
    expect(params.get('playsinline')).toBe('1')
    expect(params.get('rel')).toBe('0')
    expect(params.get('origin')).toBeNull()
  })

  it('adds the page origin and start time when provided', () => {
    const url = youtubeEmbedUrl('abc123XYZ-_', {
      origin: 'https://app.example.com',
      startSec: 90
    })
    expect(url).toContain('origin=https%3A%2F%2Fapp.example.com')
    expect(url).toContain('start=90')
  })

  it('resolves public watch pages for every provider', () => {
    expect(youtubeWatchUrl('https://www.youtube.com/embed/abc123XYZ-_?enablejsapi=1')).toBe(
      'https://www.youtube.com/watch?v=abc123XYZ-_'
    )
    expect(
      videoWatchUrl('YouTube', 'https://www.youtube.com/embed/videoseries?list=PL123')
    ).toBe('https://www.youtube.com/playlist?list=PL123')
    expect(videoWatchUrl('Vimeo', 'https://player.vimeo.com/video/123456789')).toBe(
      'https://vimeo.com/123456789'
    )
    expect(videoWatchUrl('HTML5', 'https://cdn.example.com/lesson.mp4')).toBe(
      'https://cdn.example.com/lesson.mp4'
    )
  })

  it('resolves a thumbnail only for valid YouTube ids', () => {
    expect(youtubeThumbnailUrl('https://youtu.be/abc123XYZ-_')).toBe(
      'https://i.ytimg.com/vi/abc123XYZ-_/hqdefault.jpg'
    )
    expect(youtubeThumbnailUrl('https://vimeo.com/123456789')).toBeNull()
  })

  it('follows Vimeo share URLs through toEmbedUrl and back to a video id', () => {
    const embed = toEmbedUrl('https://vimeo.com/123456789')
    expect(embed).toBe('https://player.vimeo.com/video/123456789')
    expect(vimeoVideoId(embed!)).toBe('123456789')
  })
})

describe('formatDuration / formatDurationLong', () => {
  it('formats clock and long durations', () => {
    expect(formatDuration(860)).toBe('14:20')
    expect(formatDuration(3723)).toBe('1:02:03')
    expect(formatDurationLong(860)).toBe('14 mins')
    expect(formatDurationLong(3600)).toBe('1 hr')
    expect(formatDurationLong(30)).toBe('1 min')
  })

  it('labels video kinds', () => {
    expect(videoKindLabel('Introduction to Software Engineering Careers')).toBe('Industry Insider Breakdown')
    expect(videoKindLabel('A Day in the Life of a Senior Engineer')).toBe('Career Deep Dive')
    expect(videoKindLabel('Build a REST API hands-on lab')).toBe('Practical Walkthrough')
    expect(videoKindLabel('Closures deep dive')).toBe('Expert Technical Tutorial')
  })
})

describe('buildMarkers', () => {
  it('creates jump markers from lesson topics', () => {
    const markers = buildMarkers(['HTML Semantics', 'CSS Fundamentals'], 860)
    expect(markers).toHaveLength(2)
    expect(markers[0]).toMatchObject({ timeSec: 0, fraction: 0, label: 'HTML Semantics' })
    expect(markers[1]).toMatchObject({ timeSec: 430, fraction: 0.5, label: 'CSS Fundamentals' })
  })

  it('leaves times unresolved when duration is unknown', () => {
    const markers = buildMarkers(['HTML Semantics', 'CSS Fundamentals'], null)
    expect(markers.every((m) => m.timeSec === null)).toBe(true)
    expect(markers[1]!.fraction).toBe(0.5)
  })

  it('returns no markers without topics', () => {
    expect(buildMarkers([], 860)).toEqual([])
  })
})

describe('buildLessonVideo', () => {
  it('resolves the requested lesson videoContent schema', () => {
    const result = buildLessonVideo(lesson(), [candidate()], false, ['Write semantic HTML'])
    expect(result.lessonId).toBe(1)
    expect(result.lessonTitle).toBe('Lesson 01: Web Platform Core')
    expect(result.videoContent).toMatchObject({
      title: 'A Day in the Life of a Senior Software Engineer',
      provider: 'YouTube',
      embedUrl: 'https://www.youtube.com/embed/ExAmPleId01',
      duration: '14:20',
      isWatched: false,
      mandatory: true
    })
    expect(result.videoContent!.durationBadge).toContain('14 mins')
    expect(result.videoContent!.markers).toHaveLength(2)
    expect(result.videoContent!.takeaways).toEqual(['Write semantic HTML'])
  })

  it('returns null videoContent when the career has no authored video', () => {
    const result = buildLessonVideo(lesson(), [], false, [])
    expect(result.videoContent).toBeNull()
  })

  it('keeps the 90% watch threshold', () => {
    expect(WATCH_THRESHOLD).toBe(0.9)
  })
})
