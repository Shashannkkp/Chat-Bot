import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgrPlugin from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [react(), svgrPlugin()],
  server: {
    open: true,
    port: 3000,
    proxy: {
      '/api/gemini': {
        target: 'https://generativelanguage.googleapis.com/v1beta2',
        changeOrigin: true,
        secure: true,
        rewrite: path => path.replace(/^\/api\/gemini/, ''),
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 2000,
  },
})
