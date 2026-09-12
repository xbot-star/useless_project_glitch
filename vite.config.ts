import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  preview: {
    allowedHosts: ['useless-project-glitch.onrender.com', '.onrender.com'],
  },
  server: {
    allowedHosts: ['useless-project-glitch.onrender.com', '.onrender.com'],
  },
})


