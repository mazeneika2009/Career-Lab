import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const DEFAULT_API_PROXY_TARGET = 'http://localhost:4000'
const LOCAL_API_URL = /^https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?(?:\/|$)/i

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const configuredApiUrl = env.VITE_API_URL?.trim()

  if (mode === 'production' && configuredApiUrl && LOCAL_API_URL.test(configuredApiUrl)) {
    throw new Error(
      'VITE_API_URL must not point to localhost in a production build. Use the same-origin /api/v1 path.'
    )
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
