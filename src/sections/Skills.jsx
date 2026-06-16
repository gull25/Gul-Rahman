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
    id:    'frameworks',
    label: 'Frameworks',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <line x1="8"  y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    skills: [
      { name: 'Next.js',       pct: 82 },
      { name: 'Tailwind CSS',  pct: 90 },
      { name: 'Redux/Zustand', pct: 78 },
      { name: 'React Router',  pct: 88 },
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
      { name: 'Figma',        pct: 72 },
      { name: 'REST APIs',    pct: 87 },
      { name: 'Firebase',     pct: 70 },
    ],
  },
]

const TABS = ['All', 'Frontend', 'Tools']

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
  { name: 'Next.js', cat: 'frontend', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
      <circle cx="12" cy="12" r="10"/>
      <path d="M15 9l-6 8"/><path d="M9 9h6v4"/>
    </svg>
  )},
  { name: 'Redux', cat: 'frontend', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
      <path d="M16 3c2.5 1 4 3.5 3.5 6.5"/><path d="M8 3c-2.5 1-4 3.5-3.5 6.5"/>
      <path d="M12 21c3 0 5.5-1.5 7-4"/><path d="M12 21c-3 0-5.5-1.5-7-4"/>
      <circle cx="12" cy="12" r="3"/>
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
  { name: 'Figma', cat: 'tools', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
      <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/>
      <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/>
      <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
      <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 0 1-7 0z"/>
      <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/>
    </svg>
  )},
  { name: 'Vite', cat: 'tools', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
      <path d="M13 2L4.5 17h4L12 9l3.5 8H20L13 2z"/><path d="M21 2l-8 5"/>
    </svg>
  )},
  { name: 'Firebase', cat: 'tools', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
      <path d="M4 20L8.5 4l4 7.5L15 7l5 13H4z"/>
    </svg>
  )},
  { name: 'REST API', cat: 'tools', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2"  y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10
        15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
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