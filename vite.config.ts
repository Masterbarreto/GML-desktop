import { defineConfig } from 'vite';
import path from 'node:path';
import electron from 'vite-plugin-electron/simple';
import react from '@vitejs/plugin-react';
import tsConfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsConfigPaths(), 
    electron({
      main: {
        // Caminho do arquivo principal do Electron
        entry: 'electron/main.ts',
      },
      preload: {
        // Caminho do arquivo de preload
        input: path.join(__dirname, 'electron/preload.ts'),
      },
      // Configuração para o processo Renderer
      renderer: process.env.NODE_ENV === 'test'
        ? undefined
        : {},
    }),
  ],
});
