import {defineConfig} from 'vite';
import {VitePWA as vitePWA} from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';
import path from "path";

import manifest from './manifest.json';

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
    alias: {
      "~components": path.resolve(__dirname, "./src/components"),
      "~constants": path.resolve(__dirname, "./src/constants"),
      "~pages": path.resolve(__dirname, "./src/pages"),
      "~slices": path.resolve(__dirname, "./src/redux/slice"),
      "~store": path.resolve(__dirname, "./src/redux/store"),
      "~styles": path.resolve(__dirname, "./src/styles"),
      "~utils": path.resolve(__dirname, "./src/utils"),
    }
  }
});
