import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createApp } from '../src/app.js'
import { prisma } from '../src/utils/prisma.js'
import {
  deterministicInterviewAnswerReview,
  type InterviewAnswerInput
} from '../src/services/interview-evaluation.service.js'
import { createActiveUser, resetDb, VALID_PASSWORD } from './helpers/db.js'

const app = createApp()

const baseInput: InterviewAnswerInput = {
  questionPublicId: 'q1',
  question: 'Tell me about a time you improved the performance of a web application.',
  dimension: 'problem_solving',
  guidance: [
    'Measured the baseline performance before making changes',
    'Identified the actual bottleneck using profiling or monitoring',
    'Applied a specific optimisation and explained the trade-off',
    'Verified the improvement with metrics after the change'
  ],
  answer: '',
  stage: 'technical',
  careerName: 'Frontend Developer'
}

describe('deterministic interview answer review', () => {
  it('scores a specific, evidenced answer above a vague one', () => {
    const strong = deterministicInterviewAnswerReview({
      ...baseInput,
      answer: [
        'At my previous role I owned the checkout page. First, I measured the baseline: the page loaded in 4.2 seconds and 38% of users abandoned before paying.',
        'I profiled the bundle and found the actual bottleneck was a 900 KB charting library loaded on every route.',
        'I replaced it with a lazy-loaded lightweight chart, added route-level code splitting, and cached API responses for 60 seconds.',
        'As a result, load time dropped to 1.8 seconds and checkout completion improved by 19% over six weeks.',
        'I verified the improvement with Lighthouse and real-user monitoring before and after the release.'
      ].join('\n\n')
    })
    const weak = deterministicInterviewAnswerReview({
      ...baseInput,
      answer: 'I think I am good at this. I can learn quickly and I am a hard worker. I would just do my best.'
    })

    expect(strong.score).toBeGreaterThan(weak.score)
    expect(strong.score).toBeGreaterThanOrEqual(65)
    expect(weak.score).toBeLessThan(45)
    expect(strong.whyThisScore.length).toBeGreaterThan(0)
    expect(weak.mistakes.length).toBeGreaterThan(0)
    expect(weak.feedback.length).toBeGreaterThan(0)
    expect(weak.studyTopics.length).toBeGreaterThanOrEqual(2)
    expect(weak.gradedBy).toBe('deterministic')
  })

  it('identifies the missing rubric points by name', () => {
    const review = deterministicInterviewAnswerReview({
      ...baseInput,
      answer: 'I improved the page by making it faster. Users were happier afterwards and the team shipped it.'
    })

    expect(review.mistakes.join(' ').toLowerCase()).toContain('missing key point')
    expect(review.mistakes.join(' ').toLowerCase()).toContain('baseline')
    expect(review.studyTopics.some((topic) => /baseline|performance|bottleneck/i.test(topic.topic))).toBe(true)
  })
})

describe('POST /api/v1/interview/:sessionPublicId/submit', () => {
  let token: string
  let userId: bigint
  let sessionPublicId: string
  let questions: Array<{ publicId: string; prompt: string; dimension: string }>

  beforeAll(async () => {
    await resetDb()
    const user = await createActiveUser('interview-review@example.com')
    userId = user.internalId

    const login = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: user.email, password: VALID_PASSWORD })
    token = login.body.data.accessToken

    await request(app)
      .post('/api/v1/careers/select')
      .set('Authorization', `Bearer ${token}`)
      .send({ slug: 'frontend-developer' })
      .expect(200)

    const started = await request(app)
      .post('/api/v1/interview/start')
      .set('Authorization', `Bearer ${token}`)
      .send({ stage: 'hr' })
      .expect(201)

    sessionPublicId = started.body.data.publicId
    questions = started.body.data.questions
  })

  afterAll(async () => {
    await prisma.user.delete({ where: { id: userId } }).catch(() => undefined)
  })

  it('returns a full review for every answer and persists it on the session', async () => {
    const answers = questions.map((question, index) => ({
      questionPublicId: question.publicId,
      body: [
        `For question ${index + 1}, at my previous role I worked on a project with a clear constraint.`,
        'First, I gathered context from the users and measured the baseline. Then I identified the main bottleneck and compared two options.',
        'For example, I chose the lower-risk option because it could ship in two weeks, and I reduced the error rate by 18%.',
        'I verified the result with monitoring and shared the outcome with the team.'
      ].join(' ')
    }))

    const res = await request(app)
      .post(`/api/v1/interview/${sessionPublicId}/submit`)
      .set('Authorization', `Bearer ${token}`)
      .send({ answers })

    expect(res.status).toBe(200)
    expect(res.body.data.score).toBeGreaterThanOrEqual(0)
    expect(res.body.data.score).toBeLessThanOrEqual(100)
    expect(res.body.data.perAnswer).toHaveLength(questions.length)
    for (const item of res.body.data.perAnswer) {
      expect(typeof item.score).toBe('number')
      expect(typeof item.verdict).toBe('string')
      expect(['ai', 'deterministic']).toContain(item.gradedBy)
    }

    const detail = await request(app)
      .get(`/api/v1/interview/${sessionPublicId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(detail.status).toBe(200)
    expect(detail.body.data.answerReviews).toHaveLength(questions.length)
    for (const review of detail.body.data.answerReviews) {
      expect(typeof review.score).toBe('number')
      expect(review.whyThisScore.length).toBeGreaterThan(0)
      expect(review.mistakes.length).toBeGreaterThan(0)
      expect(review.feedback.length).toBeGreaterThan(0)
      expect(review.studyTopics.length).toBeGreaterThanOrEqual(2)
      expect(review.questionPublicId).toBeTruthy()
    }
    expect(detail.body.data.evaluation).not.toBeNull()
    expect(detail.body.data.evaluation.overallScore).toBe(res.body.data.score)

    const persisted = await prisma.interviewSession.findUnique({
      where: { publicId: sessionPublicId }
    })
    expect(persisted?.status).toBe('completed')
    expect(Array.isArray(persisted?.answerReviews)).toBe(true)
  })
})
