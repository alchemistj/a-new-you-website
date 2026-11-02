// Route registry (Rule 3). Every published URL, from publishedPages plus the blog collection.
// D's sitemap, robots and llms.txt read getAllRoutes(). A page not listed here is not published.
import { publishedPages } from './pages';

export type RouteKind = 'page' | 'blog' | 'blog-index';
export interface RouteEntry {
  path: string;
  title: string;
  kind: RouteKind;
}

const blogFiles = import.meta.glob('/src/content/blog/**/*.{md,mdx,json,yaml,yml}');

async function loadBlogRoutes(): Promise<RouteEntry[]> {
  // The blog collection (helper B, src/content.config.ts) may not exist yet. Any failure here
  // means "no blog": no /blog/ index and no post routes.
  // Skip the lookup (and Astro's "collection does not exist" warning) when there are no post files.
  if (Object.keys(blogFiles).length === 0) return [];
  try {
    const { getCollection } = await import('astro:content');
    const posts = (await getCollection('blog' as never)) as unknown as {
      id: string;
      data: { title?: string; draft?: boolean };
    }[];
    const live = posts.filter((p) => !p.data.draft);
    if (live.length === 0) return [];
    return [
      { path: '/blog/', title: 'Blog', kind: 'blog-index' },
      ...live.map((p) => ({
        // Posts live at root URLs (/<slug>/), rendered by helper B's src/pages/[post]/index.astro.
        path: `/${p.id}/`,
        title: p.data.title ?? p.id,
        kind: 'blog' as const,
      })),
    ];
  } catch {
    return [];
  }
}

let cache: Promise<RouteEntry[]> | undefined;

export function getAllRoutes(): Promise<RouteEntry[]> {
  cache ??= (async () => {
    const pages: RouteEntry[] = publishedPages.map((p) => ({
      path: p.route,
      title: p.seo.title,
      kind: 'page' as const,
    }));
    const blog = await loadBlogRoutes();
    return [...pages, ...blog].sort((a, b) => a.path.localeCompare(b.path));
  })();
  return cache;
}

export async function routeExists(path: string): Promise<boolean> {
  return (await getAllRoutes()).some((r) => r.path === path);
}
