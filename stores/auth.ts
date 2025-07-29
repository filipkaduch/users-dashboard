import { defineStore } from 'pinia'
import type { LoginCredentials, AuthState } from '~/types'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
  }),

  getters: {
    isAdmin: (state): boolean => {
      return state.user?.role === 'admin'
    },

    userFullName: (state): string => {
      return state.user?.name || ''
    },
  },

  actions: {
    async login(credentials: LoginCredentials): Promise<boolean> {
      this.isLoading = true

      try {
        const { user } = await $fetch('/api/auth/login', {
          method: 'POST',
          body: credentials,
        })

        if (user) {
          this.user = user

          this.isAuthenticated = true

          if (process.client) {
            localStorage.setItem('auth_user', JSON.stringify(user))
          }

          return true
        }

        return false
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Login error:', error)
        return false
      } finally {
        this.isLoading = false
      }
    },

    logout(): void {
      this.user = null

      this.isAuthenticated = false

      if (process.client) {
        localStorage.removeItem('auth_user')
      }
    },

    initializeAuth(): void {
      if (process.client) {
        const storedUser = localStorage.getItem('auth_user')

        if (storedUser) {
          try {
            this.user = JSON.parse(storedUser)

            this.isAuthenticated = true
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Error parsing stored user:', error)

            this.logout()
          }
        }
      }
    },
  },
})
