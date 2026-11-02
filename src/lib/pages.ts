// The one place the site reads published page copy from.
// Normal builds use src/data/pages (publishedPages). When FF_FIXTURES=1 (tests only) the pages come
// from tests/foundation/fixtures/ instead, so the templates can be built and gated before the
// real page files land. Nothing in src/data/pages is written or read by the fixtures.
import type { PageCopy } from '../types/page';
import { publishedPages as realPublished, allPages as realAll } from '../data/pages';

const fixtureModules = import.meta.glob<{ page: PageCopy }>('/tests/foundation/fixtures/*.ts', {
  eager: true,
});

const useFixtures = process.env.FF_FIXTURES === '1';

const fixturePages: PageCopy[] = Object.values(fixtureModules)
  .map((m) => m.page)
  .sort((a, b) => a.route.localeCompare(b.route));

export const allPages: PageCopy[] = useFixtures ? fixturePages : realAll;
export const publishedPages: PageCopy[] = allPages.filter((p) => p.publish);

export function getPublishedPage(slug: string): PageCopy | undefined {
  return publishedPages.find((p) => p.slug === slug);
}

export const usingFixtures = useFixtures;
// Keep the real import referenced so the production path is unchanged by tree-shaking.
void realPublished;
