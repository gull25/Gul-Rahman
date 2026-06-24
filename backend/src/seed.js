// src/seed.js
require("dotenv").config();
const connectDB = require("./config/db");
const Project = require("./models/Project");
const Blog = require("./models/Blog");

const PROJECTS = [
  {
    title: "SaaS Analytics Dashboard",
    desc: "A full-featured analytics dashboard built with React and TypeScript. Includes real-time charts, data tables, user management, and a custom component library. Served 5,000+ daily active users in production.",
    tags: ["React", "TypeScript", "Redux", "Recharts", "Tailwind"],
    category: "react",
    featured: true,
    stars: 128,
    demo: "https://demo.example.com",
    code: "https://github.com",
    color: "#1d4ed8",
    colorBg: "#eff6ff",
    order: 1,
  },
  {
    title: "E-Commerce Storefront",
    desc: "Responsive e-commerce UI with cart, wishlist, filters, and product detail pages. Built with Next.js and integrated with a headless CMS.",
    tags: ["Next.js", "Tailwind", "Sanity CMS", "Stripe"],
    category: "fullstack",
    featured: true,
    stars: 84,
    demo: "https://demo.example.com",
    code: "https://github.com",
    color: "#16a34a",
    colorBg: "#f0fdf4",
    order: 2,
  },
  {
    title: "Task Management App",
    desc: "Kanban-style task manager with drag and drop, labels, due dates, and real-time team collaboration.",
    tags: ["React", "Firebase", "DnD Kit", "Zustand"],
    category: "react",
    featured: false,
    stars: 62,
    demo: "https://demo.example.com",
    code: "https://github.com",
    color: "#9333ea",
    colorBg: "#faf5ff",
    order: 3,
  },
  {
    title: "Movie Explorer",
    desc: "Search and discover movies using the OMDB API. Features favourites, filters, URL-based search, and detail pages with React Router.",
    tags: ["React", "React Router", "OMDB API", "Context API"],
    category: "react",
    featured: false,
    stars: 45,
    demo: "https://demo.example.com",
    code: "https://github.com",
    color: "#ea580c",
    colorBg: "#fff7ed",
    order: 4,
  },
  {
    title: "Expense Tracker",
    desc: "Personal finance tracker with income and expense management, category filtering, and localStorage persistence.",
    tags: ["React", "useReducer", "Chart.js", "localStorage"],
    category: "react",
    featured: false,
    stars: 38,
    demo: "https://demo.example.com",
    code: "https://github.com",
    color: "#0891b2",
    colorBg: "#ecfeff",
    order: 5,
  },
  {
    title: "Dev Blog Platform",
    desc: "A markdown-based blogging platform with syntax highlighting, tag filtering, and dark mode support.",
    tags: ["Next.js", "MDX", "Tailwind", "gray-matter"],
    category: "fullstack",
    featured: false,
    stars: 57,
    demo: "https://demo.example.com",
    code: "https://github.com",
    color: "#be185d",
    colorBg: "#fdf2f8",
    order: 6,
  },
];

const BLOG_POSTS = [
  {
    title: "Understanding useEffect Dependencies — A Deep Dive",
    excerpt:
      "The dependency array is the most misunderstood part of useEffect. We break down exactly how it works, when effects re-run, stale closures, and how the new useEffectEvent hook solves the trickiest edge cases.",
    content:
      "# Understanding useEffect Dependencies\n\nFull content goes here...",
    category: "React",
    tags: ["React", "Hooks", "useEffect"],
    readTime: "8 min read",
    views: 2400,
    featured: true,
    isNew: true,
    color: "#1d4ed8",
    colorBg: "#eff6ff",
  },
  {
    title: "CSS Grid vs Flexbox — When to Use Which",
    excerpt:
      "Both are powerful layout tools but choosing the wrong one leads to messy code. This guide breaks down the mental model for each.",
    content: "# CSS Grid vs Flexbox\n\nFull content goes here...",
    category: "CSS",
    tags: ["CSS", "Layout", "Frontend"],
    readTime: "6 min read",
    views: 3100,
    featured: true,
    isNew: false,
    color: "#7c3aed",
    colorBg: "#f5f3ff",
  },
  {
    title: "React Performance Patterns Every Dev Should Know",
    excerpt:
      "useMemo, useCallback, lazy loading, and code splitting — every React performance tool explained with clear examples.",
    content: "# React Performance Patterns\n\nFull content goes here...",
    category: "Performance",
    tags: ["React", "Performance", "Optimisation"],
    readTime: "10 min read",
    views: 1800,
    featured: false,
    isNew: false,
    color: "#059669",
    colorBg: "#ecfdf5",
  },
  {
    title: "Building a Design System with React and TypeScript",
    excerpt:
      "A step-by-step guide to building a scalable design system — component architecture, variant APIs, accessibility, and Storybook.",
    content: "# Design System with React\n\nFull content goes here...",
    category: "TypeScript",
    tags: ["TypeScript", "Design System", "React"],
    readTime: "12 min read",
    views: 2900,
    featured: false,
    isNew: false,
    color: "#0891b2",
    colorBg: "#ecfeff",
  },
  {
    title: "Mastering React Router v6 — Complete Guide",
    excerpt:
      "Everything about React Router v6 — nested routes, outlet, dynamic params, protected routes, and programmatic navigation.",
    content: "# React Router v6\n\nFull content goes here...",
    category: "React",
    tags: ["React", "React Router", "Navigation"],
    readTime: "9 min read",
    views: 4200,
    featured: false,
    isNew: false,
    color: "#dc2626",
    colorBg: "#fef2f2",
  },
  {
    title: "Writing Clean React Code — Patterns and Anti-patterns",
    excerpt:
      "Clean code in React is more than formatting — composition, custom hooks, naming conventions, and patterns that separate good code from great.",
    content: "# Clean React Code\n\nFull content goes here...",
    category: "Best Practices",
    tags: ["React", "Clean Code", "Patterns"],
    readTime: "7 min read",
    views: 5600,
    featured: false,
    isNew: false,
    color: "#ea580c",
    colorBg: "#fff7ed",
  },
];

async function seed() {
  try {
    await connectDB();
    console.log("🌱 Seeding database...");

    // Clear existing data
    await Project.deleteMany({});
    await Blog.deleteMany({});
    console.log("🗑️  Cleared existing data");

    // Insert seed data
    await Project.insertMany(PROJECTS);
    console.log(`✅ Inserted ${PROJECTS.length} projects`);

    await Blog.insertMany(BLOG_POSTS);
    console.log(`✅ Inserted ${BLOG_POSTS.length} blog posts`);

    console.log("🎉 Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error.message);
    process.exit(1);
  }
}

seed();
