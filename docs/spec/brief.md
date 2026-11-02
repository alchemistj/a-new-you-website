# Brief: A New You Women's Clinic website (Astro migration)

Josh, 2 Nov 2026.

**Goal:** move anewyouwoman.com off WordPress onto Astro, clean up the URLs, and tune the existing pages
to Cindy's service priorities. No new pages.

## Facts (the only facts the site may state)

These come from the live site, confirmed by Josh. Rule 0.2 applies: never add a fact that isn't here or on
the live page being migrated.

- Name: **A New You Women's Clinic**. Always use this spelling, not "Woman's" or "A New You Clinic".
- Address: 1426 E Bradford Pkwy, Suite C, Springfield, MO 65804
- NAP phone: **(417) 605-2153**, `tel:+14176052153`. This is the only phone number on the site. There is
  no call tracking or DNI.
- Email: info@anewyouwoman.com
- Founder: Lucinda "Cindy" Sparks, MSN, CNM, APRN. 23 years in healthcare and 13 years in women's
  health. Use these numbers everywhere; /about/ wrongly says 22/12.
- Location: Springfield, Missouri only. Remove every mention of Oklahoma.
- Service area as the live pages show it: Springfield, Nixa, Ozark, Republic, Rogersville.
- Hours: not shown. Don't add them.
- Insurance: "We DO NOT TAKE INSURANCE" (FAQ). Keep that FAQ.
- Award (Josh, 2 Nov 2026; BBB announces it 3 Nov): **2026 BBB Torch Award for Ethics Winner**. Show it
  first in the trust bar on every page, and in the footer badges. Use text only until Cindy sends the
  official BBB winner logo; never draw or fake a BBB logo. Confirm the exact wording against BBB's
  announcement.
- Women and men: women's health is the focus, but men can use the hormone, weight-loss, metabolic,
  healthy-aging, peptide, aesthetic, skin and body-contouring services. Vaginal wellness is women only.
  (From Cindy's list.)
- Social:
  - https://www.instagram.com/anewyouwomens/
  - https://www.facebook.com/profile.php?id=100092594507782
  - BBB https://www.bbb.org/us/mo/springfield/profile/medical-spa/a-new-you-womens-clinic-0734-1000043236
- Canonical host: `https://anewyouwoman.com` (apex). `www` and `http` redirect to it, as today.

## Integrations (keep them, all loaded late)

| Thing | Value | How |
|---|---|---|
| Booking (primary CTA) | `https://anewyouwomensclinic.myaestheticrecord.com/online-booking` | Plain link, label "Schedule an Appointment" (today's wording) |
| Contact form | GoHighLevel form `https://link.aestheticrecord.com/widget/form/H2deelST8Z9WKwPJ5WTe` (+ `form_embed.js`) | Deferred iframe on the contact page, reserved height, `<noscript>` link. **Not Central Forms**: Josh keeps her GHL form so leads land where they do today. |
| Quiz | GHL survey `https://link.aestheticrecord.com/widget/survey/NgxRM6NWFTi1Q8AS8XFU` | Deferred iframe on the homepage, as today |
| Chat | LeadConnector `https://beta.leadconnectorhq.com/loader.js`, `data-widget-id="6a15ba601ce15bb9e91d6259"` | Injected on first interaction (scroll, pointer, key, touch), never on load |
| Analytics | GA4 `G-NNLFN2N0VY` (hard-coded gtag, no GTM) | Load gtag after `load` + 3 s, or on first interaction, whichever comes first (SOP §7) |
| Financing | Cherry `https://files.withcherry.com/widgets/widget.js` | Deferred, financing page only |
| Map | Google Maps embed for the address | Deferred, contact page |
| Video | YouTube `VhBl3dHT5SY`, Vimeo `805690936` | Click-to-load facade |

## Pages and URLs (published set)

| Slug | New route | Old URL(s) | Template |
|---|---|---|---|
| home | `/` | `/` | home |
| weight-loss | `/springfield/weight-loss/` | `/weight-loss-in-springfield/` | service |
| semaglutide | `/springfield/semaglutide/` | `/semaglutide-in-springfield-mo/` | service |
| botox | `/springfield/botox/` | `/botox-in-springfield-mo/` | service |
| aesthetics | `/springfield/aesthetics/` | `/aesthetics/` | service |
| cryolipolysis | `/springfield/cryolipolysis/` | `/cryolypolysis/` | service |
| menopause | `/springfield/menopause/` | `/menopause/`, `/thyroid-optimization/`, `/pcos-management/` | service |
| perimenopause | `/springfield/perimenopause/` | `/perimenopause/` | service |
| vaginal-wellness | `/springfield/vaginal-wellness/` | `/vaginal-rejuvenation/` | service |
| female-sexual-dysfunction | `/springfield/female-sexual-dysfunction/` | `/female-sexual-disfunction-disorder/` | service |
| mens-health | `/springfield/mens-health/` | `/mens-health/` | service |
| biote | `/biote/` | `/biote/` | company |
| memberships | `/memberships/` | `/subscription-plans/` | company |
| financing | `/financing/` | `/financing/` | company |
| about | `/about/` | `/about/` | company |
| customer-reviews | `/customer-reviews/` | `/customer-reviews/` | reviews |
| contact | `/springfield/contact/` | `/contact/` | contact |
| faq | `/springfield/faq/` | `/faq/` | faq |
| blog | `/blog/` (index, `/blog/page/N/`), posts stay at their current root URL `/<slug>/` | `/blog/`, 45 posts at root | blog |

**Blog posts keep their exact current URLs** (Josh, 2 Nov). Only 3 ugly slugs change, each with a 301:
`/unveiling-the-ppotential-of-ppeptides-for-wweight-lloss/` and the two `%ef%b8%8f` emoji slugs (Botox,
cryolipolysis).

**Held. Not built until Cindy answers:** `/styku/`, `/image-skincare/`, `/nutrametrix/`. Don't build pages,
redirects or links for them yet. Don't link them from the nav, footer or body.

**Dropped, each with a 301:**
- `/upcoming-events/`, `/events/` and its 6 children, `/placeholder/`, `/ticket-receipt/`,
  `/ticket-details/` → `/`
- `/category/*`, `/tag/*`, `/author/*` → `/blog/`
- `/blog/page/N/` → `/blog/` unless the new blog paginates at the same paths

## Navigation (Cindy's priority order)

- Header quick links, in this order:
  1. Vaginal Wellness → `/springfield/vaginal-wellness/`
  2. Menopause → `/springfield/menopause/`
  3. Weight Loss → `/springfield/weight-loss/`
  4. Men's Health → `/springfield/mens-health/`
- Top bar: About, FAQs, Blog, Contact.
- Header phone, and the primary CTA "Schedule an Appointment" linking to the booking URL.
- Mobile: logo, Call button, hamburger. Bottom bar: Call + Schedule.
- Footer: every published service page, plus Biote, Memberships, Financing, Customer Reviews, About,
  FAQ, Blog and Contact. Show address, phone, email, socials and the BBB link.

## Copy rules for this project

- Existing copy moves word for word. Allowed cleanup:
  - Remove Lorem ipsum, placeholder text, the placeholder phone `+62 123 456 789` and placeholder logos.
  - Remove the Black Friday coupon, the "#ShareASale" text and the "0 lbs" counter.
  - Fix typos ("Perimenopaus", "Disfunction", "Newslater", "LEarn", "Allright", "Want Know More").
  - Fix wrong meta tags (Oklahoma, Rybelsus/Wegovy on /about/, cavitation on /customer-reviews/,
    hormone pellets on /faq/).
  - Write a title and meta description only where they are missing or wrong.
  - Log every change in the page's `changes` array.
- **Cindy's focus.** Her services list (`docs/reference/anewyouwoman-services-from-cindy.md`) is
  client-supplied copy. Its headings, service names and concern bullets may be added to the matching
  existing page, word for word. Nothing else new may be written.
- **Vaginal wellness page.** Remove every ThermiVa and "laser vaginal tightening" mention. Add Cindy's
  vaginal wellness, VTone, FormaV, Morpheus8V and Combination EmpowerRF sections. Keep the rest of the
  existing page.
- **Memberships.** Keep the prices exactly as the live site shows them, even where the math is off.
  Don't fix them; log the mismatch in `changes`.
- **Reviews.** Individual reviews only: first name + last initial. No star ratings, review counts or
  aggregateRating anywhere.
- Medical wording: keep Cindy's hedges ("may include", "when clinically appropriate"). Never add
  outcome promises.
