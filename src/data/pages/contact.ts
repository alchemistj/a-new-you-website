import type { PageCopy } from '../../types/page';

export const page: PageCopy = {
  slug: 'contact',
  route: '/springfield/contact/',
  template: 'contact',
  publish: true,
  oldUrls: ['/contact/'],
  seo: {
    title: "Contact Us in Springfield, MO | A New You Women's Clinic",
    description:
      "Contact A New You Women's Clinic at 1426 E Bradford Pkwy, Suite C, Springfield, MO 65804, or call (417) 605-2153. Schedule an appointment today.",
  },
  hero: {
    h1: 'Get In Touch',
    image: {
      src: 'pages/contact/hero.jpg',
      alt: 'Three smiling women in black scrubs stand in a bright treatment room',
    },
    imagePosition: 'center 30%',
    primaryCta: {
      label: 'Schedule an Appointment',
      href: 'https://anewyouwomensclinic.myaestheticrecord.com/online-booking',
    },
  },
  sections: [
    { kind: 'embed', id: 'contact-form', embed: 'ghl-form', heading: 'Leave a Message For us' },
    {
      kind: 'cards',
      id: 'contact-details',
      cards: [
        { title: 'Our Address', text: '1426 E Bradford Pkwy, Suite C, Springfield, MO 65804' },
        { title: 'Email Address', text: 'info@anewyouwoman.com', href: 'mailto:info@anewyouwoman.com' },
        { title: 'Telephone', text: '(417) 605-2153', href: 'tel:+14176052153' },
      ],
    },
    { kind: 'embed', id: 'map', embed: 'map' },
  ],
  serviceArea: ['Springfield', 'Nixa', 'Ozark', 'Republic', 'Rogersville'],
  changes: [
    'Title and description were wrong (hormone replacement therapy in Oklahoma). Rewritten: title "Contact Us in Springfield, MO | A New You Women\'s Clinic"; description uses the brief\'s address and the NAP phone only. No Oklahoma anywhere.',
    'Removed the Lorem ipsum intro paragraph.',
    'Address shown as in the brief ("1426 E Bradford Pkwy, Suite C, Springfield, MO 65804"); the live body said "1426 East Bradford Parkway, Springfield, MO 65804" without the suite.',
    'Phone shown as "(417) 605-2153" with tel:+14176052153; the live page showed "+ (417)605-2153" with a malformed tel link.',
    'The live page had "Get In Touch" as both H2 and H1; only the H1 is kept. "Leave a Message For us" is the heading of the ghl-form embed (live capitalization kept).',
    'GoHighLevel form (H2deelST8Z9WKwPJ5WTe) is the ghl-form embed and the Google Maps iframe is the map embed; both are placeholders in this data, rendered by the embed components.',
    'Facebook and Instagram icon links are dropped here (the footer carries the socials).',
    'Hero photo is the live media-library file contact-us-banner (1920x480 banner).',
  ],
};
