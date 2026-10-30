import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import request from 'supertest'
import { createApp } from '../src/create-app.js'

const app = createApp()

interface VercelConfig {
  services: {
    frontend: {
      headers: Array<{
        headers: Array<{ key: string; value: string }>
      }>
    }
  }
}

function parseCsp(header: string | undefined): Map<string, string[]> {
  const directives = new Map<string, string[]>()
  if (!header) return directives
  for (const part of header.split(';')) {
    const [name, ...sources] = part.trim().split(/\s+/)
    if (name) directives.set(name, sources)
  }
  return directives
}

function vercelFrontendCsp(): string | undefined {
  const configPath = resolve(dirname(fileURLToPath(import.meta.url)), '../../vercel.json')
  const config = JSON.parse(readFileSync(configPath, 'utf8')) as VercelConfig
  return config.services.frontend.headers[0]?.headers.find(
    (header) => header.key === 'Content-Security-Policy'
  )?.value
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
    // API calls must stay on the frontend origin; Vite proxies them in
    // development and Vercel rewrites them in production.
    expect(spaCsp.get('connect-src')).toEqual(["'self'"])
    // Legacy child-src also governs workers; adding it here would break
    // Monaco's same-origin worker fallback.
    expect(spaCsp.has('child-src')).toBe(false)

    const api = await request(app).get('/api/v1/health/live')
    const apiCsp = parseCsp(api.headers['content-security-policy'] as string | undefined)
    expect(apiCsp.get('default-src')).toEqual(["'none'"])
    expect(apiCsp.has('script-src')).toBe(false)
    expect(apiCsp.has('frame-src')).toBe(false)
  })

  it('matches the CSP declared for the Vercel frontend', async () => {
    const spa = await request(app).get('/learn')
    const expressCsp = parseCsp(
      spa.headers['content-security-policy'] as string | undefined
    )

    expect(expressCsp).toEqual(parseCsp(vercelFrontendCsp()))
  })
})
