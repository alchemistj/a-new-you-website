import type { PageCopy } from '../../types/page';

export const page: PageCopy = {
  slug: 'financing',
  route: '/financing/',
  template: 'company',
  publish: true,
  oldUrls: [],
  seo: {
    title: "Financing in Springfield, MO | A New You Women's Clinic",
    description: "Financing at A New You Women's Clinic in Springfield, MO.",
  },
  hero: {
    h1: 'Financing',
    primaryCta: {
      label: 'Schedule an Appointment',
      href: 'https://anewyouwomensclinic.myaestheticrecord.com/online-booking',
    },
  },
  sections: [{ kind: 'embed', id: 'cherry', embed: 'cherry' }],
  serviceArea: ['Springfield', 'Nixa', 'Ozark', 'Republic', 'Rogersville'],
  changes: [
    'The live page has no copy besides the "Financing" H1; the rest is the Cherry widget (slug a-new-you-womens-clinic), which is the cherry embed section. No copy was written.',
    'Meta description was missing. Added the minimal "Financing at A New You Women\'s Clinic in Springfield, MO." because no page words exist to draw on. Josh may want to replace it.',
    'Title changed from "Financing - A New You Women\'s Clinic" to the standard "[Service] in Springfield, MO | A New You Women\'s Clinic" format.',
    'No hero photo: the live page has none.',
  ],
};
