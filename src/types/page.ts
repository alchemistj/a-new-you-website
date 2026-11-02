// Shared copy contract for every page on the site.
// Owned by the architect (Claude main session). Helpers do not change this file;
// if you need a new field or section kind, say so in your report.

/** An image that lives in the repo under src/assets/ (never a remote URL). */
export interface ImageRef {
  /** Path relative to src/assets/, e.g. "pages/botox/hero.jpg". */
  src: string;
  /** Describes what is actually in the photo. */
  alt: string;
}

export interface Cta {
  label: string;
  href: string;
}

export type Section =
  | { kind: 'prose'; id?: string; heading?: string; paragraphs: string[]; image?: ImageRef }
  | {
      kind: 'list';
      id?: string;
      heading?: string;
      intro?: string;
      items: string[];
      outro?: string;
      image?: ImageRef;
      /** 'cindy' = a block from Cindy's services list; rendered compactly (grouped, multi-column). */
      source?: 'cindy';
    }
  | { kind: 'cards'; id?: string; heading?: string; intro?: string; cards: { title: string; text?: string; href?: string; image?: ImageRef }[] }
  | { kind: 'steps'; id?: string; heading?: string; intro?: string; steps: { title: string; text?: string }[]; image?: ImageRef }
  /** One review, shown on its own full-width band. name = first name + last initial. */
  | { kind: 'review'; quote: string; name: string; city?: string }
  /** Answers are always rendered in the HTML. */
  | { kind: 'faq'; id?: string; heading?: string; items: { q: string; a: string[] }[] }
  | { kind: 'pricing'; id?: string; heading?: string; intro?: string; plans: { name: string; lines: string[] }[]; note?: string }
  /** Rendered as a click-to-load facade (no third-party request on page load). */
  | { kind: 'video'; id?: string; heading?: string; provider: 'youtube' | 'vimeo'; videoId: string; title: string }
  /** Third-party embeds, loaded on first interaction or when scrolled into view (Rule 10). */
  | { kind: 'embed'; id?: string; embed: 'ghl-form' | 'ghl-quiz' | 'cherry' | 'map'; heading?: string; intro?: string }
  /** Logos/badges row (awards, BBB). Images must be local. */
  | { kind: 'badges'; id?: string; heading?: string; badges: ImageRef[] }
  | { kind: 'cta'; id?: string; heading: string; paragraphs?: string[] };

export type Template = 'home' | 'service' | 'company' | 'contact' | 'faq' | 'reviews';

export interface PageCopy {
  /** File name without extension, e.g. "botox". */
  slug: string;
  /** New canonical path with trailing slash, e.g. "/botox/". */
  route: string;
  template: Template;
  /** false = page is drafted but not published, linked or in the sitemap. */
  publish: boolean;
  /** Old WordPress paths that 301 to this page, e.g. ["/botox-in-springfield-mo/"]. */
  oldUrls: string[];
  seo: { title: string; description: string };
  hero: {
    eyebrow?: string;
    h1: string;
    subhead?: string;
    image?: ImageRef;
    /** CSS object-position, e.g. "center 30%". */
    imagePosition?: string;
    primaryCta?: Cta;
  };
  sections: Section[];
  /** Slugs of related pages for the Related band (service pages). */
  related?: string[];
  serviceArea?: string[];
  /** Every cleanup or wording change made vs the live WordPress page, for Josh's review. */
  changes: string[];
}
