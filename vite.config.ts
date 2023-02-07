import {defineConfig} from 'vite';
import {VitePWA as vitePWA} from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';
import path from "path";

import manifest from './manifest.json';
import config from './tsconfig.json'

const allPaths = config?.compilerOptions?.paths || {}
const defaultPath = './src/'
const generatedAliases = {}
Object.entries(allPaths).map(function(aliasPath) {
  generatedAliases[aliasPath[0].replaceAll('/*', '')] = path.resolve(__dirname, `${defaultPath}${aliasPath[1][0].replaceAll('/*', '')}`)
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitePWA({
    includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
    manifest,
    devOptions: {
      enabled: false,
    },
  })],
  resolve: {
    alias: generatedAliases
  }
});
