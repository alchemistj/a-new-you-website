import { collectClickToCall, collectContactClick } from './collect';

/**
 * One journey event per tel: activation, and one contact_click per link to
 * /contact/. Listeners are separate from chat and do not change the link.
 */
const LOCATION_SELECTORS: ReadonlyArray<readonly [string, string]> = [
  ['.mobile-bar', 'sticky_bar'],
  ['.menu-panel', 'mobile_menu'],
  ['.site-header', 'header'],
  ['.hero', 'hero'],
  ['.band-cta', 'cta_band'],
  ['.trust-bar', 'trust_bar'],
  ['.site-footer', 'footer'],
  ['.deferred-embed', 'financing'],
  ['main', 'main'],
];

function markedLocation(link: Element): string {
  return (
    link.getAttribute('data-ff-cta-location')?.trim() ||
    link.getAttribute('data-ff-phone-location')?.trim() ||
    ''
  );
}

export function ctaLocationFor(link: Element): string | null {
  const marked = markedLocation(link);
  if (marked) return marked;
  for (const [selector, location] of LOCATION_SELECTORS) {
    if (link.closest(selector)) return location;
  }
  return null;
}

function isContactHref(href: string): boolean {
  if (!href || href.toLowerCase().startsWith('tel:') || href.toLowerCase().startsWith('mailto:')) {
    return false;
  }
  try {
    const url = new URL(href, window.location.href);
    const path = url.pathname.replace(/\/+$/, '') || '/';
    return path === '/contact';
  } catch {
    return false;
  }
}

export function bindJourneyInteractions(): () => void {
  if (typeof document === 'undefined') return () => undefined;

  const onClick = (event: Event) => {
    const raw = event.target;
    const target =
      raw && typeof (raw as Element).closest === 'function'
        ? (raw as Element)
        : ((raw as Node | null)?.parentElement ?? null);
    if (!target || typeof target.closest !== 'function') return;
    const link = target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href')?.trim() || '';
    if (href.toLowerCase().startsWith('tel:')) {
      void collectClickToCall({ ctaLocation: ctaLocationFor(link) });
      return;
    }
    if (isContactHref(href)) {
      void collectContactClick({ ctaLocation: ctaLocationFor(link) });
    }
  };

  document.addEventListener('click', onClick);
  return () => document.removeEventListener('click', onClick);
}
