import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import BaseNavbar from '~/components/base/navbar/BaseNavbar.vue'
import { createTestNavigationItems } from '~/test/setup'

vi.mock('#app', () => ({
  useRoute: () => ({
    path: '/',
  }),
  navigateTo: vi.fn(),
}))

const createGlobalMocks = () => ({
  mocks: {
    $route: { path: '/' },
  },
  stubs: {
    NuxtLink: true,
  },
})

describe('BaseNavbar', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('shows navigation items for authenticated users', () => {
    const wrapper = mount(BaseNavbar, {
      props: {
        isAuthenticated: true,
        isAdmin: true,
        navigationItems: createTestNavigationItems(),
      },
      global: createGlobalMocks(),
    })

    expect(wrapper.text()).toContain('Welcome,  Logout Open main menu')
  })

  it('hides admin-only navigation items for non-admin users', () => {
    const wrapper = mount(BaseNavbar, {
      props: {
        isAuthenticated: true,
        isAdmin: false,
        navigationItems: createTestNavigationItems(),
      },
      global: createGlobalMocks(),
    })

    expect(wrapper.text()).toContain('Welcome,  Logout Open main menu')

    expect(wrapper.text()).not.toContain('Users')
  })

  it('shows user welcome message when authenticated', () => {
    const wrapper = mount(BaseNavbar, {
      props: {
        isAuthenticated: true,
        userFullName: 'John Doe',
      },
      global: createGlobalMocks(),
    })

    expect(wrapper.text()).toContain('Welcome, John Doe')
  })

  it('shows logout button when authenticated', () => {
    const wrapper = mount(BaseNavbar, {
      props: {
        isAuthenticated: true,
        userFullName: 'John Doe',
      },
      global: createGlobalMocks(),
    })

    const logoutButton = wrapper.find(
      'button[aria-label="Logout from account"]'
    )

    expect(logoutButton.exists()).toBe(true)
  })

  it('emits logout event when logout button is clicked', async () => {
    const wrapper = mount(BaseNavbar, {
      props: {
        isAuthenticated: true,
        userFullName: 'John Doe',
      },
      global: createGlobalMocks(),
    })

    const logoutButton = wrapper.find(
      'button[aria-label="Logout from account"]'
    )

    await logoutButton.trigger('click')

    expect(wrapper.emitted('logout')).toBeTruthy()
  })

  it('toggles mobile menu when hamburger button is clicked', async () => {
    const wrapper = mount(BaseNavbar, {
      props: {
        isAuthenticated: false,
      },
      global: createGlobalMocks(),
    })

    const hamburgerButton = wrapper.find('button[aria-controls="mobile-menu"]')

    expect(hamburgerButton.attributes('aria-expanded')).toBe('false')

    await hamburgerButton.trigger('click')

    expect(hamburgerButton.attributes('aria-expanded')).toBe('true')

    await hamburgerButton.trigger('click')

    expect(hamburgerButton.attributes('aria-expanded')).toBe('false')
  })
})
