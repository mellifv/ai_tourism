import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    middlewareMode: false,
  },
  build: {
    outDir: 'dist',
  },
  preview: {
    port: 3000,
  },
  assetsInclude: ['**/*.json'],
});

