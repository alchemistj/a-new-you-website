import type { PageCopy } from '../../types/page';

const booking = {
  label: 'Schedule an Appointment',
  href: 'https://anewyouwomensclinic.myaestheticrecord.com/online-booking',
};

const checked =
  'Checked for heavy metals, microbiological contaminants, allergens, residual solvents, potency, purity, and identity.';

export const page: PageCopy = {
  slug: 'nutrametrix',
  route: '/nutrametrix/',
  template: 'company',
  publish: true,
  oldUrls: [],
  seo: {
    title: "nutraMetrix - A New You Women's Clinic",
    description:
      "A New You Women's Clinic proudly provides high-quality products from nutraMetrix to help support your healthy lifestyle.",
  },
  hero: {
    h1: 'Proudly Offering nutraMetrix® Products',
    subhead: 'High-quality products to help support your healthy lifestyle.',
    image: {
      src: 'pages/nutrametrix/hero.jpg',
      alt: 'A provider in a white coat holds a bottle of Ultimate Aloe while talking with a patient; NutriClean and Isotonix boxes sit on the desk',
    },
    imagePosition: '18% 40%',
    primaryCta: booking,
  },
  sections: [
    {
      kind: 'prose',
      heading: 'nutraMetrix®',
      paragraphs: [
        'nutraMetrix® provides products that help promote optimal wellness for your healthy lifestyle. We’ve chosen to offer nutraMetrix® products to our clients for their clean ingredients and commitment to a high standard of quality control. You’ll see a difference when adding nutraMetrix® products to your health regime.',
        'Supplements are individually selected products, with product availability and recommendations handled through the clinic. They are not automatically included in membership dues.',
        '[Order Now](http://www.nutrametrix.com/ANEWYOUWOMENSCLINIC)',
      ],
    },
    {
      kind: 'prose',
      heading: 'nutraMetrix® Ultimate Aloe™️',
      paragraphs: [
        'Support healthy digestion and nutrient absorption with Ultimate Aloe™️. Ultimate Aloe™️ is formulated from juice and pulp directly from the aloe leaf. (One of the only products of its kind certified by the [International Aloe Science Council](https://www.iasc.org/).)',
      ],
      image: {
        src: 'pages/nutrametrix/ultimate-aloe.jpg',
        alt: 'Three bottles of Ultimate Aloe dietary supplement: aloe, cranberry, and strawberry',
      },
    },
    {
      kind: 'list',
      heading: 'Why choose Ultimate Aloe™️:',
      items: [
        'Healthy digestive tract',
        'Strong immune system',
        'Better digestion and nutrient absorption',
        'Promotes normal healing',
        'Promotes digestive comfort',
      ],
      outro: `Gluten-free, non-GMO, and vegetarian. ${checked} [Order Ultimate Aloe Now](https://www.nutrametrix.com/product/nutrametrix-ultimate-aloe/?id=1329810&idType=product)`,
    },
    {
      kind: 'prose',
      heading: 'nutraMetrix® Isotonix™️ Digestive Enzymes with Probiotics',
      paragraphs: [
        'nutraMetrix® Isotonix® Digestive Enzymes with Probiotics is designed to help your body digest and take in all the essential nutrients you need from the foods you eat. Our poor eating habits (and aging!) help contribute to a less-than-ideal digestive process. Your body has to work harder to absorb those nutrients to keep you healthy and functioning. Isotonix® Digestive Enzymes with Probiotics provide your body with enzymes and good bacteria to promote nutrient absorption.',
      ],
      image: {
        src: 'pages/nutrametrix/isotonix-digestive-enzymes.jpg',
        alt: 'An Isotonix digestive enzymes with probiotics box beside a single packet',
      },
    },
    {
      kind: 'list',
      heading: 'Why choose Isotonix® Digestive Enzymes with Probiotics:',
      items: [
        'Helps maintain healthy cholesterol levels',
        'May help ease occasional stomach upset',
        'Promotes digestion and nutrient absorption',
        'Supports a healthy digestive tract',
        'Supports healthy immune functions',
        'Supports healthy skin',
      ],
      outro: `Gluten-free, non-GMO, and vegan. ${checked} [Order Isotonix Digestive Enzymes with Probiotics Now](https://www.nutrametrix.com/product/nutrametrix-isotonix-digestive-enzymes-with-probiotics/?id=1329811&idType=product)`,
    },
    {
      kind: 'video',
      provider: 'youtube',
      videoId: 'dCEupHp_YZA',
      title: 'nutraMetrix® Isotonix® Digestive Enzymes with Probiotics',
    },
    {
      kind: 'prose',
      heading: 'nutraMetrix® NutriClean® 7-Day Cleansing System with Stevia',
      paragraphs: [
        'Detoxify, cleanse, and purify your digestive tract and liver with the NutriClean 7-Day Cleansing System with Stevia. Using select nutrients and botanicals, this 7-day system will mildly purge your body of potential and accumulated toxins. This innovative, 3-step process will cleanse your digestive system in just one week. Support your colon health by using this powerhouse of herbs, fibers, and extracts twice a year.',
      ],
      image: {
        src: 'pages/nutrametrix/nutriclean-7-day.jpg',
        alt: 'A NutriClean fiber powder tub, product box, and blister packs of capsules',
      },
    },
    {
      kind: 'list',
      heading: 'This system includes 3 components:',
      items: [
        'HepatoCleanse capsules cleanse the liver.',
        'Release tablets cleanse the gastrointestinal tract and enhance peristalsis.',
        'Fiber powder provides much-needed fiber and beneficial bacteria to the colon.',
      ],
    },
    {
      kind: 'list',
      heading: 'Why choose NutriClean® 7-Day Cleansing System with Stevia:',
      items: [
        'Helps maintain digestive health',
        'Helps cleanse the colon',
        'Promotes healthy growth of beneficial bacteria in the colon',
        'Promotes normal, healthy bowel movements',
        'Promotes liver health',
      ],
      outro: `Gluten-free. ${checked} [Order NutriClean 7-Day Cleansing System with Stevia Now](https://www.nutrametrix.com/product/nutrametrix-nutriclean-7-day-cleansing-system-with-stevia/?id=5415961&idType=product)`,
    },
    {
      kind: 'video',
      provider: 'youtube',
      videoId: 'cxPv5KrA8po',
      title: 'nutraMetrix® NutriClean® 7-Day Cleansing System with Stevia',
    },
    {
      kind: 'prose',
      heading: 'nutraMetrix® Tower+™️ Pure Whey Protein Isolate + Creatine',
      paragraphs: [
        'Increase your daily protein intake with Tower+ Whey Protein supplement. This gluten-free protein powder provides 30g of pure whey protein isolate. The higher concentration of protein helps you maximize your protein intake without unnecessary calories or additives. Whey protein isolate is cleaner than other forms of whey protein and is more digestible and absorbable by the body and muscles.',
      ],
      image: {
        src: 'pages/nutrametrix/tower-whey.jpg',
        alt: 'A black pouch of Tower+ pure whey protein isolate and creatine, French vanilla',
      },
    },
    {
      kind: 'list',
      heading: 'Why choose Tower+ Pure Whey Protein Isolate + Creatine:',
      items: [
        'Aids in maintaining lean muscle mass',
        'Assists in reducing exercise-induced muscle fatigue',
        'May support muscle recovery',
        'Supports overall sports performance',
        'Supports insulin sensitivity',
        'Facilitates optimal protein digestion',
        'Quick source of energy',
        'May aid in meeting your daily protein requirements',
      ],
      outro: `Gluten-free and vegetarian. ${checked} [Order Tower+ Pure Whey Protein Isolate + Creatine Now](https://www.nutrametrix.com/product/nutrametrix-tower--pure-whey-protein-isolate---creatine/?id=5822613&idType=product)`,
    },
    {
      kind: 'video',
      provider: 'youtube',
      videoId: 'uYDR5nG9quY',
      title: 'nutraMetrix® Tower+™️ Pure Whey Protein Isolate + Creatine',
    },
  ],
  related: ['weight-loss', 'memberships'],
  serviceArea: ['Springfield', 'Nixa', 'Ozark', 'Republic', 'Rogersville'],
  changes: [
    'H1 kept: "Proudly Offering nutraMetrix® Products". Subhead kept from the live line under it.',
    'Title kept as "nutraMetrix - A New You Women\'s Clinic". Live description said "A New You Woman Clinic" and was 179 characters with the order sentence. Description is the first sentence only, with the clinic name corrected. "Order conveniently online or during your next appointment." is not on the page body; the live "Order Now" link is.',
    'Added Cindy’s framing in her words: "Supplements are individually selected products, with product availability and recommendations handled through the clinic. They are not automatically included in membership dues." The card’s shorter line "Supplements are not included in membership dues." was not used; her sentence keeps "automatically".',
    'Kept the live nutraMetrix® introduction, including "You’ll see a difference when adding nutraMetrix® products to your health regime." Flagged for Josh.',
    'The four product entries stay, with their live bullets, the "checked for…" line, and the nutrametrix.com order links. "Order Now" still goes to http://www.nutrametrix.com/ANEWYOUWOMENSCLINIC. The International Aloe Science Council link stays.',
    'Each product’s description sits with its photo. "Why choose…" and "This system includes 3 components:" are the list headings, with the live bullets under them. The component bullets keep their periods.',
    'YouTube embeds that still resolve are video sections, titled with the product heading already on the page (the facade shows the title). Ultimate Aloe’s video (youtu.be/tH-KyEto1HQ) returns 404 and is left off. The Tower+ YouTube title’s extra line "Fuels lean muscle mass, strength & recovery" is not used.',
    'No final CTA heading was written. The live page’s action is Order Now, which is a link, and the hero already has Schedule an Appointment.',
    'Hero photo is the live above-the-fold banner. Product photos are the live product images. Left out the Group-1 template images.',
    'Hero imagePosition is 18% 40% so the provider’s face stays in frame on a phone. Center 40% showed the monitor between the two people and cut both faces off.',
    'Live URL kept. oldUrls is empty.',
  ],
};
