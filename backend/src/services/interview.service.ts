import { prisma } from '../utils/prisma.js'
import { AppError } from '../utils/http.js'
import { ulid } from '../utils/ids.js'
import type { Evaluation, InterviewSession, Prisma } from '@prisma/client'
import {
  INTERVIEW_PASS_SCORE,
  normalizeInterviewStage,
  type InterviewStage
} from '../config/constants.js'
import { requireActiveCareer, notify } from './domain.helpers.js'
import { buildEvaluationDraft, recordEvaluation } from './evaluator.js'
import {
  evaluateInterviewAnswers,
  interviewDimensionLabel,
  type InterviewAnswerReview
} from './interview-evaluation.service.js'
import { computeSimulationGate } from './interview-gate.service.js'
import { recordInterviewVerification } from './interview-verification.service.js'
import { recomputeSkillProgress } from './progress.service.js'
import { mirrorWorkplaceState } from './workplace-progress.service.js'

const DIMENSIONS = ['technical_knowledge', 'problem_solving', 'professional_reasoning', 'communication'] as const

const STAGE_TARGET: Record<InterviewStage, number> = {
  hr: 5,
  technical: 6
}

const STAGE_LABEL: Record<InterviewStage, string> = {
  hr: 'Virtual (HR) Interview',
  technical: 'Technical Interview'
}

/**
 * Public interview payload. Prisma's InterviewSession carries internal BigInt
 * IDs (id, userId, careerId) that JSON.stringify cannot serialize, so every
 * response must cross this boundary as a plain, whitelisted DTO.
 */
export interface InterviewSessionView {
  publicId: string
  stage: InterviewStage
  status: InterviewSession['status']
  startedAt: Date
  completedAt: Date | null
  score: number | null
  questions: Array<{ publicId: string; dimension: string; prompt: string }>
  answers: Array<{ questionPublicId: string; body: string }> | null
  answerReviews: InterviewAnswerReview[] | null
  evaluation: {
    overallScore: number
    verdict: string
    strengths: unknown
    weaknesses: unknown
    errorNotes: unknown
    recommendations: unknown
    skillLevels: unknown
    nextArea: string
  } | null
}

export function toInterviewSessionView(
  session: InterviewSession,
  evaluation: Evaluation | null = null
): InterviewSessionView {
  return {
    publicId: session.publicId,
    stage: normalizeInterviewStage(session.stage),
    status: session.status,
    startedAt: session.startedAt,
    completedAt: session.completedAt,
    score: session.score,
    questions: session.questions as InterviewSessionView['questions'],
    answers: session.answers as InterviewSessionView['answers'],
    answerReviews: (session.answerReviews as InterviewAnswerReview[] | null) ?? null,
    evaluation: evaluation
      ? {
          overallScore: evaluation.overallScore,
          verdict: evaluation.verdict,
          strengths: evaluation.strengths,
          weaknesses: evaluation.weaknesses,
          errorNotes: evaluation.errorNotes,
          recommendations: evaluation.recommendations,
          skillLevels: evaluation.skillLevels,
          nextArea: evaluation.nextArea
        }
      : null
  }
}

/** Latest interview session for the active career and stage, if any. */
export async function getCurrentInterview(userId: bigint, stage: InterviewStage = 'technical') {
  const active = await requireActiveCareer(userId)
  const session = await prisma.interviewSession.findFirst({
    where: { userId, careerId: active.career.id, stage },
    orderBy: { startedAt: 'desc' }
  })
  return session
}

function selectQuestions<T extends { dimension: string }>(pool: T[], stage: InterviewStage): T[] {
  const target = Math.min(STAGE_TARGET[stage], pool.length)
  if (stage === 'hr') return pool.slice(0, target)

  const picked: T[] = []
  for (const dim of DIMENSIONS) {
    const candidate = pool.find((question) => question.dimension === dim && !picked.includes(question))
    if (candidate) picked.push(candidate)
  }
  for (const question of pool) {
    if (picked.length >= target) break
    if (!picked.includes(question)) picked.push(question)
  }
  return picked.slice(0, target)
}

/**
 * Open an interview stage. A dimension-balanced technical panel is snapshotted
 * into the session so it cannot be gamed between answers. The technical stage
 * is refused server-side until the virtual/HR stage has been passed.
 */
export async function startInterview(userId: bigint, stage: InterviewStage = 'technical') {
  const active = await requireActiveCareer(userId)

  if (stage === 'technical') {
    const gate = await computeSimulationGate(userId, active.career.id, active.career.slug)
    if (gate.hr.status !== 'passed') {
      throw new AppError(
        403,
        'TECHNICAL_INTERVIEW_LOCKED',
        'Pass the virtual interview before starting the technical interview.',
        { gate }
      )
    }
  }

  const existing = await prisma.interviewSession.findMany({
    where: { userId, careerId: active.career.id, stage },
    orderBy: { startedAt: 'desc' }
  })

  const openSession = existing.find((session) => session.status === 'in_progress')
  if (openSession) return toInterviewSessionView(openSession)

  const passedSession = existing.find(
    (session) => session.status === 'completed' && (session.score ?? 0) >= INTERVIEW_PASS_SCORE
  )
  if (passedSession) return toInterviewSessionView(passedSession)

  const pool = await prisma.interviewQuestion.findMany({
    where: { careerId: active.career.id, stage },
    orderBy: { order: 'asc' }
  })
  if (pool.length === 0) {
    throw AppError.notFound(
      stage === 'hr'
        ? 'No virtual interview questions are published for this career yet.'
        : 'No technical interview questions are published for this career yet.'
    )
  }

  const picked = selectQuestions(pool, stage)

  const session = await prisma.interviewSession.create({
    data: {
      publicId: ulid(),
      userId,
      careerId: active.career.id,
      stage,
      questions: picked.map((q) => ({
        publicId: q.publicId,
        dimension: q.dimension,
        prompt: q.prompt
      }))
    }
  })

  await notify(
    userId,
    'interview_available',
    stage === 'hr' ? 'Virtual interview scheduled' : 'Technical interview scheduled',
    stage === 'hr'
      ? `Your ${active.career.name} virtual screening is ready. Answer each question thoroughly — passing unlocks the technical interview.`
      : `Your ${active.career.name} technical interview is ready. Answer each question thoroughly.`,
    stage === 'hr' ? '/interview/hr' : '/interview/technical'
  )
  return toInterviewSessionView(session)
}

export async function getInterview(userId: bigint, sessionPublicId: string) {
  const active = await requireActiveCareer(userId)
  const session = await prisma.interviewSession.findUnique({ where: { publicId: sessionPublicId } })
  if (!session || session.careerId !== active.career.id) throw AppError.notFound('Interview not found.')

  const evaluation = await prisma.evaluation.findUnique({
    where: {
      userId_targetType_targetPublicId: { userId, targetType: 'interview', targetPublicId: session.publicId }
    }
  })

  return toInterviewSessionView(session, evaluation)
}

/** Submit all answers at once; each answer gets an AI/rubric review. */
export async function submitInterviewAnswers(
  userId: bigint,
  sessionPublicId: string,
  answers: Array<{ questionPublicId: string; body: string }>
) {
  const active = await requireActiveCareer(userId)
  const session = await prisma.interviewSession.findUnique({ where: { publicId: sessionPublicId } })
  if (!session || session.careerId !== active.career.id) throw AppError.notFound('Interview not found.')
  if (session.status === 'completed') throw new AppError(409, 'INTERVIEW_CLOSED', 'This interview has already been completed.')

  const stage = normalizeInterviewStage(session.stage)
  if (stage === 'technical') {
    const gate = await computeSimulationGate(userId, active.career.id, active.career.slug)
    if (gate.hr.status !== 'passed') {
      throw new AppError(
        403,
        'TECHNICAL_INTERVIEW_LOCKED',
        'Pass the virtual interview before submitting the technical interview.',
        { gate }
      )
    }
  }

  const questions = session.questions as Array<{ publicId: string; dimension: string; prompt: string }>
  const questionIds = new Set(questions.map((question) => question.publicId))
  const answerByPublicId = new Map(answers.map((answer) => [answer.questionPublicId, answer.body]))
  const answeredIds = new Set(answers.map((answer) => answer.questionPublicId))
  if (
    answers.length !== questions.length ||
    answeredIds.size !== answers.length ||
    answers.some((answer) => !questionIds.has(answer.questionPublicId))
  ) {
    throw AppError.validation('Answer every interview question before submitting.')
  }

  // Guidance points live on the question rows and never leave the server.
  const guidanceByPublicId = new Map<string, string[]>()
  const rows = await prisma.interviewQuestion.findMany({
    where: { careerId: active.career.id, publicId: { in: questions.map((q) => q.publicId) } }
  })
  for (const row of rows) {
    guidanceByPublicId.set(
      row.publicId,
      Array.isArray(row.guidance)
        ? (row.guidance as unknown[]).filter((point): point is string => typeof point === 'string')
        : []
    )
  }

  const reviews = await evaluateInterviewAnswers(
    questions.map((question) => ({
      questionPublicId: question.publicId,
      question: question.prompt,
      dimension: question.dimension,
      guidance: guidanceByPublicId.get(question.publicId) ?? [],
      answer: answerByPublicId.get(question.publicId) ?? '',
      stage,
      careerName: active.career.name
    }))
  )

  if (reviews.length === 0) {
    throw AppError.validation('No interview answers could be reviewed. Please try again.')
  }

  const score = Math.round(
    reviews.reduce((sum, review) => sum + review.score, 0) / reviews.length
  )

  const dimensionGroups = new Map<string, number[]>()
  for (const review of reviews) {
    const scores = dimensionGroups.get(review.dimension) ?? []
    scores.push(review.score)
    dimensionGroups.set(review.dimension, scores)
  }

  const rankedDimensions = [...dimensionGroups.entries()]
    .map(([dimension, scores]) => ({
      dimension,
      average: Math.round(scores.reduce((sum, value) => sum + value, 0) / scores.length),
      count: scores.length
    }))
    .sort((a, b) => b.average - a.average)

  const outcomes = rankedDimensions.map(({ dimension, average, count }) => ({
    skill: interviewDimensionLabel(dimension),
    weight: count,
    met: average >= INTERVIEW_PASS_SCORE,
    note: `Average ${average}/100 across ${count} ${count === 1 ? 'answer' : 'answers'}.`,
    criteria: `Demonstrate ${interviewDimensionLabel(dimension)} at ${INTERVIEW_PASS_SCORE}/100 or above.`
  }))

  const questionIndex = new Map(
    questions.map((question, index) => [question.publicId, index + 1])
  )

  const weaknesses = uniqueStrings(
    reviews.flatMap((review) => {
      const number = questionIndex.get(review.questionPublicId) ?? '?'
      return review.mistakes.map((mistake) => `Q${number}: ${mistake}`)
    }),
    6
  )
  const errorNotes = uniqueStrings(
    reviews.flatMap((review) => {
      const number = questionIndex.get(review.questionPublicId) ?? '?'
      return review.mistakes.map((mistake) => `Q${number} (${review.score}/100): ${mistake}`)
    }),
    8
  )
  const strengths = uniqueStrings(reviews.flatMap((review) => review.strengths), 6)
  const recommendations = uniqueStrings(reviews.flatMap((review) => review.feedback), 6)
  const studyTopics = uniqueStrings(
    reviews.flatMap((review) => review.studyTopics.map((topic) => topic.topic)),
    5
  )

  const strongestDimension = rankedDimensions[0]
  const weakestDimension = rankedDimensions[rankedDimensions.length - 1]
  const strongestLabel = strongestDimension
    ? interviewDimensionLabel(strongestDimension.dimension)
    : 'your strongest area'
  const weakestLabel = weakestDimension
    ? interviewDimensionLabel(weakestDimension.dimension)
    : 'your weakest area'
  const passed = score >= INTERVIEW_PASS_SCORE
  const verdict = truncateText(
    passed
      ? `You scored ${score}/100 and passed the ${STAGE_LABEL[stage]}. ${strongestLabel} was your strongest dimension; keep strengthening ${weakestLabel} before the next round.`
      : `You scored ${score}/100 against the ${INTERVIEW_PASS_SCORE}/100 pass mark. ${weakestLabel} is the biggest gap; use the per-answer feedback and study plan below, then retake the interview.`,
    400
  )

  const draft = buildEvaluationDraft({
    targetType: 'interview',
    targetPublicId: session.publicId,
    targetTitle: `${active.career.name} ${STAGE_LABEL[stage]}`,
    score,
    outcomes,
    passScore: INTERVIEW_PASS_SCORE,
    careerName: active.career.name
  })

  const evaluationDraft = {
    ...draft,
    verdict,
    strengths: strengths.length > 0 ? strengths : draft.strengths,
    weaknesses: weaknesses.length > 0 ? weaknesses : draft.weaknesses,
    errorNotes: errorNotes.length > 0 ? errorNotes : draft.errorNotes,
    recommendations: recommendations.length > 0 ? recommendations : draft.recommendations,
    skillLevels: rankedDimensions.map(({ dimension, average }) => ({
      skill: interviewDimensionLabel(dimension),
      level: average >= 85 ? 'Strong' : average >= 70 ? 'Competent' : average >= 50 ? 'Developing' : 'Needs work',
      percent: average
    })),
    nextArea: truncateText(studyTopics[0] ?? draft.nextArea, 200)
  }

  const evaluation = await recordEvaluation(userId, active.career.id, evaluationDraft)

  await prisma.interviewSession.update({
    where: { id: session.id },
    data: {
      answers: answers as unknown as Prisma.InputJsonValue,
      answerReviews: reviews as unknown as Prisma.InputJsonValue,
      status: 'completed',
      score,
      completedAt: new Date()
    }
  })

  await recordInterviewVerification({
    userId,
    careerSlug: active.career.slug,
    stage,
    sessionPublicId: session.publicId,
    score,
    passed
  })

  // The technical pass is the single unlock event for both workplace modules.
  // Mirror it immediately so the state is durable even if the next page load
  // is delayed or the browser is closed.
  if (stage === 'technical' && passed) {
    void mirrorWorkplaceState({
      userId,
      careerSlug: active.career.slug,
      modules: {
        company_simulation: { unlocked: true },
        team_communication: { unlocked: true }
      }
    })
  }

  await recomputeSkillProgress(userId, active.career.id)

  if (stage === 'hr' && passed) {
    await notify(
      userId,
      'interview_available',
      'Technical interview unlocked',
      `Your virtual interview scored ${score}/100. The technical interview is now open.`,
      '/interview/technical'
    )
  } else if (stage === 'technical' && passed) {
    await notify(
      userId,
      'evaluation_available',
      'Technical interview passed',
      `Your technical interview scored ${score}/100. The company simulation and workplace channels are unlocked.`,
      '/simulation'
    )
  } else {
    await notify(
      userId,
      'evaluation_available',
      stage === 'hr' ? 'Virtual interview evaluated' : 'Technical interview evaluated',
      `Your ${stage === 'hr' ? 'virtual' : 'technical'} interview scored ${score}/100.`,
      '/evaluations'
    )
  }

  return {
    score,
    evaluationPublicId: evaluation.publicId,
    stage,
    passed,
    perAnswer: reviews.map((review) => ({
      questionPublicId: review.questionPublicId,
      score: review.score,
      passed: review.passed,
      verdict: review.verdict,
      gradedBy: review.gradedBy
    })),
    studyTopics
  }
}

function uniqueStrings(values: string[], limit: number): string[] {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))].slice(0, limit)
}

function truncateText(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text
}
