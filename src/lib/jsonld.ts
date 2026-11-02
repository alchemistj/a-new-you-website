// Builds the JSON-LD list for a page using helper D's src/lib/seo/jsonld.ts when it exists.
// D's file may not be on this branch yet, so it is picked up through a glob and the page simply
// carries no JSON-LD until it lands. Contract: organizationJsonLd(), breadcrumbJsonLd(path, title),
// faqJsonLd(items), serviceJsonLd(page).
import type { PageCopy } from '../types/page';

type JsonLd = Record<string, unknown>;
interface Seo {
  organizationJsonLd?: () => JsonLd;
  breadcrumbJsonLd?: (path: string, title: string) => JsonLd;
  faqJsonLd?: (items: { q: string; a: string[] }[]) => JsonLd;
  serviceJsonLd?: (page: PageCopy) => JsonLd;
}

const found = import.meta.glob<Seo>('./seo/jsonld.ts', { eager: true });
const seo: Seo = Object.values(found)[0] ?? {};

export function pageJsonLd(page: PageCopy): JsonLd[] {
  const out: (JsonLd | undefined)[] = [];
  if (page.template === 'home') out.push(seo.organizationJsonLd?.());
  if (page.route !== '/') out.push(seo.breadcrumbJsonLd?.(page.route, page.hero.h1));
  if (page.template === 'service') out.push(seo.serviceJsonLd?.(page));
  const faq = page.sections.find((s) => s.kind === 'faq');
  if (faq && faq.kind === 'faq') out.push(seo.faqJsonLd?.(faq.items));
  return out.filter((x): x is JsonLd => Boolean(x));
}
