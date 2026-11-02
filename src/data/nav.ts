// Navigation per docs/spec/brief.md (Cindy's priority order). Links to routes that are not
// published are dropped at render time by src/lib/nav.ts (Rule 3), so nothing here can 404.

export interface NavLink {
  label: string;
  href: string;
}


/** Header quick links, in this order. */
export const quickLinks: NavLink[] = [
  { label: 'Vaginal Wellness', href: '/vaginal-rejuvenation/' },
  { label: 'Menopause', href: '/menopause/' },
  { label: 'Weight Loss', href: '/weight-loss/' },
  { label: "Men's Health", href: '/mens-health/' },
];

/** Top bar. */
export const topBarLinks: NavLink[] = [
  { label: 'About', href: '/about/' },
  { label: 'FAQs', href: '/faq/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Contact', href: '/contact/' },
];

/** Short labels for service pages (slug -> label), in footer order. */
export const serviceLabels: Record<string, string> = {
  'vaginal-wellness': 'Vaginal Wellness',
  menopause: 'Menopause',
  perimenopause: 'Perimenopause',
  'weight-loss': 'Weight Loss',
  semaglutide: 'Semaglutide',
  'mens-health': "Men's Health",
  'female-sexual-dysfunction': 'Female Sexual Dysfunction',
  botox: 'Botox',
  aesthetics: 'Aesthetics',
  cryolipolysis: 'Cryolipolysis',
};

/** Footer: company links after the service list. */
export const footerCompanyLinks: NavLink[] = [
  { label: 'Biote', href: '/biote/' },
  { label: 'Memberships', href: '/subscription-plans/' },
  { label: 'Financing', href: '/financing/' },
  { label: 'Customer Reviews', href: '/customer-reviews/' },
  { label: 'About', href: '/about/' },
  { label: 'FAQ', href: '/faq/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Contact', href: '/contact/' },
];
