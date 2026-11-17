# Card 4: Urinary incontinence page

Josh approved this on Nov 17, 2026. Build a new service page from Cindy's copy. Urinary incontinence and vaginal wellness are her top local SEO priority (`docs/reference/services-and-seo-priorities-from-cindy-2026-11-16.md`).

## Copy

`docs/client/urinary-incontinence-copy-from-cindy.md`. Use it **word for word**: no rewording, no added sentences, no removed sentences. Keep her bold and italic lines. Keep her long dashes; they are her voice. Keep her sign-off "In the Meantime Stay Beautiful & Be Well." The only allowed change is mapping her headings and paragraphs onto the page's section kinds.

## Page

- New file `src/data/pages/urinary-incontinence.ts`, slug `urinary-incontinence`, route `/urinary-incontinence/`, `publish: true`. Use the same `PageCopy` shape as `src/data/pages/vaginal-wellness.ts`.
- SEO title: `Urinary Incontinence in Springfield, MO | A New You`. The meta description and H1 come from the copy file.
- Hero: reuse an existing photo that suits a women's health consult, from the vaginal-wellness or menopause page images, with honest alt text. The primary CTA is the standard booking link (Schedule an Appointment), as on other service pages.
- Body: map her H2 sections to `prose` sections, her H3 subsections to `cards` or `prose` (whichever renders headings and paragraphs best), and her bullet lists to `list` sections.
- "Sources and Further Reading": a list section with her 8 links, opening in a new tab with `rel="noopener"`.
- FAQ: add one `faq` section (it gets FAQPage markup) with 4-6 questions. **The answers must be her sentences copied exactly** from the copy file; only the question wording is new. Good candidates:
  - "What is urinary incontinence?"
  - "What is stress incontinence?"
  - "What is urge incontinence?"
  - "Do I need to know what type I have before I call?"
  - "Are VTone, FormaV and Morpheus8V proven cures?" (answer from "Choosing Care That Fits You")
  - "When should I seek care right away?"
- Service JSON-LD like the other service pages, with `areaServed` Springfield.

## Links

- `src/data/nav.ts`: add `'urinary-incontinence': 'Urinary Incontinence'` to `serviceLabels`, right after `'vaginal-wellness'`, so it shows in the footer Services list. Don't change the top menu (`quickLinks`). That's Josh's call.
- Cross-link with the Vaginal Wellness page (`src/data/pages/vaginal-wellness.ts`, route `/vaginal-rejuvenation/`): add `urinary-incontinence` to its `related`, and give the new page `related: ['vaginal-wellness', 'menopause', 'perimenopause']`.
- In the new page, link her mentions of "vaginal wellness" in "Where Vaginal Wellness Fits In" and in the VTone/FormaV/Morpheus8V section to `/vaginal-rejuvenation/`, once each. Link text only; don't change her words.
- Add the page to the sitemap the way other pages are added, if that isn't automatic.

## Don't

- Don't change any other page's copy, the design system, or redirects (except tests that need the new route registered).
- No new images unless one is needed for the hero; prefer an existing one.

## Tests and checks

- Update the existing tests that list routes, nav and pages (e.g. `tests/nav.test.ts`, the page and sitemap tests) so they cover the new page.
- Add a test that checks the new page's FAQ answers each appear word for word in `docs/client/urinary-incontinence-copy-from-cindy.md`.
- Required, all green: `npm test`, `npm run lint`, `npm run build`, `node scripts/build-vercel-json.mjs --check`, `git diff --check`.
