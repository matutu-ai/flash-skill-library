import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  publicDir: false,
  build: {
    outDir: 'public/assets/lithos',
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'src/main.tsx'),
      output: {
        entryFileNames: 'lithos-hero.js',
        assetFileNames: 'lithos-hero.[ext]',
      },
    },
  },
});
