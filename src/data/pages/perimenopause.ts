import type { PageCopy } from '../../types/page';

export const page: PageCopy = {
  slug: 'perimenopause',
  route: '/springfield/perimenopause/',
  template: 'service',
  publish: true,
  oldUrls: ['/perimenopause/'],
  seo: {
    title: 'Perimenopause Treatment for Sleep Disturbance Disorder',
    description:
      'Check out our comprehensive perimenopause treatment solutions to alleviate sleep disturbance disorder & enhance your well-being. Book your appointment with us!',
  },
  hero: {
    h1: 'Perimenopause',
    image: {
      src: 'pages/perimenopause/hero.jpg',
      alt: 'A gray-haired provider in black scrubs talks with a blonde patient in a treatment room',
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
      paragraphs: [
        'Perimenopause refers to the time in a woman’s life where your body makes the natural transition to menopause. Marking a transition from reproductive years into the menopausal state.',
        'Age of onset varies among women, but usually begin somewhere in their 40s where you may notice menstrual irregularities, hot flashes, insomnia, changes in libido or sexual satisfaction, new or worsening anxiety or depression, weight gain or difficulty losing weight, acne, bloating, facial hair growth, and or Pain causing missed work or school.',
        'Causes are related to changes in your body’s production of hormones, like estrogen and progesterone.',
        'Menopause can happen in your 40s or 50s and is the sensation of menstrual cycles for 12 consecutive months. It is a natural transition marking the end reproductive years.',
        'Physical symptoms include hot flashes, emotional symptoms, sleep disturbances, decreased energy, weight gain, slow, metabolism, thinning hair, dry skin, loss of breast, fullness, night sweats, chills, and vaginal dryness.',
        'Treating your symptoms specifically based on your hormonal needs, and levels, will provide you with the optimal satisfaction.',
      ],
    },
    {
      kind: 'list',
      source: 'cindy',
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
      kind: 'cta',
      heading: 'Let us here at A New You Women’s Clinic help you overcome these life-changing symptoms and return your feelings of a younger you.',
    },
  ],
  related: ['menopause', 'biote', 'vaginal-wellness'],
  serviceArea: ['Springfield', 'Nixa', 'Ozark', 'Republic', 'Rogersville'],
  changes: [
    'H1 typo fix: "Perimenopaus" to "Perimenopause".',
    'Removed all template filler: the "Service Key Features" and "Our Services" blocks, the weight-loss-plan line ("our medical providers will customize a weight loss plan..."), "dietary restrictions / health concerns / lifestyle to development", "Lets get Best Nutrition & wellness Of Your By Our Expert Personal Coach Team", "Personality Coach", "Free Consultation 24 Hours", all 7 Lorem ipsum blocks, the "Home / Perimenopause" breadcrumb text and the Group-1/Group-3 template images.',
    'The live closing line appeared twice (a paragraph and an H4); it is kept once, as the final CTA heading. "schedule an appointment" button is the hero and CTA booking button.',
    'Kept the live paragraphs word for word, including their odd wording and stray commas ("slow, metabolism", "loss of breast, fullness", "is the sensation of menstrual cycles"). These look like garbled text, but fixing them would mean guessing. Josh to decide.',
    'Added Cindy\'s Perimenopause & Menopause Evaluation concerns word for word.',
    'Hero photo is the live media-library file named Perimenopausal-and-Menopausal-Symptoms (not in the page HTML; the live page had only template icons). Josh to confirm.',
    'Title and description kept as live.',
  ],
};
