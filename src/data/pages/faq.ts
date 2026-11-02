import type { PageCopy } from '../../types/page';

export const page: PageCopy = {
  slug: 'faq',
  route: '/faq/',
  template: 'faq',
  publish: true,
  oldUrls: [],
  seo: {
    title: "FAQs in Springfield, MO | A New You Women's Clinic",
    description:
      "Answers about insurance, contracts, semaglutide and cryolipolysis at A New You Women's Clinic in Springfield, MO.",
  },
  hero: {
    h1: 'Want to Know More About Weight Loss',
    image: {
      src: 'pages/faq/hero.jpg',
      alt: 'A white treatment chair beside a cabinet with a sink in a bright treatment room',
    },
    imagePosition: 'center 50%',
    primaryCta: {
      label: 'Schedule an Appointment',
      href: 'https://anewyouwomensclinic.myaestheticrecord.com/online-booking',
    },
  },
  sections: [
    {
      kind: 'faq',
      heading: 'Frequently Asked Question',
      items: [
        {
          q: 'Do you take insurance ?',
          a: [
            'Most insurance companies do not cover weight loss programs. We DO NOT TAKE INSURANCE. We will however give you an itemized bill for you to submit to your insurance company for reimbursement',
          ],
        },
        {
          q: 'Do I have to sign a contract ?',
          a: ['No contract is necessary. We do offer affordable payment options.'],
        },
        {
          q: 'What is semaglutide ?',
          a: [
            'Semaglutide is a class of medication known as glucagon-like-peptide-1 receptor antagonistis (GLP-1 RAs). It mimics a hormone released in the gut in response to eating and interacts with the brain to suppress appetite and signal your body to feel full.',
          ],
        },
        {
          q: 'What is cryolipolysis ?',
          a: [
            'Cryo-lipolysis is a new and revolutionary method of fat removal which uses extreme cold to freeze fat cells in targeted areas, causing them to die. The intent is to focus on areas of the body that do not respond well to diet and exercise. ( Love handles, thighs, upper arms, under buttocks, tummy, and bra fat)',
          ],
        },
      ],
    },
    {
      kind: 'video',
      provider: 'youtube',
      videoId: 'VhBl3dHT5SY',
      title: 'A New You Women’s Clinic FAQ video',
    },
    { kind: 'cta', heading: 'Schedule an Appointment' },
  ],
  serviceArea: ['Springfield', 'Nixa', 'Ozark', 'Republic', 'Rogersville'],
  changes: [
    'Title and description were wrong (hormone pellets for women). Rewritten: title "FAQs in Springfield, MO | A New You Women\'s Clinic"; description lists only the four questions that are on the page.',
    'Typo fixes: H1 "Want Know More About Weight Loss" to "Want to Know More About Weight Loss"; question "What is cryolipolisis ?" to "What is cryolipolysis ?".',
    'Insurance FAQ kept word for word: "We DO NOT TAKE INSURANCE".',
    'Removed all Lorem ipsum and blind-text filler, including the second FAQ block ("Question Answer", "Question Answer For Personalized Nutrition With Wellness Support By Personality", "How Its Work ?", "Can I Make Successfully ?", "What is Inculded Home Services ?"), the "Find Your Help From Our Frequently Asked Question" Lorem intro, the template Group-1 and Group-3 images, and the "Lets Talk Us" and "Get a Quote" buttons.',
    'The live YouTube video VhBl3dHT5SY is a video section; its title is an accessibility label I chose, not visible copy.',
    'Kept live wording exactly (not on the typo list): "glucagon-like-peptide-1 receptor antagonistis", "( Love handles, ...", " ?" spacing in questions. Josh to decide.',
    'Live H3 "Find Your Help From Our Frequently Asked Question" had Lorem text under it, so it is not kept; "Frequently Asked Question" (live H2) is the FAQ heading.',
    'Hero photo is the live media-library file a-new-you-faq (520 px wide, small for a hero).',
    'Hero image changed to the live banner photo (weighloss-banner, 1920x450); the earlier 520 px photo is replaced.',
  ],
};
