import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Blog posts live in src/content/blog/<slug>.md. The file name is the URL slug: /blog/<slug>/.
 * Images referenced in the body are relative paths into src/assets/blog/<slug>/.
 */
const blog = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Lucinda "Cindy" Sparks'),
    /** Path of the post on the old WordPress site, used for the 301 redirect. */
    oldUrl: z.string().optional(),
    /** Same shape as ImageRef in src/types/page.ts: src is relative to src/assets/. */
    heroImage: z.object({ src: z.string(), alt: z.string() }).optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    /** Route of the service page this post most obviously relates to. */
    relatedService: z.string().optional(),
    /** Internal links added during the migration (existing words linked to a service page). */
    addedLinks: z.array(z.object({ phrase: z.string(), to: z.string() })).default([]),
  }),
});

export const collections = { blog };
