// src/services/api.js
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// ── Generic fetch wrapper ──────────────────────────
async function apiFetch(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong')
  }

  return data
}

// ── Contact ────────────────────────────────────────
export async function submitContactForm(formData) {
  return apiFetch('/contact', {
    method: 'POST',
    body:   JSON.stringify(formData),
  })
}

// ── Projects ───────────────────────────────────────
export async function fetchProjects(params = {}) {
  const query = new URLSearchParams(params).toString()
  return apiFetch(`/projects${query ? `?${query}` : ''}`)
}

export async function fetchProjectById(id) {
  return apiFetch(`/projects/${id}`)
}

// ── Blog ───────────────────────────────────────────
export async function fetchPosts(params = {}) {
  const query = new URLSearchParams(params).toString()
  return apiFetch(`/blog${query ? `?${query}` : ''}`)
}

export async function fetchPostBySlug(slug) {
  return apiFetch(`/blog/${slug}`)
}