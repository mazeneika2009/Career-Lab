import { Router } from 'express'
import * as controller from '../controllers/job-hub.controller.js'
import { authenticate } from '../middleware/authenticate.js'
import { validate } from '../middleware/validate.js'
import { rateLimiter, userKey } from '../middleware/rate-limit.js'
import * as v from '../validators/job-hub.validators.js'

const authed = [rateLimiter('standardAuthed', userKey), authenticate] as const

export const jobHubRouter = Router()
jobHubRouter.get('/', ...authed, validate({ query: v.jobHubQuerySchema }), controller.listJobs)
jobHubRouter.post(
  '/jobs/:jobPublicId/save',
  ...authed,
  validate({ params: v.jobIdParam }),
  controller.saveJob
)
jobHubRouter.delete(
  '/jobs/:jobPublicId/save',
  ...authed,
  validate({ params: v.jobIdParam }),
  controller.unsaveJob
)
jobHubRouter.post(
  '/jobs/:jobPublicId/apply',
  ...authed,
  validate({ params: v.jobIdParam }),
  controller.applyToJob
)
