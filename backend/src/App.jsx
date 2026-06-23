// src/app.js
const express        = require('express')
const cors           = require('cors')
const helmet         = require('helmet')
const morgan         = require('morgan')
const path           = require('path')
const { apiLimiter } = require('./middleware/rateLimiter')
const errorHandler   = require('./middleware/errorHandler')

// Routes
const contactRoutes  = require('./routes/contactRoutes')
const projectRoutes  = require('./routes/projectRoutes')
const blogRoutes     = require('./routes/blogRoutes')

const app = express()

// ── Security headers ───────────────────────────────
app.use(helmet())

// ── CORS ──────────────────────────────────────────
app.use(cors({
  origin: [
    process.env.CLIENT_URL,
    'http://localhost:5173',
    'http://localhost:3000',
  ],
  methods:     ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))

// ── Request parsing ───────────────────────────────
app.use(express.json({ limit: '10kb' }))       // Body limit
app.use(express.urlencoded({ extended: true }))

// ── Logging ───────────────────────────────────────
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// ── Rate limiting ─────────────────────────────────
app.use('/api', apiLimiter)

// ── Static files (resume PDF) ─────────────────────
app.use('/public', express.static(path.join(__dirname, '../public')))

// ── API Routes ────────────────────────────────────
app.use('/api/contact',  contactRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/blog',     blogRoutes)

// ── Health check ──────────────────────────────────
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Portfolio API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  })
})

// ── 404 handler ───────────────────────────────────
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found.`,
  })
})

// ── Error handler (must be last) ──────────────────
app.use(errorHandler)

module.exports = app