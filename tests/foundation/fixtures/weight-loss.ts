// TEST FIXTURE ONLY (FF_FIXTURES=1). Not site copy.
import type { PageCopy } from '../../../src/types/page';

export const page: PageCopy = {
  slug: 'weight-loss',
  route: '/weight-loss/',
  template: 'service',
  publish: true,
  oldUrls: ['/weight-loss-in-springfield/'],
  seo: { title: 'Fixture Weight Loss | A New You Women\'s Clinic', description: 'Fixture service page used only by foundation tests.' },
  hero: {
    h1: 'Fixture Service Heading',
    subhead: 'Fixture subhead.',
    image: { src: 'pages/fixture/hero.jpg', alt: 'Synthetic test gradient' },
  },
  sections: [
    { kind: 'prose', heading: 'Fixture Decision Frame', paragraphs: ['Fixture paragraph.'] },
    { kind: 'list', heading: 'Fixture List', intro: 'Fixture intro.', items: ['Fixture item one', 'Fixture item two'], image: { src: 'pages/fixture/body.jpg', alt: 'Synthetic test gradient' } },
    { kind: 'cards', heading: 'Fixture Cards', cards: [{ title: 'Card one', text: 'Short text.' }, { title: 'Card two' }] },
    { kind: 'review', quote: 'Another fixture review.', name: 'Sam P.', city: 'Springfield' },
    { kind: 'steps', heading: 'Fixture Steps', steps: [{ title: 'Step one', text: 'Do the first thing.' }, { title: 'Step two', text: 'Do the second thing.' }], image: { src: 'pages/fixture/body.jpg', alt: 'Synthetic test gradient' } },
    { kind: 'faq', heading: 'Fixture FAQ', items: [{ q: 'Fixture question?', a: ['Fixture answer.'] }] },
    { kind: 'cta', heading: 'Fixture Service CTA' },
  ],
  related: ['menopause', 'not-a-real-slug'],
  serviceArea: ['Springfield', 'Nixa', 'Ozark'],
  changes: [],
};
