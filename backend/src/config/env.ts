import { z } from 'zod'
import { config } from 'dotenv'

config()

const booleanish = z
  .enum(['true', 'false'])
  .transform((value) => value === 'true')

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  APP_ENV: z.enum(['development', 'test', 'staging', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),

  APP_WEB_URL: z.string().url().default('http://localhost:5173'),
  CORS_ORIGINS: z.string().min(1).default('http://localhost:5173'),

  DATABASE_URL: z.string().min(1),

  ACCESS_TOKEN_TTL_MINUTES: z.coerce.number().int().positive().max(60).default(15),
  SESSION_TTL_DAYS: z.coerce.number().int().positive().max(365).default(30),
  SESSION_ABSOLUTE_TTL_DAYS: z.coerce.number().int().positive().max(730).default(180),
  COOKIE_SECURE: booleanish.default('false'),

  ARGON2_MEMORY_KIB: z.coerce.number().int().positive().default(19456),
  ARGON2_TIME_COST: z.coerce.number().int().positive().default(2),
  ARGON2_PARALLELISM: z.coerce.number().int().positive().default(1),

  // Local development reads PEM files; serverless platforms such as Vercel
  // cannot bundle gitignored key files, so they inject base64-encoded PEMs.
  JWT_PRIVATE_KEY_PATH: z.string().min(1).optional(),
  JWT_PUBLIC_KEYS_DIR: z.string().min(1).optional(),
  JWT_PRIVATE_KEY_BASE64: z.string().min(1).optional(),
  JWT_PUBLIC_KEYS_BASE64: z.string().min(1).optional(),

  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().int().positive().default(587),
  SMTP_SECURE: booleanish.default('false'),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  MAIL_FROM: z.string().min(3).default('Career Lab <no-reply@localhost>'),

  // Supabase is the authoritative store for sequential lesson progress and
  // practical submissions. Server-only; never expose the service key.
  SUPABASE_URL: z.string().url().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
  SUPABASE_SECRET_KEY: z.string().min(1).optional(),
  SUPABASE_SCHEMA: z.string().regex(/^[a-z_][a-z0-9_]*$/i).default('public'),
  // Supabase is a secondary mirror; keep requests short and retry transient
  // network failures without ever blocking the student-facing request for long.
  SUPABASE_TIMEOUT_MS: z.coerce.number().int().positive().max(60_000).default(5_000),
  SUPABASE_MAX_RETRIES: z.coerce.number().int().min(0).max(6).default(2),

  // OpenAI-compatible grading provider. Optional: when absent the server
  // falls back to a deterministic code review so grading still works.
  AI_GRADING_API_URL: z.string().url().optional(),
  AI_GRADING_API_KEY: z.string().min(1).optional(),
  AI_GRADING_MODEL: z.string().min(1).default('gpt-4o-mini'),
  AI_GRADING_TIMEOUT_MS: z.coerce.number().int().positive().max(120_000).default(25_000)
})

const parsed = envSchema.safeParse(process.env)

function formatEnvError(error: z.ZodError): string {
  const fieldErrors = error.flatten().fieldErrors
  return Object.entries(fieldErrors)
    .map(([field, messages]) => `${field}: ${(messages ?? []).join(', ')}`)
    .join('; ')
}

/**
 * Non-null when the environment is invalid.
 *
 * Serverless platforms import the app before any request arrives, so a hard
 * exit here would surface as an opaque FUNCTION_INVOCATION_FAILED. Instead the
 * app boots with safe defaults and returns a structured 503 for API requests
 * (see `create-app.ts`). Local development fails fast in `server.ts`.
 */
export const envError: string | null = parsed.success ? null : formatEnvError(parsed.error)

const FALLBACK_DATABASE_URL = 'mysql://unavailable:unavailable@127.0.0.1:3306/unavailable'

// Prisma reads DATABASE_URL from process.env directly. Give it a syntactically
// valid placeholder so importing the client cannot crash before the 503 guard
// is installed. API requests never reach the database while envError is set.
if (!parsed.success && !/^mysql:\/\//i.test(process.env.DATABASE_URL ?? '')) {
  process.env.DATABASE_URL = FALLBACK_DATABASE_URL
}

export const env: z.infer<typeof envSchema> = parsed.success
  ? parsed.data
  : envSchema.parse({ DATABASE_URL: FALLBACK_DATABASE_URL })

export const corsOrigins = env.CORS_ORIGINS.split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)
