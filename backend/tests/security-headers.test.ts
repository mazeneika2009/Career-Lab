import { describe, expect, it } from 'vitest'
import request from 'supertest'
import { createApp } from '../src/create-app.js'
import { spaConnectSources } from '../src/security/headers.js'

const app = createApp()

function parseCsp(header: string | undefined): Map<string, string[]> {
  const directives = new Map<string, string[]>()
  if (!header) return directives
  for (const part of header.split(';')) {
    const [name, ...sources] = part.trim().split(/\s+/)
    if (name) directives.set(name, sources)
  }
  return directives
}

describe('content security policy', () => {
  it('allows the video providers on the SPA only', async () => {
    const spa = await request(app).get('/learn')
    const spaCsp = parseCsp(spa.headers['content-security-policy'] as string | undefined)

    expect(spaCsp.get('script-src')).toEqual(
      expect.arrayContaining([
        "'self'",
        'https://www.youtube.com',
        'https://s.ytimg.com',
        'https://player.vimeo.com'
      ])
    )
    expect(spaCsp.get('frame-src')).toEqual(
      expect.arrayContaining([
        "'self'",
        'https://www.youtube.com',
        'https://player.vimeo.com'
      ])
    )
    expect(spaCsp.get('img-src')).toEqual(
      expect.arrayContaining([
        "'self'",
        'data:',
        'https://i.ytimg.com',
        'https://img.youtube.com'
      ])
    )
    // Legacy child-src also governs workers; adding it here would break
    // Monaco's same-origin worker fallback.
    expect(spaCsp.has('child-src')).toBe(false)

    const api = await request(app).get('/api/v1/health/live')
    const apiCsp = parseCsp(api.headers['content-security-policy'] as string | undefined)
    expect(apiCsp.get('default-src')).toEqual(["'none'"])
    expect(apiCsp.has('script-src')).toBe(false)
    expect(apiCsp.has('frame-src')).toBe(false)
  })

  it('allows the local API only outside production', () => {
    expect(spaConnectSources('development', 4321)).toEqual([
      "'self'",
      'http://localhost:4321',
      'ws://localhost:4321',
      'http://127.0.0.1:4321',
      'ws://127.0.0.1:4321'
    ])
    expect(spaConnectSources('test', 4321)).toContain('http://localhost:4321')
    expect(spaConnectSources('staging', 4321)).toEqual(["'self'"])
    expect(spaConnectSources('production', 4321)).toEqual(["'self'"])
  })
})
