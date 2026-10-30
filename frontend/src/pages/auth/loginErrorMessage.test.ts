import { describe, expect, it } from 'vitest'
import { ApiError } from '../../services/api-client'
import { loginErrorMessage } from './loginErrorMessage'

function apiError(status: number, code: string, message = 'server message'): ApiError {
  return new ApiError({ status, code, message })
}

describe('loginErrorMessage', () => {
  it('shows a credential message for 401 responses', () => {
    expect(loginErrorMessage(apiError(401, 'INVALID_CREDENTIALS'))).toBe(
      'Invalid email or password.'
    )
  })

  it('shows a rate-limit message for 429 responses', () => {
    expect(loginErrorMessage(apiError(429, 'RATE_LIMITED'))).toBe(
      'Too many sign-in attempts. Please wait a moment and try again.'
    )
  })

  it('does not report server outages as invalid credentials', () => {
    expect(loginErrorMessage(apiError(503, 'SERVICE_UNAVAILABLE'))).toMatch(
      /temporarily unavailable/
    )
    expect(loginErrorMessage(apiError(500, 'INTERNAL_ERROR'))).toMatch(/temporarily unavailable/)
  })

  it('reports network failures separately from credentials', () => {
    expect(loginErrorMessage(new TypeError('Failed to fetch'))).toMatch(/unable to reach/i)
    expect(loginErrorMessage('unexpected')).toMatch(/unable to reach/i)
  })
})
