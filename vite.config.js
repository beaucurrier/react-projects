import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   server: {
//     proxy: {
//       '/todos': 'https://todolistbackend-fb6e.onrender.com',
//       },
//     },
//   plugins: [react()],
// })

export default defineConfig({
  plugins: [react()],
})
