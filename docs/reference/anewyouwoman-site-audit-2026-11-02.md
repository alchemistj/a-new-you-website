# anewyouwoman.com: live site audit (for Astro rebuild)

Audit date: 2026-11-02. Method: curl with User-Agent `Mozilla/5.0`, no JavaScript rendering, no browser, no Lighthouse. Raw files: `scratchpad/anyw/` (`sitemaps/`, `pages/` = raw HTML for 29 pages, `text/` = derived visible-text dumps). Parsers are in `scratchpad/scripts/`.

Scope limits: 29 HTML pages fetched (all 27 page-sitemap URLs plus `/blog/` and `/events/`). The 45 blog posts and 6 event posts are listed from sitemaps but not fetched. Widgets that render with JavaScript (Cherry, Aesthetic Record forms, Google review embed, LeadConnector chat, Sugar Calendar) were checked only by their markup, not visually. Anything not checked is marked **unverified**.

Word counts are visible-text counts that include header and footer chrome (roughly 120 to 200 words per page), so body-only counts are lower.

## Headline findings

- Stack: WordPress with Elementor 4.3.5 and Elementor Pro 3.31.2, theme Hello Elementor 3.5.1, Yoast SEO, ElementsKit Lite 4.0.9, MetForm 4.3.3, Sugar Calendar Lite 3.16.0, Embedder for Google Reviews. Served behind Cloudflare.
- Canonical host is the apex `https://anewyouwoman.com/`. `www` and `http` both 301 to it.
- Only one analytics ID is present: GA4 `G-NNLFN2N0VY`. There is no GTM container, Google Ads tag, Meta pixel or call tracking.
- Booking runs on Aesthetic Record (`anewyouwomensclinic.myaestheticrecord.com/online-booking`). Chat is LeadConnector (GoHighLevel).
- Placeholder and template content is still live: Lorem ipsum on 7 pages, placeholder phone `+62 123 456 789` on /about/, placeholder logos, and two "Coming Soon / link not valid" pages in the sitemap.
- Stale items: a 2025 Black Friday coupon on the homepage (today is 2026-11-02), and 2024 event posts.
- Some subscription price lines do not reconcile (monthly x 12 does not equal the annual figure; see section 4).

## 1. URL inventory

### robots.txt (200)
```
User-agent: *
Disallow:

Sitemap: https://anewyouwoman.com/sitemap_index.xml
```
No Disallow rules. Yoast-generated.

### Sitemaps
- `/sitemap_index.xml` returns 200 and is the only sitemap entry point.
- `/sitemap.xml` and `/wp-sitemap.xml` return 301 (not followed).
- The index lists 6 child sitemaps:

| Child sitemap | lastmod | URLs |
|---|---|---|
| `https://anewyouwoman.com/post-sitemap.xml` | 2026-10-29 | 46 (45 posts + `/blog/`) |
| `https://anewyouwoman.com/page-sitemap.xml` | 2026-10-10 | 27 pages |
| `https://anewyouwoman.com/sc_event-sitemap.xml` | 2024-12-04 | 7 event URLs |
| `https://anewyouwoman.com/category-sitemap.xml` | 2026-10-29 | 6 categories |
| `https://anewyouwoman.com/post_tag-sitemap.xml` | 2026-10-29 | 42 tags |
| `https://anewyouwoman.com/author-sitemap.xml` | 2025-03-31 | 2 authors |

Total: 130 URLs.

### Pages (27 in page-sitemap.xml; lastmod in brackets)

Core:
- `https://anewyouwoman.com/` [2026-08-19]
- `https://anewyouwoman.com/about/` [2025-05-13]
- `https://anewyouwoman.com/contact/` [2026-10-08]
- `https://anewyouwoman.com/faq/` [2025-10-21]
- `https://anewyouwoman.com/customer-reviews/` [2025-10-21]
- `https://anewyouwoman.com/financing/` [2024-08-29]
- `https://anewyouwoman.com/subscription-plans/` [2026-02-27]
- `https://anewyouwoman.com/upcoming-events/` [2026-03-17]
- `https://anewyouwoman.com/placeholder/` [2023-06-23]
- `https://anewyouwoman.com/ticket-receipt/` [2024-11-22]
- `https://anewyouwoman.com/ticket-details/` [2024-11-22]

Services and treatments (16):
- `https://anewyouwoman.com/perimenopause/` [2025-07-14]
- `https://anewyouwoman.com/menopause/` [2025-10-29]
- `https://anewyouwoman.com/weight-loss-in-springfield/` [2026-08-19]
- `https://anewyouwoman.com/semaglutide-in-springfield-mo/` [2026-10-10]
- `https://anewyouwoman.com/botox-in-springfield-mo/` [2026-08-19]
- `https://anewyouwoman.com/mens-health/` [2025-10-16]
- `https://anewyouwoman.com/cryolypolysis/` [2025-10-21]
- `https://anewyouwoman.com/aesthetics/` [2026-02-25]
- `https://anewyouwoman.com/vaginal-rejuvenation/` [2025-10-29]
- `https://anewyouwoman.com/female-sexual-disfunction-disorder/` [2025-07-14]
- `https://anewyouwoman.com/thyroid-optimization/` [2023-05-17]
- `https://anewyouwoman.com/pcos-management/` [2023-05-18]
- `https://anewyouwoman.com/styku/` [2025-10-21]
- `https://anewyouwoman.com/biote/` [2025-10-29]
- `https://anewyouwoman.com/image-skincare/` [2025-10-21]
- `https://anewyouwoman.com/nutrametrix/` [2025-10-21]

### Blog
Index: `https://anewyouwoman.com/blog/` (lastmod 2026-10-29). Pagination exists: `https://anewyouwoman.com/blog/page/2/` returns 200.

Posts (45), with lastmod:
1. https://anewyouwoman.com/cryolipolysis-coolsculpting%ef%b8%8f-is-it-right-for-me/ (2023-08-31)
2. https://anewyouwoman.com/botox%ef%b8%8f-botulinum-toxin-type-a-why-inject-poison-into-your-body/ (2023-08-31)
3. https://anewyouwoman.com/semaglutide-and-other-glucagon-like-peptide-1-glp-1-receptor-agonist-what-is-all-the-hype-about/ (2023-09-01)
4. https://anewyouwoman.com/a-pound-is-a-pound-but-not-all-pounds-are-equal/ (2023-09-01)
5. https://anewyouwoman.com/menowhat/ (2023-09-01)
6. https://anewyouwoman.com/bio-identical-hormones-a-safer-alternative-to-traditional-hormones/ (2023-11-28)
7. https://anewyouwoman.com/bioidentical-hormones-a-preferable-option-for-hormone-balance/ (2023-11-28)
8. https://anewyouwoman.com/unlocking-the-fountain-of-youth-exploring-hormones-for-anti-aging/ (2023-11-28)
9. https://anewyouwoman.com/unveiling-the-power-of-glutathione-the-ultimate-antioxidant-peptide/ (2023-11-28)
10. https://anewyouwoman.com/unveiling-the-ppotential-of-ppeptides-for-wweight-lloss/ (2023-11-28)
11. https://anewyouwoman.com/micc-the-skinny-on-the-skinny-shot/ (2023-12-26)
12. https://anewyouwoman.com/the-perfect-all-inclusive-anti-aging-plan-for-women-of-all-ages/ (2024-05-14)
13. https://anewyouwoman.com/7-reasons-why-every-woman-needs-hormone-peptide-therapies/ (2024-05-14)
14. https://anewyouwoman.com/unveiling-the-power-of-peptides-boosting-your-immune-system-naturally/ (2024-11-26)
15. https://anewyouwoman.com/the-cardiovascular-benefits-of-bio-identical-hormone-replacement-therapy/ (2024-11-26)
16. https://anewyouwoman.com/sleep-your-way-to-a-healthier-weight-the-surprising-link-between-sleep-and-obesity/ (2025-01-07)
17. https://anewyouwoman.com/the-importance-of-protein-for-preventing-muscle-wasting-as-we-age/ (2025-01-07)
18. https://anewyouwoman.com/show-your-heart-some-love-this-valentines-day/ (2025-02-25)
19. https://anewyouwoman.com/unlocking-a-healthier-heart-the-science-of-cardiovascular-wellness/ (2025-02-25)
20. https://anewyouwoman.com/the-elephant-in-the-room-why-women-need-to-speak-up-about-incontinence/ (2025-03-04)
21. https://anewyouwoman.com/80-20-what-does-this-really-mean-and-how-can-you-apply-it-to-weight-loss/ (2025-05-13)
22. https://anewyouwoman.com/peptides-for-weight-loss/ (2025-05-13)
23. https://anewyouwoman.com/lets-talk-about-it-incontinence-aging-and-getting-your-confidence-back/ (2025-07-14)
24. https://anewyouwoman.com/empower-your-confidence-transform-vaginal-wellness-with-inmode/ (2025-07-14)
25. https://anewyouwoman.com/beyond-kegels-real-solutions-for-urinary-incontinence-and-pelvic-floor-weakness/ (2025-07-14)
26. https://anewyouwoman.com/revitalize-your-intimate-health-understanding-vaginal-changes-with-age-and-how-empower-by-inmode-can-help/ (2025-07-14)
27. https://anewyouwoman.com/sermorelin-and-other-amazing-peptides/ (2025-07-14)
28. https://anewyouwoman.com/female-sexual-dysfunction/ (2025-07-14)
29. https://anewyouwoman.com/the-gut-brain-axis-how-your-digestive-health-shapes-your-mind-and-body/ (2025-07-14)
30. https://anewyouwoman.com/understanding-the-mthfr-gene/ (2025-07-14)
31. https://anewyouwoman.com/latest-medical-treatments-for-weight-loss/ (2025-07-14)
32. https://anewyouwoman.com/genes-arent-destiny/ (2025-07-14)
33. https://anewyouwoman.com/gut-microbiota-and-its-connection-to-weight-loss/ (2025-07-14)
34. https://anewyouwoman.com/diet-advice-you-already-knew-but-needed-to-hear-again/ (2025-07-14)
35. https://anewyouwoman.com/the-benefits-of-bioidentical-hormone-replacement-therapy/ (2025-07-14)
36. https://anewyouwoman.com/built-to-serve-but-still-human-how-first-responders-can-reclaim-energy-strength-and-vitality/ (2025-08-07)
37. https://anewyouwoman.com/understanding-incontinence-what-it-is-why-it-happens-and-what-you-can-do-about-it/ (2025-08-15)
38. https://anewyouwoman.com/fall-into-rejuvenation-with-morpheus8/ (2025-09-15)
39. https://anewyouwoman.com/glp-1s-what-youre-hearing-vs-what-you-need-to-know/ (2026-04-05)
40. https://anewyouwoman.com/what-glp-1-medications-wont-fix-but-you-still-have-to-understand/ (2026-04-12)
41. https://anewyouwoman.com/why-medical-weight-loss-works-when-everything-else-has-failed/ (2026-04-26)
42. https://anewyouwoman.com/weight-loss-is-not-about-eating-less-it-is-about-eating-better/ (2026-05-19)
43. https://anewyouwoman.com/successful-weight-loss-needs-more-than-a-scale/ (2026-05-27)
44. https://anewyouwoman.com/hormone-therapy-its-time-to-rethink-what-youve-been-told/ (2026-06-08)
45. https://anewyouwoman.com/what-is-estrogen-your-guide-from-head-to-hoo-ha/ (2026-10-29)

Taxonomy and other types:
- Categories (6): `/category/upcoming-events/`, `/category/health-and-wellness/`, `/category/uncategorized/hormone-optimization/`, `/category/peptides/`, `/category/uncategorized/`, `/category/weight-loss/`.
- Tags (42): `/tag/` plus a-new-you-womens-clinic, anewyouwomensclinic, anti-aging, appetite-control, bhrt, bio, biohacking, bioidentical, bioidenticalhrt-... (long slug), fat, fat-loss, fat-weight-lvisceral, functional-medicine, glp-1, hormone-health, hormone-imbalance, hormone-replacement, hormones, immune-boost, insulin-resistance, lean-muscle, medical-weight-loss, menopause, metabolic-health, metabolism, morpheus8, naturalhormonetherapy, obesity-treatment, ozempic, peptide-therapy, peptides, perimenopause, renewal, semaglutide, skinny-shot, sleep, supplementation, sustainable-weight-loss, tirzepatide, visceral, weight-loss, weight-loss-clinic. All under `https://anewyouwoman.com/tag/`.
- Authors (2): `https://anewyouwoman.com/author/lucinda/` (2025-03-31), `https://anewyouwoman.com/author/anewyouwomen/` (2023-07-30).

### Events (Sugar Calendar sc_event sitemap, 7 URLs)
- `https://anewyouwoman.com/events/` (2024-12-04) (index)
- `https://anewyouwoman.com/events/hormone-optimization/` (2024-11-25)
- `https://anewyouwoman.com/events/anti-aging-12-12-24/` (2024-11-25)
- `https://anewyouwoman.com/events/hormone-optimization-12-03-24/` (2024-11-25)
- `https://anewyouwoman.com/events/kick-the-sugar-12-19-24/` (2024-11-25)
- `https://anewyouwoman.com/events/hormone-optimization-seminar/` (2024-12-04)
- `https://anewyouwoman.com/events/anti-aging-seminar/` (2024-12-04)

### Link status checks
- All 22 page URLs checked returned 200. These cover every menu and footer target plus the orphan pages.
- `/about` 301 to `/about/`. `/botox-in-springfield-mo` 301 to the trailing-slash form.
- `/Botox-in-Springfield-MO/` (mixed case) returns 200.
- A nonexistent path returns 404.
- Not fetched: the individual blog and event post URLs (only `/blog/page/2/`, `/events/`, and `/events/anti-aging-seminar/` were checked). Their HTTP status is **unverified** beyond those.

## 2. Navigation

### Main menu (header, ElementsKit `menu-mainmenu`)
- **Services** (dropdown, parent href="#")
  - Women's Sexual Health: `/vaginal-rejuvenation/`
  - Weight Loss Treatments: `/weight-loss-in-springfield/`
  - Menopause: `/menopause/`
  - Men's Health: `/mens-health/`
  - Cryolypolysis: `/cryolypolysis/`
  - Aesthetics: `/aesthetics/`
  - Styku: `/styku/`
- **Products** (dropdown, parent href="#")
  - BioTe: `/biote/`
  - Image Skincare: `/image-skincare/`
  - nutraMetrix: `/nutrametrix/`
- **Financing** (dropdown, parent href="#")
  - Financing: `/financing/`
  - Subscription Plans: `/subscription-plans/`
- **About** (dropdown, parent `/about/`)
  - "About" child with href="#" (duplicate of the parent)
  - Customer Reviews: `/customer-reviews/`
  - FAQ: `/faq/`
- **Blog**: `/blog/`
- **Contact**: `/contact/`
- Header CTA: "Schedule an Appointment" to `https://anewyouwomensclinic.myaestheticrecord.com/online-booking`

Not in the main menu: Botox, Perimenopause, Thyroid, PCOS, Semaglutide, Upcoming Events, and Events.

### Footer, homepage variant
- Contact block: address, phone, email, Instagram, Facebook.
- Quick Links: About, FAQ, Blog, Contact, Customer Reviews.
- Our Services (10): Perimenopause, Menopause, Weight Loss Treatments, Men's Health, Cryolypolysis, Aesthetics, Botox, Women's Sexual Health, Biote, Styku.
- BBB profile link.
- Copyright: "All rights Reserved. a New You Women's Clinic", then "#ShareASale", then the Black Friday coupon text.

### Footer, inner-page variant
- Quick Links: About, FAQ, Blog, Contact, Customer Reviews.
- Our Products: BioTe, Image Skincare, nutraMetrix.
- Our Services (9): Perimenopause, Menopause, Weight Loss Treatments, Men's Health, Cryolypolysis, Aesthetics, Botox, Women's Sexual Health, Biote. Styku is absent.
- Copyright: "Allright Reserved. anewyouwoman" (typo).

### Inbound links (internal)
- Pages with no inbound links from the nav or footer, or from any other page: `/events/` (and its child event pages, linked only from the sitemap), `/upcoming-events/`, `/placeholder/`, `/ticket-receipt/`, `/ticket-details/`.
- Pages linked only from their own URL (orphans): `/semaglutide-in-springfield-mo/`, `/thyroid-optimization/`, `/pcos-management/`, `/female-sexual-disfunction-disorder/`.
- `/female-sexual-dysfunction/` (correct spelling) is a blog post, linked from one post.

## 3. Per-page SEO and content

Word count is visible text including chrome. H2 counts are for the H2 headings found in the raw HTML.

| URL | Title tag | Meta description | H1 | Words | H2s / sections |
|---|---|---|---|---|---|
| `/` | A New You Women's Clinic \| Med Spa in Springfield, MO | Semaglutide, Botox & hormone therapy in Springfield, MO. A New You Women's Clinic — personalized care. Schedule your consult today. | "A New You Women's Clinic" (logo) and "Take Control of How You Age" (two H1s) | 549 | Symptom list ("Are You Tired of ..."), free 2-minute quiz CTA, "Pounds Lost With A New You" counter (static value 0 lbs), "It's Time to Take Back Your Health", service cards (Weight Loss, Aesthetics, Menopause, Female Sexual Dysfunction, Men's Health), "Our Process" (5 steps), "Meet Lucinda Sparks, Founder", "Free Seminars", "The Latest Info" (3 blog posts), awards images, footer with coupon |
| `/about/` | Best Rybelsus & Wegovy Medical Weight Loss Clinic | Are you searching for the professional Rybelsus & Wegovy medical weight loss clinic? Visit our Mounjaro clinic today, which is famous for weight loss programs. | "Our team of experts is dedicated to helping you achieve your health goals" | 385 | "LEarn More About Us" (typo), Our Vision, Our Value, "Lets Consultation" block with phone `+62 123 456 789` (placeholder), Lorem ipsum in 3 credential cards, placeholder logos `logoipsum-*.png` |
| `/contact/` | Contact Us for Hormone Replacement Therapy in Oklahoma | Get in touch with us at A New You Woman's Clinic for safe and secure hormone replacement therapy services in Oklahoma and Springfield, MO. Contact us now! | "Get In Touch" | 183 | "Leave a Message For us" with Lorem ipsum intro, address, phone, email, Aesthetic Record form (iframe), Google Maps embed |
| `/faq/` | FAQs - Answers to Your Hormone Pellets for Women Questions | Discover comprehensive answers about hormone pellets for women at A New You Woman's Clinic FAQ page. Get insights into hormone pellet therapy, benefits, & more! | "Want Know More About Weight Loss" | 458 | Q&A list (insurance: "We DO NOT TAKE INSURANCE", itemized bill provided), YouTube embed, Lorem ipsum (2) |
| `/customer-reviews/` | Customer Reviews about Ultrasonic Cavitation Treatment | Discover what customers say about our effective ultrasonic cavitation & radio frequency hydra skin tightening facials benefits. Read the real testimonials now! | "read what our clients have to say" | 351 | Google review widget (10 reviews visible), 79 images |
| `/financing/` | Financing - A New You Women's Clinic | (none) | "Financing" | 132 | Heading only, plus Cherry widget (not visible in static HTML). Thin. |
| `/subscription-plans/` | Subscription Plans for Ozempic & Medspa in Springfield MO | Discover our exclusive subscription plans featuring semaglutide, medspa, and ozempic treatments in Springfield, MO, which help to elevate your wellness journey. | "MEMBERSHIPS" and "Hormone Replacement Therapy Subscription Plan" (two H1s) | 1279 | How Membership Works, Medical Memberships (Total Wellness, Weight Loss, Hormone Optimization, Vaginal Wellness), Peptide Optimization add-on, Aesthetic Memberships (Skin Health Maintenance, Advanced Skin Health), price blocks (section 4), logoipsum placeholder logos (4), Lorem ipsum (4) |
| `/upcoming-events/` | Upcoming Events - A New You Women's Clinic | (none) | "Upcoming Events" | 134 | No events listed |
| `/events/` | Events – A New You Women's Clinic | (none) | "Events" | 172 | Sugar Calendar filters; "There are no events scheduled that match your criteria." Not linked from the site. |
| `/placeholder/` | Placeholder - A New You Women's Clinic | (none) | none | 8 | "Coming Soon!" only. Returns 200 and is in the page sitemap. |
| `/ticket-receipt/` | Ticket Receipt - A New You Women's Clinic | (none) | "This link is not valid" | 29 | Sugar Calendar ticket page. Returns 200 (soft 404). In the page sitemap. |
| `/ticket-details/` | Ticket Details - A New You Women's Clinic | (none) | "This link is not valid" | 29 | Same as above. |
| `/perimenopause/` | Perimenopause Treatment for Sleep Disturbance Disorder | Check out our comprehensive perimenopause treatment solutions to alleviate sleep disturbance disorder & enhance your well-being. Book your appointment with us! | "Perimenopaus" (truncated) | 531 | Service Key Features, Our Services; body is template copy ("weight loss plan", "Personal Coach Team") plus Lorem ipsum (7) |
| `/menopause/` | Effective Menopause Emotional Symptoms Treatment | Are you suffering from menopausal weight gain issues? Check out our safe and secure menopause emotional symptom treatment at A New You Women's Clinic. Call us! | "You Don't Have to Suffer Just Because It's Normal." | 585 | What is perimenopause?, What is menopause?, Hormone Replacement Therapy; testimonial quotes (approximate, unverified count) |
| `/weight-loss-in-springfield/` | Weight Loss in Springfield, MO \| A New You Women's Clinic | Semaglutide, tirzepatide & weight loss peptides in Springfield, MO. Medical weight loss clinic — A New You Women's Clinic. | "Weight Loss in Springfield, MO" | 1094 | Why Your Body Isn't Responding to Diets Anymore, Medical Weight Loss Personalized for Women, Our Medical Memberships (prices, section 4), Real Women. Real Results., Is Semaglutide Right for You?, What to Expect, 3D Body Scanning and Data-Driven Plans, How We Support You Beyond the Scale, Free Weight Loss Consultation, FAQs |
| `/semaglutide-in-springfield-mo/` | Semaglutide Springfield MO \| A New You Clinic | Professional semaglutide treatment in Springfield, MO. Our experienced team creates customized weight loss plans to help you succeed. Schedule today! | "Semaglutide in Springfield, MO" | 1091 | Medical Weight Loss, Semaglutide for Women, Is Semaglutide Right for You?, Treatment Start to Finish, Semaglutide Costs (section 4), Why Women Choose, FAQ. Orphan page. |
| `/botox-in-springfield-mo/` | Botox in Springfield, MO \| A New You Women's Clinic | Botox treatments in Springfield, MO at A New You Women's Clinic. Reduce fine lines & wrinkles with expert, personalized care. Schedule today. | "Botox in Springfield, MO" | 1189 | What Is Botox Really?, Why Wrinkles Show Up, What Botox Can Help With, patient testimonials, Treatment Areas, Botox vs Dysport vs Xeomin, How Much Does Botox Cost (no figure given), What to Expect, Results Timeline, Fillers or Skin Tightening, Botox for Men and Women, Why Choose A New You?, Book Your Botox Appointment |
| `/aesthetics/` | Aesthetic Treatments in Springfield, MO \| A New You Clinic | Aesthetic treatments in Springfield, MO, offering clinically guided, non-surgical solutions for skin, wrinkles, fat, and body contouring. | "Aesthetic Treatments in Springfield, MO" | 487 | "We offer the following aesthetic treatments:" list (see section 4) |
| `/cryolypolysis/` | Cryolipolysis Fat Freezing & Body Slimming Treatments | Achieve your non surgical body contouring goals with the help of our non invasive cryolipolysis fat freezing, reduction, and body slimming treatments. Call us! | "cryolipolysis the best way for body slimming" | 548 | "How cryolipolysis works", "Multiple treatment areas", "Where does the fat go?" |
| `/mens-health/` | Men's Health in Springfield, MO \| A New You Clinic | Feeling off? A New You Clinic helps men restore performance and confidence with testosterone therapy, anti-aging peptides, ED support, and weight loss. | "Men's Health in Springfield, MO" | 1141 | Testosterone Optimization, Real Stories. Real Change. (testimonials), Erectile Support & Sexual Performance Solutions, Medical Weight Loss for Men, Comprehensive Men's Health Labs & Assessments, Why Men Choose A New You Clinic, Your Next Step? Book Now |
| `/vaginal-rejuvenation/` | Vaginal Rejuvenation in Springfield, MO \| A New You Woman's Clinic | Struggling with leaking, dryness, or discomfort after childbirth or menopause? A New You Women's Clinic offers vaginal rejuvenation in Springfield, MO. | "Vaginal Rejuvenation In Springfield, MO" | 1013 | Non-Surgical Vaginal Tightening / EmpowerRF, Laser Vaginal Tightening, Common Reasons, How Much Does Feminine Rejuvenation Cost? (price range, section 4), ThermiVa vs EmpowerRF, What to Expect, Testimonials from Real Women, Why Choose, Book a Private Consultation |
| `/female-sexual-disfunction-disorder/` | Female Sexual Dysfunction Disorder Clinic in Springfield MO | We are here to provide effective female sexual dysfunction disorder treatments at "A New You Women's Clinic," which helps to improve your quality of life. | "Female Sexual Disfunction Disorder" (misspelled) | 1042 | "Today we're going to face the elephant in the room", "Lifestyle and home remedies". Slug also misspelled. YouTube embed. Orphan page. |
| `/thyroid-optimization/` | Thyroid Optimization - A New You Women's Clinic | (none) | "Thyroid Optimization" (H1 repeated twice) | 339 | Template copy only: "Our Services", "Service Key Features", "Our nutrition experts will create a customized meal plan"; Lorem ipsum (10). No thyroid-specific content found. Orphan page. |
| `/pcos-management/` | PCOS Management - A New You Women's Clinic | (none) | "PCOS Management" (H1 repeated twice) | 339 | Same template as thyroid page (Lorem ipsum 10). Heading typo "PCOS Managment". Orphan page. |
| `/styku/` | Styku 3D Body Scanner - Transforming Your Wellness Journey | Experience the future of body scanning with Styku to achieve your wellness goals with precision measurements and personalized insights. Visit right now! | none (no H1 element) | 362 | Assess & Stratify Health Risk, Fitness, Health |
| `/biote/` | Biote Certified Provider - Unlock Hormonal Optimization | Optimize your hormones with BioTE. A New You Women's Clinic is a certified BioTE provider and can help you discover your path to hormone optimization. | "Your Certified BioTE Provider in Springfield, MO" | 383 | What is Hormone Replacement Therapy?, How Can BioTE Help Improve Your Well-Being?, video (Vimeo), quote attributed to Dr. Cory Rice (BioTE Medical) |
| `/image-skincare/` | Image Skincare - A New You Women's Clinic | (none) | "Image Skincare \| A New You Woman's Clinic Carries the Image Skincare Line for Your Healthiest Skin" | 539 | Clinical Skincare, Image Skincare, Our Favorite Products, Discover Your Customized Skincare Routine. 11 images. |
| `/nutrametrix/` | nutraMetrix - A New You Women's Clinic | A New You Woman Clinic proudly provides high-quality products from nutraMetrix to help support your healthy lifestyle. Order conveniently online or during your next appointment. | "nutraMetrix \| Proudly Offering nutraMetrix® Products" | 706 | Four product entries (Ultimate Aloe, Isotonix Digestive Enzymes with Probiotics, NutriClean 7-Day Cleansing System with Stevia, Tower+ Pure Whey Protein Isolate + Creatine). Product links point to nutrametrix.com. |
| `/blog/` | Explore Blogs for Sermorelin & Phentermine Injections | Explore the potential of sermorelin and phentermine injections along with the breakthrough tirzepatide for weight loss through our informative blogs. Read now! | "Subscribe Our Newslater To Get Latest Updated & Discount sale" (typo; the H1 is newsletter copy, not the title) | 3802 | 25 post excerpts with "Keep Reading"/"Read More" links, email newsletter form. Page 2 exists. |
| `/events/` | Events – A New You Women's Clinic | (none) | "Events" | 172 | See above |

Notes on the remaining rows:
- Missing meta descriptions: `/thyroid-optimization/`, `/pcos-management/`, `/financing/`, `/image-skincare/`, `/upcoming-events/`, `/events/`, `/placeholder/`, `/ticket-receipt/`, `/ticket-details/`.
- Meta descriptions that do not match the page: `/about/` (Rybelsus/Wegovy/Mounjaro), `/contact/` (Oklahoma), `/faq/` (hormone pellets vs H1 "Weight Loss"), `/customer-reviews/` (ultrasonic cavitation and RF facials; the page body is only the review widget).

## 4. Business facts as displayed

- Name: "A New You Women's Clinic". Variants: "A New You Woman's Clinic", "A New You Clinic" (titles of men's health, semaglutide and aesthetics pages), "A New You Women's Clinic" in the logo alt text.
- Address: 1426 East Bradford Parkway, Springfield, MO 65804 (footer and /contact/). The sidebar on inner pages and the /contact/ map embed read "1426 E Bradford pkwy suite C Springfield, MO 65804". Google Maps short link: https://goo.gl/maps/m4w6fkpJnfVJbMfV7
- Phone: (417) 605-2153 in most places. Footers show "(417)605-2153". /contact/ shows "+ (417)605-2153" with tel link "+(417)605-2153". /about/ shows placeholder "+62 123 456 789".
- Email: info@anewyouwoman.com
- Hours: none displayed anywhere on the site. The only hits were the Sugar Calendar weekday filter and the phrase "Free Consultation 24 Hours". Unverified whether a Google Business Profile shows hours.
- Staff and credentials as displayed:
  - Lucinda Sparks, MSN, CNM, APRN. Founder. 23 years in healthcare and 13 years in women's health (homepage, vaginal, semaglutide, blog bylines). /about/ says "22 years in healthcare, and 12 years in women's health", which conflicts.
  - Blog bylines use "Lucinda 'Cindy' Sparks".
  - /weight-loss-in-springfield/ says "A personal consultation with Lucinda Sparks, APRN".
  - Reviews and testimonials refer to "Cindy" without a surname. Inferred to be Lucinda "Cindy" Sparks; unverified.
  - Dr. Cory Rice is quoted on /biote/ as Chief Clinical Advisor for BioTE Medical. He is presented as a third-party source, not as clinic staff.
  - No other provider names displayed.
- Social links:
  - Instagram: https://www.instagram.com/anewyouwomens/
  - Facebook: https://www.facebook.com/profile.php?id=100092594507782 (footer, most pages) and https://www.facebook.com/people/A-New-You-Womens-Clinic/100092594507782/ (header/contact)
  - BBB: https://www.bbb.org/us/mo/springfield/profile/medical-spa/a-new-you-womens-clinic-0734-1000043236
- Locations: Springfield, MO only. Service-area text on /vaginal-rejuvenation/ names Springfield, Nixa, Ozark, Rogersville. /mens-health/ names Springfield, Nixa, Ozark, Republic. The /contact/ meta mentions Oklahoma (meta title and description only; no Oklahoma text in the body). Treat Oklahoma as a stale or incorrect claim unless the owner confirms otherwise.
- Awards: homepage images with alt text "2024 Best of Springfield Award" and "A new you names top 3 business rate". Image content unverified.
- Affiliate: footer "#ShareASale" text on the homepage.

### Services and treatments listed
- Women's health: Women's Sexual Health (vaginal rejuvenation, EmpowerRF, Laser Vaginal Tightening, ThermiVa comparison), Menopause, Perimenopause, Female Sexual Dysfunction, Hormone Replacement Therapy, Hormone Optimization membership, PCOS and thyroid pages (template content only).
- Weight loss: Weight Loss Treatments, Semaglutide, tirzepatide and "weight loss peptides" (copy), Bella Plus and Olympia programs (subscription pages), Sermorelin (blog).
- Men's health: Testosterone Optimization, Erectile Support, Medical Weight Loss for Men, Men's labs and assessments.
- Aesthetics: Botox (Botox, Dysport, Xeomin compared), injectable dermal fillers, RF facial, ultrasonic cavitation, cryolipolysis, Hydrafacial (membership), Clinical Skin Renewal Facial (membership), Morpheus8 / Morpheus8V (membership and blog), Styku 3D body scanner.
- Products: BioTe (hormone pellets and therapy), Image Skincare, nutraMetrix supplements.

### Pricing shown (verbatim)
- Vaginal rejuvenation (/vaginal-rejuvenation/): "Most personalized treatment plans range from $1,500 to $3,500, depending on the number of sessions and technologies used. Payment plans are available."
- Botox (/botox-in-springfield-mo/): No figure. Says pricing depends on units, and mentions "transparent recommendations and clear pricing" at consult.
- Botox membership rate (/subscription-plans/): "Botox at a preferred rate of $7 per unit" (Advanced Skin Health membership).
- Semaglutide (/semaglutide-in-springfield-mo/ and /weight-loss-in-springfield/): medication "starts at $100 for 1 mL" plus the $99 monthly Weight Loss Membership, "about $199" for a typical starting month.
- Weight Loss Membership: $99/month (/weight-loss-in-springfield/).
- Total Wellness Membership: $149/month (/weight-loss-in-springfield/). /subscription-plans/ lists Total Wellness without a price.
- Subscription plans (/subscription-plans/): subscription price first, then non-subscription price.

| Plan | Subscription (annual / monthly) | Non-subscription (annual / monthly) |
|---|---|---|
| Hormone Replacement Therapy | $2,100 / $200 | $5,025 / $419 |
| Semaglutide (weight loss) | $3,996 / $333.00 | $20,700 / $1,725 |
| Bella Plus (compounded) | $3,345.50 / $309.75 | $7,551 / $629.25 |
| Olympia weight management (compounded) | $4,079 / $337.75 | $7,107 / $592.25 |
| Aesthetic Services (Botox 40 units every 3 months, monthly facial, filler) | $1,795 / $150 | $4,375 / $365 |

Arithmetic check (monthly x 12 vs stated annual): the HRT subscription ($200 x 12 = $2,400, not $2,100), Bella Plus ($309.75 x 12 = $3,717, not $3,345.50), Olympia subscription ($337.75 x 12 = $4,053, not $4,079), and the non-subscription HRT ($419 x 12 = $5,028, not $5,025) and aesthetics ($150 x 12 = $1,800 and $365 x 12 = $4,380, not $1,795 and $4,375) do not reconcile. Semaglutide and the non-subscription Bella and Olympia figures do reconcile.

Other pricing claims: "Free Consultation 24 Hours" appears on several pages. "Pounds Lost With A New You" shows a static 0 lbs counter.

## 5. Integrations and third-party scripts

- Google Analytics 4: `G-NNLFN2N0VY`, loaded from `https://www.googletagmanager.com/gtag/js?id=G-NNLFN2N0VY` on all 29 fetched pages. This is gtag.js, not a GTM container.
- Not found on any page: GTM container (GTM-...), Google Ads (AW-...), Universal Analytics (UA-...), Meta/Facebook pixel, CallRail or other call tracking, Hotjar, Microsoft Clarity, Calendly, Boulevard, Vagaro, Mindbody, Jane, reCAPTCHA, cookie-consent banner (none detected; visual check **unverified**).
- Booking: Aesthetic Record.
  - Header CTA "Schedule an Appointment" to `https://anewyouwomensclinic.myaestheticrecord.com/online-booking` (26 pages).
  - `.../online-booking/book-appointment` linked from 4 pages: /botox-in-springfield-mo/, /menopause/, /mens-health/, /vaginal-rejuvenation/.
- Chat: LeadConnector (GoHighLevel) chat loader on all 29 pages. `https://beta.leadconnectorhq.com/loader.js` with `data-widget-id="6a15ba601ce15bb9e91d6259"` and `chat-widget/loader.js`. Whether the chat bubble is visible: **unverified**.
- Lead and forms:
  - MetForm newsletter on `/blog/`: one field, Email Address (`mf-email`). Button label **unverified**. MetForm scripts load site-wide.
  - Aesthetic Record form embed on `/contact/`: `https://link.aestheticrecord.com/widget/form/H2deelST8Z9WKwPJ5WTe` (iframe) with `form_embed.js`. Fields **unverified** (rendered in iframe).
  - Aesthetic Record "Take Our Free 2-Minute Quiz" on the homepage: `https://link.aestheticrecord.com/widget/survey/NgxRM6NWFTi1Q8AS8XFU`. Questions **unverified**.
  - No other MetForm forms in markup. No WPForms, Contact Form 7 or Gravity Forms found.
- Event calendar: Sugar Calendar Lite 3.16.0. Events index (`/events/`) shows none. `/upcoming-events/` shows none. Event pages carry 2024 dates. Ticket pages (`/ticket-receipt/`, `/ticket-details/`) show "This link is not valid".
- Review widget: Embedder for Google Reviews plugin, site-wide script. Visible on `/customer-reviews/` only. Shows "5.0 out of 5 stars, overall rating out of 13 Google reviews".
- Video: Vimeo video `https://player.vimeo.com/video/805690936` on `/biote/`. YouTube embed `https://www.youtube.com/embed/VhBl3dHT5SY` (controls=0) on `/faq/`, `/female-sexual-disfunction-disorder/`, `/pcos-management/`, `/thyroid-optimization/`.
- Maps: Google Maps iframe on `/contact/` (q=1426 E Bradford pkwy suite C Springfield, MO 65804).
- Financing: Cherry widget on `/financing/` only (`https://files.withcherry.com/widgets/widget.js`). No CareCredit, Alphaeon, Sunbit or Affirm markers found.
- Payments and e-commerce: no WooCommerce, Stripe, PayPal or Square markers. Products are not sold on-site. nutraMetrix links to `http://www.nutrametrix.com/ANEWYOUWOMENSCLINIC` and product pages on nutrametrix.com. BioTe links to `https://link.biote.info/tx3`.
- Membership: no membership plugin found. Memberships are described on /subscription-plans/ and /weight-loss-in-springfield/ and sold through consultation or booking.
- Newsletter: MetForm on /blog/ only. No Mailchimp, Klaviyo, ConvertKit, Constant Contact or Brevo markers.
- Citations: `https://www.ncbi.nlm.nih.gov/` (2 pages), `https://my.clevelandclinic.org/` (1 page), `https://www.iasc.org/` (1 page).
- Fonts: Elementor-local Archivo and Oswald CSS on most pages. Google Fonts CSS (Playfair Display, Slabo 27px) is loaded by the Cherry widget on /financing/.
- Plugins and theme (from asset paths): elementor, elementor-pro, elementskit-lite, metform, sugar-calendar-lite, embedder-for-google-reviews, hello-elementor (theme), Yoast SEO (schema and sitemaps).

## 6. Reviews and testimonials

- /customer-reviews/ displays a Google review widget: "5.0 Out of 5 stars" and "Overall rating out of 13 Google reviews". The static HTML contains 10 reviewer blocks (names with relative dates such as "a week ago", "5 months ago"). The 13 figure does not match the 10 blocks shown. Possibly the widget shows a subset; **unverified**.
- 79 images on that page: 10 are Google-hosted avatars (`lh3.googleusercontent.com`), the rest self-hosted.
- Testimonial quotes also appear on /botox-in-springfield-mo/, /vaginal-rejuvenation/ ("Testimonials from Real Women"), /mens-health/ ("Real Stories. Real Change."), /menopause/, /cryolypolysis/ and /biote/. The exact count is **unverified** (rough quote-mark counts only).
- Template testimonials with Lorem ipsum on /pcos-management/, /thyroid-optimization/, /perimenopause/, /about/ and /faq/.
- Star ratings or review counts shown on pages other than /customer-reviews/: none found in static HTML.
- No aggregateRating or Review schema on any page.

## 7. Media

- Images: 254 `<img>` tags across the 29 pages, counting repeats across pages. Per page: /customer-reviews/ 79, homepage 18, /about/ 13, /image-skincare/ 11, /nutrametrix/ 11, /weight-loss-in-springfield/ 10, /botox-in-springfield-mo/ 8, /biote/ 8. Most pages carry 3 to 9.
- Hosting: 244 self-hosted under `https://anewyouwoman.com/wp-content/uploads/` (WordPress media library, with WebP logo). 10 Google-hosted (`lh3.googleusercontent.com`, customer-reviews).
- Some alt text is a file or stock name, such as "Weight-Loss-service", "Young unhappy couple having problems in relationship", and "logoipsum-213.png" placeholders.
- Video: 1 Vimeo embed (/biote/), 4 YouTube embeds (/faq/, /female-sexual-disfunction-disorder/, /pcos-management/, /thyroid-optimization/).

## 8. Structured data, canonical host, protocol

- Canonical: `<link rel="canonical">` is the apex URL on all pages checked (for example `https://anewyouwoman.com/`, `https://anewyouwoman.com/about/`).
- Redirects:
  - `http://anewyouwoman.com/` returns 301 to `https://anewyouwoman.com/`.
  - `https://www.anewyouwoman.com/` returns 301 to `https://anewyouwoman.com/`.
  - `https://anewyouwoman.com/about` returns 301 to `/about/`.
- JSON-LD (Yoast graph, all pages):
  - Pages: WebPage, ImageObject, BreadcrumbList, WebSite.
  - /blog/: CollectionPage and WebPage.
  - /contact/: WebPage, BreadcrumbList, WebSite.
  - /events/: WebSite only.
  - Not present on any page: Organization, LocalBusiness, MedicalBusiness, Physician, MedicalClinic, Review, AggregateRating, FAQPage, Event, Service.
- hreflang: none.
- Robots meta on homepage: index, follow, max-image-preview:large.

## 9. Broken, duplicated, thin, or legacy

Broken or misleading:
- Soft 404s: `/ticket-receipt/` and `/ticket-details/` return 200 with "This link is not valid", and both are in the page sitemap.
- `/placeholder/` returns 200 with "Coming Soon!" and is in the page sitemap.
- Lorem ipsum on 7 pages: `/about/`, `/faq/`, `/contact/`, `/pcos-management/` (10 occurrences), `/thyroid-optimization/` (10), `/perimenopause/` (7), `/subscription-plans/` (4). Counts are text-dump occurrences, approximate.
- Placeholder content:
  - Phone `+62 123 456 789` on /about/.
  - Placeholder logos `logoipsum-*.png` on /about/ and /subscription-plans/.
- Template copy: /pcos-management/ and /thyroid-optimization/ contain no condition-specific text. Their body is a generic nutrition and "Personal Coach Team" template. /perimenopause/ contains similar template copy.
- Meta and H1 mismatches:
  - /about/ title and description mention Rybelsus, Wegovy and Mounjaro. The H1 is "Our team of experts...".
  - /contact/ title and description mention Oklahoma.
  - /faq/ H1 "Want Know More About Weight Loss". Title and description are about hormone pellets.
  - /customer-reviews/ meta describes ultrasonic cavitation and RF facials. The body is only the review widget.
- Typos in visible copy or slugs:
  - H1 "Perimenopaus" on /perimenopause/.
  - "Female Sexual Disfunction Disorder" in H1 and slug `female-sexual-disfunction-disorder`.
  - "PCOS Managment" on /pcos-management/.
  - "Newslater" in /blog/ H1.
  - "LEarn More About Us" on /about/.
  - "Allright Reserved" in inner-page footers.
  - "Want Know More" on /faq/.
  - "Lets get Best Nutrition" on the thyroid and PCOS template pages.
  - Blog slugs `unveiling-the-ppotential-of-ppeptides-for-wweight-lloss` and `menowhat`.
  - "cryolypolysis" in the URL and menu vs "cryolipolysis" in the H1 and title.
- Heading structure: /styku/ has no H1 element. /subscription-plans/ has two H1s. The homepage has two H1s. /thyroid-optimization/ and /pcos-management/ repeat the same text in two H1s.
- Duplicate or overlapping content: four bioidentical HRT posts (slugs 6, 7, 15, 35 above) cover the same topic. Not byte-duplicated.
- Same HTML size, different content: /cryolypolysis/ and /nutrametrix/ both measure 127,668 bytes, but `cmp` shows they differ. Coincidence, not duplication.
- Stale or dated:
  - Homepage and footer promo: "For Black Friday ONLY ... 25% discount ... make 2025 your best year ... Use Coupon Code: BLACK FRIDAY". Today is 2026-11-02.
  - Blog index heading "Latest Medical Treatments for Weight Loss in 2025" (post slug `latest-medical-treatments-for-weight-loss`).
  - Six event posts dated 2024-11 to 2024-12, and the events index shows no current events.
  - /contact/ Oklahoma references.
  - Legacy "#ShareASale" affiliate text in the homepage footer.
- Thin pages: /financing/ (heading plus Cherry widget), /upcoming-events/ (none listed), /events/ (none), /placeholder/ (8 words), /ticket-receipt/ and /ticket-details/ (29 words each).
- Orphan or hidden pages:
  - /semaglutide-in-springfield-mo/ (1,091 words) is not in the nav or footer. It is linked only from itself.
  - /thyroid-optimization/, /pcos-management/, /female-sexual-disfunction-disorder/ have no inbound links from the nav, footer or other pages.
  - /events/ and /upcoming-events/ are not linked.
- Navigation quirks: parent items "Services", "Products", "Financing" and "About" have href="#" or duplicate children. Botox and Perimenopause are in the footer only.
- Counter: "Pounds Lost With A New You 0 lbs" on the homepage.
- Subscription arithmetic mismatches (section 4).
- Missing meta descriptions on 9 pages (section 3).
- Event and ticket plumbing: Sugar Calendar ticket URLs are indexed but show "not valid".
- Sitemap hygiene: /ticket-receipt/, /ticket-details/ and /placeholder/ appear in page-sitemap.xml. Their lastmod dates are 2023 to 2024.

## 10. PageSpeed-style signal (homepage only, not Lighthouse)

- HTML transferred: 150,518 bytes (about 147 KiB), uncompressed as fetched.
- External script tags: 43 (Elementor, Elementor Pro, ElementsKit, MetForm, Sugar Calendar, WordPress jQuery and React bundles, Embedder, LeadConnector loader and chat loader, GA4 gtag).
- External stylesheet links: 51.
- Inline script blocks: about 17.
- `<img>` tags on homepage: 18.
- Not measured: render-blocking time, Core Web Vitals (LCP, CLS, INP), Lighthouse score.

## Open items to verify (unverified)
- Chat bubble visibility (LeadConnector), Aesthetic Record form fields (contact iframe and homepage quiz), MetForm newsletter button label, Cherry widget content, Google review widget full count (13 vs 10 shown), any Google Business Profile hours, cookie-consent banner visibility, rendered content of the 45 blog posts and 6 event posts, and HTTP status of those URLs.
