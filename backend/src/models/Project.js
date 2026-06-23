// src/models/Project.js
const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema(
  {
    title: {
      type:     String,
      required: [true, 'Title is required'],
      trim:     true,
    },
    desc: {
      type:     String,
      required: [true, 'Description is required'],
      trim:     true,
    },
    tags: {
      type:    [String],
      default: [],
    },
    category: {
      type: String,
      enum: ['react', 'fullstack', 'design', 'other'],
      default: 'react',
    },
    featured: {
      type:    Boolean,
      default: false,
    },
    stars: {
      type:    Number,
      default: 0,
    },
    demo: {
      type:    String,
      default: '',
    },
    code: {
      type:    String,
      default: '',
    },
    color: {
      type:    String,
      default: '#1d4ed8',
    },
    colorBg: {
      type:    String,
      default: '#eff6ff',
    },
    order: {
      type:    Number,
      default: 0,
    },
    published: {
      type:    Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Project', projectSchema)