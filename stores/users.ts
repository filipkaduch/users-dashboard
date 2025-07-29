import { defineStore } from 'pinia'
import type { User, UsersState } from '~/types'

interface Pagination {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

interface UsersResponse {
  users: User[]
  pagination: Pagination
  filters: {
    countries: string[]
    search: string
    country: string
  }
}

export const useUsersStore = defineStore('users', {
  state: (): UsersState => ({
    users: [],
    filteredUsers: [],
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
    searchQuery: '',
    selectedCountry: '',
    countries: []
  }),

  getters: {
    paginatedUsers: (state): User[] => {
      return state.filteredUsers
    },
  },

  actions: {
    async loadUsers(): Promise<void> {
      try {
        const params = new URLSearchParams()
        
        if (this.searchQuery) {
          params.append('search', this.searchQuery)
        }
        
        if (this.selectedCountry) {
          params.append('country', this.selectedCountry)
        }
        
        params.append('page', this.currentPage.toString())

        params.append('limit', this.itemsPerPage.toString())

        const response = await $fetch<UsersResponse>(`/api/users?${params.toString()}`)

        this.setPagination(response.pagination)
        
        this.users = response.users

        this.filteredUsers = response.users

        this.countries = response.filters.countries
      } catch (error) {
        console.error('Error loading users:', error)
      }
    },

    setPagination(pagination: Pagination): void {
      this.currentPage = pagination.currentPage

      this.itemsPerPage = pagination.itemsPerPage

      this.totalItems = pagination.totalItems

      this.totalPages = pagination.totalPages

      this.hasNextPage = pagination.hasNextPage

      this.hasPreviousPage = pagination.hasPreviousPage
    },

    async setSearchQuery(query: string): Promise<void> {
      this.searchQuery = query

      this.currentPage = 1

      await this.loadUsers()
    },

    async setSelectedCountry(country: string): Promise<void> {
      this.selectedCountry = country

      this.currentPage = 1

      await this.loadUsers()
    },

    async setCurrentPage(page: number): Promise<void> {
      this.currentPage = page

      await this.loadUsers()
    },

    async nextPage(): Promise<void> {
      if (this.hasNextPage) {
        this.currentPage++

        await this.loadUsers()
      }
    },

    async previousPage(): Promise<void> {
      if (this.hasPreviousPage) {
        this.currentPage--

        await this.loadUsers()
      }
    },

    async clearFilters(): Promise<void> {
      this.searchQuery = ''

      this.selectedCountry = ''

      this.currentPage = 1

      await this.loadUsers()
    }
  }
}) 