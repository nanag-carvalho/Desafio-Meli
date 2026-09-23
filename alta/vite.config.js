import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  base: '/alta/dist/',
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': resolve(projectRoot, 'src') } },
  build: { rollupOptions: { input: { app: resolve(projectRoot, 'index.html'), ds: resolve(projectRoot, 'ds.html') } } }
});
