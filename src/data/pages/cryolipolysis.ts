import type { PageCopy } from '../../types/page';

export const page: PageCopy = {
  slug: 'cryolipolysis',
  route: '/springfield/cryolipolysis/',
  template: 'service',
  publish: true,
  oldUrls: ['/cryolypolysis/'],
  seo: {
    title: 'Cryolipolysis Fat Freezing & Body Slimming Treatments',
    description:
      'Achieve your non surgical body contouring goals with the help of our non invasive cryolipolysis fat freezing, reduction, and body slimming treatments. Call us!',
  },
  hero: {
    h1: 'Cryolipolysis the Best Way for Body Slimming',
    subhead: 'Sit back, relax, and say goodbye to stubborn fat FreezeFats PRO',
    image: {
      src: 'pages/cryolipolysis/hero.jpg',
      alt: 'A provider in purple gloves positions two cooling applicators on a patient’s abdomen',
    },
    imagePosition: 'center 40%',
    primaryCta: {
      label: 'Schedule an Appointment',
      href: 'https://anewyouwomensclinic.myaestheticrecord.com/online-booking',
    },
  },
  sections: [
    {
      kind: 'list',
      items: ['10 ℃ fat freezing', '4 cryo handles', 'Fast fat removal'],
    },
    {
      kind: 'prose',
      heading: 'How Cryolipolysis Work?',
      paragraphs: [
        'Triglyceride in fats will be converted into solid in particular low temperatures. It uses advanced Freeze fat technology to selectively target fat bulges and eliminate fat cells through a gradual process that does not harm the surrounding tissues, reduce unwanted fat, when fat cells are exposed to precise cooling, they trigger a process of natural removal that gradually reduces the thickness of the fat layer. And the fat cells in the treated area are gently eliminated through the body’s normal metabolism process, to eliminate unwanted fat',
        'Cryolipolysis is a breakthrough, non-invasive procedure that uses cooling technology to noticeably eliminate fat without surgery.',
      ],
    },
    {
      kind: 'prose',
      heading: 'Reshape Your Body Figure',
      paragraphs: ['You\'ll love your cryolipolysis results every time you look in the mirror.'],
      image: {
        src: 'pages/cryolipolysis/procedure.jpg',
        alt: 'A provider in purple gloves holds a handheld cooling device against a patient’s abdomen',
      },
    },
    {
      kind: 'list',
      heading: 'Cryolipolysis',
      intro: 'Concerns:',
      items: [
        'Localized areas of stubborn fat',
        'Body-contouring concerns',
        'Areas resistant to weight loss',
      ],
    },
    {
      kind: 'steps',
      heading: 'Principles of Treatment',
      steps: [
        { title: 'Vacuum', text: 'First of all.Gel pad attach to target treatment area.' },
        { title: 'Delivering Cooling energy', text: 'Precisely controlled strong cooling energy.' },
        { title: 'Cooling', text: 'Only affect fat layer without damage to other tissues.' },
        { title: 'Apoptosis', text: 'Programmed cell death by natural body system & gradual release of lipids.' },
      ],
    },
    {
      kind: 'prose',
      heading: 'Non-Invasive, Non-Surgery',
      paragraphs: ['Cryolipolysis is a revolutionary body sculpting technique which is non-invasive and can freeze away stubborn fat.'],
    },
    {
      kind: 'prose',
      heading: 'Where Does the Fat Go?',
      paragraphs: ['Once it’s gone,it’s gone for good.', 'The coolest way to lose weight'],
    },
    {
      kind: 'faq',
      items: [
        {
          q: 'What will my results be ?',
          a: ['Each Cryolipolysis treatment results in a significant noticeable reduction of fat in the treated area, typically between 20% to 40%'],
        },
        {
          q: 'When will I see results?',
          a: ['You may start to see changes as quickly as three weeks after your treatment, and will experience the most dramatic results after two months. But your body will still lush out fat cells and continues doing so for up to four to six months after treatment'],
        },
      ],
    },
    {
      kind: 'steps',
      steps: [
        { title: 'A normal fat cell.' },
        { title: 'Cooling is applied,causing the fat cell to undergo natural cell death through apoptosis.' },
        { title: 'The fat cells die and begin to collapse.' },
        { title: 'Macrophages digest and consume the dead fat cells and lipids within the cells' },
        { title: 'The dead fat cells and their contents are cleared through the lymphatic system.' },
        { title: 'It goes to the liver where it is processed as waste.' },
      ],
    },
    {
      kind: 'prose',
      heading: 'Multiple Treatment Areas Sculpting The Body',
      paragraphs: [
        'After treatment, targeted fat cells are eliminated for good. Untreated areas will have no change in fat cell distribution.',
      ],
    },
    { kind: 'cta', heading: 'Schedule an Appointment' },
  ],
  related: ['aesthetics', 'botox', 'weight-loss'],
  serviceArea: ['Springfield', 'Nixa', 'Ozark', 'Republic', 'Rogersville'],
  changes: [
    'H1 was all lowercase ("cryolipolysis the best way for body slimming"); set in title case. Other all-caps headings ("HOW CRYOLIPOLYSIS WORK?", "RESHAPE YOUR BODY FIGURE", "WHERE DOES THE FAT GO?", "NON-INVASIVE,NON-SURGERY", "MULTIPLE TREATMENT Areas Sculpting The Body") are set in title case; "NON-INVASIVE,NON-SURGERY" gets a space after the comma.',
    'oldUrl is /cryolypolysis/ (misspelled slug); the new route is /springfield/cryolipolysis/.',
    'Added Cindy\'s Cryolipolysis concerns word for word as a list section.',
    'The live testimonial (" I received my first treatment yesterday. It was so much more than I expected. I highly recommend ") has no reviewer name on the page, so it is not shown as a review band (reviews need first name + last initial). Josh to supply a name or drop it.',
    'Dropped the quote-marked label "Introduction" and the empty "Treatment Area" heading (no content under them), and the live "Schedule an appointment" button text (kept as the CTA heading "Schedule an Appointment").',
    'The live page\'s six-step fat-cell process was an unlabeled bullet list; it is a steps section with the bullet text as step titles.',
    'Kept live wording exactly, including its errors ("How Cryolipolysis Work?", "First of all.Gel pad attach", "Cooling is applied,causing", "lush out fat cells", "What will my results be ?"). They are not on the brief\'s typo list; Josh to decide.',
    'Kept the live claim "typically between 20% to 40%" and "gone for good". Flagged for Josh.',
    'Photos come from the live media library files named for cryolipolysis (Elementor backgrounds, not in the page HTML). Hero file is only 680 px wide; a larger original may be needed.',
    'Title and description kept as live.',
  ],
};
