// Used only by tests/foundation: a plain static build (no Vercel adapter) so the HTML lands in
// .test-dist exactly as written. Run with FF_FIXTURES=1 to build the fixture pages.
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://anewyouwoman.com',
  output: 'static',
  outDir: process.env.FF_OUT_DIR || '.test-dist',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'always' },
  vite: { plugins: [tailwindcss()] },
});
