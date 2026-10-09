import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // website (index.html) + the A4 print edition (print.html, see src/print)
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        print: fileURLToPath(new URL('./print.html', import.meta.url)),
      },
    },
  },
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
