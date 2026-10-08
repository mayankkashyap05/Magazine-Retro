import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // bind 0.0.0.0 for previews
    port: 5173,
    allowedHosts: true, // allow the preview proxy host
  },
  preview: {
    host: true,
    port: 4173,
    allowedHosts: true,
  },
})
