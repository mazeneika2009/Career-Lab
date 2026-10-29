import helmet from 'helmet'
import { env } from '../config/env.js'

export function securityHeaders() {
  return helmet({
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        defaultSrc: ["'none'"],
        frameAncestors: ["'none'"],
        baseUri: ["'none'"],
        formAction: ["'none'"]
      }
    },
    referrerPolicy: { policy: 'no-referrer' },
    hsts:
      env.APP_ENV === 'production'
        ? { maxAge: 31_536_000, includeSubDomains: true, preload: true }
        : false,
    crossOriginEmbedderPolicy: false
  })
}

/**
 * Builds the SPA `connect-src` list.
 *
 * Production stays same-origin: the Vercel frontend calls `/api/v1`, which the
 * top-level rewrite sends to the backend. Local development additionally allows
 * the standalone API origin so `dev:single` and direct localhost requests work
 * even when the page is opened through `127.0.0.1`. Never allow localhost in
 * production.
 */
export function spaConnectSources(
  appEnv: string = env.APP_ENV,
  port: number = env.PORT
): string[] {
  const sources = ["'self'"]
  if (appEnv === 'development' || appEnv === 'test') {
    for (const host of ['localhost', '127.0.0.1']) {
      sources.push(`http://${host}:${port}`, `ws://${host}:${port}`)
    }
  }
  return sources
}

/**
 * SPA-optimized security headers with CSP relaxed for YouTube iframe embedding.
 * - script-src allows YouTube IFrame API (www.youtube.com, s.ytimg.com) and Vimeo (player.vimeo.com)
 * - frame-src allows YouTube and Vimeo iframes
 * - img-src allows YouTube thumbnails (i.ytimg.com)
 * - style-fonts for Google Fonts
 * - connect-src is same-origin in production and also allows the local API in development
 *   (YouTube API postMessage is allowed via frame-src)
 */
export function spaSecurityHeaders() {
  return helmet({
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        defaultSrc: ["'self'"],
        // Video providers are explicitly allowlisted:
        // - YouTube's IFrame API loads from www.youtube.com and s.ytimg.com.
        // - Vimeo's Player API loads from player.vimeo.com.
        scriptSrc: [
          "'self'",
          'https://www.youtube.com',
          'https://s.ytimg.com',
          'https://player.vimeo.com'
        ],
        // Allow inline styles for component libraries; restrict to trusted fonts.
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        // i.ytimg.com serves the fallback-card thumbnails; img.youtube.com is
        // YouTube's public thumbnail alias.
        imgSrc: [
          "'self'",
          'data:',
          'https://i.ytimg.com',
          'https://img.youtube.com'
        ],
        fontSrc: ["'self'", 'data:', 'https://fonts.gstatic.com'],
        connectSrc: spaConnectSources(),
        // 'self' preserves same-origin frames; only the two supported video
        // providers may be framed by the app.
        frameSrc: ["'self'", 'https://www.youtube.com', 'https://player.vimeo.com'],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"]
      }
    },
    referrerPolicy: { policy: 'no-referrer' },
    hsts:
      env.APP_ENV === 'production'
        ? { maxAge: 31_536_000, includeSubDomains: true, preload: true }
        : false,
    crossOriginEmbedderPolicy: false
  })
}
