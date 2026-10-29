import { env } from '../config/env.js'
import { logger } from './logger.js'

/**
 * Small OpenAI-compatible chat-completions client shared by the AI features.
 *
 * The provider is optional: callers must check `aiProviderConfigured()` and
 * provide a deterministic fallback. Requests have a hard timeout and retry
 * rate limits, 5xx responses and transport failures with backoff.
 */
export interface AiJsonRequest {
  system: string
  user: string
  temperature?: number
  /** Total attempts, including the first. Defaults to 2. */
  maxAttempts?: number
  /** Per-attempt timeout. Defaults to AI_GRADING_TIMEOUT_MS. */
  timeoutMs?: number
}

export function aiProviderConfigured(): boolean {
  return Boolean(env.AI_GRADING_API_URL && env.AI_GRADING_API_KEY)
}

export function aiProviderModel(): string {
  return env.AI_GRADING_MODEL
}

export function parseJsonObject(text: string): Record<string, unknown> | null {
  const trimmed = text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '')
  try {
    const parsed = JSON.parse(trimmed) as unknown
    return typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)
      ? (parsed as Record<string, unknown>)
      : null
  } catch {
    const start = trimmed.indexOf('{')
    const end = trimmed.lastIndexOf('}')
    if (start === -1 || end <= start) return null
    try {
      const parsed = JSON.parse(trimmed.slice(start, end + 1)) as unknown
      return typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)
        ? (parsed as Record<string, unknown>)
        : null
    } catch {
      return null
    }
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function errorDetail(error: unknown): string {
  if (error instanceof Error) {
    const cause = (error as Error & { cause?: unknown }).cause
    if (cause instanceof Error && cause.message) return `${error.message} (${cause.message})`
    const code = (cause as { code?: unknown } | undefined)?.code
    if (typeof code === 'string') return `${error.message} (${code})`
    return error.message
  }
  return String(error)
}

function extractContent(payload: unknown): string {
  if (!payload || typeof payload !== 'object') return ''
  const record = payload as {
    choices?: Array<{ message?: { content?: unknown } }>
    output_text?: unknown
  }
  if (typeof record.choices?.[0]?.message?.content === 'string') {
    return record.choices[0].message.content
  }
  return typeof record.output_text === 'string' ? record.output_text : ''
}

export async function requestJsonCompletion(
  request: AiJsonRequest
): Promise<Record<string, unknown> | null> {
  if (!aiProviderConfigured()) return null

  const attempts = Math.max(1, request.maxAttempts ?? 2)
  const timeoutMs = request.timeoutMs ?? env.AI_GRADING_TIMEOUT_MS

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const controller = new AbortController()
    const timer = setTimeout(
      () => controller.abort(new Error(`AI provider timed out after ${timeoutMs}ms`)),
      timeoutMs
    )

    try {
      const response = await fetch(env.AI_GRADING_API_URL as string, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${env.AI_GRADING_API_KEY as string}`
        },
        body: JSON.stringify({
          model: env.AI_GRADING_MODEL,
          temperature: request.temperature ?? 0.2,
          messages: [
            { role: 'system', content: request.system },
            { role: 'user', content: request.user }
          ]
        }),
        signal: controller.signal
      })

      if (!response.ok) {
        const retryable = response.status === 429 || response.status >= 500
        logger.warn(
          { status: response.status, attempt, attempts, retryable },
          'AI provider returned an error'
        )
        if (retryable && attempt < attempts) {
          await sleep(400 * attempt)
          continue
        }
        return null
      }

      const payload = (await response.json()) as unknown
      const parsed = parseJsonObject(extractContent(payload))
      if (!parsed) {
        logger.warn({ attempt, attempts }, 'AI provider returned unparseable JSON')
        return null
      }
      return parsed
    } catch (error) {
      logger.warn(
        { error: errorDetail(error), attempt, attempts },
        'AI provider request failed'
      )
      if (attempt < attempts) {
        await sleep(400 * attempt)
        continue
      }
      return null
    } finally {
      clearTimeout(timer)
    }
  }

  return null
}
