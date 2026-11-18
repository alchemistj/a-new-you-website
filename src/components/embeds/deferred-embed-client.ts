/* eslint-disable @typescript-eslint/no-explicit-any */
// Client side of <DeferredEmbed>. Loads each embed on the first scroll, wheel, touchstart, pointerdown
// or keydown, or when that embed nears the viewport, whichever comes first (Rule 10).
// Each kind is a separate module, so Contact (map only) does not fetch the quiz or form URLs.

import type { EmbedDef } from './embeds';

export const INTERACTION_EVENTS = ['scroll', 'wheel', 'touchstart', 'pointerdown', 'keydown'] as const;

type LoadedEmbed = {
  def: EmbedDef;
  cherryInit?: { config: unknown; sections: unknown };
};

async function loadEmbed(kind: string): Promise<LoadedEmbed | undefined> {
  switch (kind) {
    case 'map':
      return { def: (await import('./kinds/map')).embed };
    case 'cherry': {
      const mod = await import('./kinds/cherry');
      return { def: mod.embed, cherryInit: mod.CHERRY_INIT };
    }
    case 'ghl-quiz':
      return { def: (await import('./kinds/ghl-quiz')).embed };
    case 'ghl-form':
      return { def: (await import('./kinds/ghl-form')).embed };
    default:
      return undefined;
  }
}

export function initDeferredEmbeds(doc: Document, win: Window & typeof globalThis): void {
  const hosts = Array.from(doc.querySelectorAll<HTMLElement>('[data-deferred-embed]'));
  if (hosts.length === 0) return;

  const load = (host: HTMLElement): void => {
    if (host.dataset.loaded) return;
    host.dataset.loaded = '1';
    void loadEmbed(host.dataset.deferredEmbed || '').then((loaded) => {
      if (!loaded) return;
      const def = loaded.def;

      if (def.type === 'cherry') {
        const w = win as unknown as Record<string, any>;
        const mount = doc.createElement('div');
        mount.id = 'all';
        host.replaceChildren(mount);
        w._hw =
          w._hw ||
          function (...args: unknown[]) {
            (w._hw.q = w._hw.q || []).push(args);
          };
        const s = doc.createElement('script');
        s.id = '_hw';
        s.async = true;
        s.src = def.src;
        doc.head.appendChild(s);
        if (loaded.cherryInit) w._hw('init', loaded.cherryInit.config, loaded.cherryInit.sections);
        return;
      }

      const frame = doc.createElement('iframe');
      frame.src = def.src;
      frame.title = def.title;
      for (const [k, v] of Object.entries(def.attrs ?? {})) frame.setAttribute(k, v);
      host.replaceChildren(frame);
      host.removeAttribute('aria-busy');
      if (def.script) {
        const s = doc.createElement('script');
        s.async = true;
        s.src = def.script;
        doc.body.appendChild(s);
      }
    });
  };

  const ac = new AbortController();
  let observer: IntersectionObserver | undefined;
  const loadAll = (): void => {
    ac.abort();
    observer?.disconnect();
    hosts.forEach(load);
  };

  for (const type of INTERACTION_EVENTS) {
    win.addEventListener(type, loadAll, { passive: true, once: true, signal: ac.signal });
  }

  if ('IntersectionObserver' in win) {
    observer = new win.IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            load(e.target as HTMLElement);
            observer?.unobserve(e.target);
          }
        }
      },
      { rootMargin: '200px 0px' },
    );
    hosts.forEach((h) => observer!.observe(h));
  }
}
