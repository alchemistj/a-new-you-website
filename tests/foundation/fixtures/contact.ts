// TEST FIXTURE ONLY (FF_FIXTURES=1). Not site copy.
import type { PageCopy } from '../../../src/types/page';

export const page: PageCopy = {
  slug: 'contact',
  route: '/springfield/contact/',
  template: 'contact',
  publish: true,
  oldUrls: ['/contact/'],
  seo: { title: 'Fixture Contact | A New You Women\'s Clinic', description: 'Fixture contact page used only by foundation tests.' },
  hero: { h1: 'Fixture Contact Heading' },
  sections: [
    { kind: 'embed', embed: 'ghl-form', heading: 'Fixture Form' },
    { kind: 'embed', embed: 'map', heading: 'Fixture Map' },
  ],
  serviceArea: ['Springfield'],
  changes: [],
};
