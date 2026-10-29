import { describe, expect, it } from 'vitest'
import {
  blockedVideoKeyForCareer,
  CAREER_CATEGORY_MAP,
  CAREER_VIDEO_ALLOWLIST,
  CURATED_VIDEOS,
  curatedToCandidate,
  matchCuratedVideo,
  resolveSyncCandidates
} from './curatedVideos'
import { detectProvider, toEmbedUrl } from './lessonVideo'

describe('curated catalog integrity', () => {
  it('covers all 50 careers with known categories', () => {
    const slugs = Object.keys(CAREER_CATEGORY_MAP)
    expect(slugs).toHaveLength(50)
    const valid = new Set([
      'Development', 'AI & Data', 'Security', 'IT & Cloud',
      'Design', 'Creative', 'Quality', 'Business'
    ])
    for (const cat of Object.values(CAREER_CATEGORY_MAP)) {
      expect(valid.has(cat)).toBe(true)
    }
  })

  it('every entry resolves to an embeddable player URL', () => {
    expect(CURATED_VIDEOS.length).toBeGreaterThan(20)
    for (const entry of CURATED_VIDEOS) {
      expect(
        detectProvider(entry.url),
        `${entry.id} should be a playable provider`
      ).not.toBe('Link')
      expect(toEmbedUrl(entry.url), `${entry.id} should embed`).not.toBeNull()
      expect(entry.keywords.length).toBeGreaterThan(0)
    }
  })

  it('every category has at least two picks', () => {
    const counts: Record<string, number> = {}
    for (const entry of CURATED_VIDEOS) {
      for (const cat of entry.categories) counts[cat] = (counts[cat] ?? 0) + 1
    }
    for (const cat of ['Development', 'AI & Data', 'Security', 'IT & Cloud', 'Design', 'Creative', 'Quality', 'Business']) {
      expect(counts[cat] ?? 0, cat).toBeGreaterThanOrEqual(2)
    }
  })
})

describe('matchCuratedVideo', () => {
  it('matches a frontend lesson to the HTML/CSS pick', () => {
    const match = matchCuratedVideo({
      careerSlug: 'frontend-developer',
      stage: 'Beginner',
      chapterTitle: 'Web Platform Core',
      topicTitles: ['HTML Semantics', 'CSS Fundamentals']
    })
    expect(match?.id).toBe('html-css')
  })

  it('prefers stage-appropriate picks', () => {
    const match = matchCuratedVideo({
      careerSlug: 'backend-developer',
      stage: 'Advanced',
      chapterTitle: 'Server Engineering',
      topicTitles: ['Express middleware', 'REST API design']
    })
    expect(match?.id).toBe('node')
  })

  it('matches security lessons to security picks', () => {
    const match = matchCuratedVideo({
      careerSlug: 'cybersecurity-analyst',
      stage: 'Intermediate',
      chapterTitle: 'Threat Detection',
      topicTitles: ['SIEM triage', 'MITRE ATT&CK mapping']
    })
    expect(match).not.toBeNull()
    expect(['pentest', 'secplus', 'owasp']).toContain(match!.id)
  })

  it('NEVER serves a JavaScript video to a Unity lesson', () => {
    const match = matchCuratedVideo({
      careerSlug: 'game-developer',
      stage: 'Intermediate',
      chapterTitle: 'C# Scripting Basics',
      topicTitles: ['MonoBehaviour lifecycle', 'Web-style event loop']
    })
    expect(match).not.toBeNull()
    expect(['unity', 'gamedesign', 'git']).toContain(match!.id)
  })

  it('never returns null for a mapped career', () => {
    for (const slug of Object.keys(CAREER_CATEGORY_MAP)) {
      const match = matchCuratedVideo({
        careerSlug: slug,
        stage: 'Advanced',
        chapterTitle: 'Completely Unrelated Exotic Topic Xyz',
        topicTitles: ['Obscure subtopic qqq']
      })
      expect(match, slug).not.toBeNull()
    }
  })

  it('is deterministic', () => {
    const input = {
      careerSlug: 'digital-artist',
      stage: 'Beginner',
      chapterTitle: 'Drawing Basics',
      topicTitles: [' Gesture drawing ', 'Shape construction']
    }
    expect(matchCuratedVideo(input)?.id).toBe(matchCuratedVideo(input)?.id)
  })
})

describe('career allowlist guard', () => {
  it('maps all 50 careers to valid video keys', () => {
    const keys = new Set(CURATED_VIDEOS.map((v) => v.id))
    expect(Object.keys(CAREER_VIDEO_ALLOWLIST)).toHaveLength(50)
    for (const [slug, list] of Object.entries(CAREER_VIDEO_ALLOWLIST)) {
      expect(list.length, slug).toBeGreaterThan(0)
      for (const key of list) expect(keys.has(key), `${slug} -> ${key}`).toBe(true)
    }
  })

  it('flags cross-track videos and passes scoped ones', () => {
    expect(
      blockedVideoKeyForCareer('https://www.youtube.com/watch?v=jS4aFq5-91M', 'game-developer')
    ).toBe('js')
    expect(
      blockedVideoKeyForCareer('https://www.youtube.com/watch?v=9ZEu_I-ido4', 'game-developer')
    ).toBeNull()
    // Unknown (authored) URLs pass through — they come from the lesson itself.
    expect(blockedVideoKeyForCareer('https://example.com/custom.mp4', 'game-developer')).toBeNull()
  })
})

describe('resolveSyncCandidates', () => {
  const lesson = {
    topics: [{ publicId: 't1', title: 'HTML Semantics' }],
    chapterTitle: 'Web Platform Core',
    stage: 'Beginner'
  }

  it('prefers backend videos over curated picks', () => {
    const backend = [
      {
        title: 'Authored lesson video', topic: { publicId: 't1', title: 'HTML Semantics' },
        chapter: 'Web Platform Core', url: 'https://example.com/v.mp4',
        platform: null, durationSec: 600, description: 'Owned content'
      }
    ]
    const out = resolveSyncCandidates(lesson, backend, 'frontend-developer')
    expect(out).toHaveLength(1)
    expect(out[0]!.url).toBe('https://example.com/v.mp4')
  })

  it('falls back to the curated catalog when the backend has nothing', () => {
    const out = resolveSyncCandidates(lesson, [], 'frontend-developer')
    expect(out).toHaveLength(1)
    expect(out[0]!.url).toContain('youtube.com')
    expect(curatedToCandidate).toBeDefined()
  })
})
