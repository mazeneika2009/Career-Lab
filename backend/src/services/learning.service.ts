import { prisma } from '../utils/prisma.js'
import { AppError } from '../utils/http.js'
import { requireActiveCareer } from './domain.helpers.js'
import {
  assertLessonContentAccess,
  completeStep,
  getLearningFlow,
  type LearningFlow
} from './learning-flow.service.js'
import { recomputeSkillProgress } from './progress.service.js'
import type { Career, Chapter, Topic } from '@prisma/client'

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? (value as string[]) : []
}

export async function getDashboard(userId: bigint, displayName: string) {
  const active = await requireActiveCareer(userId)
  const career = active.career

  const chapters = await prisma.chapter.findMany({
    where: { book: { careerId: career.id } },
    orderBy: { order: 'asc' },
    include: { topics: { orderBy: { order: 'asc' } } }
  })
  const topicIds = chapters.flatMap((c) => c.topics.map((t) => t.id))
  const progressRows = await prisma.topicProgress.findMany({
    where: { userId, topicId: { in: topicIds } }
  })
  const completedIds = new Set(progressRows.filter((p) => p.status === 'completed').map((p) => p.topicId))
  const totalTopics = topicIds.length
  const overallPercent = totalTopics === 0 ? 0 : Math.round((completedIds.size / totalTopics) * 100)

  // Current location = first incomplete topic in order.
  let currentChapter: Chapter | null = null
  let currentTopic: Topic | null = null
  outer: for (const ch of chapters) {
    for (const t of ch.topics) {
      if (!completedIds.has(t.id)) {
        currentChapter = ch
        currentTopic = t
        break outer
      }
    }
  }

  const theoryExams = await prisma.exam.findMany({
    where: {
      careerId: career.id,
      kind: 'theory',
      attempts: { none: { userId, passed: true } }
    },
    select: { publicId: true, title: true, chapter: { select: { order: true } } }
  })
  theoryExams.sort((a, b) => (a.chapter?.order ?? 99) - (b.chapter?.order ?? 99))
  const nextTheoryExam = theoryExams[0]
    ? { publicId: theoryExams[0].publicId, title: theoryExams[0].title }
    : null

  const assignmentStats = await prisma.assignment.groupBy({
    by: ['careerId'],
    where: { careerId: career.id },
    _count: true
  }).then(async () => {
    const subs = await prisma.assignmentSubmission.count({
      where: { userId, assignment: { careerId: career.id } }
    })
    const total = await prisma.assignment.count({ where: { careerId: career.id } })
    return { submitted: subs, total }
  })

  const latestEvaluation = await prisma.evaluation.findFirst({
    where: { userId, careerId: career.id },
    orderBy: { createdAt: 'desc' },
    select: { publicId: true, targetTitle: true, targetType: true, overallScore: true, verdict: true, createdAt: true }
  })

  const skillRows = (
    await recomputeSkillProgress(userId, career.id)
  )?.skills
    .slice()
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 4)
    .map((row) => ({ skill: row.skill, percent: row.percent })) ?? []

  const readiness = await prisma.readinessRecord.findUnique({
    where: { userId_careerId: { userId, careerId: career.id } }
  })
  const simulation = await prisma.simulationState.findUnique({
    where: { userId_careerId: { userId, careerId: career.id } },
    select: { status: true, companyName: true, roleTitle: true, startedAt: true }
  })
  const notifications = await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 5,
    select: { publicId: true, kind: true, title: true, body: true, readAt: true, createdAt: true }
  })

  return {
    studentName: displayName,
    career: { name: career.name, slug: career.slug, category: career.category },
    overallProgress: overallPercent,
    completedTopics: completedIds.size,
    totalTopics,
    currentStage: currentChapter?.stage ?? null,
    currentChapter: currentChapter?.title ?? null,
    currentTopic: currentTopic
      ? { publicId: currentTopic.publicId, title: currentTopic.title, chapterTitle: currentChapter?.title ?? null }
      : null,
    continueLearningTarget: currentTopic ? '/learn' : null,
    nextLesson: currentTopic ? { title: currentTopic.title, chapter: currentChapter?.title } : null,
    upcomingExam: nextTheoryExam,
    assignmentStatus: assignmentStats,
    latestEvaluation,
    skillSummary: skillRows,
    careerReadiness: readiness
      ? { overallPercent: readiness.overallPercent, ready: readiness.ready }
      : null,
    companySimulation: simulation
      ? { status: simulation.status, companyName: simulation.companyName, roleTitle: simulation.roleTitle }
      : { status: 'not_started' as const },
    recentNotifications: notifications
  }
}

export async function getLearningPath(userId: bigint) {
  const active = await requireActiveCareer(userId)
  const chapters = await prisma.chapter.findMany({
    where: { book: { careerId: active.career.id } },
    orderBy: { order: 'asc' },
    include: {
      topics: {
        orderBy: { order: 'asc' },
        include: { progress: { where: { userId } } }
      }
    }
  })

  let previousComplete = true
  return {
    career: { name: active.career.name, slug: active.career.slug, pathSummary: active.career.pathSummary },
    stages: chapters.map((ch) => {
      const topics = ch.topics.map((t, idx) => {
        const status = t.progress[0]?.status ?? 'not_started'
        // Sequential unlocking: a topic is locked until every prior topic is complete.
        const priorIncomplete =
          ch.topics.slice(0, idx).some((p) => (p.progress[0]?.status ?? 'not_started') !== 'completed')
        const unlocked = idx === 0 ? previousComplete || idx === 0 && ch.order === 1 : !priorIncomplete
        return {
          publicId: t.publicId,
          title: t.title,
          minutes: t.minutes,
          status,
          locked: !unlocked
        }
      })
      const doneCount = topics.filter((t) => t.status === 'completed').length
      const stageResult = {
        stage: ch.stage,
        chapterPublicId: ch.publicId,
        title: ch.title,
        description: ch.description,
        progress: { completed: doneCount, total: topics.length },
        completedTopics: doneCount,
        currentTopic: topics.find((t) => t.status === 'in_progress')?.title ?? null,
        topics
      }
      previousComplete = doneCount === topics.length && topics.length > 0
      return stageResult
    })
  }
}

export async function listBookChapters(userId: bigint) {
  const active = await requireActiveCareer(userId)
  const book = await prisma.book.findUnique({
    where: { careerId: active.career.id },
    include: {
      chapters: {
        orderBy: { order: 'asc' },
        select: { id: true, publicId: true, title: true, description: true, stage: true, order: true, topics: { select: { publicId: true } } }
      }
    }
  })
  if (!book) throw AppError.notFound('No book is published for the selected career yet.')

  // Continue reading = first incomplete topic.
  const chaptersFull = await prisma.chapter.findMany({
    where: { bookId: book.id },
    orderBy: { order: 'asc' },
    include: { topics: { orderBy: { order: 'asc' }, include: { progress: { where: { userId } } } } }
  })
  let continueTopicPublicId: string | null = null
  let completedByChapter = new Map<bigint, number>()
  for (const ch of chaptersFull) {
    let done = 0
    for (const t of ch.topics) {
      if ((t.progress[0]?.status ?? 'not_started') === 'completed') done += 1
      else if (!continueTopicPublicId) continueTopicPublicId = t.publicId
    }
    completedByChapter.set(ch.id, done)
  }

  return {
    book: { title: book.title, description: book.description },
    career: { name: active.career.name, slug: active.career.slug },
    continueReading: continueTopicPublicId,
    chapters: book.chapters.map((ch) => ({
      publicId: ch.publicId,
      title: ch.title,
      description: ch.description,
      stage: ch.stage,
      order: ch.order,
      topicIds: ch.topics.map((t) => t.publicId),
      progress: {
        completed: completedByChapter.get(ch.id) ?? 0,
        total: chaptersFull.find((c) => c.id === ch.id)?.topics.length ?? 0
      }
    }))
  }
}

export async function getChapterTopics(userId: bigint, chapterPublicId: string) {
  const active = await requireActiveCareer(userId)
  const chapter = await prisma.chapter.findUnique({
    where: { publicId: chapterPublicId },
    include: {
      book: true,
      topics: { orderBy: { order: 'asc' }, include: { progress: { where: { userId } } } }
    }
  })
  if (!chapter || chapter.book.careerId !== active.career.id) throw AppError.notFound('Chapter not found.')

  return {
    chapter: {
      publicId: chapter.publicId,
      title: chapter.title,
      description: chapter.description,
      stage: chapter.stage,
      order: chapter.order
    },
    bookTitle: chapter.book.title,
    topics: chapter.topics.map((t) => ({
      publicId: t.publicId,
      title: t.title,
      minutes: t.minutes,
      objectives: asStringArray(t.objectives),
      status: t.progress[0]?.status ?? 'not_started',
      order: t.order
    }))
  }
}

export async function getTopicContent(
  userId: bigint,
  userPublicId: string,
  topicPublicId: string
) {
  const active = await requireActiveCareer(userId)
  const topic = await prisma.topic.findUnique({
    where: { publicId: topicPublicId },
    include: {
      chapter: { include: { book: true, topics: { orderBy: { order: 'asc' } } } },
      resources: true
    }
  })
  if (!topic || topic.chapter.book.careerId !== active.career.id) throw AppError.notFound('Topic not found.')

  // Strict sequential access: a locked lesson cannot be opened by URL.
  await assertLessonContentAccess(userId, userPublicId, topic.chapter.publicId)

  // Reading progress tracking.
  await prisma.topicProgress.upsert({
    where: { userId_topicId: { userId, topicId: topic.id } },
    update: { lastViewedAt: new Date(), status: 'in_progress' },
    create: { userId, topicId: topic.id, status: 'in_progress' }
  })

  const siblings = topic.chapter.topics
  const idx = siblings.findIndex((s) => s.id === topic.id)

  const toView = (r: (typeof topic.resources)[number]) => ({
    id: String(r.id),
    kind: r.kind,
    title: r.title,
    url: r.url,
    platform: r.platform,
    creator: r.creator,
    durationSec: r.durationSec,
    relationship: r.relationship
  })
  const links = topic.resources.filter((r) => r.kind === 'link').map(toView)
  const videos = topic.resources.filter((r) => r.kind === 'video').map(toView)
  const tools = topic.resources.filter((r) => r.kind === 'tool').map(toView)
  const sources = topic.resources.filter((r) => r.kind === 'source').map(toView)

  return {
    topic: {
      publicId: topic.publicId,
      title: topic.title,
      minutes: topic.minutes,
      objectives: asStringArray(topic.objectives),
      sections: topic.sections,
      status: 'in_progress' as const
    },
    chapter: { publicId: topic.chapter.publicId, title: topic.chapter.title, stage: topic.chapter.stage },
    navigation: {
      previous: idx > 0 ? siblings[idx - 1]?.publicId ?? null : null,
      next: idx < siblings.length - 1 ? siblings[idx + 1]?.publicId ?? null : null,
      position: idx + 1,
      totalInChapter: siblings.length
    },
    resources: { links, videos, tools, sources }
  }
}

export async function completeTopic(
  userId: bigint,
  userPublicId: string,
  topicPublicId: string
) {
  const active = await requireActiveCareer(userId)
  const topic = await prisma.topic.findUnique({
    where: { publicId: topicPublicId },
    include: { chapter: { include: { book: true, topics: { select: { id: true } } } } }
  })
  if (!topic || topic.chapter.book.careerId !== active.career.id) throw AppError.notFound('Topic not found.')

  await assertLessonContentAccess(userId, userPublicId, topic.chapter.publicId)

  await prisma.topicProgress.upsert({
    where: { userId_topicId: { userId, topicId: topic.id } },
    update: { status: 'completed', completedAt: new Date() },
    create: { userId, topicId: topic.id, status: 'completed', completedAt: new Date() }
  })

  const remainingInChapter = await prisma.topic.count({
    where: {
      chapterId: topic.chapterId,
      progress: { none: { userId, status: 'completed' } }
    }
  })
  if (remainingInChapter === 0) {
    await completeStep({
      userPublicId,
      careerSlug: active.career.slug,
      chapterPublicId: topic.chapter.publicId,
      step: 'content'
    })
  }

  const remaining = await prisma.topic.count({
    where: { chapter: { book: { careerId: active.career.id } }, progress: { none: { userId, status: 'completed' } } }
  })
  await recomputeSkillProgress(userId, active.career.id)

  return {
    completed: true,
    remainingTopics: remaining,
    lessonContentComplete: remainingInChapter === 0
  }
}

/** Ordered course with server-computed step locks (Supabase-backed). */
export async function getCourseFlow(userId: bigint, userPublicId: string): Promise<LearningFlow> {
  return getLearningFlow(userId, userPublicId)
}

export async function listVideos(
  userId: bigint,
  filters: { chapter?: string; topic?: string }
) {
  const active = await requireActiveCareer(userId)

  const topicFilter: Record<string, unknown> = {
    chapter: { book: { careerId: active.career.id } }
  }
  if (filters.topic) topicFilter.publicId = filters.topic
  else if (filters.chapter) (topicFilter.chapter as Record<string, unknown>).publicId = filters.chapter

  const rows = await prisma.topicResource.findMany({
    where: { kind: 'video', topic: topicFilter as never },
    include: {
      topic: { select: { publicId: true, title: true, chapter: { select: { title: true, stage: true } } } }
    }
  })

  return {
    career: { name: active.career.name, slug: active.career.slug },
    videos: rows.map((r) => ({
      publicId: String(r.id),
      title: r.title,
      url: r.url,
      platform: r.platform,
      creator: r.creator,
      durationSec: r.durationSec,
      description: r.relationship,
      topic: { publicId: r.topic.publicId, title: r.topic.title },
      chapter: r.topic.chapter.title,
      stage: r.topic.chapter.stage
    }))
  }
}

export type { Career }
