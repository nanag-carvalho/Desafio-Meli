import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/alta/dist/',
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': resolve(__dirname,'./src') } },
  build: { rollupOptions: { input: { app: resolve(__dirname,'index.html'), ds: resolve(__dirname,'ds.html') } } }
});
