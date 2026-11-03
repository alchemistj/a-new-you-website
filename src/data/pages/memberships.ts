import type { PageCopy } from '../../types/page';

export const page: PageCopy = {
  slug: 'memberships',
  route: '/subscription-plans/',
  template: 'company',
  publish: true,
  oldUrls: [],
  seo: {
    title: 'Subscription Plans for Ozempic & Medspa in Springfield MO',
    description:
      'Discover our exclusive subscription plans featuring semaglutide, medspa, and ozempic treatments in Springfield, MO, which help to elevate your wellness journey.',
  },
  hero: {
    h1: 'Memberships',
    subhead: 'Medically Guided Care for Long-Term Health, Vitality, and Results',
    image: {
      src: 'pages/memberships/hero.jpg',
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
      paragraphs: [
        'At A New You Women’s Clinic, our memberships are designed to provide structured, consistent care rather than one-time visits. Whether focused on metabolic health, hormone balance, skin quality, or preventative aging, each membership provides ongoing provider access and clinical oversight tailored to the individual.',
        'Memberships include medical management and structured access. Treatments, medications, and services are individualized and billed separately unless explicitly stated.',
      ],
    },
    {
      kind: 'prose',
      heading: 'How Membership Works',
      paragraphs: [
        'Our medical memberships include a primary baseline laboratory panel along with routine monitoring appropriate to the care being provided. These labs establish safety, guide treatment decisions, and allow for adjustments over time.',
        'If additional or expanded testing is clinically indicated based on symptoms or response to treatment, those labs may be recommended and are billed separately.',
        'All treatment plans are individualized. No two patients follow the same protocol.',
      ],
    },
    {
      kind: 'cards',
      heading: 'Medical Memberships',
      cards: [
        {
          title: 'Weight Loss Membership',
          text: '$99/month. Medically supervised weight management, follow-up, education, and progress monitoring. $75 setup fee and a three-month minimum commitment.',
        },
        {
          title: 'Hormone Optimization Membership',
          text: '$99/month. Ongoing hormone management, treatment monitoring, and provider follow-up.',
        },
        {
          title: 'Total Wellness Membership',
          text: '$149/month. Combined weight-management, hormone-optimization, and broader wellness oversight.',
        },
      ],
    },
    {
      kind: 'prose',
      paragraphs: [
        'Membership fees cover the medical management and benefits specified in the selected plan. Medications, hormone pellets, supplements, and separately priced procedures are additional unless expressly included.',
      ],
    },
    {
      kind: 'list',
      heading: 'Weight Loss Membership',
      intro:
        '$75 setup fee and a three-month minimum commitment. Our Weight Loss Membership provides medically supervised weight management focused on metabolic drivers, insulin resistance, inflammation, and hormonal influence. This program is structured for accountability, safety, and sustainable progress. Includes:',
      items: [
        'Initial medical evaluation',
        'Ongoing provider oversight and follow-up visits',
        'Weight and body composition monitoring',
        'Primary labs and routine monitoring',
        'Clinical decision-making and adjustments',
      ],
      outro:
        'Medications such as GLP-1 therapies, oral options, or supportive injections may be prescribed when appropriate and are billed separately. Member Benefit: 10% off products',
    },
    {
      kind: 'list',
      heading: 'Hormone Optimization Membership',
      intro:
        'The Hormone Optimization Membership supports provider-guided therapy for both women and men experiencing symptoms related to hormonal imbalance. Care is guided by laboratory analysis, symptom tracking, and clinical response. Includes:',
      items: [
        'Primary hormone laboratory testing and routine monitoring',
        'Ongoing hormone level tracking when on therapy',
        'Provider interpretation and dosing adjustments',
        'Follow-up visits and structured medical management',
        'Support for pellet therapy, topical hormone therapy, or oral hormone therapy (medical oversight only)',
      ],
      outro: 'Hormone medications and compounded therapies are billed separately.',
    },
    {
      kind: 'list',
      heading: 'Total Wellness Membership',
      intro:
        'The Total Wellness Membership is our most comprehensive medical plan. It is designed for individuals seeking a long-term medical partner focused on prevention, vitality, and whole-body optimization. This membership supports coordination across weight management, hormone optimization, anti-aging strategies, and overall metabolic health. Includes:',
      items: [
        'Ongoing provider access with scheduled and as-needed visits',
        'Personalized medical treatment planning',
        'Primary laboratory panel and routine monitoring',
        'Laboratory interpretation and medical decision-making',
        'Clinical oversight and adjustments over time',
      ],
      outro:
        'Does not include: Medications, supplements, in-office procedures, or expanded laboratory testing beyond the included monitoring panel. Member Benefit: 15% off products',
    },
    {
      kind: 'list',
      intro: 'Member Benefits:',
      items: ['10% off services', '10% off products', 'Option to upgrade to the Total Wellness Membership'],
    },
    { kind: 'cta', heading: 'Schedule an Appointment' },
  ],
  related: ['weight-loss', 'menopause', 'aesthetics'],
  serviceArea: ['Springfield', 'Nixa', 'Ozark', 'Republic', 'Rogersville'],
  changes: [
    '3 Nov 2026, Cindy: removed the legacy subscription offers and their annual and non-member comparisons. Hormone Replacement Therapy Subscription Plan ($200/month) including the "Medication" line and its pricing. Weight Loss Subscription Plans: Semaglutide $333, Bella Plus $309.75, Olympia $337.75, including "includes medication" lines. Aesthetic Services Subscription Plan ($150/month: quarterly Botox, monthly Hydrafacial, annual filler) and its pricing. The earlier note that those prices were kept despite bad math is superseded; the offers are gone, not corrected.',
    '3 Nov 2026: the three core memberships are Weight Loss Membership $99/month, Hormone Optimization Membership $99/month, and Total Wellness Membership $149/month, with Cindy\'s focus sentences on the cards. "$75 setup fee and a three-month minimum commitment" is on the Weight Loss Membership only.',
    'Added Cindy\'s dues sentence word for word immediately after the membership cards: "Membership fees cover the medical management and benefits specified in the selected plan. Medications, hormone pellets, supplements, and separately priced procedures are additional unless expressly included."',
    'Held, not published, pending approved prices and terms: Vaginal Wellness Membership, Peptide Optimization (Add-On), Skin Health Maintenance Membership, and Advanced Skin Health Membership. No prices invented. Removed the "Aesthetic Memberships" cards heading with them. Also removed the member-benefits bullet "Option to add Peptide Optimization" because that add-on is held. The $7 per unit Botox rate left with the Advanced Skin Health Membership.',
    'Kept live benefit bullets that do not promise unlimited labs or included medication. Lab bullets still say "Primary labs and routine monitoring", "Primary laboratory panel and routine monitoring", and "Primary hormone laboratory testing and routine monitoring". The "How Membership Works" section still says expanded testing is billed separately, so these do not read as every panel. Outros that say medications are billed separately or not included were kept.',
    'The weight-loss page lists a $99/month Weight Loss Membership and a $149/month Total Wellness Membership; this page now shows the same prices.',
    'Removed placeholder content: the four logoipsum logos, the four Lorem ipsum blocks, the Group-1 template images, and the second H1 "Hormone Replacement Therapy Subscription Plan" (it became a section heading, then the whole offer was removed on 3 Nov 2026).',
    'Live H1 "MEMBERSHIPS" set in title case; all-caps H3 "TOTAL WELLNESS MEMBERSHIP" set in title case.',
    'The three repeated live H2s "Learn More About Our Plans" are dropped (they only introduced the plan blocks).',
    'The broken bullet pair "Option to add Peptide" / "Optimization" was joined as "Option to add Peptide Optimization" (the live page split one bullet across two list items). That bullet was removed on 3 Nov 2026 because the add-on is held.',
    'Description lines such as "Does not include", "Member Benefit" and "Medications such as..." were separate paragraphs; they are the closing text of each kept list section with the same words. The legacy "Subscription cost annual" and "Non-subscription" price lines were removed on 3 Nov 2026 with those offers.',
    'Title and description kept as live (they mention Ozempic, which the live page used); Josh may want to review.',
    'Live wording errors in the removed subscription blocks ("well being .", "schedule your initial consultation today.", "a exclusive blend", "Lipo- trim", "body‘s") left with those offers on 3 Nov 2026.',
    'The Weight Loss Membership list here differs from the $99 membership description on the weight-loss page and from Cindy\'s Weight Loss Membership list; all three kept as supplied.',
    'Cindy\'s "Hormone Optimization / Total Wellness Memberships" blurb was not added (not in the mapping; the live memberships already cover it).',
    'Hero photo added: the live page banner is the same group photo used on weight-loss (medical-weight-loss-in-Springfield-MO).',
  ],
};
