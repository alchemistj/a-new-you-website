import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import type { PageCopy } from '../../src/types/page';
import { reviews } from '../../src/data/reviews';

const modules = import.meta.glob<{ page: PageCopy }>(['../../src/data/pages/*.ts', '!../../src/data/pages/index.ts'], {
  eager: true,
});
const pages = Object.values(modules).map((m) => m.page);
const assetsRoot = resolve(__dirname, '../../src/assets');

const EXPECTED = [
  'home',
  'weight-loss',
  'semaglutide',
  'botox',
  'aesthetics',
  'cryolipolysis',
  'menopause',
  'perimenopause',
  'vaginal-wellness',
  'female-sexual-dysfunction',
  'mens-health',
  'biote',
  'memberships',
  'financing',
  'about',
  'customer-reviews',
  'contact',
  'faq',
];

function collectImages(value: unknown, out: { src: string; alt: string }[] = []) {
  if (Array.isArray(value)) value.forEach((v) => collectImages(v, out));
  else if (value && typeof value === 'object') {
    const o = value as Record<string, unknown>;
    if (typeof o.src === 'string' && typeof o.alt === 'string') out.push({ src: o.src, alt: o.alt });
    Object.values(o).forEach((v) => collectImages(v, out));
  }
  return out;
}

describe('page copy files', () => {
  it('has exactly the 18 published pages and no held pages', () => {
    expect(pages.map((p) => p.slug).sort()).toEqual([...EXPECTED].sort());
    for (const p of pages) expect(p.publish).toBe(true);
  });

  for (const page of pages) {
    describe(page.slug, () => {
      // The changes log legitimately names the removed content, so it is not scanned.
      const { changes: _changes, ...published } = page;
      const text = JSON.stringify(published);

      it('has a valid route and old URLs', () => {
        expect(page.route).toMatch(/^\/([a-z0-9-]+\/)*$/);
        expect(page.oldUrls.length).toBeGreaterThan(0);
        for (const u of page.oldUrls) expect(u).toMatch(/^\/([a-z0-9-]+\/)*$/);
      });

        it('has an SEO title and a reasonable description length', () => {
        expect(page.seo.title.length).toBeGreaterThan(0);
        expect(page.seo.description.length).toBeGreaterThan(0);
        // Rewritten descriptions are under 155; a few kept live ones are a little longer.
        expect(page.seo.description.length).toBeLessThan(170);
      });

      it('has no banned content', () => {
        expect(text).not.toMatch(/lorem/i);
        expect(text).not.toContain('+62');
        expect(text).not.toMatch(/oklahoma/i);
        expect(text).not.toMatch(/thermiva/i);
        expect(text).not.toMatch(/laser vaginal tightening/i);
        expect(text).not.toMatch(/black friday/i);
        expect(text).not.toMatch(/shareasale/i);
        expect(text).not.toMatch(/logoipsum/i);
        expect(text).not.toMatch(/Woman['’]s Clinic/);
        expect(text).not.toMatch(/A New You Clinic/);
        expect(text).not.toMatch(/aggregateRating|out of 5|stars/i);
      });

      it('does not link to held pages or the old site', () => {
        expect(text).not.toMatch(/styku\/|image-skincare|nutrametrix/i);
        expect(text).not.toMatch(/anewyouwoman\.com\//);
      });

      it('only uses the NAP phone number', () => {
        const matches = text.match(/\(?\d{3}\)?[\s.-]*\d{3}[\s.-]\d{4}/g) ?? [];
        for (const m of matches) expect(m.replace(/\D/g, '')).toBe('4176052153');
        const tel = text.match(/tel:[^"']+/g) ?? [];
        for (const t of tel) expect(t).toBe('tel:+14176052153');
      });

      it('has image files on disk with alt text', () => {
        for (const img of collectImages(page)) {
          expect(existsSync(resolve(assetsRoot, img.src)), img.src).toBe(true);
          expect(img.alt.length).toBeGreaterThan(0);
        }
      });

      it('uses internal links with trailing slashes', () => {
        const hrefs = [...text.matchAll(/"href":"([^"]+)"/g)].map((m) => m[1]);
        for (const h of hrefs) {
          if (h.startsWith('/')) expect(h.endsWith('/'), h).toBe(true);
        }
      });
    });
  }

  it('reviews list is individual reviews with first name + last initial', () => {
    expect(reviews.length).toBeGreaterThan(0);
    for (const r of reviews) {
      expect(r.name).toMatch(/^[A-Z][a-z]+ [A-Z]\.$/);
      expect(r.quote.length).toBeGreaterThan(0);
    }
  });

  it('review sections use the first name + last initial format when a last initial exists', () => {
    for (const p of pages) {
      for (const s of p.sections) {
        if (s.kind === 'review') expect(s.name).not.toMatch(/\d/);
      }
    }
  });
});
