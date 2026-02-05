import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@trevo/core': path.resolve(__dirname, '../../packages/core/src'),
      '@trevo/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@trevo/api-client': path.resolve(__dirname, '../../packages/api-client/src'),
      '@trevo/i18n': path.resolve(__dirname, '../../packages/i18n/src'),
    },
  },
  // Prevent vite from obscuring rust errors
  clearScreen: false,
  // Tauri expects a fixed port
  server: {
    port: 1420,
    strictPort: true,
    watch: {
      ignored: ['**/src-tauri/**'],
    },
  },
});
