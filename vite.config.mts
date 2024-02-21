import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import nodecg from './vite-plugin-nodecg.mjs';
import rollupEsbuild from 'rollup-plugin-esbuild';
import rollupExternals from 'rollup-plugin-node-externals';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 8080,
  },
  clearScreen: false,
  plugins: [
    react({
      jsxImportSource: '@emotion/react', // https://zenn.dev/longbridge/articles/bba17785710c1a
    }),
    nodecg({
      bundleName: 'scoreboard',
      graphics: './src/graphics/*.tsx',
      dashboard: './src/dashboard/*.tsx',
      extension: {
        input: './src/extension/index.ts',
        plugins: [rollupEsbuild(), rollupExternals()],
      },
    }),
  ],
  ssr: {
    noExternal: [
      // MUI needs to be pre-processed by Vite in production: https://github.com/brillout/vite-plugin-ssr/discussions/901
      '@mui/base',
      '@mui/icons-material',
      '@mui/material',
      '@mui/utils',
    ],
  },
  assetsInclude: ['**/*.riv'],
});
