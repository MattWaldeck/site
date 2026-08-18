const NAV_LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/#fleet", label: "Fleet" },
  { href: "/#about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/#routes", label: "Routes" },
  { href: "/#faq", label: "FAQ" },
  { href: "/news", label: "News" },
  { href: "/#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-top">
          <a className="brand" href="/#top">
            <img
              className="logo-full"
              src="/assets/logo-full.jpg"
              alt="RB & Son Transport"
              width={1600}
              height={530}
              style={{ height: 34 }}
            />
          </a>
          <ul className="foot-nav">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="foot-bottom">
          <span>
            © 2026 RB &amp; Son Transport (Cape). Warehousing, distribution
            &amp; dangerous goods transport.
          </span>
          <a className="foot-terms" href="/documents/tandc.pdf" target="_blank" rel="noopener noreferrer">
            Terms &amp; Conditions
          </a>
        </div>
      </div>
    </footer>
  );
}
