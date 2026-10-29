import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // `vercel dev` assigns each service a port; standalone Vite keeps 5173.
    port: Number(process.env.PORT) || 5173
  }
})
