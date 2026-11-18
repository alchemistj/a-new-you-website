# Card 5: Contact form on Central Forms

Josh decided this on Nov 18, 2026. Replace the GoHighLevel iframe on Contact with a native form that posts to Fluid Frame Central Forms. Central Forms emails the lead through Postmark and also upserts the contact into Cindy's GoHighLevel (alchemistj/ff-contact-and-forms-filtering#76). **Don't merge until the Central Forms Architect confirms their side is live.** The preview is fine to build now.

## Contract (from the Central Forms Architect)

- POST JSON to `https://forms.fluidframemarketing.com/api/lead`, from production and from the Vercel preview. No preview relay is needed: Central Forms will allow the preview origin. Production origin: `https://anewyouwoman.com`.
- `siteKey`: `"a-new-you-website"`. `formKey`: `"main-contact"`.
- `clientSubmissionId`: a new UUID per attempt, reused on retry of the same attempt.
- `formStartedAt` (first focus) and `submittedAt`, as ISO strings.
- `pageUrl`, `referrer` (or null), and `utm {source, medium, campaign, term, content}`, read from the URL and the stored first-touch values if the site has them.
- `honeypot`: a visually hidden text field that's empty for real people. Use the same technique as the reference.
- Fields:
  - `name` = first + " " + last (required)
  - `email` (required)
  - `phone` (required)
  - `message`: optional; send `""` when blank
  - `customFields.firstName` and `customFields.lastName`, each `{label, value, type:"text"}`
  - `customFields.servicesInterested`: label **"What Services Are You Interested In?"**, required, single-line text, as on today's form
  - `customFields.smsConsent`: label **"SMS consent"**, value `"Yes"` or `"No"`. Next to the checkbox show this exact current wording, unchanged: *"I Consent to Receive SMS Notifications, Alerts & Occasional Marketing Communication from company. Message frequency varies. Message & data rates may apply. You can reply STOP to unsubscribe at any time."* Unchecked by default and **not** required.
- `rawPayload`: the submitted field values (no extra PII).
- Response: when `ok:true`, show the success message inline in place of the form. When `conversionEligible:true` with an `id`, fire the journey event `lead_form_success` with that id. On a validation or network error, show a plain retry message and keep the user's entries.
- No Turnstile or other CAPTCHA. Central Forms filters spam.

## Reference to copy

Greene Planet's Central Forms client is in `docs/reference/greene-planet-forms/` (`formsLead.ts.txt`, `leadCapture.ts.txt`, with `.txt` added so the build ignores them). Port only what this form needs: the types, `customField` helpers, the endpoint constant and response mapping, retry with the same `clientSubmissionId`, and the honeypot. Leave out the preview relay (`getFormsLeadEndpoint` should always return the public endpoint), unfinished-inquiry, and anything Greene-specific. Delete the reference folder when the port is done.

## Page and UI

- `src/data/pages/contact.ts`: the `{ kind: 'embed', embed: 'ghl-form' }` section becomes the native form. Keep its heading "Leave a Message For us" (live capitalization) and the section id `contact-form`, because the mobile bar and CTAs jump to `#contact-form`.
- The form must be in the server HTML, so it's visible with JavaScript off (Rule 14). JavaScript enhances the submit.
- Labels: "First Name", "Last Name", "Phone", "Email", "What Services Are You Interested In?", "Message (optional)", plus the consent checkbox with the wording above. Mark required fields. Use `autocomplete` attributes, tel and email input types, and a visible focus state. Match the site's existing button and input styles (the Oswald headings and purple primary button). It needs no horizontal scroll at 390px.
- Remove the GHL form embed from `src/components/embeds/embeds.ts` only if nothing else uses it. The `ghl-quiz` link and the `map` and `cherry` embeds stay.
- The Contact page must not load `link.aestheticrecord.com` or `form_embed.js` any more.

## Journey tracking

- Add `lead_form_success` to the event contract (`src/lib/measurement/contract.ts` and the forwarder allowlist in `server/lib/forwardMeasurementCollect.ts`). It carries the same `ff_vid`/`ff_sid`, path and the Central Forms lead id. No PII.
- Send it once per accepted submission.

## Tests and checks

- Unit tests for the payload builder: required fields, `name` = first + last, the two custom fields, smsConsent "Yes"/"No", the empty honeypot, the UUID reused on retry, siteKey and formKey.
- A test that the consent wording matches the exact string above.
- A test that `/contact/` HTML contains the form fields server-side and no `link.aestheticrecord.com/widget/form` iframe.
- Journey: `lead_form_success` is built with the lead id and passes the forwarder allowlist.
- Required, all green: `npm test`, `npm run lint`, `npm run build`, `node scripts/build-vercel-json.mjs --check`, `git diff --check`.
- **Don't** submit a real test lead to Central Forms from your run.
