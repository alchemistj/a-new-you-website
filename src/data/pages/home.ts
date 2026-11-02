import type { PageCopy } from '../../types/page';

export const page: PageCopy = {
  slug: 'home',
  route: '/',
  template: 'home',
  publish: true,
  oldUrls: ['/'],
  seo: {
    title: "A New You Women's Clinic | Med Spa in Springfield, MO",
    description:
      "Semaglutide, Botox & hormone therapy in Springfield, MO. A New You Women's Clinic — personalized care. Schedule your consult today.",
  },
  hero: {
    h1: 'Take Control of How You Age',
    subhead:
      "It's not all in your head. Your symptoms are REAL, and treatment options are available. Your journey to a healthy new you is within reach.",
    image: {
      src: 'pages/home/hero.jpg',
      alt: 'A smiling woman with dark curly hair and a blue scarf rests her chin on her hand',
    },
    imagePosition: 'center 30%',
    primaryCta: {
      label: 'Schedule an Appointment',
      href: 'https://anewyouwomensclinic.myaestheticrecord.com/online-booking',
    },
  },
  sections: [
    { kind: 'embed', id: 'quiz', embed: 'ghl-quiz', heading: 'Take Our Free 2-Minute Quiz' },
    {
      kind: 'list',
      heading: 'Are You Tired of ...',
      items: [
        'Not being heard by your doctor or being dismissed at your appointments?',
        'Living on the weight-loss roller coaster (or just being stuck on it)?',
        'Hearing you just have to accept what\'s happening to you at "your age"?',
        "Seeing ads for men's sexual dysfunction while women's sexual health is completely ignored?",
      ],
    },
    {
      kind: 'prose',
      heading: "It's Time to Take Back Your Health",
      paragraphs: [
        'A New You Women’s Clinic supports the women of the Springfield, Missouri metro area on their journey to a healthier life. We offer a wide range of services based on cutting-edge research tailored to help you reach optimal levels of health.',
      ],
    },
    {
      kind: 'cards',
      id: 'services',
      cards: [
        { title: 'Female Sexual Dysfunction', href: '/springfield/vaginal-wellness/' },
        { title: 'Menopause', href: '/springfield/menopause/' },
        { title: 'Weight Loss', href: '/springfield/weight-loss/' },
        { title: "Men's Health", href: '/springfield/mens-health/' },
        { title: 'Aesthetics', href: '/springfield/aesthetics/' },
      ],
    },
    {
      kind: 'steps',
      heading: 'Our Process',
      steps: [
        { title: 'Schedule Your First Consultation' },
        { title: 'Set Goals' },
        { title: 'Order Lab Work' },
        { title: 'Review Labs & Map Your Journey' },
        { title: 'Start Your Journey to Optimal Health' },
      ],
    },
    {
      kind: 'prose',
      id: 'founder',
      heading: 'Meet Lucinda Sparks, Founder',
      paragraphs: [
        'Lucinda Sparks, MSN, CNM, APRN, brings 23 years of experience in healthcare and 13 years focused specifically on women’s health. She and her team offers personalized attention and cutting-edge research to help women overcome struggles with their health. Offering a listening ear and a compassionate heart, Lucinda looks forward to guiding you on your journey to improved health and a better state of living.',
      ],
      image: {
        src: 'pages/home/lucinda-sparks.jpg',
        alt: 'Portrait of Lucinda Sparks, founder of A New You Women\'s Clinic, smiling with glasses and long brown hair',
      },
    },
    {
      kind: 'cards',
      cards: [{ title: "Learn More About A New You Women's Clinic", href: '/about/' }],
    },
    {
      kind: 'prose',
      heading: 'Free Seminars',
      paragraphs: [
        'Every month, A New You Women’s Clinic offers free evening seminars on topics that matter to you and your health. Join us for an evening of fun, snacks, and learning — right here at our clinic!',
      ],
    },
    {
      kind: 'cards',
      heading: 'The Latest Info for Your Health',
      cards: [
        {
          title: 'What Is Estrogen? Your Guide From Head to Hoo-Ha',
          href: '/blog/what-is-estrogen-your-guide-from-head-to-hoo-ha/',
        },
        {
          title: 'Hormone Therapy: It’s Time to Rethink What You’ve Been Told',
          href: '/blog/hormone-therapy-its-time-to-rethink-what-youve-been-told/',
        },
        {
          title: 'Successful Weight Loss Needs More Than a Scale',
          href: '/blog/successful-weight-loss-needs-more-than-a-scale/',
        },
        { title: 'Read More', href: '/blog/' },
      ],
    },
    { kind: 'cta', heading: "Let's Start Your Journey Today!" },
  ],
  serviceArea: ['Springfield', 'Nixa', 'Ozark', 'Republic', 'Rogersville'],
  changes: [
    'Homepage service cards reordered to Cindy\'s priority order: Female Sexual Dysfunction card (which links to the vaginal page on the live site, so it now links to /springfield/vaginal-wellness/) first, then Menopause, Weight Loss, Men\'s Health, Aesthetics. Live order was Weight Loss, Aesthetics, Menopause, Female Sexual Dysfunction, Men\'s Health. Card titles and wording unchanged.',
    'Removed the "Pounds Lost With A New You" heading and its 0 lbs counter.',
    'Removed the Black Friday coupon text and the "#ShareASale" text (they live in the footer, not in the page content).',
    'Quiz: the "Take Our Free 2-Minute Quiz" button is now the heading of the ghl-quiz embed section, placed right after the hero where the quiz CTA was.',
    'Hero primary CTA is the standard "Schedule an Appointment" booking link (brief). The live hero button was the quiz link.',
    'The live page had two H1s (logo and "Take Control of How You Age"); only the second is kept as the H1.',
    'Live hero subhead was an H2; it is now the hero subhead (same words).',
    'Process step titles lose their typed numbers ("1. ", "2. ") because the steps section numbers itself. Words unchanged.',
    'Process section buttons "Let\'s Get Started Today" (after the service cards) and "Let\'s Start Your Journey Today!" (after the steps) were both booking links. Only the second is kept, as the final CTA band; "Let\'s Get Started Today" is left out because the final CTA is the primary booking button.',
    '"Learn More About A New You Woman\'s Clinic" link label changed to "Women\'s" (name spelling). It is a one-card cards section because prose sections have no link field.',
    'Name spelling fixed to "A New You Women\'s Clinic" in the Free Seminars paragraph ("Woman\'s" on the live page).',
    '"Latest Info" blog links now point at the new /blog/<slug>/ routes; the "Keep Reading" button labels are dropped because each card is the link.',
    'Left out the Free Seminars photo (education-series-page.jpg) to avoid two photo sections in a row (Rule 4.2).',
    'Left out the logo-icon image above the counter heading and the service card photos (cards have no image field).',
  ],
};
