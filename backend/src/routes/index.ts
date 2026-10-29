import { Router } from 'express'
import * as controller from '../controllers/health.controller.js'
import { authRouter } from './auth.routes.js'
import { usersRouter } from './users.routes.js'
import {
  careersRouter,
  learningRouter,
  examsRouter,
  assignmentsRouter,
  evaluationsRouter,
  progressRouter,
  simulationRouter,
  interviewRouter,
  achievementsRouter,
  notificationsRouter
} from './learning.routes.js'

export const apiV1Router = Router()

apiV1Router.get('/health/live', controller.liveness)
apiV1Router.get('/health/ready', controller.readiness)
apiV1Router.use('/auth', authRouter)
apiV1Router.use('/users', usersRouter)

// Career learning + simulation platform.
apiV1Router.use('/careers', careersRouter)
apiV1Router.use('/me', learningRouter)
apiV1Router.use('/exams', examsRouter)
apiV1Router.use('/assignments', assignmentsRouter)
apiV1Router.use('/evaluations', evaluationsRouter)
apiV1Router.use('/progress', progressRouter)
apiV1Router.use('/simulation', simulationRouter)
apiV1Router.use('/interview', interviewRouter)
apiV1Router.use('/achievements', achievementsRouter)
apiV1Router.use('/notifications', notificationsRouter)
