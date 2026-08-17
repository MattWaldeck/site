"use client";

import { useEffect, useState } from "react";
import { CONTACT } from "@/lib/contact";

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#fleet", label: "Fleet" },
  { href: "#about", label: "About" },
  { href: "#routes", label: "Routes" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setNavOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 980) setNavOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <header className={[scrolled && "scrolled", navOpen && "nav-open"].filter(Boolean).join(" ")}>
      <div className="nav">
        <a className="brand" href="#top">
          <img
            className="logo-full"
            src="/assets/logo-full.jpg"
            alt="RB & Son Transport"
            width={1600}
            height={530}
          />
        </a>
        <ul className="links" id="site-nav">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setNavOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
          <li className="nav-cta">
            <a
              className="btn btn-gold"
              href="#contact"
              onClick={() => setNavOpen(false)}
            >
              Request a Quote
            </a>
          </li>
        </ul>
        <div className="header-ctas">
          <a className="btn btn-outline-gold" href={CONTACT.phoneHref}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            Call Now
          </a>
          <a className="btn btn-gold" href="#contact">
            Request a Quote
          </a>
        </div>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={navOpen}
          aria-controls="site-nav"
          aria-label="Toggle menu"
          onClick={() => setNavOpen((v) => !v)}
        >
          <svg
            className="icon-open"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#F6D24C"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <svg
            className="icon-close"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#F6D24C"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="5" y1="5" x2="19" y2="19" />
            <line x1="5" y1="19" x2="19" y2="5" />
          </svg>
        </button>
      </div>
    </header>
  );
}
