// TEST FIXTURE ONLY (FF_FIXTURES=1). Not site copy. Lorem-free filler so templates can be gated.
import type { PageCopy } from '../../../src/types/page';

export const page: PageCopy = {
  slug: 'home',
  route: '/',
  template: 'home',
  publish: true,
  oldUrls: [],
  seo: { title: 'Fixture Home | A New You Women\'s Clinic', description: 'Fixture home page used only by foundation tests.' },
  hero: {
    eyebrow: 'Fixture eyebrow',
    h1: 'Fixture Home Heading',
    subhead: 'Fixture subhead sentence for the home template.',
    image: { src: 'pages/fixture/hero.jpg', alt: 'Synthetic test gradient' },
    imagePosition: 'center 30%',
  },
  sections: [
    { kind: 'prose', heading: 'Fixture Opening Section', paragraphs: ['Fixture paragraph one.', 'Fixture paragraph two with a [link to weight loss](/weight-loss/).'] },
    { kind: 'prose', heading: 'Fixture Photo Right', paragraphs: ['Fixture paragraph beside a photo.'], image: { src: 'pages/fixture/body.jpg', alt: 'Synthetic test gradient' } },
    { kind: 'review', quote: 'Fixture review quote.', name: 'Jane D.' },
    { kind: 'prose', heading: 'Fixture Photo Left', paragraphs: ['Fixture paragraph beside a photo on the left.'], image: { src: 'pages/fixture/body.jpg', alt: 'Synthetic test gradient' } },
    { kind: 'embed', embed: 'ghl-quiz', heading: 'Fixture Quiz' },
    { kind: 'video', provider: 'youtube', videoId: 'VhBl3dHT5SY', title: 'Fixture video' },
    { kind: 'faq', heading: 'Fixture FAQ', items: [{ q: 'Fixture question one?', a: ['Fixture answer one.'] }, { q: 'Fixture question two?', a: ['Fixture answer two, first paragraph.', 'Second paragraph.'] }] },
    { kind: 'cta', heading: 'Fixture Final CTA', paragraphs: ['Fixture CTA sentence.'] },
  ],
  serviceArea: ['Springfield', 'Nixa'],
  changes: [],
};
