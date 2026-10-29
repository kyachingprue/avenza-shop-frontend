import { createContext, useContext } from 'react'
import { API_BASE_URL } from '../lib/api-base'

export const AuthContext = createContext(null)

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  })
  const data = await response.json()
  if (!response.ok) {
    const error = new Error(data.error?.message || 'The request could not be completed.')
    error.code = data.error?.code
    throw error
  }
  return data
}

export const authApi = {
  login: credentials => request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  signup: credentials => request('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  verifyEmail: credentials => request('/api/auth/verify-email', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  google: idToken => request('/api/auth/google', {
    method: 'POST',
    body: JSON.stringify({ idToken }),
  }),
  getProfile: options => request('/api/users/me', options),
  updateProfile: photoURL => request('/api/users/me', {
    method: 'PATCH',
    body: JSON.stringify({ photoURL }),
  }),
  logout: () => request('/api/auth/logout', { method: 'POST' }),
}

export const authenticatedRequest = (path, options = {}) => request(path, options)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
