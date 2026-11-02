// Downscale blog source images in place. Usage (repo root): node scripts/migrate-blog/optimize-images.mjs
// JPEG/PNG/WebP: max 1600px wide, JPEG q82, PNG optimized. Animated GIF: max 560px wide, quality 25 (Astro re-encodes at q80 at build, so the source is kept small), animated WebP
// (the .gif file is replaced by a .webp and the Markdown reference is updated).
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '../..');
const ASSETS = path.join(ROOT, 'src/assets/blog');
const CONTENT = path.join(ROOT, 'src/content/blog');

function walk(d) {
  return fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
}

let before = 0, after = 0;
for (const f of walk(ASSETS)) {
  const ext = path.extname(f).toLowerCase();
  const size = fs.statSync(f).size;
  before += size;
  let out;
  let dest = f;
  if (ext === '.gif') {
    dest = f.slice(0, -4) + '.webp';
    out = await sharp(f, { animated: true }).resize({ width: 560, withoutEnlargement: true }).webp({ quality: 25, effort: 2, smartSubsample: true }).toBuffer();
  } else if (ext === '.jpg' || ext === '.jpeg') {
    out = await sharp(f).rotate().resize({ width: 1600, withoutEnlargement: true }).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  } else if (ext === '.png') {
    out = await sharp(f).resize({ width: 1600, withoutEnlargement: true }).png({ compressionLevel: 9, effort: 10 }).toBuffer();
  } else if (ext === '.webp') {
    if (((await sharp(f).metadata()).width ?? 0) <= 1600) { after += size; continue; } // never re-encode (keeps the animated WebP)
    out = await sharp(f, { animated: true }).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 82 }).toBuffer();
  } else continue;
  if (ext !== '.gif' && out.length >= size && sharp) {
    // already small: keep the original bytes unless it was resized
    const meta = await sharp(f).metadata();
    if ((meta.width ?? 0) <= 1600) { after += size; continue; }
  }
  fs.writeFileSync(dest, out);
  if (dest !== f) {
    fs.unlinkSync(f);
    const slug = path.basename(path.dirname(f));
    const md = path.join(CONTENT, `${slug}.md`);
    const oldName = path.basename(f), newName = path.basename(dest);
    fs.writeFileSync(md, fs.readFileSync(md, 'utf8').split(oldName).join(newName));
  }
  after += out.length;
  console.log(path.relative(ASSETS, dest), size, '->', out.length);
}
console.log('total', before, '->', after);
