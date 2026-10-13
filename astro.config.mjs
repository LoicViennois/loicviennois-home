// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://loicviennois.com',
  vite: {
    plugins: [tailwindcss()],
  },
});
