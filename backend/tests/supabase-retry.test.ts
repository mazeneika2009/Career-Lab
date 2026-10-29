import { describe, expect, it } from 'vitest'
import {
  isTransientSupabaseFailure,
  runSupabase
} from '../src/utils/supabase.js'

function transientFetchError(code: string): TypeError {
  const error = new TypeError('fetch failed')
  ;(error as Error & { cause?: unknown }).cause = Object.assign(
    new Error('socket hang up'),
    { code }
  )
  return error
}

describe('Supabase transport resilience', () => {
  it('classifies network drops and 5xx responses as transient', () => {
    expect(isTransientSupabaseFailure(transientFetchError('ECONNRESET'))).toBe(true)
    expect(isTransientSupabaseFailure(transientFetchError('EAI_AGAIN'))).toBe(true)
    expect(isTransientSupabaseFailure(new TypeError('fetch failed'))).toBe(true)
    expect(isTransientSupabaseFailure({ message: 'service unavailable', code: '503' })).toBe(true)
    expect(isTransientSupabaseFailure({ message: 'rate limited', code: '429' })).toBe(true)
  })

  it('does not retry permanent PostgREST errors', () => {
    expect(isTransientSupabaseFailure({ message: 'permission denied', code: '42501' })).toBe(false)
    expect(isTransientSupabaseFailure({ message: 'invalid input syntax', code: '22P02' })).toBe(false)
  })

  it('retries a fetch failure and succeeds once the network recovers', async () => {
    let calls = 0
    const result = await runSupabase(
      async () => {
        calls += 1
        if (calls < 3) throw transientFetchError('ECONNRESET')
        return { data: { mirrored: true }, error: null }
      },
      { attempts: 3, baseDelayMs: 1, label: 'test.retry' }
    )

    expect(calls).toBe(3)
    expect(result.error).toBeNull()
    expect(result.data).toEqual({ mirrored: true })
  })

  it('returns the permanent error immediately without extra attempts', async () => {
    let calls = 0
    const result = await runSupabase(
      async () => {
        calls += 1
        return { data: null, error: { message: 'permission denied', code: '42501' } }
      },
      { attempts: 3, baseDelayMs: 1, label: 'test.permanent' }
    )

    expect(calls).toBe(1)
    expect(result.data).toBeNull()
    expect(result.error?.code).toBe('42501')
  })

  it('returns the last transport error after retries are exhausted', async () => {
    let calls = 0
    const result = await runSupabase(
      async () => {
        calls += 1
        throw transientFetchError('ETIMEDOUT')
      },
      { attempts: 2, baseDelayMs: 1, label: 'test.exhausted' }
    )

    expect(calls).toBe(2)
    expect(result.data).toBeNull()
    expect(result.error?.code).toBe('ETIMEDOUT')
  })
})
