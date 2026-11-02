// TEST FIXTURE ONLY (FF_FIXTURES=1). Not site copy.
import type { PageCopy } from '../../../src/types/page';

export const page: PageCopy = {
  slug: 'faq',
  route: '/springfield/faq/',
  template: 'faq',
  publish: true,
  oldUrls: ['/faq/'],
  seo: { title: 'Fixture FAQ | A New You Women\'s Clinic', description: 'Fixture FAQ page used only by foundation tests.' },
  hero: { h1: 'Fixture FAQ Heading' },
  sections: [
    { kind: 'faq', items: [{ q: 'Fixture insurance question?', a: ['Fixture answer.'] }, { q: 'Second question?', a: ['Second answer.'] }] },
  ],
  changes: [],
};
