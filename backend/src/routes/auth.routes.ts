import { Router } from 'express'
import * as controller from '../controllers/auth.controller.js'
import { validate } from '../middleware/validate.js'
import { rateLimiter, userKey } from '../middleware/rate-limit.js'
import { authenticate } from '../middleware/authenticate.js'
import {
  changePasswordSchema,
  emailOnlySchema,
  loginSchema,
  passwordResetSchema,
  registerSchema,
  sendVerificationSchema,
  sessionIdParamSchema,
  tokenSchema
} from '../validators/auth.validators.js'

export const authRouter = Router()

authRouter.post(
  '/register',
  rateLimiter('authSensitive'),
  validate({ body: registerSchema }),
  controller.register
)

authRouter.post(
  '/login',
  rateLimiter('authSensitive'),
  validate({ body: loginSchema }),
  controller.login
)

authRouter.post('/refresh', rateLimiter('public'), controller.refresh)

authRouter.post(
  '/logout',
  rateLimiter('standardAuthed', userKey),
  authenticate,
  controller.logout
)

authRouter.post(
  '/logout-all',
  rateLimiter('standardAuthed', userKey),
  authenticate,
  controller.logoutAll
)

authRouter.post(
  '/email/verify',
  rateLimiter('authSensitive'),
  validate({ body: tokenSchema }),
  controller.verifyEmail
)

authRouter.post(
  '/email/send-verification',
  rateLimiter('authSensitive'),
  validate({ body: sendVerificationSchema }),
  controller.sendVerification
)

authRouter.post(
  '/password/forgot',
  rateLimiter('authSensitive'),
  validate({ body: emailOnlySchema }),
  controller.forgotPassword
)

authRouter.post(
  '/password/reset',
  rateLimiter('authSensitive'),
  validate({ body: passwordResetSchema }),
  controller.resetPassword
)

authRouter.patch(
  '/password',
  rateLimiter('standardAuthed', userKey),
  authenticate,
  validate({ body: changePasswordSchema }),
  controller.changePassword
)

authRouter.get(
  '/sessions',
  rateLimiter('standardAuthed', userKey),
  authenticate,
  controller.listSessions
)

authRouter.delete(
  '/sessions/:sessionId',
  rateLimiter('standardAuthed', userKey),
  authenticate,
  validate({ params: sessionIdParamSchema }),
  controller.revokeSession
)
