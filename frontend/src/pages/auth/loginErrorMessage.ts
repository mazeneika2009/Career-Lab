import { ApiError } from '../../services/api-client'

const SERVICE_UNAVAILABLE_MESSAGE =
  'The service is temporarily unavailable. Please try again in a moment.'

const NETWORK_ERROR_MESSAGE = 'Unable to reach the server. Check your connection and try again.'

/**
 * Map a login failure to a message that describes what actually happened.
 *
 * Previously every error that was not "email not verified" or "account
 * locked" was shown as "Invalid credentials", which hid outages and rate
 * limits from users.
 */
export function loginErrorMessage(error: unknown): string {
  if (!(error instanceof ApiError)) {
    return NETWORK_ERROR_MESSAGE
  }

  if (error.status === 401 || error.code === 'INVALID_CREDENTIALS') {
    return 'Invalid email or password.'
  }

  if (error.status === 429 || error.code === 'RATE_LIMITED') {
    return 'Too many sign-in attempts. Please wait a moment and try again.'
  }

  if (
    error.status >= 500 ||
    error.code === 'SERVICE_UNAVAILABLE' ||
    error.code === 'MAINTENANCE_MODE'
  ) {
    return SERVICE_UNAVAILABLE_MESSAGE
  }

  return error.message || 'Sign-in failed. Please try again.'
}
