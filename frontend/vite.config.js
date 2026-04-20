import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    // Define onde os arquivos finais serão gerados
    outDir: path.resolve(__dirname, '../logo-ali-app/static/dist'),
    emptyOutDir: true,
  }
}) 