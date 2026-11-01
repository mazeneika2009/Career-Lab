import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // `vercel dev` assigns each service a port; standalone Vite keeps 5173.
    port: Number(process.env.PORT) || 5173,
    // Keep browser requests same-origin in local development so the API is not
    // blocked by `connect-src 'self'` and cookies/CORS behave like production.
    // Override with API_PROXY_TARGET if the backend runs elsewhere.
    proxy: {
      '/api': {
        target: process.env.API_PROXY_TARGET || 'http://localhost:4000',
        changeOrigin: true
      }
    }
  }
})
