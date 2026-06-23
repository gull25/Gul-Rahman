// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Add shadow when scrolled
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleNavClick(href, label) {
    setActive(label.toLowerCase());
    setMenuOpen(false);
    // Smooth scroll to section
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <nav className="navbar__inner">
        {/* Logo */}
        <div className="navbar__logo">
          Gul<span className="navbar__dot">.</span>
        </div>

        {/* Desktop Links */}
        <ul className="navbar__links">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`navbar__link ${active === link.label.toLowerCase() ? "navbar__link--active" : ""}`}
                onClick={() => handleNavClick(link.href, link.label)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Resume Button */}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="navbar__resume"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Resume
        </a>

        {/* Mobile Menu Toggle */}
        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="navbar__mobile">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`navbar__mobile-link ${active === link.label.toLowerCase() ? "navbar__mobile-link--active" : ""}`}
              onClick={() => handleNavClick(link.href, link.label)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar__mobile-resume"
          >
            Download Resume
          </a>
        </div>
      )}
    </header>
  );
}
