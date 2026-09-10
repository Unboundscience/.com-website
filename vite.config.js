import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Netlify publishes dist/ at the domain root, so assets must be root-relative.
// The legacy VPS deploy (deploy.sh) serves the site from a subdirectory and
// sets BASE_PATH to override this.
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || '/'
})
