// src/routes/contactRoutes.js
const express  = require('express')
const { body } = require('express-validator')
const { submitContact, getContacts } = require('../controllers/contactController')
const { contactLimiter } = require('../middleware/rateLimiter')
const validate = require('../middleware/validate')

const router = express.Router()

// Validation rules for contact form
const contactValidation = [
  body('firstName')
    .trim()
    .notEmpty().withMessage('First name is required.')
    .isLength({ max: 50 }).withMessage('First name too long.'),

  body('lastName')
    .trim()
    .notEmpty().withMessage('Last name is required.')
    .isLength({ max: 50 }).withMessage('Last name too long.'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Enter a valid email address.')
    .normalizeEmail(),

  body('phone')
    .optional()
    .trim()
    .isLength({ max: 20 }).withMessage('Phone number too long.'),

  body('subject')
    .notEmpty().withMessage('Subject is required.')
    .isIn([
      'Project Inquiry', 'Job Opportunity', 'Freelance Work',
      'Collaboration', 'Just Saying Hi', 'Other',
    ]).withMessage('Invalid subject selected.'),

  body('budget')
    .optional()
    .trim(),

  body('message')
    .trim()
    .notEmpty().withMessage('Message is required.')
    .isLength({ min: 20 }).withMessage('Message must be at least 20 characters.')
    .isLength({ max: 500 }).withMessage('Message cannot exceed 500 characters.')
    .escape(), // sanitize HTML
]

// ── POST /api/contact  — submit form
router.post('/', contactLimiter, contactValidation, validate, submitContact)

// ── GET  /api/contact  — get all messages (admin)
router.get('/', getContacts)

module.exports = router