import { describe, expect, it } from 'vitest';
import { publishedPages } from '../../src/data/pages/index';
import { blogRedirects, canonicalRoutes, redirects } from '../../src/data/redirects';
import {
  AUTHOR_SLUGS,
  CATEGORY_SLUGS,
  DROPPED_PAGES,
  FALLBACK_PAGE_REDIRECTS,
  TAG_SLUGS,
  pageRedirectsFrom,
} from '../../src/lib/seo/redirect-core';

const HELD = ['/styku/', '/image-skincare/', '/nutrametrix/'];
const byFrom = new Map(redirects.map((r) => [r.from, r.to]));
const sortKey = (r: { from: string; to: string }) => `${r.from} ${r.to}`;

describe('redirect map', () => {
  it('has no duplicate sources', () => {
    expect(new Set(redirects.map((r) => r.from)).size).toBe(redirects.length);
  });

  it('sends every dropped event/placeholder/ticket page to /', () => {
    expect(DROPPED_PAGES).toHaveLength(11);
    expect(DROPPED_PAGES.filter((p) => p.startsWith('/events/'))).toHaveLength(7); // index + 6 children
    for (const from of DROPPED_PAGES) expect(byFrom.get(from)).toBe('/');
  });

  it('sends every category, tag and author URL from the audit to /blog/', () => {
    expect(CATEGORY_SLUGS).toHaveLength(6);
    expect(TAG_SLUGS).toHaveLength(42);
    expect(AUTHOR_SLUGS).toHaveLength(2);
    for (const s of CATEGORY_SLUGS) expect(byFrom.get(`/category/${s}/`)).toBe('/blog/');
    for (const s of TAG_SLUGS) expect(byFrom.get(`/tag/${s}/`)).toBe('/blog/');
    for (const s of AUTHOR_SLUGS) expect(byFrom.get(`/author/${s}/`)).toBe('/blog/');
  });

  it('covers every page in the brief table', () => {
    expect(byFrom.get('/thyroid-optimization/')).toBe('/springfield/menopause/');
    expect(byFrom.get('/pcos-management/')).toBe('/springfield/menopause/');
    expect(byFrom.get('/subscription-plans/')).toBe('/memberships/');
    expect(byFrom.get('/vaginal-rejuvenation/')).toBe('/springfield/vaginal-wellness/');
    expect(byFrom.get('/cryolypolysis/')).toBe('/springfield/cryolipolysis/');
  });

  it('has no redirect for held pages and never targets them', () => {
    for (const held of HELD) {
      expect(byFrom.has(held)).toBe(false);
      expect(redirects.some((r) => r.to === held)).toBe(false);
    }
  });

  it('every target has a trailing slash (or is the sitemap file)', () => {
    for (const r of redirects) expect(r.to.endsWith('/') || r.to === '/sitemap.xml').toBe(true);
  });

  it('blog redirects (helper B), when present, point to root post URLs', () => {
    for (const r of blogRedirects) {
      expect(r.from.startsWith('/')).toBe(true);
      expect(/^\/[^/]+\/$/.test(r.to), r.to).toBe(true);
      expect(r.to.startsWith('/blog/')).toBe(false);
    }
  });

  it.skipIf(publishedPages.length === 0)('fallback list equals what the page files produce', () => {
    const fromPages = pageRedirectsFrom(publishedPages).sort((a, b) => sortKey(a).localeCompare(sortKey(b)));
    const fallback = [...FALLBACK_PAGE_REDIRECTS].sort((a, b) => sortKey(a).localeCompare(sortKey(b)));
    expect(fromPages).toEqual(fallback);
  });

  it('canonical routes include every published page', () => {
    for (const p of publishedPages) expect(canonicalRoutes).toContain(p.route);
  });
});
