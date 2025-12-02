import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Enable history API fallback for React Router
    historyApiFallback: true,
  },
  build: {
    outDir: 'dist',
    // Add this for proper routing in production
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
  preview: {
    port: 3000,
  },
  assetsInclude: ['**/*.json'],
});
