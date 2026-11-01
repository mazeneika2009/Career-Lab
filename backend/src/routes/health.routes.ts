import { Router } from 'express'
import * as controller from '../controllers/health.controller.js'

export const healthRouter = Router()

healthRouter.get('/live', controller.liveness)
healthRouter.get('/ready', controller.readiness)
