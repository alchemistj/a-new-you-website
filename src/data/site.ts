// Business facts. Source: docs/spec/brief.md (Facts and Integrations). Do not add facts here
// that are not in the brief or on the live page being migrated.

import type { ImageRef } from '../types/page';

/** Awards shown first in the trust bar and in the footer. Set `image` to the official logo later. */
export const awards: { label: string; image?: ImageRef }[] = [
  { label: '2026 BBB Torch Award for Ethics Winner' },
];

export const site = {
  name: "A New You Women's Clinic",
  url: 'https://anewyouwoman.com',
  address: {
    street: '1426 E Bradford Pkwy, Suite C',
    city: 'Springfield',
    region: 'MO',
    regionName: 'Missouri',
    postalCode: '65804',
    country: 'US',
  },
  /** The NAP number. The only phone number on the site (Rule 7). */
  phone: {
    display: '(417) 605-2153',
    e164: '+14176052153',
    tel: 'tel:+14176052153',
    /** Short label for mobile call buttons above the fold (Rule 7.2). */
    mobileLabel: 'Call Now',
  },
  email: 'info@anewyouwoman.com',
  founder: {
    name: 'Lucinda "Cindy" Sparks, MSN, CNM, APRN',
    shortName: 'Cindy',
    yearsHealthcare: 23,
    yearsWomensHealth: 13,
  },
  social: {
    instagram: 'https://www.instagram.com/anewyouwomens/',
    facebook: 'https://www.facebook.com/profile.php?id=100092594507782',
    bbb: 'https://www.bbb.org/us/mo/springfield/profile/medical-spa/a-new-you-womens-clinic-0734-1000043236',
  },
  booking: {
    label: 'Schedule an Appointment',
    href: 'https://anewyouwomensclinic.myaestheticrecord.com/online-booking',
  },
  integrations: {
    ghlForm: 'https://link.aestheticrecord.com/widget/form/H2deelST8Z9WKwPJ5WTe',
    ghlFormScript: 'https://link.aestheticrecord.com/js/form_embed.js',
    ghlSurvey: 'https://link.aestheticrecord.com/widget/survey/NgxRM6NWFTi1Q8AS8XFU',
    chat: {
      loader: 'https://beta.leadconnectorhq.com/loader.js',
      widgetId: '6a15ba601ce15bb9e91d6259',
    },
    ga4: 'G-NNLFN2N0VY',
    cherry: 'https://files.withcherry.com/widgets/widget.js',
    /** Google Maps embed for the address (loaded deferred on the contact page). */
    mapEmbed:
      'https://www.google.com/maps?q=1426+E+Bradford+Pkwy+Suite+C+Springfield+MO+65804&output=embed',
    video: { youtube: 'VhBl3dHT5SY', vimeo: '805690936' },
  },
} as const;

/**
 * Single-city site (Springfield only), so there is no city switcher and no multi-city registry
 * (Rule 2 collapses to one primary-city section). Kept in cityConfig shape so a second city
 * could be added later without reshaping callers.
 */
export const cityConfig = {
  slug: 'springfield',
  name: 'Springfield',
  state: 'MO',
  displayName: 'Springfield, MO',
  showInSwitcher: false,
  /** Service area as the live pages show it. */
  serviceArea: ['Springfield', 'Nixa', 'Ozark', 'Republic', 'Rogersville'],
  phone: site.phone,
} as const;

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;
