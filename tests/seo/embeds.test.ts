/* eslint-disable @typescript-eslint/no-explicit-any */
import { readFileSync } from 'node:fs';
import { describe, expect, it, vi } from 'vitest';
import { initDeferredEmbeds } from '../../src/components/embeds/deferred-embed-client';
import { EMBEDS } from '../../src/components/embeds/embeds';
import { CHAT_WIDGET_ID, GA_ID, initThirdPartyLoaders } from '../../src/components/embeds/third-party-client';
import { initVideoFacades, videoEmbedSrc } from '../../src/components/embeds/video-facade-client';

const read = (f: string) => readFileSync(new URL(`../../src/components/embeds/${f}`, import.meta.url), 'utf8');

// ---- minimal DOM fakes (the client modules take document/window as arguments) ----
class FakeEl {
  tag: string;
  children: FakeEl[] = [];
  attrs: Record<string, string> = {};
  dataset: Record<string, string> = {};
  listeners: Record<string, (() => void)[]> = {};
  parentElement: FakeEl | null = null;
  [k: string]: any;
  constructor(tag: string) {
    this.tag = tag;
  }
  setAttribute(k: string, v: string) {
    this.attrs[k] = v;
  }
  removeAttribute(k: string) {
    delete this.attrs[k];
  }
  appendChild(c: FakeEl) {
    c.parentElement = this;
    this.children.push(c);
  }
  replaceChildren(...c: FakeEl[]) {
    this.children = [];
    c.forEach((x) => this.appendChild(x));
  }
  addEventListener(t: string, fn: () => void) {
    (this.listeners[t] ??= []).push(fn);
  }
  focus() {}
  click() {
    (this.listeners.click ?? []).forEach((f) => f());
  }
}

function makeEnv(hosts: FakeEl[] = [], readyState = 'loading') {
  const head = new FakeEl('head');
  const body = new FakeEl('body');
  const doc: any = {
    readyState,
    head,
    body,
    createElement: (t: string) => new FakeEl(t),
    querySelectorAll: (sel: string) => (sel === '[data-deferred-embed]' ? hosts : hosts),
  };
  const handlers: Record<string, { fn: () => void; opts: any }[]> = {};
  const timers: { fn: () => void; ms: number }[] = [];
  const observed: FakeEl[] = [];
  let ioCallback: ((e: any[]) => void) | undefined;
  const win: any = {
    addEventListener(t: string, fn: () => void, opts: any) {
      (handlers[t] ??= []).push({ fn, opts });
      opts?.signal?.addEventListener('abort', () => {
        handlers[t] = (handlers[t] ?? []).filter((h) => h.fn !== fn);
      });
    },
    setTimeout: (fn: () => void, ms: number) => timers.push({ fn, ms }),
    IntersectionObserver: class {
      constructor(cb: (e: any[]) => void) {
        ioCallback = cb;
      }
      observe(el: FakeEl) {
        observed.push(el);
      }
      unobserve() {}
      disconnect() {}
    },
  };
  return {
    doc,
    win,
    head,
    body,
    handlers,
    timers,
    observed,
    fire(t: string) {
      const list = handlers[t] ?? [];
      list.forEach((h) => h.fn());
      handlers[t] = list.filter((h) => !h.opts?.once);
    },
    intersect(el: FakeEl) {
      ioCallback?.([{ target: el, isIntersecting: true }]);
    },
  };
}

const host = (embed: string) => {
  const el = new FakeEl('div');
  el.dataset.deferredEmbed = embed;
  el.attrs['aria-busy'] = 'true';
  return el;
};

describe('DeferredEmbed', () => {
  it('makes no request on load and registers passive once listeners', () => {
    const h = host('ghl-form');
    const env = makeEnv([h]);
    initDeferredEmbeds(env.doc, env.win);
    expect(env.head.children).toHaveLength(0);
    expect(env.body.children).toHaveLength(0);
    expect(h.children).toHaveLength(0);
    for (const t of ['scroll', 'wheel', 'touchstart', 'pointerdown', 'keydown']) {
      expect(env.handlers[t]).toHaveLength(1);
      expect(env.handlers[t][0].opts).toMatchObject({ passive: true, once: true });
    }
  });

  it('loads every embed on first interaction, with the form_embed.js helper for GHL', () => {
    const form = host('ghl-form');
    const map = host('map');
    const env = makeEnv([form, map]);
    initDeferredEmbeds(env.doc, env.win);
    env.fire('wheel');
    expect(form.children[0].src).toBe('https://link.aestheticrecord.com/widget/form/H2deelST8Z9WKwPJ5WTe');
    expect(form.children[0].attrs['data-form-id']).toBe('H2deelST8Z9WKwPJ5WTe');
    expect(map.children[0].src).toContain('output=embed');
    expect(env.body.children.map((c) => c.src)).toEqual(['https://link.aestheticrecord.com/js/form_embed.js']);
    // other listeners are gone after the first interaction
    expect(env.handlers.scroll ?? []).toHaveLength(0);
  });

  it('loads one embed when it enters the viewport, leaving the others', () => {
    const quiz = host('ghl-quiz');
    const map = host('map');
    const env = makeEnv([quiz, map]);
    initDeferredEmbeds(env.doc, env.win);
    expect(env.observed).toEqual([quiz, map]);
    env.intersect(quiz);
    expect(quiz.children[0].src).toBe('https://link.aestheticrecord.com/widget/survey/NgxRM6NWFTi1Q8AS8XFU');
    expect(map.children).toHaveLength(0);
  });

  it('loads an embed only once', () => {
    const quiz = host('ghl-quiz');
    const env = makeEnv([quiz]);
    initDeferredEmbeds(env.doc, env.win);
    env.intersect(quiz);
    env.intersect(quiz);
    env.fire('keydown');
    expect(quiz.children).toHaveLength(1);
    expect(env.body.children).toHaveLength(1);
  });

  it('boots Cherry with the live config', () => {
    const cherry = host('cherry');
    const env = makeEnv([cherry]);
    initDeferredEmbeds(env.doc, env.win);
    env.fire('touchstart');
    expect(cherry.children[0].id).toBe('all');
    expect(env.head.children[0].src).toBe('https://files.withcherry.com/widgets/widget.js');
    const queued = env.win._hw.q[0];
    expect(queued[0]).toBe('init');
    expect(queued[1].variables.slug).toBe('a-new-you-womens-clinic');
  });

  it('server markup: no iframe, no src attribute, reserved height, noscript link', () => {
    const src = read('DeferredEmbed.astro');
    expect(src).not.toMatch(/<iframe/i);
    expect(src).not.toMatch(/\ssrc\s*=/i);
    expect(src).not.toMatch(/loading\s*=\s*["']lazy/i);
    expect(src).toContain('<noscript>');
    expect(src).toContain('min-height');
    for (const def of Object.values(EMBEDS)) {
      expect(def.heightMobile).toBeGreaterThan(0);
      expect(def.heightDesktop).toBeGreaterThan(0);
      expect(def.fallback.href).toMatch(/^(https:\/\/|tel:)/);
    }
  });

  it('uses the integration URLs from the brief', () => {
    expect(EMBEDS['ghl-form'].src).toBe('https://link.aestheticrecord.com/widget/form/H2deelST8Z9WKwPJ5WTe');
    expect(EMBEDS['ghl-quiz'].src).toBe('https://link.aestheticrecord.com/widget/survey/NgxRM6NWFTi1Q8AS8XFU');
    expect(EMBEDS.cherry.src).toBe('https://files.withcherry.com/widgets/widget.js');
    expect(EMBEDS.cherry.fallback.href).toBe('tel:+14176052153');
  });
});

describe('VideoFacade', () => {
  it('server markup has no iframe, no remote image and no third-party src', () => {
    const src = read('VideoFacade.astro');
    expect(src).not.toMatch(/<iframe/i);
    expect(src).not.toMatch(/ytimg|vimeocdn|i\.vimeo|img\.youtube/i);
    expect(src).not.toMatch(/\ssrc=\{?["']?https?:/i);
    expect(src).toContain('<noscript>');
  });

  it('builds embed URLs only for safe ids', () => {
    expect(videoEmbedSrc('youtube', 'VhBl3dHT5SY')).toContain('/embed/VhBl3dHT5SY');
    expect(videoEmbedSrc('vimeo', '805690936')).toBe('https://player.vimeo.com/video/805690936?autoplay=1');
    expect(videoEmbedSrc('youtube', 'a"><script>')).toBeUndefined();
    expect(videoEmbedSrc('other', 'abc')).toBeUndefined();
  });

  it('swaps in the iframe on click, once', () => {
    const wrap = new FakeEl('div');
    const btn = new FakeEl('button');
    btn.dataset = { provider: 'youtube', videoId: 'VhBl3dHT5SY', title: 'FAQ video' };
    wrap.appendChild(btn);
    const doc: any = { createElement: (t: string) => new FakeEl(t), querySelectorAll: () => [btn] };
    initVideoFacades(doc);
    expect(wrap.children[0]).toBe(btn);
    btn.click();
    expect(wrap.children).toHaveLength(1);
    expect(wrap.children[0].tag).toBe('iframe');
    expect(wrap.children[0].src).toContain('youtube-nocookie.com/embed/VhBl3dHT5SY');
  });
});

describe('ThirdPartyLoaders', () => {
  it('loads nothing during page load', () => {
    const env = makeEnv();
    initThirdPartyLoaders(env.doc, env.win);
    expect(env.head.children).toHaveLength(0);
    expect(env.body.children).toHaveLength(0);
    expect(env.timers).toHaveLength(0);
  });

  it('loads gtag 3 s after window load, and not the chat', () => {
    const env = makeEnv();
    initThirdPartyLoaders(env.doc, env.win);
    env.fire('load');
    expect(env.timers).toHaveLength(1);
    expect(env.timers[0].ms).toBe(3000);
    expect(env.head.children).toHaveLength(0);
    env.timers[0].fn();
    expect(env.head.children[0].src).toBe(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`);
    expect(GA_ID).toBe('G-NNLFN2N0VY');
    expect(env.body.children).toHaveLength(0); // no chat without an interaction
    expect(env.win.dataLayer.map((a: ArrayLike<unknown>) => a[0])).toEqual(['js', 'config']);
  });

  it('loads gtag and chat on first interaction, once each, and the timer does not double-load', () => {
    const env = makeEnv();
    initThirdPartyLoaders(env.doc, env.win);
    env.fire('pointerdown');
    env.fire('load');
    env.timers.forEach((t) => t.fn());
    env.fire('keydown');
    expect(env.head.children).toHaveLength(1);
    const chat = env.body.children;
    expect(chat).toHaveLength(1);
    expect(chat[0].src).toBe('https://beta.leadconnectorhq.com/loader.js');
    expect(chat[0].attrs['data-widget-id']).toBe(CHAT_WIDGET_ID);
    expect(CHAT_WIDGET_ID).toBe('6a15ba601ce15bb9e91d6259');
    expect(chat[0].attrs['data-resources-url']).toBe('https://beta.leadconnectorhq.com/chat-widget/loader.js');
  });

  it('listens with passive once options', () => {
    const env = makeEnv();
    initThirdPartyLoaders(env.doc, env.win);
    for (const t of ['scroll', 'wheel', 'touchstart', 'pointerdown', 'keydown']) {
      expect(env.handlers[t][0].opts).toMatchObject({ passive: true, once: true });
    }
  });

  it('component has no src of its own', () => {
    expect(read('ThirdPartyLoaders.astro')).not.toMatch(/<script[^>]*\ssrc=/);
    vi.restoreAllMocks();
  });
});
