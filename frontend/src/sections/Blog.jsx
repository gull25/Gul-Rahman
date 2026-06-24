// src/sections/Blog.jsx
import { useEffect, useRef, useState } from 'react'
import { fetchPosts } from '../services/api'
import './Blog.css'

// ── Icons ──────────────────────────────────────────
const IconArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5">
    <line x1="5"  y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
)
const IconClock = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
)
const IconCalendar = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2"  x2="16" y2="6"/>
    <line x1="8"  y1="2"  x2="8"  y2="6"/>
    <line x1="3"  y1="10" x2="21" y2="10"/>
  </svg>
)
const IconSearch = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/>
    <line   x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
)
const IconX = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5">
    <line x1="18" y1="6"  x2="6"  y2="18"/>
    <line x1="6"  y1="6"  x2="18" y2="18"/>
  </svg>
)
const IconBookmark = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
  </svg>
)
const IconEye = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
)

const CATEGORIES = [
  'All', 'React', 'CSS', 'Performance', 'TypeScript', 'Best Practices'
]

// ── Format view count ──────────────────────────────
function formatViews(num) {
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
  return String(num)
}

// ── Featured Post Card ─────────────────────────────
function FeaturedPostCard({ post, index, visible }) {
  const [bookmarked, setBookmarked] = useState(false)
  const [hovered,    setHovered]    = useState(false)

  // Format date from ISO string
  const dateStr = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
      })
    : post.date || ''

  return (
    <div
      className={`blog__featured-card
        ${visible ? 'blog__featured-card--visible' : ''}`}
      style={{ transitionDelay: `${0.1 + index * 0.1}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <div
        className="blog__featured-thumb"
        style={{ background: hovered ? post.colorBg : 'var(--surface3)' }}
      >
        <div
          className="blog__feat-bar"
          style={{ background: post.color }}
        />
        <div
          className="blog__featured-icon"
          style={{ color: hovered ? post.color : '#d1d5db', fontSize: '32px' }}
        >
          📝
        </div>
        {post.isNew && (
          <div className="blog__new-badge">New</div>
        )}
        <div className="blog__views">
          <IconEye /> {formatViews(post.views || 0)}
        </div>
      </div>

      {/* Body */}
      <div className="blog__featured-body">
        <div className="blog__featured-top">
          <span
            className="blog__cat-badge"
            style={{ color: post.color, background: post.colorBg }}
          >
            {post.category}
          </span>
          <button
            className={`blog__bookmark
              ${bookmarked ? 'blog__bookmark--active' : ''}`}
            onClick={() => setBookmarked(!bookmarked)}
            title={bookmarked ? 'Remove bookmark' : 'Bookmark'}
          >
            <IconBookmark />
          </button>
        </div>

        <h3 className="blog__featured-title">{post.title}</h3>
        <p  className="blog__featured-excerpt">{post.excerpt}</p>

        <div className="blog__tags">
          {post.tags.map(tag => (
            <span key={tag} className="blog__tag">{tag}</span>
          ))}
        </div>

        <div className="blog__featured-footer">
          <div className="blog__meta">
            <span className="blog__meta-item">
              <IconCalendar /> {dateStr}
            </span>
            <span className="blog__meta-sep" />
            <span className="blog__meta-item">
              <IconClock /> {post.readTime}
            </span>
          </div>
          <a
            href={`/blog/${post.slug}`}
            className="blog__read-link"
            style={{ color: post.color }}
          >
            Read article <IconArrowRight />
          </a>
        </div>
      </div>
    </div>
  )
}

// ── Regular Post Card ──────────────────────────────
function PostCard({ post, index, visible }) {
  const [bookmarked, setBookmarked] = useState(false)
  const [hovered,    setHovered]    = useState(false)

  const dateStr = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
      })
    : post.date || ''

  return (
    <div
      className={`blog__card ${visible ? 'blog__card--visible' : ''}`}
      style={{ transitionDelay: `${0.1 + index * 0.08}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <div
        className="blog__thumb"
        style={{ background: hovered ? post.colorBg : 'var(--surface3)' }}
      >
        <div
          className="blog__thumb-bar"
          style={{ background: post.color }}
        />
        <div
          className="blog__thumb-icon"
          style={{ color: hovered ? post.color : '#d1d5db', fontSize: '28px' }}
        >
          📝
        </div>
        <div className="blog__views blog__views--card">
          <IconEye /> {formatViews(post.views || 0)}
        </div>
      </div>

      {/* Body */}
      <div className="blog__card-body">
        <div className="blog__card-top">
          <span
            className="blog__cat-badge"
            style={{ color: post.color, background: post.colorBg }}
          >
            {post.category}
          </span>
          <button
            className={`blog__bookmark
              ${bookmarked ? 'blog__bookmark--active' : ''}`}
            onClick={() => setBookmarked(!bookmarked)}
            title={bookmarked ? 'Remove bookmark' : 'Bookmark'}
          >
            <IconBookmark />
          </button>
        </div>

        <h3 className="blog__card-title">{post.title}</h3>
        <p  className="blog__card-excerpt">{post.excerpt}</p>

        <div className="blog__tags">
          {post.tags.slice(0, 2).map(tag => (
            <span key={tag} className="blog__tag">{tag}</span>
          ))}
        </div>

        <div className="blog__card-footer">
          <div className="blog__meta">
            <span className="blog__meta-item">
              <IconCalendar /> {dateStr}
            </span>
            <span className="blog__meta-sep" />
            <span className="blog__meta-item">
              <IconClock /> {post.readTime}
            </span>
          </div>
          <a
            href={`/blog/${post.slug}`}
            className="blog__read-link blog__read-link--sm"
            style={{ color: post.color }}
          >
            Read <IconArrowRight />
          </a>
        </div>
      </div>
    </div>
  )
}

// ── Newsletter Component ───────────────────────────
function Newsletter() {
  const [email,     setEmail]     = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error,     setError]     = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!email.trim()) { setError('Please enter your email.'); return }
    if (!/\S+@\S+\.\S+/.test(email)) { setError('Please enter a valid email.'); return }
    setError('')
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="blog__newsletter blog__newsletter--success">
        <div className="blog__nl-success-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <div className="blog__nl-success-title">You're subscribed!</div>
        <div className="blog__nl-success-sub">
          New articles will be sent to {email}
        </div>
      </div>
    )
  }

  return (
    <div className="blog__newsletter">
      <div className="blog__nl-icon">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4
            c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      </div>
      <div className="blog__nl-content">
        <div className="blog__nl-title">Stay updated</div>
        <div className="blog__nl-sub">
          Get new articles delivered straight to your inbox.
          No spam, ever.
        </div>
      </div>
      <form className="blog__nl-form" onSubmit={handleSubmit}>
        <div className="blog__nl-input-wrap">
          <input
            type="email"
            className={`blog__nl-input
              ${error ? 'blog__nl-input--error' : ''}`}
            placeholder="your@email.com"
            value={email}
            onChange={e => { setEmail(e.target.value); setError('') }}
          />
          {error && <div className="blog__nl-error">{error}</div>}
        </div>
        <button type="submit" className="blog__nl-btn">
          Subscribe
        </button>
      </form>
    </div>
  )
}

// ── Main Component ─────────────────────────────────
export default function Blog() {
  const sectionRef                    = useRef(null)
  const [visible,        setVisible]   = useState(false)
  const [activeCategory, setCategory]  = useState('All')
  const [searchQuery,    setSearch]    = useState('')
  const [showAll,        setShowAll]   = useState(false)

  // ── API state ──────────────────────────────────
  const [posts,      setPosts]      = useState([])
  const [apiLoading, setApiLoading] = useState(true)
  const [apiError,   setApiError]   = useState(null)

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.08 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Fetch posts — re-runs when category or search changes
useEffect(() => {
  const loadPosts = async () => {
    setApiLoading(true);
    setApiError(null);

    const params = {};
    if (activeCategory !== 'All') params.category = activeCategory;
    if (searchQuery.trim()) params.search = searchQuery.trim();

    try {
      const res = await fetchPosts(params);
      setPosts(res.data);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setApiLoading(false);
    }
  };

  loadPosts();
}, [activeCategory, searchQuery]);

  // Local filter as safety net
  const filtered = posts.filter(post => {
    const matchCat = activeCategory === 'All' || post.category === activeCategory
    const matchSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchCat && matchSearch
  })

  const featuredPosts  = filtered.filter(p =>  p.featured)
  const regularPosts   = filtered.filter(p => !p.featured)
  const visibleRegular = showAll ? regularPosts : regularPosts.slice(0, 3)

  // Total views from API data
  const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0)

  return (
    <section
      id="blog"
      ref={sectionRef}
      className={`blog ${visible ? 'blog--visible' : ''}`}
    >
      <div className="blog__inner">

        {/* ── Section Header ── */}
        <div className="blog__header">
          <div className="blog__header-left">
            <span className="blog__label">Blog</span>
            <h2 className="blog__title">Writing & thoughts</h2>
            <p className="blog__subtitle">
              I write about React, frontend development, and the craft
              of building great web experiences.
            </p>
          </div>
          <div className="blog__header-right">
            <div className="blog__header-stat">
              <span className="blog__header-stat-num">{posts.length}</span>
              <span className="blog__header-stat-lbl">Articles</span>
            </div>
            <div className="blog__header-stat-sep" />
            <div className="blog__header-stat">
              <span className="blog__header-stat-num">
                {(totalViews / 1000).toFixed(1)}k
              </span>
              <span className="blog__header-stat-lbl">Total views</span>
            </div>
          </div>
        </div>

        {/* ── Search + Filter ── */}
        <div className="blog__controls">
          <div className="blog__search-wrap">
            <span className="blog__search-icon"><IconSearch /></span>
            <input
              type="text"
              className="blog__search"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={e => {
                setSearch(e.target.value)
                setShowAll(false)
              }}
            />
            {searchQuery && (
              <button
                className="blog__search-clear"
                onClick={() => setSearch('')}
                aria-label="Clear search"
              >
                <IconX />
              </button>
            )}
          </div>

          <div className="blog__cats">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`blog__cat-btn
                  ${activeCategory === cat ? 'blog__cat-btn--active' : ''}`}
                onClick={() => {
                  setCategory(cat)
                  setShowAll(false)
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Search Results Info ── */}
        {searchQuery && !apiLoading && (
          <div className="blog__search-info">
            {filtered.length === 0
              ? `No results for "${searchQuery}"`
              : `${filtered.length} result${filtered.length !== 1 ? 's' : ''} for "${searchQuery}"`
            }
          </div>
        )}

        {/* ── API Loading State ── */}
        {apiLoading && (
          <div className="blog__api-loading">
            <div className="blog__api-spinner" />
            <p>Loading articles...</p>
          </div>
        )}

        {/* ── API Error State ── */}
        {apiError && (
          <div className="blog__api-error">
            ❌ Failed to load articles. Please refresh the page.
          </div>
        )}

        {/* ── Content (only when API is done) ── */}
        {!apiLoading && !apiError && (
          <>
            {/* Featured Posts */}
            {featuredPosts.length > 0 && !searchQuery && (
              <div className="blog__featured-grid">
                {featuredPosts.map((post, i) => (
                  <FeaturedPostCard
                    key={post._id}
                    post={post}
                    index={i}
                    visible={visible}
                  />
                ))}
              </div>
            )}

            {/* Regular Posts Grid */}
            {regularPosts.length > 0 && (
              <>
                {featuredPosts.length > 0 && !searchQuery && (
                  <div className="blog__grid-label">More articles</div>
                )}
                <div className="blog__grid">
                  {visibleRegular.map((post, i) => (
                    <PostCard
                      key={post._id}
                      post={post}
                      index={i}
                      visible={visible}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Show More / Less */}
            {regularPosts.length > 3 && (
              <div className="blog__show-more">
                <button
                  className="blog__show-more-btn"
                  onClick={() => setShowAll(!showAll)}
                >
                  {showAll
                    ? 'Show less'
                    : `Show ${regularPosts.length - 3} more articles`
                  }
                  <span className={`blog__show-more-icon
                    ${showAll ? 'blog__show-more-icon--up' : ''}`}>
                    <IconArrowRight />
                  </span>
                </button>
              </div>
            )}

            {/* Empty State */}
            {filtered.length === 0 && (
              <div className="blog__empty">
                <div className="blog__empty-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12
                      a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8"  y2="13"/>
                    <line x1="16" y1="17" x2="8"  y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                </div>
                <p className="blog__empty-title">No articles found</p>
                <p className="blog__empty-sub">
                  {searchQuery
                    ? 'Try a different search term'
                    : 'No posts in this category yet'
                  }
                </p>
                <button
                  className="blog__empty-reset"
                  onClick={() => { setSearch(''); setCategory('All') }}
                >
                  Clear filters
                </button>
              </div>
            )}

            {/* Newsletter */}
            <Newsletter />
          </>
        )}

      </div>
    </section>
  )
}