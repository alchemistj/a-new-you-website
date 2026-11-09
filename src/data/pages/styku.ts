import type { PageCopy } from '../../types/page';

const booking = {
  label: 'Schedule an Appointment',
  href: 'https://anewyouwomensclinic.myaestheticrecord.com/online-booking',
};

export const page: PageCopy = {
  slug: 'styku',
  route: '/styku/',
  template: 'service',
  publish: true,
  oldUrls: [],
  seo: {
    title: "Styku 3D Body Scanning in Springfield, MO | A New You Women's Clinic",
    description:
      'Styku 3D body scanning helps us track changes in body measurements and estimated body composition over time.',
  },
  hero: {
    h1: 'Styku 3D Body Scanning in Springfield, MO',
    subhead:
      'Styku 3D body scanning helps us track changes in body measurements and estimated body composition over time, giving patients a broader view of their progress than weight alone.',
    image: {
      src: 'pages/styku/hero.jpg',
      alt: 'A provider in black holds a tablet showing a 3D body scan, with part of a white scanning platform beside them',
    },
    imagePosition: '62% center',
    primaryCta: booking,
  },
  sections: [
    {
      kind: 'prose',
      paragraphs: [
        'We use the Styku V5 as part of body-composition assessment and progress monitoring within our weight-management and wellness care.',
      ],
    },
    {
      kind: 'prose',
      heading: 'Assess & Stratify Health Risk',
      paragraphs: ['Body Shape Analysis. Calculate waist circumference and analyze your shape.'],
      image: {
        src: 'pages/styku/body-shape-analysis.jpg',
        alt: 'A woman in black stands on a white body-scanning turntable next to a tall white scanner',
      },
    },
    {
      kind: 'prose',
      heading: 'Fitness',
      paragraphs: [
        'Styku’s fitness tools to provide estimated body composition without the inconvenience of a dunk tank.',
      ],
    },
    {
      kind: 'prose',
      heading: 'Health',
      paragraphs: [
        'Estimated Body Fat & Overall Fitness.',
        'Body Fat Analysis. Determine estimated body composition and non-fat vs fat mass every time you scan.',
        'Compare your fitness level with national averages and see how you rank.',
      ],
    },
    {
      kind: 'prose',
      heading: 'Risk Analysis',
      paragraphs: [
        'View and track anthropometric measurements, like subcutaneous fat changes across multiple scans.',
        'Tie-in key measurements with health risks, and track how those measurements are changing over the course of a wellness program.',
      ],
    },
    {
      kind: 'prose',
      heading: 'Fat Loss Calculator',
      paragraphs: [
        'Set fat loss goals for estimated body fat and fitness level, and track progress across multiple scans. Reach your goal in a specified amount of time by setting the amount of weight per week you’d like to lose.',
      ],
    },
    {
      kind: 'prose',
      heading: 'Caloric Expenditure',
      paragraphs: [
        'Styku will determine the required calorie deficit per day to meet your goal.',
        'Explore your energy balance by setting your desired activity level to meet your goal and calculate your maximum calorie intake.',
      ],
    },
    { kind: 'cta', heading: 'Call today to setup your initial consultation' },
  ],
  related: ['weight-loss', 'memberships'],
  serviceArea: ['Springfield', 'Nixa', 'Ozark', 'Republic', 'Rogersville'],
  changes: [
    'Design QA: removed the top Weight Loss / Memberships link cards; the Related Services band already links both.',
    'The live page has no H1. Added the specified H1, "Styku 3D Body Scanning in Springfield, MO".',
    'Hero subhead is Cindy’s description, word for word. It is 176 characters, so the meta description uses only her opening clause (108 characters) to stay under the 170-character check.',
    'Title replaced the live "Styku 3D Body Scanner - Transforming Your Wellness Journey" (and its "precision measurements" description) with the H1 plus the clinic name. The live description promised precision.',
    'Added Cindy’s Styku V5 sentence, word for word: "We use the Styku V5 as part of body-composition assessment and progress monitoring within our weight-management and wellness care." Weight Loss and Memberships are link cards to /weight-loss/ and /subscription-plans/.',
    'Removed "Determine your risk level for disease using waist circumference and waist-to-hip ratio." It presented the scan as determining disease risk.',
    'Fitness: "precise body composition" changed to "estimated body composition". Removed ", but with the precision of a Dexa scan" (exactness, and Dexa is a bone-density comparison).',
    'Health line "Measure Body Fat & Overall Fitness." changed to "Estimated Body Fat & Overall Fitness." "Determine body composition" changed to "Determine estimated body composition."',
    'Removed "Calculate increased likelihood of obesity-related diseases using anthropometric measurements." The following "Tie-in key measurements…" sentence is kept. The live page had no space in "measurements.Tie-in"; the sentences are now separate paragraphs.',
    'Removed the Risk Reduction section. Its only sentence was the interactive calculator for reducing the risk of obesity-related diseases.',
    'Fat Loss Calculator: "body fat %" changed to "estimated body fat".',
    'Kept Caloric Expenditure as written, including "Styku will determine the required calorie deficit". It does not claim exact body fat, bone density, or that a scan replaces a medical evaluation. Flagged for Josh.',
    'Kept "Compare your fitness level with national averages and see how you rank." Flagged for Josh.',
    'The closing line "Call today to setup your initial consultation" is the final CTA heading. "setup" is the live spelling.',
    'Hero photo is the live above-the-fold banner (styku-Body-Shape-Analysis.jpg, 1920×480). The body photo is Body-Shape-Analysis.jpg. Left out the Group-1 template image.',
    'A YouTube embed on the live page (youtu.be/WmDx9oWm3CA) returns 404 for its thumbnail and oEmbed. It is not on this page.',
    'Live URL kept. oldUrls is empty.',
  ],
};
