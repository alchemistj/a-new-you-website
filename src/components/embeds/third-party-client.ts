// Delayed third-party tags (SOP section 7, Rule 10).
//  - GA4 gtag: after window load + 3 s, or on first interaction, whichever comes first.
//  - LeadConnector chat: first interaction only, never on load.
export const GA_ID = 'G-NNLFN2N0VY';
export const CHAT_WIDGET_ID = '6a15ba601ce15bb9e91d6259';
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

  let chatLoaded = false;
  const loadChat = (): void => {
    if (chatLoaded) return;
    chatLoaded = true;
    const s = doc.createElement('script');
    s.async = true;
    s.src = 'https://beta.leadconnectorhq.com/loader.js';
    s.setAttribute('data-resources-url', 'https://beta.leadconnectorhq.com/chat-widget/loader.js');
    s.setAttribute('data-widget-id', CHAT_WIDGET_ID);
    doc.body.appendChild(s);
  };

  const ac = new AbortController();
  const onInteraction = (): void => {
    ac.abort();
    loadGa();
    loadChat();
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
