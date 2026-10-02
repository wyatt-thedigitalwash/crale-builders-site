# crale-builders Website Reference

## Business Info
- Business Name: Crale Builders, Inc.
- Industry: General contractor, residential first (custom homes, Indian Lake lake homes, remodeling and additions), plus light commercial and rental property management
- Location: 3486 State Route 29 N, Sidney, OH 45365
- Phone: 937.498.8000 (fax 937.498.8001)
- Email: info@cralebuilders.com
- Website URL: https://www.cralebuilders.com
- Google Business Profile: (access needed from client)

## Positioning
Crale Builders is a Sidney, Ohio general contractor founded in 1995 by Dale Bensman and Craig Kuck. They build custom homes and remodel homes across Shelby, Logan, Miami, Auglaize, and Champaign counties, and they have built at Indian Lake since 1999 with project managers dedicated only to the lake. What sets them apart is total project development under one roof: in-house design and drafting, construction management, and general contracting, with the same people from the first sketch to the final walkthrough and a one-year warranty on all work.

## Brand Voice
- Plain, specific, and confident. Talk like a builder, not an agency.
- Name real things: "screened porch," "second-story addition," "seawall," "build on your lot."
- Numbers are rounded and confident (see Numbers below). Never exact counts.
- No em dashes. Use commas, periods, or two hyphens.
- Avoid: "elevated," "luxury living solutions," "dream home journey," and other generic builder-marketing phrases.

## Visual Direction
- Slightly more modern than the old site, clearly still Crale, built around Indian Lake.
- The bubble logo stays the loud element. Everything around it is calm, sturdy, and photo-led.
- Every color is sampled from something Crale owns: the logo, the yellow job-site sign, and the seawalls and water in their Indian Lake photos.
- Indian Lake photography shot from the water leads the homepage and the Indian Lake page.
- Anti-patterns for this project:
  - No tracked uppercase eyebrow labels above headings. Labels, if truly needed, are sentence case with normal spacing.
  - No warm cream plus terracotta, no floating shadowed cards, no everything-centered layouts.
  - No rounded pill badges. Statuses are sign riders or plain text.
  - No divider lines between rows, stats, or sections. Group with spacing, alignment, label-over-value layouts, and background changes. Real data tables may use a faint alternating row tint.
  - Logo never placed on top of photos.
- Foundations board (approved direction): published as an artifact, "Crale Website Foundations," including section pattern and gallery examples.

### Section patterns (build as reusable components)
- Split: photo 7 cols / text 5 cols, flips sides. Optional facts grid (soft label above a bold value) instead of a paragraph.
- Spec list: intro 4 cols / two-column grid of items 8 cols (bold condensed service name + one sentence). No divider lines, no icon grids.
- Numbers row: Home and About only, once per page. Large condensed numerals separated by space, no tiles, no rules.
- Process steps: numbered 1 to 4 only because the order is real (design and drafting, pricing and planning, construction, warranty).
- Quote: large serif quote on Evergreen with a supporting photo. Real testimonials only.
- Project cards: image 3:2, title, category tag in Channel Blue. No shadows or borders.
- Rental listings: 21:9 image, address, community/city, type, sq ft. Fed by the portal. Status: "Available now" or "Available [date]" shows as a flat Job Sign Yellow rider flush to the photo's left edge (like the rider on Crale's yard sign); "Call for availability" is a plain text line with the phone number; leased units are left off the list.
- Call to action: a band at the end of most pages (headline, button, phone number with a Job Sign Yellow underline). When it sits directly above the footer, use Seawall Stone or white, not Evergreen, so it does not blur into the footer.

### Header and footer (built)
- Header: full width, Seawall Stone, turns white with a soft shadow on scroll. On pages with a full-width photo hero (see OVERLAY_PATHS in header-shell.tsx: home, Indian Lake, Custom Homes, Remodeling, Rentals, Commercial) it is transparent over the photo at the top of the page, with the reversed logo and white text, and the hero pulls up underneath it. Desktop: logo, main nav, phone (xl+), Start a project. Phones: logo, Call, Menu. The Menu button becomes Close in place, the header turns Evergreen, and the menu panel unrolls below it on the same 240ms curve.
- Footer: compact and quiet, full width to match the header. One row with the plain logo, the six main links, and the phone (yellow underline); a softer row with address, email, fax, and the secondary links; a darker bottom band with the service area, copyright, Privacy, and Staff sign in. No column headings, no divider lines, no big headline. Chamber memberships belong on the About page.
- Backgrounds: mostly white. Sections do not need to alternate colors; consecutive white sections are fine (the spacing rule handles the gap). Use Evergreen for the one dark moment on a page (for example a quote or proof section) and Seawall Stone only when a section truly needs separation. Most splits are 7/5 or 8/4, not 50/50. One bold moment per page.
- Indian Lake page plan: Hero (photo) > Building at the lake since 1999 (split + facts) > What we build at the lake (spec list) > A lake home, start to finish (aerial build timeline + finished-home feature set, added when aerial photos arrive) > From the water (lake strip) > Client quote (Evergreen) > Start a lake project. All white except the quote.
- Indian Lake page built at /indian-lake. The project story section (LakeFeature) features one real lake home, the tan board-and-batten house (old gallery 020 lake side, 021 street side), plus its great room (residential gallery 037), confirmed by the user as the same lake house (the bathroom, residential 038, was dropped at the user's request), with only details visible in the photos. Never fill it with rooms from other houses. Layout: the artifact's photo slider (PhotoSlider) on the left with the story beside it; the three details ride along as slide captions. PhotoSlider slides carry an optional `position` class for a photo whose shape differs from the frame. The user landed here after five rejected tries: row of four, 2x2 square, split with captions, photos-plus-text rows, and big-photo-plus-panel. Page-wide lesson from that round: sections that put a narrow text column on the left and leave the right half empty read as unfinished, so the client quote and the closing CTA were rebuilt to use the full width (quote split in two columns, CTA centered). "Where we build at the lake" was cut entirely at the user's request; the hero line and the page's areaServed structured data still name the four lake communities. "What we build at the lake" is the page's one Seawall section (user's call); this one is white. The rest of the page is white except the Evergreen quote. The aerial build timeline joins it when those photos arrive. Shared pieces: PhotoHero, PhotoStrip (with tap-to-enlarge dialog), StripControls, ClosingCta in src/components/site; lake photos in src/lib/site/lake-photos.ts and /public/images/indian-lake/. The strip uses static photos for now; switch it to the portal's Indian Lake gallery once the production database is set up.
- Custom Homes page built at /custom-homes: hero (timber gable ranch) > Design and drafting under one roof (split + facts) > What Crale handles (Seawall scope list) > Inside the homes we build (PhotoSlider, different homes, so captions name rooms and never one project) > Homes we have built (PhotoStrip) > client quote (Goettemoeller, Botkins) > closing CTA. Copy is grounded in the old site's Residential Services page: design and drafting, construction management, general contracting, budget and schedule sit-downs, garages and detached buildings, concrete. Photos in /public/images/custom-homes/ and src/lib/site/custom-home-photos.ts. Shared now instead of page-specific: ClientQuote (takes a testimonial; replaced LakeQuote) and the SitePhoto type in src/lib/site/photos.ts.
- Remodeling page built at /remodeling: hero (living room from the loft) > Work that fits the house you have (split + facts) > What we remodel (Seawall scope list) > Down to the finish work (PhotoSlider) > Baths, stairs, and the rest (PhotoStrip) > client quote (Hubble, Sidney) > closing CTA. Copy is grounded in the old site's Additions/Renovations and Small Projects sections: more square footage, another story, exterior changes, siding, roofing, windows, garages, outbuildings, concrete. Photos in /public/images/remodeling/ and src/lib/site/remodeling-photos.ts. Known gap: the old gallery never records which interiors were remodels and which were new builds, so captions name the room only and claim nothing. Have Crale tag remodel photos in the portal, then the captions can say so. Each page now uses a different testimonial: Coil on Indian Lake, Goettemoeller on Custom Homes, Hubble on Remodeling.
- Our Work built at /our-work and Rentals at /rentals, both reading the portal (getGalleryImages, getPublishedRentals) so Crale updates them with no rebuild. IMPORTANT correction to the earlier note: cached portal reads DO prerender fine at build against local PGlite (both routes build as static), so the Indian Lake strip no longer needs to stay hard-coded. Our Work: justified rows (each photo grows by aspect ratio, nothing cropped), category filters as underlined text buttons, not pills, and only categories that have photos appear (currently no remodeling rows). Rentals: grouped by city, status shown as a yellow yard-sign rider, cards degrade to text when a unit has no photo (33 of 58 have none) and hide empty rent/bed/bath fields. Every listing now links to its own page at /rentals/[slug], where the slug is built from address plus city (src/lib/site/rental-slug.ts; colliding slugs get the id appended, so the portal never has to manage slugs). All 58 prerender. The index is deliberately text-only: only 15 of 58 units have a photo, so a grid mixing cards with and without images read as broken. Photos and floor plans (25 units have one) live on the detail page instead, which also hides any empty field. The sitemap was still the starter stub with a placeholder domain and a single URL; it now lists all 11 pages plus every rental. The application stays a PDF at /public/documents/crale-rental-application.pdf, linked from the #apply section. NEVER rebuild it as a web form: it collects Social Security numbers. The lightbox is now shared (src/components/site/photo-lightbox.tsx), used by PhotoStrip and the Our Work gallery; DisplayPhoto in photos.ts covers both bundled imports and portal URLs.
- About rebuilt photo-led after the user rejected the first version: half hero > Two builders who stayed (story + interior photo) > Evergreen numbers band (1995, 200+, 100+, 1999) > What we build (four photo cards linking to Custom Homes, Indian Lake, Remodeling, Commercial) > The standard, with the chambers on their own > CTA. What was wrong the first time, worth avoiding elsewhere: no hero and no photos on an otherwise photo-led site, the same heading-left/list-right layout three times in a row, facts stranded in a corner, and the chamber memberships buried inside the quality list. All photos are reused imports, so no new files. Contact stays text-led (not in OVERLAY_PATHS). About follows the old site's own About copy: founded 1995 by Dale Bensman and Craig Kuck, core business split residential/commercial, "right the first time" as the Evergreen band, one-year warranty, chamber memberships. Commercial items are plain text, not links, until /commercial exists. Contact carries the form plus the office details and the staff list from src/lib/site/team.ts (4 project managers, 1 office manager, emails as published on the old site: confirm each person before launch). The form posts to a Server Action in src/app/(site)/contact/actions.ts: Zod validation server-side, a honeypot field that answers as though it sent, Resend for delivery, and nothing sensitive collected. Production needs RESEND_API_KEY and CONTACT_FROM_EMAIL (on a verified domain). Messages always go to info@cralebuilders.com (BUSINESS.email), fixed in code, not an environment variable; with no key in development the action validates and reports success without sending, so the delivery path is still untested.
- Commercial built at /commercial: hero (brick office with flagpole) > One contractor, start to finish (split + facts) > What we build (Seawall scope list) > Evergreen statement ("The space where you work shapes how the business grows") > Keeping the building running > Offices, shops, and everything after (PhotoSlider, 7 photos) > closing CTA. The maintenance section comes straight from the old site's commercial Small Projects list (office build outs, bathroom work, exterior doors, concrete replacement, loading dock repairs, snow removal, general maintenance) and is the page's real differentiator. No client quote here: all three testimonials are residential, and putting one on a commercial page would mislead. Per the user's instruction the count of 10 commercial buildings is never published. Photos in /public/images/commercial/ and src/lib/site/commercial-photos.ts. About's commercial list now links here.
- Products and Partners built at /partners and Privacy at /privacy. Partners data lives in src/lib/site/partners.ts, generated from research/partners.json: 77 suppliers in 26 categories, using the corrected names and the links verified during research, laid out three columns wide with the unlinked ones as plain text. A partner listed here reads as an endorsement, so have Crale confirm the list before launch. Privacy is a plain-language policy describing what the site actually does (contact form via Resend, no analytics or ad cookies, staff portal session cookie only, Vercel/Neon/Resend as processors, rental applications on paper). It is NOT legal advice and needs counsel review; the page carries a "Last updated" constant (UPDATED) to bump on edits. It must be rewritten if analytics, ad pixels, a chat widget, or any new form is added. All 11 public routes return 200.
- Aerial build photos are coming. Ask for: the same drone position, altitude, and angle each visit (enables a before/after time-lapse slider), landscape originals at full resolution, stage and date per visit, finished exteriors and interiors, and homeowner permission.

- Photo slider: several photos in one section, full-width slides in a scroll-snap track (swipe, arrows, keyboard, progress bar, live caption and count).
- Process steps have no divider lines; spacing separates them.

### Galleries
- Our Work: justified rows (flex-grow proportional to each photo's aspect ratio). One shared row height, natural widths, no cropping. Category filters, lightbox with arrow keys.
- Indian Lake: "From the water" strip with one shared height and natural widths (no cropping), scroll-snap, arrows on desktop, hidden on phones in favor of swiping. Then a gallery preset to Indian Lake.
- Home featured project and project stories: feature set (8-col lead photo, two 4-col supports, row of three). On phones: lead full width, then two columns.

### Photo rules
- The slot fits the photo: landscape photos only in landscape slots, portrait only in portrait slots.
- Galleries never crop. Uniform cards (4:3 projects, 21:9 rentals) use photos close to that shape and crop lightly around a focal point.
- Portal to-do: store a focal point per photo (tap to set) and use it for object-position; flag uploads under ~1600px wide; route photos by orientation using the stored width/height.
- Never display a photo larger than its file. Current photos max 1000px wide, so large layouts wait for originals.

## Colors
- Background: Seawall Stone #ECEEE9 (white #FFFFFF for photo cards and form fields)
- Primary Text: Outline Ink #231F20 (from the logo outline)
- Accent: Crale Green #006838 (logo fill; buttons, links, highlights)
- Secondary Accent: Channel Blue #3D5F70 (Indian Lake details, tags, map water)
- Dark surfaces: Evergreen #0F3526 (footer, dark bands, text over photos)
- Signal: Job Sign Yellow #E8D44D (active nav, focus rings, and link underlines on Evergreen or over dark photo fades; never text on light backgrounds, 1.3:1). The one display-size use is the second line of the homepage hero headline.

### Hero photo quality
- The live site's homepage slideshow serves 1920x800 originals from `images/rotating photos/` that the original crawl never picked up (it took the 1000px gallery copies). All 17 are saved in research/live-site-rotating/ as rp-*.jpg.
- Heroes now use those originals: home (rp-1), Indian Lake (rp-13), Custom Homes (rp-15), Commercial (rp-7), About (rp-9, saved separately at /public/images/about/ so the Custom Homes strip keeps its 4:3 crop of the same house). Each was visually confirmed to be the same house as the photo it replaced.
- Because the originals are 2.4:1, the "full" hero height was reduced (was up to 62rem) so the whole house stays in frame; a taller container crops the sides off. Object positions are centered.
- Remodeling (an interior) and Rentals (Winter Ridge) have no counterpart in that set, so they keep their 1000px photos. Six in-page photos have confirmed 1920px versions too (rp-8, rp-16, rp-2-REV, rp-12, rp-3, and rp-10 at a different angle); they were left alone because swapping a 4:3 photo for a 2.4:1 one changes those sections' composition, not just their sharpness.

### Hero sizes
- PhotoHero takes size="full" or size="half". The homepage is the ONLY full-height hero. Indian Lake, Custom Homes, Remodeling, Rentals, and Commercial all use size="half": same styling, overlay header, and yellow second line, at roughly half the height with a smaller headline and tighter spacing.
- The user asked for this so the homepage stays the signature opening. A different opening for the service pages (headline on white plus a photo band below, PageMasthead) was built and rejected: they liked the original styling and only wanted it shorter. Do not reintroduce it.

### Homepage hero (chosen)
- Full-width photo: blue farmhouse with a wraparound porch (/public/images/home/home-hero-blue-farmhouse.jpg), header transparent over it.
- Headline: "From concept" (white) / "to completion." (Job Sign Yellow), both heavy condensed Archivo, sized as a caption at bottom left (about 60% of the original display size) so the house stays the focus. Soft near-black fade only behind the header and headline, so the photo's colors stay true. No description paragraph. Buttons: Start a project, See our work. A small line under the buttons says what and where: "Custom homes, remodeling, and Indian Lake homes in Sidney, Ohio."
- Copy rule: the "one team from first sketch to final walkthrough" message lives only in How a Crale project runs; other sections should not restate it.
- Below What we build: "Building at Indian Lake since 1999" section on Seawall Stone with the lake strip (8 Indian Lake photos, one height, natural widths, captions, desktop arrows, bleeds off the right edge).
- Homepage order: Hero (photo) > What we build (white) > Building at Indian Lake (white, lake strip without captions) > How a Crale project runs (Seawall, 4 numbered steps) > Proof (Evergreen: 200+ / 100+ / 1995, then three equal client quotes, each with a bold condensed pull line from the client's words, supporting sentences, and name) > Rentals (white: photo slider of five rental exteriors in a 2:1 frame at left, heading, text, and See rentals link at right) > Closing CTA (Seawall: "Planning a new home, addition, or remodel?", Start a project, or call) > Footer. All sections built.
- Reusable photo slider: src/components/site/photo-slider.tsx (scroll-snap track, progress bar, count, arrows, keyboard, caption).
- Testimonials live in src/lib/site/testimonials.ts. Confirm with Crale that Linda Coil, Diane Goettemoeller, and Diane Hubble are still happy to be named.
- What we build cards: Indian Lake homes (lake home in fall color), Custom homes (stone ranch, circular drive), Remodeling and additions (white kitchen).
- Rough proportion on a page: Stone 60%, white 15%, Ink 12%, Green 7%, Evergreen 5%, Channel Blue 1%
- Contrast: Ink on Stone 14.0:1, Green on Stone 5.9:1, White on Green 6.9:1, Channel Blue on Stone 5.9:1, Stone on Evergreen 11.5:1, Yellow on Evergreen 9.0:1

## Typography
- Display Font: Archivo (Google Fonts, variable), set at 87.5% width (font-stretch) for headings; normal width for navigation, buttons, labels, and numbers
- Body Font: Source Serif 4 (Google Fonts, variable, optical sizing)
- Sizing scale:
  - Hero: Archivo 760, 64px desktop / 42px mobile, line-height 1.02, letter-spacing -0.02em
  - Section heading: Archivo 720, 40px / 30px, line-height 1.08, -0.015em
  - Card heading: Archivo 680, 22px, line-height 1.2
  - Body: Source Serif 4 400, 18px, line-height 1.65, max ~62ch
  - Interface (nav, buttons, labels): Archivo 560 to 620, 15px
  - Caption: Source Serif 4 italic, 15px
- Corners: 4px on buttons and photos

## Logo
- Source: original vector artwork extracted from the client's brochure PDF (not a trace). Colors #006838, #231F20, white.
- Files:
  - /public/brand/crale-builders-wordmark.svg (CRALE BUILDERS, used in the header and footer)
  - /public/brand/crale-builders-logo.svg (with the INC. seal)
  - /public/brand/crale-builders-wordmark-reversed.svg (for Evergreen and dark backgrounds: white letters, deep green outline #0A2A1D, no white ring)
- Full-color logo only on Seawall Stone or white. On Evergreen the green letters and black outline disappear, so the footer and the open mobile menu use the reversed version.
- Still needed from client: confirm there is no newer logo file (AI/EPS) and whether the drop shadow version is used anywhere.

## Pages
Main navigation (in order): Indian Lake, Custom Homes, Remodeling, Our Work, Rentals, About. Header right side: phone number and "Start a project" button.

- [ ] Home (/): Indian Lake hero, what we build, numbers, featured projects, how a project runs, testimonials, rentals teaser, contact
- [ ] Indian Lake (/indian-lake): new lake homes and tear-down rebuilds, lake remodels and additions, decks/screened porches/garages, lake gallery, lake project managers, lake towns served
- [ ] Custom Homes (/custom-homes): build on your lot, in-house design and drafting, gallery, process and warranty, counties served
- [ ] Remodeling & Additions (/remodeling): additions, kitchens and bathrooms, basements, roofing/siding/windows, insurance and storm repairs
- [ ] Our Work (/our-work): gallery filtered by Indian Lake, Custom Homes, Interiors, Remodeling, Commercial (portal-managed)
- [ ] Rentals (/rentals): available units, communities (Winter Ridge, Cumberland, Cider Mill, Abby Glen), Troy/Anna/Sidney homes, application PDF (portal-managed)
- [ ] About (/about): history since 1995, founders, team, service area, memberships
- [ ] Start a Project (/contact): form, phone, address
- [ ] Commercial (/commercial): footer link only
- [ ] Products & Partners (/partners): footer link only
- [ ] Privacy (/privacy)
- [x] Portal (/admin): built, not linked publicly
- [ ] 301 redirects for all 26 old .html URLs (see research/CRALE-RESEARCH.md)

## CTAs
- Primary: Start a project (/contact)
- Secondary: Call 937.498.8000
- Indian Lake context: "Start a lake project"

## Numbers
Client-provided project counts (internal, do not publish exact figures): new homes 155, renovations 104, additions 39, residential buildings 14, commercial buildings 10, townhomes 31, total 353.
- Numbers row display: numerals only at display size ("200+", "100+", "1995") with plain labels underneath ("homes built", "renovation projects", "the year Crale started, in Sidney"). Mixing words like "Over" into the display numerals made each figure a different width.
- In sentences: "over 200 homes" and "over 100 renovation projects"
- Use 1995 instead of "31 years" so it never goes stale
- Do not publish the commercial building count

## Content Status

### Text Content
- [ ] Business bio / owner bio: history and founders known; owner bios needed
- [ ] Service descriptions: old site copy extracted; rewrite needed per service
- [x] Testimonials: 5 real (Goettemoeller, Hubble, Sargeant, Coil, Bensman), plus Google reviews pending permission
- [ ] About page copy: draft from research
- [ ] Contact form auto-reply: not started

### Visual Content
- [x] Logo files (final version in /public): vector SVGs in /public/brand
- [ ] Owner portrait: none current (only an early-2000s office photo)
- [ ] Gallery/work photos: 71 real photos imported, max 1000px wide; original files requested
- [ ] Service-specific images: pull from gallery; more needed for basements, roofing, additions
- [ ] OG image: not started

### Business Info Confirmed
- [ ] Address confirmed: from old site
- [ ] Phone number confirmed: from old site
- [ ] Email confirmed: from old site
- [ ] Hours confirmed: not listed anywhere yet
- [ ] Social profiles confirmed: Facebook page found (new, small following)

### Integrations
- [ ] Resend domain verified: not started (also used for portal sign-in emails)
- [ ] Google Analytics installed: N/A yet
- [ ] Google Search Console verified: not started
- [ ] Google Business Profile linked: access needed

### Blocking Items for Launch
- Neon database, Vercel Blob store, and Resend configured in Vercel (Pro plan)
- Rental details from client: rent, beds/baths, availability, pet policy
- Confirm which project managers are dedicated to Indian Lake

### Nice-to-Have (Post-Launch)
- Drone photography at Indian Lake
- Individual project stories with location (for example, Orchard Island)
- Location pages for Lakeview/Russells Point and Troy/Tipp City

## Notes
- Client wants a slightly more modern website with a strong emphasis on Indian Lake.
- Residential is the core business; commercial is de-emphasized to a footer link.
- Full research, rentals, partners, and image inventory: /research
