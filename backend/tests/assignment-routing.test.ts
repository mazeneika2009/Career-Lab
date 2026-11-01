import { describe, expect, it } from 'vitest'
import { pickChapterForAssignment } from '../src/content/assignment-routing.js'

const chapters = [
  { id: 1n, stage: 'Beginner', order: 1 },
  { id: 2n, stage: 'Foundation', order: 2 },
  { id: 3n, stage: 'Intermediate', order: 3 },
  { id: 4n, stage: 'Intermediate', order: 4 },
  { id: 5n, stage: 'Advanced', order: 5 }
]

describe('pickChapterForAssignment', () => {
  it('attaches an assignment to the last unclaimed chapter of its stage', () => {
    const claimed = new Set<bigint>()
    expect(pickChapterForAssignment({ stage: 'Intermediate', order: 1 }, chapters, claimed)?.id).toBe(4n)

    claimed.add(4n)
    expect(pickChapterForAssignment({ stage: 'Intermediate', order: 2 }, chapters, claimed)?.id).toBe(3n)
  })

  it('never claims the same chapter twice', () => {
    const claimed = new Set<bigint>()
    for (let order = 1; order <= chapters.length; order++) {
      const chapter = pickChapterForAssignment({ stage: 'Advanced', order }, chapters, claimed)
      expect(chapter).not.toBeNull()
      claimed.add(chapter!.id)
    }
    expect(claimed.size).toBe(chapters.length)
    expect(pickChapterForAssignment({ stage: 'Advanced', order: 6 }, chapters, claimed)).toBeNull()
  })

  it('falls back to the closest remaining chapter for an unmatched stage', () => {
    const claimed = new Set<bigint>([1n])
    expect(pickChapterForAssignment({ stage: 'Expert', order: 2 }, chapters, claimed)?.id).toBe(3n)
  })
})
