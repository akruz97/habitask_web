import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  appType: 'spa',
  build: {
    rollupOptions: {
      input: {
        app: './index.html'
      }
    }
  }
})
