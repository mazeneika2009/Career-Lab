import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '../src/utils/prisma.js'
import { ulid } from '../src/utils/ids.js'
import {
  getPerformanceReview,
  getSkillProgress,
  recomputeSkillProgress
} from '../src/services/progress.service.js'
import { createActiveUser, resetDb } from './helpers/db.js'

async function evaluation(input: {
  userId: bigint
  careerId: bigint
  targetType: 'assignment' | 'practical_exam' | 'sim_task' | 'communication' | 'interview'
  targetPublicId: string
  targetTitle: string
  score: number
  skillLevels?: Array<{ skill: string; level: string; percent: number }>
}) {
  return prisma.evaluation.create({
    data: {
      publicId: ulid(),
      userId: input.userId,
      careerId: input.careerId,
      targetType: input.targetType,
      targetPublicId: input.targetPublicId,
      targetTitle: input.targetTitle,
      overallScore: input.score,
      verdict: `Scored ${input.score}/100.`,
      strengths: [],
      weaknesses: [],
      errorNotes: [],
      recommendations: [],
      skillLevels: input.skillLevels ?? [],
      nextArea: 'Keep practising.'
    }
  })
}

describe('event-based skill progress aggregation', () => {
  let userId: bigint
  let careerId: bigint

  beforeAll(async () => {
    await resetDb()
    const user = await createActiveUser('progress-aggregation@example.com')
    userId = user.internalId

    const career = await prisma.career.findUniqueOrThrow({ where: { slug: 'frontend-developer' } })
    careerId = career.id
    await prisma.studentCareer.create({
      data: { userId, careerId, active: true }
    })

    const htmlTopic = await prisma.topic.findFirstOrThrow({
      where: { title: 'HTML & Semantic Structure', chapter: { book: { careerId } } }
    })
    await prisma.topicProgress.create({
      data: { userId, topicId: htmlTopic.id, status: 'completed', completedAt: new Date() }
    })

    // Theory exam covers HTML, CSS and JavaScript only.
    const theoryExam = await prisma.exam.findFirstOrThrow({ where: { careerId, kind: 'theory' } })
    await prisma.examAttempt.create({
      data: {
        publicId: ulid(),
        examId: theoryExam.id,
        userId,
        answers: [],
        score: 80,
        passed: true,
        submittedAt: new Date()
      }
    })

    // Practical rubric exercises React, TypeScript, Accessibility and two
    // dimensions that do not map to a declared career skill.
    const practicalExam = await prisma.exam.findFirstOrThrow({
      where: { careerId, kind: 'practical' }
    })
    await prisma.examAttempt.create({
      data: {
        publicId: ulid(),
        examId: practicalExam.id,
        userId,
        answers: 'practical submission',
        score: 70,
        passed: true,
        submittedAt: new Date()
      }
    })
    await evaluation({
      userId,
      careerId,
      targetType: 'practical_exam',
      targetPublicId: practicalExam.publicId,
      targetTitle: practicalExam.title,
      score: 70
    })

    const assignment = await prisma.assignment.findFirstOrThrow({
      where: { careerId, title: 'React Form with Validation' }
    })
    await evaluation({
      userId,
      careerId,
      targetType: 'assignment',
      targetPublicId: assignment.publicId,
      targetTitle: assignment.title,
      score: 90
    })

    const simTask = await prisma.simTask.findFirstOrThrow({
      where: { careerId, title: 'New settings section' }
    })
    const userSimTask = await prisma.userSimTask.create({
      data: {
        publicId: ulid(),
        userId,
        simTaskId: simTask.id,
        status: 'completed',
        response: 'Implemented the settings section.',
        submittedAt: new Date()
      }
    })
    await evaluation({
      userId,
      careerId,
      targetType: 'sim_task',
      targetPublicId: userSimTask.publicId,
      targetTitle: simTask.title,
      score: 85
    })

    const scenario = await prisma.commScenario.findFirstOrThrow({
      where: { careerId, kind: 'team' }
    })
    const thread = await prisma.commThread.create({
      data: {
        publicId: ulid(),
        userId,
        scenarioId: scenario.id,
        messages: [],
        status: 'completed'
      }
    })
    await evaluation({
      userId,
      careerId,
      targetType: 'communication',
      targetPublicId: thread.publicId,
      targetTitle: 'Team exchange — Backend Engineer',
      score: 75
    })

    // Two technical interviews: the latest evaluated score must win, not the
    // average of both sessions.
    const first = await prisma.interviewSession.create({
      data: {
        publicId: ulid(),
        userId,
        careerId,
        stage: 'technical',
        questions: [],
        status: 'completed',
        score: 72,
        completedAt: new Date(Date.now() - 60_000)
      }
    })
    await evaluation({
      userId,
      careerId,
      targetType: 'interview',
      targetPublicId: first.publicId,
      targetTitle: 'Frontend Developer Technical Interview',
      score: 72
    })

    const latest = await prisma.interviewSession.create({
      data: {
        publicId: ulid(),
        userId,
        careerId,
        stage: 'technical',
        questions: [],
        status: 'completed',
        score: 91,
        completedAt: new Date()
      }
    })
    await evaluation({
      userId,
      careerId,
      targetType: 'interview',
      targetPublicId: latest.publicId,
      targetTitle: 'Frontend Developer Technical Interview',
      score: 91
    })
  })

  afterAll(async () => {
    await prisma.user.delete({ where: { id: userId } }).catch(() => undefined)
  })

  it('attributes each exam score only to the skills that exam covered', async () => {
    const data = await getSkillProgress(userId)
    const bySkill = new Map(data.skills.map((skill) => [skill.skill, skill]))

    expect(bySkill.get('HTML')?.learningDone).toBe(1)
    expect(bySkill.get('HTML')?.learningTotal).toBe(1)
    expect(bySkill.get('HTML')?.examPerformance).toBe(80)

    expect(bySkill.get('CSS')?.learningDone).toBe(0)
    expect(bySkill.get('CSS')?.examPerformance).toBe(80)

    // The old common-word matcher wrote the global theory average to every
    // skill. Git was not part of this exam and must stay null.
    expect(bySkill.get('Git & GitHub')?.examPerformance).toBeNull()
  })

  it('aggregates practical, assignment and simulation evidence per skill', async () => {
    const data = await getSkillProgress(userId)
    const bySkill = new Map(data.skills.map((skill) => [skill.skill, skill]))

    expect(bySkill.get('React')?.practicalPerformance).toBe(70)
    expect(bySkill.get('React')?.assignmentPerformance).toBe(90)
    expect(bySkill.get('React')?.simulationPerformance).toBe(85)
    expect(bySkill.get('React')?.learningDone).toBe(0)

    expect(bySkill.get('TypeScript')?.practicalPerformance).toBe(70)
    expect(bySkill.get('TypeScript')?.assignmentPerformance).toBe(90)
    expect(bySkill.get('Accessibility')?.practicalPerformance).toBe(70)
    expect(bySkill.get('Accessibility')?.assignmentPerformance).toBe(90)

    // Skills that the practical/assignment never exercised stay null instead
    // of inheriting an unrelated global average.
    expect(bySkill.get('HTML')?.practicalPerformance).toBeNull()
    expect(bySkill.get('CSS')?.assignmentPerformance).toBeNull()
  })

  it('surfaces communication and latest interview evidence as their own skills', async () => {
    const data = await getSkillProgress(userId)
    const bySkill = new Map(data.skills.map((skill) => [skill.skill, skill]))

    expect(bySkill.get('Team communication')?.communicationPerformance).toBe(75)
    expect(bySkill.get('Team communication')?.percent).toBe(75)
    expect(bySkill.get('Technical interview')?.interviewPerformance).toBe(91)
    expect(bySkill.get('Technical interview')?.percent).toBe(91)
  })

  it('computes performance areas from real evidence and uses the latest technical interview', async () => {
    const review = await getPerformanceReview(userId)

    expect(review.performance.theory).toBe(80)
    expect(review.performance.practical).toBe(70)
    expect(review.performance.assignments).toBe(90)
    expect(review.performance.communication).toBe(75)
    expect(review.performance.simulation).toBe(85)
    expect(review.performance.technicalInterview).toBe(91)
    expect(review.performance.learning).toBeGreaterThan(0)

    expect(review.detail.assessmentHistory).toHaveLength(7)
    expect(review.detail.assessmentHistory[0]?.category).toBe('interview')
    expect(review.detail.assessmentHistory[0]?.score).toBe(91)
    expect(review.detail.communicationThreads).toBe(1)
    expect(review.detail.simulationSubmissions).toBe(1)
    expect(review.detail.interviews).toBe(2)
  })

  it('keeps a computation snapshot for the dashboard without stale zero rows', async () => {
    const computation = await recomputeSkillProgress(userId, careerId)

    expect(computation).not.toBeNull()
    expect(computation?.skills.some((skill) => skill.skill === 'HTML')).toBe(true)
    expect(computation?.snapshot.theoryAvg).toBe(80)
    expect(computation?.snapshot.technicalInterviewLatest).toBe(91)

    const stored = await prisma.skillProgress.findMany({ where: { userId, careerId } })
    expect(stored.some((row) => row.skill === 'Team communication' && row.communicationAvg === 75)).toBe(true)
    expect(stored.some((row) => row.skill === 'Technical interview' && row.interviewAvg === 91)).toBe(true)
  })
})

describe('historical practical evaluations without an exam attempt', () => {
  let userId: bigint

  beforeAll(async () => {
    await resetDb()
    const user = await createActiveUser('progress-historical-practical@example.com')
    userId = user.internalId

    const career = await prisma.career.findUniqueOrThrow({ where: { slug: 'frontend-developer' } })
    await prisma.studentCareer.create({
      data: { userId, careerId: career.id, active: true }
    })

    const practicalExam = await prisma.exam.findFirstOrThrow({
      where: { careerId: career.id, kind: 'practical' }
    })

    // Historical evidence: the evaluation survived a content reseed, so its
    // target public id no longer matches a live exam and no attempt exists.
    await evaluation({
      userId,
      careerId: career.id,
      targetType: 'practical_exam',
      targetPublicId: ulid(),
      targetTitle: practicalExam.title,
      score: 64,
      skillLevels: [{ skill: 'HTML', level: 'Developing', percent: 64 }]
    })
  })

  afterAll(async () => {
    await prisma.user.delete({ where: { id: userId } }).catch(() => undefined)
  })

  it('keeps the score, status and skill evidence instead of dropping it', async () => {
    const review = await getPerformanceReview(userId)

    expect(review.performance.practical).toBe(64)
    expect(review.detail.assessmentHistory).toHaveLength(1)
    expect(review.detail.assessmentHistory[0]).toMatchObject({
      category: 'practical',
      score: 64,
      status: 'failed'
    })

    const data = await getSkillProgress(userId)
    expect(data.skills.some((skill) => skill.practicalPerformance === 64)).toBe(true)
  })
})

