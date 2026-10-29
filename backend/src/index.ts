import { createApp } from './app.js'

/**
 * Vercel entrypoint.
 *
 * Exporting the Express app (instead of starting a listener) lets Vercel run it
 * as a single Function. Local development still uses `src/server.ts`, which
 * owns the port listener, SMTP warm-up and graceful shutdown.
 */
export default createApp()
