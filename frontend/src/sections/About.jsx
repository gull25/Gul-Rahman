// src/sections/About.jsx
import { useEffect, useRef, useState } from "react";
import "./About.css";

const CHIPS = [
  "React JS",
  "TypeScript",
  "Next.js",
  "Tailwind CSS",
  "Figma",
  "Git",
  "REST APIs",
  "Accessibility",
  "Redux",
  "Node.js",
];

const INFO = [
  { label: "Location", value: "Lahore, Pakistan", highlight: false },
  { label: "Experience", value: "1+ Years", highlight: false },
  { label: "Availability", value: "Open to work", highlight: true },
  { label: "Education", value: "BS Software Engineering", highlight: false },
  { label: "Languages", value: "English, Urdu", highlight: false },
  { label: "Freelance", value: "Available", highlight: true },
];

export default function About() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`about ${visible ? "about--visible" : ""}`}
    >
      <div className="about__inner">
        {/* ── Section Header ── */}
        <div className="about__header">
          <span className="about__label">About me</span>
          <h2 className="about__title">Who I am</h2>
          <p className="about__subtitle">
            A passionate developer who loves turning ideas into reality through
            code.
          </p>
        </div>

        {/* ── Grid ── */}
        <div className="about__grid">
          {/* Left — Avatar Card */}
          <div className="about__left">
            {/* Avatar Box */}
            <div className="about__avatar-box">
              {/* Top pattern strip */}
              <div className="about__avatar-pattern" />

              {/* Avatar circle */}
              <div className="about__avatar-circle">GR</div>

              {/* Name + role */}
              <div className="about__avatar-name">Gul Rahman</div>
              <div className="about__avatar-role">Frontend Developer</div>

              {/* Location row */}
              <div className="about__avatar-location">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Lahore, Pakistan
              </div>

              {/* Divider */}
              <div className="about__avatar-divider" />

              {/* Social links */}
              <div className="about__socials">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about__social"
                  aria-label="GitHub"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61
                      c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77
                      5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38
                      0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5
                      4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44
                      7A3.37 3.37 0 0 0 9 18.13V22"
                    />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about__social"
                  aria-label="LinkedIn"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2
                      2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
                    />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about__social"
                  aria-label="Twitter"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      d="M23 3a10.9 10.9 0 0 1-3.14 1.53
                      4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9
                      5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5
                      a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
                    />
                  </svg>
                </a>
                <a
                  href="mailto:alex@example.com"
                  className="about__social"
                  aria-label="Email"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4
                      c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                    />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </a>
              </div>

              {/* Availability pill */}
              <div className="about__availability">
                <span className="about__avail-dot" />
                <span className="about__avail-text">Open to opportunities</span>
              </div>
            </div>

            {/* Mini stat cards below avatar */}
            <div className="about__mini-stats">
              <div className="about__mini-stat">
                <span className="about__mini-num">1+</span>
                <span className="about__mini-lbl">Years exp</span>
              </div>
              <div className="about__mini-stat about__mini-stat--border">
                <span className="about__mini-num">24</span>
                <span className="about__mini-lbl">Projects</span>
              </div>
              <div className="about__mini-stat">
                <span className="about__mini-num">12</span>
                <span className="about__mini-lbl">Clients</span>
              </div>
            </div>
          </div>

          {/* Right — Bio + Info */}
          <div className="about__right">
            {/* Bio */}
            <div className="about__bio-block">
              <h3 className="about__bio-heading">
                Building Digital Experiences That Matter
              </h3>
              <p className="about__bio-text">
                I'm a frontend developer with 1+ years of experience building
                production-grade web applications. I specialise in React
                ecosystems — from component architecture to performance
                optimisation and accessibility.
              </p>
              <p className="about__bio-text">
                I care deeply about the details: clean typography, thoughtful
                spacing, and interactions that feel natural. My code is as
                intentional as the designs I implement. I enjoy collaborating
                with designers and backend engineers to ship products people
                love to use.
              </p>
              <p className="about__bio-text">
                When I'm not coding, you'll find me writing about frontend
                development on my blog, contributing to open source, or
                exploring new tools that make the web faster and more
                accessible.
              </p>
            </div>

            {/* Tech Chips */}
            <div className="about__chips-block">
              <div className="about__chips-label">Technologies I work with</div>
              <div className="about__chips">
                {CHIPS.map((chip, i) => (
                  <span
                    key={chip}
                    className="about__chip"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            {/* Info Grid */}
            <div className="about__info-grid">
              {INFO.map((item) => (
                <div key={item.label} className="about__info-item">
                  <div className="about__info-label">{item.label}</div>
                  <div
                    className={`about__info-value ${
                      item.highlight ? "about__info-value--highlight" : ""
                    }`}
                  >
                    {item.highlight && <span className="about__info-dot" />}
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA row */}
            <div className="about__cta-row">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="about__cta-btn about__cta-btn--solid"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Resume
              </a>

              <a
                href="#contact"
                className="about__cta-btn about__cta-btn--ghost"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2
                    H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                  />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Let's Talk
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


