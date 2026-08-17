import { Reveal, RevealGroup, RevealItem } from "./Reveal";

type Reason = {
  icon: React.ReactNode;
  title: string;
  copy: string;
};

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

const REASONS: Reason[] = [
  {
    icon: (
      <Icon>
        <path d="M12 2 3 6v6c0 5 3.8 8.7 9 10 5.2-1.3 9-5 9-10V6z" />
        <path d="m9 12 2 2 4-4" />
      </Icon>
    ),
    title: "SQAS Approved Supplier",
    copy: "Independently assessed since 2016 against the Safety & Quality Assessment System used across the chemical industry.",
  },
  {
    icon: (
      <Icon>
        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L14.71 3.86a2 2 0 0 0-3.42 0Z" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </Icon>
    ),
    title: "Dangerous Goods Specialist",
    copy: "Certified to move what most carriers won't touch — full compliance paperwork, placarding and handling protocols included.",
  },
  {
    icon: (
      <Icon>
        <path d="M8.5 14.5 4 19M8.5 14.5 12 11M8.5 14.5 5 11" />
        <circle cx="12" cy="6" r="3" />
        <path d="M17.5 14.5 21 19M17.5 14.5 14 11M17.5 14.5 21 11" />
      </Icon>
    ),
    title: "In-House Safety Training",
    copy: "Every driver and warehouse hand is trained internally — firefighting and first aid included, not outsourced.",
  },
  {
    icon: (
      <Icon>
        <path d="M20 6 9 17l-5-5" />
      </Icon>
    ),
    title: "B-BBEE Certified",
    copy: "Broad-based Black Economic Empowerment certified, verified annually.",
  },
  {
    icon: (
      <Icon>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </Icon>
    ),
    title: "25+ Years on the Road",
    copy: "A quarter-century in South African freight, with leadership bringing nearly a century of combined experience.",
  },
  {
    icon: (
      <Icon>
        <path d="M17 20h5v-1a4 4 0 0 0-4-4h-1" />
        <path d="M9 20H4v-1a4 4 0 0 1 4-4h1" />
        <circle cx="9" cy="7" r="4" />
        <circle cx="17" cy="9" r="3" />
      </Icon>
    ),
    title: "Open-Door Culture",
    copy: "Low staff turnover isn't an accident — concerns reach leadership directly, no chain of command required.",
  },
];

export function WhyChoose() {
  return (
    <section className="why-choose">
      <div className="wrap">
        <Reveal className="section-head" style={{ margin: "0 auto 44px", textAlign: "center" }}>
          <p className="eyebrow">Why Choose Us</p>
          <h2>What 25 years of hauling freight actually earns you</h2>
        </Reveal>
        <RevealGroup className="why-grid">
          {REASONS.map((reason) => (
            <RevealItem className="why-card" key={reason.title}>
              <div className="why-icon">{reason.icon}</div>
              <h3>{reason.title}</h3>
              <p>{reason.copy}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
