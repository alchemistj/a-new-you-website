import { describe, expect, it, vi } from 'vitest';
import { SMS_CONSENT_WORDING } from '../../src/lib/forms/contactFormCopy';
import {
  buildContactLeadPayload,
  canPostLeadToCentralForms,
  prepareContactLead,
  readLeadUtm,
  submitContactLead,
  type ContactLeadValues,
  type LeadAttempt,
} from '../../src/lib/forms/contactLead';
import {
  FORMS_LEAD_ENDPOINT,
  createClientSubmissionId,
  getFormsLeadEndpoint,
} from '../../src/lib/forms/formsLead';

const CONSENT =
  'I Consent to Receive SMS Notifications, Alerts & Occasional Marketing Communication from company. Message frequency varies. Message & data rates may apply. You can reply STOP to unsubscribe at any time.';

const values: ContactLeadValues = {
  firstName: 'Ann',
  lastName: 'Lee',
  email: 'ann@example.com',
  phone: '(417) 555-0100',
  servicesInterested: 'Weight loss',
  message: '',
  smsConsent: false,
  honeypot: '',
};

const meta = {
  pageUrl: 'https://anewyouwoman.com/contact/',
  referrer: null,
  utm: { source: '', medium: '', campaign: '', term: '', content: '' },
  formStartedAt: '2026-11-18T12:00:00.000Z',
  submittedAt: '2026-11-18T12:00:08.000Z',
  clientSubmissionId: '11111111-1111-4111-8111-111111111111',
};

describe('contact lead payload', () => {
  it('uses the exact SMS consent wording', () => {
    expect(SMS_CONSENT_WORDING).toBe(CONSENT);
  });

  it('builds the required fields, name, custom fields, honeypot, siteKey and formKey', () => {
    const payload = buildContactLeadPayload(values, meta);
    expect(payload.siteKey).toBe('a-new-you-website');
    expect(payload.formKey).toBe('main-contact');
    expect(payload.name).toBe('Ann Lee');
    expect(payload.email).toBe('ann@example.com');
    expect(payload.phone).toBe('(417) 555-0100');
    expect(payload.message).toBe('');
    expect(payload.honeypot).toBe('');
    expect(payload.customFields.firstName).toEqual({ label: 'First Name', value: 'Ann', type: 'text' });
    expect(payload.customFields.lastName).toEqual({ label: 'Last Name', value: 'Lee', type: 'text' });
    expect(payload.customFields.servicesInterested).toEqual({
      label: 'What Services Are You Interested In?',
      value: 'Weight loss',
      type: 'text',
    });
    expect(payload.customFields.smsConsent).toEqual({ label: 'SMS consent', value: 'No', type: 'text' });
    expect(payload.rawPayload).toEqual({
      firstName: 'Ann',
      lastName: 'Lee',
      email: 'ann@example.com',
      phone: '(417) 555-0100',
      servicesInterested: 'Weight loss',
      message: '',
      smsConsent: 'No',
    });
  });

  it('sends smsConsent Yes when the box is checked', () => {
    const payload = buildContactLeadPayload({ ...values, smsConsent: true, message: '  Hello  ' }, meta);
    expect(payload.customFields.smsConsent).toEqual({ label: 'SMS consent', value: 'Yes', type: 'text' });
    expect(payload.message).toBe('Hello');
  });

  it('reuses the same clientSubmissionId on retry', () => {
    const attempt: LeadAttempt = { clientSubmissionId: null, formStartedAt: '2026-11-18T12:00:00.000Z' };
    const first = prepareContactLead(values, attempt, { ...meta, submittedAt: '2026-11-18T12:00:08.000Z' });
    const second = prepareContactLead(
      { ...values, message: 'Still here' },
      attempt,
      { ...meta, submittedAt: '2026-11-18T12:01:00.000Z' },
    );
    expect(first.ok).toBe(true);
    expect(second.ok).toBe(true);
    if (!first.ok || !second.ok) return;
    expect(first.payload.clientSubmissionId).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
    expect(second.payload.clientSubmissionId).toBe(first.payload.clientSubmissionId);
    expect(second.payload.formStartedAt).toBe('2026-11-18T12:00:00.000Z');
    expect(second.payload.submittedAt).toBe('2026-11-18T12:01:00.000Z');
  });

  it('reads utm from the URL, then the stored first touch', () => {
    expect(readLeadUtm('?utm_source=ad&utm_medium=cpc').source).toBe('ad');
    expect(readLeadUtm('?utm_source=ad&utm_medium=cpc').medium).toBe('cpc');
    const stored = {
      landing_page: '/contact/',
      referrer: 'https://www.google.com/',
      utm_source: 'later',
      utm_medium: null,
      utm_campaign: null,
      utm_term: null,
      utm_content: null,
      utm_id: null,
      gclid: null,
      gbraid: null,
      wbraid: null,
      msclkid: null,
      fbclid: null,
      captured_at: '2026-11-18T12:00:00.000Z',
      first_touch: {
        landing_page: '/contact/',
        referrer: 'https://www.google.com/',
        utm_source: 'newsletter',
        utm_medium: 'email',
        utm_campaign: 'spring',
        utm_term: 'clinic',
        utm_content: 'footer',
        utm_id: null,
        gclid: null,
        gbraid: null,
        wbraid: null,
        msclkid: null,
        fbclid: null,
        captured_at: '2026-11-01T12:00:00.000Z',
      },
    };
    expect(readLeadUtm('', stored)).toEqual({
      source: 'newsletter',
      medium: 'email',
      campaign: 'spring',
      term: 'clinic',
      content: 'footer',
    });
    expect(readLeadUtm('?utm_source=ad', stored).source).toBe('ad');
  });

  it('always names the public endpoint, including on a Vercel preview host', () => {
    expect(getFormsLeadEndpoint()).toBe(FORMS_LEAD_ENDPOINT);
    expect(getFormsLeadEndpoint('a-new-you-website-git-central-forms.vercel.app')).toBe(FORMS_LEAD_ENDPOINT);
    expect(getFormsLeadEndpoint('localhost')).toBe(FORMS_LEAD_ENDPOINT);
    expect(canPostLeadToCentralForms('localhost')).toBe(false);
    expect(canPostLeadToCentralForms('anewyouwoman.com')).toBe(true);
    expect(canPostLeadToCentralForms('preview.vercel.app')).toBe(true);
  });

  it('does not call Central Forms from localhost', async () => {
    const fetchImpl = vi.fn();
    const result = await submitContactLead(buildContactLeadPayload(values, meta), {
      hostname: 'localhost',
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });
    expect(result.ok).toBe(false);
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('posts the same id again after a network error and does not use the real endpoint', async () => {
    const bodies: string[] = [];
    const fetchImpl = vi.fn(async (_url: string, init?: RequestInit) => {
      bodies.push(String(init?.body));
      if (bodies.length === 1) return new Response('nope', { status: 503 });
      return new Response(
        JSON.stringify({
          ok: true,
          conversionEligible: true,
          id: 'aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee',
        }),
        { status: 200, headers: { 'content-type': 'application/json' } },
      );
    });
    const payload = buildContactLeadPayload(values, meta);
    const first = await submitContactLead(payload, {
      hostname: 'anewyouwoman.com',
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });
    const second = await submitContactLead(payload, {
      hostname: 'anewyouwoman.com',
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });
    expect(first).toEqual({ ok: false, reason: 'network', message: expect.any(String) });
    expect(second).toEqual({ ok: true, leadId: 'aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee' });
    expect(fetchImpl.mock.calls[0]?.[0]).toBe(FORMS_LEAD_ENDPOINT);
    expect(JSON.parse(bodies[0] ?? '{}').clientSubmissionId).toBe(meta.clientSubmissionId);
    expect(JSON.parse(bodies[1] ?? '{}').clientSubmissionId).toBe(meta.clientSubmissionId);
  });

  it('still makes a unique id when randomUUID is missing', () => {
    const original = crypto.randomUUID;
    Object.defineProperty(crypto, 'randomUUID', { configurable: true, value: undefined });
    try {
      const first = createClientSubmissionId();
      const second = createClientSubmissionId();
      expect(first).not.toBe(second);
      expect(first).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
      );
    } finally {
      Object.defineProperty(crypto, 'randomUUID', { configurable: true, value: original });
    }
  });
});
