import { z } from 'zod'

const jobPublicId = z.string().regex(/^[0-9A-HJKMNP-TV-Z]{26}$/)

export const jobIdParam = z.object({
  jobPublicId
})

export const jobHubQuerySchema = z.object({
  search: z.string().max(120).optional(),
  location: z.string().max(120).optional(),
  employmentType: z.string().max(40).optional(),
  experienceLevel: z.string().max(40).optional(),
  workMode: z.string().max(20).optional()
})
