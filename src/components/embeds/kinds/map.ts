import type { EmbedDef } from '../embeds';

const MAP_QUERY = '1426%20E%20Bradford%20pkwy%20suite%20C%20Springfield%2C%20MO%2065804';

export const embed: EmbedDef = {
  type: 'iframe',
  src: `https://maps.google.com/maps?q=${MAP_QUERY}&t=m&z=10&output=embed&iwloc=near`,
  attrs: { referrerpolicy: 'no-referrer-when-downgrade' },
  title: "Map to A New You Women's Clinic",
  heightMobile: 320,
  heightDesktop: 420,
  fallback: { href: `https://www.google.com/maps?q=${MAP_QUERY}`, label: 'View the map' },
};
