import { apiFetch } from './api'

// Fetch profile
export async function fetchProfile() {
  return apiFetch('/profile')
}

// Update avatar
export async function updateAvatar(formData) {
  return apiFetch('/profile/avatar', {
    method: 'PUT',
    body: formData,
  }, true)
}
