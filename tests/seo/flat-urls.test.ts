import { describe, expect, it } from 'vitest';
import { allPages } from '../../src/data/pages/index';
import { canonicalRoutes, redirects } from '../../src/data/redirects';
import { getAllRoutes } from '../../src/lib/routes';

describe('flat URLs (no city segment)', () => {
  it('no page route contains /springfield/', () => {
    for (const p of allPages) expect(p.route, p.slug).not.toContain('springfield');
  });

  it('no registry route, canonical route or redirect target contains /springfield/', async () => {
    for (const r of await getAllRoutes()) expect(r.path).not.toContain('/springfield/');
    for (const r of canonicalRoutes) expect(r).not.toContain('/springfield/');
    for (const r of redirects) expect(r.to).not.toContain('/springfield/');
  });

  it('no page lists its own route in oldUrls', () => {
    for (const p of allPages) expect(p.oldUrls, p.slug).not.toContain(p.route);
  });

  it('keeps the live URL unless it had the city or a typo', () => {
    const route = (slug: string) => allPages.find((p) => p.slug === slug)?.route;
    expect(route('weight-loss')).toBe('/weight-loss/');
    expect(route('vaginal-wellness')).toBe('/vaginal-rejuvenation/');
    expect(route('memberships')).toBe('/subscription-plans/');
    expect(route('cryolipolysis')).toBe('/cryolipolysis/');
    expect(route('female-sexual-dysfunction')).toBe('/female-sexual-dysfunction/');
    expect(route('contact')).toBe('/contact/');
    expect(route('faq')).toBe('/faq/');
  });
});
