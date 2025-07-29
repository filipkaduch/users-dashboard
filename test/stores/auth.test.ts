import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { createTestUser } from '~/test/setup'

const mockFetch = vi.fn()

globalThis.$fetch = mockFetch

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())

    vi.clearAllMocks()
  })

  it('should initialize with default state', () => {
    const store = useAuthStore()

    expect(store.user).toBeNull()

    expect(store.isAuthenticated).toBe(false)

    expect(store.isLoading).toBe(false)
  })

  it('should return correct admin status', () => {
    const store = useAuthStore()

    store.user = createTestUser({ role: 'admin' })

    store.isAuthenticated = true

    expect(store.isAdmin).toBe(true)
  })

  it('should return correct user full name', () => {
    const store = useAuthStore()

    store.user = createTestUser({ name: 'John Doe' })

    expect(store.userFullName).toBe('John Doe')
  })

  it('should handle logout correctly', () => {
    const store = useAuthStore()

    store.user = createTestUser()

    store.isAuthenticated = true

    store.logout()

    expect(store.user).toBeNull()

    expect(store.isAuthenticated).toBe(false)
  })

  it('should handle successful login', async () => {
    const store = useAuthStore()

    const testUser = createTestUser()

    const mockResponse = { user: testUser, message: 'Login successful' }

    mockFetch.mockResolvedValue(mockResponse)

    const result = await store.login({
      email: 'john.doe@example.com',
      password: 'password123',
    })

    expect(result).toBe(true)

    expect(store.user).toEqual(testUser)

    expect(store.isAuthenticated).toBe(true)
  })

  it('should handle failed login', async () => {
    const store = useAuthStore()

    mockFetch.mockRejectedValue(new Error('Invalid credentials'))

    const result = await store.login({
      email: 'invalid@example.com',
      password: 'wrongpassword',
    })

    expect(result).toBe(false)

    expect(store.user).toBeNull()

    expect(store.isAuthenticated).toBe(false)
  })
})
