import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
    host: '0.0.0.0',
    watch: {
      usePolling: true,
    },
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [react()],
  envDir: '../../',
  build: {
    outDir: path.join(__dirname, 'dist/client'),
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        serviceWorker: path.resolve(__dirname, 'public/serviceWorker.js'),
      },
    },
  },
  ssr: {
    format: 'cjs',
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // or "modern"
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },
})
