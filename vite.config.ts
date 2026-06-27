import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
  },
  server: {
    host: '0.0.0.0',
    port: 5179,
    strictPort: false,
    open: false,
  },
  preview: {
    host: true,
    port: 4174,
  },
});
