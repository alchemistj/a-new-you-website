import type { PageCopy } from '../../types/page';

export const page: PageCopy = {
  slug: 'memberships',
  route: '/memberships/',
  template: 'company',
  publish: true,
  oldUrls: ['/subscription-plans/'],
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
        { title: 'Total Wellness Membership' },
        { title: 'Weight Loss Membership' },
        { title: 'Hormone Optimization Membership' },
        { title: 'Vaginal Wellness Membership' },
        { title: 'Peptide Optimization (Add-On)' },
      ],
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
      heading: 'Weight Loss Membership',
      intro:
        'Our Weight Loss Membership provides medically supervised weight management focused on metabolic drivers, insulin resistance, inflammation, and hormonal influence. This program is structured for accountability, safety, and sustainable progress. Includes:',
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
      intro: 'Member Benefits:',
      items: [
        '10% off services',
        '10% off products',
        'Option to add Peptide Optimization',
        'Option to upgrade to the Total Wellness Membership',
      ],
    },
    {
      kind: 'list',
      heading: 'Vaginal Wellness Membership',
      intro:
        '(Available exclusively to Total Wellness members) This membership supports vaginal tissue health, tone, and functional wellness through medically guided treatment. Includes:',
      items: [
        'Quarterly FormaV or VTone sessions',
        'Access to Morpheus8V at member pricing',
        'Provider oversight and progress monitoring',
      ],
    },
    {
      kind: 'prose',
      heading: 'Peptide Optimization (Add-On)',
      paragraphs: [
        'Peptide Optimization is available as an add-on to any medical membership following clinical evaluation. Protocols are individualized, and peptide therapies are billed separately.',
      ],
    },
    {
      kind: 'cards',
      heading: 'Aesthetic Memberships',
      cards: [{ title: 'Skin Health Maintenance Membership' }, { title: 'Advanced Skin Health Membership' }],
    },
    {
      kind: 'list',
      heading: 'Skin Health Maintenance Membership',
      intro:
        'The Skin Health Maintenance Membership is designed for patients focused on prevention, barrier support, and consistent skin care. Includes:',
      items: [
        'One Clinical Skin Renewal Facial per month',
        'Member-only pricing on additional aesthetic services',
        'Priority scheduling',
      ],
      outro:
        'The Clinical Skin Renewal Facial is included as part of the membership and is not optional. Injectables, advanced devices, and treatment upgrades are billed separately.',
    },
    {
      kind: 'list',
      heading: 'Advanced Skin Health Membership',
      intro:
        'The Advanced Skin Health Membership is structured for patients committed to collagen support, preventative aging, and consistent professional aesthetic care. Includes:',
      items: [
        'One Hydrafacial per month',
        'Botox at a preferred rate of $7 per unit',
        '10% off aesthetic services',
        '10% off skincare products',
        'Priority booking',
      ],
      outro:
        'Botox units, dermal fillers, Morpheus8, RF treatments, body contouring, and Hydrafacial upgrades are not included. Membership discounts do not stack with promotional pricing.',
    },
    {
      kind: 'list',
      heading: 'Hormone Replacement Therapy Subscription Plan',
      intro:
        'Here at a New You Women’s Clinic, we want to help you feel and look your best at ANY AGE without breaking the bank. Therefore, we have teamed up with multiple compounding pharmacies to provide you with the latest in hormone replacement treatments. We have tried and true protocols designed to help you achieve your optimal well being . Each plan is tailored to your specific needs. schedule your initial consultation today. Included in your subscription plan:',
      items: ['Routine lab work', 'Medication', 'Initial evaluation and all follow up appointments'],
    },
    {
      kind: 'pricing',
      plans: [
        { name: 'Subscription cost annual', lines: ['$2,100 /$200 per month'] },
        { name: 'Non-subscription cost annually', lines: ['$5,025 /$419 per month'] },
      ],
    },
    {
      kind: 'pricing',
      heading: 'Weight Loss Subscription Plans',
      intro:
        'Here at a New You Women’s Clinic, we want to help you lose weight without breaking the bank. Therefore, we have teamed up with multiple compounding pharmacies to provide you with the latest in weight loss therapy. We have tried and true protocols designed to help you achieve your optimal weight. Each plan is tailored to your specific needs. schedule your initial consultation today.',
      plans: [
        {
          name: 'Semaglutide',
          lines: [
            'Semaglutide is a medication that belongs to a class of drugs known as GLP-1 receptor agonists. It is used to treat type 2 diabetes by regulating blood sugar levels. Semaglutide is also FDA-approved for weight loss.',
            'Monthly Subscription fee includes medication, labs and office visits',
            '$3,996 yearly / $333.00 per month',
            'Non-subscription',
            '$20,700 yearly / $1,725 per month',
          ],
        },
        {
          name: 'Bella Plus',
          lines: [
            'Bella plus is a unique compounded medication designed to control cravings, decrease appetite and increase energy. With a exclusive blend of bupropion / phentermine / topiramate / naltrexone / methylcobalamin',
            'Monthly Subscription',
            '$3,345.50 yearly / $309.75 per month',
            'Non-subscription',
            '$7,551 yearly / $629.25 per month',
          ],
        },
        {
          name: 'Olympia weight management therapy program',
          lines: [
            'The weight management therapy protocol from Olympia compounding pharmacy provides enhanced fat burning, weight loss, mental clarity, reduced feelings of hunger, decreased appetite, faster recovery from working out, restoration of the body‘s natural sleep cycle, stimulation of the body’s own growth hormone levels, reduction in food cravings, increase metabolism, improved energy levels, and aids in immune support. By utilizing naltrexone, sermorelin, and an exclusive Lipo- trim sublingual spray the weight management therapy protocol helps boost your metabolism and lose large amounts of fat all without feeling hungry.',
            'Monthly Subscription fee includes medication, labs and office visits',
            '$4,079 yearly / $337.75 per month',
            'Non-subscription',
            '$7,107 yearly / $592.25 per month',
          ],
        },
      ],
    },
    {
      kind: 'list',
      heading: 'Aesthetic Services Subscription Plan',
      intro:
        'Here at a New You Women’s Clinic, we want to help you feel and look your best at ANY AGE without breaking the bank. Therefore, We have developed tried and true protocols designed to help you achieve your optimal well being . Each plan is tailored to your specific needs. schedule your initial consultation today. Included in your subscription plan:',
      items: [
        'Initial evaluation and all follow up appointments',
        'Botox 40 units every three months',
        'Hydra facial once monthly',
        'Hyaluronic acid dermal filler, one syringe annually',
      ],
    },
    {
      kind: 'pricing',
      plans: [
        { name: 'Subscription cost annual', lines: ['$1,795 /$150 per month'] },
        { name: 'Non-subscription cost annually', lines: ['$4,375 /$365 per month'] },
      ],
    },
    { kind: 'cta', heading: 'Schedule an Appointment' },
  ],
  related: ['weight-loss', 'menopause', 'aesthetics'],
  serviceArea: ['Springfield', 'Nixa', 'Ozark', 'Republic', 'Rogersville'],
  changes: [
    'PRICES KEPT EXACTLY AS LIVE even where the math is off. Mismatches (monthly x 12 vs stated annual): HRT subscription $200 x 12 = $2,400 but annual shows $2,100; HRT non-subscription $419 x 12 = $5,028 but annual shows $5,025; Bella Plus subscription $309.75 x 12 = $3,717 but annual shows $3,345.50; Olympia subscription $337.75 x 12 = $4,053 but annual shows $4,079; Aesthetic subscription $150 x 12 = $1,800 but annual shows $1,795; Aesthetic non-subscription $365 x 12 = $4,380 but annual shows $4,375. Semaglutide ($3,996 / $333.00; $20,700 / $1,725), Bella Plus non-subscription ($7,551 / $629.25) and Olympia non-subscription ($7,107 / $592.25) reconcile. Not fixed; Josh to confirm with Cindy.',
    'The weight-loss page lists a $99/month Weight Loss Membership and a $149/month Total Wellness Membership; this page lists those memberships with no price. Both are kept as live. The $7 per unit Botox rate on the Advanced Skin Health Membership is also as live.',
    'Removed placeholder content: the four logoipsum logos, the four Lorem ipsum blocks, the Group-1 template images, and the second H1 "Hormone Replacement Therapy Subscription Plan" (now a section heading, since a page has one H1).',
    'Live H1 "MEMBERSHIPS" set in title case; all-caps H3 "TOTAL WELLNESS MEMBERSHIP" set in title case.',
    'The three repeated live H2s "Learn More About Our Plans" are dropped (they only introduced the plan blocks).',
    'The broken bullet pair "Option to add Peptide" / "Optimization" is joined as "Option to add Peptide Optimization" (the live page split one bullet across two list items).',
    'Description lines such as "Does not include", "Member Benefit" and "Medications such as..." were separate paragraphs; they are the closing text of each list section with the same words. Price lines are kept as live lines under each plan name, including the live labels "Subscription cost annual" and "Non-subscription".',
    'Title and description kept as live (they mention Ozempic, which the live page used); Josh may want to review.',
    'Kept live wording and errors exactly ("well being .", "schedule your initial consultation today.", "a exclusive blend", "Lipo- trim", "body‘s").',
    'The Weight Loss Membership list here differs from the $99 membership description on the weight-loss page and from Cindy\'s Weight Loss Membership list; all three kept as supplied.',
    'Cindy\'s "Hormone Optimization / Total Wellness Memberships" blurb was not added (not in the mapping; the live memberships already cover it).',
    'Hero photo added: the live page banner is the same group photo used on weight-loss (medical-weight-loss-in-Springfield-MO).',
  ],
};
