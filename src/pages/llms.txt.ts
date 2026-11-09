import type { APIRoute } from 'astro';
import { getAllRoutes } from '../lib/routes';
import { buildLlmsTxt } from '../lib/seo/files';

export const GET: APIRoute = async () =>
  new Response(buildLlmsTxt(await getAllRoutes()), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
