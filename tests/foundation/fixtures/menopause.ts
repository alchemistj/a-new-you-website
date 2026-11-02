// TEST FIXTURE ONLY (FF_FIXTURES=1). Not site copy.
import type { PageCopy } from '../../../src/types/page';

export const page: PageCopy = {
  slug: 'menopause',
  route: '/springfield/menopause/',
  template: 'service',
  publish: true,
  oldUrls: ['/menopause/'],
  seo: { title: 'Fixture Menopause | A New You Women\'s Clinic', description: 'Second fixture service page, no hero photo.' },
  hero: { h1: 'Fixture Menopause Heading' },
  sections: [
    { kind: 'prose', heading: 'Fixture Section', paragraphs: ['Fixture paragraph.'] },
    { kind: 'pricing', heading: 'Fixture Pricing', plans: [{ name: 'Plan A', lines: ['Line one', 'Line two'] }], note: 'Fixture note.' },
    { kind: 'cta', heading: 'Fixture Menopause CTA' },
  ],
  related: ['weight-loss'],
  changes: [],
};
