import type { PageCopy } from '../../types/page';

const booking = {
  label: 'Schedule an Appointment',
  href: 'https://anewyouwomensclinic.myaestheticrecord.com/online-booking',
};

export const page: PageCopy = {
  slug: 'image-skincare',
  route: '/image-skincare/',
  template: 'company',
  publish: true,
  oldUrls: [],
  seo: {
    title: "Professional Skincare in Springfield, MO | A New You Women's Clinic",
    description:
      'We offer professional skincare products selected to support your skin’s needs and your treatment plan.',
  },
  hero: {
    h1: 'Professional Skincare in Springfield, MO',
    subhead:
      'We offer professional skincare products selected to support your skin’s needs and your treatment plan.',
    image: {
      src: 'pages/image-skincare/hero.jpg',
      alt: 'A provider in a black A New You shirt holds several A New You skincare bottles and jars',
    },
    imagePosition: 'center 18%',
    primaryCta: booking,
  },
  sections: [
    {
      kind: 'prose',
      paragraphs: [
        '[Contact the clinic](/contact/) for current product availability and personalized recommendations.',
        'Clinical Skincare using safe, botanical ingredients without sacrificing the results you want.',
        'IMAGE Skincare uses botanical ingredients that are safe, chosen intentionally, and doesn’t use “filler” ingredients. Plus, the company doesn’t test their products on animals.',
      ],
    },
    { kind: 'cta', heading: 'Schedule Your Personalized Consultation Today' },
  ],
  related: ['aesthetics', 'botox'],
  serviceArea: ['Springfield', 'Nixa', 'Ozark', 'Republic', 'Rogersville'],
  changes: [
    'H1 replaced the live "A New You Woman\'s Clinic Carries the Image Skincare Line for Your Healthiest Skin" (wrong clinic spelling, and it presents the clinic as carrying the line). New H1 is "Professional Skincare in Springfield, MO". The URL stays /image-skincare/.',
    'Title set to "Professional Skincare in Springfield, MO | A New You Women\'s Clinic". The live title was "Image Skincare - A New You Women\'s Clinic". The live page had no meta description; the description is Cindy’s first sentence (102 characters). Both of her sentences together are 188 characters.',
    'Hero subhead is Cindy’s first sentence, word for word. The next paragraph is her second sentence, word for word, with "Contact the clinic" linked to /contact/.',
    'Kept the live general line "Clinical Skincare using safe, botanical ingredients without sacrificing the results you want."',
    'Kept one IMAGE mention, spelled IMAGE: the botanical-ingredients paragraph. It does not say the clinic stocks the line.',
    'Dropped "Image Skincare is a top-of-the-line, complete skincare regime…" (complete line). Dropped "From targeted treatments to your daily skincare routine, Image Skincare provides the results you want…". Dropped "Our Favorite Products" and the Vital C, ORMEDIC, and Post-Treatment product blocks. Dropped "Visit A New You Women’s Clinic today to experience Image Skincare for yourself…".',
    'The live "Schedule Your Personalized Consultation Today" button is the final CTA heading. "Let\'s Get Started!" was the same booking link again, so it is not repeated. The hero button stays "Schedule an Appointment".',
    'Hero photo is the live above-the-fold banner (A-New-You-Womans-skincare-line.jpg). It shows A New You labeled products, not an IMAGE lineup. The source photo crops the face above the mouth. Product-kit photos were part of the dropped lineup and are not used. Left out the Group-1 template images.',
    'Live URL kept. oldUrls is empty.',
  ],
};
