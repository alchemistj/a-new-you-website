import type { EmbedDef } from '../embeds';

export const CHERRY_WIDGET_URL = 'https://files.withcherry.com/widgets/widget.js';

export const embed: EmbedDef = {
  type: 'cherry',
  src: CHERRY_WIDGET_URL,
  title: 'Financing',
  heightMobile: 800,
  heightDesktop: 800,
  fallback: { href: 'tel:+14176052153', label: 'Call (417) 605-2153 about financing' },
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
