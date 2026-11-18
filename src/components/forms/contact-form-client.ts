import { FORM_RETRY_MESSAGE } from '../../lib/forms/contactFormCopy';
import { collectLeadFormSuccess } from '../../lib/measurement/collect';
import {
  markFormStarted,
  prepareContactLead,
  readLeadContext,
  submitContactLead,
  type ContactLeadValues,
  type LeadAttempt,
} from '../../lib/forms/contactLead';

function field(form: HTMLFormElement, name: string): string {
  const control = form.elements.namedItem(name);
  if (control instanceof HTMLInputElement || control instanceof HTMLTextAreaElement) {
    return control.value;
  }
  return '';
}

function valuesFromForm(form: HTMLFormElement): ContactLeadValues {
  const consent = form.elements.namedItem('smsConsent');
  return {
    firstName: field(form, 'firstName'),
    lastName: field(form, 'lastName'),
    email: field(form, 'email'),
    phone: field(form, 'phone'),
    servicesInterested: field(form, 'servicesInterested'),
    message: field(form, 'message'),
    smsConsent: consent instanceof HTMLInputElement && consent.checked,
    honeypot: field(form, 'companyWebsite'),
  };
}

function showStatus(root: ParentNode, message: string): void {
  const status = root.querySelector<HTMLElement>('[data-form-status]');
  const text = root.querySelector<HTMLElement>('[data-form-status-text]');
  if (text) text.textContent = message;
  if (status) status.hidden = false;
}

/**
 * Turns the server-rendered form into a JSON post. The fields stay in the
 * HTML either way. A failed send keeps what the visitor typed and the same
 * clientSubmissionId.
 */
export function bindContactForm(root: ParentNode): void {
  const form = root.querySelector('form');
  if (!(form instanceof HTMLFormElement) || form.dataset.bound === '1') return;
  form.dataset.bound = '1';

  const submitButton = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const loading = root.querySelector<HTMLElement>('[data-form-loading]');
  const success = root.querySelector<HTMLElement>('[data-form-success]');
  if (loading) loading.hidden = true;
  if (submitButton) submitButton.disabled = false;

  const attempt: LeadAttempt = { clientSubmissionId: null, formStartedAt: null };
  let sending = false;

  form.addEventListener('focusin', () => {
    markFormStarted(attempt, new Date().toISOString());
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (sending) return;
    const submittedAt = new Date().toISOString();
    const prepared = prepareContactLead(valuesFromForm(form), attempt, {
      ...readLeadContext(),
      submittedAt,
    });
    if (!prepared.ok) {
      showStatus(root, prepared.message);
      return;
    }

    sending = true;
    if (submitButton) submitButton.disabled = true;
    void submitContactLead(prepared.payload)
      .then((result) => {
        sending = false;
        if (result.ok) {
          if (result.leadId) void collectLeadFormSuccess(result.leadId);
          form.hidden = true;
          if (success) success.hidden = false;
          return;
        }
        showStatus(root, result.message);
        if (submitButton) submitButton.disabled = false;
      })
      .catch(() => {
        sending = false;
        showStatus(root, FORM_RETRY_MESSAGE);
        if (submitButton) submitButton.disabled = false;
      });
  });
}
