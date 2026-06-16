// src/sections/Hero.jsx
import { useEffect, useRef, useState } from 'react'
import './Hero.css'

// Animated counter hook
function useCounter(target, duration = 1200, start = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    let current = 0
    const steps    = 60
    const stepTime = duration / steps
    const increment = target / steps

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.round(current))
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [target, duration, start])

  return count
}

const STATS = [
  { label: 'Years experience', value: 3,  suffix: '+' },
  { label: 'Projects shipped', value: 24, suffix: ''  },
  { label: 'Happy clients',    value: 12, suffix: ''  },
]

export default function Hero() {
  const heroRef         = useRef(null)
  const [visible, setVisible] = useState(false)

  // Trigger animations when Hero enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (heroRef.current) observer.observe(heroRef.current)
    return () => observer.disconnect()
  }, [])

  const years    = useCounter(3,  1200, visible)
  const projects = useCounter(24, 1400, visible)
  const clients  = useCounter(12, 1000, visible)

  const counts = [
    { ...STATS[0], count: years    },
    { ...STATS[1], count: projects },
    { ...STATS[2], count: clients  },
  ]

  function handleScroll(href) {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      ref={heroRef}
      className={`hero ${visible ? 'hero--visible' : ''}`}
    >
      <div className="hero__inner">

        {/* Left Content */}
        <div className="hero__content">

          {/* Eyebrow */}
          <div className="hero__eyebrow">
            <div className="hero__eyebrow-line" />
            <span className="hero__eyebrow-text">Frontend Developer</span>
          </div>

          {/* Name */}
          <h1 className="hero__name">
            Alex <span className="hero__name-accent">Johnson</span>
          </h1>

          {/* Role */}
          <p className="hero__role">
            Building clean, accessible web experiences.
          </p>

          {/* Description */}
          <p className="hero__desc">
            I craft fast, responsive, and well-structured front-end interfaces
            using React, TypeScript, and modern CSS — with a focus on clean
            code and great user experience.
          </p>

          {/* CTA Buttons */}
          <div className="hero__actions">
            <button
              className="hero__btn hero__btn--solid"
              onClick={() => handleScroll('#projects')}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
              </svg>
              View Projects
            </button>

            <button
              className="hero__btn hero__btn--ghost"
              onClick={() => handleScroll('#contact')}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Get in Touch
            </button>
          </div>

          {/* Stats */}
          <div className="hero__stats">
            {counts.map((stat, i) => (
              <div key={stat.label} className="hero__stat">
                {i > 0 && <div className="hero__stat-sep" />}
                <div>
                  <div className="hero__stat-num">
                    {stat.count}{stat.suffix}
                  </div>
                  <div className="hero__stat-lbl">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right — Avatar Card */}
        <div className="hero__right">
          <div className="hero__avatar-wrap">

            {/* Outer ring */}
            <div className="hero__avatar-ring">
              <div className="hero__avatar-inner">
                AJ
              </div>
            </div>

            {/* Floating card — role */}
            <div className="hero__float hero__float--bottom">
              <div className="hero__float-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="16 18 22 12 16 6"/>
                  <polyline points="8 6 2 12 8 18"/>
                </svg>
              </div>
              <div>
                <div className="hero__float-title">React Developer</div>
                <div className="hero__float-sub">3+ years exp</div>
              </div>
            </div>

            {/* Floating card — rating */}
            <div className="hero__float hero__float--top">
              <div className="hero__float-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <div>
                <div className="hero__float-title">Top Rated</div>
                <div className="hero__float-sub">24 projects done</div>
              </div>
            </div>

            {/* Availability badge */}
            <div className="hero__availability">
              <span className="hero__avail-dot" />
              <span className="hero__avail-text">Available for work</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}