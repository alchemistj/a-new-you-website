import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { buildLlmsTxt, buildRobotsTxt, buildSitemapXml, isProductionBuild, type RouteLike } from '../../src/lib/seo/files';

const routes: RouteLike[] = [
  { path: '/botox/', title: 'Botox in Springfield, MO', kind: 'page' },
  { path: '/', title: "A New You Women's Clinic", kind: 'page' },
  { path: '/blog/', title: 'Blog', kind: 'blog-index' },
  { path: '/blog/a&b/', title: 'A & B', kind: 'blog' },
];

describe('sitemap.xml', () => {
  const xml = buildSitemapXml(routes);
  it('lists every route on the canonical host, home first', () => {
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    expect(locs).toHaveLength(routes.length);
    expect(locs[0]).toBe('https://anewyouwoman.com/');
    for (const l of locs) expect(l.startsWith('https://anewyouwoman.com/')).toBe(true);
  });
  it('escapes XML and has no www/http urls', () => {
    expect(xml).toContain('a&amp;b');
    expect(xml).not.toMatch(/http:\/\/anewyouwoman|www\.anewyouwoman/);
  });
});

describe('robots.txt', () => {
  it('allows all and points at the sitemap in production', () => {
    const txt = buildRobotsTxt(true);
    expect(txt).toContain('Allow: /');
    expect(txt).toContain('Sitemap: https://anewyouwoman.com/sitemap.xml');
    expect(txt).not.toMatch(/Disallow: \/\s*$/m);
  });
  it('disallows everything outside production', () => {
    expect(buildRobotsTxt(false)).toBe('User-agent: *\nDisallow: /\n');
    expect(isProductionBuild({})).toBe(false);
    expect(isProductionBuild({ VERCEL_ENV: 'preview' })).toBe(false);
    expect(isProductionBuild({ VERCEL_ENV: 'production' })).toBe(true);
  });
});

describe('llms.txt', () => {
  const txt = buildLlmsTxt(routes);
  it('states the brief facts and only the NAP number', () => {
    expect(txt).toContain("A New You Women's Clinic");
    expect(txt).toContain('1426 E Bradford Pkwy, Suite C, Springfield, MO 65804');
    expect(txt).toContain('(417) 605-2153');
    expect(txt).toContain('info@anewyouwoman.com');
    expect(txt).toContain('23 years in healthcare and 13 years');
    expect(txt).not.toMatch(/Oklahoma|aggregateRating|stars?\b/i);
    expect((txt.match(/\(\d{3}\) \d{3}-\d{4}/g) ?? []).every((n) => n === '(417) 605-2153')).toBe(true);
  });
  it('links every route with absolute URLs', () => {
    for (const r of routes) expect(txt).toContain(`https://anewyouwoman.com${r.path}`);
  });
  it('never mentions held pages', () => {
    expect(txt).not.toMatch(/styku|image-skincare|nutrametrix/i);
  });
});

describe('endpoints', () => {
  it('read from the route registry', () => {
    for (const f of ['sitemap.xml.ts', 'llms.txt.ts']) {
      expect(readFileSync(new URL(`../../src/pages/${f}`, import.meta.url), 'utf8')).toContain('getAllRoutes');
    }
  });
});
