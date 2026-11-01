import { z } from 'zod'
import { SUPPORTED_TIMEZONES } from './common.validators.js'

const ULID_PATTERN = /^[0-9A-HJKMNP-TV-Z]{26}$/
const TOKEN_PATTERN = /^[A-Za-z0-9_-]{20,200}$/

export const registerSchema = z
  .object({
    fullName: z.string().trim().min(2, 'Full name is required.').max(120),
    email: z.string().trim().toLowerCase().email('Enter a valid email address.').max(320),
    password: z.string().min(12, 'Password must be at least 12 characters.').max(128),
    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: 'You must accept the terms to continue.' })
    })
  })
  .strict()

export const loginSchema = z
  .object({
    email: z.string().trim().toLowerCase().email().max(320),
    password: z.string().min(1).max(128)
  })
  .strict()

export const tokenSchema = z.object({ token: z.string().regex(TOKEN_PATTERN) }).strict()

export const emailOnlySchema = z
  .object({ email: z.string().trim().toLowerCase().email().max(320) })
  .strict()

export const passwordResetSchema = z
  .object({
    token: z.string().regex(TOKEN_PATTERN),
    password: z.string().min(12, 'Password must be at least 12 characters.').max(128)
  })
  .strict()

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1).max(128),
    newPassword: z.string().min(12, 'Password must be at least 12 characters.').max(128)
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: 'New password must differ from the current password.',
    path: ['newPassword']
  })

export const sendVerificationSchema = emailOnlySchema.partial({ email: true }).optional()

export const updateMeSchema = z
  .object({
    displayName: z.string().trim().min(2).max(120).optional(),
    timezone: z
      .string()
      .max(64)
      .refine((tz) => (SUPPORTED_TIMEZONES as readonly string[]).includes(tz), {
        message: 'Unsupported timezone.'
      })
      .optional()
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, { message: 'No changes submitted.' })

export const sessionIdParamSchema = z.object({
  sessionId: z.string().regex(ULID_PATTERN)
})

export type RegisterDto = z.infer<typeof registerSchema>
export type LoginDto = z.infer<typeof loginSchema>
export type PasswordResetDto = z.infer<typeof passwordResetSchema>
export type ChangePasswordDto = z.infer<typeof changePasswordSchema>
export type UpdateMeDto = z.infer<typeof updateMeSchema>
