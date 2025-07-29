export interface User {
  id: number
  name: string
  email: string
  password: string
  role: 'admin' | 'user'
  country: string
  createdAt: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthState {
  user: User | null
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
  countries: string[]
}

export interface DashboardStats {
  totalUsers: number
  totalAdmins: number
  totalRegularUsers: number
} 