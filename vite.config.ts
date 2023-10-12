import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

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
});
