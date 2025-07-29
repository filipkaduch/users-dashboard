import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UserTable from '~/components/user/table/UserTable.vue'
import type { User } from '~/types'

describe('UserTable', () => {
  const mockUsers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'admin',
      country: 'United States',
      createdAt: '2023-01-15T10:30:00Z',
      password: 'password123'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'user',
      country: 'Canada',
      createdAt: '2023-02-20T14:45:00Z',
      password: 'password123'
    }
  ] as User[]

  it('renders table headers correctly', () => {
    const wrapper = mount(UserTable, {
      props: {
        users: mockUsers
      }
    })

    expect(wrapper.text()).toContain('User')

    expect(wrapper.text()).toContain('Role')

    expect(wrapper.text()).toContain('Country')

    expect(wrapper.text()).toContain('Created')
  })

  it('renders user data correctly', () => {
    const wrapper = mount(UserTable, {
      props: {
        users: mockUsers
      }
    })

    expect(wrapper.text()).toContain('John Doe')

    expect(wrapper.text()).toContain('john.doe@example.com')

    expect(wrapper.text()).toContain('admin')

    expect(wrapper.text()).toContain('United States')
  })

  it('renders user avatar with first letter', () => {
    const wrapper = mount(UserTable, {
      props: {
        users: mockUsers
      }
    })

    const avatar = wrapper.find('.h-10.w-10.rounded-full')

    expect(avatar.exists()).toBe(true)

    expect(avatar.text()).toBe('J')
  })

  it('applies correct role badge classes', () => {
    const wrapper = mount(UserTable, {
      props: {
        users: mockUsers
      }
    })

    const adminBadge = wrapper.find('.bg-blue-100.text-blue-800')

    const userBadge = wrapper.find('.bg-gray-100.text-gray-800')

    expect(adminBadge.exists()).toBe(true)
    
    expect(userBadge.exists()).toBe(true)
  })

  it('formats date correctly', () => {
    const wrapper = mount(UserTable, {
      props: {
        users: mockUsers
      }
    })

    expect(wrapper.text()).toContain('Jan')
    
    expect(wrapper.text()).toContain('Feb')
  })

  it('shows empty state when no users', () => {
    const wrapper = mount(UserTable, {
      props: {
        users: []
      }
    })

    expect(wrapper.text()).toContain('No users found')
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('shows custom empty state message', () => {
    const wrapper = mount(UserTable, {
      props: {
        users: [],
        emptyStateMessage: 'Custom empty message'
      }
    })

    expect(wrapper.text()).toContain('Custom empty message')
  })

  it('has correct table structure', () => {
    const wrapper = mount(UserTable, {
      props: {
        users: mockUsers
      }
    })

    expect(wrapper.find('table').exists()).toBe(true)

    expect(wrapper.find('thead').exists()).toBe(true)

    expect(wrapper.find('tbody').exists()).toBe(true)

    expect(wrapper.find('table').attributes('role')).toBe('table')

    expect(wrapper.find('table').attributes('aria-label')).toBe('Users table')
  })

  it('renders correct number of rows', () => {
    const wrapper = mount(UserTable, {
      props: {
        users: mockUsers
      }
    })

    const rows = wrapper.findAll('tbody tr')
    expect(rows).toHaveLength(2)
  })

  it('has hover effect on rows', () => {
    const wrapper = mount(UserTable, {
      props: {
        users: mockUsers
      }
    })

    const rows = wrapper.findAll('tbody tr')

    rows.forEach(row => {
      expect(row.classes()).toContain('hover:bg-gray-50')
    })
  })

  it('renders user information in correct structure', () => {
    const wrapper = mount(UserTable, {
      props: {
        users: [mockUsers[0]]
      }
    })

    const userCell = wrapper.find('tbody tr td:first-child')

    expect(userCell.find('.flex.items-center').exists()).toBe(true)

    expect(userCell.find('.ml-4').exists()).toBe(true)
  })

  it('handles different user roles correctly', () => {
    const usersWithDifferentRoles = [
      { ...mockUsers[0], role: 'admin' },
      { ...mockUsers[1], role: 'user' }
    ]

    const wrapper = mount(UserTable, {
      props: {
        users: usersWithDifferentRoles
      }
    })

    expect(wrapper.text()).toContain('admin')

    expect(wrapper.text()).toContain('user')
  })
}) 