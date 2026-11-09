// Loads every page copy file in this folder. Do not edit; add a new <slug>.ts file instead.
import type { PageCopy } from '../../types/page';

const modules = import.meta.glob<{ page: PageCopy }>(['./*.ts', '!./index.ts'], { eager: true });

export const allPages: PageCopy[] = Object.values(modules)
  .map((m) => m.page)
  .sort((a, b) => a.route.localeCompare(b.route));

export const publishedPages = allPages.filter((p) => p.publish);

export function getPage(slug: string): PageCopy | undefined {
  return allPages.find((p) => p.slug === slug);
}
