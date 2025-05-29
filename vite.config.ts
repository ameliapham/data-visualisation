import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths' // Add this lign

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()], // Add tsconfigPaths() here too
})