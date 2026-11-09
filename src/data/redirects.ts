// The complete redirect map (Rule 15). One data file; scripts/build-vercel-json.mjs turns it into
// vercel.json and tests/seo checks they match.
//
// Sources, in order:
//  1. page.oldUrls from every published page file (helper C)
//  2. FALLBACK_PAGE_REDIRECTS from the brief's table (so the map is complete before C's files exist;
//     tests/seo asserts the fallback equals what the page files produce)
//  3. src/data/redirects-blog.json (helper B), read if present
//  4. the brief's drop list: events, placeholder, tickets -> "/"; category/tag/author -> "/blog/"
//
// Held pages (/styku/, /image-skincare/, /nutrametrix/) get no redirect.
import { publishedPages } from './pages/index';
import {
  BLOG_PAGINATION_REDIRECT,
  FALLBACK_PAGE_REDIRECTS,
  SITEMAP_REDIRECTS,
  TAXONOMY_WILDCARDS,
  dropListRedirects,
  mergeRedirects,
  pageRedirectsFrom,
  type Redirect,
} from '../lib/seo/redirect-core';

export type { Redirect };

// Optional file: absent until helper B's migration writes it.
const blogModules = import.meta.glob<Redirect[]>('./redirects-blog.json', { eager: true, import: 'default' });
export const blogRedirects: Redirect[] = Object.values(blogModules).flat();

export const pageRedirects: Redirect[] = pageRedirectsFrom(publishedPages);

// If the new blog serves /blog/page/N/ itself, B lists those paths in redirects-blog.json as live
// routes and this catch-all should be removed (see tests/seo/redirects.test.ts).
const blogPaginationLive = true;

export const redirects: Redirect[] = mergeRedirects(
  pageRedirects,
  FALLBACK_PAGE_REDIRECTS,
  blogRedirects,
  dropListRedirects(),
  TAXONOMY_WILDCARDS,
  blogPaginationLive ? [] : [BLOG_PAGINATION_REDIRECT],
  SITEMAP_REDIRECTS,
);

/**
 * Live routes the redirect map knows about: published pages, the blog index and every blog target.
 * Each gets a no-slash -> slash 301 in vercel.json. The full route list is getAllRoutes() in
 * src/lib/routes.ts; tests/seo compares both when it is available.
 */
export const canonicalRoutes: string[] = [
  ...new Set([
    ...publishedPages.map((p) => p.route),
    ...FALLBACK_PAGE_REDIRECTS.map((r) => r.to),
    '/blog/',
    ...blogRedirects.map((r) => r.to).filter((to) => to.startsWith('/blog/')),
  ]),
].sort();
