import type { PageCopy } from '../../types/page';

export const page: PageCopy = {
  slug: 'weight-loss',
  route: '/springfield/weight-loss/',
  template: 'service',
  publish: true,
  oldUrls: ['/weight-loss-in-springfield/'],
  seo: {
    title: "Weight Loss in Springfield, MO | A New You Women's Clinic",
    description:
      "Semaglutide, tirzepatide & weight loss peptides in Springfield, MO. Medical weight loss clinic — A New You Women's Clinic.",
  },
  hero: {
    h1: 'Weight Loss in Springfield, MO',
    subhead: 'Backed by Science, Led with Compassion',
    image: {
      src: 'pages/weight-loss/hero.jpg',
      alt: 'Six smiling women stand together outdoors under trees',
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
      heading: 'Why Your Body Isn’t Responding to Diets Anymore',
      paragraphs: [
        'You’ve done the diets. You’ve counted the points, carbs, steps. But despite your best efforts, the scale doesn’t budge—and your energy is stuck in the red.',
        'If you’re a woman over 35, it’s not your fault. Hormonal imbalance, not willpower, is often the real issue. At A New You Women’s Clinic, we specialize in helping women in midlife break through stubborn weight plateaus with evidence-based medical weight loss in Springfield, MO.',
      ],
    },
    {
      kind: 'prose',
      heading: 'Medical Weight Loss, Personalized for Women',
      paragraphs: [
        'Our weight loss clinic takes a whole-woman approach. We don’t throw you into a generic program or shame you into another restrictive meal plan. Instead, we create a tailored treatment strategy using semaglutide, tirzepatide, and other weight loss peptides, matched to your labs, body composition, hormone levels, and lifestyle — delivered through weight loss injections designed around you, not a one-size-fits-all plan',
      ],
      image: {
        src: 'pages/weight-loss/tailored-strategy.jpg',
        alt: 'A provider in a white coat talks with a woman beside shelves of products and a white body scanner column',
      },
    },
    {
      kind: 'list',
      intro: 'We address:',
      items: [
        'Perimenopausal weight gain',
        'Slow metabolism and fatigue',
        'Hormonal belly fat',
        'Weight connected to thyroid or cortisol levels',
      ],
      outro: 'And we do it all in a way that honors your story—not just your symptoms.',
    },
    {
      kind: 'cards',
      id: 'weight-services',
      heading: 'Medically Managed Weight Loss & Metabolic Health — Women & Men',
      cards: [
        { title: 'Medical Weight-Loss Evaluation' },
        { title: 'GLP-1 Medical Weight Management', href: '/springfield/semaglutide/' },
        { title: 'Oral Weight-Management Medications' },
        { title: 'Weight Loss Membership' },
        { title: 'Metabolic & Insulin-Resistance Evaluation' },
      ],
    },
    {
      kind: 'list',
      heading: 'Medical Weight-Loss Evaluation',
      intro: 'Concerns:',
      items: [
        'Difficulty losing weight',
        'Unexplained weight gain',
        'Weight-loss plateau',
        'Weight gain associated with hormonal changes',
        'Insulin resistance',
        'Metabolic-health concerns',
        'Previous weight-loss attempts that were unsuccessful',
        'Regaining weight after previous weight loss',
        'Changes in body composition',
      ],
    },
    {
      kind: 'list',
      heading: 'GLP-1 Medical Weight Management',
      intro: 'Current medication options include:',
      items: ['Semaglutide', 'Tirzepatide'],
    },
    {
      kind: 'list',
      intro: 'Concerns:',
      items: [
        'Obesity or excess weight',
        'Difficulty controlling appetite',
        'Difficulty losing weight despite lifestyle changes',
        'Insulin resistance/metabolic dysfunction',
        'Weight-loss plateau',
        'Long-term weight management',
      ],
    },
    {
      kind: 'list',
      heading: 'Oral Weight-Management Medications',
      intro: 'Used when medically appropriate based on the individual patient. Concerns:',
      items: [
        'Difficulty losing weight',
        'Appetite management',
        'Weight-loss plateau',
        'Need for an alternative or adjunct to injectable therapy',
      ],
    },
    {
      kind: 'list',
      heading: 'Weight Loss Membership',
      intro: 'Includes:',
      items: [
        'Provider oversight',
        'Regular check-ins',
        'Body-composition and weight monitoring',
        'Annual laboratory testing',
        'Lipotropic injections',
        'Education and support',
        'Ongoing medical management',
      ],
    },
    {
      kind: 'list',
      intro: 'Concerns/goals:',
      items: [
        'Accountability and ongoing medical support',
        'Long-term weight management',
        'Maintaining weight after weight loss',
        'Adjusting treatment as the body and metabolism change',
      ],
    },
    {
      kind: 'list',
      heading: 'Metabolic & Insulin-Resistance Evaluation',
      intro: 'Concerns:',
      items: [
        'Insulin resistance',
        'Difficulty losing weight',
        'Abdominal weight gain',
        'Weight regain',
        'Metabolic dysfunction',
        'Weight and body-composition changes',
      ],
    },
    {
      kind: 'pricing',
      heading: 'Our Medical Memberships',
      intro: 'We believe sustainable results come from consistency and partnership — not one-off appointments.',
      plans: [
        {
          name: 'Weight Loss Membership – $99/month',
          lines: [
            'Includes labs, provider oversight, weekly visits, and body composition tracking.',
            'Medications such as Semaglutide or Tirzepatide are billed separately based on dose.',
          ],
        },
        {
          name: 'Total Wellness Membership – $149/month',
          lines: [
            'Combines both Weight Loss and Hormone Optimization for complete metabolic balance and vitality.',
            'All medical memberships include your lab work and ongoing provider support — you simply pay separately for medications.',
          ],
        },
      ],
    },
    {
      kind: 'review',
      quote:
        'I am so happy with the results I’m getting with Cindy at A New You Women’s Clinic. I wanted to drop some weight and start working on a new me. I have realized she is changing my life. I feel better than I have in a long time. Losing some weight and burning that nasty fat.',
      name: 'Theresa',
    },
    {
      kind: 'list',
      heading: 'Real Women. Real Results.',
      intro: 'We’ve helped hundreds of women feel like themselves again. Many report:',
      items: [
        'Losing 10–20 lbs in the first 6–8 weeks',
        'Increased energy and mood',
        'Better sleep and digestion',
        'Confidence in their clothes again',
      ],
      outro: 'Want to see what’s possible for you? It starts with one call.',
    },
    {
      kind: 'prose',
      heading: 'Is Semaglutide Right for You?',
      paragraphs: [
        'You’ve probably heard of Semaglutide (the active ingredient in Wegovy® and Ozempic®)—but did you know it works differently in women over 40?',
        'At A New You, Semaglutide is offered exclusively through our Weight Loss Membership, promising your dosing and progress are medically supervised each week. Our dosing is adjusted based on:',
      ],
    },
    {
      kind: 'list',
      items: ['Your hormone profile', 'Your metabolic markers', 'Your progress over time'],
      outro:
        'Semaglutide has been shown to help patients lose up to 15% of body weight—but only when it’s part of a holistic care plan. We also tailor your weight loss injections — including semaglutide, tirzepatide, and other GLP-1 and peptide-based options — to your body, adjusting dosage, pacing, and support based on how you respond, not a fixed protocol everyone follows the same way.',
    },
    {
      kind: 'review',
      quote:
        'Cindy has been very compassionate and professional in working to determine the best course of action for what my body needs to be at it\'s best. She listens and asks questions to that end. Very comfortable discussing things with her. A truly caring and loving person. Definitely recommend.',
      name: 'Diana',
    },
    {
      kind: 'list',
      heading: 'What to Expect at Our Springfield Weight Loss Clinic',
      intro: 'From the moment you walk in, you’re treated like more than a number on a scale. Your first visit includes:',
      items: [
        'A full-body 3D Styku scan',
        'Lab work to identify hidden blockers',
        'A personal consultation with Lucinda Sparks, APRN',
      ],
    },
    {
      kind: 'list',
      intro: 'You’ll leave with a step-by-step plan that could include:',
      items: [
        'Semaglutide, tirzepatide, or other weight loss peptides',
        'Hormone support if needed',
        'Nutritional guidance',
        'Ongoing accountability and encouragement',
      ],
      outro: 'Membership ensures you receive ongoing lab work, personalized dosing, and continuous support — not just a prescription.',
    },
    {
      kind: 'list',
      heading: 'Our Technology: 3D Body Scanning & Data-Driven Plans',
      intro: 'We don’t guess—we measure what matters. Using the Styku 3D Body Scanner, we analyze:',
      items: ['Your exact body fat percentage', 'Where fat is stored (and where it’s leaving!)', 'Posture, waist-hip ratio, and more'],
      outro: 'This means you see progress beyond the scale, and we adjust your plan with precision.',
      image: {
        src: 'pages/weight-loss/body-scan.jpg',
        alt: 'A woman in a black tank top stands on a 3D body scanner platform',
      },
    },
    {
      kind: 'list',
      heading: 'How We Support You Beyond the Scale',
      intro: 'Weight loss isn’t just physical. It’s emotional. It’s relational. That’s why we offer:',
      items: [
        'Monthly community seminars',
        'Mindset coaching & education',
        'Ongoing access to our team for questions and check-ins',
      ],
      outro: 'This isn’t a quick fix. It’s a sustainable transformation—supported by a care team that sees the whole you.',
    },
    {
      kind: 'faq',
      heading: 'FAQs',
      items: [
        {
          q: 'What is the most successful weight loss treatment?',
          a: ['Success varies per person, but for many women in Springfield, a combination of semaglutide or tirzepatide, hormone balancing, and lifestyle support provides the most sustainable results.'],
        },
        {
          q: 'What is the 3-3-3 rule for weight loss?',
          a: ['The 3-3-3 rule suggests 3 days of strength, 3 days of cardio, and 3 servings of vegetables daily—but we customize every program based on YOUR labs and goals.'],
        },
        {
          q: 'What is the most effective weight loss prescription drug?',
          a: ['Semaglutide is one of the most effective, FDA-approved weight loss medications. It’s especially effective when combined with personalized medical supervision and support.'],
        },
        {
          q: 'What is the weight loss drug that costs $1000 a month?',
          a: ['Semaglutide (e.g., Wegovy®) can be expensive without coverage. At A New You, we explore affordable options and help you access financing or alternatives when needed.'],
        },
      ],
    },
    {
      kind: 'cta',
      heading: 'Start Your Journey: Free Weight Loss Consultation',
      paragraphs: [
        'We get it—trusting another program can feel like a leap. So let’s start with a conversation.',
        'Schedule your free weight loss consultation in Springfield, MO and see if our approach is right for you.',
        'You’re not broken. You’re not lazy. You’re not alone.',
        'You’re a woman in transition—and we’re here to help you feel like you again.',
      ],
    },
  ],
  related: ['semaglutide', 'menopause', 'mens-health'],
  serviceArea: ['Springfield', 'Nixa', 'Ozark', 'Republic', 'Rogersville'],
  changes: [
    'Added Cindy\'s Medically Managed Weight Loss & Metabolic Health section word for word: category heading as a cards overview, then Medical Weight-Loss Evaluation, GLP-1 Medical Weight Management (medication options and concerns), Oral Weight-Management Medications, Weight Loss Membership (Includes and Concerns/goals) and Metabolic & Insulin-Resistance Evaluation. Her all-caps heading is set in title case. Her "Women & Men" wording is kept in the heading.',
    'Cindy\'s Weight Loss Membership list ("Regular check-ins", "Annual laboratory testing") differs from the live $99 membership text ("weekly visits", "labs"). Both are kept as supplied; Josh/Cindy to reconcile.',
    'Memberships kept exactly as live: Weight Loss Membership $99/month and Total Wellness Membership $149/month. /subscription-plans/ lists Total Wellness with no price, so no price mismatch is logged here beyond that.',
    'Two testimonials (Theresa, Diana) are now single review bands. Live showed first names only; no last initials were invented.',
    'The "Real Women. Real Results." list keeps the live line "Losing 10–20 lbs in the first 6–8 weeks" and the "up to 15% of body weight" claim as live copy; both are outcome claims, flagged for Josh.',
    'Live FAQ questions were accordion titles; they are now FAQ items with the same words.',
    'The live closing section "Start Your Journey: Free Weight Loss Consultation" is the final CTA band; its four lines are kept as its paragraphs.',
    'Left out the Group-1.png, weight-loss.png and wellness.png template icons (tiny placeholder icons).',
    'Photos come from the live media library (the live page sets them as Elementor backgrounds, so they are not in the page HTML). The live OG image shows a body-contouring handpiece, so it is not used; the hero is the six-women group photo named for medical weight loss. Josh to confirm the choice.',
    'Title and description kept as live (already correct).',
    'Mentions of the Styku 3D scanner are kept as plain live text; no link to the held /styku/ page.',
  ],
};
