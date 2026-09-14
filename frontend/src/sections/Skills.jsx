// src/sections/Skills.jsx
import { useEffect, useRef, useState } from 'react'
import './Skills.css'

// ── Data ──────────────────────────────────────────
const SKILL_CATEGORIES = [
  {
    id:    'frontend',
    label: 'Frontend',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    skills: [
      { name: 'React JS',    pct: 92 },
      { name: 'JavaScript',  pct: 88 },
      { name: 'TypeScript',  pct: 80 },
      { name: 'HTML & CSS',  pct: 95 },
    ],
  },
  {
    id:    'backend',
    label: 'Backend',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <line x1="8"  y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    skills: [
      { name: 'Express.js',    pct: 85 },
      { name: 'Node.js',       pct: 82 },
      { name: 'MongoDB',       pct: 88 },
      { name: 'REST APIs',     pct: 90 },
    ],
  },
  {
    id:    'tools',
    label: 'Tools & Other',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0
          l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1
          -3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    skills: [
      { name: 'Git & GitHub', pct: 85 },
      { name: 'Docker',       pct: 75 },
      { name: 'Stripe',       pct: 80 },
      { name: 'Vercel/Render',pct: 85 },
    ],
  },
]

const TABS = ['All', 'Frontend', 'Backend', 'Tools']

const TECH_STACK = [
  { name: 'React',      cat: 'frontend', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
      <circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="10" ry="4"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>
    </svg>
  )},
  { name: 'JavaScript', cat: 'frontend', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
      <rect x="2" y="2" width="20" height="20" rx="3"/>
      <path d="M7 17c0 1.5 2 2.5 3.5 1.5"/><path d="M14 12v6"/>
      <path d="M17 12c-1.5 0-3 .5-3 2.5s1.5 2.5 3 2.5"/>
    </svg>
  )},
  { name: 'TypeScript', cat: 'frontend', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
      <rect x="2" y="2" width="20" height="20" rx="3"/>
      <path d="M10 12H6"/><path d="M8 12v6"/><path d="M14 18v-6h3a2 2 0 0 1 0 4h-3"/>
    </svg>
  )},
  { name: 'HTML5', cat: 'frontend', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
      <path d="M4 3l1.5 17L12 22l6.5-2L20 3z"/>
      <path d="M8 8h8l-.5 6L12 15l-3.5-1L8 8z"/>
    </svg>
  )},
  { name: 'CSS3', cat: 'frontend', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
      <path d="M4 3l1.5 17L12 22l6.5-2L20 3z"/>
      <path d="M16 8H8l.3 4H15.7l-.5 5L12 18l-3.2-.9-.2-2.1H7l.4 4L12 21l4.6-1.6L18 8z"/>
    </svg>
  )},
  { name: 'Tailwind', cat: 'frontend', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
      <path d="M6.5 8C7.5 5.5 10 4.5 12 6c1.5 1 1.5 3 3 4 1.5 1 3.5.5 4.5-1
        -1 2.5-3.5 3.5-5.5 2-1.5-1-1.5-3-3-4-1.5-1-3.5-.5-4.5 1z"/>
      <path d="M2.5 14c1-2.5 3.5-3.5 5.5-2 1.5 1 1.5 3 3 4 1.5 1 3.5.5 4.5-1
        -1 2.5-3.5 3.5-5.5 2-1.5-1-1.5-3-3-4-1.5-1-3.5-.5-4.5 1z"/>
    </svg>
  )},
  { name: 'Express', cat: 'backend', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  )},
  { name: 'Node.js', cat: 'backend', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  )},
  { name: 'MongoDB', cat: 'backend', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
      <path d="M12 2C8 2 8 8 8 12c0 4 4 10 4 10s4-6 4-10c0-4 0-10-4-10z"/>
    </svg>
  )},
  { name: 'MongoDB Atlas', cat: 'backend', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
      <path d="M12 2C8 2 8 8 8 12c0 4 4 10 4 10s4-6 4-10c0-4 0-10-4-10z"/>
    </svg>
  )},
  { name: 'REST API', cat: 'backend', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2"  y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10
        15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  )},
  { name: 'Git', cat: 'tools', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
      <circle cx="6"  cy="6"  r="2"/><circle cx="18" cy="6"  r="2"/>
      <circle cx="6"  cy="18" r="2"/><path d="M6 8v8"/><path d="M8 6h7a3 3 0 0 1 3 3v1"/>
    </svg>
  )},
  { name: 'GitHub', cat: 'tools', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61
        c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0
        0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65
        5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5
        3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>
  )},
  { name: 'Stripe', cat: 'tools', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
    </svg>
  )},
  { name: 'Cloudinary', cat: 'tools', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
    </svg>
  )},
  { name: 'Docker', cat: 'tools', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
      <path d="M22 12.5a5 5 0 0 0-4-1.5c0-4-3-6.5-6-6.5S6 7 6 11a5 5 0 0 0-4 1.5C2 15 4 17 7 17h10c3 0 5-2 5-4.5Z"/>
    </svg>
  )},
  { name: 'Vercel', cat: 'tools', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
      <path d="M12 2L2 20h20L12 2z"/>
    </svg>
  )},
  { name: 'Render', cat: 'tools', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
      <rect x="3" y="3" width="18" height="18" rx="4"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )},
  { name: 'Antigravity', cat: 'tools', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
      <path d="M12 2L2 12l10 10 10-10z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )},
]

// ── Skill Bar Component ────────────────────────────
function SkillBar({ name, pct, animate }) {
  return (
    <div className="skills__bar-row">
      <div className="skills__bar-top">
        <span className="skills__bar-name">{name}</span>
        <span className="skills__bar-pct">{pct}%</span>
      </div>
      <div className="skills__bar-track">
        <div
          className="skills__bar-fill"
          style={{ width: animate ? `${pct}%` : '0%' }}
        />
      </div>
    </div>
  )
}

// ── Category Card Component ────────────────────────
function CategoryCard({ category, animate, delay }) {
  return (
    <div
      className="skills__cat-card"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="skills__cat-header">
        <div className="skills__cat-icon">{category.icon}</div>
        <span className="skills__cat-title">{category.label}</span>
      </div>
      {category.skills.map(skill => (
        <SkillBar
          key={skill.name}
          name={skill.name}
          pct={skill.pct}
          animate={animate}
        />
      ))}
    </div>
  )
}

// ── Main Component ─────────────────────────────────
export default function Skills() {
  const sectionRef            = useRef(null)
  const [visible, setVisible]   = useState(false)
  const [activeTab, setActiveTab] = useState('All')
  const [animated, setAnimated]   = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          // slight delay so bars animate after section fades in
          setTimeout(() => setAnimated(true), 400)
        }
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Filter tech stack by active tab
  const filteredTech = TECH_STACK.filter(t => {
    if (activeTab === 'All')      return true
    if (activeTab === 'Frontend') return t.cat === 'frontend'
    if (activeTab === 'Backend')  return t.cat === 'backend'
    if (activeTab === 'Tools')    return t.cat === 'tools'
    return true
  })

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`skills ${visible ? 'skills--visible' : ''}`}
    >
      <div className="skills__inner">

        {/* ── Section Header ── */}
        <div className="skills__header">
          <span className="skills__label">Skills</span>
          <h2 className="skills__title">What I work with</h2>
          <p className="skills__subtitle">
            Technologies and tools I use every day to ship great products.
          </p>
        </div>

        {/* ── Category Cards ── */}
        <div className="skills__categories">
          {SKILL_CATEGORIES.map((cat, i) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              animate={animated}
              delay={i * 0.1}
            />
          ))}
        </div>

        {/* ── Overall Proficiency ── */}
        <div className="skills__overall">
          <div className="skills__overall-header">
            <div className="skills__overall-title">Overall Proficiency</div>
            <div className="skills__overall-sub">
              Based on production experience
            </div>
          </div>
          <div className="skills__overall-bars">
            {[
              { name: 'Problem Solving',    pct: 90 },
              { name: 'Clean Code',         pct: 88 },
              { name: 'UI/UX Sensitivity',  pct: 85 },
              { name: 'Team Collaboration', pct: 92 },
            ].map(item => (
              <div key={item.name} className="skills__overall-row">
                <span className="skills__overall-name">{item.name}</span>
                <div className="skills__overall-track">
                  <div
                    className="skills__overall-fill"
                    style={{ width: animated ? `${item.pct}%` : '0%' }}
                  />
                </div>
                <span className="skills__overall-pct">{item.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tech Stack Grid ── */}
        <div className="skills__tech-section">

          {/* Header + Tabs */}
          <div className="skills__tech-header">
            <div>
              <div className="skills__tech-title">Tech Stack</div>
              <div className="skills__tech-sub">
                Hover any card to highlight it
              </div>
            </div>
            <div className="skills__tabs">
              {TABS.map(tab => (
                <button
                  key={tab}
                  className={`skills__tab ${activeTab === tab ? 'skills__tab--active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tech Cards Grid */}
          <div className="skills__tech-grid">
            {TECH_STACK.map(tech => {
              const isActive = filteredTech.includes(tech)
              return (
                <div
                  key={tech.name}
                  className={`skills__tech-card ${!isActive ? 'skills__tech-card--dim' : ''}`}
                >
                  <div className="skills__tech-icon">{tech.icon}</div>
                  <span className="skills__tech-name">{tech.name}</span>
                </div>
              )
            })}
          </div>

        </div>

      </div>
    </section>
  )
}