// src/components/Footer.jsx
import "./Footer.css";

const FOOTER_LINKS = {
  Navigation: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ],
  Connect: [
    { label: "GitHub", href: "https://github.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Twitter", href: "https://twitter.com" },
    { label: "Email", href: "mailto:alex@example.com" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  function handleNavClick(href) {
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <footer className="footer">
      <div className="footer__inner">
        {/* ── Top Row ── */}
        <div className="footer__top">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              Alex<span className="footer__logo-dot">.</span>
            </div>
            <p className="footer__brand-desc">
              Frontend Developer building clean, accessible, and performant web
              experiences with React.
            </p>
            <div className="footer__socials">
              {[
                {
                  label: "GitHub",
                  href: "https://github.com",
                  icon: (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37
                      3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44
                      5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65
                      16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09
                      1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5
                      3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0
                      9 18.13V22"
                      />
                    </svg>
                  ),
                },
                {
                  label: "LinkedIn",
                  href: "https://linkedin.com",
                  icon: (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2
                      2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
                      />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  ),
                },
                {
                  label: "Twitter",
                  href: "https://twitter.com",
                  icon: (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0
                      0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64
                      11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0
                      0-.08-.83A7.72 7.72 0 0 0 23 3z"
                      />
                    </svg>
                  ),
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Groups */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group} className="footer__link-group">
              <div className="footer__group-title">{group}</div>
              <ul className="footer__link-list">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="footer__link"
                      target={
                        link.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        link.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      onClick={
                        link.href.startsWith("#")
                          ? (e) => {
                              e.preventDefault();
                              handleNavClick(link.href);
                            }
                          : undefined
                      }
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Status card */}
          <div className="footer__status-card">
            <div className="footer__status-label">Current status</div>
            <div className="footer__status-row">
              <span className="footer__status-dot" />
              <span className="footer__status-text">Open to opportunities</span>
            </div>
            <div className="footer__status-tags">
              <span className="footer__status-tag">Freelance</span>
              <span className="footer__status-tag">Full-time</span>
              <span className="footer__status-tag">Remote</span>
            </div>
            <a
              href="#contact"
              className="footer__contact-btn"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get in touch
            </a>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="footer__divider" />

        {/* ── Bottom Row ── */}
        <div className="footer__bottom">
          <div className="footer__copy">
            © {year} Alex Johnson. All rights reserved.
          </div>
          <div className="footer__bottom-links">
            <a href="#" className="footer__bottom-link">
              Privacy Policy
            </a>
            <a href="#" className="footer__bottom-link">
              Terms of Service
            </a>
          </div>
          <div className="footer__made-with">Built with React & ♥</div>
        </div>
      </div>
    </footer>
  );
}
