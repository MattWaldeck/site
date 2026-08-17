import { Reveal } from "./Reveal";

export function Banner() {
  return (
    <section className="banner" aria-label="National coverage">
      <div className="banner-media">
        <img
          src="/assets/convoy-sunrise.jpg"
          alt="RB & Son truck convoy at dawn"
          loading="lazy"
        />
      </div>
      <div className="banner-cap">
        <Reveal>
          <p className="eyebrow">National coverage</p>
          <p>
            Scheduled runs the length of South Africa —{" "}
            <b>Cape Town, Port Elizabeth, Johannesburg and Durban</b>, on
            fixed weekly routes.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
