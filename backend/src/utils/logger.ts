import pino from 'pino'
import { env } from '../config/env.js'

const REDACT_PATHS = [
  'password',
  'currentPassword',
  'newPassword',
  'token',
  'refreshToken',
  'accessToken',
  '*.password',
  '*.currentPassword',
  '*.newPassword',
  '*.token',
  '*.refreshToken',
  '*.accessToken',
  'req.headers.authorization',
  'req.headers.cookie',
  'headers.authorization',
  'headers.cookie'
]

export const logger = pino({
  level: env.LOG_LEVEL,
  redact: { paths: REDACT_PATHS, censor: '[REDACTED]' },
  ...(env.NODE_ENV === 'development'
    ? { transport: { target: 'pino-pretty', options: { singleLine: true, colorize: true } } }
    : {})
})
