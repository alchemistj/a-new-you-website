// STUB by helper D. Helper A owns src/lib/routes.ts; take A's version when merging.
// Contract: getAllRoutes(): Promise<{ path; title; kind: 'page' | 'blog' | 'blog-index' }[]>
// This stub covers published pages only (no blog collection yet).
import { publishedPages } from '../data/pages/index';

export interface RouteEntry {
  path: string;
  title: string;
  kind: 'page' | 'blog' | 'blog-index';
}

export async function getAllRoutes(): Promise<RouteEntry[]> {
  return publishedPages.map((p) => ({ path: p.route, title: p.seo.title, kind: 'page' as const }));
}
