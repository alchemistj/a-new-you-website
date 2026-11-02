// Image resolution for ImageRef (paths relative to src/assets/).
//  - heroDataUri(): the single hero photo, encoded once at build time as an inline AVIF data URI
//    (SOP section 3, Rule 8). Read straight from disk with sharp, so the bytes are exactly what we encode.
//  - resolveBodyImage(): body photos, resolved via import.meta.glob and rendered by astro:assets.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';
import type { ImageMetadata } from 'astro';
import type { ImageRef } from '../types/page';

/** Roots an ImageRef.src may live under. The second is the test-fixture asset folder (tests only). */
const ASSET_ROOTS = ['src/assets', 'tests/foundation/fixtures/assets'];

const bodyLoaders = import.meta.glob<{ default: ImageMetadata }>(
  [
    '/src/assets/**/*.{jpg,jpeg,png,webp,avif,gif}',
    '/tests/foundation/fixtures/assets/**/*.{jpg,jpeg,png,webp,avif,gif}',
  ],
);

export async function resolveBodyImage(ref: ImageRef): Promise<ImageMetadata> {
  for (const root of ASSET_ROOTS) {
    const loader = bodyLoaders[`/${root}/${ref.src}`];
    if (loader) return (await loader()).default;
  }
  throw new Error(`Image not found under src/assets/: ${ref.src}`);
}

function findHeroFile(ref: ImageRef): string {
  for (const root of ASSET_ROOTS) {
    const p = path.resolve(process.cwd(), root, ref.src);
    if (fs.existsSync(p)) return p;
  }
  throw new Error(`Hero image not found under src/assets/: ${ref.src}`);
}

export interface HeroImage {
  uri: string;
  width: number;
  height: number;
  bytes: number;
}

export const HERO_W = 1280;
export const HERO_H = 800;
/** Encoded photo budget (SOP section 3): 35-60KB, aim ~45KB. We take the best quality that fits MAX. */
const MAX_BYTES = 55 * 1024;

function parsePosition(pos?: string): [number, number] {
  const kw: Record<string, number> = { left: 0, top: 0, center: 50, right: 100, bottom: 100 };
  const parts = (pos ?? 'center center').trim().split(/\s+/);
  const val = (s: string | undefined, fallback: number) => {
    if (s === undefined) return fallback;
    if (s in kw) return kw[s]!;
    const n = parseFloat(s);
    return Number.isFinite(n) ? n : fallback;
  };
  const x = val(parts[0], 50);
  const y = parts.length > 1 ? val(parts[1], 50) : 50;
  return [Math.min(100, Math.max(0, x)) / 100, Math.min(100, Math.max(0, y)) / 100];
}

const cache = new Map<string, Promise<HeroImage>>();
const diskCache = path.resolve(process.cwd(), 'node_modules/.cache/ff-hero');

async function encode(file: string, position?: string): Promise<HeroImage> {
  const input = fs.readFileSync(file);
  const key = crypto
    .createHash('sha1')
    .update(input)
    .update(`${position ?? ''}|${HERO_W}x${HERO_H}|${MAX_BYTES}|v2`)
    .digest('hex');
  const cached = path.join(diskCache, `${key}.avif`);
  if (fs.existsSync(cached)) {
    const buf = fs.readFileSync(cached);
    return toHero(buf);
  }

  const meta = await sharp(input).rotate().metadata();
  const w = meta.width ?? HERO_W;
  const h = meta.height ?? HERO_H;
  const scale = Math.max(HERO_W / w, HERO_H / h);
  const rw = Math.max(HERO_W, Math.round(w * scale));
  const rh = Math.max(HERO_H, Math.round(h * scale));
  const [px, py] = parsePosition(position);
  const left = Math.round((rw - HERO_W) * px);
  const top = Math.round((rh - HERO_H) * py);
  const base = await sharp(input)
    .rotate()
    .resize(rw, rh)
    .extract({ left, top, width: HERO_W, height: HERO_H })
    .toBuffer();

  const enc = (quality: number) =>
    sharp(base).avif({ quality, effort: 6, chromaSubsampling: '4:2:0' }).toBuffer();
  let lo = 20;
  let hi = 75;
  let best = await enc(lo);
  while (hi - lo > 1) {
    const mid = Math.floor((lo + hi) / 2);
    const b = await enc(mid);
    if (b.length <= MAX_BYTES) {
      best = b;
      lo = mid;
    } else hi = mid;
  }
  fs.mkdirSync(diskCache, { recursive: true });
  fs.writeFileSync(cached, best);
  return toHero(best);
}

function toHero(buf: Buffer): HeroImage {
  return {
    uri: `data:image/avif;base64,${buf.toString('base64')}`,
    width: HERO_W,
    height: HERO_H,
    bytes: buf.length,
  };
}

export function heroDataUri(ref: ImageRef, position?: string): Promise<HeroImage> {
  const file = findHeroFile(ref);
  const k = `${file}|${position ?? ''}`;
  let p = cache.get(k);
  if (!p) {
    p = encode(file, position);
    cache.set(k, p);
  }
  return p;
}
