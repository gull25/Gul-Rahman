// src/sections/Projects.jsx
import { useEffect, useRef, useState } from "react";
import "./Projects.css";

// ── Icons ──────────────────────────────────────────
const IconFolder = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1
      2-2h5l2 3h9a2 2 0 0 1 2 2z"
    />
  </svg>
);
const IconExternalLink = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);
const IconGithub = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0
      0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20
      4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38
      0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5
      4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44
      7A3.37 3.37 0 0 0 9 18.13V22"
    />
  </svg>
);
const IconStar = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
  >
    <polygon
      points="12 2 15.09 8.26 22 9.27 17 14.14
      18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27
      8.91 8.26 12 2"
    />
  </svg>
);
const IconArrowRight = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

// ── Project Data ───────────────────────────────────
const PROJECTS = [
  {
    id: 1,
    title: "SaaS Analytics Dashboard",
    desc: "A full-featured analytics dashboard built with React and TypeScript. Includes real-time charts, data tables, user management, and a custom component library. Served 5,000+ daily active users in production.",
    tags: ["React", "TypeScript", "Redux", "Recharts", "Tailwind"],
    category: "react",
    featured: true,
    stars: 128,
    demo: "https://demo.example.com",
    code: "https://github.com",
    color: "#1d4ed8",
    colorBg: "#eff6ff",
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "E-Commerce Storefront",
    desc: "Responsive e-commerce UI with cart, wishlist, filters, and product detail pages. Built with Next.js and integrated with a headless CMS for dynamic content management.",
    tags: ["Next.js", "Tailwind", "Sanity CMS", "Stripe"],
    category: "fullstack",
    featured: true,
    stars: 84,
    demo: "https://demo.example.com",
    code: "https://github.com",
    color: "#16a34a",
    colorBg: "#f0fdf4",
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Task Management App",
    desc: "Kanban-style task manager with drag and drop, labels, due dates, and real-time team collaboration. Integrated Firebase for live updates and authentication.",
    tags: ["React", "Firebase", "DnD Kit", "Zustand"],
    category: "react",
    featured: false,
    stars: 62,
    demo: "https://demo.example.com",
    code: "https://github.com",
    color: "#9333ea",
    colorBg: "#faf5ff",
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Movie Explorer",
    desc: "Search and discover movies and TV series using the OMDB API. Features favourites, type filtering, URL-based search with pagination, and movie detail pages with React Router.",
    tags: ["React", "React Router", "OMDB API", "Context API"],
    category: "react",
    featured: false,
    stars: 45,
    demo: "https://demo.example.com",
    code: "https://github.com",
    color: "#ea580c",
    colorBg: "#fff7ed",
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="2" y="2" width="20" height="20" rx="2.18" />
        <line x1="7" y1="2" x2="7" y2="22" />
        <line x1="17" y1="2" x2="17" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="2" y1="7" x2="7" y2="7" />
        <line x1="2" y1="17" x2="7" y2="17" />
        <line x1="17" y1="17" x2="22" y2="17" />
        <line x1="17" y1="7" x2="22" y2="7" />
      </svg>
    ),
  },
  {
    id: 5,
    title: "Expense Tracker",
    desc: "Personal finance tracker with income and expense management, category filtering, real-time balance calculations, and localStorage persistence across sessions.",
    tags: ["React", "useReducer", "Chart.js", "localStorage"],
    category: "react",
    featured: false,
    stars: 38,
    demo: "https://demo.example.com",
    code: "https://github.com",
    color: "#0891b2",
    colorBg: "#ecfeff",
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    id: 6,
    title: "Dev Blog Platform",
    desc: "A markdown-based blogging platform with syntax highlighting, tag filtering, estimated read time, and dark mode support. Built with Next.js and MDX.",
    tags: ["Next.js", "MDX", "Tailwind", "gray-matter"],
    category: "fullstack",
    featured: false,
    stars: 57,
    demo: "https://demo.example.com",
    code: "https://github.com",
    color: "#be185d",
    colorBg: "#fdf2f8",
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
];

const FILTERS = [
  { key: "all", label: "All Projects" },
  { key: "react", label: "React" },
  { key: "fullstack", label: "Full Stack" },
  { key: "featured", label: "Featured" },
];

// ── Project Card ───────────────────────────────────
function ProjectCard({ project, index, visible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`proj__card ${visible ? "proj__card--visible" : ""} ${
        project.featured ? "proj__card--featured" : ""
      }`}
      style={{ transitionDelay: `${0.08 * index}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Featured bar */}
      {project.featured && (
        <div
          className="proj__card-feat-bar"
          style={{ background: project.color }}
        />
      )}

      {/* Thumbnail */}
      <div
        className="proj__thumb"
        style={{ background: hovered ? project.colorBg : "var(--surface3)" }}
      >
        {/* Featured badge */}
        {project.featured && (
          <div className="proj__feat-badge">
            <IconStar />
            Featured
          </div>
        )}

        {/* Project icon */}
        <div
          className="proj__thumb-icon"
          style={{ color: hovered ? project.color : "var(--border)" }}
        >
          {project.icon}
        </div>

        {/* Stars */}
        <div className="proj__stars">
          <IconStar />
          {project.stars}
        </div>
      </div>

      {/* Body */}
      <div className="proj__body">
        <div className="proj__body-top">
          <IconFolder />
          <div className="proj__links">
            <a
              href={project.code}
              target="_blank"
              rel="noopener noreferrer"
              className="proj__icon-link"
              title="View Code"
              onClick={(e) => e.stopPropagation()}
            >
              <IconGithub />
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="proj__icon-link"
              title="Live Demo"
              onClick={(e) => e.stopPropagation()}
            >
              <IconExternalLink />
            </a>
          </div>
        </div>

        <h3 className="proj__title">{project.title}</h3>
        <p className="proj__desc">{project.desc}</p>

        <div className="proj__tags">
          {project.tags.map((tag) => (
            <span key={tag} className="proj__tag">
              {tag}
            </span>
          ))}
        </div>

        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="proj__cta"
          style={{ color: project.color }}
          onClick={(e) => e.stopPropagation()}
        >
          View project <IconArrowRight />
        </a>
      </div>
    </div>
  );
}

// ── Featured Project Card (wide) ───────────────────
function FeaturedCard({ project, index, visible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`proj__featured-card ${visible ? "proj__featured-card--visible" : ""}`}
      style={{ transitionDelay: `${0.08 * index}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left — Thumbnail */}
      <div
        className="proj__featured-thumb"
        style={{ background: hovered ? project.colorBg : "var(--surface3)" }}
      >
        <div
          className="proj__featured-thumb-icon"
          style={{ color: hovered ? project.color : "#d1d5db" }}
        >
          {project.icon}
        </div>
        <div
          className="proj__featured-bar-left"
          style={{ background: project.color }}
        />
        <div className="proj__featured-badge">
          <IconStar /> Featured
        </div>
        <div className="proj__stars proj__stars--featured">
          <IconStar /> {project.stars}
        </div>
      </div>

      {/* Right — Content */}
      <div className="proj__featured-body">
        <div className="proj__featured-top">
          <span
            className="proj__featured-label"
            style={{ color: project.color, background: project.colorBg }}
          >
            Featured Project
          </span>
          <div className="proj__links">
            <a
              href={project.code}
              target="_blank"
              rel="noopener noreferrer"
              className="proj__icon-link"
              title="View Code"
            >
              <IconGithub />
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="proj__icon-link"
              title="Live Demo"
            >
              <IconExternalLink />
            </a>
          </div>
        </div>

        <h3 className="proj__featured-title">{project.title}</h3>
        <p className="proj__featured-desc">{project.desc}</p>

        <div className="proj__tags">
          {project.tags.map((tag) => (
            <span key={tag} className="proj__tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="proj__featured-actions">
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="proj__btn-solid"
            style={{ background: project.color }}
          >
            <IconExternalLink /> Live Demo
          </a>
          <a
            href={project.code}
            target="_blank"
            rel="noopener noreferrer"
            className="proj__btn-ghost"
          >
            <IconGithub /> View Code
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────
export default function Projects() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [activeFilter, setFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);

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

  // Filter projects
  const filtered = PROJECTS.filter((p) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "featured") return p.featured;
    return p.category === activeFilter;
  });

  // Split featured vs regular for layout
  const featuredProjects = filtered.filter((p) => p.featured);
  const regularProjects = filtered.filter((p) => !p.featured);

  // Show/hide toggle
  const visibleRegular = showAll
    ? regularProjects
    : regularProjects.slice(0, 3);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`proj ${visible ? "proj--visible" : ""}`}
    >
      <div className="proj__inner">
        {/* ── Section Header ── */}
        <div className="proj__header">
          <span className="proj__label">Projects</span>
          <h2 className="proj__title">Selected work</h2>
          <p className="proj__subtitle">
            A collection of projects I have built — from side experiments to
            production applications.
          </p>
        </div>

        {/* ── Filter Tabs ── */}
        <div className="proj__filters">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`proj__filter ${activeFilter === f.key ? "proj__filter--active" : ""}`}
              onClick={() => {
                setFilter(f.key);
                setShowAll(false);
              }}
            >
              {f.label}
              <span className="proj__filter-count">
                {f.key === "all"
                  ? PROJECTS.length
                  : f.key === "featured"
                    ? PROJECTS.filter((p) => p.featured).length
                    : PROJECTS.filter((p) => p.category === f.key).length}
              </span>
            </button>
          ))}
        </div>

        {/* ── Featured Projects (wide cards) ── */}
        {featuredProjects.length > 0 && (
          <div className="proj__featured-section">
            {featuredProjects.map((project, i) => (
              <FeaturedCard
                key={project.id}
                project={project}
                index={i}
                visible={visible}
              />
            ))}
          </div>
        )}

        {/* ── Regular Project Grid ── */}
        {regularProjects.length > 0 && (
          <>
            {featuredProjects.length > 0 && (
              <div className="proj__grid-label">More projects</div>
            )}
            <div className="proj__grid">
              {visibleRegular.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  visible={visible}
                />
              ))}
            </div>
          </>
        )}

        {/* ── Show More / Less Button ── */}
        {regularProjects.length > 3 && (
          <div className="proj__show-more">
            <button
              className="proj__show-more-btn"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll
                ? "Show less"
                : `Show ${regularProjects.length - 3} more projects`}
              <span
                className={`proj__show-more-icon ${showAll ? "proj__show-more-icon--up" : ""}`}
              >
                <IconArrowRight />
              </span>
            </button>
          </div>
        )}

        {/* ── Empty State ── */}
        {filtered.length === 0 && (
          <div className="proj__empty">
            <div className="proj__empty-icon">
              <IconFolder />
            </div>
            <p className="proj__empty-text">
              No projects in this category yet.
            </p>
          </div>
        )}

        {/* ── GitHub CTA ── */}
        <div className="proj__github-cta">
          <div className="proj__github-cta-inner">
            <div className="proj__github-cta-icon">
              <IconGithub />
            </div>
            <div>
              <div className="proj__github-cta-title">See more on GitHub</div>
              <div className="proj__github-cta-sub">
                All my open source work and experiments live there.
              </div>
            </div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="proj__github-cta-btn"
            >
              Visit GitHub <IconArrowRight />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
