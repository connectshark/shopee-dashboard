import { fileURLToPath } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8080
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
