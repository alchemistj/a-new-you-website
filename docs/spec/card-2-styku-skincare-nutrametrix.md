# Card 2: Styku, IMAGE Skincare and nutraMetrix pages

Source of truth: Cindy's written answers, `docs/reference/cindy-answers-2026-11-03.md` (section 1).
Copy rules: `docs/spec/brief.md`. The live pages' real copy moves over cleaned. Cindy's supplied
sentences go in **word for word**. Write nothing else new.

Files this card may change: the new `src/data/pages/styku.ts`, `src/data/pages/image-skincare.ts` and
`src/data/pages/nutrametrix.ts`; `src/assets/pages/styku/`, `src/assets/pages/image-skincare/` and
`src/assets/pages/nutrametrix/`; `src/data/nav.ts`; `tests/copy/` and `tests/nav.test.ts`. Card 1 is
editing `weight-loss.ts`, `memberships.ts`, `semaglutide.ts`, `vaginal-wellness.ts` and `home.ts` in
parallel; don't touch them.

Pattern: copy an existing page file such as `biote.ts` (template `company`) for the shape. Each file
exports `page: PageCopy` (`src/types/page.ts`). These pages keep their **live URLs**, so `oldUrls: []`
and no redirects.

## 1. Styku: `/styku/` (template `service`)

- Source: the live page `https://anewyouwoman.com/styku/`. Fetch it with `curl -A "Mozilla/5.0"`.
  The audit is in `docs/reference/anewyouwoman-site-audit-2026-11-02.md`.
- **Lead with Cindy's description, word for word**: "Styku 3D body scanning helps us track changes in
  body measurements and estimated body composition over time, giving patients a broader view of their
  progress than weight alone."
- Present it as part of the clinic's weight-management and wellness programs, with one sentence or
  link to `/weight-loss/` and `/subscription-plans/`. Cindy: they use the Styku V5 "as part of
  body-composition assessment and progress monitoring within our weight-management and wellness care".
- **Remove or reword any live claim** that a scan replaces a medical evaluation, measures bone density,
  or gives *exact* body fat. Use "estimated".
- The live page has no H1, so give it one: "Styku 3D Body Scanning in Springfield, MO".
- Hero photo: the live page's above-the-fold image. Related: weight-loss, memberships.

## 2. IMAGE Skincare: `/image-skincare/` (template `company`)

- The live page presents the clinic as carrying the IMAGE Skincare line. **Cindy: avoid presenting the
  clinic as exclusively an IMAGE Skincare practice or implying we stock the entire IMAGE line.** They
  are moving to their own selected and private-label products.
- **Lead with her wording, word for word**: "We offer professional skincare products selected to
  support your skin's needs and your treatment plan. Contact the clinic for current product
  availability and personalized recommendations."
- H1: "Professional Skincare in Springfield, MO". SEO title along those lines. Keep the URL.
- From the live page, keep only general clinical-skincare paragraphs that don't claim the full IMAGE
  line. **Drop** "Our Favorite Products" and any product lineup or "carries the Image Skincare line"
  sentence. Spell the brand "IMAGE" when it's mentioned, at most once and not as the clinic's identity.
- Add a contact CTA. Related: aesthetics, botox.

## 3. nutraMetrix: `/nutrametrix/` (template `company`)

- Source: the live page. Keep its real copy, cleaned.
- **Add Cindy's framing**: present supplements as individually selected products, with availability and
  recommendations handled through the clinic. Add "Supplements are not included in membership dues."
  (Her wording: "They are not automatically included in membership dues.")
- The four live product entries can stay as they are. External product links to nutrametrix.com may
  stay as plain external links.
- Related: weight-loss, memberships.

## 4. Navigation

- Add all three to `nav.ts` where they fit, at minimum the footer company list next to Biote and
  Memberships. Labels: "Styku 3D Body Scan", "Professional Skincare", "nutraMetrix". Header quick
  links stay as they are.
- Update `tests/nav.test.ts` if needed. All nav links must point at published routes.

## 5. Done means

- `npm run check`, `npm run lint` (files you touched), `npm test`, `npm run build` and `git diff --check`
  all pass.
- Design QA per `docs/spec/build-contract.md`: screenshot `/styku/`, `/image-skincare/` and
  `/nutrametrix/` at 390 and 1440 with `scripts/perf/design-qa-shoot.cjs`, look at them, and compare with
  the live pages. The hero photo must be present and the layout must have no big gaps.
- Every change is logged in each page's `changes` array.
