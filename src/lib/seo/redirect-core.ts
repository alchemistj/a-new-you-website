// Pure redirect helpers (no import.meta.glob), so plain Node and vitest can both use them.
// The assembled map lives in src/data/redirects.ts.

export interface Redirect {
  /** Canonical slash form of the old path, e.g. "/botox-in-springfield-mo/". */
  from: string;
  /** New path, with trailing slash. */
  to: string;
  /** true = `from` is a path-to-regexp pattern (":name", "*"), not a literal path. */
  pattern?: boolean;
}

/** Page redirects from the brief's "Pages and URLs" table. Must equal what the page files produce. */
export const FALLBACK_PAGE_REDIRECTS: Redirect[] = [
  { from: '/weight-loss-in-springfield/', to: '/weight-loss/' },
  { from: '/semaglutide-in-springfield-mo/', to: '/semaglutide/' },
  { from: '/botox-in-springfield-mo/', to: '/botox/' },
  { from: '/cryolypolysis/', to: '/cryolipolysis/' },
  { from: '/thyroid-optimization/', to: '/menopause/' },
  { from: '/pcos-management/', to: '/menopause/' },
  { from: '/female-sexual-disfunction-disorder/', to: '/female-sexual-dysfunction/' },
];

/** Dropped pages: events (index + 6 children), placeholder and ticket pages. All go to "/". */
export const DROPPED_PAGES: string[] = [
  '/upcoming-events/',
  '/events/',
  '/events/hormone-optimization/',
  '/events/anti-aging-12-12-24/',
  '/events/hormone-optimization-12-03-24/',
  '/events/kick-the-sugar-12-19-24/',
  '/events/hormone-optimization-seminar/',
  '/events/anti-aging-seminar/',
  '/placeholder/',
  '/ticket-receipt/',
  '/ticket-details/',
];

// Taxonomy URLs from the live sitemaps (audit section 1; tag list re-read from post_tag-sitemap.xml
// 2026-11-02 because the audit abbreviates the long tag slug).
export const CATEGORY_SLUGS: string[] = [
  'upcoming-events',
  'health-and-wellness',
  'uncategorized/hormone-optimization',
  'peptides',
  'uncategorized',
  'weight-loss',
];

export const TAG_SLUGS: string[] = [
  'a-new-you-womens-clinic',
  'anewyouwomensclinic',
  'anti-aging',
  'appetite-control',
  'bhrt',
  'bio',
  'biohacking',
  'bioidentical',
  'bioidenticalhrt-hormonebalance-menopauserelief-healthyaging-womenshealth-bioidenticalhormones-naturalhormonetherapy-anewyouwomensclinic',
  'fat',
  'fat-loss',
  'fat-weight-lvisceral',
  'functional-medicine',
  'glp-1',
  'hormone-health',
  'hormone-imbalance',
  'hormone-replacement',
  'hormones',
  'immune-boost',
  'insulin-resistance',
  'lean-muscle',
  'medical-weight-loss',
  'menopause',
  'metabolic-health',
  'metabolism',
  'morpheus8',
  'naturalhormonetherapy',
  'obesity-treatment',
  'ozempic',
  'peptide-therapy',
  'peptides',
  'perimenopause',
  'renewal',
  'semaglutide',
  'skinny-shot',
  'sleep',
  'supplementation',
  'sustainable-weight-loss',
  'tirzepatide',
  'visceral',
  'weight-loss',
  'weight-loss-clinic',
];

export const AUTHOR_SLUGS: string[] = ['lucinda', 'anewyouwomen'];

export function dropListRedirects(): Redirect[] {
  return [
    ...DROPPED_PAGES.map((from) => ({ from, to: '/' })),
    ...CATEGORY_SLUGS.map((s) => ({ from: `/category/${s}/`, to: '/blog/' })),
    ...TAG_SLUGS.map((s) => ({ from: `/tag/${s}/`, to: '/blog/' })),
    ...AUTHOR_SLUGS.map((s) => ({ from: `/author/${s}/`, to: '/blog/' })),
    { from: '/tag/', to: '/blog/' },
  ];
}

/** Catch-alls for anything deeper (pagination, new slugs). Listed after the explicit URLs. */
export const TAXONOMY_WILDCARDS: Redirect[] = [
  { from: '/category/:path*', to: '/blog/', pattern: true },
  { from: '/tag/:path*', to: '/blog/', pattern: true },
  { from: '/author/:path*', to: '/blog/', pattern: true },
];

/** Old paginated blog URLs. Dropped when the new blog paginates at the same paths. */
export const BLOG_PAGINATION_REDIRECT: Redirect = { from: '/blog/page/:n(\\d+)', to: '/blog/', pattern: true };

/** Yoast's sitemap index is what Search Console has today. */
export const SITEMAP_REDIRECTS: Redirect[] = [{ from: '/sitemap_index.xml', to: '/sitemap.xml' }];

export function normalizePath(p: string): string {
  return p.startsWith('/') ? p : `/${p}`;
}

/** Merge lists in order. Same `from` + same `to` collapses; same `from` + different `to` throws. */
export function mergeRedirects(...lists: Redirect[][]): Redirect[] {
  const seen = new Map<string, Redirect>();
  for (const list of lists) {
    for (const r of list) {
      const key = r.from;
      const prev = seen.get(key);
      if (prev) {
        if (prev.to !== r.to) throw new Error(`Conflicting redirects for ${key}: ${prev.to} vs ${r.to}`);
        continue;
      }
      seen.set(key, r);
    }
  }
  return [...seen.values()];
}

export function pageRedirectsFrom(pages: { route: string; oldUrls: string[] }[]): Redirect[] {
  const out: Redirect[] = [];
  for (const page of pages) {
    for (const oldUrl of page.oldUrls) {
      if (oldUrl === page.route) continue;
      out.push({ from: oldUrl, to: page.route });
    }
  }
  return out;
}

// ---- vercel.json ----

/** Escape characters that path-to-regexp treats as syntax, for literal sources. */
export function escapeSource(source: string): string {
  return source.replace(/[()*+?{}:]/g, (c) => `\\${c}`);
}

function sourceForms(r: Redirect): string[] {
  if (r.pattern) {
    // Wildcards already match both forms. Other patterns are written without the trailing slash.
    if (r.from.includes('*')) return [r.from];
    const base = r.from.replace(/\/$/, '');
    return [base, `${base}/`];
  }
  const literal = escapeSource(r.from);
  if (literal === '/') return [];
  const noSlash = literal.replace(/\/$/, '');
  return [literal.endsWith('/') ? literal : `${literal}/`, noSlash];
}

export interface VercelRedirect {
  source: string;
  destination: string;
  statusCode: 301;
  has?: { type: 'host'; value: string }[];
}

export const CANONICAL_HOST = 'anewyouwoman.com';

/**
 * @param redirects the complete old-URL map
 * @param canonicalRoutes live routes; each gets a no-slash -> slash 301 (Rule 15)
 */
export function buildVercelRedirects(redirects: Redirect[], canonicalRoutes: string[]): VercelRedirect[] {
  const out: VercelRedirect[] = [
    {
      source: '/:path(.*)',
      has: [{ type: 'host', value: `www.${CANONICAL_HOST}` }],
      destination: `https://${CANONICAL_HOST}/:path`,
      statusCode: 301,
    },
  ];
  const used = new Set<string>();
  for (const r of redirects) {
    for (const source of sourceForms(r)) {
      if (used.has(source)) continue;
      used.add(source);
      out.push({ source, destination: r.to, statusCode: 301 });
    }
  }
  for (const route of [...new Set(canonicalRoutes)].sort()) {
    if (route === '/' || !route.endsWith('/')) continue;
    const noSlash = escapeSource(route.slice(0, -1));
    if (used.has(noSlash)) continue;
    used.add(noSlash);
    out.push({ source: noSlash, destination: route, statusCode: 301 });
  }
  return out;
}

export const CACHE_HEADERS = [
  {
    source: '/_astro/(.*)',
    headers: [{ key: 'Cache-Control', value: 'max-age=31536000, immutable' }],
  },
  {
    source: '/images/(.*)',
    headers: [{ key: 'Cache-Control', value: 'max-age=86400, stale-while-revalidate=604800' }],
  },
  {
    source: '/((?!_astro/|images/).*)',
    headers: [{ key: 'Cache-Control', value: 'max-age=0, must-revalidate' }],
  },
];

export function buildVercelConfig(redirects: Redirect[], canonicalRoutes: string[]) {
  return {
    $schema: 'https://openapi.vercel.sh/vercel.json',
    framework: 'astro',
    trailingSlash: true,
    headers: CACHE_HEADERS,
    redirects: buildVercelRedirects(redirects, canonicalRoutes),
  };
}
