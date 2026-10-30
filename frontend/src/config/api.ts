const DEFAULT_API_BASE_PATH = '/api/v1'

/**
 * Resolves the API base URL at build time.
 *
 * The default is same-origin so the browser never needs a cross-origin CSP
 * allowance: Vite proxies `/api` in development and Vercel rewrites it to the
 * backend in production.
 */
export function resolveApiBaseUrl(configured: string | undefined): string {
  const trimmed = configured?.trim()
  if (!trimmed) return DEFAULT_API_BASE_PATH

  if (trimmed.startsWith('/')) {
    return trimmed.replace(/\/+$/, '') || '/'
  }

  let url: URL
  try {
    url = new URL(trimmed)
  } catch {
    throw new Error(`Invalid VITE_API_URL "${trimmed}": expected a path or an http(s) URL.`)
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error(`Invalid VITE_API_URL "${trimmed}": only http(s) URLs are supported.`)
  }
  return trimmed.replace(/\/+$/, '')
}

export function joinApiPath(baseUrl: string, path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return baseUrl === '/' ? normalizedPath : `${baseUrl}${normalizedPath}`
}

export const API_BASE_URL = resolveApiBaseUrl(import.meta.env.VITE_API_URL)

export function apiUrl(path: string): string {
  return joinApiPath(API_BASE_URL, path)
}
