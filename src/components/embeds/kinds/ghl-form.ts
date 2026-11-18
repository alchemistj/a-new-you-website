import type { EmbedDef } from '../embeds';

const GHL_HOST = 'https://link.aestheticrecord.com';
const GHL_FORM_ID = 'H2deelST8Z9WKwPJ5WTe';

export const embed: EmbedDef = {
  type: 'iframe',
  src: `${GHL_HOST}/widget/form/${GHL_FORM_ID}`,
  script: `${GHL_HOST}/js/form_embed.js`,
  attrs: {
    id: `inline-${GHL_FORM_ID}`,
    'data-layout': "{'id':'INLINE'}",
    'data-trigger-type': 'alwaysShow',
    'data-activation-type': 'alwaysActivated',
    'data-deactivation-type': 'neverDeactivate',
    'data-form-name': 'Form 5',
    'data-height': '677',
    'data-layout-iframe-id': `inline-${GHL_FORM_ID}`,
    'data-form-id': GHL_FORM_ID,
  },
  title: 'Contact form',
  heightMobile: 820,
  heightDesktop: 700,
  fallback: { href: `${GHL_HOST}/widget/form/${GHL_FORM_ID}`, label: 'Open the contact form' },
};
