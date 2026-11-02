import type { PageCopy } from '../../types/page';

export const page: PageCopy = {
  slug: 'menopause',
  route: '/springfield/menopause/',
  template: 'service',
  publish: true,
  oldUrls: ['/menopause/', '/thyroid-optimization/', '/pcos-management/'],
  seo: {
    title: 'Effective Menopause Emotional Symptoms Treatment',
    description:
      'Are you suffering from menopausal weight gain issues? Check out our safe and secure menopause emotional symptom treatment at A New You Women’s Clinic. Call us!',
  },
  hero: {
    h1: "You Don't Have to Suffer Just Because It's Normal.",
    subhead:
      "Perimenopause and menopause are normal phases of every woman's life. But that doesn't mean you have to accept the suffering that comes with it.",
    image: {
      src: 'pages/menopause/what-is-menopause.jpg',
      alt: 'A provider in a white coat smiles at a patient in a black headscarf across a desk during a consultation',
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
      heading: 'What is perimenopause?',
      paragraphs: [
        'Perimenopause is defined as the stage of life when a woman’s reproductive cycle starts to slow down and estrogen production starts to decrease. As estrogen fluctuates, so will progesterone and testosterone production. You may experience a rollercoaster of hormone fluctuations during perimenopause.',
        'The decline in hormones leading to perimenopause typically starts in a woman’s 30s. This phase can last up to 10 years or longer.',
      ],
    },
    {
      kind: 'list',
      intro: 'Symptoms of perimenopause may include:',
      items: [
        'Hot flashes',
        'Night sweats',
        'Unusual weight gain',
        'Inconsistent periods (timing or flow)',
        'Mood swings (yes, rage at a stoplight is a real thing)',
        'Low libido',
        'Insomnia',
        'And many more',
      ],
      outro:
        'If you are experiencing shifts in your physical, mental, or emotional well-being and you are nearing or are in your 40s, it’s a good idea to consult with a women’s healthcare professional who understands the changes your body is experiencing and can help you navigate your way through it.',
    },
    {
      kind: 'prose',
      heading: 'What is menopause?',
      paragraphs: [
        'Menopause is the day when a woman no longer produces reproductive hormones (estrogen, progesterone, testosterone). During perimenopause, you may experience irregular menstrual cycles. They will begin to extend by days, then by weeks, then by months — and not always in that order! Once you’ve experienced 366 days in a row without a period, congratulations! You’re officially menopausal. (And contrary to popular belief, you don’t go “through” menopause — it’s a one-way door.)',
        'Post-menopause is the phase after menopause women will be in for the rest of their lives. While a few women may experience some relief from the symptoms of perimenopause, many women will suffer from the lack of hormones for the rest of their lives.',
        'Post-menopausal women are at an increased risk of heart disease and osteoporosis due to low hormone levels. You can reduce your risk of some health issues through hormone replacement therapy.',
      ],
    },
    {
      kind: 'prose',
      heading: 'Hormone Replacement Therapy',
      paragraphs: [
        'You don’t have to accept life “as is” during perimenopause or even post-menopause. Great research is emerging on the effectiveness of hormone replacement therapy (HRT) to support a mature woman’s health and wellness as she ages.',
        'Hormone replacement therapy helps ensure your body has the hormones you need to protect your bones and your heart while helping prevent breast cancer. While it is recommended you start HRT during perimenopause, you can start taking HRT at any age.',
        'Talk to a board-certified woman’s health provider today to see if hormone replacement therapy is right for you.',
      ],
      image: {
        src: 'pages/menopause/hormone-replacement-therapy.jpg',
        alt: 'A provider in a white coat hands a bottle of facial toner to a patient in front of shelves of skincare and supplement products',
      },
    },
    {
      kind: 'cards',
      id: 'hormone-services',
      heading: 'Women’s Hormone Optimization & Menopause Care',
      cards: [
        { title: 'Perimenopause & Menopause Evaluation', href: '/springfield/perimenopause/' },
        { title: 'Bioidentical Hormone Replacement Therapy (BHRT)', href: '/biote/' },
        { title: 'Hormone Laboratory Testing & Monitoring' },
      ],
    },
    {
      kind: 'list',
      heading: 'Perimenopause & Menopause Evaluation',
      intro: 'Concerns:',
      items: [
        'Hot flashes',
        'Night sweats',
        'Sleep changes',
        'Brain fog',
        'Fatigue/low energy',
        'Mood changes',
        'Weight changes',
        'Changes in libido',
        'Vaginal changes associated with menopause',
        'Feeling different during perimenopause or menopause',
      ],
    },
    {
      kind: 'list',
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
      kind: 'list',
      intro: 'Concerns:',
      items: [
        'Menopause and perimenopause symptoms',
        'Hot flashes and night sweats',
        'Low energy',
        'Brain fog',
        'Sleep problems',
        'Mood changes',
        'Low libido',
        'Hormone-related vaginal changes',
        'Changes in body composition',
        'Symptoms associated with changing estrogen, progesterone or testosterone levels',
      ],
    },
    {
      kind: 'list',
      heading: 'Hormone Laboratory Testing & Monitoring',
      intro: 'Concerns:',
      items: [
        'Possible hormone imbalance',
        'Persistent symptoms despite previous treatment',
        'Thyroid-related concerns',
        'Metabolic changes',
        'Monitoring hormone treatment',
        'Understanding hormone levels in relation to symptoms',
      ],
    },
    { kind: 'cta', heading: "I'm Ready to Learn More About HRT" },
  ],
  related: ['perimenopause', 'biote', 'vaginal-wellness'],
  serviceArea: ['Springfield', 'Nixa', 'Ozark', 'Republic', 'Rogersville'],
  changes: [
    'oldUrls also include /thyroid-optimization/ and /pcos-management/. Both live pages were pure template filler (Lorem ipsum, nutrition coach text) and are not migrated.',
    'Typo fix: "estrogren" to "estrogen".',
    'Inline links in the live copy ("increased risk of heart disease and osteoporosis" to Cleveland Clinic, "hormone replacement therapy" to /biote/) are kept as plain words; prose sections have no inline link field. The sentence "Post-menopausal women are at an increased risk..." is rejoined from the link text.',
    'Live buttons "Find Relief from Perimenopausal and Menopausal Symptoms", "I Need Support for My Perimenopausal Journey" and "Help! I\'m in Menopause!" are dropped (all booking links; the hero and final CTA carry the booking button). "I\'m Ready to Learn More About HRT" is the final CTA heading.',
    'Live H2 under the H1 is now the hero subhead (same words).',
    'Title and description kept as live (not wrong, though the title lacks the brand and Springfield). Josh may want the standard "[Service] in Springfield, MO | A New You Women\'s Clinic" format.',
    'Added Cindy\'s Women\'s Hormone Optimization & Menopause Care section word for word: category heading as a cards overview, Perimenopause & Menopause Evaluation concerns, BHRT "Services may include" and "Concerns" lists, Hormone Laboratory Testing & Monitoring concerns. Her all-caps category heading is set in title case. Her "Hormone Optimization / Total Wellness Memberships" blurb is not on this page (not in the mapping).',
    'Images: hero is what-is-menopause (the page\'s OG image); hormone-replacement-therapy photo sits beside the HRT section.',
    'No testimonial quotes were found in this page\'s content, so no review bands.',
  ],
};
