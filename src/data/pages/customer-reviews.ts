import type { PageCopy, Section } from '../../types/page';
import { reviews } from '../reviews';

const reviewSections: Section[] = reviews.map((r) => ({ kind: 'review', quote: r.quote, name: r.name }));

export const page: PageCopy = {
  slug: 'customer-reviews',
  route: '/customer-reviews/',
  template: 'reviews',
  publish: true,
  oldUrls: ['/customer-reviews/'],
  seo: {
    title: "Customer Reviews in Springfield, MO | A New You Women's Clinic",
    description: "Read reviews from clients of A New You Women's Clinic in Springfield, MO.",
  },
  hero: {
    eyebrow: 'Testimonials',
    h1: 'Read What Our Clients Have to Say',
    image: {
      src: 'pages/customer-reviews/hero.jpg',
      alt: 'A large group of smiling women and a few men gather outdoors under trees',
    },
    imagePosition: 'center 40%',
    primaryCta: {
      label: 'Schedule an Appointment',
      href: 'https://anewyouwomensclinic.myaestheticrecord.com/online-booking',
    },
  },
  sections: reviewSections,
  serviceArea: ['Springfield', 'Nixa', 'Ozark', 'Republic', 'Rogersville'],
  changes: [
    'Rebuilt from the reviewer blocks in the static HTML of the live Embedder for Google Reviews widget: nine individual reviews, each its own review section, text word for word (including "fist ever", "I have notice", "she been helping me"). The same list is in src/data/reviews.ts.',
    'Names shown as first name + last initial (Janet Mhire to Janet M., Korina Duminica to Korina D., Linda Sims to Linda S., Jasmine Maloney to Jasmine M., Kristy Gilmore to Kristy G., Danielle Beld to Danielle B., Cassandra Epperson to Cassandra E., April Whitacre to April W., Joyce Taylor to Joyce T.).',
    'Removed the "5.0 Out of 5 stars" line, the star icons, "Overall rating out of 13 Google reviews", the relative dates ("a week ago", "5 months ago"), the Google avatars and the "A New You Women\'s Clinic" widget heading (no stars, counts or dates).',
    'The live widget block for "Tonia Hoffman" has no review text in the HTML, so it is left out.',
    'The live widget shows 10 blocks while it says 13 reviews; only the 9 with text are kept. More reviews may exist in the live widget that are not in the static HTML.',
    'Meta title and description were wrong (ultrasonic cavitation and RF facials). Rewritten: title "Customer Reviews in Springfield, MO | A New You Women\'s Clinic"; description "Read reviews from clients of A New You Women\'s Clinic in Springfield, MO."',
    'H1 "read what our clients have to say" set in title case; "Testimonials" (live H2) is the hero eyebrow.',
    'Hero photo is the live media-library file testimonials-cover (a group photo; I did not confirm who is in it).',
    'The review sections are built from src/data/reviews.ts in this file (an import), so the list stays in one place.',
  ],
};
