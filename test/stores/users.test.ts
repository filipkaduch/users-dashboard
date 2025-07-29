import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUsersStore } from '~/stores/users'
import { createTestUser } from '~/test/setup'

const mockFetch = vi.fn()

globalThis.$fetch = mockFetch

vi.mock('#app', () => ({
  $fetch: vi.fn(),
}))

describe('Users Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should initialize with default state', () => {
    const store = useUsersStore()

    expect(store.users).toEqual([])

    expect(store.filteredUsers).toEqual([])

    expect(store.currentPage).toBe(1)

    expect(store.itemsPerPage).toBe(10)

    expect(store.searchQuery).toBe('')

    expect(store.selectedCountry).toBe('')

    expect(store.countries).toEqual([])
  })

  it('should load users successfully', async () => {
    const store = useUsersStore()

    const mockUsers = [
      createTestUser(),
      createTestUser({ id: 2, name: 'Jane Doe' }),
    ]

    const mockResponse = {
      users: mockUsers,
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 2,
        itemsPerPage: 10,
        hasNextPage: false,
        hasPreviousPage: false,
      },
      filters: {
        countries: ['United States'],
        search: '',
        country: '',
      },
    }

    vi.mocked($fetch).mockResolvedValue(mockResponse)

    await store.loadUsers()

    expect(store.users).toEqual(mockUsers)

    expect(store.filteredUsers).toEqual(mockUsers)

    expect(store.countries).toEqual(['United States'])
  })

  it('should handle search query', async () => {
    const store = useUsersStore()

    const mockUsers = [createTestUser({ name: 'John Doe' })]

    const mockResponse = {
      users: mockUsers,
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 1,
        itemsPerPage: 10,
        hasNextPage: false,
        hasPreviousPage: false,
      },
      filters: {
        countries: ['United States'],
        search: 'John',
        country: '',
      },
    }

    vi.mocked($fetch).mockResolvedValue(mockResponse)

    await store.setSearchQuery('John')

    expect(store.searchQuery).toBe('John')

    expect(store.currentPage).toBe(1)
  })

  it('should handle country filter', async () => {
    const store = useUsersStore()

    const mockUsers = [createTestUser({ country: 'Canada' })]

    const mockResponse = {
      users: mockUsers,
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 1,
        itemsPerPage: 10,
        hasNextPage: false,
        hasPreviousPage: false,
      },
      filters: {
        countries: ['Canada'],
        search: '',
        country: 'Canada',
      },
    }

    vi.mocked($fetch).mockResolvedValue(mockResponse)

    await store.setSelectedCountry('Canada')

    expect(store.selectedCountry).toBe('Canada')

    expect(store.currentPage).toBe(1)
  })

  it('should clear filters', async () => {
    const store = useUsersStore()

    store.searchQuery = 'test'

    store.selectedCountry = 'Canada'

    store.currentPage = 2

    const mockResponse = {
      users: [],
      pagination: {
        currentPage: 1,
        totalPages: 0,
        totalItems: 0,
        itemsPerPage: 10,
        hasNextPage: false,
        hasPreviousPage: false,
      },
      filters: {
        countries: [],
        search: '',
        country: '',
      },
    }

    vi.mocked($fetch).mockResolvedValue(mockResponse)

    await store.clearFilters()

    expect(store.searchQuery).toBe('')

    expect(store.selectedCountry).toBe('')

    expect(store.currentPage).toBe(1)
  })
})
