import { afterEach, describe, expect, it } from 'vitest';
import {
  MEASUREMENT_FORWARD_EVENTS,
  forwardMeasurementCollect,
} from '../../server/lib/forwardMeasurementCollect';
import {
  buildMeasurementEvent,
  collectLeadFormSuccess,
  resetMeasurementForTests,
} from '../../src/lib/measurement/collect';
import { MEASUREMENT_EVENT_NAMES, hasPiiLeak } from '../../src/lib/measurement/contract';

const VISITOR = 'visitor-11111111-1111-4111-8111-111111111111';
const SESSION = 'session-11111111-1111-4111-8111-111111111111';
const LEAD_ID = 'aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee';
const EMAIL = 'ann@example.com';

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

function installWindow() {
  const calls: { url: string; body: string }[] = [];
  const pending: Promise<void>[] = [];
  let cookie = '';
  const documentStub = {
    referrer: '',
    querySelector: () => null,
  };
  Object.defineProperty(documentStub, 'cookie', {
    get() {
      return cookie;
    },
    set(value: string) {
      cookie = cookie ? `${cookie}; ${value}` : value;
    },
  });
  const win = {
    location: {
      href: 'https://anewyouwoman.com/contact/',
      pathname: '/contact/',
      hostname: 'anewyouwoman.com',
      search: '',
    },
    document: documentStub,
    localStorage: memoryStorage(),
    sessionStorage: memoryStorage(),
    innerWidth: 1200,
    navigator: {
      userAgent: 'Mozilla/5.0',
      language: 'en-US',
      languages: ['en-US'],
      webdriver: false,
      sendBeacon(url: string, data?: BodyInit | null) {
        const call = { url: String(url), body: typeof data === 'string' ? data : '' };
        calls.push(call);
        if (data instanceof Blob) pending.push(data.text().then((body) => { call.body = body; }));
        return true;
      },
    },
  };
  (globalThis as unknown as { window: typeof win }).window = win;
  (globalThis as unknown as { document: typeof documentStub }).document = documentStub;
  (documentStub as { cookie: string }).cookie = `ff_vid=${VISITOR}`;
  (documentStub as { cookie: string }).cookie = `ff_sid=${SESSION}`;
  return { calls, pending };
}

afterEach(() => {
  resetMeasurementForTests();
  delete (globalThis as { window?: unknown }).window;
  delete (globalThis as { document?: unknown }).document;
});

describe('lead_form_success', () => {
  it('is on the contract and the forwarder allowlist', () => {
    expect(MEASUREMENT_EVENT_NAMES).toContain('lead_form_success');
    expect(MEASUREMENT_FORWARD_EVENTS).toContain('lead_form_success');
    expect([...MEASUREMENT_FORWARD_EVENTS]).toEqual([...MEASUREMENT_EVENT_NAMES]);
  });

  it('builds the lead id with ff_vid, ff_sid and path, and the forwarder keeps it', async () => {
    installWindow();
    const event = buildMeasurementEvent('lead_form_success', {
      submissionId: LEAD_ID,
      eventId: 'ff-lead-aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee',
      formSource: 'main-contact',
      currentPath: '/contact/',
    });
    expect(event.event).toBe('lead_form_success');
    expect(event.submissionId).toBe(LEAD_ID);
    expect(event.visitorId).toBe(VISITOR);
    expect(event.sessionId).toBe(SESSION);
    expect(event.currentPath).toBe('/contact/');
    expect(event.conversionKind).toBe('accepted_lead');
    expect(hasPiiLeak(event)).toBe(false);
    expect(JSON.stringify(event)).not.toContain(EMAIL);

    let forwarded: Record<string, unknown> | null = null;
    const result = await forwardMeasurementCollect({
      body: { ...event, email: EMAIL, phone: '(417) 605-2153', name: 'Ann Lee' },
      origin: 'https://anewyouwoman.com',
      vercelEnv: 'production',
      fetchImpl: (async (_url: string | URL | Request, init?: RequestInit) => {
        forwarded = JSON.parse(String(init?.body)) as Record<string, unknown>;
        return new Response('{}', { status: 202 });
      }) as typeof fetch,
    });
    expect(result.status).toBe(202);
    expect(forwarded).toMatchObject({
      event: 'lead_form_success',
      submissionId: LEAD_ID,
      visitorId: VISITOR,
      sessionId: SESSION,
      currentPath: '/contact/',
    });
    expect(forwarded).not.toHaveProperty('email');
    expect(forwarded).not.toHaveProperty('phone');
    expect(forwarded).not.toHaveProperty('name');
  });

  it('sends the event once for one lead id', async () => {
    const { calls, pending } = installWindow();
    const first = await collectLeadFormSuccess(LEAD_ID);
    const second = await collectLeadFormSuccess(LEAD_ID);
    await Promise.all(pending);
    expect(first).toMatchObject({ ok: true, sent: true });
    expect(second).toMatchObject({ ok: true, sent: false, duplicate: true });
    expect(calls).toHaveLength(1);
    expect(JSON.parse(calls[0]?.body ?? '{}').submissionId).toBe(LEAD_ID);
  });

  it('does not forward an event outside the allowlist', async () => {
    let called = false;
    const result = await forwardMeasurementCollect({
      body: { event: 'form_submit', submissionId: LEAD_ID },
      origin: 'https://anewyouwoman.com',
      vercelEnv: 'production',
      fetchImpl: (async () => {
        called = true;
        return new Response('{}', { status: 202 });
      }) as typeof fetch,
    });
    expect(called).toBe(false);
    expect(JSON.parse(result.body).skipped).toBe('event_not_allowlisted');
  });
});
