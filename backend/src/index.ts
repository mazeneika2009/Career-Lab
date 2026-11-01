// Vercel's Express builder detects entrypoints by looking for an `express`
// import. Keep this type import so `src/index.ts` is preferred over the app
// factory in `src/create-app.ts`.
import type { Express } from 'express'
import { createApp } from './create-app.js'

/**
 * Vercel entrypoint.
 *
 * Exporting the Express app (instead of starting a listener) lets Vercel run it
 * as a single Function. Local development still uses `src/server.ts`, which
 * owns the port listener, SMTP warm-up and graceful shutdown.
 */
const app: Express = createApp()
export default app
