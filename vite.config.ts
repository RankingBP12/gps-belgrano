import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // En producción (build) se sirve bajo /gps-belgrano/ (GitHub Pages).
  // En desarrollo queda en la raíz.
  base: command === 'build' ? '/gps-belgrano/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}))
