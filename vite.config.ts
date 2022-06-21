import {defineConfig} from 'vite';
import {VitePWA as vitePWA} from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';
import manifest from './manifest.json';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/prayer-book-template-a/',
  plugins: [react(), vitePWA({
    includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
    manifest,
    devOptions: {
      enabled: false,
    },
  })],
});
