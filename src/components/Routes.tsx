import { Reveal, RevealGroup, RevealItem } from "./Reveal";

type Route = {
  label: string;
  tag: string;
};

const ROUTES: Route[] = [
  { label: "Cape Town ⇄ Durban", tag: "Break-bulk" },
  { label: "Cape Town ⇄ Johannesburg", tag: "Break-bulk" },
  { label: "Cape Town ⇄ Port Elizabeth", tag: "Break-bulk" },
  { label: "Eden Karoo", tag: "Weekly" },
  { label: "Keimoes", tag: "Weekly" },
  { label: "Grootdrink", tag: "Weekly" },
];

export function Routes() {
  return (
    <section className="routes" id="routes">
      <div className="wrap routes-inner">
        <Reveal className="section-head" style={{ maxWidth: "560px" }}>
          <p className="eyebrow">Where we run</p>
          <h2 style={{ color: "#F5F7F0" }}>
            National coverage, Western &amp; Northern Cape depth
          </h2>
        </Reveal>
        <RevealGroup className="route-list">
          {ROUTES.map((route) => (
            <RevealItem className="route-row" key={route.label}>
              <span className="pulse" aria-hidden="true" />
              <b>{route.label}</b>
              <span>{route.tag}</span>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal delay={0.2}>
          <p className="route-note">
            Regular scheduled service into the Northern Cape means freight
            bound for remote routes doesn&apos;t need to wait for a full
            truckload — it rides the same weekly run.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
