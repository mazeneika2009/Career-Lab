import { readFileSync } from 'node:fs'
import { basename, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const PYODIDE_ASSETS = [
  'pyodide.asm.mjs',
  'pyodide.asm.wasm',
  'python_stdlib.zip',
  'pyodide-lock.json'
] as const
const PYODIDE_ASSET_NAMES: ReadonlySet<string> = new Set(PYODIDE_ASSETS)

function pyodideAssets(): Plugin {
  const packageDirectory = resolve(dirname(fileURLToPath(import.meta.url)), 'node_modules', 'pyodide')
  const mimeTypes: Record<string, string> = {
    '.json': 'application/json',
    '.mjs': 'text/javascript',
    '.wasm': 'application/wasm',
    '.zip': 'application/zip'
  }

  return {
    name: 'career-lab-pyodide-assets',
    configureServer(server) {
      server.middlewares.use('/pyodide', (request, response, next) => {
        const fileName = basename(new URL(request.url ?? '/', 'http://localhost').pathname)
        if (!PYODIDE_ASSET_NAMES.has(fileName)) {
          next()
          return
        }

        try {
          response.setHeader('Content-Type', mimeTypes[fileName.slice(fileName.lastIndexOf('.'))] ?? 'application/octet-stream')
          response.end(readFileSync(resolve(packageDirectory, fileName)))
        } catch (error) {
          next(error instanceof Error ? error : new Error('Unable to serve the Python runtime asset.'))
        }
      })
    },
    generateBundle() {
      for (const fileName of PYODIDE_ASSETS) {
        this.emitFile({
          type: 'asset',
          fileName: `pyodide/${fileName}`,
          source: readFileSync(resolve(packageDirectory, fileName))
        })
      }
    }
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), pyodideAssets()],
  worker: { format: 'es' },
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
