import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    // Ensure SPA history fallback during local dev for deep links like /healthcare
    host: 'localhost',
    port: 5173,
  },
  preview: {
    host: 'localhost',
    port: 5173,
  },
});
