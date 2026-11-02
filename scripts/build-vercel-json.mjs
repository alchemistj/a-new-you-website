// Generates vercel.json from src/data/redirects.ts.
//   node scripts/build-vercel-json.mjs           write vercel.json
//   node scripts/build-vercel-json.mjs --check   exit 1 if vercel.json is out of date
// Uses Vite's SSR loader so the data files can use import.meta.glob like the Astro build does.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const root = fileURLToPath(new URL('..', import.meta.url));
const target = new URL('../vercel.json', import.meta.url);
const check = process.argv.includes('--check');

const server = await createServer({
  root,
  logLevel: 'error',
  appType: 'custom',
  server: { middlewareMode: true, hmr: false, watch: null },
  optimizeDeps: { noDiscovery: true },
});

try {
  const data = await server.ssrLoadModule('/src/data/redirects.ts');
  const core = await server.ssrLoadModule('/src/lib/seo/redirect-core.ts');
  const config = core.buildVercelConfig(data.redirects, data.canonicalRoutes);
  const json = `${JSON.stringify(config, null, 2)}\n`;
  if (check) {
    let current = '';
    try {
      current = readFileSync(target, 'utf8');
    } catch {}
    if (current !== json) {
      console.error('vercel.json is out of date. Run: node scripts/build-vercel-json.mjs');
      process.exitCode = 1;
    } else {
      console.log(`vercel.json OK (${config.redirects.length} redirect rules)`);
    }
  } else {
    writeFileSync(target, json);
    console.log(`wrote vercel.json: ${data.redirects.length} redirects, ${config.redirects.length} rules`);
  }
} finally {
  await server.close();
}
