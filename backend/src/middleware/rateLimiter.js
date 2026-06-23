// src/middleware/rateLimiter.js
const rateLimit = require('express-rate-limit')

// General API limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max:      100,             // 100 requests per window
  message: {
    success: false,
    message: 'Too many requests. Please try again in 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders:   false,
})

// Strict limiter for contact form — prevent spam
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max:      5,               // max 5 contact submissions per hour per IP
  message: {
    success: false,
    message: 'Too many messages sent. Please try again after an hour.',
  },
  standardHeaders: true,
  legacyHeaders:   false,
})

module.exports = { apiLimiter, contactLimiter }