import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about">
      <div className="wrap about">
        <Reveal className="about-photo">
          <div className="ph main">
            <img
              src="/assets/office-sign.jpg"
              alt="RB & Son Transport head office signage"
              loading="lazy"
            />
            <div className="cap">Head office · Kuilsriver, Cape Town</div>
          </div>
          <div className="ph sub">
            <img
              src="/assets/premises-day.jpg"
              alt="RB & Son Transport's new premises building"
              loading="lazy"
            />
          </div>
        </Reveal>
        <Reveal className="about-copy" delay={0.1}>
          <p className="eyebrow">Family-run, freight-first</p>
          <h2>Built by two generations, still driven the same way</h2>
          <p>
            What started as a handful of trucks has grown into a fleet
            running the length of South Africa — but the people behind it
            haven&apos;t changed. RB &amp; Son is still run by the family
            that founded it, with drivers and warehouse crews who&apos;ve
            been part of the operation for years, not months.
          </p>
          <p>
            That continuity shows up in the details: the same crews handling
            your cargo run after run, and a leadership team that&apos;s easy
            to reach directly when something needs sorting out quickly.
          </p>
          <div className="clients">
            <p className="eyebrow">Trusted by</p>
            <div className="client-logos">
              <img src="/assets/clients/nulandis.png" alt="Nulandis" loading="lazy" />
              <img src="/assets/clients/savannah.png" alt="Savannah" loading="lazy" />
              <img src="/assets/clients/agas.svg" alt="A-Gas" loading="lazy" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
