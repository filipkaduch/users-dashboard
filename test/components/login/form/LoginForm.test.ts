import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LoginForm from '~/components/login/form/LoginForm.vue'

describe('LoginForm', () => {
  const defaultProps = {
    form: {
      email: '',
      password: '',
    },
    errors: {},
    isLoading: false,
    loginError: '',
  }

  it('renders login form correctly', () => {
    const wrapper = mount(LoginForm, {
      props: defaultProps,
    })

    expect(wrapper.text()).toContain('Sign in to your account')

    expect(wrapper.find('input[type="email"]').exists()).toBe(true)

    expect(wrapper.find('input[type="password"]').exists()).toBe(true)

    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('renders form with initial values', () => {
    const wrapper = mount(LoginForm, {
      props: {
        ...defaultProps,
        form: {
          email: 'test@example.com',
          password: 'password123',
        },
      },
    })

    const emailInput = wrapper.find('input[type="email"]')

    const passwordInput = wrapper.find('input[type="password"]')

    expect(emailInput.element?.value).toBe('test@example.com')

    expect(passwordInput.element?.value).toBe('password123')
  })

  it('emits submit event with form data', async () => {
    const wrapper = mount(LoginForm, {
      props: defaultProps,
    })

    const emailInput = wrapper.find('input[type="email"]')

    const passwordInput = wrapper.find('input[type="password"]')

    await emailInput.setValue('test@example.com')

    await passwordInput.setValue('password123')

    const form = wrapper.find('form')

    await form.trigger('submit')

    expect(wrapper.emitted('submit')).toBeTruthy()

    expect(wrapper.emitted('submit')?.[0]).toEqual([
      {
        email: 'test@example.com',
        password: 'password123',
      },
    ])
  })

  it('shows loading state when isLoading is true', () => {
    const wrapper = mount(LoginForm, {
      props: {
        ...defaultProps,
        isLoading: true,
      },
    })

    const submitButton = wrapper.find('button[type="submit"]')

    expect(submitButton.text()).toBe('Signing in... Signing in...')

    expect(submitButton.attributes('disabled')).toBeDefined()
  })

  it('disables inputs when loading', () => {
    const wrapper = mount(LoginForm, {
      props: {
        ...defaultProps,
        isLoading: true,
      },
    })

    const emailInput = wrapper.find('input[type="email"]')

    const passwordInput = wrapper.find('input[type="password"]')

    expect(emailInput.attributes('disabled')).toBeDefined()

    expect(passwordInput.attributes('disabled')).toBeDefined()
  })

  it('shows error messages when errors are provided', () => {
    const wrapper = mount(LoginForm, {
      props: {
        ...defaultProps,
        errors: {
          email: 'Email is required',
          password: 'Password is required',
        },
      },
    })

    expect(wrapper.text()).toContain('Email is required')

    expect(wrapper.text()).toContain('Password is required')
  })

  it('shows login error message when provided', () => {
    const wrapper = mount(LoginForm, {
      props: {
        ...defaultProps,
        loginError: 'Invalid credentials',
      },
    })

    expect(wrapper.text()).toContain('Invalid credentials')

    expect(wrapper.text()).toContain('Login failed')
  })

  it('has correct form attributes', () => {
    const wrapper = mount(LoginForm, {
      props: defaultProps,
    })

    const form = wrapper.find('form')

    expect(form.attributes('novalidate')).toBeDefined()
  })

  it('has correct input attributes', () => {
    const wrapper = mount(LoginForm, {
      props: defaultProps,
    })

    const emailInput = wrapper.find('input[type="email"]')

    const passwordInput = wrapper.find('input[type="password"]')

    expect(emailInput.attributes('autocomplete')).toBe('email')

    expect(emailInput.attributes('required')).toBeDefined()

    expect(passwordInput.attributes('autocomplete')).toBe('current-password')

    expect(passwordInput.attributes('required')).toBeDefined()
  })

  it('shows sample credentials section', () => {
    const wrapper = mount(LoginForm, {
      props: defaultProps,
    })

    expect(wrapper.text()).toContain('Sample Credentials')

    expect(wrapper.text()).toContain('Admin:')

    expect(wrapper.text()).toContain('User:')
  })

  it('shows loading spinner when loading', () => {
    const wrapper = mount(LoginForm, {
      props: {
        ...defaultProps,
        isLoading: true,
      },
    })

    const spinner = wrapper.find('svg.animate-spin')

    expect(spinner.exists()).toBe(true)
  })

  it('has proper accessibility attributes', () => {
    const wrapper = mount(LoginForm, {
      props: {
        ...defaultProps,
        errors: {
          email: 'Email error',
        },
      },
    })

    const emailInput = wrapper.find('input[type="email"]')

    expect(emailInput.attributes('aria-invalid')).toBe('true')

    expect(emailInput.attributes('aria-describedby')).toBe('email-error')
  })
})
