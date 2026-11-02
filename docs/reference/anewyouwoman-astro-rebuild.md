# Plan: rebuild anewyouwoman.com on the Fluid Frame Astro system

Status: draft for Josh, 2 Nov 2026. Nothing is built yet.

Rules this plan follows (both still in open PRs, not on `main`):
- Astro full build rules and first-frame/PageSpeed SOP: https://github.com/alchemistj/ff-architect/pull/408
  (`docs/sop/astro-full-build-rules.md`, `docs/sop/astro-first-frame-and-pagespeed.md`, `scripts/perf/first-frame-check.mjs`)
- Central Forms contact form SOP: https://github.com/alchemistj/ff-architect/pull/423
  (`docs/sop/central-forms-contact-form.md`)

Merge those two first so every Cursor card can point to the files on `main`.

Client source: Cindy's services list for local SEO, sent to Josh and Charis
(`docs/plans/anewyouwoman-services-from-cindy.md`). It sets nav priority now and is reference for a later
content phase (section 0).

---

## 0. Scope (Josh, 2 Nov 2026)

**Move the existing site off WordPress onto Astro and clean up its URLs. No new pages.**

- Every page that exists today with real content moves over, with a cleaner URL and one 301 from the
  old one.
- Copy moves as it is. Only cleanup is allowed:
  - Remove Lorem ipsum and placeholder blocks.
  - Fix typos.
  - Fix wrong meta tags, e.g. "Oklahoma" and "Rybelsus".
  - Remove the stale Black Friday coupon.

  No rewrites, and no new copy beyond titles and meta descriptions where they are missing or wrong.
- Pages with no real content (placeholder, ticket and event pages) are dropped with a 301.
- Cindy's services list (`docs/plans/anewyouwoman-services-from-cindy.md`) is kept for a later
  content and SEO phase. It shapes the header order now, but no pages are built from it in this
  project.
- Known content gap to flag to Cindy, not fix: the vaginal rejuvenation page describes ThermiVa and
  laser tightening, but her current list is EmpowerRF (VTone, FormaV, Morpheus8V). It migrates as-is
  unless she sends corrected wording.

---

## 1. What's there today (audit, 2 Nov 2026)

**Client:** A New You Women's Clinic, women's health and med spa, 1426 E Bradford Pkwy, Suite C,
Springfield, MO 65804. Phone (417) 605-2153. info@anewyouwoman.com. Founder Lucinda "Cindy" Sparks,
MSN, CNM, APRN. One location.

**Stack:** WordPress, Elementor Pro, Hello Elementor theme, Yoast, ElementsKit, MetForm, Sugar Calendar,
Google-reviews embed plugin, Cloudflare. Homepage HTML is about 147 KB with 43 external scripts and 51
stylesheets.

**Host:** apex is canonical (`https://anewyouwoman.com/`). `www` and `http` 301 to it.

**Inventory:** 130 sitemap URLs.
- 27 pages: 11 core/utility and 16 service/product pages.
- 45 blog posts, from 2023 to 29 Oct 2026. The client still publishes.
- 7 event URLs (Sugar Calendar, all from 2024). There are also 6 categories, 42 tags and 2 authors.

**Integrations**

| Thing | Today | Notes |
|---|---|---|
| Analytics | GA4 `G-NNLFN2N0VY`, hard-coded gtag.js | No GTM, no Google Ads, no Meta pixel |
| Booking | Aesthetic Record: `anewyouwomensclinic.myaestheticrecord.com/online-booking` | Plain external link |
| Contact form | Aesthetic Record (LeadConnector) form iframe on /contact/ | Leads go into their AR/GHL CRM |
| Quiz | AR survey iframe on homepage ("Free 2-Minute Quiz") | |
| Chat | LeadConnector chat widget, every page | |
| Financing | Cherry widget on /financing/ | |
| Reviews | Google reviews embed (shows "5.0, 13 reviews") | Star rating and count are not allowed (Rule 0.2) |
| Newsletter | MetForm email field on /blog/ | Destination unknown |
| Call tracking | None | NAP number only, so no DNI work |
| Video | 1 Vimeo, 4 YouTube embeds | |

**Problems on the live site.** None of these carry over.
- Lorem ipsum on 7 pages, a placeholder phone `+62 123 456 789` on /about/, and logoipsum placeholder logos.
- /thyroid-optimization/ and /pcos-management/ are generic nutrition template pages with no real copy.
  /perimenopause/ is mostly template copy too.
- A stale "Black Friday … make 2025 your best year" coupon sits on the homepage and footer.
  The site also has dead 2024 events and a "0 lbs lost" counter.
- Meta tags don't match their pages. /contact/ says "Oklahoma", /about/ says "Rybelsus & Wegovy",
  and /customer-reviews/ says "ultrasonic cavitation".
- Soft-404 pages are in the sitemap: /placeholder/, /ticket-receipt/ and /ticket-details/.
- Typos: "Perimenopaus", "Disfunction", "cryolypolysis", "Newslater".
- Pages with missing H1s or two H1s.
- Orphan pages: /semaglutide-in-springfield-mo/ (1,091 words), /female-sexual-disfunction-disorder/,
  /thyroid-optimization/ and /pcos-management/.
- Conflicting facts:
  - The homepage says 23 years in healthcare and 13 in women's health. /about/ says 22 and 12.
  - Several membership annual prices don't equal 12 × the monthly price (e.g. HRT $200/mo but $2,100/yr).
- No LocalBusiness/MedicalClinic schema anywhere.

Full audit with every URL: `docs/plans/anewyouwoman-site-audit-2026-11-02.md`.

---

## 2. Decisions Josh needs to make (before the build card)

1. **Repo and hosting.** Recommended: a new standalone repo `alchemistj/anewyouwoman-website` with its own
   Vercel project, like Greene, SRA and Luecke's. That is what the full-build rules assume.
   `ff-astro-demos` is the shared demo host. Use it only if we want a sales demo before the client signs.
   Josh creates or approves the repo and Vercel project.
2. **URL model.** The rules are city-first. Recommended: the primary-city model.
   - `/` is the Springfield home.
   - Services live at `/springfield/<service>/`.
   - Products and company pages stay flat: `/about/`, `/biote/` and so on.
   - Every old URL gets one 301.
   - The alternative is to keep today's mixed URLs (`/botox-in-springfield-mo/` etc.). That means fewer
     redirects but breaks the fleet standard, so it needs an explicit exception from Josh.
3. **Blog.** Rule 15 says old blog posts 301 to service pages. This client is still writing posts
   (latest 29 Oct 2026), so recommended:
   - Migrate all 45 posts into the repo as Markdown (export via the open WP REST API). Serve them at
     `/blog/<slug>/` and fix the bad slugs with 301s.
   - Drop tag, category and author archives, with 301s to `/blog/`.
   - Decide how the client publishes new posts after launch. Either we add them from a doc, or we
     add a git-based CMS later.
4. **Contact form.** The rules require Central Forms. Today leads go straight into Aesthetic Record/GHL.
   - For a straight migration, the least-change option is to keep the AR form iframe, loaded on
     interaction per Rule 10. Leads keep landing where they do today, and no legal pages are needed.
     This needs Josh's OK as an exception to Rule 14.
   - Otherwise, use Central Forms with client email. That requires adding privacy, terms and SMS
     terms pages. Ask whether they want leads pushed into AR/GHL too; that needs a CRM adapter, which
     doesn't exist yet.
   - Keep form fields to name, phone, email, interest and a short message. Don't ask for medical
     details on a marketing form (health privacy).
   - Central Forms DB rows need Josh's SQL approval (SOP §3).
5. **Booking, quiz and chat.** Keep the Aesthetic Record booking as a plain link (the "Book" CTA).
   Recommended: the quiz becomes a link or loads on interaction per Rule 10. The LeadConnector chat
   either goes, or loads on first interaction behind a facade. Confirm the client still uses chat.
6. **Tags.** There's only a hard-coded GA4 tag today. The SOP needs the Google tag to fire at
   Window Loaded + 3 s. Recommended: set up a GTM container for them, with GA4 inside on the delayed
   trigger. If they run ads, who is the Ads manager?
7. **Reviews.** Drop the Google widget and its star/count display. Rebuild with individual reviews
   (first name + last initial) pulled from their Google profile into the brief.
   /customer-reviews/ either becomes a plain reviews page or 301s to `/about/`.
8. **Filler pages.** Thyroid and PCOS are pure template filler, and perimenopause is mostly filler.
   With no new copy in scope, recommended:
   - 301 `/thyroid-optimization/` and `/pcos-management/` to `/springfield/menopause/`. Neither
     condition has real content to move, and Cindy's list doesn't name PCOS.
   - Perimenopause: either keep its few real lines with the filler removed, or 301 it to menopause,
     which already covers perimenopause.
9. **Events.** Recommended: drop Sugar Calendar and the 2024 events. Any "Free Seminars" content can
   be added later as a simple data-driven page.

---

## 3. Inputs we need from the client or team (blocks copy, not engineering)

- Copy: extracted from the live WordPress pages into copy files, cleaned only (section 0). Josh skims
  the cleaned files once; nothing is rewritten.
- Confirmed facts: years of experience, credentials, awards ("2024 Best of Springfield"), BBB, hours
  (none are shown today), service-area towns (Springfield, Nixa, Ozark, Republic, Rogersville),
  and whether Oklahoma is real.
- Current prices and memberships, with the math fixed, or permission to drop prices.
- Photos: licensed, real photos for each page hero, about 1280 px source. Many current images are stock
  with stock alt text.
- Logo as SVG.
- Brand colors (dark, white, primary, accent) and font choice. Device fonts are recommended for a still
  first frame.
- Google Search Console access (Pages export, 12 months) for the redirect map. Also Google Business
  Profile URLs.
- Privacy policy, terms and SMS terms, only if we switch to Central Forms (decision 4).

---

## 4. URL map (existing pages only)

Primary-city model: `/` is the Springfield home. Services move to `/springfield/<service>/`.
Company and product pages stay flat. Every old URL gets one 301 (both slash forms).

| Old URL | New URL | Content today |
|---|---|---|
| `/` | `/` | Real. Remove the coupon and the "0 lbs" counter. One H1. |
| `/weight-loss-in-springfield/` | `/springfield/weight-loss/` | Real, about 1,100 words |
| `/semaglutide-in-springfield-mo/` | `/springfield/semaglutide/` | Real. Orphan today; link it from weight loss. |
| `/botox-in-springfield-mo/` | `/springfield/botox/` | Real |
| `/aesthetics/` | `/springfield/aesthetics/` | Real |
| `/cryolypolysis/` | `/springfield/cryolipolysis/` | Real. Fixes the misspelled slug. |
| `/menopause/` | `/springfield/menopause/` | Real |
| `/perimenopause/` | `/springfield/perimenopause/` | Mostly template copy plus Lorem. See decision 8. |
| `/vaginal-rejuvenation/` | `/springfield/vaginal-rejuvenation/` | Real, but outdated devices (section 0) |
| `/female-sexual-disfunction-disorder/` | `/springfield/female-sexual-dysfunction/` | Real. Fixes the misspelling. |
| `/mens-health/` | `/springfield/mens-health/` | Real |
| `/styku/` | `/springfield/styku-body-scan/` | Real, about 360 words. Needs an H1. |
| `/thyroid-optimization/` | 301, see decision 8 | Template filler only, no thyroid content |
| `/pcos-management/` | 301, see decision 8 | Template filler only, no PCOS content |
| `/biote/` | `/biote/` | Real (product/provider page) |
| `/image-skincare/` | `/image-skincare/` | Real (product page) |
| `/nutrametrix/` | `/nutrametrix/` | Real (product page, links to nutrametrix.com) |
| `/contact/` | `/springfield/contact/` | Real. Remove the Lorem intro. |
| `/faq/` | `/springfield/faq/` | Real Q&A. Remove the Lorem. |
| `/about/` | `/about/` | Partly placeholder: remove the fake phone, Lorem cards and placeholder logos. |
| `/customer-reviews/` | `/customer-reviews/` | Widget only. Rebuilt as individual reviews, no stars or counts (Rule 0.2). |
| `/subscription-plans/` | `/memberships/` | Real. Remove the Lorem and placeholder logos; prices need Cindy's check. |
| `/financing/` | `/financing/` | Thin, Cherry widget. Load it on interaction. |
| `/blog/` and 45 posts at root | `/blog/` and `/blog/<slug>/` | Real. Clean up the bad slugs (e.g. `ppotential-of-ppeptides`). |
| tags, categories, author archives | 301 to `/blog/` | Archives |
| `/upcoming-events/`, `/events/` and 6 event posts | 301 to `/` | Empty or 2024 events |
| `/placeholder/`, `/ticket-receipt/`, `/ticket-details/` | 301 to `/` | Soft 404s |

Result: 23 pages plus the blog, the same as today minus the junk.

The one possible exception is legal pages. A Central Forms contact form with an SMS-consent box needs
privacy, terms and text-messaging terms pages, and the site has none. If the Aesthetic Record form
stays (decision 4), those pages aren't needed.

Header quick links (Rule 5, 3–4 max). Existing pages only, in Cindy's priority order:
1. Women's Sexual Health (vaginal rejuvenation)
2. Menopause
3. Weight Loss
4. Men's Health

Aesthetics, Botox and the product pages go in the footer and on the homepage. The primary CTA is
"Schedule an Appointment" to Aesthetic Record, as today. Phone uses `tel:+14176052153`. Mobile bottom
bar: Call + Schedule.

---

## 5. Build phases and who does what

Dispatch follows `docs/josh-working-rules.md`: Cursor via FF Architect for the build, one card per phase
with a PR. Claude writes specs, writes or places copy, and reviews. Parallel cards never touch the same
files.

**Phase 0: Prep (Claude plus Josh, no code)**
- Merge PR 408 and PR 423.
- Get Josh's answers to section 2.
- Write `docs/spec/anewyouwoman-brief.md` in the new repo: facts, cities, services, colors, CTAs and
  the URL map.
- Build the redirect map: the sitemaps already pulled, plus the Search Console export.
- Export the blog with a script: WP REST API to Markdown, with images downloaded locally.
- Download and sort the current images; flag stock photos to replace.
- Copy files: a script extracts every page's existing text from WordPress into `src/data/` copy files.
  Claude does the cleanup only (Lorem, placeholders, typos, wrong meta, stale coupon) and lists every
  change for Josh.

**Phase 1: Foundation (Cursor card 1)**
- Astro 5 static, Vercel adapter, Tailwind 4, TypeScript strict, Node 22, trailing slashes, inline CSS.
- `cityConfig.ts` (Springfield only, NAP), the route registry, and the shared layout with
  `--content-max: 900px`.
- Header (two bars, hide on scroll, hamburger), footer and mobile bottom bar, all in plain Astro.
- Photo-first hero component with the `.atf-ready` gate, plus an inline logo.
- Gates wired in: copy test, route/redirect tests, phone/NAP test, `first-frame-check.mjs`,
  Playwright checks at 390 and 1440, and a `supabase.co`/remote-image grep.
- Home page built on real copy as the proof page.

**Phase 2: Templates and pages (Cursor cards 2a/2b/2c, run in parallel after Phase 1 merges)**
- 2a: Service template (Rule 11 layout, filled with whatever sections each page's existing copy has),
  plus the 11 service pages in the URL map.
- 2b: Company pages: about, memberships, financing, three product pages, FAQ, reviews and contact.
- 2c: Blog: content collection, index with pagination, post template, Article schema, related-service
  links in posts.

**Phase 3: Contact form (Cursor card 3 plus Josh SQL approval)**
- Central Forms registration: client `a-new-you-womens-clinic`, preview destination first, production
  inactive. The origin is `https://anewyouwoman.com` (apex, since www redirects).
- Form on `/springfield/contact/`, copying the Greene `formsLead.ts` pattern.
- Proof: a real stored row, the email, and same-UUID replay with no duplicate.

**Phase 4: SEO, redirects, embeds (Cursor card 4)**
- `vercel.json` 301s from the map, both slash forms, with a test.
- MedicalClinic/LocalBusiness, Service, FAQPage and BreadcrumbList JSON-LD.
- Sitemap, robots and `llms.txt` generated from the registry.
- Unique titles and descriptions per page.
- Deferred embeds: booking quiz, chat (if kept), Cherry, maps and video facades.

**Phase 5: Verify (Claude)**
- PageSpeed mobile median of 3 on every template: 95+ before merge, with A11y, BP and SEO at 100.
- First-frame check: 5 runs, mobile and desktop, every hero layout.
- Copy word-for-word check, JS-off check, and a manual browser pass at 390 and 1440 px.
- Independent review of the final PR.

**Phase 6: Launch (Josh approves each step)**
- Merge to `main` and deploy production.
- GTM container live with GA4 delayed (whoever owns tags).
- DNS cutover, often through the client's DNS holder or Cloudflare. Confirm WordPress is no longer
  served and the redirects work on production.
- Search Console: submit the new sitemap and watch 404s for 2 weeks. Add the site to PageSpeed
  monitoring.
- Keep the WordPress install reachable on a private URL for 30 days as a rollback and content source.

---

## 6. Risks

- **Rankings:** about 75 URLs move. The Search Console export decides which matter most. Every one gets a
  single 301, with no chains.
- **Medical claims:** compounded semaglutide and hormone copy is regulated territory. Mark it for human
  or legal review. The build never invents claims.
- **Lead flow change:** moving off the AR form changes where leads land. Confirm with the client before
  launch, and run both side by side on preview.
- **Photos are the long pole now.** Each photo hero needs a good local image at about 1280 px. The
  current WordPress uploads get reused where they're good enough; anything weak is flagged, not
  blocked on.
- **Outdated content moves too.** The vaginal page's devices and the membership prices are copied
  as they are today. Flag them to Cindy so she can correct them after launch.
