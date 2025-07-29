import users from '~/users.json'
import type { DashboardStats } from '~/types'

export default defineEventHandler(async () => {
  try {
    const totalUsers = users.length

    const totalAdmins = users.filter(user => user.role === 'admin').length

    const totalRegularUsers = totalUsers - totalAdmins

    const stats: DashboardStats = {
      totalUsers,
      totalAdmins,
      totalRegularUsers,
    }

    return stats
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch statistics',
    })
  }
})
