import type { PageCopy } from '../../types/page';

export const page: PageCopy = {
  slug: 'about',
  route: '/about/',
  template: 'company',
  publish: true,
  oldUrls: [],
  seo: {
    title: "About Us in Springfield, MO | A New You Women's Clinic",
    description:
      "Meet Lucinda Sparks, MSN, CNM, APRN, founder of A New You Women's Clinic in Springfield, MO, with 23 years in healthcare and 13 years in women's health.",
  },
  hero: {
    eyebrow: 'Learn More About Us',
    h1: 'Our team of experts is dedicated to helping you achieve your health goals',
    image: {
      src: 'pages/about/hero.jpg',
      alt: 'Three older women laugh together outdoors under a cloudy sky',
    },
    imagePosition: 'center 30%',
    primaryCta: {
      label: 'Schedule an Appointment',
      href: 'https://anewyouwomensclinic.myaestheticrecord.com/online-booking',
    },
  },
  sections: [
    {
      kind: 'prose',
      paragraphs: [
        'With over 23 years in healthcare, and 13 years in women’s health, I realized there is a better way to truly care for women. That is why I decided to open A New You Women’s Clinic. To focus on the issues that affect women such as weight loss, menopause and sexual dissatisfaction. You don’t have to give up the foods you love or spend all day at the gym to loose weight. You can have the body you want and the lifestyle you desire. We offer the whole package here, taking the time to listen and creating a personalized approach to help you age the way you choose and to look in the mirror without saying if only',
      ],
    },
    {
      kind: 'prose',
      heading: 'Our Vision',
      paragraphs: ['To provide an environment where women feel empowered to make changes in their health, and the way they age.'],
    },
    {
      kind: 'prose',
      heading: 'Our Value',
      paragraphs: [
        'We believe that you are the ultimate decision maker in regards to your health.',
        'We believe it is our job to empower you with the information needed to make your healthcare decisions. We believe that weight loss medication, aesthetic treatments, and hormone replacement therapy should be affordable for all women.',
      ],
    },
    { kind: 'cta', heading: 'Schedule an Appointment' },
  ],
  related: ['weight-loss', 'menopause', 'vaginal-wellness'],
  serviceArea: ['Springfield', 'Nixa', 'Ozark', 'Republic', 'Rogersville'],
  changes: [
    'Years corrected from "22 years in healthcare, and 12 years in women’s health" to 23 and 13 (brief).',
    'Title and description were wrong (Rybelsus, Wegovy, Mounjaro). Rewritten: title "About Us in Springfield, MO | A New You Women\'s Clinic"; description built from the founder facts in the brief (Lucinda Sparks, MSN, CNM, APRN; 23 and 13 years).',
    'Typo fix: eyebrow "LEarn More About Us" to "Learn More About Us" (set as the hero eyebrow).',
    'Removed all placeholder content: the "Lets Consultation" block with phone +62 123 456 789, the three Lorem ipsum credential cards (with their headings "Free Consultation 24 Hours", "Nutrition Legal Certificate", "Organic Nutrition Expertise"), the four logoipsum placeholder logos, and the Group-1 and Group-3 template images.',
    'Removed the stock photos (CoolSculpting, unhappy couple, woman on scale) from the live page; they do not show the clinic. The live "weight loss" inline link and "Schedule an appointment" button (to /contact/) are dropped; booking is the hero and final CTA.',
    'Hero photo (three women in black scrubs) is a live media-library file named total-feminine-care-springfield and is only 680 px wide; I did not confirm that these are staff, so the alt text says only what is visible. The portrait is the same founder photo as the homepage.',
    'Hero is now the live about-page banner photo (a stock photo of three laughing women); the earlier hero was a different photo. The founder portrait is removed because it could not be confirmed as Cindy.',
    'Kept the live first-person founder paragraph exactly, including "loose weight" (probably "lose"; not on the typo list) and the missing final period. Flagged for Josh.',
  ],
};
