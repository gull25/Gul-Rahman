// src/models/Contact.js
const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema(
  {
    firstName: {
      type:     String,
      required: [true, 'First name is required'],
      trim:     true,
      maxlength:[50, 'First name too long'],
    },
    lastName: {
      type:     String,
      required: [true, 'Last name is required'],
      trim:     true,
      maxlength:[50, 'Last name too long'],
    },
    email: {
      type:     String,
      required: [true, 'Email is required'],
      trim:     true,
      lowercase: true,
      match:    [/\S+@\S+\.\S+/, 'Invalid email format'],
    },
    phone: {
      type:     String,
      trim:     true,
      default:  '',
    },
    subject: {
      type:     String,
      required: [true, 'Subject is required'],
      enum: [
        'Project Inquiry',
        'Job Opportunity',
        'Freelance Work',
        'Collaboration',
        'Just Saying Hi',
        'Other',
      ],
    },
    budget: {
      type:    String,
      default: '',
    },
    message: {
      type:     String,
      required: [true, 'Message is required'],
      trim:     true,
      minlength:[20,   'Message must be at least 20 characters'],
      maxlength:[500,  'Message cannot exceed 500 characters'],
    },
    status: {
      type:    String,
      enum:    ['new', 'read', 'replied'],
      default: 'new',
    },
    ipAddress: {
      type: String,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
)

module.exports = mongoose.model('Contact', contactSchema)