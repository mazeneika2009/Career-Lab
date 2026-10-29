import { z } from 'zod'

export const slugParam = z.object({ slug: z.string().regex(/^[a-z0-9-]{2,80}$/) })
export const publicIdParam = z.object({
  chapterPublicId: z.string().regex(/^[0-9A-HJKMNP-TV-Z]{26}$/)
})
export const topicIdParam = z.object({
  topicPublicId: z.string().regex(/^[0-9A-HJKMNP-TV-Z]{26}$/)
})
export const examIdParam = z.object({
  examPublicId: z.string().regex(/^[0-9A-HJKMNP-TV-Z]{26}$/)
})
export const assignmentIdParam = z.object({
  assignmentPublicId: z.string().regex(/^[0-9A-HJKMNP-TV-Z]{26}$/)
})
export const exerciseIdParam = z.object({
  exercisePublicId: z.string().regex(/^[0-9A-HJKMNP-TV-Z]{26}$/)
})
export const taskIdParam = z.object({
  taskPublicId: z.string().regex(/^[0-9A-HJKMNP-TV-Z]{26}$/)
})
export const threadIdParam = z.object({
  threadPublicId: z.string().regex(/^[0-9A-HJKMNP-TV-Z]{26}$/)
})
export const scenarioIdParam = z.object({
  scenarioPublicId: z.string().regex(/^[0-9A-HJKMNP-TV-Z]{26}$/)
})
export const sessionIdParam = z.object({
  sessionPublicId: z.string().regex(/^[0-9A-HJKMNP-TV-Z]{26}$/)
})
export const notificationIdParam = z.object({
  notificationPublicId: z.string().regex(/^[0-9A-HJKMNP-TV-Z]{26}$/)
})

export const selectCareerSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]{2,80}$/)
})

export const careerQuerySchema = z.object({
  search: z.string().max(120).optional(),
  category: z.string().max(60).optional()
})

export const videoQuerySchema = z.object({
  chapter: z.string().regex(/^[0-9A-HJKMNP-TV-Z]{26}$/).optional(),
  topic: z.string().regex(/^[0-9A-HJKMNP-TV-Z]{26}$/).optional()
})

export const practiceQuerySchema = z.object({
  topic: z.string().regex(/^[0-9A-HJKMNP-TV-Z]{26}$/).optional()
})

export const practiceSubmitSchema = z.object({
  response: z.string().min(20, 'Describe your practice work (at least 20 characters).').max(20000)
})

export const theorySubmitSchema = z.object({
  answers: z.array(z.number().int().min(0).max(3)).min(1).max(50)
})

export const practicalSubmitSchema = z
  .object({
    code: z.string().max(60000).optional(),
    submission: z.string().max(60000).optional(),
    language: z.string().regex(/^[a-z0-9+#._-]{1,40}$/i).optional()
  })
  .refine(
    (value) => (value.code ?? value.submission ?? '').trim().length >= 20,
    { message: 'Write a real implementation (at least 20 characters) before submitting.' }
  )

export const assignmentSubmitSchema = z.object({
  payload: z.string().min(200, 'Your submission text is too short.').max(100000),
  links: z.array(z.string().url('Links must be valid URLs.').max(500)).max(10).optional()
})

export const taskSubmitSchema = z.object({
  response: z.string().min(60, 'Describe your task output in detail.').max(30000)
})

export const replySchema = z.object({
  message: z.string().min(5, 'Write your message.').max(8000)
})

export const scenarioRespondSchema = z.object({
  actions: z.array(z.number().int().min(0).max(30)).min(1).max(30)
})

export const interviewStageSchema = z.enum(['hr', 'technical'])

export const interviewStageQuery = z.object({
  stage: interviewStageSchema.default('technical')
})

export const interviewStartSchema = z
  .object({
    stage: interviewStageSchema.default('technical')
  })
  .default({ stage: 'technical' })

export const interviewSubmitSchema = z.object({
  answers: z
    .array(
      z.object({
        questionPublicId: z.string().regex(/^[0-9A-HJKMNP-TV-Z]{26}$/),
        body: z.string().min(30, 'Each answer needs at least 30 characters.').max(20000)
      })
    )
    .min(1)
    .max(12)
})
