import { createApp } from './app.js'
import { env } from './config/env.js'
import { logger } from './utils/logger.js'
import { prisma } from './utils/prisma.js'
import { warmUpSmtp } from './services/email.service.js'

const app = createApp()
const server = app.listen(env.PORT, () => {
  logger.info({ port: env.PORT, appEnv: env.APP_ENV }, 'api listening')
  void warmUpSmtp()
})

const SHUTDOWN_TIMEOUT_MS = 10_000

function shutdown(signal: string): void {
  logger.info({ signal }, 'shutting down')
  server.close(() => {
    void prisma
      .$disconnect()
      .catch((error: unknown) => logger.error({ err: error }, 'prisma disconnect failed'))
      .finally(() => process.exit(0))
  })
  setTimeout(() => {
    logger.warn('graceful shutdown timed out, forcing exit')
    process.exit(1)
  }, SHUTDOWN_TIMEOUT_MS).unref()
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))
