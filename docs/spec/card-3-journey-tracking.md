# Card 3: journey tracking (Rule 14.1)

Josh approved this on Nov 9, 2026. Add first-party journey tracking so FF Reports can show
how a visitor got to a call or a booking. The FF Architect Astro build rules say a launch
without it is not done (`alchemistj/ff-architect` `docs/sop/astro-full-build-rules.md`,
Rule 14.1).

## Reference to copy

Copy the pattern from **`alchemistj/sra-roofing-website`** (main). A copy of every file you
need is in this repo at `docs/reference/sra-journey-tracking/`, with `.txt` added to each
name; see the README there. Use that copy, not a tracker written from scratch. Delete the
folder once the port is done.

- `middleware.ts`: sets the `ff_vid` and `ff_sid` cookies, the bot marker and the entry tags
- `src/lib/measurement/` (`bootstrap.ts`, `collect.ts`, `contract.ts`, `engaged.ts`,
  `identity.ts`, `interactions.ts`, `automation.ts`) plus `src/lib/attribution/storage`,
  which `collect.ts` imports
- `api/site-events.ts` and `server/lib/forwardMeasurementCollect.ts`: the same-origin
  endpoint that forwards to `https://ff-reports-analytics.vercel.app/api/measurement/collect`

Take only what this site needs. Leave out ServiceTitan, GTM, the SRA lead forms and the
SRA-only validators.

## What this site needs

- **siteKey:** `a-new-you-website`. Production host: `anewyouwoman.com`. Replace every SRA
  host and key.
- **Identity cookies:** `ff_vid` (180 days) and `ff_sid` (30 minutes, renewed on each page
  load), set by `middleware.ts` on HTML page requests only. Never set them on assets,
  `/_astro/`, images or `/api/`, and never for bots (set the 2-minute `ff_bot=1` marker
  instead). The site is `output: 'static'` with `@astrojs/vercel`. Use Vercel Routing
  Middleware at the repo root, the way SRA does, and write it as `middleware.ts`.
- **Events**, each with `ff_vid`, `ff_sid`, path, `entry` (when set), channel and
  `automation`:
  - `page_view` on every page, plus the `engaged` follow-up (reuse the same `eventId`)
    after the first scroll, tap, key press or 10 seconds visible
  - `click_to_call` on every `tel:` link (CallButton, trust bar, mobile bottom bar,
    footer, financing fallback), with `ctaLocation`
  - `contact_click` on every link to `/contact/`, with `ctaLocation` (`header`,
    `mobile_menu`, `hero`, `cta_band`, `main`, `footer`, `sticky_bar`)
- **Not in this job:**
  - `lead_form_success` and passing session IDs into the form. The contact form is
    GoHighLevel's cross-origin iframe, so we can't see submissions. Josh agreed to skip
    this for now.
  - `scheduler_opened`. "Schedule an Appointment" is a plain link to Aesthetic Record's
    booking page, not a booking widget.
  - `text_click`. The site has no `sms:` links.
  - GBP entry-tag vanity paths. Keep the entry-cookie code, but add no vanity redirects
    until Josh gives us the Business Profile link.
- **Channel:** keep the session's first channel in sessionStorage. `anewyouwoman.com` and
  the preview host never count as referrals.
- **No PII** in any event. The browser posts only to `/api/site-events`, never to FF
  Reports directly.
- **Performance:** send events after load with `sendBeacon` or keepalive fetch. Nothing may
  delay first paint or the `.atf-ready` hero gate. The middleware must not stop Vercel
  serving pages from its cache.

## Tests and checks

- Unit tests (vitest, under `tests/`) covering these:
  - each event is built once, with the `ff_vid` visitor ID, `ff_sid` session ID and path,
    and no PII
  - the middleware sets the cookies on HTML only, never on assets, `/api/` or bots, and
    sets `ff_bot=1` for bots
  - the forwarder sends `x-ff-client-user-agent` and forces `siteKey` to
    `a-new-you-website`
  - `engaged` reuses the page view's `eventId`
- Required checks, all green: `npm test`, `npm run lint`, `npm run build`,
  `node scripts/build-vercel-json.mjs --check`, `git diff --check`.
- Don't change page copy, `src/data/pages/*`, design or redirects.
