import type { APIRoute } from 'astro';
import { buildRobotsTxt, isProductionBuild } from '../lib/seo/files';

// Static build: this runs at build time. Only a Vercel production build allows indexing;
// previews and local builds disallow everything.
export const GET: APIRoute = () =>
  new Response(buildRobotsTxt(isProductionBuild(process.env)), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
