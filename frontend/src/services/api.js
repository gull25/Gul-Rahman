// src/services/api.js
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// ── Generic fetch wrapper ──────────────────────────
async function apiFetch(endpoint, options = {}, isFormData = false) {
  const headers = {}

  if (!isFormData) {
    headers['Content-Type'] = 'application/json'
  }

  const token = localStorage.getItem('adminToken')
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { ...headers, ...options.headers },
    ...options,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong')
  }

  return data
}

// ── Auth ───────────────────────────────────────────
export async function loginAdmin(credentials) {
  return apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })
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

export async function createProject(formData) {
  return apiFetch('/projects', {
    method: 'POST',
    body: formData,
  }, true)
}

export async function updateProject(id, formData) {
  return apiFetch(`/projects/${id}`, {
    method: 'PUT',
    body: formData,
  }, true)
}

export async function deleteProject(id) {
  return apiFetch(`/projects/${id}`, {
    method: 'DELETE',
  })
}