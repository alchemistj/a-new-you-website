// Foundation gates. By default builds the fixture pages (FF_FIXTURES=1) into .test-dist and checks
// them. To gate the real site: build with astro.test.config.mjs (no FF_FIXTURES) and run
//   GATE_DIR=.test-dist npm test      (or point GATE_DIR at .vercel/output/static after npm run build)
import { beforeAll, describe, expect, it } from 'vitest';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(__dirname, '../..');
const external = process.env.GATE_DIR;
const dist = path.resolve(root, external ?? '.test-dist');

function walk(dir: string, out: string[] = []): string[] {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}
const read = (f: string) => fs.readFileSync(f, 'utf8');
const stripData = (s: string) => s.replace(/data:[a-z/+.-]+;base64,[A-Za-z0-9+/=]+/g, 'data:');

let htmlFiles: string[] = [];
let textFiles: string[] = [];

beforeAll(() => {
  if (!external) {
    fs.rmSync(dist, { recursive: true, force: true });
    execFileSync('npx', ['astro', 'build', '--config', 'astro.test.config.mjs'], {
      cwd: root,
      env: { ...process.env, FF_FIXTURES: '1', ASTRO_TELEMETRY_DISABLED: '1' },
      stdio: 'pipe',
    });
  }
  const all = walk(dist);
  htmlFiles = all.filter((f) => f.endsWith('.html'));
  textFiles = all.filter((f) => /\.(html|css|js|txt|xml|json)$/.test(f));
});

describe('built pages', () => {
  it('builds at least one page', () => expect(htmlFiles.length).toBeGreaterThan(0));

  it('has exactly one H1 per page', () => {
    for (const f of htmlFiles) {
      const n = (stripData(read(f)).match(/<h1[\s>]/g) ?? []).length;
      expect(n, f).toBe(1);
    }
  });

  it('has unique, non-empty titles and descriptions', () => {
    const titles = new Set<string>();
    for (const f of htmlFiles) {
      const h = read(f);
      const t = /<title>([^<]+)<\/title>/.exec(h)?.[1];
      expect(t, f).toBeTruthy();
      expect(titles.has(t!), `duplicate title ${t}`).toBe(false);
      titles.add(t!);
      expect(/<meta name="description" content="[^"]+"/.test(h), f).toBe(true);
    }
  });

  it('has a canonical URL on the apex host and no stray noindex', () => {
    for (const f of htmlFiles) {
      const h = read(f);
      expect(h, f).toMatch(/<link rel="canonical" href="https:\/\/anewyouwoman\.com\/[^"]*"/);
      expect(h.includes('noindex'), f).toBe(false);
    }
  });

  it('only ever shows the NAP phone number', () => {
    const allowed = ['(417) 605-2153', '+14176052153'];
    const phoneRe = /\(\d{3}\)\s*\d{3}[-.\s]\d{4}|\b\d{3}[-.]\d{3}[-.]\d{4}\b|\+\d{10,13}\b|tel:[^"'\s<]+/g;
    for (const f of textFiles) {
      const s = stripData(read(f));
      for (const m of s.match(phoneRe) ?? []) {
        const ok = allowed.some((a) => m === a || m === `tel:${a}`);
        expect(ok, `${f}: ${m}`).toBe(true);
      }
    }
  });

  it('has no supabase.co and no remote image hosts', () => {
    for (const f of textFiles) {
      const s = stripData(read(f));
      expect(s.includes('supabase.co'), f).toBe(false);
      expect(/<img[^>]+src="https?:/i.test(s), `${f} remote <img>`).toBe(false);
      expect(/wp-content\/uploads/.test(s), `${f} wp uploads`).toBe(false);
      expect(/url\(\s*["']?https?:/i.test(s), `${f} remote css url`).toBe(false);
    }
  });

  it('uses trailing slashes on internal links', () => {
    for (const f of htmlFiles) {
      const h = stripData(read(f));
      for (const m of h.matchAll(/<a\s[^>]*href="(\/[^"#?]*)"/g)) {
        const href = m[1]!;
        if (href.includes('.')) continue; // files
        expect(href.endsWith('/'), `${f}: ${href}`).toBe(true);
      }
    }
  });

  it('has no internal link to an unbuilt page', () => {
    const built = new Set(
      htmlFiles.map((f) => '/' + path.relative(dist, f).replace(/index\.html$/, '').replace(/\\/g, '/')),
    );
    for (const f of htmlFiles) {
      // Blog posts (built alongside the fixtures) link to real service pages the fixtures lack.
      const rel = path.relative(dist, f).replace(/\\/g, '/');
      if (!external && !/^(index\.html|springfield\/|about\/|customer-reviews\/)/.test(rel)) continue;
      const h = stripData(read(f));
      for (const m of h.matchAll(/<a\s[^>]*href="(\/[^"#?]*)"/g)) {
        const href = m[1]!;
        if (href.includes('.')) continue;
        expect(built.has(href), `${f}: ${href}`).toBe(true);
      }
    }
  });
});

describe('first frame structure', () => {
  const photoPages = () => htmlFiles.filter((f) => /class="atf-photo"/.test(read(f)));

  it('puts the hero photo first in the body with the right attributes and an .atf-ready gate', () => {
    expect(photoPages().length).toBeGreaterThan(0);
    for (const f of photoPages()) {
      const h = read(f);
      const body = h.slice(h.indexOf('<body'));
      const imgAt = body.indexOf('<img');
      expect(body.slice(imgAt, imgAt + 200)).toContain('class="atf-photo"');
      const tag = /<img class="atf-photo"[^>]*>/.exec(body)![0];
      expect(tag).toMatch(/src="data:image\/avif;base64,/);
      expect(tag).toContain('loading="eager"');
      expect(tag).toContain('fetchpriority="high"');
      expect(tag).toContain('decoding="sync"');
      expect(/width="\d+"/.test(tag) && /height="\d+"/.test(tag)).toBe(true);
      expect(body.indexOf('class="atf-ready"')).toBeGreaterThan(body.indexOf('<h1'));
      expect(h).not.toMatch(/<link[^>]+rel="preload"[^>]+as="image"/);
      expect(h.match(/data:image\/avif/g)?.length ?? 0).toBeLessThanOrEqual(2); // hero + logo
    }
  });

  it('keeps the hero photo within 60KB', () => {
    for (const f of photoPages()) {
      const h = read(f);
      const m = /<img class="atf-photo" src="data:image\/avif;base64,([A-Za-z0-9+/=]+)"/.exec(h)!;
      const bytes = Math.floor((m[1]!.length * 3) / 4);
      expect(bytes, f).toBeLessThanOrEqual(60 * 1024);
    }
  });

  it('inlines the logo under 4KB', () => {
    for (const f of htmlFiles) {
      const m = /<img src="data:image\/avif;base64,([A-Za-z0-9+/=]+)"[^>]*class="logo-img"/.exec(read(f));
      expect(m, f).toBeTruthy();
      expect(Math.floor((m![1]!.length * 3) / 4)).toBeLessThanOrEqual(4096);
    }
  });

  it('renders header, hamburger, mobile bar and FAQ answers in HTML', () => {
    for (const f of htmlFiles) {
      const h = read(f);
      expect(h).toContain('id="site-header"');
      expect(h).toContain('<summary class="menu-btn" aria-label="Menu"');
      expect(h).toContain('class="mobile-bar"');
      expect(h).toContain('href="#main"');
    }
    const home = read(path.join(dist, 'index.html'));
    if (!external) expect(home).toContain('Fixture answer one.');
  });
});
