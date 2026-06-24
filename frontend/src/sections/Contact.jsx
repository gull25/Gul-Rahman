// src/sections/Contact.jsx
import { useEffect, useRef, useState } from 'react'
import { submitContactForm } from '../services/api'
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
    value: 'alex@example.com',
    href:  'mailto:alex@example.com',
  },
  {
    icon:  <IconPhone />,
    label: 'Phone',
    value: '+92 300 0000000',
    href:  'tel:+923000000000',
  },
  {
    icon:  <IconMapPin />,
    label: 'Location',
    value: 'Lahore, Pakistan',
    href:  'https://maps.google.com/?q=Lahore,Pakistan',
  },
  {
    icon:  <IconClock />,
    label: 'Response time',
    value: 'Within 24 hours',
    href:  null,
  },
]

const SOCIALS = [
  { icon: <IconGithub />,   label: 'GitHub',   href: 'https://github.com'   },
  { icon: <IconLinkedin />, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: <IconTwitter />,  label: 'Twitter',  href: 'https://twitter.com'  },
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

// ── Form Field Component ───────────────────────────
function FormField({ label, error, required, children }) {
  return (
    <div className="contact__field">
      <label className="contact__label">
        {label}
        {required && <span className="contact__required">*</span>}
      </label>
      {children}
      {error && (
        <span className="contact__field-error">{error}</span>
      )}
    </div>
  )
}

// ── Custom Select ──────────────────────────────────
function CustomSelect({ value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="contact__select-wrap" ref={ref}>
      <button
        type="button"
        className={`contact__select-trigger
          ${open  ? 'contact__select-trigger--open'   : ''}
          ${value ? 'contact__select-trigger--filled' : ''}`}
        onClick={() => setOpen(!open)}
      >
        <span className={value ? '' : 'contact__select-placeholder'}>
          {value || placeholder}
        </span>
        <span className={`contact__select-chevron
          ${open ? 'contact__select-chevron--open' : ''}`}>
          <IconChevronDown />
        </span>
      </button>

      {open && (
        <div className="contact__select-dropdown">
          {options.map(opt => (
            <button
              key={opt}
              type="button"
              className={`contact__select-option
                ${value === opt ? 'contact__select-option--active' : ''}`}
              onClick={() => { onChange(opt); setOpen(false) }}
            >
              {opt}
              {value === opt && (
                <svg width="13" height="13" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

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
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)

  // Form state
  const [form, setForm] = useState({
    firstName: '',
    lastName:  '',
    email:     '',
    phone:     '',
    subject:   '',
    budget:    '',
    message:   '',
    agree:     false,
  })

  // Error state
  const [errors, setErrors] = useState({})

  // IntersectionObserver for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.08 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Handle all input changes
  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    // Clear that field's error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  // Handle custom select changes
  function handleSelectChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  // Client-side validation
  function validate() {
    const e = {}
    if (!form.firstName.trim())
      e.firstName = 'First name is required.'
    if (!form.lastName.trim())
      e.lastName = 'Last name is required.'
    if (!form.email.trim())
      e.email = 'Email is required.'
    else if (!/\S+@\S+\.\S+/.test(form.email))
      e.email = 'Enter a valid email address.'
    if (!form.subject)
      e.subject = 'Please select a subject.'
    if (!form.message.trim())
      e.message = 'Message is required.'
    else if (form.message.trim().length < 20)
      e.message = 'Message must be at least 20 characters.'
    if (!form.agree)
      e.agree = 'You must agree to continue.'
    return e
  }

  // ── Submit — now calls the real backend API ────────
  async function handleSubmit(e) {
    e.preventDefault()

    // Run client-side validation first
    const foundErrors = validate()
    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors)
      // Scroll to the first error field
      const firstErrorKey = Object.keys(foundErrors)[0]
      const el = document.querySelector(`[name="${firstErrorKey}"]`)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setLoading(true)
    // Clear any previous submit error
    setErrors({})

    try {
      // Call the backend API
      await submitContactForm({
        firstName: form.firstName,
        lastName:  form.lastName,
        email:     form.email,
        phone:     form.phone,
        subject:   form.subject,
        budget:    form.budget,
        message:   form.message,
      })

      setLoading(false)
      setSubmitted(true)

    } catch (error) {
      setLoading(false)
      setErrors({
        submit: error.message || 'Failed to send message. Please try again.',
      })
    }
  }

  // Character count for message
  const msgLength  = form.message.length
  const msgMax     = 500
  const msgPercent = Math.min((msgLength / msgMax) * 100, 100)

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

          {/* ── Right — Form ── */}
          <div className="contact__form-wrap">

            {submitted ? (

              /* ── Success State ── */
              <div className="contact__success">
                <div className="contact__success-icon">
                  <IconCheck />
                </div>
                <h3 className="contact__success-title">
                  Message sent successfully!
                </h3>
                <p className="contact__success-sub">
                  Thank you, {form.firstName}! I've received your message
                  and will get back to you at{' '}
                  <strong>{form.email}</strong> within 24 hours.
                </p>
                <div className="contact__success-details">
                  <div className="contact__success-row">
                    <span className="contact__success-row-label">Subject</span>
                    <span className="contact__success-row-value">{form.subject}</span>
                  </div>
                  {form.budget && (
                    <div className="contact__success-row">
                      <span className="contact__success-row-label">Budget</span>
                      <span className="contact__success-row-value">{form.budget}</span>
                    </div>
                  )}
                </div>
                <button
                  className="contact__success-reset"
                  onClick={() => {
                    setSubmitted(false)
                    setForm({
                      firstName: '', lastName: '',  email:   '',
                      phone:     '', subject:  '',  budget:  '',
                      message:   '', agree:    false,
                    })
                    setErrors({})
                  }}
                >
                  Send another message
                </button>
              </div>

            ) : (

              /* ── Form ── */
              <form
                className="contact__form"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="contact__form-header">
                  <h3 className="contact__form-title">Send a message</h3>
                  <p className="contact__form-sub">
                    Fields marked with{' '}
                    <span className="contact__required">*</span>{' '}
                    are required.
                  </p>
                </div>

                {/* Name row */}
                <div className="contact__row">
                  <FormField label="First name" error={errors.firstName} required>
                    <input
                      type="text"
                      name="firstName"
                      className={`contact__input
                        ${errors.firstName ? 'contact__input--error' : ''}`}
                      placeholder="Alex"
                      value={form.firstName}
                      onChange={handleChange}
                      autoComplete="given-name"
                    />
                  </FormField>
                  <FormField label="Last name" error={errors.lastName} required>
                    <input
                      type="text"
                      name="lastName"
                      className={`contact__input
                        ${errors.lastName ? 'contact__input--error' : ''}`}
                      placeholder="Johnson"
                      value={form.lastName}
                      onChange={handleChange}
                      autoComplete="family-name"
                    />
                  </FormField>
                </div>

                {/* Email + Phone row */}
                <div className="contact__row">
                  <FormField label="Email address" error={errors.email} required>
                    <input
                      type="email"
                      name="email"
                      className={`contact__input
                        ${errors.email ? 'contact__input--error' : ''}`}
                      placeholder="alex@example.com"
                      value={form.email}
                      onChange={handleChange}
                      autoComplete="email"
                    />
                  </FormField>
                  <FormField label="Phone (optional)" error={errors.phone}>
                    <input
                      type="tel"
                      name="phone"
                      className="contact__input"
                      placeholder="+1 234 567 890"
                      value={form.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                    />
                  </FormField>
                </div>

                {/* Subject + Budget row */}
                <div className="contact__row">
                  <FormField label="Subject" error={errors.subject} required>
                    <CustomSelect
                      value={form.subject}
                      onChange={val => handleSelectChange('subject', val)}
                      options={SUBJECTS}
                      placeholder="Select a subject..."
                    />
                    {errors.subject && (
                      <span className="contact__field-error">
                        {errors.subject}
                      </span>
                    )}
                  </FormField>
                  <FormField label="Budget (optional)" error={errors.budget}>
                    <CustomSelect
                      value={form.budget}
                      onChange={val => handleSelectChange('budget', val)}
                      options={BUDGET_OPTIONS}
                      placeholder="Select budget range..."
                    />
                  </FormField>
                </div>

                {/* Message */}
                <FormField label="Message" error={errors.message} required>
                  <div className="contact__textarea-wrap">
                    <textarea
                      name="message"
                      className={`contact__textarea
                        ${errors.message ? 'contact__textarea--error' : ''}`}
                      placeholder="Tell me about your project or idea..."
                      value={form.message}
                      onChange={handleChange}
                      maxLength={msgMax}
                      rows={5}
                    />
                    <div className="contact__char-count">
                      <div className="contact__char-track">
                        <div
                          className="contact__char-fill"
                          style={{
                            width: `${msgPercent}%`,
                            background:
                              msgPercent > 90 ? '#ef4444' :
                              msgPercent > 70 ? '#f59e0b' :
                              'var(--accent)',
                          }}
                        />
                      </div>
                      <span className={`contact__char-num
                        ${msgPercent > 90 ? 'contact__char-num--warn' : ''}`}>
                        {msgLength}/{msgMax}
                      </span>
                    </div>
                  </div>
                </FormField>

                {/* Agreement */}
                <div className={`contact__agree
                  ${errors.agree ? 'contact__agree--error' : ''}`}>
                  <label className="contact__agree-label">
                    <input
                      type="checkbox"
                      name="agree"
                      className="contact__agree-input"
                      checked={form.agree}
                      onChange={handleChange}
                    />
                    <span className="contact__agree-box">
                      {form.agree && (
                        <svg width="10" height="10" viewBox="0 0 24 24"
                          fill="none" stroke="currentColor" strokeWidth="3.5">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      )}
                    </span>
                    <span className="contact__agree-text">
                      I agree that my data will be used to respond to
                      my inquiry. No spam, ever.
                    </span>
                  </label>
                  {errors.agree && (
                    <span className="contact__field-error">
                      {errors.agree}
                    </span>
                  )}
                </div>

                {/* API submit error */}
                {errors.submit && (
                  <div className="contact__submit-error">
                    ❌ {errors.submit}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`contact__submit
                    ${loading ? 'contact__submit--loading' : ''}`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="contact__spinner" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <IconSend />
                      Send message
                    </>
                  )}
                </button>

              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}