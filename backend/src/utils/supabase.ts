import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { env } from '../config/env.js'
import { logger } from './logger.js'

/**
 * Server-only Supabase admin client.
 *
 * Progress writes and gating reads must use the service-role key; the browser
 * never receives this client or its credentials. When Supabase is not
 * configured (local tests/development), callers fall back to MySQL-derived
 * state and the API still works.
 *
 * Supabase is a *mirror*, not the primary store. Every call therefore has a
 * hard timeout and transient network failures are retried with jittered
 * exponential backoff. A lost mirror must never take the student flow down.
 */
let client: SupabaseClient | null = null

export interface SupabaseErrorLike {
  message: string
  code?: string
  details?: string
  hint?: string
}

export interface SupabaseResult<T> {
  data: T | null
  error: SupabaseErrorLike | null
}

export interface SupabaseRetryOptions {
  /** Total attempts, including the first one. Defaults to SUPABASE_MAX_RETRIES + 1. */
  attempts?: number
  /** Base backoff in milliseconds. Defaults to 300ms. */
  baseDelayMs?: number
  /** Label used in retry logs. */
  label?: string
}

const TRANSIENT_CODES = new Set([
  'ECONNRESET',
  'ECONNREFUSED',
  'ETIMEDOUT',
  'EAI_AGAIN',
  'ENOTFOUND',
  'ENETUNREACH',
  'EHOSTUNREACH',
  'EPIPE',
  'UND_ERR_CLOSED',
  'UND_ERR_CONNECT_TIMEOUT',
  'UND_ERR_HEADERS_TIMEOUT',
  'UND_ERR_BODY_TIMEOUT',
  'UND_ERR_SOCKET',
  'ABORT_ERR'
])

export function normalizedSupabaseUrl(): string {
  return (env.SUPABASE_URL ?? '').replace(/\/+$/, '')
}

export function supabaseConfigured(): boolean {
  return Boolean(
    env.SUPABASE_URL && (env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SECRET_KEY)
  )
}

/**
 * Add a hard timeout to Supabase's fetch calls. supabase-js exposes the
 * platform fetch through `global.fetch`; wrapping it keeps every query from
 * hanging forever when the network drops mid-request.
 */
const supabaseFetch: typeof fetch = async (input, init) => {
  const controller = new AbortController()
  const timer = setTimeout(
    () => controller.abort(new Error(`Supabase request timed out after ${env.SUPABASE_TIMEOUT_MS}ms`)),
    env.SUPABASE_TIMEOUT_MS
  )
  const upstream = init?.signal
  const forwardAbort = (): void => controller.abort(upstream?.reason)

  if (upstream) {
    if (upstream.aborted) forwardAbort()
    else upstream.addEventListener('abort', forwardAbort, { once: true })
  }

  try {
    return await fetch(input, { ...init, signal: controller.signal })
  } finally {
    clearTimeout(timer)
    upstream?.removeEventListener('abort', forwardAbort)
  }
}

export function supabaseAdmin(): SupabaseClient {
  if (!supabaseConfigured()) {
    throw new Error('Supabase is not configured.')
  }
  if (!client) {
    client = createClient(
      normalizedSupabaseUrl(),
      (env.SUPABASE_SERVICE_ROLE_KEY ?? env.SUPABASE_SECRET_KEY) as string,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false
        },
        global: {
          fetch: supabaseFetch,
          headers: { 'x-application-name': 'career-lab-api' }
        }
      }
    )
  }
  return client
}

export function supabaseSchema(): string {
  return env.SUPABASE_SCHEMA
}

function errorCode(error: unknown, depth = 0): string | undefined {
  if (!error || typeof error !== 'object' || depth > 4) return undefined
  const code = (error as { code?: unknown }).code
  if (typeof code === 'string') return code
  return errorCode((error as { cause?: unknown }).cause, depth + 1)
}

function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  if (error && typeof error === 'object' && 'message' in error) {
    const message = (error as { message?: unknown }).message
    if (typeof message === 'string') return message
  }
  return String(error)
}

/** Does this failure look like a temporary network/transport problem? */
export function isTransientSupabaseFailure(error: unknown, depth = 0): boolean {
  if (!error || depth > 4) return false

  if (typeof error === 'string') {
    return /fetch failed|network|timeout|timed out|socket hang up|ECONNRESET|ETIMEDOUT|EAI_AGAIN|ENOTFOUND|temporarily unavailable|bad gateway|service unavailable/i.test(
      error
    )
  }

  if (typeof error !== 'object') return false

  const code = errorCode(error)
  if (code && (TRANSIENT_CODES.has(code) || /^5\d\d$/.test(code) || code === '429')) {
    return true
  }

  const status = (error as { status?: unknown }).status
  if (typeof status === 'number' && (status === 429 || status >= 500)) return true

  const message = errorMessage(error)
  if (
    /fetch failed|network|timeout|timed out|socket hang up|ECONNRESET|ETIMEDOUT|EAI_AGAIN|ENOTFOUND|temporarily unavailable|bad gateway|service unavailable/i.test(
      message
    )
  ) {
    return true
  }

  return isTransientSupabaseFailure((error as { cause?: unknown }).cause, depth + 1)
}

/** Structured details for logs, including undici's nested `cause`. */
export function describeSupabaseError(error: unknown): Record<string, unknown> {
  if (!error || typeof error !== 'object') return { message: String(error) }

  const record = error as {
    name?: unknown
    message?: unknown
    code?: unknown
    status?: unknown
    cause?: unknown
  }
  const cause = record.cause
  const causeDetails =
    cause && typeof cause === 'object'
      ? {
          name: (cause as { name?: unknown }).name,
          message: (cause as { message?: unknown }).message,
          code: (cause as { code?: unknown }).code,
          errno: (cause as { errno?: unknown }).errno,
          syscall: (cause as { syscall?: unknown }).syscall,
          hostname: (cause as { hostname?: unknown }).hostname
        }
      : cause

  return {
    name: record.name,
    message: record.message ?? errorMessage(error),
    code: record.code,
    status: record.status,
    cause: causeDetails
  }
}

function toSupabaseError(error: unknown): SupabaseErrorLike {
  return {
    message: errorMessage(error),
    code: errorCode(error) ?? (isTransientSupabaseFailure(error) ? 'TRANSIENT_NETWORK' : 'SUPABASE_ERROR')
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Execute a Supabase query with bounded retries. Returned PostgREST errors are
 * retried only when they are transient (rate limit / 5xx / network). Thrown
 * transport errors are normalised into the same result shape so callers do not
 * need two error paths.
 */
export async function runSupabase<T>(
  operation: () => PromiseLike<SupabaseResult<T>>,
  options: SupabaseRetryOptions = {}
): Promise<SupabaseResult<T>> {
  const attempts = Math.max(1, options.attempts ?? env.SUPABASE_MAX_RETRIES + 1)
  const baseDelayMs = Math.max(1, options.baseDelayMs ?? 300)
  const label = options.label ?? 'supabase.query'
  let lastError: SupabaseErrorLike | null = null

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const result = await operation()
      if (!result.error) return result

      lastError = result.error
      if (!isTransientSupabaseFailure(result.error) || attempt === attempts) {
        return result
      }
    } catch (error) {
      lastError = toSupabaseError(error)
      if (!isTransientSupabaseFailure(error) || attempt === attempts) {
        return { data: null, error: lastError }
      }
    }

    const delay = Math.round(baseDelayMs * 2 ** (attempt - 1) * (0.75 + Math.random() * 0.5))
    logger.warn(
      { label, attempt, attempts, delayMs: delay, error: describeSupabaseError(lastError) },
      'Supabase request failed; retrying'
    )
    await sleep(delay)
  }

  return {
    data: null,
    error: lastError ?? { message: 'Supabase request failed.', code: 'SUPABASE_ERROR' }
  }
}
