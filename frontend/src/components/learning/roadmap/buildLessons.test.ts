import { describe, expect, it } from 'vitest'
import type { ExamListItem, LearningPathStage } from '../../../types/domain'
import {
  MIN_LESSONS,
  buildLessons,
  examPassed,
  lessonStatuses,
  matchChapterExam,
  roadmapProgress
} from './buildLessons'

function stage(id: string, title: string, topicCount: number, completedCount = 0): LearningPathStage {
  return {
    stage: 'Beginner',
    chapterPublicId: id,
    title,
    description: `${title} description`,
    progress: { completed: completedCount, total: topicCount },
    completedTopics: completedCount,
    currentTopic: null,
    topics: Array.from({ length: topicCount }, (_, i) => ({
      publicId: `${id}-t${i}`,
      title: `${title} topic ${i + 1}`,
      minutes: 20,
      status: i < completedCount ? 'completed' : 'not_started',
      locked: false
    }))
  }
}

function exam(chapterTitle: string, passed: boolean): ExamListItem {
  return {
    publicId: `exam-${chapterTitle}`,
    title: `Theory Exam — ${chapterTitle}`,
    coverage: [],
    passScore: 70,
    durationMin: null,
    chapter: { title: chapterTitle, stage: 'Beginner' },
    attempts: passed
      ? [{ publicId: 'a1', score: 90, passed: true, startedAt: '', submittedAt: '' }]
      : [],
    bestScore: passed ? 90 : 0
  }
}

describe('buildLessons', () => {
  it(`expands a short curriculum to at least ${MIN_LESSONS} lessons`, () => {
    const lessons = buildLessons([
      stage('c1', 'Chapter One', 3),
      stage('c2', 'Chapter Two', 3),
      stage('c3', 'Chapter Three', 3),
      stage('c4', 'Chapter Four', 3)
    ])
    expect(lessons.length).toBeGreaterThanOrEqual(MIN_LESSONS)
    // Order preserved, numbering sequential.
    expect(lessons.map((l) => l.number)).toEqual(lessons.map((_, i) => i + 1))
    const allTopics = lessons.flatMap((l) => l.topics.map((t) => t.publicId))
    expect(allTopics).toHaveLength(12)
    // Exactly one lesson per chapter carries that chapter's exam.
    for (const id of ['c1', 'c2', 'c3', 'c4']) {
      expect(lessons.filter((l) => l.chapterPublicId === id && l.carriesExam)).toHaveLength(1)
    }
  })

  it('keeps one lesson per chapter when the curriculum already has 10+ chapters', () => {
    const stages = Array.from({ length: 11 }, (_, i) => stage(`c${i}`, `Chapter ${i}`, 2))
    const lessons = buildLessons(stages)
    expect(lessons).toHaveLength(11)
    expect(lessons.every((l) => l.partsTotal === 1)).toBe(true)
  })
})

describe('lessonStatuses (gated progression)', () => {
  it('locks lesson N+1 until lesson N is complete', () => {
    const lessons = buildLessons([stage('c1', 'One', 1, 1), stage('c2', 'Two', 1, 0)])
    const statuses = lessonStatuses(lessons, [])
    expect(statuses[0]).toBe('completed')
    expect(statuses[1]).toBe('in_progress')
  })

  it('locks everything behind an incomplete first lesson', () => {
    const lessons = buildLessons([stage('c1', 'One', 1, 0), stage('c2', 'Two', 1, 0)])
    expect(lessons).toHaveLength(2)
    expect(lessonStatuses(lessons, [])).toEqual(['in_progress', 'locked'])
  })

  it('requires the chapter exam to pass before completing a lesson', () => {
    const lessons = buildLessons([stage('c1', 'One', 1, 1), stage('c2', 'Two', 1, 0)])
    const withFailedExam = lessonStatuses(lessons, [exam('One', false)])
    expect(withFailedExam[0]).toBe('in_progress')
    expect(withFailedExam[1]).toBe('locked')

    const withPassedExam = lessonStatuses(lessons, [exam('One', true)])
    expect(withPassedExam[0]).toBe('completed')
    expect(withPassedExam[1]).toBe('in_progress')
  })

  it('merges optimistic passes so the timeline updates instantly', () => {
    const lessons = buildLessons([stage('c1', 'One', 1, 0), stage('c2', 'Two', 1, 0)])
    const statuses = lessonStatuses(lessons, [], { [lessons[0]!.id]: true })
    expect(statuses[0]).toBe('completed')
    expect(statuses[1]).toBe('in_progress')
  })

  it('requires the mandatory video before completing a lesson', () => {
    const lessons = buildLessons([stage('c1', 'One', 1, 1), stage('c2', 'Two', 1, 0)])
    const gate = {
      hasMandatoryVideo: (id: string) => id === lessons[0]!.id,
      isWatched: () => false
    }
    expect(lessonStatuses(lessons, [], {}, gate)).toEqual(['in_progress', 'locked'])

    const watchedGate = { ...gate, isWatched: () => true }
    expect(lessonStatuses(lessons, [], {}, watchedGate)).toEqual(['completed', 'in_progress'])
  })

  it('does not video-gate lessons without a mandatory video', () => {
    const lessons = buildLessons([stage('c1', 'One', 1, 1), stage('c2', 'Two', 1, 0)])
    const gate = { hasMandatoryVideo: () => false, isWatched: () => false }
    expect(lessonStatuses(lessons, [], {}, gate)).toEqual(['completed', 'in_progress'])
  })
})

describe('matchChapterExam / examPassed / roadmapProgress', () => {
  it('matches exams by chapter title and detects passes', () => {
    const exams = [exam('One', true)]
    expect(matchChapterExam(exams, 'One', 'Beginner')?.publicId).toBe('exam-One')
    expect(matchChapterExam(exams, 'Missing', 'Beginner')).toBeUndefined()
    expect(examPassed(exams[0])).toBe(true)
    expect(examPassed(undefined)).toBe(false)
  })

  it('computes overall progress', () => {
    expect(roadmapProgress(['completed', 'in_progress', 'locked', 'locked'])).toEqual({
      completed: 1,
      total: 4,
      percent: 25
    })
  })
})
