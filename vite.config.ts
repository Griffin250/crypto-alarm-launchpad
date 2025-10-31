import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: 'client',
  publicDir: '../client/public',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
  build: {
    outDir: '../dist',
    sourcemap: true,
    emptyOutDir: true,
  },
  define: {
    global: 'globalThis',
  },
})
