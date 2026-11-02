// Guards against nav links silently disappearing: src/lib/nav.ts drops links to unpublished
// routes, so a stale href here would vanish from the header/footer without any build error.
import { describe, expect, it } from 'vitest';
import * as nav from '../src/data/nav';
import { publishedPages } from '../src/data/pages';

const pageRoutes = new Set(publishedPages.map((p) => p.route));
const known = new Set([...pageRoutes, '/blog/']);

describe('nav.ts', () => {
  for (const [name, value] of Object.entries(nav)) {
    if (!Array.isArray(value)) continue;
    it(`${name}: every internal link points at a published route`, () => {
      for (const link of value as { label: string; href: string }[]) {
        if (!link.href.startsWith('/')) continue;
        expect(known.has(link.href), `${link.label} -> ${link.href}`).toBe(true);
      }
    });
  }

  it('header has the four priority quick links', () => {
    expect(nav.quickLinks.map((l) => l.href)).toEqual(['/vaginal-rejuvenation/', '/menopause/', '/weight-loss/', '/mens-health/']);
  });
});
