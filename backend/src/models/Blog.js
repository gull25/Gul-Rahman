// src/models/Blog.js
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema(
  {
    title: {
      type:     String,
      required: [true, 'Title is required'],
      trim:     true,
    },
    excerpt: {
      type:     String,
      required: [true, 'Excerpt is required'],
      trim:     true,
    },
    content: {
      type:    String,
      default: '',
    },
    category: {
      type: String,
      enum: ['React', 'CSS', 'Performance', 'TypeScript', 'Best Practices', 'Other'],
      required: true,
    },
    tags: {
      type:    [String],
      default: [],
    },
    readTime: {
      type:    String,
      default: '5 min read',
    },
    views: {
      type:    Number,
      default: 0,
    },
    featured: {
      type:    Boolean,
      default: false,
    },
    isNew: {
      type:    Boolean,
      default: false,
    },
    color: {
      type:    String,
      default: '#1d4ed8',
    },
    colorBg: {
      type:    String,
      default: '#eff6ff',
    },
    published: {
      type:    Boolean,
      default: true,
    },
    slug: {
      type:   String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
)

// Auto-generate slug from title before saving
blogSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }
  next()
})

module.exports = mongoose.model('Blog', blogSchema)