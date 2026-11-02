// Third-party embed definitions (Rule 10). URLs come from docs/spec/brief.md "Integrations" and, for
// the iframe attributes, from the live pages (checked 2026-11-02).
//
// Nothing here is rendered as a src/href in server HTML except the <noscript> fallback links.

export type EmbedKind = 'ghl-form' | 'ghl-quiz' | 'cherry' | 'map';

export interface EmbedDef {
  type: 'iframe' | 'cherry';
  /** iframe src (iframe type) or widget script (cherry). Only the client script uses it. */
  src: string;
  /** Extra script injected after the iframe (GoHighLevel resizes its iframe with it). */
  script?: string;
  /** iframe attributes copied from the live embed. */
  attrs?: Record<string, string>;
  title: string;
  /** Reserved height in px so nothing shifts when the embed loads. */
  heightMobile: number;
  heightDesktop: number;
  /** Server-rendered <noscript> fallback. */
  fallback: { href: string; label: string };
}

const GHL_HOST = 'https://link.aestheticrecord.com';
export const GHL_FORM_ID = 'H2deelST8Z9WKwPJ5WTe';
export const GHL_SURVEY_ID = 'NgxRM6NWFTi1Q8AS8XFU';
export const CHERRY_WIDGET_URL = 'https://files.withcherry.com/widgets/widget.js';

const MAP_QUERY = '1426%20E%20Bradford%20pkwy%20suite%20C%20Springfield%2C%20MO%2065804';

export const EMBEDS: Record<EmbedKind, EmbedDef> = {
  'ghl-form': {
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
  },
  'ghl-quiz': {
    type: 'iframe',
    src: `${GHL_HOST}/widget/survey/${GHL_SURVEY_ID}`,
    script: `${GHL_HOST}/js/form_embed.js`,
    attrs: { id: GHL_SURVEY_ID, scrolling: 'no' },
    title: 'Free 2-Minute Quiz',
    heightMobile: 720,
    heightDesktop: 640,
    fallback: { href: `${GHL_HOST}/widget/survey/${GHL_SURVEY_ID}`, label: 'Take Our Free 2-Minute Quiz' },
  },
  cherry: {
    type: 'cherry',
    src: CHERRY_WIDGET_URL,
    title: 'Financing',
    heightMobile: 800,
    heightDesktop: 800,
    // Cherry has no page URL in the brief, so the no-JS fallback is the clinic phone (NAP).
    fallback: { href: 'tel:+14176052153', label: 'Call (417) 605-2153 about financing' },
  },
  map: {
    type: 'iframe',
    src: `https://maps.google.com/maps?q=${MAP_QUERY}&t=m&z=10&output=embed&iwloc=near`,
    attrs: { referrerpolicy: 'no-referrer-when-downgrade' },
    title: "Map to A New You Women's Clinic",
    heightMobile: 320,
    heightDesktop: 420,
    fallback: { href: `https://www.google.com/maps?q=${MAP_QUERY}`, label: 'View the map' },
  },
};

/** Cherry init config, copied from the live /financing/ page. */
export const CHERRY_INIT = {
  config: {
    debug: false,
    variables: { slug: 'a-new-you-womens-clinic', name: "A New You Women's Clinic" },
    styles: { primaryColor: '#58899e', secondaryColor: '#58899e10', fontFamily: 'Open Sans' },
  },
  sections: ['all', 'hero', 'howitworks', 'testimony', 'faq', 'calculator'],
};
