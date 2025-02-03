import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://192.168.1.8:8000",
        changeOrigin: true,
      },
    },
    host: '192.168.1.8',
    port: 5173
  },
})
