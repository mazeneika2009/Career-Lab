import { Router } from 'express'
import * as usersController from '../controllers/users.controller.js'
import { authenticate } from '../middleware/authenticate.js'
import { validate } from '../middleware/validate.js'
import { rateLimiter, userKey } from '../middleware/rate-limit.js'
import { updateMeSchema } from '../validators/auth.validators.js'

export const usersRouter = Router()

usersRouter.get(
  '/me',
  rateLimiter('standardAuthed', userKey),
  authenticate,
  usersController.getMe
)

usersRouter.patch(
  '/me',
  rateLimiter('standardAuthed', userKey),
  authenticate,
  validate({ body: updateMeSchema }),
  usersController.patchMe
)
