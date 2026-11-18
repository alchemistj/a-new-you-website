import type { AttributionSnapshot } from '../attribution/allowlist';
import { getStoredAttribution } from '../attribution/storage';
import {
  FORM_CHECK_MESSAGE,
  FORM_RETRY_MESSAGE,
  FORM_WAIT_MESSAGE,
  LABEL_FIRST_NAME,
  LABEL_LAST_NAME,
  LABEL_SERVICES,
  LABEL_SMS,
} from './contactFormCopy';
import {
  addCustomField,
  createClientSubmissionId,
  customField,
  FORMS_FORM_KEY,
  FORMS_SITE_KEY,
  getFormsLeadEndpoint,
  leadSuccessId,
  type FormsLeadRequest,
  type FormsLeadResponse,
  type FormsUtm,
} from './formsLead';

export const LEAD_CAPTURE_TIMEOUT_MS = 45_000;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
type UtmKey = 'utm_source' | 'utm_medium' | 'utm_campaign' | 'utm_term' | 'utm_content';

export type ContactLeadValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  servicesInterested: string;
  message: string;
  smsConsent: boolean;
  honeypot: string;
};

export type LeadAttempt = {
  clientSubmissionId: string | null;
  formStartedAt: string | null;
};

export type ContactLeadMeta = {
  pageUrl: string;
  referrer: string | null;
  utm: FormsUtm;
  formStartedAt: string;
  submittedAt: string;
  clientSubmissionId: string;
};

export type ContactLeadResult =
  | { ok: true; leadId: string | null }
  | { ok: false; reason: 'local' | 'validation' | 'rate_limited' | 'network' | 'timeout'; message: string };

export type SubmitContactLeadOptions = {
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
  hostname?: string;
};

function phoneDigits(value: string): string {
  return value.replace(/\D/g, '');
}

function trimmed(value: string): string {
  return value.trim();
}

/** Local dev never posts. Production and Vercel preview do. */
export function canPostLeadToCentralForms(hostname: string): boolean {
  const host = hostname.trim().toLowerCase().replace(/\.+$/, '');
  if (!host || host === 'localhost' || host === '127.0.0.1' || host === '::1' || host === '[::1]') {
    return false;
  }
  return true;
}

export function ensureClientSubmissionId(
  attempt: LeadAttempt,
  create: () => string = createClientSubmissionId,
): string {
  if (!attempt.clientSubmissionId) attempt.clientSubmissionId = create();
  return attempt.clientSubmissionId;
}

export function markFormStarted(attempt: LeadAttempt, at: string): void {
  if (!attempt.formStartedAt) attempt.formStartedAt = at;
}

function utmPiece(
  params: URLSearchParams,
  key: UtmKey,
  stored: AttributionSnapshot | null,
): string {
  const fromUrl = params.get(key)?.trim() || '';
  if (fromUrl) return fromUrl;
  const fromFirst = stored?.first_touch?.[key]?.trim() || '';
  if (fromFirst) return fromFirst;
  return stored?.[key]?.trim() || '';
}

/** Current URL query wins. Empty fields fall back to the stored first touch. */
export function readLeadUtm(search: string, stored: AttributionSnapshot | null = null): FormsUtm {
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
  return {
    source: utmPiece(params, 'utm_source', stored),
    medium: utmPiece(params, 'utm_medium', stored),
    campaign: utmPiece(params, 'utm_campaign', stored),
    term: utmPiece(params, 'utm_term', stored),
    content: utmPiece(params, 'utm_content', stored),
  };
}

export function readLeadContext(input?: {
  href?: string;
  search?: string;
  referrer?: string | null;
  stored?: AttributionSnapshot | null;
}): { pageUrl: string; referrer: string | null; utm: FormsUtm } {
  const href = input?.href ?? (typeof window !== 'undefined' ? window.location.href : '');
  const search = input?.search ?? (typeof window !== 'undefined' ? window.location.search : '');
  const stored = input && 'stored' in input
    ? (input.stored ?? null)
    : (typeof window !== 'undefined' ? getStoredAttribution() : null);
  const referrerRaw = input?.referrer ?? (typeof document !== 'undefined' ? document.referrer : '');
  const referrer = referrerRaw.trim() || stored?.first_touch?.referrer?.trim() || stored?.referrer?.trim() || null;
  return {
    pageUrl: href,
    referrer,
    utm: readLeadUtm(search, stored),
  };
}

export function validateContactLead(values: ContactLeadValues): string | null {
  const first = trimmed(values.firstName);
  const last = trimmed(values.lastName);
  const email = trimmed(values.email);
  const phone = trimmed(values.phone);
  const services = trimmed(values.servicesInterested);
  const message = trimmed(values.message);
  const name = `${first} ${last}`.trim();
  if (!first || !last || name.length > 200) return FORM_CHECK_MESSAGE;
  if (!email || email.length > 320 || !EMAIL_PATTERN.test(email)) return FORM_CHECK_MESSAGE;
  if (!phone || phone.length > 50 || phoneDigits(phone).length < 10) return FORM_CHECK_MESSAGE;
  if (!services || services.length > 2000) return FORM_CHECK_MESSAGE;
  if (message.length > 5000) return FORM_CHECK_MESSAGE;
  return null;
}

export function buildContactLeadPayload(values: ContactLeadValues, meta: ContactLeadMeta): FormsLeadRequest {
  const firstName = trimmed(values.firstName);
  const lastName = trimmed(values.lastName);
  const email = trimmed(values.email);
  const phone = trimmed(values.phone);
  const servicesInterested = trimmed(values.servicesInterested);
  const message = trimmed(values.message);
  const smsConsent = values.smsConsent ? 'Yes' : 'No';
  const customFields: FormsLeadRequest['customFields'] = {};
  addCustomField(customFields, 'firstName', customField(LABEL_FIRST_NAME, firstName));
  addCustomField(customFields, 'lastName', customField(LABEL_LAST_NAME, lastName));
  addCustomField(customFields, 'servicesInterested', customField(LABEL_SERVICES, servicesInterested));
  addCustomField(customFields, 'smsConsent', customField(LABEL_SMS, smsConsent));

  return {
    siteKey: FORMS_SITE_KEY,
    formKey: FORMS_FORM_KEY,
    clientSubmissionId: meta.clientSubmissionId,
    name: `${firstName} ${lastName}`,
    email,
    phone,
    message,
    customFields,
    rawPayload: {
      firstName,
      lastName,
      email,
      phone,
      servicesInterested,
      message,
      smsConsent,
    },
    pageUrl: meta.pageUrl,
    referrer: meta.referrer,
    utm: meta.utm,
    honeypot: values.honeypot,
    formStartedAt: meta.formStartedAt,
    submittedAt: meta.submittedAt,
  };
}

export function prepareContactLead(
  values: ContactLeadValues,
  attempt: LeadAttempt,
  meta: Omit<ContactLeadMeta, 'clientSubmissionId' | 'formStartedAt'> & { submittedAt: string },
): { ok: true; payload: FormsLeadRequest } | { ok: false; message: string } {
  const invalid = validateContactLead(values);
  if (invalid) return { ok: false, message: invalid };
  markFormStarted(attempt, meta.submittedAt);
  const clientSubmissionId = ensureClientSubmissionId(attempt);
  return {
    ok: true,
    payload: buildContactLeadPayload(values, {
      ...meta,
      clientSubmissionId,
      formStartedAt: attempt.formStartedAt || meta.submittedAt,
    }),
  };
}

function isAbortError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'name' in error &&
    (error as { name?: unknown }).name === 'AbortError'
  );
}

function failureForStatus(status: number): ContactLeadResult {
  if (status === 429) return { ok: false, reason: 'rate_limited', message: FORM_WAIT_MESSAGE };
  if (status === 400 || status === 422) return { ok: false, reason: 'validation', message: FORM_CHECK_MESSAGE };
  return { ok: false, reason: 'network', message: FORM_RETRY_MESSAGE };
}

export async function submitContactLead(
  payload: FormsLeadRequest,
  options: SubmitContactLeadOptions = {},
): Promise<ContactLeadResult> {
  const hostname = options.hostname ?? (typeof window !== 'undefined' ? window.location.hostname : '');
  if (!canPostLeadToCentralForms(hostname)) {
    return { ok: false, reason: 'local', message: FORM_RETRY_MESSAGE };
  }

  const endpoint = getFormsLeadEndpoint(hostname);
  const timeoutMs = options.timeoutMs ?? LEAD_CAPTURE_TIMEOUT_MS;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  const fetchImpl = options.fetchImpl ?? fetch;

  try {
    const response = await fetchImpl(endpoint, {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    let body: FormsLeadResponse | null = null;
    try {
      body = (await response.json()) as FormsLeadResponse;
    } catch {
      body = null;
    }

    if (response.ok && body?.ok === true) {
      return { ok: true, leadId: leadSuccessId(body) };
    }
    return failureForStatus(response.status);
  } catch (error) {
    if (controller.signal.aborted || isAbortError(error)) {
      return { ok: false, reason: 'timeout', message: FORM_RETRY_MESSAGE };
    }
    return { ok: false, reason: 'network', message: FORM_RETRY_MESSAGE };
  } finally {
    clearTimeout(timeoutId);
  }
}
