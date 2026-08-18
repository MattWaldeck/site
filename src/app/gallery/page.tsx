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
              <h1>The fleet, the crew, the road</h1>
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
