import { Reveal } from "./Reveal";
import { CONTACT } from "@/lib/contact";

export function Hero() {
  return (
    <section className="hero" aria-label="Introduction">
      <div className="hero-inner">
        <Reveal>
          <p className="eyebrow">
            Cape Town · Port Elizabeth · Johannesburg · Durban
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1>
            25 years on&nbsp;the&nbsp;road,
            <br />
            never off <em>schedule</em>.
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p>
            RB &amp; Son Transport hauls break-bulk, dangerous goods and
            long-haul freight the length of South Africa — backed by
            warehousing at every branch and a safety record built over 25
            years.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="hero-chips">
            <span className="chip">
              <span className="dot" />
              SQAS Certified
            </span>
            <span className="chip">
              <span className="dot" />
              B-BBEE Certified
            </span>
            <span className="chip">
              <span className="dot" />
              25+ Years Experience
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.32}>
          <div className="hero-ctas">
            <a className="btn btn-gold" href="#contact">
              Get a Freight Quote
            </a>
            <a className="btn btn-ghost" href="#fleet">
              View Our Fleet
            </a>
            <a
              className="btn btn-whatsapp"
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.6 6.32A7.85 7.85 0 0 0 12.05 4a7.94 7.94 0 0 0-6.9 11.9L4 20l4.2-1.1a7.9 7.9 0 0 0 3.85 1h.01a7.94 7.94 0 0 0 5.6-13.58zm-5.55 12.2h-.01a6.6 6.6 0 0 1-3.36-.92l-.24-.14-2.5.65.67-2.43-.16-.25a6.6 6.6 0 0 1 10.2-8.29 6.55 6.55 0 0 1 1.94 4.67 6.62 6.62 0 0 1-6.54 6.71zm3.6-4.94c-.2-.1-1.17-.58-1.35-.64s-.32-.1-.45.1-.5.64-.62.77-.23.15-.43.05a5.4 5.4 0 0 1-1.6-.99 6 6 0 0 1-1.1-1.37c-.12-.2 0-.3.09-.4s.2-.23.29-.35a1.3 1.3 0 0 0 .2-.33.37.37 0 0 0 0-.35c-.05-.1-.45-1.08-.61-1.48s-.32-.33-.45-.34h-.38a.74.74 0 0 0-.53.25 2.24 2.24 0 0 0-.7 1.67 3.9 3.9 0 0 0 .81 2.06 8.9 8.9 0 0 0 3.42 3.02 3.9 3.9 0 0 0 2.4.5 2.05 2.05 0 0 0 1.35-.95 1.67 1.67 0 0 0 .11-.95c-.05-.09-.18-.14-.38-.24z" />
              </svg>
              WhatsApp Us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
