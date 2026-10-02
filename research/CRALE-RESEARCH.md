# Crale Builders: Rebuild Research & Content Extraction

Research date: 2026-09-15. Source site: https://www.cralebuilders.com/ (hand-coded Bootstrap 3 + jQuery static HTML, copyright line reads 2020, no sitemap.xml or robots.txt).

## What's in `/research`

| Path | Contents |
|---|---|
| `old-site/assets/` | Every asset from the live site, original folder structure preserved (302 files, 48 MB) |
| `old-site/pages/*.md` | Clean text, meta title/description, image list, and outbound links for all 26 pages |
| `image-inventory.csv` | One row per asset: category, dimensions, size, which old page used it, suggested use |
| `rentals.json` | All 58 rental units: city, address, type, sq ft, old detail page, images |
| `partners.json` | All 77 Products & Partners entries, 26 categories, URLs, corrected brand spellings |

---

## 1. Business Facts

| Field | Value |
|---|---|
| Legal name | Crale Builders, Inc. |
| Founded | 1995 (BBB lists Aug 23, 1995) by **Dale Bensman** (President) and **Craig Kuck** |
| Address | 3486 State Route 29 N, Sidney, OH 45365 (BBB also lists a second location in Anna) |
| Phone / Fax | 937.498.8000 / 937.498.8001 |
| Email | info@cralebuilders.com |
| Service area | Shelby, Miami, Champaign, Logan, and Auglaize counties + Indian Lake |
| Warranty | All construction under warranty for one year |
| Memberships | Sidney-Shelby Chamber, Indian Lake Chamber (site footer); NAHB + Ohio Home Builders Association (brochure, **verify still current**) |
| BBB | A+ rating, not accredited, 0 complaints |
| Reviews | Birdeye aggregate 4.8 stars / 10 reviews (mostly Google) |
| Facebook | New page created ~2024 (facebook.com/p/Crale-Builders-Inc-61568214339513), very small following. The "Indian Lake Aerials" page has posted about Crale's work |

### Team (from contact page)
| Name | Role | Email |
|---|---|---|
| Dale Bensman | Project Manager / Co-founder / President | dbensman@cralebuilders.com |
| Craig Kuck | Project Manager / Co-founder | ckuck@cralebuilders.com |
| Johnny Hull | Project Manager | jhull@cralebuilders.com |
| Zach Watren | Project Manager | zwatren@cralebuilders.com |
| Audrey Vaughan | Office Manager | avaughan@cralebuilders.com |

### From local press (Sidney Daily News / Miami Valley Today, 2024 to 2026)
- Crale has built at **Indian Lake since 1999**.
- **Two project managers are dedicated solely to the Indian Lake area** (article does not name them; ask client).
- In-house **draftsmen** plus project managers; clients work with the same staff start to finish.
- Renovations and additions were about **40% of projects** (2023 figure). Demand for renovations and additions keeps growing, and new homes are still core.
- Services named in coverage but **missing from the current site**: kitchen renovations, bathroom remodels, custom showers, basement finishing, roof replacements.
- Stated values: quality, integrity, customer satisfaction. Tagline themes: "Concept-to-Completion," custom design and drafting, full construction management.

---

## 2. Current Site Map (all 26 URLs, needed for the redirect audit)

```
/index.html
/about.html
/contact.html
/residential.html
/commercial.html
/projects.html
/projects-residential.html
/projects-indian-lake.html
/projects-commercial.html
/products-partners.html
/property-management.html
/Rentals/413-Clover-Hill.html
/Rentals/2004-Abby-Glen.html
/Rentals/567-575-Cider-Mill.html
/Rentals/581-585-Cider-Mill.html
/Rentals/584-Cider-Mill.html
/Rentals/1611-1621-Cumberland.html
/Rentals/1691-1701-Cumberland.html
/Rentals/1743-1755-Cumberland.html
/Rentals/901-Winter-Ridge.html
/Rentals/919-921-Winter-Ridge.html
/Rentals/951-Winter-Ridge.html
/Rentals/956-958-Winter-Ridge.html
/Rentals/962-964-Winter-Ridge.html
/Rentals/967-969-Winter-Ridge.html
/Rentals/973-975-Winter-Ridge.html
```
Also linked: `/images/CraleBrochure.pdf` and 5 rental PDFs under `/images/rentals/`.

---

## 3. Existing Copy Worth Keeping

**Headline:** "Dedicated to Excellence Since 1995"
**Section:** "Turning Your Vision into Reality ... From Concept ... To Completion"
**Core line:** total development services including design and drafting services, construction management and general contracting, on a professional, yet personal basis.
**CTA:** "Call Crale Builders at 937.498.8000 for a free, no obligation consultation."

**Old service structure**
- Residential: New Home Construction, Additions/Renovations, Small Projects (detached buildings and garages, siding, roofing and window replacement, concrete work, deck construction, insurance work, dozer / skid loader / snow plow services)
- Commercial/Industrial: design-build commercial buildings, office build-outs, bathroom additions and renovations, exterior door installs, parking lot snow removal, concrete replacement, loading dock maintenance and repairs, general maintenance

Full verbatim text is in `old-site/pages/residential.md`, `commercial.md`, `about.md`.

### Testimonials (the client's own, reusable)
1. **Diane Goettemoeller, Botkins.** Flexible, excellent communication, superb quality, on time and at budget, "felt like we were good friends."
2. **Diane Hubble, Sidney.** Accommodating, professional, excellent craftsmanship, particular and precise finish work.
3. **Jeff Sargeant, Sidney Community Insurance.** Personable, always available, outstanding attention to detail. (Commercial)
4. **Linda Coil, Belle Center.** Patient through planning, polite crews, "Everything was quality, no shortcuts." **Belle Center is an Indian Lake community, so use this on the Indian Lake page.**
5. **Nick Bensman, BENSAR Developments.** Maintains their 2.9 million SF industrial portfolio. (Commercial)

Google reviews to request permission for: Olivia Nicodemus (first home, 2006), Dawn Horvath.

---

## 4. Indian Lake (Hero Market)

### What the old site does
Indian Lake is buried as the second item in a Project Gallery dropdown: 28 photos, one sentence of copy, **zero alt text**, and the same meta description as the residential page. There is no Indian Lake service page. The only other mentions are the Indian Lake Chamber logo in the footer and one rental at 9847 Buckeye.

### What the photos show (28 full-size images, `Gallery/indian-lake/`)
Reviewed visually. Almost all are **waterfront homes shot from the water**, which is a strong, distinctive visual set:
- Two-story lake homes with **upper decks and balconies** facing the water (005, 007, 018, 024, 025, 030)
- **A-frame and tall gable glass walls** for lake views (016, 020, 023, 026)
- **Screened porches, sunrooms, covered patios** (011, 013, 014, 019)
- **Seawalls, docks, rip-rap shorelines, covered boat lifts** visible in many shots (007, 015, 017, 026, 027, 029, 031). **Confirm whether Crale builds these or just builds next to them.**
- Street-side craftsman homes with stone wainscot and garage-forward layouts (004, 010, 012, 021, 028). These are the narrow lake-lot, garage-on-the-road builds.
- **Golf cart / oversized garages** (022)
- Colorful lake-life details (Adirondack chairs, flags, jet skis) that make great lifestyle imagery

**Best hero candidates:** 031 (colorful chairs on dock), 020 (gable glass wall), 007 (boat lift + decks), 030 (fall color waterfront), 016 (A-frame), and existing homepage slides rotating-photos-10, 12, 13.

### Market context
- Indian Lake: about 5,800-acre lake within a roughly 13,000-acre reservoir area in Logan County. Communities include Lakeview, Russells Point, Orchard Island, Turkeyfoot, Belle Center, and Huntsville. Bellefontaine is the county seat nearby.
- Heavy second-home and seasonal market. "indian lake ohio" gets **3,600 searches/mo in Ohio**, peaking at **6,600 in July** and dropping to about 1,300 in December.
- "indian lake ohio real estate": 320/mo. These are buyers of lake lots and older cottages, the future tear-down / rebuild / remodel clients.

### Competitors visible at Indian Lake
| Company | Angle |
|---|---|
| TK Constructors | Plan-based builder with dedicated **Lakeview** and **Russells Point** SEO pages |
| Wallace Custom Building (Lakeview) | Custom homes, remodels, additions; Houzz presence |
| Thrush & Son | Roofing, siding, windows with a dedicated Indian Lake page |
| Diamond Waterfronts | Seawalls, docks, waterfront design-build (**referral partner opportunity**, not a competitor) |
| Impresa Modular | National modular with templated town pages |

Nobody owns "Indian Lake custom lake home builder" with real depth. Crale has 25+ years at the lake, dedicated PMs, and the best photo library, so this position is available.

---

## 5. Rentals / Property Management

### Inventory (58 units, full data in `rentals.json`)

| City | Units | Addresses |
|---|---|---|
| **Sidney** (houses/apts) | 18 | 301, 303 S. Miami; 525, 527, 528, 528 1/2, 607 N. Miami; 619, 621 St. Marys; 113, 115 E. Water; 528, 530 S. Main; 693, 695 Hoewisher; 880, 882 Merri Lane; 3486 St Rt 29 |
| **Sidney** (townhomes) | 18 | Cumberland: 1611, 1621, 1691, 1701, 1743, 1755. Winter Ridge: 901, 919, 921, 951, 956, 958, 962, 964, 967, 969, 973, 975 |
| **Tipp City** | 7 | 413 Clover Hill; townhomes at 2004 Abby Glen; 567, 575, 581, 584, 585 Cider Mill |
| **Troy** | 8 | 2715 Fairmont A/B/C/D; 65 Heather A/B; 67 Heather A/B |
| **Anna** | 6 | 202 Young; 213 Main; 211, 213 Emerald; 208, 210 Onyx |
| **Indian Lake** | 1 | 9847 Buckeye |

### Detail pages that exist (25 units, all Sidney + Tipp City townhomes)
| Community | Units | Sq ft | Assets |
|---|---|---|---|
| Winter Ridge, Sidney | 901 | 1,730 | exterior, floor plan, 10 interior photos |
| | 919, 921 | 1,730 | floor plans only |
| | 951 | 1,690 | exterior (949-951), floor plan, 9 interior |
| | 956, 958 | 1,645 | exterior, floor plans, 9 + 6 interior |
| | 962, 964 | 1,450 | exterior, floor plans |
| | 967, 969 | 1,375 | floor plans only |
| | 973, 975 | 1,360 | exterior, floor plans |
| Cumberland, Sidney | 1611, 1621 | 1,410 | floor plans only |
| | 1691, 1701 | 1,275 | exterior, floor plans |
| | 1743, 1755 | 1,354 | floor plans only |
| Cider Mill, Tipp City | 567, 575, 581, 585 | 1,325 | 2 exteriors, floor plans |
| | 584 | 1,415 | floor plan only |
| Abby Glen, Tipp City | 2004 | 1,425 | floor plan only |
| Clover Hill, Tipp City | 413 | 1,586 | exterior, floor plan |

The rental exteriors show single-story brick-and-siding duplex townhomes with attached 2-car garages. They're clearly Crale-built, which is a good "we build it and we manage it" story.

### Documents (in `old-site/assets/images/rentals/`)
- `APPLICATION.pdf`: **No pets allowed.** Collects SSN, DOB, income, employer, rental history, bankruptcy/eviction, vehicles, references. Authorizes credit, criminal, and reference checks.
- `Lease.pdf`, `LeadPaintDisclosure.pdf`, `LEAD BASE FORM.pdf`, `Carbon Monoxide Information.pdf`

### Gaps and recommendations
- **No rent, beds/baths, availability, or amenities** are listed anywhere. Need these from the client.
- 33 of 58 units have no page or photos.
- **Do not rebuild the application as a plain web form that emails SSNs.** Either keep the PDF download or link to a tenant screening platform (AppFolio, Buildium, RentRedi, etc.). Flag for the Security audit.
- Group pages by **community** (Winter Ridge, Cumberland, Cider Mill) instead of one page per address pair. Mark each unit Available / Leased.
- **Rentals have the most search demand of anything Crale offers** (Ohio monthly volume):

| Keyword | Vol/mo |
|---|---|
| sidney ohio apartments | 590 |
| houses for rent sidney ohio | 390 |
| tipp city apartments | 320 |
| rentals sidney ohio | 210 |
| indian lake ohio rentals | 110 (seasonal, mostly vacation-rental intent) |

---

## 6. Products & Partners (77 entries, 26 categories; full data in `partners.json`)

| Category | Partners |
|---|---|
| Appliances | Hansbarger Home Solutions |
| Bathroom/Accessories | Moen |
| Cabinetry & Tops | Bontrager Custom Cabinetry, Konkus Marble & Granite, Marble Arch Products |
| Central Vacuum | Central Vacs-N-More |
| Columns, Railing, Fence | HB&G Columns, Superior Aluminum Products |
| Decking | TimberTech, Trex |
| Fireplaces | Dayton Fireplace, Heat & Glo, Quadra-Fire |
| Flooring | Bud Polley's Floor Center, Florida Tile, Fultz Flooring / Warehouse Carpets, Moore Tech Corp |
| Foundation & Concrete | JR Edwards Concrete Co., R.F. Woehrmyer Concrete Construction |
| Garage Doors & Operators | C.H.I. Overhead Doors, Clopay, Haas Door, LiftMaster, Linear, Moeller Door & Window |
| Hardware | Schlage |
| Insulation | Current Insulation, Momper Insulation, Nu-Wool, Pothast Loxley Insulation |
| Interior Trim | Fairwind Finishing, GlobalPointe, Keim Lumber, Steves Doors |
| Light Fixtures | Lyons Lighting Showroom |
| Low Voltage | Low Voltage Solutions, Inc. |
| Masonry | Dutch Quality Stone, Heritage Stone, Minster Supply, Ohio Lumber Brick & Block, ProVia Stone Veneer, Snyder Concrete Products, Stonecraft Industries |
| Mechanicals | Area Energy & Electric, C & J Plumbing, Lochard Inc., Steve & Ted's Services |
| Painting | Sherwin-Williams |
| Plumbing Fixtures | Clarion, E.L. Mustee & Sons, Aker by MAAX, Moen |
| Roofing | CertainTeed, GAF, Lomanco, Owens Corning, TAMKO |
| Shelving | Rubbermaid |
| Shower Doors | Basco, Moeller Door & Window |
| Siding | CertainTeed, Foundry Siding, James Hardie, LP Building Products, Mastic, MiraTEC Trim |
| Spouting & Gutters | Sidney Spouting Service |
| Truss & Floor Systems | Forest Products, Rindler Truss |
| Windows & Doors | Alliance Windows, Andersen, Great Lakes Window, Masonite, Moeller Door & Window, Pella, Simonton, Therma-Tru |

**Cleanup needed on the old page**
- Misspellings: Hanschbarger, Bud Polly's, Wohehrmyer, Anderson, James Hardi, Tampko, Thermatru, Great Lake Windows. Corrected names are in `partners.json`.
- "Minster Supply" links to sthenrytileco.com. Confirm the right URL.
- No link: Bontrager Custom Cabinetry, Moore Tech Corp, JR Edwards Concrete, Pothast Loxley Insulation, Fairwind Finishing, C & J Plumbing.
- Ask the client to confirm the list is current. It likely hasn't been touched since around 2020.
- **Rebuild idea:** split into **Local Trade Partners** (a relationship story: Sidney, Minster, Versailles, Fort Loramie area trades) and **Brands We Install** (national logos: Andersen, Pella, Trex, James Hardie, GAF). Consider logo tiles for the national brands.

---

## 7. Services They Should Target

### Search reality check
In Google Ads data for Ohio, almost every "[service] + [Sidney / Indian Lake / Bellefontaine]" builder keyword is **under 10 searches/mo**. This is a small, referral-driven rural market. Notable exceptions: "home builders troy ohio" 40/mo ($3.34 CPC), "pole barn builders ohio" 170/mo, and "roofing sidney ohio" at a **$20 CPC**, which shows high commercial value even at low volume.

Crale **already ranks #3 organically** for "custom home builder sidney ohio," behind Schumacher Homes and NewHomeSource and ahead of D&S Construction (their most active local competitor, with 3.2K Facebook followers), Ratermann Custom Home Builders, and Ryan Homes. With the right structure, a modern site should take #1 locally.

So the site's job is less about chasing volume and more about: (1) owning the **Indian Lake** entity, (2) converting referrals and realtor handoffs who Google the name, and (3) showing up in the Google Maps pack. That last one depends on the Google Business Profile, which matters more here than organic rankings.

### Recommended service hierarchy

**Tier 1: Lead with these**
1. **Indian Lake Lake Homes** (hub page + gallery)
   - Custom lake home construction
   - Tear-down and rebuild on existing lake lots *(common at Indian Lake with older cottages on small lots; confirm with client)*
   - Lake home remodels, second-story additions, and view-focused renovations
   - Lake-life outdoor spaces: upper decks, screened porches, covered patios, sunrooms
2. **Custom Homes** (Shelby, Miami, Auglaize, Logan, Champaign). Build on your lot, full in-house design and drafting.
3. **Additions & Renovations** (about 40% of their work)

**Tier 2: Supporting service pages** (each backed by existing gallery photos)
- Kitchen remodeling (residential/013, 024, 028, 029, 030, 037)
- Bathroom remodeling and custom tile showers (015, 033, 034, 038, 042)
- Basement finishing
- Decks, porches, and outdoor living (TimberTech / Trex partner tie-in)
- Garages and detached buildings (incl. golf cart garages at the lake; possible pole barn angle)
- Roofing, siding, and window replacement (high CPC, brand partners: GAF, Owens Corning, James Hardie, Andersen, Pella)
- Insurance and storm damage work

**Tier 3: Differentiators** (sections, not necessarily pages)
- In-house design and drafting (most small competitors outsource)
- Same PM from start to finish, with dedicated Indian Lake PMs
- One-year warranty
- 30+ years, built at Indian Lake since 1999

**Keep but de-emphasize**
- Commercial / Industrial: one page (design-build, office build-outs, facility maintenance, snow removal). Keep the BENSAR and Sidney Community Insurance testimonials there.
- Equipment services (dozer, skid loader, snow plow): mention as a line item only.

### Proposed sitemap for the rebuild
```
/                          Home (residential + Indian Lake forward)
/indian-lake               Indian Lake hub  <-- top-level nav item
  /indian-lake/lake-homes
  /indian-lake/remodeling
/custom-homes
/remodeling                Additions & Renovations
  /remodeling/kitchens
  /remodeling/bathrooms
  /remodeling/basements
  /remodeling/outdoor-living
/exterior                  Roofing, Siding & Windows (optional)
/design-drafting
/commercial
/gallery                   filter: Indian Lake / Homes / Interiors / Commercial
/partners
/rentals
  /rentals/[community]     winter-ridge, cumberland, cider-mill, ...
/about                     history + team
/contact
```
Location pages to consider: Sidney, Anna/Botkins, Troy/Tipp City/Piqua, and Lakeview/Russells Point/Bellefontaine. Each needs real local projects, not templated copy.

---

## 8. Image Assets Summary

| Set | Full size | Thumbs | Max resolution | Notes |
|---|---|---|---|---|
| Indian Lake gallery | 28 | 28 | 1000px wide | Best set on the site, seasonal (fall color), shot from water |
| Residential gallery | 34 | 38 | 1000px wide | Exteriors 001 to 023 (older, farm-country ranches and 2-story); interiors 024 to 043 (newer, strong kitchens/baths). **032, 036, 040, 044 exist only as thumbnails** (large files 404 on live site) |
| Commercial gallery | 9 | 9 | 1000 to 1332px | Offices, Village Salon & Spa, warehouse, gym, classroom |
| Homepage heroes | 8 + C-2 | | 1920x800 | Mix of residential, lake, commercial |
| Rental exteriors | 9 | | 1250px wide | Duplex townhomes |
| Rental interiors | 34 | 34 | 640 to 1000px | Winter Ridge 901, 951, 956, 958 only |
| Rental floor plans | 50 | | PNG | Every detail-page unit |
| Logos | 4 | | **225px max** | Crale logo is tiny PNG; chamber logos |
| Misc | concept.jpg (elevation drawing), completion.jpg, consulting.jpg (founders at table), sign.jpg | | | consulting.jpg is dated (early 2000s) but authentic |
| Brochure PDF | 2 pages | | | Contains more photos, NAHB/OHBA logos |

**Image quality problems for a modern build**
- Gallery max is **1000px**, too small for full-bleed or retina hero use. Use these for grids and cards now, and **request original camera files** from the client.
- **No alt text anywhere** on galleries (ADA and SEO issue). `image-inventory.csv` is the starting point for writing it.
- **Logo:** only 225px PNG rasters. **Need vector (SVG/AI/EPS)** before building. The brochure shows the brand is green bubble lettering on a yellow sign with navy accents.
- **No team photos** except the dated consulting.jpg.
- **Photography to request:** drone shots at Indian Lake (Indian Lake Aerials already follows their work), current team headshots, in-progress construction, and the newer interior work.

---

## 9. Old Site Issues (for audits)
- Identical or near-identical meta descriptions across pages; `projects.html` has none.
- Keyword meta tag stuffing.
- No alt text on gallery, rental, or several UI images.
- Testimonial carousel hidden on mobile (`hidden-xs`); its "next" arrow targets the wrong carousel.
- Typos: "servicestotal project development services" (commercial.html), "and and your style" (gallery pages).
- Filenames with spaces (`rotating photos/`, `Crale Builders logo-MD.png`).
- No HTTPS canonical, sitemap, robots, schema, or analytics detected.
- Copyright 2020.
- Rental application collects SSN by fax/PDF (keep off web forms).

---

## 10. Questions for the Client
1. Which two PMs are dedicated to Indian Lake? Can we feature them by name and photo on the Indian Lake page?
2. At the lake, do you build or coordinate seawalls, docks, boat lifts, or lift canopies? Any partner you'd refer (e.g., Diamond Waterfronts)?
3. Can you share original high-res photo files, and project names/towns for gallery photos (e.g., "Orchard Island, 2022")?
4. Vector logo files? Is a logo refresh on the table, or keep as-is?
5. Rentals: current rent, beds/baths, availability, pet policy (still no pets?), and whether you want online applications through a screening service. Is 9847 Buckeye (Indian Lake) still in the portfolio? Should the Anna and Troy units get pages?
6. Is Commercial/Industrial still something you actively want leads for, or referral only?
7. Are you still NAHB / Ohio Home Builders Association members? Any awards?
8. Is the Products & Partners list current? Add or remove anyone?
9. Google Business Profile access (and is the Anna location a real second office?)
10. Do you want pole barns / post-frame buildings promoted?
11. Office hours, and do you want a quote request form or call-first?

---

## Sources
- https://www.cralebuilders.com/ (all 26 pages crawled)
- [Sidney Daily News, Feb 2024](https://www.sidneydailynews.com/2024/02/24/crale-builders-is-general-contractor-specializing-in-residential-commercial-construction/)
- [Sidney Daily News, Feb 2026](https://www.sidneydailynews.com/2026/02/21/building-a-legacy-of-excellence-crale-builders/)
- [Miami Valley Today, Feb 2025](https://miamivalleytoday.com/crale-builders-remains-committed-to-quality-integrity-customer-satisfaction/)
- [BBB profile](https://www.bbb.org/us/oh/sidney/profile/home-builders/crale-builders-inc-0322-90001519)
- [Birdeye reviews](https://reviews.birdeye.com/crale-builders-inc-165925932535893)
- [Crale Builders Facebook](https://www.facebook.com/p/Crale-Builders-Inc-61568214339513/)
- [TK Constructors, Lakeview](https://tkconstructors.com/lakeview-ohio/)
- [Wallace Custom Building, Houzz](https://www.houzz.com/professionals/general-contractors/wallace-custom-building-llc-pfvwus-pf~379505244)
- [Thrush & Son, Indian Lake](https://www.thrushandson.com/indian-lake-ohio-roofing-siding)
- [Diamond Waterfronts, Indian Lake](https://diamondwaterfronts.com/indian-lake/)
- [Lakefront Living, Indian Lake](https://www.lakefrontliving.com/oh/indian-lake)
- Keyword volumes and SERP: DataForSEO Google Ads search volume (Ohio) and Google organic SERP, pulled 2026-09-15
