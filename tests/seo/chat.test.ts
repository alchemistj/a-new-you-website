import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { MOBILE_HIDE_CSS, openChat } from '../../src/components/embeds/chat-widget';
import { initThirdPartyLoaders } from '../../src/components/embeds/third-party-client';

const mkDoc = () => {
  const body: { src?: string; attrs: Record<string, string> }[] = [];
  const doc = {
    readyState: 'loading',
    head: { appendChild() {} },
    body: { appendChild: (e: (typeof body)[number]) => body.push(e) },
    createElement: () => ({ attrs: {} as Record<string, string>, setAttribute(k: string, v: string) { this.attrs[k] = v; } }),
  };
  return { doc: doc as unknown as Document, body };
};

describe('mobile chat', () => {
  it('opens the panel once the widget API is ready, loading the loader first', async () => {
    const { doc, body } = mkDoc();
    let opened = 0;
    const win = { leadConnector: { chatWidget: { isLoaded: false, openWidget: () => opened++ } } } as never;
    const p = openChat(doc, win, 2000);
    expect(body).toHaveLength(1);
    expect(body[0].attrs['data-widget-id']).toBe('6a15ba601ce15bb9e91d6259');
    expect(opened).toBe(0);
    (win as { leadConnector: { chatWidget: { isLoaded: boolean } } }).leadConnector.chatWidget.isLoaded = true;
    expect(await p).toBe(true);
    expect(opened).toBe(1);
  });

  it('reports failure when the API never appears (caller falls back to /contact/)', async () => {
    const { doc } = mkDoc();
    expect(await openChat(doc, {} as never, 250)).toBe(false);
  });

  it('hides only the launcher and greeting, on phones only', () => {
    expect(MOBILE_HIDE_CSS).toContain('max-width: 767.98px');
    expect(MOBILE_HIDE_CSS).toContain('.lc_text-widget--bubble');
    expect(MOBILE_HIDE_CSS).toContain('.lc_text-widget--prompt');
    expect(MOBILE_HIDE_CSS).not.toContain('lc_text-widget--box');
  });

  it('does not auto-load chat on phones', () => {
    const { doc, body } = mkDoc();
    const handlers: Record<string, () => void> = {};
    const win = {
      addEventListener: (t: string, f: () => void) => (handlers[t] = f),
      setTimeout: () => 0,
      matchMedia: () => ({ matches: true }),
    } as never;
    initThirdPartyLoaders(doc, win);
    handlers.pointerdown?.();
    expect(body).toHaveLength(0);
  });

  it('mobile bar has Call, Chat (link to /contact/ without JS), Schedule', () => {
    const src = readFileSync(new URL('../../src/components/MobileBar.astro', import.meta.url), 'utf8');
    expect(src).toContain('data-open-chat');
    expect(src).toContain('href="/contact/"');
    expect(src.indexOf('tel')).toBeLessThan(src.indexOf('data-open-chat'));
    expect(src.indexOf('data-open-chat')).toBeLessThan(src.indexOf('Schedule</a>'));
  });
});
