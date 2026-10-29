import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ApiError, apiRequest, refreshSession } from './api-client'
import { useSessionStore } from '../store/sessionStore'

const okEnvelope = (data: unknown) => ({
  ok: true,
  status: 200,
  headers: new Headers(),
  json: async () => ({ success: true, data })
})

const errorEnvelope = (status: number, code: string, message: string) => ({
  ok: false,
  status,
  headers: new Headers(),
  json: async () => ({ success: false, error: { code, message, requestId: 'req_1' } })
})

beforeEach(() => {
  useSessionStore.getState().clear()
  vi.stubGlobal('fetch', vi.fn())
  document.cookie = ''
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('api-client', () => {
  it('unwraps the success envelope', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => okEnvelope({ hello: 'world' }))
    )
    const data = await apiRequest<{ hello: string }>('/anything')
    expect(data.hello).toBe('world')
  })

  it('throws ApiError with envelope details on failure', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => errorEnvelope(403, 'EMAIL_NOT_VERIFIED', 'Verify your email.'))
    )
    const error: ApiError = await apiRequest<never>('/auth/login', {
      method: 'POST',
      auth: false
    }).catch((e: unknown) => e as ApiError)
    expect(error).toBeInstanceOf(ApiError)
    expect(error.status).toBe(403)
    expect(error.code).toBe('EMAIL_NOT_VERIFIED')
    expect(error.requestId).toBe('req_1')
  })

  it('sends the bearer token when a session exists', async () => {
    useSessionStore.getState().setSession(
      { id: 'u1', email: 'a@b.c', displayName: 'A', status: 'active', roles: [], permissions: [] },
      'token-123'
    )
    type FetchInit = { headers?: Record<string, string> }
    let capturedInit: FetchInit | undefined
    const fetchMock = vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
      capturedInit = init as FetchInit
      return okEnvelope({ x: 1 })
    })
    vi.stubGlobal('fetch', fetchMock)
    await apiRequest('/users/me')
    expect(capturedInit?.headers).toMatchObject({
      Authorization: 'Bearer token-123'
    })
  })

  it('performs single-flight refresh and replays after a 401', async () => {
    useSessionStore.getState().clear()

    let call = 0
    const fetchMock = vi.fn(async (_input: RequestInfo | URL) => {
      call += 1
      if (call === 1) return errorEnvelope(401, 'TOKEN_EXPIRED', 'expired')
      if (call === 2)
        return okEnvelope({
          accessToken: 'new-token',
          expiresIn: 900,
          user: { id: 'u1', email: 'a@b.c', displayName: 'A', status: 'active' as const, roles: [], permissions: [] }
        })
      return okEnvelope({ secret: true })
    })
    vi.stubGlobal('fetch', fetchMock)

    const data = await apiRequest<{ secret: boolean }>('/users/me')
    expect(data.secret).toBe(true)
    const secondCallUrl = String(fetchMock.mock.calls[1]?.[0] ?? '')
    expect(secondCallUrl).toContain('/auth/refresh')
    expect(useSessionStore.getState().accessToken).toBe('new-token')
  })

  it('does not retry login failures through refresh', async () => {
    const fetchMock = vi.fn(async () =>
      errorEnvelope(401, 'INVALID_CREDENTIALS', 'Invalid credentials.')
    )
    vi.stubGlobal('fetch', fetchMock)

    await expect(apiRequest('/auth/login', { method: 'POST', auth: false })).rejects.toBeInstanceOf(ApiError)
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('refreshSession clears the store when the cookie is dead', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => errorEnvelope(401, 'TOKEN_EXPIRED', 'expired')))
    const result = await refreshSession()
    expect(result).toBe(false)
    expect(useSessionStore.getState().user).toBeNull()
    expect(useSessionStore.getState().status).toBe('anonymous')
  })
})
