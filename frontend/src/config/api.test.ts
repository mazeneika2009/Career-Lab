import { describe, expect, it } from 'vitest'
import { joinApiPath, resolveApiBaseUrl } from './api'

describe('api configuration', () => {
  it('defaults to the same-origin v1 path', () => {
    expect(resolveApiBaseUrl(undefined)).toBe('/api/v1')
    expect(resolveApiBaseUrl('   ')).toBe('/api/v1')
  })

  it('normalizes relative and absolute base URLs', () => {
    expect(resolveApiBaseUrl('/api/v1/')).toBe('/api/v1')
    expect(resolveApiBaseUrl('https://api.example.com/api/v1/')).toBe(
      'https://api.example.com/api/v1'
    )
  })

  it('rejects unsupported URL protocols', () => {
    expect(() => resolveApiBaseUrl('javascript:alert(1)')).toThrow(/http/)
    expect(() => resolveApiBaseUrl('not a url')).toThrow(/Invalid VITE_API_URL/)
  })

  it('joins paths without duplicate slashes', () => {
    expect(joinApiPath('/api/v1', '/auth/login')).toBe('/api/v1/auth/login')
    expect(joinApiPath('/api/v1', 'auth/register')).toBe('/api/v1/auth/register')
    expect(joinApiPath('/', '/auth/login')).toBe('/auth/login')
  })
})
