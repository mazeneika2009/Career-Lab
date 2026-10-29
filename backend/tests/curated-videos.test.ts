import { describe, expect, it } from 'vitest'
import { getAuthoredCareers } from '../src/content/index.js'
import { isVideoResourceUrl } from '../src/content/framework.js'
import {
  CAREER_VIDEO_ALLOWLIST,
  curatedKeyForUrl,
  resolveChapterVideos
} from '../src/content/curated-videos.js'

const careers = getAuthoredCareers()

describe('three-part lesson video mapping', () => {
  it('keeps every chapter at exactly three parts', () => {
    const chapters = careers.flatMap((career) =>
      career.chapters.map((chapter) => ({
        career: career.slug,
        chapter: chapter.slug,
        parts: chapter.topics.length
      }))
    )
    expect(chapters.length).toBeGreaterThan(0)
    expect(chapters.filter((entry) => entry.parts !== 3)).toEqual([])
  })

  it('assigns a scoped, playable video to every part', () => {
    const missing: string[] = []
    const outOfScope: string[] = []

    for (const career of careers) {
      const allowed = new Set(CAREER_VIDEO_ALLOWLIST[career.slug] ?? [])
      for (const chapter of career.chapters) {
        const resolved = resolveChapterVideos(career, chapter, chapter.topics)
        expect(resolved).toHaveLength(3)

        resolved.forEach((videos, index) => {
          const topic = chapter.topics[index]!
          const label = `${career.slug}/${chapter.slug}/${topic.slug}`
          if (videos.length === 0) {
            missing.push(label)
            return
          }
          const video = videos[0]!
          expect(video.title.length).toBeGreaterThan(0)
          expect(video.url).toMatch(/^https?:\/\//)
          const key = curatedKeyForUrl(video.url)
          if (key && !allowed.has(key)) outOfScope.push(`${label}: ${key}`)
        })
      }
    }

    expect(missing).toEqual([])
    expect(outOfScope).toEqual([])
  })

  it('rotates distinct videos across the three parts when the pool allows it', () => {
    const repeats: string[] = []

    for (const career of careers) {
      const allowed = CAREER_VIDEO_ALLOWLIST[career.slug] ?? []
      if (allowed.length < 3) continue

      for (const chapter of career.chapters) {
        const resolved = resolveChapterVideos(career, chapter, chapter.topics)
        const urls = resolved.map((videos) => videos[0]?.url ?? '')
        if (new Set(urls).size < 3) {
          repeats.push(`${career.slug}/${chapter.slug}: ${urls.join(' | ')}`)
        }
      }
    }

    // Every career whose allowlist holds at least three videos must rotate a
    // distinct video into each part.
    expect(repeats).toEqual([])
  })

  it('never authors a raw video URL in a plain links list', () => {
    const offenders = careers.flatMap((career) =>
      career.chapters.flatMap((chapter) =>
        chapter.topics.flatMap((topic) =>
          topic.links
            .filter((link) => isVideoResourceUrl(link.url))
            .map((link) => `${career.slug}/${chapter.slug}/${topic.slug}: ${link.url}`)
        )
      )
    )

    expect(offenders).toEqual([])
  })

  it('prefers the part-specific signal over the chapter title', () => {
    const career = careers.find((entry) => entry.slug === 'frontend-developer')!
    const chapter = career.chapters.find((entry) => entry.slug === 'advanced-js-engineering')!
    const resolved = resolveChapterVideos(career, chapter, chapter.topics)
    const asyncVideo = resolved[0]?.[0]
    const closureVideo = resolved[1]?.[0]

    expect(asyncVideo?.url).toBeTruthy()
    expect(closureVideo?.url).toBeTruthy()
    expect(asyncVideo?.url).not.toBe(closureVideo?.url)
  })
})
