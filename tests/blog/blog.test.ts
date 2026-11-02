import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const ROOT = resolve(import.meta.dirname, '../..');
const CONTENT = join(ROOT, 'src/content/blog');
const ASSETS = join(ROOT, 'src/assets');

interface Post {
  slug: string;
  front: Record<string, string>;
  body: string;
  raw: string;
}

function parse(file: string): Post {
  const raw = readFileSync(join(CONTENT, file), 'utf8');
  const m = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(raw);
  if (!m) throw new Error(`${file}: no frontmatter`);
  const front: Record<string, string> = {};
  for (const line of m[1].split('\n')) {
    const kv = /^([A-Za-z]+):\s*(.*)$/.exec(line);
    if (kv) front[kv[1]] = kv[2];
  }
  return { slug: file.replace(/\.md$/, ''), front, body: m[2], raw };
}

const files = readdirSync(CONTENT).filter((f) => f.endsWith('.md'));
const posts = files.map(parse);
const routes = new Set(posts.map((p) => `/${p.slug}/`));

describe('blog content', () => {
  it('has all 45 posts', () => {
    expect(posts).toHaveLength(45);
  });

  it.each(posts.map((p) => [p.slug, p] as const))('%s has title, description and pubDate', (_slug, p) => {
    expect(JSON.parse(p.front.title).trim().length).toBeGreaterThan(0);
    expect(JSON.parse(p.front.description).trim().length).toBeGreaterThan(20);
    expect(p.front.pubDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('has no slug that clashes with a page route segment or a blog route', () => {
    const reserved = ['about', 'biote', 'memberships', 'financing', 'customer-reviews', 'springfield', 'blog', 'page', 'contact', 'faq', 'sitemap', 'robots', 'llms', '_astro'];
    for (const p of posts) expect(reserved, p.slug).not.toContain(p.slug);
    const pagesDir = join(ROOT, 'src/data/pages');
    if (existsSync(pagesDir)) {
      for (const f of readdirSync(pagesDir).filter((x) => x.endsWith('.ts') && x !== 'index.ts')) {
        const route = /route:\s*['"]([^'"]+)['"]/.exec(readFileSync(join(pagesDir, f), 'utf8'))?.[1];
        if (route) expect(routes.has(route), `${f} route ${route}`).toBe(false);
      }
    }
  });

  it('uses clean slugs', () => {
    for (const p of posts) expect(p.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it('has no wp-content or remote image URLs', () => {
    for (const p of posts) {
      expect(p.raw, p.slug).not.toContain('wp-content');
      expect(p.raw, p.slug).not.toMatch(/!\[[^\]]*\]\(\s*(https?:)?\/\//);
      expect(p.raw, p.slug).not.toMatch(/<img\b/i);
    }
  });

  it('points every body image and hero image at a file in the repo', () => {
    for (const p of posts) {
      for (const m of p.body.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)) {
        expect(existsSync(resolve(CONTENT, m[1])), `${p.slug}: ${m[1]}`).toBe(true);
      }
      const hero = /^ {2}src:\s*(".*")$/m.exec(p.raw);
      if (hero) expect(existsSync(join(ASSETS, JSON.parse(hero[1]))), `${p.slug} hero`).toBe(true);
    }
  });

  it('has no raw HTML tags or links to held pages or the old host', () => {
    for (const p of posts) {
      expect(p.body, p.slug).not.toMatch(/<\/?(div|span|section|table|style|script|iframe)\b/i);
      expect(p.body, p.slug).not.toMatch(/\]\((https?:\/\/(www\.)?anewyouwoman\.com|\/(styku|image-skincare|nutrametrix)\/)/);
    }
  });

  it('links internally only to routes that exist', () => {
    const service = /^(\/|\/(springfield\/[a-z-]+|biote|memberships|financing|about|customer-reviews|blog)\/(#.*)?)$/;
    for (const p of posts) {
      for (const m of p.body.matchAll(/(?<!!)\[[^\]]*\]\((\/[^)]*)\)/g)) {
        const href = m[1];
        if (routes.has(href.split("#")[0])) continue;
        else expect(href, p.slug).toMatch(service);
      }
    }
  });

  it('adds at most 2 service links per post', () => {
    for (const p of posts) {
      const n = (/^addedLinks:\s*(\[.*\])$/m.exec(p.raw)?.[1] ?? '[]');
      expect(JSON.parse(n).length, p.slug).toBeLessThanOrEqual(2);
    }
  });
});

describe('blog redirects', () => {
  const redirects: { from: string; to: string }[] = JSON.parse(readFileSync(join(ROOT, 'src/data/redirects-blog.json'), 'utf8'));

  it('redirects exactly the posts whose slug changed (the rest keep their live URL)', () => {
    for (const p of posts) {
      const old = JSON.parse(p.front.oldUrl);
      const hit = redirects.find((r) => r.from === old);
      if (old === `/${p.slug}/`) expect(hit, p.slug).toBeUndefined();
      else expect(hit?.to, p.slug).toBe(`/${p.slug}/`);
    }
    expect(redirects).toHaveLength(5); // 3 renamed slugs + 2 decoded (U+FE0F) variants
  });

  it('sends every `to` to a generated post route', () => {
    for (const r of redirects) expect(routes.has(r.to), `${r.from} -> ${r.to}`).toBe(true);
  });

  it('has unique sources and trailing-slash paths', () => {
    expect(new Set(redirects.map((r) => r.from)).size).toBe(redirects.length);
    for (const r of redirects) {
      expect(r.from.startsWith('/') && r.from.endsWith('/')).toBe(true);
      expect(r.from).not.toBe(r.to);
    }
  });
});
