// LeadConnector chat helpers. API confirmed on the live widget (Nov 2026):
//   window.leadConnector.chatWidget = { isLoaded (boolean property), openWidget(), closeWidget(), isActive, ... }
// The widget is a <chat-widget> custom element with an open shadow root. The launcher is
// `button.lc_text-widget--bubble` and the greeting is `.lc_text-widget--prompt`; the open panel is
// `.lc_text-widget--box`.
export const CHAT_WIDGET_ID = '6a15ba601ce15bb9e91d6259';
export const MOBILE_QUERY = '(max-width: 767.98px)';
export const CONTACT_FALLBACK = '/contact/';

/** Hides the floating launcher and greeting on phones. The panel opened from our own button stays visible. */
export const MOBILE_HIDE_CSS = `@media ${MOBILE_QUERY}{.lc_text-widget--bubble,.lc_text-widget--prompt{display:none!important}}`;

type ChatApi = { isLoaded?: boolean; openWidget?: () => void };
type Win = Window & typeof globalThis & { leadConnector?: { chatWidget?: ChatApi } };

export function loadChat(doc: Document): void {
  const flagged = doc as Document & { __ffChat?: boolean };
  if (flagged.__ffChat) return;
  flagged.__ffChat = true;
  const s = doc.createElement('script');
  s.async = true;
  s.src = 'https://beta.leadconnectorhq.com/loader.js';
  s.setAttribute('data-resources-url', 'https://beta.leadconnectorhq.com/chat-widget/loader.js');
  s.setAttribute('data-widget-id', CHAT_WIDGET_ID);
  doc.body.appendChild(s);
  watchForWidgetHost(doc);
}

/** Injects the mobile-hide stylesheet into the widget's shadow root as soon as the host element exists. */
function watchForWidgetHost(doc: Document): void {
  const inject = (): boolean => {
    const host = doc.querySelector('chat-widget');
    const root = host?.shadowRoot;
    if (!root) return false;
    if (!root.querySelector('style[data-ff-mobile-hide]')) {
      const st = doc.createElement('style');
      st.setAttribute('data-ff-mobile-hide', '');
      st.textContent = MOBILE_HIDE_CSS;
      root.appendChild(st);
    }
    return true;
  };
  if (typeof MutationObserver === 'undefined' || inject()) return;
  const mo = new MutationObserver(() => {
    if (inject()) mo.disconnect();
  });
  mo.observe(doc.documentElement, { childList: true, subtree: true });
  setTimeout(() => mo.disconnect(), 20000);
}

/** Loads the widget if needed, waits until its API is ready, then opens the panel. Returns false on timeout. */
export function openChat(doc: Document, win: Win, timeoutMs = 10000): Promise<boolean> {
  loadChat(doc);
  return new Promise((resolve) => {
    const start = Date.now();
    const tick = (): void => {
      const api = win.leadConnector?.chatWidget;
      if (api && api.isLoaded && typeof api.openWidget === 'function') {
        api.openWidget();
        resolve(true);
      } else if (Date.now() - start > timeoutMs) {
        resolve(false);
      } else {
        setTimeout(tick, 100);
      }
    };
    tick();
  });
}

export function initChatButtons(doc: Document, win: Win): void {
  for (const btn of doc.querySelectorAll<HTMLElement>('[data-open-chat]')) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      btn.setAttribute('aria-busy', 'true');
      void openChat(doc, win).then((ok) => {
        btn.removeAttribute('aria-busy');
        if (!ok) win.location.href = CONTACT_FALLBACK;
      });
    });
  }
}
