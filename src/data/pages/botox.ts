import type { PageCopy } from '../../types/page';

export const page: PageCopy = {
  slug: 'botox',
  route: '/springfield/botox/',
  template: 'service',
  publish: true,
  oldUrls: ['/botox-in-springfield-mo/'],
  seo: {
    title: "Botox in Springfield, MO | A New You Women's Clinic",
    description:
      "Botox treatments in Springfield, MO at A New You Women's Clinic. Reduce fine lines & wrinkles with expert, personalized care. Schedule today.",
  },
  hero: {
    h1: 'Botox in Springfield, MO',
    subhead: 'Look as Vibrant as You Feel — Without Looking “Done”',
    image: {
      src: 'pages/botox/hero.jpg',
      alt: 'A provider in a white coat gives an injection to a patient reclining on a treatment bed',
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
        'We work with your natural facial structure to create results that still look like you, just refreshed and at ease.',
        'You’re sleeping fine. Taking care of yourself. Feeling good. But those forehead lines. The crease between your brows. The tension around your eyes.',
        'They’re telling a story you don’t feel anymore.',
        'At A New You Women’s Clinic, we help men and women who are searching for Botox in Springfield, MO, align how they look with how they actually feel.',
        'Our clients don’t come in asking to look “different.” They want to look rested. Softer. Less tense. More like themselves again.',
        'That’s exactly what our Botox treatments are designed to do — subtly, naturally, and with intention.',
      ],
    },
    {
      kind: 'prose',
      heading: 'What Is Botox, Really?',
      paragraphs: [
        'Botox® is one of the most trusted non-surgical cosmetic treatments available today. When used correctly, it doesn’t erase expression but softens the tension that causes lines to settle in the first place.',
        'Botox works by gently relaxing the tiny facial muscles responsible for dynamic wrinkles — the lines that appear when you frown, squint, or raise your brows. The result is smoother skin while your face still moves naturally.',
      ],
      image: {
        src: 'pages/botox/what-is-botox.jpg',
        alt: 'A provider in black scrubs and purple gloves injects near a blonde woman’s forehead',
      },
    },
    {
      kind: 'prose',
      heading: 'Why Wrinkles Show Up (Even When You Feel Fine)',
      paragraphs: [
        'Every facial expression you make involves small muscle contractions. Over time, those repeated movements leave their mark — especially in high-stress areas like the forehead, between the brows, and around the eyes.',
        'Botox reduces excessive muscle activity in these areas, allowing the skin to smooth out without changing your natural expressions.',
        'No stiffness. No frozen look. Just less tension telling the wrong story.',
      ],
    },
    {
      kind: 'list',
      heading: 'What Botox Can Help With',
      intro: 'For men and women considering Botox, the goal isn’t perfection — it’s relief. Botox can help you:',
      items: [
        'Soften forehead lines that make you look stressed',
        'Relax frown lines (“11s”) that make you appear tense or upset',
        'Smooth crow’s feet without losing warmth in your smile',
        'Look less tired, even when life is busy',
        'See visible results within days',
        'Complete treatment in under 30 minutes',
      ],
      outro: 'What really matters is how you feel in the chair, and how you feel when you look in the mirror afterward.',
      image: {
        src: 'pages/botox/what-botox-can-help.jpg',
        alt: 'A provider’s hands rest on the forehead of a woman reclining with her eyes closed',
      },
    },
    {
      kind: 'review',
      quote:
        'Lucinda is just as incredible. Kind, thoughtful, and deeply generous, she has a rare gift for creating an atmosphere that feels safe, curious, and open. She doesn’t just treat the surface—she honors your full self.',
      name: 'Mandie R.',
    },
    {
      kind: 'list',
      source: 'cindy',
      heading: 'Botox & Dysport',
      intro: 'Concerns:',
      items: [
        'Forehead lines',
        'Frown lines',
        'Crow’s feet',
        'Dynamic facial wrinkles',
        'Preventative wrinkle treatment',
        'Facial aging concerns',
      ],
    },
    {
      kind: 'cards',
      heading: 'Botox Treatment Areas We Offer',
      cards: [
        { title: 'Forehead Lines', text: 'Horizontal lines caused by raised brows and repeated expressions.' },
        {
          title: 'Frown Lines (“11s”)',
          text: 'Vertical lines between the eyebrows that often create an angry or tired appearance.',
        },
        { title: 'Crow’s Feet', text: 'Fine lines at the corners of the eyes that deepen with smiling and squinting.' },
        {
          title: 'Other Areas',
          text: 'Botox can also gently lift brows, soften chin dimpling, and reduce “bunny lines” around the nose. Your provider will create a custom plan based on your facial movement and personal goals.',
        },
      ],
    },
    {
      kind: 'prose',
      heading: 'Botox vs Dysport vs Xeomin',
      paragraphs: [
        'Not all neuromodulators behave the same way. We offer Botox, Dysport, and Xeomin — all FDA-approved and clinically proven.',
      ],
    },
    {
      kind: 'list',
      heading: 'Botox',
      items: ['Onset: ~3–7 days', 'Spread: Moderate', 'Ideal for: Most wrinkle areas'],
    },
    {
      kind: 'list',
      heading: 'Dysport',
      items: ['Onset: ~2–4 days', 'Spread: Broader', 'Ideal for: Forehead lines'],
    },
    {
      kind: 'list',
      heading: 'Xeomin',
      items: ['Onset: ~3–7 days', 'Spread: Targeted', 'Ideal for: Sensitive skin clients'],
      outro: 'During your consultation, we’ll recommend the injectable that best fits your facial movement, timeline, and goals.',
    },
    {
      kind: 'review',
      quote:
        'Lucinda is the best. She listens to your concerns and questions. She is understanding and makes you feel at ease. I will be back and I am sending my friends her way!',
      name: 'Jennifer T.',
    },
    {
      kind: 'list',
      heading: 'How Much Does Botox Cost in Springfield, MO?',
      intro: 'Botox pricing depends on several factors, including:',
      items: ['The number of units needed', 'Areas being treated', 'Your facial anatomy and desired outcome'],
      outro:
        'Rather than one-size-fits-all pricing, we focus on personalized treatment plans. During your consultation, you’ll receive transparent recommendations and clear pricing — whether you’re new to Botox or maintaining results.',
      image: {
        src: 'pages/botox/consultation.jpg',
        alt: 'A provider in a white coat talks with a seated blonde woman at a desk with an anatomical model',
      },
    },
    {
      kind: 'steps',
      heading: 'What to Expect During Your Botox Appointment',
      intro: 'We believe sustainable results come from consistency and partnership — not one-off appointments.',
      steps: [
        { title: 'Consultation', text: 'We discuss your goals, concerns, and facial movement.' },
        { title: 'Facial Mapping', text: 'We identify precise injection points for balanced, natural results.' },
        { title: 'Treatment', text: 'Most Botox appointments take 10–20 minutes.' },
        { title: 'Aftercare', text: 'No downtime. Simple instructions are provided so you can return to your day.' },
      ],
    },
    {
      kind: 'review',
      quote:
        'From the moment you walk in Cindy makes you feel like a long time friend. She is a great listener, and wants to make you look and feel your best! I have enjoyed each of my treatments which were not only effective, but more than reasonably priced. I am definitely sharing her name with friends and family.',
      name: 'Stacey M.',
    },
    {
      kind: 'cards',
      heading: 'Botox Results Timeline',
      intro: 'With maintenance, results typically last 3-4 months. Many men and women return periodically for consistent, natural-looking Botox results.',
      cards: [
        { title: 'Days 1–3', text: 'Subtle softening begins.' },
        { title: 'Days 4–7', text: 'Wrinkles visibly relax.' },
        { title: 'Week 2', text: 'Full results appear.' },
      ],
    },
    {
      kind: 'list',
      heading: 'Considering Fillers or Skin Tightening Too?',
      intro:
        'Botox is excellent for treating dynamic wrinkles caused by muscle movement. But some concerns — like volume loss, sagging, or changes in skin firmness — need a different approach. That’s why we also offer:',
      items: [
        'Dermal fillers to restore lost volume and enhance facial contours',
        'Non-surgical skin tightening for deeper lift, firmness, and tone',
      ],
      outro:
        'Many patients choose to combine these treatments with Botox for a more comprehensive facial refresh. During your consultation, we’ll help you decide what makes sense for your goals — and what doesn’t.',
    },
    {
      kind: 'cards',
      cards: [{ title: 'Explore all aesthetic services', href: '/springfield/aesthetics/' }],
    },
    {
      kind: 'prose',
      heading: 'Botox for Men and Women',
      paragraphs: [
        'Botox is not just for women. Men increasingly choose Botox to reduce deep frown lines, soften forehead wrinkles, and look less worn down.',
        'Every treatment is customized to preserve natural facial character, never stiff, never overdone.',
      ],
    },
    {
      kind: 'review',
      quote: 'My friend and I both go to her for our beauty needs and Wellness needs. Cindy is a provider that I absolutely trust with no doubt in mind!',
      name: 'Qiying M.',
    },
    {
      kind: 'prose',
      heading: 'Why Choose A New You?',
      paragraphs: [
        'A New You Women’s Clinic is a locally owned, medically led practice serving men and women in the Springfield area.',
        'We prioritize safety, precision, and artistry in every Botox treatment. Your results are never rushed, overdone, or cookie-cutter.',
        'Our goal is simple: help you look refreshed, confident, and like yourself again.',
      ],
    },
    {
      kind: 'cta',
      heading: 'Book Your Botox Appointment',
      paragraphs: ['If you’re considering Botox in Springfield, MO, we’d love to help.'],
    },
  ],
  related: ['aesthetics', 'cryolipolysis', 'mens-health'],
  serviceArea: ['Springfield', 'Nixa', 'Ozark', 'Republic', 'Rogersville'],
  changes: [
    'Added Cindy\'s Botox & Dysport concerns word for word as a list section.',
    'Four testimonials ("Mandie Ross", "Jennifer Teague", "Stacey Miller", "Qiying Ma") became single review bands with names as first name + last initial. The live lead-in "Here’s what our patients say about their experience with our team:" is dropped.',
    'The live "Explore all aesthetic services" link is kept as a one-card link to /springfield/aesthetics/ (prose sections have no link field).',
    'The Botox / Dysport / Xeomin comparison is three small list sections with the live bullets; the results timeline and treatment areas are cards with live titles and text.',
    'The live closing "Call now to schedule" and "book online today" links are replaced by the standard call and Schedule an Appointment buttons in the final CTA.',
    'Title and description kept as live (already correct).',
    'Photos (hero and three body photos) come from the live media library files named for this page; the live page sets them as Elementor backgrounds, so they are not in the page HTML. The template icons (Group-1, consultation-icon, analysis-icon, botox-ixon, aftercare-icon) are left out.',
    'Kept live claims as written ("FDA-approved and clinically proven", "results typically last 3-4 months", "See visible results within days"). Flagged for Josh.',
  ],
};
