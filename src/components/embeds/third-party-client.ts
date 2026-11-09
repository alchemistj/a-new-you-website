/* eslint-disable @typescript-eslint/no-explicit-any */
import { CHAT_WIDGET_ID, MOBILE_QUERY, loadChat } from './chat-widget';
export { CHAT_WIDGET_ID };
// Delayed third-party tags (SOP section 7, Rule 10).
//  - GA4 gtag: after window load + 3 s, or on first interaction, whichever comes first.
//  - LeadConnector chat: first interaction only, never on load, and not auto-loaded on phones
//    (the bottom-bar Chat button loads it on tap).
export const GA_ID = 'G-NNLFN2N0VY';
export const GA_DELAY_MS = 3000;
export const INTERACTION_EVENTS = ['scroll', 'wheel', 'touchstart', 'pointerdown', 'keydown'] as const;

export function initThirdPartyLoaders(doc: Document, win: Window & typeof globalThis): void {
  const w = win as unknown as Record<string, any>;
  // Queue stub so conversion events fired before gtag.js arrives are not lost.
  w.dataLayer = w.dataLayer || [];
  w.gtag =
    w.gtag ||
    function () {
      // gtag.js reads the Arguments object itself, so push `arguments`, not an array.
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer.push(arguments);
    };

  let gaLoaded = false;
  const loadGa = (): void => {
    if (gaLoaded) return;
    gaLoaded = true;
    w.gtag('js', new Date());
    w.gtag('config', GA_ID);
    const s = doc.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    doc.head.appendChild(s);
  };

  const ac = new AbortController();
  const onInteraction = (): void => {
    ac.abort();
    loadGa();
    // Phones open chat from the bottom-bar Chat button, which loads the widget on tap.
    if (!win.matchMedia?.(MOBILE_QUERY).matches) loadChat(doc);
  };
  for (const type of INTERACTION_EVENTS) {
    win.addEventListener(type, onInteraction, { passive: true, once: true, signal: ac.signal });
  }

  const afterLoad = (): void => {
    win.setTimeout(loadGa, GA_DELAY_MS);
  };
  if (doc.readyState === 'complete') afterLoad();
  else win.addEventListener('load', afterLoad, { once: true });
}
