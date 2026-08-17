import { Reveal } from "./Reveal";

export function Premises() {
  return (
    <section className="premises" aria-label="New premises">
      <div className="premises-cap">
        <Reveal>
          <p className="eyebrow">New facility</p>
          <h2>A modern base for the whole operation</h2>
          <p>
            Completed in December 2023 on Saxdowne &amp; Stellenbosch
            Arterial Roads, the new premises brings warehousing, dispatch
            and the full fleet under one roof — built to keep pace with
            25 years of growth.
          </p>
        </Reveal>
      </div>
      <div className="premises-media">
        <img
          src="/assets/premises-night.jpg"
          alt="RB & Son Transport's new premises lit up at night"
          loading="lazy"
        />
      </div>
    </section>
  );
}
