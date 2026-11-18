import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, it } from 'vitest';
import PageTemplate from '../../src/components/PageTemplate.astro';
import { page } from '../../src/data/pages/contact';

const CONSENT =
  'I Consent to Receive SMS Notifications, Alerts & Occasional Marketing Communication from company. Message frequency varies. Message & data rates may apply. You can reply STOP to unsubscribe at any time.';

describe('/contact/ form HTML', () => {
  it('renders the fields in the server HTML and no GoHighLevel form iframe', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(PageTemplate, { props: { page } });
    const text = html.replace(/&amp;/g, '&');

    expect(html).toContain('id="contact-form"');
    expect(html).toContain('Leave a Message For us');
    expect(html).toContain('First Name');
    expect(html).toContain('Last Name');
    expect(html).toContain('>Phone');
    expect(html).toContain('>Email');
    expect(html).toContain('What Services Are You Interested In?');
    expect(html).toContain('Message (optional)');
    expect(text).toContain(CONSENT);
    expect(html).toContain('name="firstName"');
    expect(html).toContain('name="lastName"');
    expect(html).toContain('type="tel"');
    expect(html).toContain('type="email"');
    expect(html).toContain('autocomplete="given-name"');
    expect(html).toContain('autocomplete="family-name"');
    expect(html).toContain('autocomplete="tel"');
    expect(html).toContain('autocomplete="email"');
    expect(html).toContain('name="servicesInterested"');
    expect(html).toContain('name="message"');
    expect(html).toContain('name="smsConsent"');
    expect(html).toContain('name="companyWebsite"');
    expect(html).not.toMatch(/name="smsConsent"[^>]*\bchecked\b/);
    expect(html).not.toMatch(/name="smsConsent"[^>]*\brequired\b/);
    expect(html).not.toContain('https://link.aestheticrecord.com/widget/form/');
    expect(html).not.toContain('form_embed.js');
    expect(html).not.toMatch(/<iframe\b/i);
  });
});
