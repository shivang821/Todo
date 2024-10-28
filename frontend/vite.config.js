import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),svgr()],
  server: {
    proxy: {
      '/backend': {
          target: 'http://localhost:8080', // Your backend URL
          changeOrigin: true,
          secure: false, // Set to false if you're using HTTP instead of HTTPS
          rewrite: (path) => path.replace(/^\/backend/, '') // Forward to the backend without /api
      }
  }
  }
});