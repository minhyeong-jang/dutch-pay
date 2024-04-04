import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import { defineConfig } from 'vite';

export default defineConfig(() => ({
  plugins: [react(), eslint()],
  server: {
    host: '127.0.0.1',
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
}));
