# Gallery, FAQ, News & Terms Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers-extended-cc:subagent-driven-development (recommended) or superpowers-extended-cc:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/gallery` page, a `/news` section (list + article pages), a homepage FAQ, and a downloadable Terms & Conditions link to the RB & Son Transport site.

**Architecture:** Plain Next.js App Router pages/components matching the existing codebase style (no new dependencies, no CMS/database — content lives in a local TS data file for news, plain arrays for gallery/FAQ). Images are static files under `public/assets/`, sourced from the old site (rbsoncape.co.za) which hosts the real photography.

**Tech Stack:** Next.js 16 (App Router), React 19, plain CSS in `src/app/globals.css`, framer-motion via the existing `Reveal`/`RevealGroup`/`RevealItem` helpers. No test framework exists in this repo — verification is `pnpm build` / `pnpm lint` plus manual dev-server checks (curl + grep on rendered HTML), matching how prior work in this repo was verified.

**User decisions (already made):**
- Gallery photos come from the old site's real 42-photo set, not the pasted (file-less) images. ([site chat])
- Facility/building photos: ship with the two existing `premises-day.jpg`/`premises-night.jpg` assets; the specific pasted yard/palm photos are out of scope (no accessible source).
- News: port all 4 real historical articles from the old site, dated "June 2020" (exact-day precision not supported by the source).
- FAQ: draft fresh content (no old-site source) — 6-8 questions covering quotes, coverage, dangerous goods, fleet capacity, payment, insurance.
- Terms & Conditions: user is sending the actual `tandc.pdf` separately — link to it as a real download, do not fabricate a substitute PDF if it's not yet present.

---

## Task 1: Download and prepare image assets

**Goal:** Get the curated gallery and news photos onto disk as compressed, sensibly-named files under `public/assets/`.

**Files:**
- Create: `site/public/assets/gallery/*.jpg` (20 files, see table below)
- Create: `site/public/assets/news/*.jpg` (10 files, see table below)

**Acceptance Criteria:**
- [ ] All 20 gallery files exist under `public/assets/gallery/` with the exact names below
- [ ] All 10 news files exist under `public/assets/news/` with the exact names below
- [ ] Every file is a valid JPEG under 400KB (checked with `sips -g pixelWidth -g pixelHeight` and `ls -la`)

**Verify:** `ls public/assets/gallery | wc -l` → `20`; `ls public/assets/news | wc -l` → `10`

**Steps:**

- [ ] **Step 1: Download and resize the 20 curated gallery photos**

These are real photos from the old site's gallery (`rbsoncape.co.za/1027-2/`), the same "Captured by Carli Smith" photoshoot as what was pasted into chat, chosen for variety (aerial establishing shots, single-truck action, team portraits, dusk/branded close-ups) and to avoid near-duplicate convoy-on-road angles.

```bash
cd site/public/assets
mkdir -p gallery news
BASE="https://rbsoncape.co.za/wp-content/uploads/2024/01/Captured-by-Carli-Smith_-"

declare -A GALLERY=(
  [13]="gallery-aerial-sunrise-convoy.jpg"
  [20]="gallery-aerial-daylight-convoy.jpg"
  [26]="gallery-aerial-straight-road.jpg"
  [30]="gallery-aerial-moody-fields.jpg"
  [32]="gallery-aerial-water-reflection.jpg"
  [36]="gallery-aerial-wet-road-convoy.jpg"
  [38]="gallery-curve-golden-morning.jpg"
  [42]="gallery-cab-front-canola.jpg"
  [44]="gallery-side-profile-curve.jpg"
  [47]="gallery-rear-green-field.jpg"
  [49]="gallery-rear-canola-field.jpg"
  [54]="gallery-dramatic-sky-convoy.jpg"
  [61]="gallery-team-canola-posed.jpg"
  [63]="gallery-team-canola-standing.jpg"
  [64]="gallery-team-blue-hour.jpg"
  [76]="gallery-branded-side-flare.jpg"
  [83]="gallery-branded-closeup-sunset.jpg"
  [85]="gallery-weathered-trailer-dusk.jpg"
  [86]="gallery-convoy-departing-dusk.jpg"
  [88]="gallery-driver-canola-backlit.jpg"
)

for n in "${!GALLERY[@]}"; do
  out="gallery/${GALLERY[$n]}"
  curl -sL "${BASE}${n}-scaled.jpg" -o "/tmp/g-${n}.jpg"
  sips -Z 1600 -s format jpeg -s formatOptions 78 "/tmp/g-${n}.jpg" --out "$out" >/dev/null
done
ls gallery | wc -l   # expect 20
```

- [ ] **Step 2: Download and resize the news photos**

Real WhatsApp photos from the old site's 2020 posts (confirmed exact URLs — not thumbnails). "Giving Back" and "Helping Farmers in the Karoo" have no real event photo on the old site (only its generic logo image), so they reuse two already-downloaded gallery shots as clearly-labeled illustrative photos — do not present them as the actual historical event photo.

```bash
cd site/public/assets
BASE2020="https://rbsoncape.co.za/wp-content/uploads/2020/06/"

declare -A PARCELS=(
  ["WhatsApp-Image-2020-06-08-at-18.48.15.jpeg"]="news-parcels-1.jpg"
  ["WhatsApp-Image-2020-06-08-at-18.48.16.jpeg"]="news-parcels-2.jpg"
  ["WhatsApp-Image-2020-06-08-at-18.48.16-1.jpeg"]="news-parcels-3.jpg"
  ["WhatsApp-Image-2020-06-08-at-18.48.17.jpeg"]="news-parcels-4.jpg"
)
declare -A DGOODS=(
  ["WhatsApp-Image-2020-06-07-at-19.18.35-1.jpeg"]="news-dangerous-goods-1.jpg"
  ["WhatsApp-Image-2020-06-07-at-19.18.55-1.jpeg"]="news-dangerous-goods-2.jpg"
  ["WhatsApp-Image-2020-06-07-at-19.19.38-1.jpeg"]="news-dangerous-goods-3.jpg"
  ["WhatsApp-Image-2020-06-07-at-19.26.10-1-1.jpeg"]="news-dangerous-goods-4.jpg"
  ["WhatsApp-Image-2020-06-07-at-19.26.10-2.jpeg"]="news-dangerous-goods-5.jpg"
  ["WhatsApp-Image-2020-06-07-at-19.26.38-1.jpeg"]="news-dangerous-goods-6.jpg"
)

for src in "${!PARCELS[@]}"; do
  out="news/${PARCELS[$src]}"
  curl -sL "${BASE2020}${src}" -o "/tmp/n-$$.jpg"
  sips -Z 1200 -s format jpeg -s formatOptions 78 "/tmp/n-$$.jpg" --out "$out" >/dev/null
done
for src in "${!DGOODS[@]}"; do
  out="news/${DGOODS[$src]}"
  curl -sL "${BASE2020}${src}" -o "/tmp/n-$$.jpg"
  sips -Z 1200 -s format jpeg -s formatOptions 78 "/tmp/n-$$.jpg" --out "$out" >/dev/null
done
ls news | wc -l   # expect 10
```

- [ ] **Step 3: Commit the assets**

```bash
cd site
git add public/assets/gallery public/assets/news
git commit -m "Add curated gallery and news photos from old site archive"
```

---

## Task 2: Gallery page

**Goal:** A `/gallery` route showing the 20 curated fleet/road photos plus a small "Facility" section (existing `premises-day.jpg`/`premises-night.jpg`), with click-to-expand lightbox.

**Files:**
- Create: `site/src/components/GalleryLightbox.tsx`
- Create: `site/src/app/gallery/page.tsx`
- Modify: `site/src/app/globals.css` (append new `/* ---------- gallery page ---------- */` section)
- Modify: `site/src/components/Header.tsx` (add `Gallery` nav link)
- Modify: `site/src/components/Footer.tsx` (add `Gallery` nav link)

**Acceptance Criteria:**
- [ ] Visiting `/gallery` renders all 20 photos plus 2 facility photos
- [ ] Clicking a thumbnail opens a full-screen lightbox with prev/next and an accessible close (Escape key and a close button)
- [ ] `Gallery` appears in the header and footer nav, linking to `/gallery`
- [ ] `pnpm build` succeeds with no new type errors

**Verify:**
```bash
pnpm build
pnpm dev &
sleep 3
curl -s http://localhost:3000/gallery | grep -c '<img'   # expect >= 22
```

**Steps:**

- [ ] **Step 1: Write the lightbox client component**

```tsx
// site/src/components/GalleryLightbox.tsx
"use client";

import { useEffect, useState } from "react";

type Photo = {
  src: string;
  alt: string;
};

export function GalleryLightbox({ photos }: { photos: Photo[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % photos.length));
      if (e.key === "ArrowLeft") setOpenIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openIndex, photos.length]);

  return (
    <>
      <div className="gallery-grid">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            className="gallery-cell"
            onClick={() => setOpenIndex(i)}
            aria-label={`Open photo: ${photo.alt}`}
          >
            <img src={photo.src} alt={photo.alt} loading="lazy" />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            className="lightbox-close"
            aria-label="Close"
            onClick={() => setOpenIndex(null)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="5" y1="5" x2="19" y2="19" />
              <line x1="5" y1="19" x2="19" y2="5" />
            </svg>
          </button>
          <button
            type="button"
            className="lightbox-nav prev"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M15 18 9 12l6-6" />
            </svg>
          </button>
          <img
            className="lightbox-image"
            src={photos[openIndex].src}
            alt={photos[openIndex].alt}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            className="lightbox-nav next"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) => (i === null ? i : (i + 1) % photos.length));
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 2: Write the gallery page**

```tsx
// site/src/app/gallery/page.tsx
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { Reveal } from "@/components/Reveal";
import { GalleryLightbox } from "@/components/GalleryLightbox";

const GALLERY_PHOTOS = [
  { src: "/assets/gallery/gallery-aerial-sunrise-convoy.jpg", alt: "Aerial view of an RB & Son convoy on a rural road at sunrise" },
  { src: "/assets/gallery/gallery-aerial-daylight-convoy.jpg", alt: "Aerial view of an RB & Son convoy on a rural road in daylight" },
  { src: "/assets/gallery/gallery-aerial-straight-road.jpg", alt: "Aerial view of trucks on a long straight road through farmland" },
  { src: "/assets/gallery/gallery-aerial-moody-fields.jpg", alt: "Aerial view of a lone truck on a road through green fields under a moody sky" },
  { src: "/assets/gallery/gallery-aerial-water-reflection.jpg", alt: "Aerial view of a convoy passing a farm dam reflecting the sky" },
  { src: "/assets/gallery/gallery-aerial-wet-road-convoy.jpg", alt: "Aerial view of a convoy on a wet road after rain" },
  { src: "/assets/gallery/gallery-curve-golden-morning.jpg", alt: "Trucks rounding a curve in golden morning light" },
  { src: "/assets/gallery/gallery-cab-front-canola.jpg", alt: "RB & Son truck cab front-on, canola field in the background" },
  { src: "/assets/gallery/gallery-side-profile-curve.jpg", alt: "Truck and trailer side profile rounding a curve" },
  { src: "/assets/gallery/gallery-rear-green-field.jpg", alt: "RB & Son truck rear three-quarter view beside a green field" },
  { src: "/assets/gallery/gallery-rear-canola-field.jpg", alt: "RB & Son truck rear three-quarter view beside a canola field" },
  { src: "/assets/gallery/gallery-dramatic-sky-convoy.jpg", alt: "Convoy of trucks under a dramatic cloudy sky" },
  { src: "/assets/gallery/gallery-team-canola-posed.jpg", alt: "RB & Son crew posed in front of the trucks in a canola field" },
  { src: "/assets/gallery/gallery-team-canola-standing.jpg", alt: "RB & Son crew standing together in a canola field" },
  { src: "/assets/gallery/gallery-team-blue-hour.jpg", alt: "RB & Son crew beside a truck at dusk" },
  { src: "/assets/gallery/gallery-branded-side-flare.jpg", alt: "RB & Son Transport branded trailer side, lit by low sun" },
  { src: "/assets/gallery/gallery-branded-closeup-sunset.jpg", alt: "Close-up of an RB & Son Transport branded trailer at sunset" },
  { src: "/assets/gallery/gallery-weathered-trailer-dusk.jpg", alt: "A weathered RB & Son Transport trailer at dusk" },
  { src: "/assets/gallery/gallery-convoy-departing-dusk.jpg", alt: "Convoy of trucks departing at dusk" },
  { src: "/assets/gallery/gallery-driver-canola-backlit.jpg", alt: "Driver walking beside trucks in a canola field, backlit by the sun" },
];

const FACILITY_PHOTOS = [
  { src: "/assets/premises-day.jpg", alt: "RB & Son Transport's Saxdowne facility in daylight" },
  { src: "/assets/premises-night.jpg", alt: "RB & Son Transport's Saxdowne facility lit up at night" },
];

export const metadata = {
  title: "Gallery — RB & Son Transport",
  description: "Photos of the RB & Son Transport fleet, crew and facility.",
};

export default function GalleryPage() {
  return (
    <>
      <TopBar />
      <Header />
      <main id="top">
        <section className="gallery-page">
          <div className="wrap">
            <Reveal className="section-head">
              <p className="eyebrow">Gallery</p>
              <h2>The fleet, the crew, the road</h2>
              <p>Twenty-five years of freight, in photos.</p>
            </Reveal>
            <GalleryLightbox photos={GALLERY_PHOTOS} />
          </div>
        </section>
        <section className="gallery-page facility-gallery">
          <div className="wrap">
            <Reveal className="section-head">
              <p className="eyebrow">Facility</p>
              <h2>The Saxdowne base</h2>
            </Reveal>
            <GalleryLightbox photos={FACILITY_PHOTOS} />
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
```

- [ ] **Step 3: Add CSS**

Append to `site/src/app/globals.css`:

```css
/* ---------- gallery page ---------- */
.gallery-page {
  background: var(--paper);
}
.facility-gallery {
  background: var(--paper-dim);
}
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}
.gallery-cell {
  position: relative;
  aspect-ratio: 4 / 3;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid var(--line);
  padding: 0;
  cursor: pointer;
  background: none;
}
.gallery-cell img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  display: block;
}
.gallery-cell:hover img {
  transform: scale(1.05);
}
.gallery-lightbox {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(6, 15, 8, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}
.lightbox-image {
  max-width: min(1100px, 90vw);
  max-height: 85vh;
  object-fit: contain;
  border-radius: 4px;
}
.lightbox-close,
.lightbox-nav {
  position: absolute;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(232, 185, 35, 0.35);
  color: #f6d24c;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.lightbox-close svg,
.lightbox-nav svg {
  width: 20px;
  height: 20px;
}
.lightbox-close {
  top: 20px;
  right: 20px;
}
.lightbox-nav.prev {
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
}
.lightbox-nav.next {
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
}
@media (max-width: 780px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

- [ ] **Step 4: Update nav links**

In `site/src/components/Header.tsx`, change `NAV_LINKS` to:

```tsx
const NAV_LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/#fleet", label: "Fleet" },
  { href: "/#about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/#routes", label: "Routes" },
  { href: "/#faq", label: "FAQ" },
  { href: "/news", label: "News" },
  { href: "/#contact", label: "Contact" },
];
```

Apply the identical array to `NAV_LINKS` in `site/src/components/Footer.tsx`.

- [ ] **Step 5: Verify and commit**

```bash
cd site
pnpm build
pnpm dev &
sleep 3
curl -s http://localhost:3000/gallery | grep -c '<img'
kill %1

git add src/app/gallery src/components/GalleryLightbox.tsx src/app/globals.css src/components/Header.tsx src/components/Footer.tsx
git commit -m "Add gallery page with lightbox and nav links"
```

---

## Task 3: News list page and data

**Goal:** A `/news` route listing the 4 ported articles as cards (title, date, excerpt, thumbnail).

**Files:**
- Create: `site/src/lib/news.ts`
- Create: `site/src/app/news/page.tsx`
- Modify: `site/src/app/globals.css` (append `/* ---------- news ---------- */`)

**Acceptance Criteria:**
- [ ] `/news` lists all 4 articles with title, date, excerpt, and a link to each detail page
- [ ] `src/lib/news.ts` exports a typed `NEWS_ARTICLES` array consumable by both the list and detail pages
- [ ] `pnpm build` succeeds

**Verify:**
```bash
pnpm build
pnpm dev &
sleep 3
curl -s http://localhost:3000/news | grep -c 'news-card'   # expect 4
kill %1
```

**Steps:**

- [ ] **Step 1: Write the news data file**

```ts
// site/src/lib/news.ts
export type NewsArticle = {
  slug: string;
  title: string;
  dateLabel: string;
  excerpt: string;
  coverImage: string;
  coverImageAlt: string;
  coverImageIsIllustrative?: boolean;
  body: string[];
  quote?: { text: string; attribution: string };
};

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    slug: "parcels-for-those-in-need-covid-19-level-5",
    title: "Parcels for those in need – COVID-19 Level 5",
    dateLabel: "June 2020",
    excerpt:
      "During South Africa's COVID-19 Level 5 lockdown, RB & Son helped deliver parcels to underprivileged communities.",
    coverImage: "/assets/news/news-parcels-1.jpg",
    coverImageAlt: "RB & Son team loading aid parcels during COVID-19 Level 5 lockdown",
    body: [
      "South Africa entered COVID-19 Level 5 lockdown in 2020, and RB & Son Transport (Cape) assisted in delivering parcels to various centres to help the underprivileged and poor.",
    ],
  },
  {
    slug: "helping-farmers-in-the-karoo",
    title: "Helping farmers in the Karoo",
    dateLabel: "June 2020",
    excerpt:
      "RB & Son transported donated animal feed to farmers in the Carnarvon area during a difficult drought period.",
    coverImage: "/assets/gallery/gallery-aerial-moody-fields.jpg",
    coverImageAlt: "RB & Son truck en route through farmland (illustrative photo)",
    coverImageIsIllustrative: true,
    body: [
      "RB & Son transported feed to the Carnarvon area for farmers in need during a period of severe drought in the Karoo.",
    ],
    quote: {
      text: "I have no words… this delivery was made to our farm. A surprise from old hunting friends. That's my mom sobbing as the truck drives into our yard. They hoped for 8 tons of donations, they ended up filling a 14 ton truck.",
      attribution: "Grethe Vos",
    },
  },
  {
    slug: "giving-back",
    title: "Giving Back",
    dateLabel: "June 2020",
    excerpt:
      "RB & Son donated transport services to the farming sector in the drought-hit Klawer district.",
    coverImage: "/assets/gallery/gallery-rear-canola-field.jpg",
    coverImageAlt: "RB & Son truck on a rural route (illustrative photo)",
    coverImageIsIllustrative: true,
    body: [
      "RB & Son Transport (Cape) gives back to socioeconomic development. We donated our transport services to the farming sector in the Klawer district's drought-affected areas.",
    ],
  },
  {
    slug: "exclusive-cargo-dangerous-goods-delivery-service",
    title: "Exclusive cargo / dangerous goods delivery service",
    dateLabel: "June 2020",
    excerpt:
      "A look at RB & Son's dangerous goods and exclusive cargo capability, running nationwide from Cape Town and Port Elizabeth.",
    coverImage: "/assets/news/news-dangerous-goods-1.jpg",
    coverImageAlt: "RB & Son truck handling exclusive cargo",
    body: [
      "We at RB & Son pride ourselves on our exclusive cargo and dangerous goods delivery service, nationwide. With branches in Cape Town and Port Elizabeth, we strive to give the best service possible.",
      "For warehousing, distribution, containerisation, or any kind of transportation — give us a call.",
    ],
  },
];

export function getNewsArticle(slug: string): NewsArticle | undefined {
  return NEWS_ARTICLES.find((a) => a.slug === slug);
}
```

- [ ] **Step 2: Write the news list page**

```tsx
// site/src/app/news/page.tsx
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { NEWS_ARTICLES } from "@/lib/news";

export const metadata = {
  title: "News — RB & Son Transport",
  description: "News and community stories from RB & Son Transport.",
};

export default function NewsPage() {
  return (
    <>
      <TopBar />
      <Header />
      <main id="top">
        <section className="news-page">
          <div className="wrap">
            <Reveal className="section-head">
              <p className="eyebrow">News</p>
              <h2>Stories from the road</h2>
            </Reveal>
            <RevealGroup className="news-grid">
              {NEWS_ARTICLES.map((article) => (
                <RevealItem className="news-card" key={article.slug}>
                  <a href={`/news/${article.slug}`}>
                    <div className="news-card-photo">
                      <img src={article.coverImage} alt={article.coverImageAlt} loading="lazy" />
                    </div>
                    <div className="news-card-body">
                      <span className="news-date">{article.dateLabel}</span>
                      <h3>{article.title}</h3>
                      <p>{article.excerpt}</p>
                    </div>
                  </a>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
```

- [ ] **Step 3: Add CSS**

Append to `site/src/app/globals.css`:

```css
/* ---------- news ---------- */
.news-page {
  background: var(--paper);
}
.news-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}
.news-card a {
  display: block;
  background: var(--card-bg);
  border: 1px solid var(--line);
  border-radius: 6px;
  overflow: hidden;
  box-shadow: var(--shadow);
  text-decoration: none;
  color: inherit;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.news-card a:hover {
  transform: translateY(-4px);
  box-shadow: 0 22px 44px -18px rgba(8, 25, 10, 0.45);
}
.news-card-photo {
  height: 200px;
  overflow: hidden;
}
.news-card-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.news-card-body {
  padding: 20px 22px 24px;
}
.news-date {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--gold-deep);
}
:root[data-theme="dark"] .news-date {
  color: var(--gold-bright);
}
@media (prefers-color-scheme: dark) {
  .news-date {
    color: var(--gold-bright);
  }
}
.news-card-body h3 {
  margin: 8px 0 8px;
  font-size: 1.2rem;
  color: var(--ink);
}
.news-card-body p {
  margin: 0;
  color: var(--steel);
  font-size: 0.92rem;
  line-height: 1.55;
}
@media (max-width: 700px) {
  .news-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 4: Verify and commit**

```bash
cd site
pnpm build
pnpm dev &
sleep 3
curl -s http://localhost:3000/news | grep -c 'news-card'
kill %1

git add src/lib/news.ts src/app/news/page.tsx src/app/globals.css
git commit -m "Add news list page with 4 ported articles"
```

---

## Task 4: News article detail page

**Goal:** A `/news/[slug]` route rendering one article's full body, photos, and (where present) customer quote.

**Files:**
- Create: `site/src/app/news/[slug]/page.tsx`
- Modify: `site/src/app/globals.css` (append to the news section)

**Acceptance Criteria:**
- [ ] Each of the 4 article slugs renders its title, date, full body paragraphs, and cover image
- [ ] The Karoo article renders its customer quote in a visually distinct blockquote
- [ ] An unknown slug renders Next.js's `notFound()` 404, not a crash
- [ ] `pnpm build` succeeds (static params generated for all 4 slugs)

**Verify:**
```bash
pnpm build
pnpm dev &
sleep 3
curl -s http://localhost:3000/news/helping-farmers-in-the-karoo | grep -c 'Grethe Vos'   # expect 1
curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/news/does-not-exist         # expect 404
kill %1
```

**Steps:**

- [ ] **Step 1: Write the detail page**

```tsx
// site/src/app/news/[slug]/page.tsx
import { notFound } from "next/navigation";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { Reveal } from "@/components/Reveal";
import { NEWS_ARTICLES, getNewsArticle } from "@/lib/news";

export function generateStaticParams() {
  return NEWS_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getNewsArticle(slug);
  if (!article) return {};
  return { title: `${article.title} — RB & Son Transport`, description: article.excerpt };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getNewsArticle(slug);
  if (!article) notFound();

  return (
    <>
      <TopBar />
      <Header />
      <main id="top">
        <article className="news-article">
          <div className="wrap news-article-inner">
            <Reveal className="section-head">
              <span className="news-date">{article.dateLabel}</span>
              <h1>{article.title}</h1>
            </Reveal>
            <Reveal className="news-article-photo">
              <img src={article.coverImage} alt={article.coverImageAlt} />
              {article.coverImageIsIllustrative && (
                <span className="news-photo-note">Illustrative photo</span>
              )}
            </Reveal>
            <Reveal className="news-article-body">
              {article.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
              {article.quote && (
                <blockquote className="news-quote">
                  <p>&ldquo;{article.quote.text}&rdquo;</p>
                  <cite>— {article.quote.attribution}</cite>
                </blockquote>
              )}
            </Reveal>
            <Reveal>
              <a className="btn btn-outline-gold" href="/news">
                ← Back to news
              </a>
            </Reveal>
          </div>
        </article>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
```

- [ ] **Step 2: Add CSS**

Append to the `/* ---------- news ---------- */` section in `globals.css`:

```css
.news-article {
  background: var(--paper);
}
.news-article-inner {
  max-width: 720px;
}
.news-article h1 {
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  margin: 10px 0 24px;
  color: var(--ink);
}
.news-article-photo {
  position: relative;
  margin-bottom: 28px;
  border-radius: 6px;
  overflow: hidden;
}
.news-article-photo img {
  width: 100%;
  display: block;
}
.news-photo-note {
  position: absolute;
  right: 10px;
  bottom: 10px;
  background: rgba(0, 0, 0, 0.6);
  color: #f5f7f0;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 4px 9px;
  border-radius: 3px;
}
.news-article-body p {
  color: var(--ink);
  line-height: 1.7;
  font-size: 1.02rem;
  margin: 0 0 18px;
}
.news-quote {
  margin: 24px 0;
  padding: 18px 22px;
  border-left: 3px solid var(--gold);
  background: var(--paper-dim);
  border-radius: 0 6px 6px 0;
}
.news-quote p {
  margin: 0 0 8px;
  font-style: italic;
  color: var(--ink);
}
.news-quote cite {
  font-size: 0.85rem;
  color: var(--steel);
}
```

- [ ] **Step 3: Verify and commit**

```bash
cd site
pnpm build
pnpm dev &
sleep 3
curl -s http://localhost:3000/news/helping-farmers-in-the-karoo | grep -c 'Grethe Vos'
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/news/does-not-exist
kill %1

git add src/app/news/\[slug\] src/app/globals.css
git commit -m "Add news article detail page"
```

---

## Task 5: FAQ section

**Goal:** A drafted, accordion-style FAQ section added to the homepage between `Routes` and `Contact`, with a nav link.

**Files:**
- Create: `site/src/components/FAQ.tsx`
- Modify: `site/src/app/page.tsx` (insert `<FAQ />` between `<Routes />` and `<Contact />`)
- Modify: `site/src/app/globals.css` (append `/* ---------- faq ---------- */`)

**Acceptance Criteria:**
- [ ] `/#faq` section renders 7 questions, each collapsed by default, expandable independently (not single-open-only)
- [ ] Each question has a visible expand/collapse affordance and works via click and Enter/Space (native `<button>`)
- [ ] `pnpm build` succeeds

**Verify:**
```bash
pnpm build
pnpm dev &
sleep 3
curl -s http://localhost:3000/ | grep -c 'faq-question'   # expect 7
kill %1
```

**Steps:**

- [ ] **Step 1: Write the FAQ component**

```tsx
// site/src/components/FAQ.tsx
"use client";

import { useState } from "react";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

type QA = { question: string; answer: string };

const FAQS: QA[] = [
  {
    question: "How quickly can I get a quote?",
    answer:
      "Submit the quote form with your pickup, drop-off and load details and the branch closest to your freight responds directly — most quotes go out the same business day.",
  },
  {
    question: "What areas do you cover?",
    answer:
      "Scheduled weekly runs between Cape Town, Port Elizabeth, Johannesburg and Durban, plus regular service into the Northern Cape (Eden Karoo, Keimoes, Grootdrink) and Western Cape farming districts.",
  },
  {
    question: "Can you handle dangerous goods?",
    answer:
      "Yes — RB & Son is SQAS approved and handles full compliance paperwork, placarding and handling protocols for dangerous and hazardous cargo, nationwide.",
  },
  {
    question: "What size loads can your fleet take?",
    answer:
      "From 1-ton local drops to 34-ton long-haul combinations, using a mix of owned vehicles and vetted subcontractors for peak demand.",
  },
  {
    question: "Do you offer warehousing as well as transport?",
    answer:
      "Yes — warehousing, dispatch and the full fleet operate out of the Saxdowne facility, so freight can be stored and consolidated between legs of a route.",
  },
  {
    question: "Is my cargo insured in transit?",
    answer:
      "RB & Son arranges Goods-in-Transit insurance as standard; customers who want cover to their goods' full value should also carry their own all-risk insurance — ask your branch for details.",
  },
  {
    question: "How do I pay, and what are the terms?",
    answer:
      "Standard terms are 30 days from invoice date unless otherwise agreed in writing. Full terms and conditions are available as a PDF download in the footer.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<Set<number>>(new Set());

  function toggle(i: number) {
    setOpenIndex((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  return (
    <section className="faq" id="faq">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">FAQ</p>
          <h2>Questions we get asked</h2>
        </Reveal>
        <RevealGroup className="faq-list">
          {FAQS.map((qa, i) => {
            const open = openIndex.has(i);
            return (
              <RevealItem className="faq-item" key={qa.question}>
                <button
                  type="button"
                  className="faq-question"
                  aria-expanded={open}
                  onClick={() => toggle(i)}
                >
                  <span>{qa.question}</span>
                  <svg
                    className={open ? "faq-chevron open" : "faq-chevron"}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {open && <p className="faq-answer">{qa.answer}</p>}
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Insert into the homepage**

In `site/src/app/page.tsx`, add the import:

```tsx
import { FAQ } from "@/components/FAQ";
```

And insert `<FAQ />` between `<Routes />` and `<Contact />`:

```tsx
        <Routes />
        <FAQ />
        <Contact />
```

- [ ] **Step 3: Add CSS**

Append to `site/src/app/globals.css`:

```css
/* ---------- faq ---------- */
.faq {
  background: var(--paper);
}
.faq-list {
  max-width: 720px;
}
.faq-item {
  border-bottom: 1px solid var(--line);
}
.faq-question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 18px 4px;
  background: none;
  border: none;
  text-align: left;
  font-size: 1.02rem;
  font-weight: 600;
  color: var(--ink);
  cursor: pointer;
}
.faq-chevron {
  width: 18px;
  height: 18px;
  flex: none;
  color: var(--gold-deep);
  transition: transform 0.2s ease;
}
:root[data-theme="dark"] .faq-chevron {
  color: var(--gold-bright);
}
@media (prefers-color-scheme: dark) {
  .faq-chevron {
    color: var(--gold-bright);
  }
}
.faq-chevron.open {
  transform: rotate(180deg);
}
.faq-answer {
  margin: 0 0 20px;
  padding-right: 30px;
  color: var(--steel);
  line-height: 1.6;
  font-size: 0.95rem;
}
```

- [ ] **Step 4: Verify and commit**

```bash
cd site
pnpm build
pnpm dev &
sleep 3
curl -s http://localhost:3000/ | grep -c 'faq-question'
kill %1

git add src/components/FAQ.tsx src/app/page.tsx src/app/globals.css
git commit -m "Add homepage FAQ section"
```

---

## Task 6: Terms & Conditions download link

**Goal:** A real, working download link to the T&Cs PDF, once the user has provided the file.

**Files:**
- Create: `site/public/documents/tandc.pdf` (provided by the user — see Step 1)
- Modify: `site/src/components/Footer.tsx`
- Modify: `site/src/components/Contact.tsx`

**Acceptance Criteria:**
- [ ] `public/documents/tandc.pdf` exists and is a valid PDF (`file public/documents/tandc.pdf` reports `PDF document`)
- [ ] Footer has a "Terms & Conditions" link pointing to `/documents/tandc.pdf` that opens/downloads the real file
- [ ] Contact section's quote form area also links to it (small print near the submit button)
- [ ] If the PDF is not yet present when this task is picked up, STOP and tell the user you need the file — do not generate a substitute PDF or fake the link target.

**Verify:**
```bash
file public/documents/tandc.pdf   # must report: PDF document
pnpm dev &
sleep 3
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/documents/tandc.pdf   # expect 200
kill %1
```

**Steps:**

- [ ] **Step 1: Confirm the file is available**

Check whether the user has already sent `tandc.pdf`. If not present anywhere accessible, pause this task and ask the user for it — do not proceed with a placeholder.

```bash
mkdir -p site/public/documents
# Move/copy the user-provided file into place, e.g.:
cp /path/to/tandc.pdf site/public/documents/tandc.pdf
file site/public/documents/tandc.pdf   # must report: PDF document
```

- [ ] **Step 2: Add the footer link**

In `site/src/components/Footer.tsx`, inside `.foot-bottom`, add a link next to the copyright line:

```tsx
        <div className="foot-bottom">
          <span>
            © 2026 RB &amp; Son Transport (Cape). Warehousing, distribution
            &amp; dangerous goods transport.
          </span>
          <a className="foot-terms" href="/documents/tandc.pdf" target="_blank" rel="noopener noreferrer">
            Terms &amp; Conditions
          </a>
        </div>
```

- [ ] **Step 3: Add the small-print link near the quote form**

In `site/src/components/Contact.tsx`, directly after the `<button>` that submits the quote form, add:

```tsx
                <p className="form-terms-note">
                  By submitting this form you agree to our{" "}
                  <a href="/documents/tandc.pdf" target="_blank" rel="noopener noreferrer">
                    Terms &amp; Conditions
                  </a>
                  .
                </p>
```

- [ ] **Step 4: Add CSS**

Append to the `/* ---------- footer ---------- */` section in `globals.css`:

```css
.foot-terms {
  color: var(--gold-bright);
  font-size: 0.82rem;
  text-decoration: none;
}
.foot-terms:hover {
  text-decoration: underline;
}
.form-terms-note {
  margin-top: 12px;
  font-size: 0.78rem;
  color: var(--steel);
}
.form-terms-note a {
  color: var(--gold-deep);
}
:root[data-theme="dark"] .form-terms-note a {
  color: var(--gold-bright);
}
```

- [ ] **Step 5: Verify and commit**

```bash
cd site
file public/documents/tandc.pdf
pnpm dev &
sleep 3
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/documents/tandc.pdf
kill %1

git add public/documents/tandc.pdf src/components/Footer.tsx src/components/Contact.tsx src/app/globals.css
git commit -m "Add Terms & Conditions PDF download link"
```

---

## Task ordering

Tasks 1 → 2 → 3 → 4 → 5 can run in that order without blocking each other except that Task 1 (assets) must complete before Task 2 (gallery page) and before Task 3 (news images used in the list page). Task 6 is independent of the others but blocked on the user actually sending `tandc.pdf` — it can be picked up whenever the file arrives, in any order relative to the rest.
