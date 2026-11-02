// TEST FIXTURE ONLY (FF_FIXTURES=1). Not site copy.
import type { PageCopy } from '../../../src/types/page';

export const page: PageCopy = {
  slug: 'about',
  route: '/about/',
  template: 'company',
  publish: true,
  oldUrls: [],
  seo: { title: 'Fixture About | A New You Women\'s Clinic', description: 'Fixture company page used only by foundation tests.' },
  hero: { h1: 'Fixture About Heading', image: { src: 'pages/fixture/hero.jpg', alt: 'Synthetic test gradient' }, imagePosition: 'center top' },
  sections: [
    { kind: 'prose', heading: 'Fixture About Section', paragraphs: ['Fixture paragraph.'] },
    { kind: 'badges', heading: 'Fixture Badges', badges: [{ src: 'pages/fixture/body.jpg', alt: 'Synthetic test gradient' }] },
    { kind: 'cta', heading: 'Fixture About CTA' },
  ],
  changes: [],
};
