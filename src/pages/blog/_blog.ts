// Shared helpers for the blog pages. The leading underscore keeps this file out of the route table.
import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';
import { publishedPages } from '../../data/pages/index';

export type BlogPost = CollectionEntry<'blog'>;

export const POSTS_PER_PAGE = 12;

/** All posts, newest first. */
export async function getPosts(): Promise<BlogPost[]> {
  const posts = await getCollection('blog');
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export const blogPath = (id: string): string => `/${id}/`;
export const pagePath = (n: number): string => (n <= 1 ? '/blog/' : `/blog/page/${n}/`);

const imageModules = import.meta.glob<{ default: ImageMetadata }>('/src/assets/blog/**/*.{jpg,jpeg,png,webp,avif,gif}');

/** Resolve an ImageRef.src ("blog/<slug>/file.jpg", relative to src/assets/) to image metadata. */
export async function loadImage(src: string | undefined): Promise<ImageMetadata | undefined> {
  if (!src) return undefined;
  const loader = imageModules[`/src/assets/${src}`];
  return loader ? (await loader()).default : undefined;
}

const SERVICE_LABELS: Record<string, string> = {
  '/weight-loss/': 'Weight Loss',
  '/semaglutide/': 'Semaglutide',
  '/botox/': 'Botox',
  '/aesthetics/': 'Aesthetics',
  '/cryolipolysis/': 'Cryolipolysis',
  '/menopause/': 'Menopause',
  '/perimenopause/': 'Perimenopause',
  '/vaginal-rejuvenation/': 'Vaginal Wellness',
  '/female-sexual-dysfunction/': 'Female Sexual Dysfunction',
  '/mens-health/': "Men's Health",
  '/biote/': 'Biote',
};

/** The related service link for a post, only when that page is published. */
export function relatedService(route: string | undefined): { href: string; label: string } | undefined {
  if (!route || !SERVICE_LABELS[route]) return undefined;
  if (!publishedPages.some((p) => p.route === route)) return undefined;
  return { href: route, label: SERVICE_LABELS[route] };
}

export const dateFormat = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
