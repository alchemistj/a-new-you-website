// Resolves nav.ts against the route registry: a link to a route that is not published is dropped
// (Rule 3: a page that is not in the registry is not linked).
import { footerCompanyLinks, quickLinks, serviceLabels, topBarLinks, type NavLink } from '../data/nav';
import { getAllRoutes } from './routes';
import { publishedPages } from './pages';

export interface ResolvedNav {
  quickLinks: NavLink[];
  topBarLinks: NavLink[];
  footerServices: NavLink[];
  footerCompany: NavLink[];
}

let cache: Promise<ResolvedNav> | undefined;

export function getNav(): Promise<ResolvedNav> {
  cache ??= (async () => {
    const live = new Set((await getAllRoutes()).map((r) => r.path));
    const keep = (l: NavLink) => l.href === '/' || live.has(l.href);
    const order = Object.keys(serviceLabels);
    const footerServices = publishedPages
      .filter((p) => p.template === 'service')
      .sort((a, b) => {
        const ia = order.indexOf(a.slug);
        const ib = order.indexOf(b.slug);
        return (ia < 0 ? 999 : ia) - (ib < 0 ? 999 : ib);
      })
      .map((p) => ({ label: serviceLabels[p.slug] ?? p.hero.h1, href: p.route }));
    return {
      quickLinks: quickLinks.filter(keep),
      topBarLinks: topBarLinks.filter(keep),
      footerServices,
      footerCompany: footerCompanyLinks.filter(keep),
    };
  })();
  return cache;
}

export function labelForSlug(slug: string, fallback: string): string {
  return serviceLabels[slug] ?? fallback;
}
