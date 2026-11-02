import type { PageCopy } from '../../types/page';

export const page: PageCopy = {
  slug: 'aesthetics',
  route: '/aesthetics/',
  template: 'service',
  publish: true,
  oldUrls: [],
  seo: {
    title: "Aesthetic Treatments in Springfield, MO | A New You Women's Clinic",
    description:
      'Aesthetic treatments in Springfield, MO, offering clinically guided, non-surgical solutions for skin, wrinkles, fat, and body contouring.',
  },
  hero: {
    h1: 'Aesthetic Treatments in Springfield, MO',
    image: {
      src: 'pages/aesthetics/hero.jpg',
      alt: 'A provider in black holds a handheld wand to the face of a woman lying back on a treatment bed beside a monitor',
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
        'Aesthetic treatments in Springfield, MO have become the primary approach for addressing mild to moderate age-related facial changes through nonsurgical, minimally invasive procedures. Most of these treatments achieve good outcomes, with minimal recovery time and a low incidence of side effects. In the past, treatment options were limited to surgical interventions such as facelifts, deep ablative laser resurfacing, and dermabrasion to improve texture, wrinkles, and hyperpigmentation. While surgery is still an option for many patients, it may radically alter appearance and carries greater risks.',
      ],
    },
    {
      kind: 'cards',
      heading: 'We offer the following aesthetic treatments:',
      cards: [
        {
          title: 'Botulinum toxin injections (Botox)',
          text: "is safe and effective for reduction of frown lines, crow's feet, and horizontal forehead lines.",
          href: '/botox/',
        },
        {
          title: 'Injectable dermal fillers',
          text: 'Facial wrinkles and folds in the lower two thirds of the face and lip enhancement',
        },
        {
          title: 'Radio Frequency (RF) Facial',
          text: 'Using heat therapy to heat up the dermis layer of skin and stimulate collagen growth.',
        },
      ],
    },
    {
      kind: 'prose',
      heading: 'Ultrasonic Cavitation',
      paragraphs: [
        '40khz ultrasound penetrates into the adipose tissue to break down the fat into a liquid and excrete it through the Lymphatic system. Function: Explosion of fat cell membrane, decomposition of melted fat.',
      ],
      image: {
        src: 'pages/aesthetics/nonsurgical-treatments.jpg',
        alt: 'A provider in black holds a handheld wand to the face of a woman wearing a headband',
      },
    },
    {
      kind: 'prose',
      heading: 'Laser Lipolysis',
      paragraphs: [
        'Laser paddles placed on the body used to break apart fat cells and reduce the volume of fatty tissue (shrink & soften fat cells).',
      ],
    },
    {
      kind: 'prose',
      heading: 'Cryo-lipolysis',
      paragraphs: [
        'Non-surgical body contouring that emits energy through the skin and breaks down underlying fat. Using freezing temperatures, the fat cells are destroyed and then gradually removed by the body’s normal metabolic process during the next few months following treatment. The effects are long-lasting due to the fact that we are born with a particular number of fat cells.. We have the same number of fat cells regardless of how much weight we gain or lose. They only enlarge with weight gain. In this way, when non-invasive fat removal kills some fat cells, the targeted cells are removed for good. A typical in-clinic treatment lasts about 60 minutes. There is no downtime, and clients can immediately return to work or their usual activities',
      ],
    },
    {
      kind: 'list',
      source: 'cindy',
      heading: 'Facial Aesthetics & Skin Health — Women & Men',
      items: [
        'Botox & Dysport',
        'Dermal Fillers',
        'Morpheus8 Face & Neck RF Microneedling',
        'Clinical Skin Renewal Facial',
        'HydraFacial',
        'Dermaplaning',
        'Chemical Peels',
      ],
    },
    {
      kind: 'list',
      source: 'cindy',
      heading: 'Non-Surgical Body Contouring & Skin Tightening — Women & Men',
      items: [
        'Cryolipolysis',
        'Ultrasonic Cavitation',
        'Laser Lipolysis',
        'Radiofrequency Body Treatments',
        'Morpheus8 Body RF Microneedling',
        'Vacuum Brazilian Booty Lift / Body Contouring',
      ],
    },
    {
      kind: 'cta',
      heading: 'Let us schedule you a free consultation and body fat analysis',
    },
  ],
  related: ['botox', 'cryolipolysis', 'weight-loss'],
  serviceArea: ['Springfield', 'Nixa', 'Ozark', 'Republic', 'Rogersville'],
  changes: [
    'Title tag: "A New You Clinic" corrected to "A New You Women\'s Clinic" and set in the standard "[Service] in Springfield, MO | A New You Women\'s Clinic" format. Description unchanged.',
    'Added two list sections from Cindy\'s list, names only and word for word: Facial Aesthetics & Skin Health — Women & Men (Botox & Dysport, Dermal Fillers, Morpheus8 Face & Neck RF Microneedling, Clinical Skin Renewal Facial, HydraFacial, Dermaplaning, Chemical Peels) and Non-Surgical Body Contouring & Skin Tightening — Women & Men (Cryolipolysis, Ultrasonic Cavitation, Laser Lipolysis, Radiofrequency Body Treatments, Morpheus8 Body RF Microneedling, Vacuum Brazilian Booty Lift / Body Contouring). Her all-caps headings are set in title case. Her concern bullets for these are on the Botox and Cryolipolysis pages only.',
    'Live headings "injectable dermal fillers", "RADIO FREQUENCY (RF) Facial" and "ULTRASONIC CAVITATION" are set in title case. The live copy ran "LASER LIPOLYSIS" and "Cryo-lipolysis" inline after the cavitation text; each is now its own heading with the same following words.',
    'The Botox card text begins with "is safe and effective..." as on the live page (the live heading and sentence were one phrase). The live "Explore Botox Offerings Here" link is the card link to /botox/.',
    'Typo fix: closing line "Let us scheduled you a free consultation and body fat analysis" to "Let us schedule you ...". It is the final CTA heading.',
    'Removed the "Home / Aestheics" breadcrumb text and the Group-1 and Group-3 template images.',
    'Kept live claims as written ("safe and effective", "Most of these treatments achieve good outcomes", "removed for good", "no downtime"). Flagged for Josh.',
    'Photos come from the live media library files named for aesthetics (Elementor backgrounds, not in the page HTML). The hero file is 680 px wide; a larger original may be needed.',
    'Hero image changed to the live banner photo (Aesthetics-Nonsurgical-procedures, 1920x480). The earlier hero (Aesthetics-procedures, 680 px) is no longer used; the body photo is unchanged.',
  ],
};
