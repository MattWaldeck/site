import { Reveal, RevealGroup, RevealItem } from "./Reveal";

type ServiceCard = {
  image: string;
  tag: string;
  title: string;
  copy: string;
};

const SERVICES: ServiceCard[] = [
  {
    image: "/assets/green-fleet-yard.jpg",
    tag: "1–34 Ton",
    title: "Fleet Services",
    copy: "A diversified fleet built to handle everything from single-ton local deliveries to full long-haul combinations, plus vetted subcontractor capacity for peak demand.",
  },
  {
    image: "/assets/forklift-drums.jpg",
    tag: "CPT · PE",
    title: "Warehousing",
    copy: "Container packing and unpacking, secure cargo storage and local delivery coordination — including our newest facility in Perseverance, Port Elizabeth.",
  },
  {
    image: "/assets/dangerous-goods.jpg",
    tag: "SQAS",
    title: "Dangerous Goods",
    copy: "SQAS-approved handling of hazardous cargo, with crews trained internally in firefighting and first aid so your cargo — and our people — stay safe.",
  },
  {
    image: "/assets/bagged-flatbed.jpg",
    tag: "450T/WK",
    title: "Long & Short Haul",
    copy: "Over 450 tons of break-bulk cargo moved weekly between Cape Town, Durban, Johannesburg and Port Elizabeth, plus scheduled Northern & Western Cape routes.",
  },
];

export function Services() {
  return (
    <section id="services">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">What we move</p>
          <h2>Fleet, warehousing &amp; specialised freight</h2>
          <p>
            From 1-ton local drops to 34-ton long-haul loads — RB &amp; Son
            diversified its fleet to match the clients it serves, with owned
            vehicles and vetted subcontractors on call.
          </p>
        </Reveal>
        <RevealGroup className="services-grid">
          {SERVICES.map((service) => (
            <RevealItem className="service-card" key={service.title}>
              <div
                className="photo"
                style={{ backgroundImage: `url(${service.image})` }}
              >
                <span className="tag">{service.tag}</span>
              </div>
              <div className="body">
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
                <a className="card-link" href="#contact">
                  Request a Quote
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
