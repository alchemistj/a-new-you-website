import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { canonicalRoutes, redirects } from '../../src/data/redirects';
import { buildVercelConfig, escapeSource } from '../../src/lib/seo/redirect-core';
import blogRedirects from '../../src/data/redirects-blog.json';

interface Rule {
  source: string;
  destination: string;
  statusCode: number;
  has?: unknown[];
}
const vercel = JSON.parse(readFileSync(new URL('../../vercel.json', import.meta.url), 'utf8')) as {
  trailingSlash: boolean;
  headers: { source: string; headers: { key: string; value: string }[] }[];
  redirects: Rule[];
};

// Live routes: the map's canonical routes plus getAllRoutes() from helper A when it exists.
const routeModules = import.meta.glob<{ getAllRoutes: () => Promise<{ path: string }[]> }>('../../src/lib/routes.ts', {
  eager: true,
});
const registry = Object.values(routeModules)[0];
const liveRoutes = new Set<string>(['/', ...canonicalRoutes]);
if (registry) for (const r of await registry.getAllRoutes()) liveRoutes.add(r.path);

const pathRules = vercel.redirects.filter((r) => !r.has);
const isPattern = (s: string) => /[:*]/.test(s.replace(/\\[:*]/g, ''));

describe('vercel.json', () => {
  it('matches the redirect map exactly (run: node scripts/build-vercel-json.mjs)', () => {
    expect(vercel).toEqual(JSON.parse(JSON.stringify(buildVercelConfig(redirects, canonicalRoutes))));
  });

  it('sets trailingSlash and permanent 301s only', () => {
    expect(vercel.trailingSlash).toBe(true);
    for (const r of vercel.redirects) expect(r.statusCode).toBe(301);
  });

  it('has both slash forms for every literal source', () => {
    const sources = new Set(pathRules.map((r) => r.source));
    for (const r of redirects) {
      if (r.pattern) continue;
      const withSlash = escapeSource(r.from);
      expect(sources.has(withSlash), withSlash).toBe(true);
      expect(sources.has(withSlash.replace(/\/$/, '')), withSlash).toBe(true);
    }
  });

  it('has a no-slash -> slash 301 for every live page route', () => {
    for (const route of canonicalRoutes) {
      if (route === '/') continue;
      const rule = pathRules.find((r) => r.source === escapeSource(route.slice(0, -1)));
      expect(rule?.destination, route).toBeDefined();
    }
  });

  it('has no duplicate sources', () => {
    const keys = vercel.redirects.map((r) => JSON.stringify([r.source, r.has ?? null]));
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('has no redirect chains', () => {
    const literalSources = new Set(pathRules.filter((r) => !isPattern(r.source)).map((r) => r.source));
    for (const r of pathRules) {
      expect(literalSources.has(r.destination), `${r.source} -> ${r.destination}`).toBe(false);
    }
  });

  it('never redirects away from a live route', () => {
    for (const r of pathRules) {
      if (isPattern(r.source)) continue;
      expect(liveRoutes.has(r.source), r.source).toBe(false);
    }
    for (const r of redirects) {
      if (r.pattern) continue;
      expect(liveRoutes.has(r.from), r.from).toBe(false);
    }
  });

  it('every target is a known route', () => {
    const known = new Set([...liveRoutes, '/sitemap.xml']);
    const blogTargets = new Set(blogRedirects.map((b) => b.to));
    for (const r of redirects) {
      // Blog post targets (root URLs) are validated by helper B's tests against the collection.
      if (blogTargets.has(r.to)) continue;
      expect(known.has(r.to), `${r.from} -> ${r.to}`).toBe(true);
    }
  });

  it('sets cache headers from SOP section 6', () => {
    const value = (src: string) => vercel.headers.find((h) => h.source === src)?.headers[0].value;
    expect(value('/_astro/(.*)')).toBe('max-age=31536000, immutable');
    expect(value('/images/(.*)')).toBe('max-age=86400, stale-while-revalidate=604800');
    expect(value('/((?!_astro/|images/).*)')).toBe('max-age=0, must-revalidate');
  });

  it('redirects www to the apex host in one hop', () => {
    const rule = vercel.redirects.find((r) => r.has);
    expect(rule?.destination).toBe('https://anewyouwoman.com/:path');
  });
});
