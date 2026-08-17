import { Reveal, RevealGroup, RevealItem } from "./Reveal";

type Shot = {
  image: string;
  alt: string;
  label: string;
};

const SHOTS: Shot[] = [
  {
    image: "/assets/pallets-flatbed.jpg",
    alt: "RB & Son truck on the road at dusk with the moon overhead",
    label: "Night haul · N1",
  },
  {
    image: "/assets/fleet-lineup.jpg",
    alt: "Fleet of trucks parked at the yard",
    label: "Fleet yard",
  },
  {
    image: "/assets/night-globetrotter.jpg",
    alt: "Drums of cargo secured and loaded on a flatbed",
    label: "Cargo, secured",
  },
  {
    image: "/assets/rear-doors.jpg",
    alt: "Volvo Globetrotter truck at golden hour",
    label: "Golden hour · N7",
  },
  {
    image: "/assets/volvo-clean.jpg",
    alt: "Volvo Globetrotter truck fully branded and ready at the depot",
    label: "Ready to roll",
  },
];

export function RoadSection() {
  return (
    <section className="road-section" id="fleet">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">On the road</p>
          <h2>Day shifts, night hauls, every load secured</h2>
          <p>
            A look at the fleet, the yard and the cargo — the same trucks
            your freight would ride in.
          </p>
        </Reveal>
        <RevealGroup className="filmstrip" stagger={0.06}>
          {SHOTS.map((shot) => (
            <RevealItem className="cell" key={shot.label}>
              <img src={shot.image} alt={shot.alt} loading="lazy" />
              <span className="lbl">{shot.label}</span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
