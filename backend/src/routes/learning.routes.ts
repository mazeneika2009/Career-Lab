import { Router } from 'express'
import * as controller from '../controllers/learning.controller.js'
import { authenticate } from '../middleware/authenticate.js'
import { validate } from '../middleware/validate.js'
import { rateLimiter, userKey } from '../middleware/rate-limit.js'
import * as v from '../validators/learning.validators.js'

const authed = [rateLimiter('standardAuthed', userKey), authenticate] as const

export const careersRouter = Router()
careersRouter.get('/', ...authed, validate({ query: v.careerQuerySchema }), controller.listCareers)
careersRouter.get('/:slug', ...authed, validate({ params: v.slugParam }), controller.getCareer)
careersRouter.post('/select', ...authed, validate({ body: v.selectCareerSchema }), controller.selectCareer)

export const learningRouter = Router()
learningRouter.get('/dashboard', ...authed, controller.getDashboard)
learningRouter.get('/learning-path', ...authed, controller.getLearningPath)
learningRouter.get('/course-flow', ...authed, controller.getCourseFlow)
learningRouter.get('/books/chapters', ...authed, controller.listBookChapters)
learningRouter.get('/chapters/:chapterPublicId/topics', ...authed, validate({ params: v.publicIdParam }), controller.getChapterTopics)
learningRouter.get('/topics/:topicPublicId', ...authed, validate({ params: v.topicIdParam }), controller.getTopicContent)
learningRouter.post('/topics/:topicPublicId/complete', ...authed, validate({ params: v.topicIdParam }), controller.completeTopic)
learningRouter.get('/videos', ...authed, validate({ query: v.videoQuerySchema }), controller.listVideos)
learningRouter.get('/practice', ...authed, validate({ query: v.practiceQuerySchema }), controller.listPractice)
learningRouter.post('/practice/:exercisePublicId/attempts', ...authed, validate({ params: v.exerciseIdParam, body: v.practiceSubmitSchema }), controller.submitPracticeAttempt)

export const examsRouter = Router()
examsRouter.get('/theory', ...authed, controller.listTheoryExams)
examsRouter.get('/practical', ...authed, controller.listPracticalExams)
examsRouter.get('/:examPublicId', ...authed, validate({ params: v.examIdParam }), controller.getExam)
examsRouter.post('/:examPublicId/attempts', ...authed, validate({ params: v.examIdParam }), controller.startExam)
examsRouter.post('/:examPublicId/theory/submit', ...authed, validate({ params: v.examIdParam, body: v.theorySubmitSchema }), controller.submitTheoryExam)
examsRouter.post('/:examPublicId/practical/submit', ...authed, validate({ params: v.examIdParam, body: v.practicalSubmitSchema }), controller.submitPracticalExam)

export const assignmentsRouter = Router()
assignmentsRouter.get('/', ...authed, controller.listAssignments)
assignmentsRouter.get('/:assignmentPublicId', ...authed, validate({ params: v.assignmentIdParam }), controller.getAssignment)
assignmentsRouter.post('/:assignmentPublicId/submissions', ...authed, validate({ params: v.assignmentIdParam, body: v.assignmentSubmitSchema }), controller.submitAssignment)

export const evaluationsRouter = Router()
evaluationsRouter.get('/', ...authed, controller.listEvaluations)

export const progressRouter = Router()
progressRouter.get('/skills', ...authed, controller.getSkillProgress)
progressRouter.get('/roadmap', ...authed, controller.getRoadmap)
progressRouter.get('/performance-review', ...authed, controller.getPerformanceReview)
progressRouter.get('/career-report', ...authed, controller.getCareerReport)

export const simulationRouter = Router()
simulationRouter.post('/start', ...authed, controller.startSimulation)
simulationRouter.get('/', ...authed, controller.simulationOverview)
simulationRouter.get('/gate', ...authed, controller.simulationGate)
simulationRouter.get('/tasks', ...authed, controller.workplaceTasks)
simulationRouter.post('/tasks/:taskPublicId/submit', ...authed, validate({ params: v.taskIdParam, body: v.taskSubmitSchema }), controller.submitWorkplaceTask)
simulationRouter.get('/threads/team', ...authed, controller.teamThreads)
simulationRouter.get('/threads/client', ...authed, controller.clientThreads)
simulationRouter.post('/threads/:threadPublicId/reply', ...authed, validate({ params: v.threadIdParam, body: v.replySchema }), controller.replyThread)
simulationRouter.get('/deadlines', ...authed, controller.deadlinesView)
simulationRouter.get('/scenarios', ...authed, controller.listScenarios)
simulationRouter.post('/scenarios/:scenarioPublicId/respond', ...authed, validate({ params: v.scenarioIdParam, body: v.scenarioRespondSchema }), controller.respondScenario)

export const interviewRouter = Router()
interviewRouter.get('/current', ...authed, validate({ query: v.interviewStageQuery }), controller.currentInterview)
interviewRouter.post('/start', ...authed, validate({ body: v.interviewStartSchema }), controller.startInterview)
interviewRouter.get('/:sessionPublicId', ...authed, validate({ params: v.sessionIdParam }), controller.getInterview)
interviewRouter.post('/:sessionPublicId/submit', ...authed, validate({ params: v.sessionIdParam, body: v.interviewSubmitSchema }), controller.submitInterview)

export const achievementsRouter = Router()
achievementsRouter.get('/portfolio', ...authed, controller.portfolio)
achievementsRouter.get('/certificate', ...authed, controller.certificateStatus)
achievementsRouter.get('/readiness', ...authed, controller.readiness)

export const notificationsRouter = Router()
notificationsRouter.get('/', ...authed, controller.notifications)
notificationsRouter.post('/read-all', ...authed, controller.notificationsReadAll)
notificationsRouter.post('/:notificationPublicId/read', ...authed, validate({ params: v.notificationIdParam }), controller.notificationRead)
