import users from '~/users.json'
import type { User } from '~/types'

export default defineEventHandler(async event => {
  try {
    const query = getQuery(event)

    const { search, country, page = '1', limit = '10' } = query

    let filteredUsers: User[] = [...users]

    if (search && typeof search === 'string') {
      const searchLower = search.toLowerCase()

      filteredUsers = filteredUsers.filter(
        user =>
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower)
      )
    }

    if (country && typeof country === 'string') {
      filteredUsers = filteredUsers.filter(user => user.country === country)
    }

    const pageNum = parseInt(page as string, 10)

    const limitNum = parseInt(limit as string, 10)

    const startIndex = (pageNum - 1) * limitNum

    const endIndex = startIndex + limitNum

    const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

    const countries = [...new Set(users.map(user => user.country))].sort()

    return {
      users: paginatedUsers,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(filteredUsers.length / limitNum),
        totalItems: filteredUsers.length,
        itemsPerPage: limitNum,
        hasNextPage: endIndex < filteredUsers.length,
        hasPreviousPage: pageNum > 1,
      },
      filters: {
        countries,
        search: search || '',
        country: country || '',
      },
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch users',
    })
  }
})
