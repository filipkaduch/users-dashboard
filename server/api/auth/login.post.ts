import users from '~/users.json'
import type { LoginCredentials } from '~/types'

export default defineEventHandler(async event => {
  try {
    const body = (await readBody(event)) as LoginCredentials

    if (!body.email || !body.password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email and password are required',
      })
    }

    const user = users.find(
      u => u.email === body.email && u.password === body.password
    )

    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid credentials',
      })
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user

    return {
      user: userWithoutPassword,
      message: 'Login successful',
    }
  } catch (error) {
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Authentication failed',
    })
  }
})
