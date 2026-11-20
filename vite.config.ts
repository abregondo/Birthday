import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// base: './' keeps assets relative so the same build works on
// Netlify, GitHub Pages (project URLs), or opened locally.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
