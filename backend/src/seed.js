// src/seed.js
require('dotenv').config()
const connectDB = require('./config/db')
const Project   = require('./models/Project')
const PROJECTS = [
  {
    title:    'SaaS Analytics Dashboard',
    desc:     'A full-featured analytics dashboard built with React and TypeScript. Includes real-time charts, data tables, user management, and a custom component library. Served 5,000+ daily active users in production.',
    tags:     ['React', 'TypeScript', 'Redux', 'Recharts', 'Tailwind'],
    category: 'react',
    featured: true,
    stars:    128,
    demo:     'https://demo.example.com',
    code:     'https://github.com',
    color:    '#1d4ed8',
    colorBg:  '#eff6ff',
    order:    1,
  },
  {
    title:    'E-Commerce Storefront',
    desc:     'Responsive e-commerce UI with cart, wishlist, filters, and product detail pages. Built with Next.js and integrated with a headless CMS.',
    tags:     ['Next.js', 'Tailwind', 'Sanity CMS', 'Stripe'],
    category: 'fullstack',
    featured: true,
    stars:    84,
    demo:     'https://demo.example.com',
    code:     'https://github.com',
    color:    '#16a34a',
    colorBg:  '#f0fdf4',
    order:    2,
  },
  {
    title:    'Task Management App',
    desc:     'Kanban-style task manager with drag and drop, labels, due dates, and real-time team collaboration.',
    tags:     ['React', 'Firebase', 'DnD Kit', 'Zustand'],
    category: 'react',
    featured: false,
    stars:    62,
    demo:     'https://demo.example.com',
    code:     'https://github.com',
    color:    '#9333ea',
    colorBg:  '#faf5ff',
    order:    3,
  },
  {
    title:    'Movie Explorer',
    desc:     'Search and discover movies using the OMDB API. Features favourites, filters, URL-based search, and detail pages with React Router.',
    tags:     ['React', 'React Router', 'OMDB API', 'Context API'],
    category: 'react',
    featured: false,
    stars:    45,
    demo:     'https://demo.example.com',
    code:     'https://github.com',
    color:    '#ea580c',
    colorBg:  '#fff7ed',
    order:    4,
  },
  {
    title:    'Expense Tracker',
    desc:     'Personal finance tracker with income and expense management, category filtering, and localStorage persistence.',
    tags:     ['React', 'useReducer', 'Chart.js', 'localStorage'],
    category: 'react',
    featured: false,
    stars:    38,
    demo:     'https://demo.example.com',
    code:     'https://github.com',
    color:    '#0891b2',
    colorBg:  '#ecfeff',
    order:    5,
  },
  {
    title:    'Dev Blog Platform',
    desc:     'A markdown-based blogging platform with syntax highlighting, tag filtering, and dark mode support.',
    tags:     ['Next.js', 'MDX', 'Tailwind', 'gray-matter'],
    category: 'fullstack',
    featured: false,
    stars:    57,
    demo:     'https://demo.example.com',
    code:     'https://github.com',
    color:    '#be185d',
    colorBg:  '#fdf2f8',
    order:    6,
  },
]
async function seed() {
  try {
    await connectDB()
    console.log('🌱 Seeding database...')

    // Clear existing data
    await Project.deleteMany({})
    console.log('🗑️  Cleared existing data')

    await Project.insertMany(PROJECTS)
    console.log(`✅ Inserted ${PROJECTS.length} projects`)

    console.log('🎉 Database seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Seed failed:', error)
    process.exit(1)
  }
}

seed()