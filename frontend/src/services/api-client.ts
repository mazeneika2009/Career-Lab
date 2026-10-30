import { apiUrl } from '../config/api'
import { getSessionAccessToken, useSessionStore } from '../store/sessionStore'
import type { AuthResponse } from '../types/api'
import { getCookieValue, randomRequestId } from '../utils/cookies'

const CSRF_COOKIE = 'cl_csrf'

export interface ApiErrorDetail {
  status: number
  code: string
  message: string
  details?: unknown
  requestId?: string
}

export class ApiError extends Error {
  readonly status: number
  readonly code: string
  readonly details?: unknown
  readonly requestId?: string

  constructor(detail: ApiErrorDetail) {
    super(detail.message)
    this.name = 'ApiError'
    this.status = detail.status
    this.code = detail.code
    this.details = detail.details
    this.requestId = detail.requestId
  }
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
  body?: unknown
  signal?: AbortSignal
  auth?: boolean
  replay?: boolean
}

const RETRYABLE_STATUS = new Set([500, 502, 503, 504, 429])

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function parseErrorEnvelope(response: Response): Promise<ApiErrorDetail> {
  let parsed: unknown = null
  try {
    parsed = await response.json()
  } catch {
    parsed = null
  }
  const errorContainer =
    typeof parsed === 'object' && parsed !== null && 'error' in parsed
      ? (parsed as { error?: { code?: unknown; message?: unknown; details?: unknown; requestId?: unknown } })
      : {}
  const error = errorContainer.error ?? {}

  return {
    status: response.status,
    code: typeof error.code === 'string' ? error.code : 'UNKNOWN',
    message:
      typeof error.message === 'string'
        ? error.message
        : 'Something went wrong. Please try again.',
    details: error.details,
    requestId: typeof error.requestId === 'string' ? error.requestId : undefined
  }
}

async function execute<T>(path: string, options: RequestOptions): Promise<T> {
  const { method = 'GET', body, signal, auth = true, replay = false } = options
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'X-Request-Id': randomRequestId()
  }

  if (body !== undefined) headers['Content-Type'] = 'application/json'

  if (auth) {
    const token = getSessionAccessToken()
    if (token) headers.Authorization = `Bearer ${token}`
  }

  if (path.startsWith('/auth/refresh')) {
    const csrf = getCookieValue(CSRF_COOKIE)
    if (csrf) headers['X-CSRF-Token'] = csrf
  }

  const isGet = method === 'GET'
  const maxAttempts = isGet ? 3 : 1

  for (let attempt = 1; ; attempt++) {
    let response: Response
    try {
      response = await fetch(apiUrl(path), {
        method,
        headers,
        credentials: 'include',
        body: body !== undefined ? JSON.stringify(body) : undefined,
        signal
      })
    } catch (error) {
      if (signal?.aborted || attempt >= maxAttempts) throw error
      await delay(300 * 2 ** (attempt - 1) + Math.random() * 250)
      continue
    }

    if (response.ok) {
      const json: unknown = await response.json().catch(() => null)
      if (
        typeof json === 'object' &&
        json !== null &&
        'success' in json &&
        (json as { success: boolean }).success === true &&
        'data' in json
      ) {
        return (json as { data: T }).data
      }
      throw new ApiError({
        status: response.status,
        code: 'UNKNOWN',
        message: 'Unexpected response from the server.'
      })
    }

    if (
      response.status === 401 &&
      auth &&
      !replay &&
      path !== '/auth/login' &&
      path !== '/auth/register'
    ) {
      const refreshed = await refreshSession()
      if (refreshed) {
        return execute<T>(path, { ...options, replay: true })
      }
    }

    if (isGet && RETRYABLE_STATUS.has(response.status) && attempt < maxAttempts) {
      const retryAfterHeader = response.headers.get('retry-after')
      const retryAfterSeconds = retryAfterHeader !== null ? Number(retryAfterHeader) : NaN
      await delay(
        Number.isFinite(retryAfterSeconds)
          ? retryAfterSeconds * 1000
          : 300 * 2 ** (attempt - 1) + Math.random() * 250
      )
      continue
    }

    throw new ApiError(await parseErrorEnvelope(response))
  }
}

let refreshInFlight: Promise<boolean> | null = null

export function refreshSession(): Promise<boolean> {
  if (!refreshInFlight) {
    refreshInFlight = execute<AuthResponse>('/auth/refresh', { method: 'POST', auth: false })
      .then((data) => {
        useSessionStore.getState().setSession(data.user, data.accessToken)
        return true
      })
      .catch(() => {
        useSessionStore.getState().clear()
        return false
      })
      .finally(() => {
        refreshInFlight = null
      })
  }
  return refreshInFlight
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  return execute<T>(path, options)
}

export async function logoutCurrentSession(): Promise<void> {
  try {
    await execute('/auth/logout', { method: 'POST', auth: true })
  } finally {
    useSessionStore.getState().clear()
  }
}
