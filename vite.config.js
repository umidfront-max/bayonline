import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
   plugins: [
      vue(),
      vueJsx(),
      vueDevTools(),
      tailwindcss(),
   ],
   resolve: {
      alias: {
         '@': fileURLToPath(new URL('./src', import.meta.url))
      },
   },
   server: {
      host: '0.0.0.0', // barcha IP manzillardan kirish imkonini beradi
      port: 5173,      // kerakli port
      strictPort: true, // agar port band bo‘lsa xatolik beradi
      open: false,      // avtomatik brauzerni ochmaydi, true qilsa ochadi
   }
})
