# Card 1: Vaginal & Pelvic-Floor Wellness page, memberships and pricing

Source of truth: Cindy's written answers, `docs/reference/cindy-answers-2026-11-03.md` (sections 2–4).
Copy rules: `docs/spec/brief.md`. Her supplied sentences go in **word for word**. Write nothing else new
except the three draft sentences in §1.4, which are marked for Cindy's approval.

Files this card may change: `src/data/pages/vaginal-wellness.ts`, `src/data/pages/memberships.ts`,
`src/data/pages/weight-loss.ts`, `src/data/pages/semaglutide.ts`, `src/data/pages/home.ts` (only if it
repeats a price or tightening claim), `tests/copy/`. Nothing else. Card 2 is editing `nav.ts` and new
page files in parallel; don't touch them.

## 1. Vaginal wellness page (`vaginal-wellness.ts`, route stays `/vaginal-rejuvenation/`)

1. **Heading.** The patient-facing heading becomes **"Vaginal & Pelvic-Floor Wellness"**. Use it for
   the hero H1, as "Vaginal & Pelvic-Floor Wellness in Springfield, MO", and for the main section
   heading. Update `seo.title` to match. The route and URL don't change.
2. **Intro.** Use Cindy's suggested intro, word for word, as the first prose section:
   "At A New You Women's Clinic in Springfield, Missouri, vaginal and pelvic-floor wellness begins with
   a personal consultation. Our EmpowerRF platform includes VTone, FormaV, and Morpheus8V. Your provider
   evaluates your concerns and recommends an individualized treatment plan, including which treatment,
   if any, is appropriate for you."
3. **Technology must match the treatment.** Anywhere a treatment is described, it must say:
   - VTone: electrical muscle stimulation and neuromuscular re-education for pelvic-floor
     rehabilitation. VTone is **not** radiofrequency.
   - FormaV: temperature-controlled radiofrequency heating.
   - Morpheus8V: fractional radiofrequency treatment using microneedling.
   - EmpowerRF is the platform name, not a treatment.

   Fix every live sentence that contradicts these. For example, the "EmpowerRF Includes:" list and the
   "What to Expect" steps. Also check Cindy's own list headings: "FormaV Radiofrequency Treatment" and
   "Morpheus8V RF Microneedling" are fine, and "VTone Pelvic Floor Muscle Stimulation" is fine. No
   "laser" anywhere on the page. Run `grep -i laser` on the file and expect zero hits.
4. **No blanket promises.** Remove tightening, restored-function and guaranteed-result promises:
   - Hero subhead "Non-Surgical Vaginal Tightening, EmpowerRF, and Feminine Wellness…" is replaced by
     draft line A below.
   - "EmpowerRF technology for deeper, more comprehensive results" in "Why Choose" is removed.
   - Review every sentence that says what treatment *does*. Keep descriptive and concern language, and
     reword only promises, using "may help" + "after your evaluation".

   Laxity and tightness concerns **stay**: Cindy's concern lists name "vaginal laxity", "tissue laxity"
   and "decreased sensation", and women search for them. Use these three draft lines, each marked in
   `changes` as **"DRAFT — needs Cindy approval"**:
   - A (hero subhead): "Non-surgical care for leakage, laxity, dryness and intimacy concerns."
   - B (after the intro): "Many women notice vaginal laxity, leaking or dryness after childbirth or
     menopause. Depending on your evaluation, treatments such as VTone, FormaV or Morpheus8V may help."
   - C (FAQ, add one item): Q "Can treatment help with vaginal looseness?" A "It may. Your provider will
     evaluate your concerns and explain which treatment, if any, is appropriate for you. Results vary."
5. **Price.** Leave "$1,500 to $3,500…" exactly as is. Cindy is being asked; it may change later.
6. Keep the rest of the page: Cindy's concern grid, reviews, process and service area.

## 2. Memberships page (`memberships.ts`, route `/subscription-plans/`)

1. **Remove completely**, with every annual and non-member comparison:
   - Hormone Replacement Therapy Subscription Plan ($200/month), its pricing section and the line
     about medication included
   - Weight Loss Subscription Plans: Semaglutide $333, Bella Plus $309.75, Olympia $337.75
   - Aesthetic Services Subscription Plan ($150/month: quarterly Botox, monthly Hydrafacial, annual
     filler) and its pricing
2. **The three core memberships, exactly:**
   - **Weight Loss Membership: $99/month.** Medically supervised weight management, follow-up,
     education, and progress monitoring. Add: "$75 setup fee and a three-month minimum commitment."
     These terms are for this plan **only**.
   - **Hormone Optimization Membership: $99/month.** Ongoing hormone management, treatment monitoring,
     and provider follow-up.
   - **Total Wellness Membership: $149/month.** Combined weight-management, hormone-optimization, and
     broader wellness oversight.

   Keep any existing live benefit bullets for these three only if they don't promise unlimited labs or
   included medication. Lab wording must not imply every panel is included. If a bullet is unclear,
   drop it and log it.
3. **Add this sentence, word for word**, right after the membership cards: "Membership fees cover the
   medical management and benefits specified in the selected plan. Medications, hormone pellets,
   supplements, and separately priced procedures are additional unless expressly included."
4. **Hold for Cindy, not published:** Vaginal Wellness Membership, Peptide Optimization (Add-On),
   Skin Health Maintenance Membership and Advanced Skin Health Membership. Remove them from the page
   and record in `changes` that they're held pending approved prices and terms. Don't invent prices.
5. Remove the "Aesthetic Memberships" cards heading if nothing is left under it.

## 3. Same rules on other pages

- **`weight-loss.ts`:**
  - Membership prices must match: $99 Weight Loss, $149 Total Wellness. Add the $75 setup fee and
    3-month minimum wherever the Weight Loss Membership price appears.
  - Remove any "medication included" or unlimited-lab wording. Cindy's earlier list said "Annual
    laboratory testing"; keep it only as written in her services list, and don't expand it.
  - **Styku:** "Your exact body fat percentage" becomes "Your estimated body composition". Make sure
    nothing says a scan replaces a medical evaluation or measures bone density. Where Styku is
    introduced, use Cindy's sentence word for word: "Styku 3D body scanning helps us track changes in
    body measurements and estimated body composition over time, giving patients a broader view of
    their progress than weight alone."
- **`semaglutide.ts`:** medication "starts at $100 for 1 mL" is a treatment cost and can stay. Make
  the membership line say $99 plus the setup fee and minimum. Add the dues-vs-treatment sentence once
  near the cost section. Remove any "about $199" total if it now conflicts. Log it.
- **`home.ts`:** only if it repeats an old price or a tightening promise.

## 4. Tests

In `tests/copy/`, add assertions that:
- no page contains "laser" in the vaginal-wellness page, nor "ThermiVa", "$333", "$309.75", "$337.75",
  "Bella Plus", "Olympia" or "$200 per month"
- the memberships page contains "$75 setup fee" and the dues sentence
- VTone is never described with "radiofrequency"

## 5. Done means

- `npm run check`, `npm run lint` (files you touched), `npm test`, `npm run build` and `git diff --check`
  all pass.
- Design QA per `docs/spec/build-contract.md`: screenshot `/vaginal-rejuvenation/`,
  `/subscription-plans/`, `/weight-loss/` and `/semaglutide/` at 390 and 1440 with
  `scripts/perf/design-qa-shoot.cjs`, look at them, and fix gaps or broken layout. Say in the report
  what you looked at.
- Every change is logged in each page's `changes` array.
