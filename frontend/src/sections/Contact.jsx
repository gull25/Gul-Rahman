// src/sections/Contact.jsx
import { useEffect, useRef, useState } from 'react'
import { PROFILE } from '../config/profile'
import './Contact.css'

// ── Icons ──────────────────────────────────────────
const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4
      c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
)
const IconPhone = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0
      1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0
      1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72
      c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91
      9.91a16 16 0 0 0 6.1 6.1l1.27-.88a2 2 0 0 1
      2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
)
const IconMapPin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)
const IconClock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
)
const IconGithub = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0
      0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0
      20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16
      2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09
      1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5
      3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0
      9 18.13V22"/>
  </svg>
)
const IconLinkedin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2
      2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)
const IconTwitter = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0
      0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64
      11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0
      0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
  </svg>
)
const IconRss = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2">
    <path d="M4 11a9 9 0 0 1 9 9"/>
    <path d="M4 4a16 16 0 0 1 16 16"/>
    <circle cx="5" cy="19" r="1"/>
  </svg>
)
const IconSend = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
)
const IconCheck = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)
const IconChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
)

// ── Data ───────────────────────────────────────────
const CONTACT_INFO = [
  {
    icon:  <IconMail />,
    label: 'Email',
    value: PROFILE.email,
    href:  `mailto:${PROFILE.email}`,
  },
  {
    icon:  <IconPhone />,
    label: 'Phone',
    value: PROFILE.phone.display,
    href:  `tel:${PROFILE.phone.value}`,
  },
  {
    icon:  <IconMapPin />,
    label: 'Location',
    value: PROFILE.location,
    href:  PROFILE.locationMap,
  },
  {
    icon:  <IconClock />,
    label: 'Response time',
    value: 'Within 24 hours',
    href:  null,
  },
]

const SOCIALS = [
  { icon: <IconGithub />,   label: 'GitHub',   href: PROFILE.socials.github   },
  { icon: <IconLinkedin />, label: 'LinkedIn', href: PROFILE.socials.linkedin },
  { icon: <IconTwitter />,  label: 'Twitter',  href: PROFILE.socials.twitter  },
  { icon: <IconRss />,      label: 'Blog RSS', href: '#'                    },
]

const SUBJECTS = [
  'Project Inquiry',
  'Job Opportunity',
  'Freelance Work',
  'Collaboration',
  'Just Saying Hi',
  'Other',
]

const BUDGET_OPTIONS = [
  'Under $1,000',
  '$1,000 – $5,000',
  '$5,000 – $10,000',
  '$10,000+',
  'Not applicable',
]


// ── FAQ Item ───────────────────────────────────────
function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`contact__faq-item
      ${open ? 'contact__faq-item--open' : ''}`}>
      <button
        className="contact__faq-trigger"
        onClick={() => setOpen(!open)}
      >
        <span>{question}</span>
        <span className={`contact__faq-icon
          ${open ? 'contact__faq-icon--open' : ''}`}>
          <IconChevronDown />
        </span>
      </button>
      <div className={`contact__faq-body
        ${open ? 'contact__faq-body--open' : ''}`}>
        <div className="contact__faq-answer">{answer}</div>
      </div>
    </div>
  )
}

// ── Main Component ─────────────────────────────────
export default function Contact() {
  const sectionRef              = useRef(null)
  const [visible,   setVisible]   = useState(false)


  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`contact ${visible ? 'contact--visible' : ''}`}
    >
      <div className="contact__inner">

        {/* ── Section Header ── */}
        <div className="contact__header">
          <span className="contact__section-label">Contact</span>
          <h2 className="contact__title">Let's work together</h2>
          <p className="contact__subtitle">
            Have a project in mind or just want to say hello?
            I'd love to hear from you.
          </p>
        </div>

        {/* ── Main Grid ── */}
        <div className="contact__grid">

          {/* ── Left — Info Panel ── */}
          <div className="contact__info-panel">

            <div className="contact__tagline">
              <h3 className="contact__tagline-title">
                Have a project in mind?
                <br />I'd love to hear about it.
              </h3>
              <p className="contact__tagline-sub">
                Whether it's a full project, a quick question, or just
                wanting to connect — my inbox is always open. I typically
                respond within 24 hours.
              </p>
            </div>

            {/* Contact Info Items */}
            <div className="contact__info-list">
              {CONTACT_INFO.map(item => (
                <div key={item.label} className="contact__info-item">
                  <div className="contact__info-icon">{item.icon}</div>
                  <div className="contact__info-text">
                    <div className="contact__info-label">{item.label}</div>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="contact__info-value contact__info-value--link"
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div className="contact__info-value">{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="contact__socials-block">
              <div className="contact__socials-label">Find me online</div>
              <div className="contact__socials">
                {SOCIALS.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__social"
                    title={s.label}
                    aria-label={s.label}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Card */}
            <div className="contact__avail-card">
              <div className="contact__avail-top">
                <span className="contact__avail-dot" />
                <span className="contact__avail-status">
                  Available for new projects
                </span>
              </div>
              <p className="contact__avail-desc">
                I'm currently open to freelance projects and full-time
                opportunities. Let's build something great together.
              </p>
              <div className="contact__avail-tags">
                <span className="contact__avail-tag">Freelance</span>
                <span className="contact__avail-tag">Full-time</span>
                <span className="contact__avail-tag">Remote</span>
              </div>
            </div>

            {/* FAQ */}
            <div className="contact__faq">
              <div className="contact__faq-title">Quick answers</div>
              {[
                {
                  question: 'How quickly do you respond?',
                  answer:   'I typically respond within 24 hours on business days. For urgent matters, feel free to mark your message as urgent.',
                },
                {
                  question: 'Do you work remotely?',
                  answer:   'Yes, I work fully remotely and am comfortable with async communication across different time zones.',
                },
                {
                  question: 'What type of projects do you take?',
                  answer:   'I specialise in React and frontend work — from landing pages to complex dashboards and web applications.',
                },
              ].map(faq => (
                <FaqItem
                  key={faq.question}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>

          </div>


        </div>
      </div>
    </section>
  )
}