import type { User } from "~/types"

export const createTestUser = (overrides = {}): User => ({
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123',
  role: 'user',
  country: 'United States',
  createdAt: '2023-01-01T00:00:00Z',
  ...overrides
})

export const createTestNavigationItems = () => [
  { path: '/', label: 'Home' },
  { path: '/users', label: 'Users', requiresAdmin: true }
]

export const createTestFormData = () => ({
  email: 'test@example.com',
  password: 'password123'
})

export const createTestErrors = () => ({
  email: 'Email is required',
  password: 'Password is required'
}) 