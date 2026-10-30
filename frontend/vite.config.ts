import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const DEFAULT_API_PROXY_TARGET = 'http://localhost:4000'
const DEFAULT_API_BASE_PATH = '/api/v1'
const LOCAL_API_URL = /^https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?(?:\/|$)/i

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const configuredApiUrl = env.VITE_API_URL?.trim()

  // Hosting providers can keep an old localhost value in their environment.
  // Never let it reach a production bundle: fall back to the same-origin API,
  // which Vercel rewrites to the backend service.
  if (mode === 'production' && configuredApiUrl && LOCAL_API_URL.test(configuredApiUrl)) {
    console.warn(
      `[vite] Ignoring localhost VITE_API_URL "${configuredApiUrl}" in production; using ${DEFAULT_API_BASE_PATH}.`
    )
    process.env.VITE_API_URL = DEFAULT_API_BASE_PATH
  }

  // Keep browser requests same-origin in development and preview so the API is
  // not blocked by `connect-src 'self'` and cookies/CORS behave like production.
  // Override the target with API_PROXY_TARGET if the backend runs elsewhere.
  const proxy = {
    '/api': {
      target: process.env.API_PROXY_TARGET || DEFAULT_API_PROXY_TARGET,
      changeOrigin: true
    }
  }

  return {
    plugins: [react(), tailwindcss()],
    server: {
      // `vercel dev` assigns each service a port; standalone Vite keeps 5173.
      port: Number(process.env.PORT) || 5173,
      proxy
    },
    preview: {
      // `vite preview` exercises the production bundle with the same proxy.
      proxy
    }
  }
})
