// src/sections/Experience.jsx
import { useEffect, useRef, useState } from "react";
import "./Experience.css";

// ── Data ──────────────────────────────────────────
const EXPERIENCES = [
  {
    id: 1,
    type: "work",
    period: "Feb 2026 — Present",
    role: "Frontend Developer",
    company: "IIFA TECH",
    location: "Lahore, Pakistan",
    type_label: "Full-time",
    current: true,
    description: [
      "Leading the frontend of a SaaS dashboard serving 5,000+ daily active users, built with React and TypeScript.",
      "Architected a scalable component library used across 3 product teams, reducing UI inconsistencies by 60%.",
      "Reduced bundle size by 38% through code-splitting, lazy loading, and tree-shaking optimisations.",
      "Mentored 2 junior developers and conducted regular code reviews to maintain code quality standards.",
    ],
    tags: ["React", "TypeScript", "Redux Toolkit", "Tailwind CSS", "REST APIs"],
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    id: 2,
    type: "work",
    period: "Jun 2022 — Dec 2022",
    role: "Junior Frontend Developer",
    company: "NexaLabs",
    location: "Lahore, Pakistan",
    type_label: "Full-time",
    current: false,
    description: [
      "Built and maintained reusable UI components for a fintech product with 10,000+ monthly users.",
      "Collaborated closely with designers to implement pixel-perfect, accessible interfaces from Figma specs.",
      "Wrote unit and integration tests using Jest and React Testing Library, achieving 80% code coverage.",
      "Integrated third-party APIs including payment gateways and real-time data feeds.",
    ],
    tags: ["React", "JavaScript", "CSS Modules", "Jest", "Figma"],
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    id: 3,
    type: "work",
    period: "Jan 2022 — May 2022",
    role: "Frontend Intern",
    company: "Pixel Studio",
    location: "Remote",
    type_label: "Internship",
    current: false,
    description: [
      "Developed responsive landing pages and marketing sites for 5+ client projects.",
      "Learned React fundamentals and modern JavaScript patterns in a fast-paced agency environment.",
      "Collaborated with senior developers via Git and participated in daily stand-ups.",
    ],
    tags: ["HTML/CSS", "JavaScript", "React", "Git"],
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    id: 4,
    type: "education",
    period: "2021 — 2025",
    role: "BS Software Engineering",
    company: "Abasyn University Peshawar",
    location: "Peshawar, Pakistan",
    type_label: "Degree",
    current: false,
    description: [
      "Studied software engineering fundamentals, data structures, algorithms, and web development.",
      "Completed capstone project: a full-stack e-commerce platform built with React and Node.js.",
      "Graduated with distinction — CGPA 3.8 / 4.0.",
    ],
    tags: ["Data Structures", "Algorithms", "Web Dev", "OOP"],
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
];

const STATS = [
  { value: "3+", label: "Years of experience" },
  { value: "3", label: "Companies worked at" },
  { value: "24+", label: "Projects completed" },
  { value: "80%", label: "Test coverage achieved" },
];

// ── Timeline Item Component ────────────────────────
function TimelineItem({ item, index, visible }) {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <div
      className={`exp__item ${visible ? "exp__item--visible" : ""} ${
        item.current ? "exp__item--current" : ""
      }`}
      style={{ transitionDelay: `${0.1 + index * 0.12}s` }}
    >
      {/* Dot on the timeline */}
      <div
        className={`exp__dot ${item.current ? "exp__dot--current" : ""} ${
          item.type === "education" ? "exp__dot--edu" : ""
        }`}
      >
        {item.current && <span className="exp__dot-ping" />}
      </div>

      {/* Card */}
      <div
        className={`exp__card ${expanded ? "exp__card--expanded" : ""}`}
        onClick={() => setExpanded(!expanded)}
      >
        {/* Card top row */}
        <div className="exp__card-top">
          {/* Left — icon + info */}
          <div className="exp__card-left">
            <div
              className={`exp__card-icon ${
                item.type === "education"
                  ? "exp__card-icon--edu"
                  : item.current
                    ? "exp__card-icon--current"
                    : ""
              }`}
            >
              {item.icon}
            </div>
            <div className="exp__card-info">
              <div className="exp__card-period">{item.period}</div>
              <div className="exp__card-role">
                {item.role}
                {item.current && (
                  <span className="exp__current-badge">Current</span>
                )}
              </div>
              <div className="exp__card-company">
                <span>{item.company}</span>
                <span className="exp__card-sep">·</span>
                <span className="exp__card-type">{item.type_label}</span>
                <span className="exp__card-sep">·</span>
                <span className="exp__card-location">
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {item.location}
                </span>
              </div>
            </div>
          </div>

          {/* Right — chevron */}
          <div
            className={`exp__chevron ${expanded ? "exp__chevron--open" : ""}`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

        {/* Expandable content */}
        <div
          className={`exp__card-body ${expanded ? "exp__card-body--open" : ""}`}
        >
          <div className="exp__card-body-inner">
            {/* Bullet points */}
            <ul className="exp__desc-list">
              {item.description.map((point, i) => (
                <li key={i} className="exp__desc-item">
                  <span className="exp__desc-bullet" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {/* Tags */}
            <div className="exp__tags">
              {item.tags.map((tag) => (
                <span key={tag} className="exp__tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────
export default function Experience() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filteredItems = EXPERIENCES.filter((item) => {
    if (filter === "all") return true;
    if (filter === "work") return item.type === "work";
    if (filter === "education") return item.type === "education";
    return true;
  });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className={`exp ${visible ? "exp--visible" : ""}`}
    >
      <div className="exp__inner">
        {/* ── Section Header ── */}
        <div className="exp__header">
          <span className="exp__label">Experience</span>
          <h2 className="exp__title">Work history</h2>
          <p className="exp__subtitle">
            My professional journey and the roles that shaped my skills.
          </p>
        </div>

        {/* ── Content Grid ── */}
        <div className="exp__grid">
          {/* ── Left — Sticky Sidebar ── */}
          <div className="exp__sidebar">
            {/* Filter Buttons */}
            <div className="exp__filters">
              <div className="exp__filters-label">Filter by</div>
              {[
                { key: "all", label: "All", count: EXPERIENCES.length },
                {
                  key: "work",
                  label: "Work",
                  count: EXPERIENCES.filter((e) => e.type === "work").length,
                },
                {
                  key: "education",
                  label: "Education",
                  count: EXPERIENCES.filter((e) => e.type === "education")
                    .length,
                },
              ].map((f) => (
                <button
                  key={f.key}
                  className={`exp__filter-btn ${filter === f.key ? "exp__filter-btn--active" : ""}`}
                  onClick={() => setFilter(f.key)}
                >
                  <span>{f.label}</span>
                  <span className="exp__filter-count">{f.count}</span>
                </button>
              ))}
            </div>

            {/* Stats Card */}
            <div className="exp__sidebar-stats">
              <div className="exp__sidebar-stats-title">By the numbers</div>
              {STATS.map((stat) => (
                <div key={stat.label} className="exp__stat-row">
                  <span className="exp__stat-value">{stat.value}</span>
                  <span className="exp__stat-label">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Skills summary */}
            <div className="exp__sidebar-skills">
              <div className="exp__sidebar-skills-title">
                Skills across all roles
              </div>
              <div className="exp__sidebar-tags">
                {[
                  "React",
                  "TypeScript",
                  "Next.js",
                  "Redux",
                  "REST API",
                  "Figma",
                  "Jest",
                  "Git",
                ].map((tag) => (
                  <span key={tag} className="exp__sidebar-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right — Timeline ── */}
          <div className="exp__timeline-wrap">
            {/* Timeline line */}
            <div className="exp__timeline">
              <div className="exp__timeline-line" />

              {filteredItems.map((item, index) => (
                <TimelineItem
                  key={item.id}
                  item={item}
                  index={index}
                  visible={visible}
                />
              ))}

              {/* End of timeline dot */}
              <div className="exp__timeline-end">
                <div className="exp__timeline-end-dot" />
                <span className="exp__timeline-end-label">
                  The journey continues...
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
