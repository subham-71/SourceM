import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals : true,
    environment: 'jsdom',
    testMatch: ['**/__tests__/*.js?(x)'],
    setupFiles: 'src/setupTests.js',
  }
})
