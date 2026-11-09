import type { PageCopy } from '../../types/page';

export const page: PageCopy = {
  slug: 'biote',
  route: '/biote/',
  template: 'company',
  publish: true,
  oldUrls: [],
  seo: {
    title: 'Biote Certified Provider - Unlock Hormonal Optimization',
    description:
      "Optimize your hormones with BioTE. A New You Women's Clinic is a certified BioTE provider and can help you discover your path to hormone optimization.",
  },
  hero: {
    h1: 'Your Certified BioTE Provider in Springfield, MO',
    subhead: "Discover for yourself why BioTE is the nation's leading bioidentical hormone replacement therapy.",
    image: {
      src: 'pages/biote/hero.jpg',
      alt: 'A provider in black scrubs holds out a BioTE product box and bottle to a seated blonde patient',
    },
    imagePosition: 'center 40%',
    primaryCta: {
      label: 'Schedule an Appointment',
      href: 'https://anewyouwomensclinic.myaestheticrecord.com/online-booking',
    },
  },
  sections: [
    {
      kind: 'prose',
      heading: 'What is Hormone Replacement Therapy?',
      paragraphs: [
        'As women age, we lose the ability to produce the hormones we’ve relied on throughout our lives. Hormone replacement therapy helps provide your body with the critical hormones you need to function optimally every day.',
      ],
    },
    {
      kind: 'list',
      heading: 'Symptoms of hormonal imbalance',
      items: [
        'Fatigue',
        'Brain fog',
        'Decreased sex drive',
        'Night sweats and hot flashes',
        'Weight gain',
        'Difficulty sleeping',
        'So many more…',
      ],
      outro:
        'The good news is you don’t have to “just deal” with hormonal imbalance. Hormone replacement therapy helps provide your body with the critical hormones you need to function optimally every day.',
      image: {
        src: 'pages/biote/hormonal-imbalance-symptoms.jpg',
        alt: 'A gray-haired provider in black scrubs talks with a blonde patient in a treatment room',
      },
    },
    {
      kind: 'list',
      source: 'cindy',
      heading: 'Bioidentical Hormone Replacement Therapy (BHRT)',
      intro: 'Services may include:',
      items: [
        'Estrogen therapy',
        'Progesterone therapy',
        'Testosterone therapy for women when clinically appropriate',
        'BioTE hormone pellet therapy',
        'Topical/compounded hormone therapy',
        'Oral hormone therapy when appropriate',
      ],
    },
    {
      kind: 'prose',
      heading: 'How Can BioTE Help Improve Your Well-Being?',
      paragraphs: [
        'BioTE is the nation’s leading provider for bioidentical hormone replacement therapy and connects women with certified practitioners who understand and may help address signs of aging. With the BioTE method of hormone optimization, you may be able to break free from many of the frustrating symptoms of hormonal imbalance, like like of energy, mood issues, low libido, and insomnia. Plus, it’s super easy to get started!',
      ],
    },
    {
      kind: 'steps',
      intro: '3-Step Plan for Starting your Journey to optimal Health and Wellness',
      steps: [
        { title: 'Simple Blood Test' },
        { title: 'Review Results & Develop Your Plan' },
        { title: "Start Your Pellets and you're on Your way" },
      ],
    },
    {
      kind: 'prose',
      heading: 'Hear how Biote Can Help You Live an Optimal Life',
      paragraphs: ['Hear from Dr. Cory Rice, Chief Clinical Advisor for BioTE Medical, on how BioTE can help you.'],
    },
    {
      kind: 'video',
      provider: 'vimeo',
      videoId: '805690936',
      title: 'Dr. Cory Rice of BioTE Medical on how BioTE can help you',
    },
    {
      kind: 'cards',
      cards: [{ title: 'Order Your Biote Supplements Online', href: 'https://link.biote.info/tx3' }],
    },
    { kind: 'cta', heading: 'Start Your Journey to optimal health today' },
  ],
  related: ['menopause', 'mens-health', 'perimenopause'],
  serviceArea: ['Springfield', 'Nixa', 'Ozark', 'Republic', 'Rogersville'],
  changes: [
    'Added Cindy\'s Bioidentical Hormone Replacement Therapy (BHRT) "Services may include" bullets word for word as a list section. Her BHRT "Concerns" list is on the menopause page, not here.',
    'Live H2 under the H1 is now the hero subhead (same words). The live "Start Your Journey to optimal health today" button is the final CTA heading.',
    'Vimeo video 805690936 is a video section after the Dr. Cory Rice intro line; its title is an accessibility label I wrote from that line, not visible copy.',
    'The "Order Your Biote Supplements Online" link (third-party link.biote.info/tx3) is kept as a one-card link. Josh to confirm it should stay.',
    'The live 3-step plan headings are steps with the live titles; the step icon images (lab-results, review-results, start-journey-2) are left out.',
    'The symptoms image was a link to a blog post on the live page; the link is dropped, the photo (hormonal-imbalance-symptoms) sits beside the symptoms list.',
    'Kept live wording exactly, including "like like of energy" (probably "lack of"; not on the typo list) and the live claim "the nation’s leading provider". Flagged for Josh.',
    'The Dr. Cory Rice mention stays as third-party attribution, as on the live page; he is not presented as clinic staff.',
    'Title and description kept as live. Left out the Group-1 template image.',
  ],
};
