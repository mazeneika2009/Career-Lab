import type { ExamListItem, LearningPathStage } from '../../../types/domain'

/** Minimum number of sequential lessons every unified roadmap must expose. */
export const MIN_LESSONS = 10

export interface LessonTopic {
  publicId: string
  title: string
  minutes: number
  status: 'not_started' | 'in_progress' | 'completed'
}

export interface Lesson {
  /** Stable id: `${chapterPublicId}#part${part}` (or the chapter id when unsplit). */
  id: string
  /** 1-based display number (Lesson 01 … Lesson N). */
  number: number
  chapterPublicId: string
  chapterTitle: string
  stage: string
  description: string
  topics: LessonTopic[]
  /** 1-based part index when a chapter was subdivided to reach MIN_LESSONS. */
  part: number
  partsTotal: number
  /** Only the final part of a chapter carries that chapter's module exam. */
  carriesExam: boolean
}

export type LessonStatus = 'completed' | 'in_progress' | 'locked'

/**
 * Build the sequential lesson track from learning-path stages (chapters).
 *
 * One lesson per chapter by default. When a career has fewer than
 * MIN_LESSONS chapters, the chapters with the most topics are subdivided
 * (Part 1 / Part 2 …) until the track reaches MIN_LESSONS — or until every
 * lesson holds a single topic. Topic order is always preserved.
 */
export function buildLessons(stages: LearningPathStage[]): Lesson[] {
  type Draft = Omit<Lesson, 'number'>

  let drafts: Draft[] = stages.map((s) => ({
    id: s.chapterPublicId,
    chapterPublicId: s.chapterPublicId,
    chapterTitle: s.title,
    stage: s.stage,
    description: s.description,
    topics: s.topics.map((t) => ({
      publicId: t.publicId,
      title: t.title,
      minutes: t.minutes,
      status: t.status
    })),
    part: 1,
    partsTotal: 1,
    carriesExam: true
  }))

  const totalTopics = drafts.reduce((n, d) => n + d.topics.length, 0)
  const target = Math.min(MIN_LESSONS, Math.max(drafts.length, totalTopics))

  while (drafts.length < target) {
    // Split the splittable lesson with the most topics.
    let splitIndex = -1
    let splitSize = 1
    drafts.forEach((d, i) => {
      if (d.topics.length > splitSize) {
        splitSize = d.topics.length
        splitIndex = i
      }
    })
    if (splitIndex === -1) break
    const victim = drafts[splitIndex]!
    const mid = Math.ceil(victim.topics.length / 2)
    const first: Draft = {
      ...victim,
      id: `${victim.chapterPublicId}#part1`,
      topics: victim.topics.slice(0, mid),
      part: 1,
      partsTotal: 2,
      carriesExam: false
    }
    const second: Draft = {
      ...victim,
      id: `${victim.chapterPublicId}#part2`,
      topics: victim.topics.slice(mid),
      part: 2,
      partsTotal: 2,
      carriesExam: victim.carriesExam
    }
    drafts = [...drafts.slice(0, splitIndex), first, second, ...drafts.slice(splitIndex + 1)]
    // Renumber parts when a part gets split again.
    drafts = renumberParts(drafts)
  }

  return drafts.map((d, i) => ({ ...d, number: i + 1 }))
}

function renumberParts<T extends { chapterPublicId: string; part: number; partsTotal: number; id: string }>(
  drafts: T[]
): T[] {
  const byChapter = new Map<string, T[]>()
  for (const d of drafts) {
    const group = byChapter.get(d.chapterPublicId) ?? []
    group.push(d)
    byChapter.set(d.chapterPublicId, group)
  }
  for (const group of byChapter.values()) {
    if (group.length < 2) continue
    group.forEach((d, i) => {
      d.part = i + 1
      d.partsTotal = group.length
    })
  }
  return drafts
}

export function lessonTopicsComplete(lesson: Lesson): boolean {
  return lesson.topics.length > 0 && lesson.topics.every((t) => t.status === 'completed')
}

/**
 * Find the theory exam belonging to a chapter. Matches by chapter title
 * (falling back to stage when titles diverge), ignoring the final assessment.
 */
export function matchChapterExam(
  exams: ExamListItem[],
  chapterTitle: string,
  stage: string
): ExamListItem | undefined {
  const chapterExams = exams.filter((e) => e.chapter !== null)
  return (
    chapterExams.find((e) => e.chapter!.title === chapterTitle) ??
    chapterExams.find((e) => e.chapter!.stage === stage && e.chapter!.title.includes(chapterTitle.split(' ')[0] ?? ''))
  )
}

export function examPassed(exam: ExamListItem | undefined): boolean {
  if (!exam) return false
  return exam.attempts.some((a) => a.passed === true)
}

export interface VideoGate {
  /** Whether the lesson carries a mandatory career video. */
  hasMandatoryVideo: (lessonId: string) => boolean
  /** Whether that video has been watched (≥90%). */
  isWatched: (lessonId: string) => boolean
}

/**
 * Sequential gated statuses. Lesson N+1 is `locked` until lesson N is fully
 * complete (topics done + mandatory video watched + chapter exam passed
 * where each exists). Optimistic passes from the roadmap store are merged
 * so the UI updates instantly.
 */
export function lessonStatuses(
  lessons: Lesson[],
  exams: ExamListItem[],
  optimisticPassed: Record<string, true> = {},
  videoGate?: VideoGate
): LessonStatus[] {
  const complete = lessons.map((lesson) => {
    if (optimisticPassed[lesson.id]) return true
    if (!lessonTopicsComplete(lesson)) return false
    if (videoGate?.hasMandatoryVideo(lesson.id) && !videoGate.isWatched(lesson.id)) return false
    if (!lesson.carriesExam) return true
    const exam = matchChapterExam(exams, lesson.chapterTitle, lesson.stage)
    // Lessons without an authored exam gate on topics + video alone.
    if (!exam) return true
    return examPassed(exam)
  })

  return lessons.map((_, i) => {
    if (complete[i]) return 'completed'
    if (i === 0 || complete[i - 1]) return 'in_progress'
    return 'locked'
  })
}

export function roadmapProgress(statuses: LessonStatus[]): { completed: number; total: number; percent: number } {
  const completed = statuses.filter((s) => s === 'completed').length
  const total = statuses.length
  return { completed, total, percent: total === 0 ? 0 : Math.round((completed / total) * 100) }
}
