import { afterEach, describe, expect, it } from 'vitest';
import {
  captureAttributionOnEntry,
  clearStoredAttributionForTests,
} from '../../src/lib/attribution/storage';
import {
  resetJourneyTrackingForTests,
  startJourneyTracking,
} from '../../src/lib/measurement/bootstrap';
import {
  beginPageEngagement,
  buildMeasurementEvent,
  collectContactClick,
  collectClickToCall,
  collectMeasurementEvent,
  collectPageView,
  pageViewEventIdFor,
  resetMeasurementForTests,
  resolveSessionChannel,
  shouldSkipLocalJourneySend,
  signalPageEngaged,
} from '../../src/lib/measurement/collect';
import {
  JOURNEY_ENGAGED_ENABLED,
  MEASUREMENT_SITE_KEY,
  SESSION_CHANNEL_KEY,
  deriveSessionChannel,
  hasPiiLeak,
  stripUnknownAndPii,
} from '../../src/lib/measurement/contract';
import { watchEngagedSignal } from '../../src/lib/measurement/engaged';

const VISITOR = 'visitor-11111111-1111-4111-8111-111111111111';
const SESSION = 'session-11111111-1111-4111-8111-111111111111';
const PHONE = '(417) 605-2153';
const EMAIL = 'info@anewyouwoman.com';

type BeaconCall = { url: string; body: string };
type Listener = (event: Event) => void;

type FakeNode = {
  tag: string;
  className: string;
  attrs: Record<string, string>;
  parent: FakeNode | null;
  getAttribute(name: string): string | null;
  closest(selector: string): FakeNode | null;
};

function memoryStorage(): Storage {
  const map = new Map<string, string>();
  return {
    get length() {
      return map.size;
    },
    clear() {
      map.clear();
    },
    getItem(key: string) {
      return map.has(key) ? (map.get(key) ?? null) : null;
    },
    key(index: number) {
      return [...map.keys()][index] ?? null;
    },
    removeItem(key: string) {
      map.delete(key);
    },
    setItem(key: string, value: string) {
      map.set(key, value);
    },
  };
}

function node(tag: string, className = '', attrs: Record<string, string> = {}): FakeNode {
  const self: FakeNode = {
    tag,
    className,
    attrs,
    parent: null,
    getAttribute(name) {
      return self.attrs[name] ?? null;
    },
    closest(selector) {
      let cur: FakeNode | null = self;
      while (cur) {
        if (selector === cur.tag) return cur;
        if (selector.startsWith('.') && cur.className.split(/\s+/).includes(selector.slice(1))) return cur;
        cur = cur.parent;
      }
      return null;
    },
  };
  return self;
}

function installWindow(href: string, referrer = '') {
  const url = new URL(href);
  const listeners = new Map<string, Set<Listener>>();
  const docListeners = new Map<string, Set<Listener>>();
  const calls: BeaconCall[] = [];
  const pending: Promise<void>[] = [];
  let cookie = '';

  const add = (map: Map<string, Set<Listener>>, type: string, fn: Listener) => {
    const set = map.get(type) ?? new Set();
    set.add(fn);
    map.set(type, set);
  };
  const remove = (map: Map<string, Set<Listener>>, type: string, fn: Listener) => {
    map.get(type)?.delete(fn);
  };

  const documentStub = {
    referrer,
    readyState: 'complete',
    visibilityState: 'visible',
    querySelector: () => null,
    get cookie() {
      return cookie;
    },
    set cookie(value: string) {
      cookie = cookie ? `${cookie}; ${value}` : value;
    },
    addEventListener(type: string, fn: Listener) {
      add(docListeners, type, fn);
    },
    removeEventListener(type: string, fn: Listener) {
      remove(docListeners, type, fn);
    },
    dispatchEvent(event: Event) {
      for (const fn of docListeners.get(event.type) ?? []) fn(event);
      return true;
    },
  };

  const win = {
    location: {
      href,
      pathname: url.pathname,
      hostname: url.hostname,
      search: url.search,
    },
    document: documentStub,
    localStorage: memoryStorage(),
    sessionStorage: memoryStorage(),
    innerWidth: 1200,
    navigator: {
      userAgent: 'Mozilla/5.0',
      language: 'en-US',
      languages: ['en-US'] as readonly string[],
      webdriver: false,
      sendBeacon(beaconUrl: string, data?: BodyInit | null) {
        const call: BeaconCall = { url: String(beaconUrl), body: typeof data === 'string' ? data : '' };
        calls.push(call);
        if (data instanceof Blob) pending.push(data.text().then((body) => { call.body = body; }));
        return true;
      },
    },
    addEventListener(type: string, fn: Listener) {
      add(listeners, type, fn);
    },
    removeEventListener(type: string, fn: Listener) {
      remove(listeners, type, fn);
    },
    dispatchEvent(event: Event) {
      for (const fn of listeners.get(event.type) ?? []) fn(event);
      return true;
    },
    setTimeout: globalThis.setTimeout.bind(globalThis),
    clearTimeout: globalThis.clearTimeout.bind(globalThis),
    __FF_JOURNEY_TRACKING__: undefined as boolean | undefined,
    __FF_JOURNEY_SEND_LOCAL__: undefined as boolean | undefined,
  };

  (globalThis as unknown as { window: typeof win }).window = win;
  (globalThis as unknown as { document: typeof documentStub }).document = documentStub;
  return { win, calls, pending, document: documentStub };
}

function setIdentityCookies(win: ReturnType<typeof installWindow>['win']) {
  win.document.cookie = `ff_vid=${VISITOR}`;
  win.document.cookie = `ff_sid=${SESSION}`;
}

async function beaconBodies(pending: Promise<void>[], calls: BeaconCall[]) {
  await Promise.all(pending);
  await new Promise((resolve) => setTimeout(resolve, 0));
  return calls.map((call) => JSON.parse(call.body) as Record<string, unknown>);
}

afterEach(() => {
  resetJourneyTrackingForTests();
  resetMeasurementForTests();
  clearStoredAttributionForTests();
  delete (globalThis as { window?: unknown }).window;
  delete (globalThis as { document?: unknown }).document;
});

describe('journey events', () => {
  it('builds each event once with ff_vid, ff_sid and path, and no PII', async () => {
    const { win, calls, pending } = installWindow(
      `https://anewyouwoman.com/contact/?utm_source=google&utm_medium=organic&email=${EMAIL}`,
      'https://www.google.com/search?q=clinic',
    );
    setIdentityCookies(win);
    captureAttributionOnEntry('/contact/', `?utm_source=google&utm_medium=organic&email=${EMAIL}`);

    startJourneyTracking();
    startJourneyTracking();
    const bodies = await beaconBodies(pending, calls);
    expect(bodies).toHaveLength(1);
    expect(bodies[0]?.event).toBe('page_view');
    expect(bodies[0]?.visitorId).toBe(VISITOR);
    expect(bodies[0]?.sessionId).toBe(SESSION);
    expect(bodies[0]?.currentPath).toBe('/contact/');
    expect(bodies[0]?.landingPath).toBe('/contact/');
    expect(bodies[0]?.siteKey).toBe(MEASUREMENT_SITE_KEY);
    expect(bodies[0]?.environment).toBe('production');
    expect(bodies[0]?.channel).toBe('organic');
    expect(bodies[0]?.citySlug).toBeNull();
    expect('engaged' in (bodies[0] ?? {})).toBe(false);
    expect(calls[0]?.url).toBe('/api/site-events/');
    expect(JSON.stringify(bodies[0])).not.toMatch(new RegExp(`${EMAIL}|605-2153|Jane`));

    calls.length = 0;
    pending.length = 0;
    const link = node('a', '', { href: 'tel:+14176052153', 'data-ff-cta-location': 'header' });
    link.attrs['aria-label'] = PHONE;
    const click = (target: FakeNode) =>
      win.document.dispatchEvent({ type: 'click', target } as unknown as Event);
    click(link);
    click(link);
    const callBodies = (await beaconBodies(pending, calls)).filter((body) => body.event === 'click_to_call');
    expect(callBodies).toHaveLength(2);
    expect(callBodies[0]?.visitorId).toBe(VISITOR);
    expect(callBodies[0]?.sessionId).toBe(SESSION);
    expect(callBodies[0]?.currentPath).toBe('/contact/');
    expect(callBodies[0]?.ctaLocation).toBe('header');
    expect(callBodies[0]?.conversionKind).toBe('interaction');
    expect(JSON.stringify(callBodies)).not.toMatch(/605-2153|\+14176052153/);

    calls.length = 0;
    pending.length = 0;
    const contact = node('a', '', { href: '/contact/', 'data-ff-cta-location': 'footer' });
    click(contact);
    const contactBodies = (await beaconBodies(pending, calls)).filter((body) => body.event === 'contact_click');
    expect(contactBodies).toHaveLength(1);
    expect(contactBodies[0]?.visitorId).toBe(VISITOR);
    expect(contactBodies[0]?.sessionId).toBe(SESSION);
    expect(contactBodies[0]?.currentPath).toBe('/contact/');
    expect(contactBodies[0]?.ctaLocation).toBe('footer');
    expect(hasPiiLeak(contactBodies[0])).toBe(false);

    const again = await collectMeasurementEvent(
      buildMeasurementEvent('contact_click', { eventId: String(contactBodies[0]?.eventId), ctaLocation: 'footer' }),
    );
    expect(again.ok).toBe(true);
    if (again.ok) expect(again.duplicate).toBe(true);
  });

  it('reads ctaLocation from the surrounding region when the link is unmarked', async () => {
    const { win, calls, pending } = installWindow('https://anewyouwoman.com/financing/', '');
    setIdentityCookies(win);
    captureAttributionOnEntry('/financing/', '');
    startJourneyTracking();
    await beaconBodies(pending, calls);
    calls.length = 0;
    pending.length = 0;

    const region = node('section', 'trust-bar');
    const link = node('a', '', { href: 'tel:+14176052153' });
    link.parent = region;
    const label = node('span');
    label.parent = link;
    const click = (target: FakeNode) =>
      win.document.dispatchEvent({ type: 'click', target } as unknown as Event);
    click(label);

    const footer = node('footer', 'site-footer');
    const contact = node('a', '', { href: 'https://anewyouwoman.com/contact/#form' });
    contact.parent = footer;
    click(contact);

    const bodies = await beaconBodies(pending, calls);
    expect(bodies.map((body) => body.event)).toEqual(['click_to_call', 'contact_click']);
    expect(bodies[0]?.ctaLocation).toBe('trust_bar');
    expect(bodies[1]?.ctaLocation).toBe('footer');
  });

  it('keeps the first channel for the session and ignores this site and previews as referrals', async () => {
    expect(deriveSessionChannel({ gclid: 'click' })).toBe('paid');
    expect(deriveSessionChannel({ utmMedium: 'cpc' })).toBe('paid');
    expect(deriveSessionChannel({ referrer: 'https://www.google.com/search?q=clinic' })).toBe('organic');
    expect(deriveSessionChannel({ referrer: 'https://news.example.com/story' })).toBe('referral');
    expect(deriveSessionChannel({
      referrer: 'https://anewyouwoman.com/contact/',
      currentHost: 'anewyouwoman.com',
    })).toBe('direct');
    expect(deriveSessionChannel({
      referrer: 'https://www.anewyouwoman.com/',
      currentHost: 'anewyouwoman.com',
    })).toBe('direct');
    expect(deriveSessionChannel({
      referrer: 'https://a-new-you-website-git-preview.vercel.app/contact/',
      currentHost: 'anewyouwoman.com',
    })).toBe('direct');

    const storage = memoryStorage();
    expect(resolveSessionChannel({ referrer: 'https://www.google.com/', sessionId: SESSION }, storage)).toBe('organic');
    expect(resolveSessionChannel({
      gclid: 'later-click',
      referrer: 'https://news.example.com/a',
      sessionId: SESSION,
    }, storage)).toBe('organic');
    expect(JSON.parse(storage.getItem(SESSION_CHANNEL_KEY) ?? '')).toEqual({ sid: SESSION, channel: 'organic' });

    const { win, calls, pending } = installWindow('https://anewyouwoman.com/weight-loss/', 'https://www.google.com/');
    setIdentityCookies(win);
    captureAttributionOnEntry('/weight-loss/', '');
    await collectPageView();
    resetJourneyTrackingForTests();
    win.location.pathname = '/contact/';
    win.location.href = 'https://anewyouwoman.com/contact/';
    captureAttributionOnEntry('/contact/', '');
    await collectPageView();
    const bodies = await beaconBodies(pending, calls);
    expect(bodies).toHaveLength(2);
    expect(bodies[0]?.channel).toBe('organic');
    expect(bodies[1]?.channel).toBe('organic');
    expect(bodies[1]?.currentPath).toBe('/contact/');
    expect(bodies[0]?.sessionId).toBe(bodies[1]?.sessionId);
  });

  it('sends with fetch keepalive when sendBeacon is missing, and skips localhost', async () => {
    expect(shouldSkipLocalJourneySend('127.0.0.1')).toBe(true);
    expect(shouldSkipLocalJourneySend('anewyouwoman.com')).toBe(false);

    const blocked = installWindow('http://127.0.0.1:4321/contact/', '');
    setIdentityCookies(blocked.win);
    const skipped = await collectPageView();
    expect(skipped).toEqual({ ok: true, sent: false, skipped: 'local_development' });
    expect(blocked.calls).toHaveLength(0);
    resetMeasurementForTests();

    const { win } = installWindow('https://anewyouwoman.com/', '');
    const sent: Array<{ keepalive?: boolean; body: string }> = [];
    win.navigator.sendBeacon = undefined as unknown as typeof win.navigator.sendBeacon;
    setIdentityCookies(win);
    captureAttributionOnEntry('/', '');
    const result = await collectPageView({
      fetchImpl: (async (_url: string | URL | Request, init?: RequestInit) => {
        sent.push({ keepalive: init?.keepalive, body: String(init?.body) });
        return new Response('{}', { status: 202 });
      }) as typeof fetch,
      sendBeacon: undefined,
    });
    expect(result.sent).toBe(true);
    expect(sent[0]?.keepalive).toBe(true);
    expect(JSON.parse(sent[0]?.body ?? '{}').event).toBe('page_view');
  });

  it('still sends the stored ids when the cookies are missing, and drops contact fields', async () => {
    const { win, calls, pending } = installWindow('https://anewyouwoman.com/contact/', 'https://www.google.com/');
    win.localStorage.setItem('ff_visitor_id_v1', VISITOR);
    win.sessionStorage.setItem('ff_session_id_v1', SESSION);
    captureAttributionOnEntry('/contact/', '');
    const missing = await collectPageView();
    expect(missing.sent).toBe(true);
    const bodies = await beaconBodies(pending, calls);
    expect(bodies[0]?.visitorId).toBe(VISITOR);
    expect(bodies[0]?.sessionId).toBe(SESSION);

    const stripped = stripUnknownAndPii({
      event: 'page_view',
      currentPath: '/contact/',
      email: EMAIL,
      phone: PHONE,
      name: 'Jane Patient',
      engaged: true,
      automation: false,
      message: 'Please call me.',
    });
    expect(stripped.engaged).toBe(true);
    expect(stripped).not.toHaveProperty('automation');
    expect(stripped).not.toHaveProperty('email');
    expect(stripped).not.toHaveProperty('phone');
    expect(stripped).not.toHaveProperty('name');
    expect(JSON.stringify(stripped)).not.toMatch(/605-2153|info@anewyouwoman.com|Jane Patient/);

    const direct = await collectClickToCall({ ctaLocation: 'main' });
    const contact = await collectContactClick({ ctaLocation: 'main' });
    expect(direct.sent).toBe(true);
    expect(contact.sent).toBe(true);
  });
});

describe('engaged follow-up', () => {
  it('reuses the page view eventId', async () => {
    expect(JOURNEY_ENGAGED_ENABLED).toBe(true);
    const { win, calls, pending } = installWindow('https://anewyouwoman.com/contact/', '');
    setIdentityCookies(win);
    captureAttributionOnEntry('/contact/', '');
    const token = beginPageEngagement('/contact/');
    const first = await collectPageView();
    expect(first.sent).toBe(true);
    let bodies = await beaconBodies(pending, calls);
    expect(bodies).toHaveLength(1);
    expect(bodies[0]).not.toHaveProperty('engaged');
    const eventId = String(bodies[0]?.eventId);
    expect(signalPageEngaged(token)).toBe('follow-up');
    expect(pageViewEventIdFor(token)).toBe(eventId);

    const followUp = await collectMeasurementEvent(
      buildMeasurementEvent('page_view', { currentPath: '/contact/', engaged: true, eventId }),
    );
    expect(followUp.sent).toBe(true);
    bodies = await beaconBodies(pending, calls);
    expect(bodies).toHaveLength(2);
    expect(bodies[1]?.event).toBe('page_view');
    expect(bodies[1]?.eventId).toBe(eventId);
    expect(bodies[1]?.engaged).toBe(true);
    expect(signalPageEngaged(token)).toBe('already');

    const again = await collectMeasurementEvent(
      buildMeasurementEvent('page_view', { currentPath: '/contact/', engaged: true, eventId }),
    );
    expect(again.ok).toBe(true);
    if (again.ok) expect(again.duplicate).toBe(true);
    bodies = await beaconBodies(pending, calls);
    expect(bodies.filter((body) => body.engaged === true)).toHaveLength(1);
  });

  it('puts engaged on the original page view when the signal arrives first', async () => {
    const { win, calls, pending } = installWindow('https://anewyouwoman.com/contact/', '');
    setIdentityCookies(win);
    captureAttributionOnEntry('/contact/', '');
    const token = beginPageEngagement('/contact/');
    expect(signalPageEngaged(token)).toBe('pending');
    const call = buildMeasurementEvent('click_to_call', { currentPath: '/contact/', ctaLocation: 'hero' });
    expect(call).not.toHaveProperty('engaged');
    const result = await collectPageView();
    expect(result.sent).toBe(true);
    const bodies = await beaconBodies(pending, calls);
    expect(bodies).toHaveLength(1);
    expect(bodies[0]?.event).toBe('page_view');
    expect(bodies[0]?.engaged).toBe(true);
  });

  it('fires on the first scroll and otherwise waits', () => {
    const { win } = installWindow('https://anewyouwoman.com/contact/', '');
    const calls: string[] = [];
    const scheduled: Array<{ fn: () => void; ms: number }> = [];
    win.setTimeout = ((fn: TimerHandler, ms?: number) => {
      if (typeof fn === 'function') scheduled.push({ fn, ms: ms ?? 0 });
      return 1;
    }) as typeof win.setTimeout;
    win.clearTimeout = (() => {
      scheduled.length = 0;
    }) as typeof win.clearTimeout;

    const stop = watchEngagedSignal(() => {
      calls.push('engaged');
    });
    expect(calls).toEqual([]);
    expect(scheduled[0]?.ms).toBe(10_000);
    scheduled[0]?.fn();
    expect(calls).toEqual(['engaged']);
    stop();

    const taps: string[] = [];
    const stopTap = watchEngagedSignal(() => {
      taps.push('engaged');
    });
    win.dispatchEvent(new Event('scroll'));
    expect(taps).toEqual(['engaged']);
    win.dispatchEvent(new Event('pointerdown'));
    expect(taps).toEqual(['engaged']);
    stopTap();
  });
});
