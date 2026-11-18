// Third-party embed definitions (Rule 10). URLs come from docs/spec/brief.md "Integrations" and, for
// the iframe attributes, from the live pages (checked 2026-11-02).
//
// Nothing here is rendered as a src/href in server HTML except the <noscript> fallback links.
// Each kind lives in its own module so a page's browser script loads only the embeds it shows.

import { embed as cherryEmbed, CHERRY_INIT as cherryInit, CHERRY_WIDGET_URL } from './kinds/cherry';
import { embed as ghlFormEmbed } from './kinds/ghl-form';
import { embed as ghlQuizEmbed } from './kinds/ghl-quiz';
import { embed as mapEmbed } from './kinds/map';

export type EmbedKind = 'ghl-form' | 'ghl-quiz' | 'cherry' | 'map';

export interface EmbedDef {
  type: 'iframe' | 'cherry';
  /** iframe src (iframe type) or widget script (cherry). Only the client script uses it. */
  src: string;
  /** Extra script injected after the iframe (GoHighLevel resizes its iframe with it). */
  script?: string;
  /** iframe attributes copied from the live embed. */
  attrs?: Record<string, string>;
  title: string;
  /** Reserved height in px so nothing shifts when the embed loads. */
  heightMobile: number;
  heightDesktop: number;
  /** Server-rendered <noscript> fallback. */
  fallback: { href: string; label: string };
}

export { CHERRY_WIDGET_URL };
export const CHERRY_INIT = cherryInit;

export const EMBEDS: Record<EmbedKind, EmbedDef> = {
  'ghl-form': ghlFormEmbed,
  'ghl-quiz': ghlQuizEmbed,
  cherry: cherryEmbed,
  map: mapEmbed,
};
