// One-off export of the A New You WordPress blog to Markdown.
// Usage (from this folder): npm install && node migrate.mjs
// The WordPress response is untrusted data: it is parsed and converted, never executed.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../..');
const CONTENT_DIR = path.join(ROOT, 'src/content/blog');
const ASSET_DIR = path.join(ROOT, 'src/assets/blog');
const REDIRECTS = path.join(ROOT, 'src/data/redirects-blog.json');
const CACHE = path.join(HERE, '.cache');
const API = 'https://anewyouwoman.com/wp-json/wp/v2/posts?per_page=100&_embed';
const AUTHOR = 'Lucinda "Cindy" Sparks';

// ---------------------------------------------------------------- helpers
function curl(args) {
  for (let i = 0; i < 2; i++) {
    try {
      return execFileSync('curl', ['-sSL', '-A', 'Mozilla/5.0', '--max-time', '60', ...args], { maxBuffer: 64 * 1024 * 1024 });
    } catch (e) {
      if (i === 1) throw e;
      execFileSync('sleep', ['5']);
    }
  }
}

const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', hellip: '…', ndash: '–', mdash: '—', rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”' };
function decode(s) {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, n) => ENT[n.toLowerCase()] ?? m);
}
const stripTags = (h) => decode(h.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();

function cleanSlug(raw) {
  let s = decodeURIComponent(raw);
  s = s.normalize('NFKD').replace(/[^\x00-\x7f]/g, ''); // drops U+FE0F etc.
  s = s.replace(/-{2,}/g, '-').replace(/^-|-$/g, '').toLowerCase();
  const fixes = { 'unveiling-the-ppotential-of-ppeptides-for-wweight-lloss': 'unveiling-the-potential-of-peptides-for-weight-loss' };
  return fixes[s] ?? s;
}

function trimDescription(text, max = 155) {
  text = text.replace(/([.!?])([A-Z“])/g, '$1 $2').replace(/\s*\[…\]\s*$/, '').replace(/\s*…\s*$/, '').trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const sentence = cut.match(/^(.{80,}[.!?])\s/);
  if (sentence) return sentence[1];
  return cut.replace(/\s+\S*$/, '').replace(/[,;:\-–—]$/, '') + '…';
}

function yamlStr(s) { return JSON.stringify(s); }

// ---------------------------------------------------------------- links
const PAGE_MAP = {
  '/weight-loss-in-springfield/': '/weight-loss/',
  '/semaglutide-in-springfield-mo/': '/semaglutide/',
  '/botox-in-springfield-mo/': '/botox/',
  '/aesthetics/': '/aesthetics/',
  '/cryolypolysis/': '/cryolipolysis/',
  '/menopause/': '/menopause/',
  '/thyroid-optimization/': '/menopause/',
  '/pcos-management/': '/menopause/',
  '/perimenopause/': '/perimenopause/',
  '/vaginal-rejuvenation/': '/vaginal-rejuvenation/',
  '/female-sexual-disfunction-disorder/': '/female-sexual-dysfunction-disorder/',
  '/mens-health/': '/mens-health/',
  '/biote/': '/biote/',
  '/subscription-plans/': '/subscription-plans/',
  '/financing/': '/financing/',
  '/about/': '/about/',
  '/customer-reviews/': '/customer-reviews/',
  '/contact/': '/contact/',
  '/faq/': '/faq/',
  '/blog/': '/blog/',
  '/': '/',
};
const HELD = new Set(['/styku/', '/image-skincare/', '/nutrametrix/']);

// ---------------------------------------------------------------- service-link phrases
// [target, regex, label]. Highest-count targets win; at most 2 links are added per post.
const PHRASES = [
  ['/semaglutide/', /\bsemaglutide\b/i],
  ['/weight-loss/', /\b(medical weight[- ]loss|weight[- ]loss program|weight[- ]loss clinic)\b/i],
  ['/botox/', /\bBotox\b/i],
  ['/cryolipolysis/', /\b(cryolipolysis|CoolSculpting)\b/i],
  ['/perimenopause/', /\bperimenopause\b/i],
  ['/menopause/', /\bmenopause\b/i],
  ['/vaginal-rejuvenation/', /\b(vaginal wellness|vaginal rejuvenation|Empower ?RF|Empower by InMode)\b/i],
  ['/female-sexual-dysfunction-disorder/', /\bfemale sexual dysfunction\b/i],
  ['/aesthetics/', /\bMorpheus ?8\b/i],
  ['/biote/', /\bBio-?TE\b/i],
];

const LINK_RE = /(!?\[[^\]]*\]\([^)]*\)|https?:\/\/\S+)/g;

function addServiceLinks(md, selfLinks) {
  const lines = md.split('\n');
  const eligible = (l) => l.trim() && !/^(#|!\[|\||>|-{3,})/.test(l.trim());
  const counts = new Map();
  for (const [to, re] of PHRASES) {
    let n = 0;
    for (const l of lines) {
      if (!eligible(l)) continue;
      for (const seg of l.split(LINK_RE)) if (!LINK_RE.test(seg) && new RegExp(re.source, re.flags + 'g').test(seg)) n += seg.match(new RegExp(re.source, re.flags + 'g')).length;
    }
    counts.set(to, n);
  }
  const ranked = [...counts.entries()].filter(([, n]) => n >= 2).sort((a, b) => b[1] - a[1]);
  const related = ranked[0]?.[0];
  const added = [];
  for (const [to] of ranked) {
    if (added.length >= 2) break;
    if (selfLinks.has(to)) continue;
    const re = PHRASES.find((p) => p[0] === to)[1];
    outer: for (let i = 0; i < lines.length; i++) {
      if (!eligible(lines[i])) continue;
      const parts = lines[i].split(LINK_RE);
      for (let j = 0; j < parts.length; j++) {
        if (j % 2 === 1) continue; // odd indexes are the captured links
        const m = re.exec(parts[j]);
        if (m) {
          parts[j] = parts[j].slice(0, m.index) + `[${m[0]}](${to})` + parts[j].slice(m.index + m[0].length);
          lines[i] = parts.join('');
          added.push({ phrase: m[0], to });
          break outer;
        }
      }
    }
  }
  return { md: lines.join('\n'), added, related };
}

// ---------------------------------------------------------------- main
fs.mkdirSync(CACHE, { recursive: true });
fs.mkdirSync(CONTENT_DIR, { recursive: true });
fs.mkdirSync(ASSET_DIR, { recursive: true });

const cacheFile = path.join(CACHE, 'posts.json');
if (!fs.existsSync(cacheFile) || process.argv.includes('--refresh')) {
  const hdr = path.join(CACHE, 'headers.txt');
  const body = curl(['-D', hdr, API]);
  const total = /x-wp-total:\s*(\d+)/i.exec(fs.readFileSync(hdr, 'utf8'))?.[1];
  const posts = JSON.parse(body.toString('utf8'));
  if (total !== '45' || posts.length !== 45) throw new Error(`Expected 45 posts, X-WP-Total=${total}, got ${posts.length}`);
  fs.writeFileSync(cacheFile, JSON.stringify(posts));
}
const posts = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
console.log('posts', posts.length);

const oldPathOf = (p) => new URL(p.link).pathname;
const slugMap = new Map(); // old path -> clean slug
for (const p of posts) slugMap.set(oldPathOf(p), cleanSlug(p.slug));
const uniq = new Set(slugMap.values());
if (uniq.size !== posts.length) throw new Error('slug collision after cleaning');

const report = { slugChanges: [], heldLinks: [], unknownLinks: [], addedLinks: {}, images: 0, noHero: [] };
const redirects = [];

function download(url, slug) {
  const dir = path.join(ASSET_DIR, slug);
  fs.mkdirSync(dir, { recursive: true });
  const candidates = [url.replace(/-\d+x\d+(\.[a-z]+)$/i, '$1'), url].filter((v, i, a) => a.indexOf(v) === i);
  for (const c of candidates) {
    let base = decodeURIComponent(c.split('?')[0].split('/').pop()).replace(/[^A-Za-z0-9._-]+/g, '-');
    const ext = path.extname(base);
    if (base.length > 90) base = base.slice(0, 90 - ext.length) + ext;
    const dest = path.join(dir, base);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 0) return base;
    try {
      const buf = curl([c]);
      const head = buf.subarray(0, 16);
      const isImg = head.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff])) || head.subarray(1, 4).toString() === 'PNG' || head.subarray(0, 3).toString() === 'GIF' || head.subarray(8, 12).toString() === 'WEBP' || buf.subarray(0, 300).toString().includes('<svg');
      if (!isImg) continue;
      fs.writeFileSync(dest, buf);
      report.images++;
      return base;
    } catch { /* try next candidate */ }
  }
  console.warn('IMAGE FAILED', url);
  return null;
}

function makeTurndown(slug, ctx) {
  const td = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-', codeBlockStyle: 'fenced', emDelimiter: '*', strongDelimiter: '**', hr: '---', br: '\\' });
  td.use(gfm);
  td.addRule('img', {
    filter: 'img',
    replacement(_c, node) {
      const src = node.getAttribute('src') || '';
      const alt = (node.getAttribute('alt') || '').replace(/[\[\]]/g, '');
      if (!/^https?:\/\//.test(src)) return '';
      const file = download(src, slug);
      if (!file) return '';
      return `![${alt}](../../assets/blog/${slug}/${file})`;
    },
  });
  td.addRule('figcaption', { filter: 'figcaption', replacement: (c) => (c.trim() ? `\n\n*${c.trim()}*\n\n` : '') });
  td.addRule('link', {
    filter: (n) => n.nodeName === 'A' && n.getAttribute('href'),
    replacement(content, node) {
      const href = node.getAttribute('href').trim();
      const inner = content.trim();
      if (!inner) return '';
      // image wrapped in a link to the media file: keep just the image
      if (/wp-content\/uploads/.test(href)) return content;
      let u;
      try { u = new URL(href, 'https://anewyouwoman.com'); } catch { return inner; }
      let out = href;
      if (/(^|\.)anewyouwoman\.com$/.test(u.hostname)) {
        const p = u.pathname.endsWith('/') ? u.pathname : u.pathname + '/';
        if (HELD.has(p)) { ctx.held.push({ href, text: inner }); return inner; }
        if (slugMap.has(u.pathname) || slugMap.has(p)) out = `/${slugMap.get(slugMap.has(u.pathname) ? u.pathname : p)}/`;
        else if (PAGE_MAP[p]) out = PAGE_MAP[p];
        else { ctx.unknown.push(href); out = u.pathname + u.search; }
        out += u.hash;
        ctx.selfLinks.add(out.split('#')[0]);
      }
      return `[${inner}](${out.replace(/\)/g, '%29').replace(/ /g, '%20')})`;
    },
  });
  return td;
}

function normTitle(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim(); }

for (const p of posts) {
  const oldPath = oldPathOf(p);
  const slug = slugMap.get(oldPath);
  if (slug !== p.slug) report.slugChanges.push({ from: oldPath, to: `/${slug}/` });
  const title = stripTags(p.title.rendered);
  const em = p._embedded || {};
  const ctx = { held: [], unknown: [], selfLinks: new Set() };

  // body
  let html = p.content.rendered.replace(/<!--[\s\S]*?-->/g, '').replace(/<h1(\s|>)/gi, '<h2$1').replace(/<\/h1>/gi, '</h2>');
  // editor wrapper items: <li style="list-style-type: none"><ul>...</ul></li> -> <ul>...</ul>
  for (let i = 0; i < 4; i++) html = html.replace(/<li[^>]*list-style-type:\s*none[^>]*>\s*(<[uo]l[\s>][\s\S]*?<\/[uo]l>)\s*<\/li>/gi, '$1');
  // header-less layout tables (call-out boxes) become block quotes
  html = html.replace(/<table[\s\S]*?<\/table>/gi, (t) => (/<th[\s>]/i.test(t) ? t : '<blockquote>' + t.replace(/<\/?(table|tbody|thead|tr)[^>]*>/gi, '').replace(/<td[^>]*>/gi, '<p>').replace(/<\/td>/gi, '</p>') + '</blockquote>'));
  const td = makeTurndown(slug, ctx);
  let md = td.turndown(html).replace(/ /g, ' ').replace(/^# /gm, '## ').replace(/^( *#{2,6} )\*\*(.+?)\*\*\s*$/gm, '$1$2').replace(/\\\n +/g, '\\\n').replace(/\\(\n\s*\n|\n(?=#)|\n*$)/g, '$1').replace(/^ (?=\S)/gm, '').replace(/\n{3,}/g, '\n\n').trim();
  md = md.replace(/^\\\n/gm, '').replace(/^\\$/gm, '');
  // no skipped heading levels (the page H1 is the post title)
  let lastLevel = 1;
  md = md.split('\n').map((l) => {
    const m = /^(#{2,6}) /.exec(l);
    if (!m) return l;
    const lvl = Math.min(m[1].length, lastLevel + 1);
    lastLevel = lvl;
    return '#'.repeat(lvl) + l.slice(m[1].length);
  }).join('\n');
  // a leading heading identical to the title would duplicate the page H1
  const first = /^##\s+(.+)\n+/.exec(md);
  if (first && normTitle(first[1]) === normTitle(title)) md = md.slice(first[0].length);

  // links to service pages (existing words only)
  const svc = addServiceLinks(md, ctx.selfLinks);
  md = svc.md;
  if (svc.added.length) report.addedLinks[slug] = svc.added;
  ctx.held.forEach((h) => report.heldLinks.push({ slug, ...h }));
  ctx.unknown.forEach((h) => report.unknownLinks.push({ slug, href: h }));

  // hero
  const media = em['wp:featuredmedia']?.[0];
  const heroUrl = media?.source_url || p.yoast_head_json?.og_image?.[0]?.url;
  let heroImage = null;
  if (heroUrl) {
    const file = download(heroUrl, slug);
    if (file) heroImage = { src: `blog/${slug}/${file}`, alt: stripTags(media?.alt_text || '') };
  }
  if (!heroImage) report.noHero.push(slug);
  // the template shows the hero above the body, so drop an identical first image from the body
  if (heroImage) {
    const alt = new RegExp('^!\\[[^\\]]*\\]\\(\\.\\./\\.\\./assets/blog/' + heroImage.src.slice(5).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\)\\s*');
    if (alt.test(md)) { md = md.replace(alt, ''); report.droppedDupHero = [...(report.droppedDupHero || []), slug]; }
  }

  // description
  const yoast = p.yoast_head_json?.description?.trim();
  const description = yoast ? decode(yoast) : trimDescription(stripTags(p.excerpt.rendered));

  // taxonomy
  const terms = (em['wp:term'] || []).flat();
  const categories = terms.filter((t) => t.taxonomy === 'category' && t.slug !== 'uncategorized').map((t) => decode(t.name));
  const tags = terms.filter((t) => t.taxonomy === 'post_tag').map((t) => decode(t.name)).filter((t) => !t.includes('#') && !/weight-lVisceral/.test(t));

  const pub = p.date.slice(0, 10);
  const upd = p.modified.slice(0, 10);
  const fm = ['---', `title: ${yamlStr(title)}`, `description: ${yamlStr(description)}`, `pubDate: ${pub}`];
  if (upd > pub) fm.push(`updatedDate: ${upd}`);
  fm.push(`author: ${yamlStr(AUTHOR)}`, `oldUrl: ${yamlStr(oldPath)}`);
  if (heroImage) fm.push(`heroImage:`, `  src: ${yamlStr(heroImage.src)}`, `  alt: ${yamlStr(heroImage.alt)}`);
  fm.push(`categories: ${JSON.stringify(categories)}`, `tags: ${JSON.stringify(tags)}`);
  if (svc.related) fm.push(`relatedService: ${yamlStr(svc.related)}`);
  if (svc.added.length) fm.push(`addedLinks: ${JSON.stringify(svc.added)}`);
  fm.push('---', '');
  fs.writeFileSync(path.join(CONTENT_DIR, `${slug}.md`), fm.join('\n') + '\n' + md + '\n');

  if (slug === p.slug) continue; // posts stay at their live root URL; only changed slugs need a redirect
  redirects.push({ from: oldPath, to: `/${slug}/` });
  // WordPress also answers the decoded form of the path (with the emoji variation selector)
  const decoded = decodeURIComponent(oldPath);
  if (decoded !== oldPath) redirects.push({ from: decoded, to: `/${slug}/` });
}

fs.mkdirSync(path.dirname(REDIRECTS), { recursive: true });
fs.writeFileSync(REDIRECTS, JSON.stringify(redirects, null, 2) + '\n');
fs.writeFileSync(path.join(CACHE, 'report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ ...report, addedLinks: Object.keys(report.addedLinks).length }, null, 1));
