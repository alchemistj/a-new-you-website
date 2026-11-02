// One-off: rewrite /blog/<slug>/ post links to /<slug>/ in the Markdown, and trim redirects-blog.json to the
// renamed slugs (posts now live at their live root URLs). Safe to re-run.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '../..');
const dir = path.join(ROOT, 'src/content/blog');
let n = 0;
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.md'))) {
  const p = path.join(dir, f);
  const src = fs.readFileSync(p, 'utf8');
  const out = src.replace(/\]\(\/blog\/([^/)#]+)\/(#[^)]*)?\)/g, (m, slug, hash) => {
    if (slug === 'page') return m;
    n++;
    return `](/${slug}/${hash ?? ''})`;
  });
  if (out !== src) fs.writeFileSync(p, out);
}
const rp = path.join(ROOT, 'src/data/redirects-blog.json');
const list = JSON.parse(fs.readFileSync(rp, 'utf8'))
  .map((r) => ({ from: r.from, to: r.to.replace(/^\/blog\//, '/') }))
  .filter((r) => r.from !== r.to);
fs.writeFileSync(rp, JSON.stringify(list, null, 2) + '\n');
console.log('links rewritten', n, 'redirects', list.length);
