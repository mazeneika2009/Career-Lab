import type { Request, Response } from 'express'
import { successEnvelope } from '../utils/http.js'
import type { InterviewStage } from '../config/constants.js'
import type { AuthUser } from '../models/index.js'
import * as careers from '../services/careers.service.js'
import * as learning from '../services/learning.service.js'
import * as assessment from '../services/assessment.service.js'
import * as progress from '../services/progress.service.js'
import * as simulation from '../services/simulation.service.js'
import * as interviewSvc from '../services/interview.service.js'
import * as achievements from '../services/achievements.service.js'
import * as notificationsSvc from '../services/notifications.service.js'

function authUser(req: Request): AuthUser {
  return req.user as AuthUser
}

// Careers ---------------------------------------------------------------

export async function listCareers(req: Request, res: Response): Promise<void> {
  const result = await careers.listCareers({
    search: typeof req.query.search === 'string' ? req.query.search : undefined,
    category: typeof req.query.category === 'string' ? req.query.category : undefined
  })
  res.status(200).json(successEnvelope(result))
}

export async function getCareer(req: Request, res: Response): Promise<void> {
  const result = await careers.getCareerBySlug(String(req.params.slug))
  res.status(200).json(successEnvelope(result))
}

export async function selectCareer(req: Request, res: Response): Promise<void> {
  const result = await careers.selectCareer(authUser(req).internalId, String((req.body as { slug: string }).slug))
  res.status(200).json(successEnvelope(result))
}

// Learning --------------------------------------------------------------

export async function getDashboard(req: Request, res: Response): Promise<void> {
  const user = authUser(req)
  const name = await getUserDisplayName(user.internalId)
  const result = await learning.getDashboard(user.internalId, name)
  res.status(200).json(successEnvelope(result))
}

async function getUserDisplayName(userId: bigint): Promise<string> {
  const profile = await (await import('../utils/prisma.js')).prisma.userProfile.findUnique({ where: { userId } })
  return profile?.displayName ?? 'Student'
}

export async function getLearningPath(req: Request, res: Response): Promise<void> {
  const result = await learning.getLearningPath(authUser(req).internalId)
  res.status(200).json(successEnvelope(result))
}

/** Unified four-stage flow: lesson content → theory → practical → assignment. */
export async function getCourseFlow(req: Request, res: Response): Promise<void> {
  const user = authUser(req)
  const result = await learning.getCourseFlow(user.internalId, user.publicId)
  res.status(200).json(successEnvelope(result))
}

export async function listBookChapters(_req: Request, res: Response): Promise<void> {
  const result = await learning.listBookChapters(authUser(_req).internalId)
  res.status(200).json(successEnvelope(result))
}

export async function getChapterTopics(req: Request, res: Response): Promise<void> {
  const result = await learning.getChapterTopics(authUser(req).internalId, String(req.params.chapterPublicId))
  res.status(200).json(successEnvelope(result))
}

export async function getTopicContent(req: Request, res: Response): Promise<void> {
  const user = authUser(req)
  const result = await learning.getTopicContent(
    user.internalId,
    user.publicId,
    String(req.params.topicPublicId)
  )
  res.status(200).json(successEnvelope(result))
}

export async function completeTopic(req: Request, res: Response): Promise<void> {
  const user = authUser(req)
  const result = await learning.completeTopic(
    user.internalId,
    user.publicId,
    String(req.params.topicPublicId)
  )
  res.status(200).json(successEnvelope(result))
}

export async function listVideos(req: Request, res: Response): Promise<void> {
  const result = await learning.listVideos(authUser(req).internalId, {
    chapter: typeof req.query.chapter === 'string' ? req.query.chapter : undefined,
    topic: typeof req.query.topic === 'string' ? req.query.topic : undefined
  })
  res.status(200).json(successEnvelope(result))
}

// Practice --------------------------------------------------------------

export async function listPractice(req: Request, res: Response): Promise<void> {
  const topicParam = typeof req.query.topic === 'string' ? req.query.topic : undefined
  const result = await assessment.listPractice(authUser(req).internalId, topicParam)
  res.status(200).json(successEnvelope(result))
}

export async function submitPracticeAttempt(req: Request, res: Response): Promise<void> {
  const body = req.body as { response: string }
  const result = await assessment.submitPracticeAttempt(
    authUser(req).internalId,
    String(req.params.exercisePublicId),
    body.response
  )
  res.status(201).json(successEnvelope(result))
}

// Exams -----------------------------------------------------------------

export async function listTheoryExams(_req: Request, res: Response): Promise<void> {
  const result = await assessment.listExams(authUser(_req).internalId, 'theory')
  res.status(200).json(successEnvelope(result))
}

export async function listPracticalExams(_req: Request, res: Response): Promise<void> {
  const result = await assessment.listExams(authUser(_req).internalId, 'practical')
  res.status(200).json(successEnvelope(result))
}

export async function getExam(req: Request, res: Response): Promise<void> {
  const user = authUser(req)
  const result = await assessment.getExam(
    user.internalId,
    user.publicId,
    String(req.params.examPublicId)
  )
  res.status(200).json(successEnvelope(result))
}

export async function startExam(req: Request, res: Response): Promise<void> {
  const user = authUser(req)
  const result = await assessment.startTheoryAttempt(
    user.internalId,
    user.publicId,
    String(req.params.examPublicId)
  )
  res.status(201).json(successEnvelope(result))
}

export async function submitTheoryExam(req: Request, res: Response): Promise<void> {
  const user = authUser(req)
  const body = req.body as { answers: number[] }
  const result = await assessment.submitTheoryAttempt(
    user.internalId,
    user.publicId,
    String(req.params.examPublicId),
    body.answers
  )
  res.status(200).json(successEnvelope(result))
}

export async function submitPracticalExam(req: Request, res: Response): Promise<void> {
  const user = authUser(req)
  const body = req.body as { code?: string; submission?: string; language?: string }
  const result = await assessment.submitPracticalExam(
    user.internalId,
    user.publicId,
    String(req.params.examPublicId),
    body.code ?? body.submission ?? '',
    body.language
  )
  res.status(201).json(successEnvelope(result))
}

// Assignments & evaluations ----------------------------------------------

export async function listAssignments(req: Request, res: Response): Promise<void> {
  const user = authUser(req)
  const result = await assessment.listAssignments(user.internalId, user.publicId)
  res.status(200).json(successEnvelope(result))
}

export async function getAssignment(req: Request, res: Response): Promise<void> {
  const user = authUser(req)
  const result = await assessment.getAssignment(
    user.internalId,
    user.publicId,
    String(req.params.assignmentPublicId)
  )
  res.status(200).json(successEnvelope(result))
}

export async function submitAssignment(req: Request, res: Response): Promise<void> {
  const user = authUser(req)
  const body = req.body as { payload: string; links?: string[] }
  const result = await assessment.submitAssignment(
    user.internalId,
    user.publicId,
    String(req.params.assignmentPublicId),
    body.payload,
    Array.isArray(body.links) ? body.links.filter((l) => typeof l === 'string') : []
  )
  res.status(201).json(successEnvelope(result))
}

export async function listEvaluations(_req: Request, res: Response): Promise<void> {
  const result = await assessment.listEvaluations(authUser(_req).internalId)
  res.status(200).json(successEnvelope(result))
}

// Progress & reports ------------------------------------------------------

export async function getSkillProgress(_req: Request, res: Response): Promise<void> {
  const result = await progress.getSkillProgress(authUser(_req).internalId)
  res.status(200).json(successEnvelope(result))
}

export async function getRoadmap(_req: Request, res: Response): Promise<void> {
  const result = await progress.getRoadmap(authUser(_req).internalId)
  res.status(200).json(successEnvelope(result))
}

export async function getPerformanceReview(_req: Request, res: Response): Promise<void> {
  const result = await progress.getPerformanceReview(authUser(_req).internalId)
  res.status(200).json(successEnvelope(result))
}

export async function getCareerReport(_req: Request, res: Response): Promise<void> {
  const result = await progress.getCareerReport(authUser(_req).internalId)
  res.status(200).json(successEnvelope(result))
}

// Simulation --------------------------------------------------------------

export async function startSimulation(_req: Request, res: Response): Promise<void> {
  const result = await simulation.startSimulation(authUser(_req).internalId)
  res.status(201).json(successEnvelope(result))
}

export async function simulationOverview(_req: Request, res: Response): Promise<void> {
  const result = await simulation.getSimulationOverview(authUser(_req).internalId)
  res.status(200).json(successEnvelope(result))
}

export async function simulationGate(_req: Request, res: Response): Promise<void> {
  const result = await simulation.getSimulationGate(authUser(_req).internalId)
  res.status(200).json(successEnvelope(result))
}

export async function workplaceTasks(_req: Request, res: Response): Promise<void> {
  const result = await simulation.listWorkplaceTasks(authUser(_req).internalId)
  res.status(200).json(successEnvelope(result))
}

export async function submitWorkplaceTask(req: Request, res: Response): Promise<void> {
  const body = req.body as { response: string }
  const result = await simulation.submitWorkplaceTask(
    authUser(req).internalId,
    String(req.params.taskPublicId),
    body.response
  )
  res.status(201).json(successEnvelope(result))
}

export async function teamThreads(_req: Request, res: Response): Promise<void> {
  const result = await simulation.listThreads(authUser(_req).internalId, 'team')
  res.status(200).json(successEnvelope(result))
}

export async function clientThreads(_req: Request, res: Response): Promise<void> {
  const result = await simulation.listThreads(authUser(_req).internalId, 'client')
  res.status(200).json(successEnvelope(result))
}

export async function replyThread(req: Request, res: Response): Promise<void> {
  const body = req.body as { message: string }
  const result = await simulation.replyToThread(
    authUser(req).internalId,
    String(req.params.threadPublicId),
    body.message
  )
  res.status(201).json(successEnvelope(result))
}

export async function deadlinesView(_req: Request, res: Response): Promise<void> {
  const result = await simulation.getDeadlinesView(authUser(_req).internalId)
  res.status(200).json(successEnvelope(result))
}

export async function listScenarios(_req: Request, res: Response): Promise<void> {
  const result = await simulation.listScenarios(authUser(_req).internalId)
  res.status(200).json(successEnvelope(result))
}

export async function respondScenario(req: Request, res: Response): Promise<void> {
  const body = req.body as { actions: number[] }
  const result = await simulation.respondToScenario(
    authUser(req).internalId,
    String(req.params.scenarioPublicId),
    body.actions
  )
  res.status(201).json(successEnvelope(result))
}

// Interview ----------------------------------------------------------------

export async function startInterview(req: Request, res: Response): Promise<void> {
  const body = req.body as { stage?: InterviewStage }
  const result = await interviewSvc.startInterview(
    authUser(req).internalId,
    body.stage ?? 'technical'
  )
  res.status(201).json(successEnvelope(result))
}

export async function currentInterview(req: Request, res: Response): Promise<void> {
  const query = req.query as { stage?: InterviewStage }
  const session = await interviewSvc.getCurrentInterview(
    authUser(req).internalId,
    query.stage ?? 'technical'
  )
  if (!session) {
    res.status(200).json(successEnvelope(null))
    return
  }
  const result = await interviewSvc.getInterview(authUser(req).internalId, session.publicId)
  res.status(200).json(successEnvelope(result))
}

export async function getInterview(req: Request, res: Response): Promise<void> {
  const result = await interviewSvc.getInterview(authUser(req).internalId, String(req.params.sessionPublicId))
  res.status(200).json(successEnvelope(result))
}

export async function submitInterview(req: Request, res: Response): Promise<void> {
  const body = req.body as { answers: Array<{ questionPublicId: string; body: string }> }
  const result = await interviewSvc.submitInterviewAnswers(
    authUser(req).internalId,
    String(req.params.sessionPublicId),
    body.answers
  )
  res.status(200).json(successEnvelope(result))
}

// Achievements ----------------------------------------------------------------

export async function portfolio(_req: Request, res: Response): Promise<void> {
  const result = await achievements.getPortfolio(authUser(_req).internalId)
  res.status(200).json(successEnvelope(result))
}

export async function certificateStatus(_req: Request, res: Response): Promise<void> {
  const result = await achievements.getCertificateStatus(authUser(_req).internalId)
  res.status(200).json(successEnvelope(result))
}

export async function readiness(_req: Request, res: Response): Promise<void> {
  const result = await achievements.getReadiness(authUser(_req).internalId)
  res.status(200).json(successEnvelope(result))
}

// Notifications ----------------------------------------------------------------

export async function notifications(_req: Request, res: Response): Promise<void> {
  const result = await notificationsSvc.listNotifications(authUser(_req).internalId)
  res.status(200).json(successEnvelope(result))
}

export async function notificationRead(req: Request, res: Response): Promise<void> {
  await notificationsSvc.markRead(authUser(req).internalId, String(req.params.notificationPublicId))
  res.status(204).send()
}

export async function notificationsReadAll(_req: Request, res: Response): Promise<void> {
  await notificationsSvc.markAllRead(authUser(_req).internalId)
  res.status(204).send()
}
