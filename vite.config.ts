import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      $components: '/src/components',
      $lib: '/src/lib',
      $stores: '/src/stores',
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(`v${pkg.version}`),
  },
});
