// JSON-LD builders. No aggregateRating or Review markup anywhere (Rule 0.2).
import type { PageCopy } from '../../types/page';
import {
  ADDRESS,
  BUSINESS_NAME,
  EMAIL,
  ORG_ID,
  PHONE_E164,
  SAME_AS,
  SERVICE_AREA,
  SITE_URL,
  absoluteUrl,
} from './nap';

export type JsonLd = Record<string, unknown>;

/** What articleJsonLd needs from a blog post (helper B maps its content entry to this). */
export interface ArticleInput {
  title: string;
  description: string;
  /** Canonical path with trailing slash, e.g. "/blog/menowhat/". */
  path: string;
  /** ISO date string or Date. */
  datePublished: string | Date;
  dateModified?: string | Date;
  /** Absolute URL or site path of the post image, if any. */
  image?: string;
  authorName?: string;
}

const iso = (d: string | Date): string => (d instanceof Date ? d.toISOString() : d);

export function organizationJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': ['MedicalClinic', 'LocalBusiness'],
    '@id': ORG_ID,
    name: BUSINESS_NAME,
    url: SITE_URL,
    telephone: PHONE_E164,
    email: EMAIL,
    address: { '@type': 'PostalAddress', ...ADDRESS },
    areaServed: SERVICE_AREA.map((name) => ({ '@type': 'City', name: `${name}, MO` })),
    founder: {
      '@type': 'Person',
      name: 'Lucinda "Cindy" Sparks',
      honorificSuffix: 'MSN, CNM, APRN',
    },
    sameAs: [...SAME_AS],
  };
}

export function breadcrumbJsonLd(path: string, title: string): JsonLd {
  const items: { name: string; path: string }[] = [{ name: 'Home', path: '/' }];
  if (path.startsWith('/blog/') && path !== '/blog/') items.push({ name: 'Blog', path: '/blog/' });
  if (path !== '/') items.push({ name: title, path });
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(items: { q: string; a: string[] }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a.join('\n\n') },
    })),
  };
}

export function serviceJsonLd(page: PageCopy): JsonLd {
  const areas = page.serviceArea && page.serviceArea.length > 0 ? page.serviceArea : [...SERVICE_AREA];
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.hero.h1,
    description: page.seo.description,
    url: absoluteUrl(page.route),
    provider: { '@id': ORG_ID },
    areaServed: areas.map((name) => ({ '@type': 'City', name: name.includes(',') ? name : `${name}, MO` })),
  };
}

export function articleJsonLd(post: ArticleInput): JsonLd {
  const image = post.image ? (post.image.startsWith('http') ? post.image : absoluteUrl(post.image)) : undefined;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    mainEntityOfPage: absoluteUrl(post.path),
    url: absoluteUrl(post.path),
    datePublished: iso(post.datePublished),
    dateModified: iso(post.dateModified ?? post.datePublished),
    ...(image ? { image } : {}),
    author: { '@type': 'Person', name: post.authorName ?? 'Lucinda "Cindy" Sparks' },
    publisher: { '@id': ORG_ID },
  };
}
