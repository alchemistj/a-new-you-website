import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import middleware, {
  ENTRY_REDIRECTS,
  FF_BOT_COOKIE,
  FF_BOT_MAX_AGE_SECONDS,
  FF_SID_COOKIE,
  FF_SID_MAX_AGE_SECONDS,
  FF_VID_COOKIE,
  FF_VID_MAX_AGE_SECONDS,
  config,
} from '../../middleware';

const PAGE = 'https://anewyouwoman.com/weight-loss/';
const BROWSER =
  'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36';
const ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._:-]{7,127}$/;

function htmlRequest(url: string, init: RequestInit = {}): Request {
  const headers = new Headers(init.headers);
  if (!headers.has('user-agent')) headers.set('user-agent', BROWSER);
  return new Request(url, { ...init, headers });
}

function setCookies(response: Response): string[] {
  return response.headers.getSetCookie();
}

function cookieValue(header: string, name: string): string {
  const match = header.match(new RegExp(`^${name}=([^;]+)`));
  expect(match, header).toBeTruthy();
  return decodeURIComponent(match?.[1] ?? '');
}

function assertPassThrough(response: Response): void {
  expect(response.status).toBe(200);
  expect(response.headers.get('location')).toBeNull();
  expect(response.headers.get('x-middleware-next')).toBe('1');
  const names = [...response.headers.keys()].filter((name) => name !== 'x-middleware-next');
  expect(names).toEqual([]);
}

describe('ff_vid / ff_sid middleware', () => {
  it('declares a matcher that skips api, astro assets, images, and text files', () => {
    const matcher = config.matcher.join(' ');
    for (const token of ['api/', '_astro/', 'images/', 'fonts/', 'favicon', 'robots\\.txt', 'sitemap', 'llms']) {
      expect(matcher).toContain(token);
    }
  });

  it('sets both cookies on HTML and only refreshes ff_sid next time', () => {
    const first = middleware(htmlRequest(PAGE));
    expect(first.headers.get('x-middleware-next')).toBe('1');
    expect(first.headers.get('location')).toBeNull();
    const cookies = setCookies(first);
    expect(cookies).toHaveLength(2);
    const visitor = cookies.find((cookie) => cookie.startsWith(`${FF_VID_COOKIE}=`));
    const session = cookies.find((cookie) => cookie.startsWith(`${FF_SID_COOKIE}=`));
    expect(visitor).toBeTruthy();
    expect(session).toBeTruthy();
    const visitorId = cookieValue(visitor ?? '', FF_VID_COOKIE);
    const sessionId = cookieValue(session ?? '', FF_SID_COOKIE);
    expect(visitorId).toMatch(ID_PATTERN);
    expect(sessionId).toMatch(ID_PATTERN);
    expect(visitorId).not.toBe(sessionId);
    expect(visitor).toBe(
      `${FF_VID_COOKIE}=${visitorId}; Path=/; Max-Age=${FF_VID_MAX_AGE_SECONDS}; SameSite=Lax; Secure`,
    );
    expect(session).toBe(
      `${FF_SID_COOKIE}=${sessionId}; Path=/; Max-Age=${FF_SID_MAX_AGE_SECONDS}; SameSite=Lax; Secure`,
    );
    expect(visitor).not.toContain('HttpOnly');
    expect(FF_VID_MAX_AGE_SECONDS).toBe(15_552_000);
    expect(FF_SID_MAX_AGE_SECONDS).toBe(1_800);

    const second = middleware(
      htmlRequest(PAGE, {
        headers: { cookie: `${FF_VID_COOKIE}=${visitorId}; ${FF_SID_COOKIE}=${sessionId}` },
      }),
    );
    expect(setCookies(second)).toEqual([
      `${FF_SID_COOKIE}=${sessionId}; Path=/; Max-Age=${FF_SID_MAX_AGE_SECONDS}; SameSite=Lax; Secure`,
    ]);
  });

  it('sets the same pair on HEAD and on / and nothing on POST', () => {
    expect(setCookies(middleware(htmlRequest(PAGE, { method: 'HEAD' })))).toHaveLength(2);
    expect(setCookies(middleware(htmlRequest('https://anewyouwoman.com/')))).toHaveLength(2);
    assertPassThrough(middleware(htmlRequest(PAGE, { method: 'POST' })));
  });

  it('sets nothing on assets, /api/, or a prefetch', () => {
    const cases = [
      htmlRequest('https://anewyouwoman.com/api/site-events/'),
      htmlRequest('https://anewyouwoman.com/_astro/app.js'),
      htmlRequest('https://anewyouwoman.com/images/hero.webp'),
      htmlRequest('https://anewyouwoman.com/favicon.ico'),
      htmlRequest('https://anewyouwoman.com/robots.txt'),
      htmlRequest('https://anewyouwoman.com/sitemap.xml'),
      htmlRequest('https://anewyouwoman.com/llms.txt'),
      htmlRequest('https://anewyouwoman.com/weight-loss'),
      htmlRequest(PAGE, { headers: { purpose: 'prefetch' } }),
    ];
    for (const request of cases) {
      const response = middleware(request);
      assertPassThrough(response);
      expect(setCookies(response), request.url).toEqual([]);
    }
  });

  it('sets ff_bot=1 for bots and never the identity cookies', () => {
    const bots = [
      'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
      'Mozilla/5.0 (Linux; Android 11; moto g power) AppleWebKit/537.36 Chrome/119.0.0.0 Mobile Safari/537.36 Chrome-Lighthouse',
      'Mozilla/5.0 (compatible; ExampleBot/1.0; +https://example.com/bot)',
    ];
    for (const userAgent of bots) {
      const response = middleware(htmlRequest(PAGE, { headers: { 'user-agent': userAgent } }));
      expect(response.headers.get('x-middleware-next')).toBe('1');
      expect(response.headers.get('location')).toBeNull();
      const cookies = setCookies(response);
      expect(cookies).toEqual([
        `${FF_BOT_COOKIE}=1; Path=/; Max-Age=${FF_BOT_MAX_AGE_SECONDS}; SameSite=Lax; Secure`,
      ]);
      expect(FF_BOT_MAX_AGE_SECONDS).toBe(120);
      expect(cookies.some((cookie) => cookie.startsWith(`${FF_VID_COOKIE}=`))).toBe(false);
      expect(cookies.some((cookie) => cookie.startsWith(`${FF_SID_COOKIE}=`))).toBe(false);
    }
  });

  it('sets identity cookies for a CUBOT phone', () => {
    const response = middleware(
      htmlRequest(PAGE, {
        headers: {
          'user-agent':
            'Mozilla/5.0 (Linux; Android 11; CUBOT KINGKONG) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
        },
      }),
    );
    const cookies = setCookies(response);
    expect(cookies).toHaveLength(2);
    expect(cookies.some((cookie) => cookie.startsWith(`${FF_BOT_COOKIE}=`))).toBe(false);
  });

  it('does not add a vanity redirect', () => {
    expect(ENTRY_REDIRECTS).toEqual({});
    const response = middleware(htmlRequest('https://anewyouwoman.com/Springfield'));
    expect(response.status).not.toBe(308);
    expect(response.headers.get('location')).toBeNull();
    const source = readFileSync(new URL('../../middleware.ts', import.meta.url), 'utf8');
    expect(source).not.toContain('sraroofs.com');
  });
});

describe('journey script does not sit in the hero gate', () => {
  it('boots from a deferred module after the atf marker', () => {
    const layout = readFileSync(new URL('../../src/layouts/BaseLayout.astro', import.meta.url), 'utf8');
    expect(layout.indexOf('class="atf-ready"')).toBeGreaterThan(-1);
    expect(layout.indexOf('bootJourneyTracking')).toBeGreaterThan(layout.indexOf('class="atf-ready"'));
    expect(layout).not.toMatch(/<script is:inline>[\s\S]*bootJourneyTracking/);
  });
});
