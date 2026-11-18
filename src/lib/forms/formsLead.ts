/**
 * Fluid Frame Central Forms lead intake.
 * Ported from the Greene Planet client for this form only: no preview relay.
 */

export const FORMS_LEAD_ENDPOINT = 'https://forms.fluidframemarketing.com/api/lead';

export const FORMS_SITE_KEY = 'a-new-you-website';
export const FORMS_FORM_KEY = 'main-contact';

export type FormsCustomField = {
  label: string;
  value: string;
  type: string;
};

export type FormsUtm = {
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
};

export type FormsLeadRequest = {
  siteKey: string;
  formKey: string;
  clientSubmissionId: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  customFields: Record<string, FormsCustomField>;
  rawPayload: Record<string, unknown>;
  pageUrl: string;
  referrer: string | null;
  utm: FormsUtm;
  honeypot: string;
  formStartedAt: string;
  submittedAt: string;
};

export type FormsLeadResponse = {
  ok?: boolean;
  conversionEligible?: boolean;
  duplicate?: boolean;
  id?: string;
  reason?: 'validation' | 'network';
  message?: string;
  error?: string;
  code?: string;
  saved?: boolean;
};

export function customField(
  label: string,
  value: string | boolean | number | null | undefined,
  type = 'text',
): FormsCustomField | undefined {
  if (value === null || value === undefined) return undefined;
  if (typeof value === 'string' && !value.trim()) return undefined;
  return { label, value: String(value), type };
}

export function addCustomField(
  fields: Record<string, FormsCustomField>,
  key: string,
  field: FormsCustomField | undefined,
) {
  if (field) fields[key] = field;
}

/**
 * Preview and production both post to the public intake.
 * Central Forms allows the Vercel preview origin, so there is no preview relay.
 */
export function getFormsLeadEndpoint(_hostname?: string): string {
  return FORMS_LEAD_ENDPOINT;
}

/** Conversion event id when this response is a new, eligible lead. */
export function leadSuccessId(payload: FormsLeadResponse | null | undefined): string | null {
  if (!payload || payload.duplicate === true || payload.conversionEligible !== true) return null;
  if (typeof payload.id !== 'string') return null;
  const id = payload.id.trim();
  return id || null;
}

function uuidFromBytes(bytes: Uint8Array): string {
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

/** A new id for one attempt. randomUUID needs a secure page; getRandomValues covers the rest. */
export function createClientSubmissionId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    return uuidFromBytes(bytes);
  }
  return '00000000-0000-4000-8000-000000000000';
}
