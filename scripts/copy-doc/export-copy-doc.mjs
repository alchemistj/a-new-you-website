// Exports every page's visible words into one HTML file shaped for a Google Doc
// (page H1 = Heading 1, section headings = Heading 2, card/FAQ/list titles = Heading 3).
//   node scripts/copy-doc/export-copy-doc.mjs [out.html]
// Default output: docs/client/website-copy.html — commit it as the baseline, so edits made in the
// Google Doc can be diffed against exactly what was sent (export the Doc as HTML or text and compare).
// Uses Vite's SSR loader so the page files (TypeScript, import.meta.glob) load as in the build.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const root = fileURLToPath(new URL('../..', import.meta.url));
const out = process.argv[2] ?? new URL('../../docs/client/website-copy.html', import.meta.url);

// Page order in the doc: home, then Cindy's priority services, other services, company pages.
const ORDER = [
  'home', 'vaginal-wellness', 'menopause', 'perimenopause', 'weight-loss', 'semaglutide', 'mens-health',
  'female-sexual-dysfunction', 'botox', 'aesthetics', 'cryolipolysis', 'styku', 'biote', 'memberships',
  'financing', 'image-skincare', 'nutrametrix', 'about', 'customer-reviews', 'faq', 'contact',
];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// Copy strings may carry [label](/path/) links and <strong>/<em>/<a href> (see src/lib/rich.ts).
// Root-relative links become full URLs so they work inside a Google Doc.
const abs = (href) => (href.startsWith('/') ? `https://anewyouwoman.com${href}` : href);
const rich = (s) => {
  let h = esc(s);
  h = h.replace(/&lt;(\/?)(strong|em|b|i)&gt;/g, '<$1$2>');
  h = h.replace(/&lt;a href="([^"]+)"&gt;(.*?)&lt;\/a&gt;/g, (_, href, t) => `<a href="${abs(href)}">${t}</a>`);
  h = h.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, href) => `<a href="${abs(href)}">${t}</a>`);
  return h;
};
const p = (s) => `<p>${rich(s)}</p>`;
const label = (name, s) => `<p><b>${esc(name)}:</b> ${rich(s)}</p>`;
const note = (s) => `<p><i>[${esc(s)}]</i></p>`;
const EMBEDS = { 'ghl-form': 'Contact form', 'ghl-quiz': 'Quiz', cherry: 'Cherry financing widget', map: 'Google Map' };

function section(s) {
  const o = [];
  const h = (lvl, t) => t && o.push(`<h${lvl}>${rich(t)}</h${lvl}>`);
  switch (s.kind) {
    case 'prose':
      h(2, s.heading);
      s.paragraphs.forEach((x) => o.push(p(x)));
      break;
    case 'list':
      h(s.source === 'cindy' ? 3 : 2, s.heading);
      if (s.intro) o.push(p(s.intro));
      o.push(`<ul>${s.items.map((x) => `<li>${rich(x)}</li>`).join('')}</ul>`);
      if (s.outro) o.push(p(s.outro));
      break;
    case 'cards':
      h(2, s.heading);
      if (s.intro) o.push(p(s.intro));
      for (const c of s.cards) {
        h(3, c.title);
        if (c.text) o.push(p(c.text));
      }
      break;
    case 'steps':
      h(2, s.heading);
      if (s.intro) o.push(p(s.intro));
      o.push(`<ol>${s.steps.map((x) => `<li><b>${rich(x.title)}</b>${x.text ? ` — ${rich(x.text)}` : ''}</li>`).join('')}</ol>`);
      break;
    case 'review':
      o.push(`<p><i>“${rich(s.quote)}”</i> — ${esc(s.name)}${s.city ? `, ${esc(s.city)}` : ''}</p>`);
      break;
    case 'faq':
      h(2, s.heading);
      for (const it of s.items) {
        h(3, it.q);
        it.a.forEach((x) => o.push(p(x)));
      }
      break;
    case 'pricing':
      h(2, s.heading);
      if (s.intro) o.push(p(s.intro));
      for (const plan of s.plans) {
        h(3, plan.name);
        o.push(`<ul>${plan.lines.map((x) => `<li>${rich(x)}</li>`).join('')}</ul>`);
      }
      if (s.note) o.push(p(s.note));
      break;
    case 'video':
      h(2, s.heading);
      o.push(note(`Video: ${s.title}`));
      break;
    case 'embed':
      h(2, s.heading);
      if (s.intro) o.push(p(s.intro));
      o.push(note(`Embedded: ${EMBEDS[s.embed] ?? s.embed}`));
      break;
    case 'badges':
      h(2, s.heading);
      o.push(note('Award and badge logos'));
      break;
    case 'stat':
      h(2, s.heading);
      o.push(p(`${s.value}${s.unit ? ` ${s.unit}` : ''}`));
      break;
    case 'cta':
      h(2, s.heading);
      (s.paragraphs ?? []).forEach((x) => o.push(p(x)));
      break;
    default:
      o.push(note(`Unhandled section: ${s.kind}`));
  }
  return o.join('\n');
}

const server = await createServer({
  root,
  logLevel: 'error',
  appType: 'custom',
  server: { middlewareMode: true, hmr: false, watch: null },
  optimizeDeps: { noDiscovery: true },
});

try {
  const { publishedPages } = await server.ssrLoadModule('/src/data/pages/index.ts');
  const nav = await server.ssrLoadModule('/src/data/nav.ts');
  const { site, awards, poundsLost } = await server.ssrLoadModule('/src/data/site.ts');
  const bySlug = new Map(publishedPages.map((pg) => [pg.slug, pg]));
  const ordered = [...ORDER.filter((s) => bySlug.has(s)), ...publishedPages.map((pg) => pg.slug).filter((s) => !ORDER.includes(s))];
  const byRoute = new Map([...nav.footerCompanyLinks, ...nav.topBarLinks].map((l) => [l.href, l.label]));
  const labelFor = (slug) =>
    slug === 'home' ? 'Home' : nav.serviceLabels[slug] ?? byRoute.get(bySlug.get(slug)?.route) ?? bySlug.get(slug)?.hero.h1 ?? slug;

  const parts = [
    '<html><head><meta charset="utf-8"></head><body>',
    `<p><b>A New You Women’s Clinic: website copy</b></p>`,
    p('Every page of the new website, in order. Each page starts after a line with its web address. The big heading (Heading 1) is the page’s main headline; Heading 2 is a section; Heading 3 is a card, list title or FAQ question. Lines in [brackets] mark things that are not text (videos, forms, logos). “SEO title” and “Meta description” are what Google shows in search results.'),
    p('Please edit the words directly in this document. Do not use Suggesting mode, and please keep the headings and the order of pages, so we can match every change back to the website.'),
  ];

  for (const slug of ordered) {
    const pg = bySlug.get(slug);
    parts.push('<hr>');
    parts.push(`<p><b>PAGE: ${esc(labelFor(slug))}</b> — anewyouwoman.com${esc(pg.route)}</p>`);
    parts.push(label('SEO title', pg.seo.title));
    parts.push(label('Meta description', pg.seo.description));
    if (pg.hero.eyebrow) parts.push(label('Small line above headline', pg.hero.eyebrow));
    parts.push(`<h1>${rich(pg.hero.h1)}</h1>`);
    if (pg.hero.subhead) parts.push(p(pg.hero.subhead));
    parts.push(label('Main button', pg.hero.primaryCta?.label ?? site.booking.label));
    for (const s of pg.sections) parts.push(section(s));
    if (pg.related?.length) parts.push(label('Related services links', pg.related.filter((r) => bySlug.has(r)).map(labelFor).join(', ')));
  }

  parts.push('<hr>');
  parts.push('<h1>Site-wide text (header, trust bar, footer, buttons)</h1>');
  parts.push('<h2>Header</h2>');
  parts.push(label('Top bar', ['Serving Springfield, MO', ...nav.topBarLinks.map((l) => l.label)].join(' · ')));
  parts.push(label('Main menu', nav.quickLinks.map((l) => l.label).join(' · ')));
  parts.push(label('Header button', site.booking.label));
  parts.push('<h2>Trust bar (under every page headline)</h2>');
  parts.push(p([...awards.map((a) => a.label), site.founder.name, `${poundsLost} lbs lost with A New You`, `Call ${site.phone.display}`].join(' · ')));
  parts.push('<h2>Phone bottom bar</h2>');
  parts.push(p(`${site.phone.mobileLabel} · Chat · Schedule`));
  parts.push('<h2>Footer</h2>');
  parts.push(label('Column headings', 'Services · Company'));
  parts.push(label('Services links', Object.entries(nav.serviceLabels).filter(([s]) => bySlug.has(s)).map(([, l]) => l).join(' · ')));
  parts.push(label('Company links', nav.footerCompanyLinks.map((l) => l.label).join(' · ')));
  parts.push('</body></html>');

  writeFileSync(out, `${parts.join('\n')}\n`);
  console.log(`wrote ${typeof out === 'string' ? out : fileURLToPath(out)}: ${ordered.length} pages`);
} finally {
  await server.close();
}
