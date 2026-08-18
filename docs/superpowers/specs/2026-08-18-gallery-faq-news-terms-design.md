# Gallery, FAQ, News & Terms — Design

## Context

The site (Next.js App Router, single homepage at `src/app/page.tsx`) currently
has no Gallery, FAQ, News, or Terms & Conditions content, though the old
WordPress site (rbsoncape.co.za) has all four (Gallery and News are in its
nav; T&Cs came from a separate PDF the user is providing).

## Content sourcing

**Gallery photos** — the old site's `/1027-2/` page hosts 42 full-resolution
"Captured by Carli Smith" truck/road photos. These are already downloaded to
`scratchpad/gallery-src/` for curation. They are the same photoshoot as the
photos the user pasted into chat (which arrived as vision content with no
file path, so they can't be saved directly).

**Facility photos** — `public/assets/premises-day.jpg` and
`premises-night.jpg` already exist in the repo from prior work. The specific
daytime yard/palm-entrance shots the user pasted are not on the old site and
not otherwise fetchable — out of scope unless the user provides the files
directly.

**News articles** — ported verbatim from the old site's 4 real posts (all
June 2020), including their real photos:

1. *Parcels for those in need – COVID-19 Level 5* (slug:
   `parcels-for-those-in-need-covid-19-level-5`) — 4 WhatsApp photos.
2. *Helping farmers in the Karoo* (`helping-farmers-in-the-karoo`) — includes
   a real customer quote from Grethe Vos.
3. *Giving Back* (`giving-back`) — Klawer drought transport donation.
4. *Exclusive cargo/dangerous goods delivery service*
   (`exclusive-cargo-dangerous-goods-delivery-service`) — pick ~4-6 of its 20
   photos.

**FAQ** — drafted fresh (no old-site source), covering: quote turnaround,
coverage area/routes, dangerous goods handling, fleet capacity, payment
terms, insurance/GIT cover, branch contacts.

**Terms & Conditions** — user is sending the actual `tandc.pdf` file
separately. Once received, it goes in `public/documents/tandc.pdf` and is
linked as a direct download; no HTML reconstruction.

## Architecture

- `/gallery` — new route, `src/app/gallery/page.tsx`. Grid of curated
  photos (~18-20, deduped for near-identical convoy shots) + a small
  "Facility" section using the two existing premises photos. Lightbox on
  click (no new dependency — a small client component with keyboard/click
  handling, consistent with the rest of the site's plain-React style).
- `/news` — new route, `src/app/news/page.tsx`. Card list of the 4 articles
  (title, date, excerpt, thumbnail).
- `/news/[slug]` — new route, `src/app/news/[slug]/page.tsx`, statically
  generated (`generateStaticParams`) from a small local data file
  (`src/lib/news.ts`) holding the 4 articles' content — no CMS/database.
- FAQ — new component `src/components/FAQ.tsx`, added to
  `src/app/page.tsx` between `WhyChoose` and `Contact`, matching the site's
  existing section pattern (accordion-style, plain React state, no new
  dependency).
- Terms link — added to `Footer.tsx` (and near the quote form in
  `Contact.tsx`) once the PDF is in place.
- `Header.tsx` — `NAV_LINKS` gains `Gallery` (`/gallery`) and `News`
  (`/news`) as real routes, and `FAQ` as an in-page anchor. Existing
  anchor links (`#services`, `#fleet`, etc.) only work on the homepage;
  since Gallery/News are separate routes, those links need to become
  `/#services` etc. so they still resolve when navigating from a
  sub-page back to a homepage section.

## Data flow

All content (news articles, FAQ entries) lives in small local TypeScript
data files under `src/lib/` — consistent with the rest of this project
(e.g. `src/lib/contact.ts`), no database or CMS. Images are static files
under `public/assets/gallery/` and `public/assets/news/`.

## Out of scope

- CMS/admin UI for adding future news posts (plain data file is enough for
  4 historical articles; can revisit if the user starts publishing
  regularly).
- The specific pasted daytime facility/yard photos (no accessible source).
- Client testimonial logos (A-Gas/Nulandis/Savannah) — already present on
  the homepage `About` section, untouched by this work.
