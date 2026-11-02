import type { APIRoute } from 'astro';
import { getAllRoutes } from '../lib/routes';
import { buildSitemapXml } from '../lib/seo/files';

export const GET: APIRoute = async () =>
  new Response(buildSitemapXml(await getAllRoutes()), {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
