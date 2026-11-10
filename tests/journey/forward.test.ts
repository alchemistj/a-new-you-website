import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  CLIENT_USER_AGENT_HEADER,
  MAX_CLIENT_USER_AGENT_CHARS,
  MEASUREMENT_FORWARD_KEYS,
  MEASUREMENT_SITE_KEY,
  REPORTS_MEASUREMENT_COLLECT_URL,
  forwardMeasurementCollect,
  measurementCollectHealth,
} from '../../server/lib/forwardMeasurementCollect';
import { handleSiteEvents } from '../../api/site-events';

const productionEvent = {
  contractVersion: 'ff-measure.v1',
  siteKey: 'window-dudes',
  environment: 'production',
  event: 'page_view',
  eventId: 'ff-11111111-1111-4111-8111-111111111111',
  occurredAt: '2026-11-03T12:00:00.000Z',
  visitorId: 'visitor-11111111-1111-4111-8111-111111111111',
  sessionId: 'session-11111111-1111-4111-8111-111111111111',
  landingPath: '/weight-loss/',
  currentPath: '/contact/',
  referrer: 'https://www.google.com/search',
  utmSource: 'google',
  utmMedium: 'cpc',
  utmCampaign: 'weight-loss',
  gclid: 'click-123',
  channel: 'paid',
  device: 'desktop',
  ctaLocation: null,
  email: 'jane@example.com',
  phone: '(417) 605-2153',
  name: 'Jane Patient',
  engaged: true,
  automation: false,
  message: 'Please call me back.',
};

describe('forwardMeasurementCollect', () => {
  it('drops unknown keys, forces the site key, and forwards the production Origin', async () => {
    let forwardedUrl = '';
    let forwardedBody: Record<string, unknown> | null = null;
    let forwardedOrigin = '';
    const fetchImpl = (async (url: string | URL | Request, init?: RequestInit) => {
      forwardedUrl = String(url);
      forwardedBody = JSON.parse(String(init?.body)) as Record<string, unknown>;
      forwardedOrigin = (init?.headers as Record<string, string>).Origin;
      return new Response(JSON.stringify({ ok: true, accepted: 1, ignored: 0 }), {
        status: 202,
        headers: { 'content-type': 'application/json' },
      });
    }) as typeof fetch;

    const result = await forwardMeasurementCollect({
      body: productionEvent,
      origin: 'https://anewyouwoman.com',
      vercelEnv: 'production',
      fetchImpl,
    });

    expect(result.status).toBe(202);
    expect(forwardedUrl).toBe(REPORTS_MEASUREMENT_COLLECT_URL);
    expect(forwardedOrigin).toBe('https://anewyouwoman.com');
    expect(forwardedBody).toBeTruthy();
    expect(forwardedBody?.siteKey).toBe('a-new-you');
    expect(forwardedBody?.siteKey).toBe(MEASUREMENT_SITE_KEY);
    expect(forwardedBody?.environment).toBe('production');
    expect(forwardedBody?.event).toBe('page_view');
    expect(forwardedBody?.gclid).toBe('click-123');
    expect(forwardedBody?.engaged).toBe(true);
    expect(forwardedBody).not.toHaveProperty('automation');
    expect(forwardedBody).not.toHaveProperty('email');
    expect(forwardedBody).not.toHaveProperty('phone');
    expect(forwardedBody).not.toHaveProperty('name');
    expect(forwardedBody).not.toHaveProperty('message');
    for (const key of Object.keys(forwardedBody ?? {})) {
      expect(MEASUREMENT_FORWARD_KEYS.includes(key as (typeof MEASUREMENT_FORWARD_KEYS)[number])).toBe(true);
    }
    expect(JSON.stringify(forwardedBody)).not.toMatch(/jane@example.com|605-2153|Jane Patient/);
  });

  it('sends x-ff-client-user-agent and caps it', async () => {
    const longAgent = `Mozilla/5.0 ${'A'.repeat(1100)}`;
    let headers: Record<string, string> = {};
    const fetchImpl = (async (_url: string | URL | Request, init?: RequestInit) => {
      headers = init?.headers as Record<string, string>;
      return new Response(JSON.stringify({ ok: true }), { status: 202 });
    }) as typeof fetch;

    const forwarded = await forwardMeasurementCollect({
      body: { ...productionEvent, automation: true },
      origin: 'https://anewyouwoman.com',
      vercelEnv: 'production',
      userAgent: longAgent,
      fetchImpl,
    });
    expect(forwarded.status).toBe(202);
    expect(headers[CLIENT_USER_AGENT_HEADER]).toBe(longAgent.trim().slice(0, MAX_CLIENT_USER_AGENT_CHARS));
    expect(headers[CLIENT_USER_AGENT_HEADER]).toHaveLength(MAX_CLIENT_USER_AGENT_CHARS);

    let secondHeaders: Record<string, string> = {};
    await forwardMeasurementCollect({
      body: productionEvent,
      origin: 'https://anewyouwoman.com',
      vercelEnv: 'production',
      userAgent: '   ',
      fetchImpl: (async (_url: string | URL | Request, init?: RequestInit) => {
        secondHeaders = init?.headers as Record<string, string>;
        return new Response('{}', { status: 202 });
      }) as typeof fetch,
    });
    expect(CLIENT_USER_AGENT_HEADER in secondHeaders).toBe(false);
  });

  it('does not forward a production event from www or a preview host', async () => {
    for (const origin of [
      'https://www.anewyouwoman.com',
      'https://a-new-you-website-git-journey-tracking-josh-lenzs-projects.vercel.app',
    ]) {
      let called = false;
      const result = await forwardMeasurementCollect({
        body: productionEvent,
        origin,
        vercelEnv: 'production',
        fetchImpl: (async () => {
          called = true;
          return new Response('{}', { status: 202 });
        }) as typeof fetch,
      });
      expect(called).toBe(false);
      expect(result.status).toBe(202);
      expect(JSON.parse(result.body).skipped).toBe('non_production_host');
    }
  });

  it('sets preview from VERCEL_ENV and does not relabel that event as production', async () => {
    let forwardedBody: Record<string, unknown> | null = null;
    const result = await forwardMeasurementCollect({
      body: { ...productionEvent, environment: 'production' },
      origin: 'https://a-new-you-website-git-journey-tracking.vercel.app',
      vercelEnv: 'preview',
      fetchImpl: (async (_url: string | URL | Request, init?: RequestInit) => {
        forwardedBody = JSON.parse(String(init?.body)) as Record<string, unknown>;
        return new Response('{}', { status: 202 });
      }) as typeof fetch,
    });
    expect(result.status).toBe(202);
    expect(forwardedBody?.environment).toBe('preview');
    expect(forwardedBody?.siteKey).toBe(MEASUREMENT_SITE_KEY);
  });

  it('returns 502 when Reports is unreachable', async () => {
    const result = await forwardMeasurementCollect({
      body: productionEvent,
      origin: 'https://anewyouwoman.com',
      vercelEnv: 'production',
      fetchImpl: (async () => {
        throw new Error('offline');
      }) as typeof fetch,
    });
    expect(result.status).toBe(502);
  });

  it('keeps GET health local and names the collect upstream', async () => {
    expect(measurementCollectHealth().originRewrite).toBe('none');
    expect(measurementCollectHealth().siteKey).toBe('a-new-you');
    const health = await handleSiteEvents({ method: 'GET' });
    expect(health.status).toBe(200);
    expect(JSON.parse(health.body).upstream).toBe(REPORTS_MEASUREMENT_COLLECT_URL);
    const source = readFileSync(new URL('../../api/site-events.ts', import.meta.url), 'utf8');
    expect(source).toContain('from \'../server/lib/forwardMeasurementCollect.js\'');
    expect(source).not.toContain('sraroofs.com');
    expect(source).not.toContain('sra-roofing-website');
  });
});
