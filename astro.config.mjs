import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://anewyouwoman.com',
  output: 'static',
  adapter: vercel(),
  trailingSlash: 'always',
  build: { inlineStylesheets: 'always' },
  vite: {
    plugins: [tailwindcss()],
    // Some migrated blog images (src/assets/blog/*) have no file extension; treat them as assets.
    assetsInclude: [/src\/assets\/blog\/[^/]+\/[^./]+$/],
  },
});
