declare module '~/users.json' {
  const users: Array<{
    id: number
    name: string
    email: string
    password: string
    role: 'admin' | 'user'
    country: string
    createdAt: string
  }>
  export default users
}

declare module '~/types' {
  export interface User {
    id: number
    name: string
    email: string
    password: string
    role: 'admin' | 'user'
    country: string
    createdAt: string
  }

  export type WithoutPassword = Omit<User, 'password'>

  export interface LoggedUser extends WithoutPassword {}

  export interface LoginCredentials {
    email: string
    password: string
  }

  export interface AuthState {
    user: LoggedUser | null
    isAuthenticated: boolean
    isLoading: boolean
  }

  export interface UsersState {
    users: User[]
    filteredUsers: User[]
    currentPage: number
    itemsPerPage: number
    searchQuery: string
    selectedCountry: string
    totalItems: number
    totalPages: number
    hasNextPage: boolean
    hasPreviousPage: boolean
    countries: string[]
  }

  export interface DashboardStats {
    totalUsers: number
    totalAdmins: number
    totalRegularUsers: number
  }
} 