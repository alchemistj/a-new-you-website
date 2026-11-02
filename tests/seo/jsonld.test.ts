import { describe, expect, it } from 'vitest';
import type { PageCopy } from '../../src/types/page';
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  organizationJsonLd,
  serviceJsonLd,
} from '../../src/lib/seo/jsonld';

const page: PageCopy = {
  slug: 'botox',
  route: '/springfield/botox/',
  template: 'service',
  publish: true,
  oldUrls: ['/botox-in-springfield-mo/'],
  seo: { title: 'Botox in Springfield, MO', description: 'Botox at A New You Women\'s Clinic.' },
  hero: { h1: 'Botox in Springfield, MO' },
  sections: [],
  changes: [],
};

const everything = () =>
  JSON.stringify([
    organizationJsonLd(),
    breadcrumbJsonLd('/springfield/botox/', 'Botox'),
    faqJsonLd([{ q: 'Q?', a: ['A.'] }]),
    serviceJsonLd(page),
    articleJsonLd({ title: 'T', description: 'D', path: '/blog/x/', datePublished: '2025-01-01' }),
  ]);

describe('jsonld', () => {
  it('organization is MedicalClinic + LocalBusiness with the NAP from the brief', () => {
    const org = organizationJsonLd() as Record<string, any>;
    expect(org['@type']).toEqual(['MedicalClinic', 'LocalBusiness']);
    expect(org.name).toBe("A New You Women's Clinic");
    expect(org.telephone).toBe('+14176052153');
    expect(org.email).toBe('info@anewyouwoman.com');
    expect(org.url).toBe('https://anewyouwoman.com');
    expect(org.address).toMatchObject({
      streetAddress: '1426 E Bradford Pkwy, Suite C',
      addressLocality: 'Springfield',
      addressRegion: 'MO',
      postalCode: '65804',
    });
    expect(org.sameAs).toHaveLength(3);
  });

  it('has no aggregateRating or review markup, no Oklahoma, and only the NAP number', () => {
    const all = everything();
    expect(all).not.toMatch(/aggregateRating|"review"|"Review"|ratingValue|reviewCount/);
    expect(all).not.toMatch(/Oklahoma|, OK/);
    const digits = all.match(/\+1\d{10}|\(\d{3}\) \d{3}-\d{4}/g) ?? [];
    expect(new Set(digits)).toEqual(new Set(['+14176052153']));
  });

  it('breadcrumbs use absolute canonical URLs', () => {
    const b = breadcrumbJsonLd('/springfield/botox/', 'Botox') as Record<string, any>;
    expect(b.itemListElement.map((i: any) => i.item)).toEqual([
      'https://anewyouwoman.com/',
      'https://anewyouwoman.com/springfield/botox/',
    ]);
    const post = breadcrumbJsonLd('/blog/menowhat/', 'Menowhat') as Record<string, any>;
    expect(post.itemListElement.map((i: any) => i.name)).toEqual(['Home', 'Blog', 'Menowhat']);
    expect(post.itemListElement.map((i: any) => i.position)).toEqual([1, 2, 3]);
  });

  it('faq includes every answer', () => {
    const f = faqJsonLd([
      { q: 'One?', a: ['a1', 'a2'] },
      { q: 'Two?', a: ['b'] },
    ]) as Record<string, any>;
    expect(f['@type']).toBe('FAQPage');
    expect(f.mainEntity).toHaveLength(2);
    expect(f.mainEntity[0].acceptedAnswer.text).toBe('a1\n\na2');
  });

  it('service points at the page and the organization', () => {
    const s = serviceJsonLd(page) as Record<string, any>;
    expect(s['@type']).toBe('Service');
    expect(s.url).toBe('https://anewyouwoman.com/springfield/botox/');
    expect(s.provider['@id']).toBe('https://anewyouwoman.com/#organization');
    expect(s.areaServed.map((a: any) => a.name)).toContain('Nixa, MO');
  });

  it('article carries dates and canonical url', () => {
    const a = articleJsonLd({
      title: 'T',
      description: 'D',
      path: '/blog/x/',
      datePublished: new Date('2025-01-02T00:00:00Z'),
      image: '/images/x.jpg',
    }) as Record<string, any>;
    expect(a['@type']).toBe('BlogPosting');
    expect(a.datePublished).toBe('2025-01-02T00:00:00.000Z');
    expect(a.dateModified).toBe(a.datePublished);
    expect(a.image).toBe('https://anewyouwoman.com/images/x.jpg');
    expect(a.mainEntityOfPage).toBe('https://anewyouwoman.com/blog/x/');
  });
});
