import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@shared': fileURLToPath(new URL('../shared', import.meta.url)),
    },
  },
  build: {
    target: 'esnext',
    sourcemap: false,
  },
  server: {
    host: '0.0.0.0',
    port: 5180,
    strictPort: false,
    // Allow importing from the sibling `shared/` package.
    fs: { allow: ['..'] },
    // Proxy API calls to the bot server during development.
    proxy: {
      '/api': 'http://localhost:8787',
    },
  },
});
