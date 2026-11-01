import type { Request, Response } from 'express'
import { ERROR_CODES } from '../config/constants.js'
import { errorEnvelope } from '../utils/http.js'
import { getRequestContext } from '../middleware/request-context.js'
import { prisma } from '../utils/prisma.js'

export function liveness(_req: Request, res: Response): void {
  res.status(200).json({ status: 'ok' })
}

export async function readiness(_req: Request, res: Response): Promise<void> {
  const ctx = getRequestContext()
  try {
    await prisma.$queryRaw`SELECT 1`
    res.status(200).json({ status: 'ok' })
  } catch (error) {
    ctx.logger.error({ err: error }, 'readiness check failed')
    res.status(503).json(
      errorEnvelope(ERROR_CODES.MAINTENANCE_MODE, 'Service is not ready.', undefined, ctx.requestId)
    )
  }
}
