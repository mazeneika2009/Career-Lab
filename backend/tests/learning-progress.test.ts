import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { prisma } from '../src/utils/prisma.js'
import {
  completeTopic,
  getLearningPath,
  getTopicContent
} from '../src/services/learning.service.js'
import { createActiveUser, resetDb, type FixtureUser } from './helpers/db.js'

let user: FixtureUser
let careerId: bigint

async function selectFrontendCareer(fixture: FixtureUser): Promise<bigint> {
  const career = await prisma.career.findUniqueOrThrow({ where: { slug: 'frontend-developer' } })
  await prisma.studentCareer.create({
    data: { userId: fixture.internalId, careerId: career.id, active: true }
  })
  return career.id
}

beforeEach(async () => {
  await resetDb()
  user = await createActiveUser('learning-progress@example.com')
  careerId = await selectFrontendCareer(user)
})

afterEach(async () => {
  await prisma.user.delete({ where: { id: user.internalId } }).catch(() => undefined)
})

describe('topic completion persistence', () => {
  it('keeps a completed topic completed when it is opened again', async () => {
    const chapter = await prisma.chapter.findFirstOrThrow({
      where: { book: { careerId } },
      orderBy: { order: 'asc' },
      include: { topics: { orderBy: { order: 'asc' } } }
    })
    const topic = chapter.topics[0]!

    const firstView = await getTopicContent(user.internalId, user.publicId, topic.publicId)
    expect(firstView.topic.status).toBe('in_progress')

    await completeTopic(user.internalId, user.publicId, topic.publicId)
    const afterCompletion = await prisma.topicProgress.findUniqueOrThrow({
      where: {
        userId_topicId: { userId: user.internalId, topicId: topic.id }
      }
    })
    expect(afterCompletion.status).toBe('completed')
    expect(afterCompletion.completedAt).not.toBeNull()

    const reopened = await getTopicContent(user.internalId, user.publicId, topic.publicId)
    expect(reopened.topic.status).toBe('completed')

    const afterReopen = await prisma.topicProgress.findUniqueOrThrow({
      where: {
        userId_topicId: { userId: user.internalId, topicId: topic.id }
      }
    })
    expect(afterReopen.status).toBe('completed')
    expect(afterReopen.completedAt?.toISOString()).toBe(
      afterCompletion.completedAt?.toISOString()
    )
  })
})

describe('learning path locks', () => {
  it('does not unlock topics in a later chapter while an earlier chapter is incomplete', async () => {
    const chapters = await prisma.chapter.findMany({
      where: { book: { careerId } },
      orderBy: { order: 'asc' },
      include: { topics: { orderBy: { order: 'asc' } } }
    })
    const laterChapter = chapters[1]!
    expect(laterChapter.topics.length).toBeGreaterThan(1)

    await prisma.topicProgress.createMany({
      data: laterChapter.topics.slice(0, 2).map((topic) => ({
        userId: user.internalId,
        topicId: topic.id,
        status: 'completed' as const,
        completedAt: new Date()
      }))
    })

    const path = await getLearningPath(user.internalId)
    const laterStage = path.stages[1]!

    expect(laterStage.topics[0]?.locked).toBe(true)
    expect(laterStage.topics[1]?.locked).toBe(true)
  })
})
