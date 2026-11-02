// Pure builders for sitemap.xml, robots.txt and llms.txt. The Astro endpoints in src/pages/ call these
// with getAllRoutes() from src/lib/routes.ts.
import { ADDRESS, BUSINESS_NAME, EMAIL, PHONE_DISPLAY, SERVICE_AREA, SITE_URL, absoluteUrl } from './nap';

export interface RouteLike {
  path: string;
  title: string;
  kind: 'page' | 'blog' | 'blog-index';
}

const escapeXml = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

const sortRoutes = (routes: RouteLike[]): RouteLike[] =>
  [...routes].sort((a, b) => (a.path === '/' ? -1 : b.path === '/' ? 1 : a.path.localeCompare(b.path)));

export function buildSitemapXml(routes: RouteLike[]): string {
  const urls = sortRoutes(routes)
    .map((r) => `  <url><loc>${escapeXml(absoluteUrl(r.path))}</loc></url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

/** Indexing is allowed only for a production deployment on Vercel. Anything else is closed. */
export function isProductionBuild(env: Record<string, string | undefined>): boolean {
  return env.VERCEL_ENV === 'production';
}

export function buildRobotsTxt(production: boolean): string {
  if (!production) {
    return 'User-agent: *\nDisallow: /\n';
  }
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
}

export function buildLlmsTxt(routes: RouteLike[]): string {
  const sorted = sortRoutes(routes);
  const line = (r: RouteLike) => `- [${r.title}](${absoluteUrl(r.path)})`;
  const pages = sorted.filter((r) => r.kind === 'page');
  const blog = sorted.filter((r) => r.kind === 'blog-index');
  const posts = sorted.filter((r) => r.kind === 'blog');
  const address = `${ADDRESS.streetAddress}, ${ADDRESS.addressLocality}, ${ADDRESS.addressRegion} ${ADDRESS.postalCode}`;

  const out = [
    `# ${BUSINESS_NAME}`,
    '',
    `> ${BUSINESS_NAME} is a women's health clinic in Springfield, Missouri, founded by Lucinda "Cindy" Sparks, MSN, CNM, APRN, with 23 years in healthcare and 13 years in women's health. Women's health is the focus. Men can use the hormone, weight-loss, metabolic, healthy-aging, peptide, aesthetic, skin and body-contouring services. Vaginal wellness is for women only.`,
    '',
    '## Contact',
    '',
    `- Address: ${address}`,
    `- Phone: ${PHONE_DISPLAY}`,
    `- Email: ${EMAIL}`,
    `- Service area: ${SERVICE_AREA.join(', ')}`,
    '- Insurance: the clinic does not take insurance.',
    '',
    '## Pages',
    '',
    ...pages.map(line),
    ...(blog.length ? ['', '## Blog', '', ...blog.map(line)] : []),
    ...(posts.length ? ['', '## Blog posts', '', ...posts.map(line)] : []),
    '',
  ];
  return out.join('\n');
}
