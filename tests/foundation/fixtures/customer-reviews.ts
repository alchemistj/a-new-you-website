// TEST FIXTURE ONLY (FF_FIXTURES=1). Not site copy.
import type { PageCopy } from '../../../src/types/page';

export const page: PageCopy = {
  slug: 'customer-reviews',
  route: '/customer-reviews/',
  template: 'reviews',
  publish: true,
  oldUrls: ['/customer-reviews/'],
  seo: { title: 'Fixture Reviews | A New You Women\'s Clinic', description: 'Fixture reviews page used only by foundation tests.' },
  hero: { h1: 'Fixture Reviews Heading' },
  sections: [
    { kind: 'review', quote: 'Fixture review one.', name: 'Ann B.' },
    { kind: 'prose', paragraphs: ['Fixture paragraph between reviews.'] },
    { kind: 'review', quote: 'Fixture review two.', name: 'Cal R.' },
  ],
  changes: [],
};
