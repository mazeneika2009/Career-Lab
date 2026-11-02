import type { Request, Response } from 'express'
import { successEnvelope } from '../utils/http.js'
import type { AuthUser } from '../models/index.js'
import * as jobHub from '../services/job-hub.service.js'

function authUser(req: Request): AuthUser {
  return req.user as AuthUser
}

function queryValue(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined
}

export async function listJobs(req: Request, res: Response): Promise<void> {
  const result = await jobHub.getJobHub(authUser(req).internalId, {
    search: queryValue(req.query.search),
    location: queryValue(req.query.location),
    employmentType: queryValue(req.query.employmentType),
    experienceLevel: queryValue(req.query.experienceLevel),
    workMode: queryValue(req.query.workMode)
  })
  res.status(200).json(successEnvelope(result))
}

export async function saveJob(req: Request, res: Response): Promise<void> {
  const result = await jobHub.setSavedJob(
    authUser(req).internalId,
    String(req.params.jobPublicId),
    true
  )
  res.status(200).json(successEnvelope(result))
}

export async function unsaveJob(req: Request, res: Response): Promise<void> {
  const result = await jobHub.setSavedJob(
    authUser(req).internalId,
    String(req.params.jobPublicId),
    false
  )
  res.status(200).json(successEnvelope(result))
}

export async function applyToJob(req: Request, res: Response): Promise<void> {
  const result = await jobHub.trackJobApplication(
    authUser(req).internalId,
    String(req.params.jobPublicId)
  )
  res.status(201).json(successEnvelope(result))
}
