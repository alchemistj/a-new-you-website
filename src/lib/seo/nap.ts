// NAP and brand constants for SEO output (JSON-LD, llms.txt, robots, sitemap).
// Source: docs/spec/brief.md "Facts". Helper D defined these locally because
// src/data/site.ts (helper A) was not on astro-rebuild yet. When site.ts lands,
// re-export from there and delete the duplicates.

export const SITE_URL = 'https://anewyouwoman.com';
export const BUSINESS_NAME = "A New You Women's Clinic";
export const PHONE_DISPLAY = '(417) 605-2153';
export const PHONE_E164 = '+14176052153';
export const EMAIL = 'info@anewyouwoman.com';

export const ADDRESS = {
  streetAddress: '1426 E Bradford Pkwy, Suite C',
  addressLocality: 'Springfield',
  addressRegion: 'MO',
  postalCode: '65804',
  addressCountry: 'US',
} as const;

export const SAME_AS = [
  'https://www.instagram.com/anewyouwomens/',
  'https://www.facebook.com/profile.php?id=100092594507782',
  'https://www.bbb.org/us/mo/springfield/profile/medical-spa/a-new-you-womens-clinic-0734-1000043236',
] as const;

export const SERVICE_AREA = ['Springfield', 'Nixa', 'Ozark', 'Republic', 'Rogersville'] as const;

export const ORG_ID = `${SITE_URL}/#organization`;

export const absoluteUrl = (path: string): string => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
