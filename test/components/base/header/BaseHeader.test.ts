import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseHeader from '~/components/base/header/BaseHeader.vue'

describe('BaseHeader', () => {
  it('renders title correctly', () => {
    const wrapper = mount(BaseHeader, {
      props: {
        title: 'Test Page',
      },
    })

    expect(wrapper.text()).toContain('Test Page')

    expect(wrapper.find('h1').text()).toBe('Test Page')
  })

  it('renders description when provided', () => {
    const wrapper = mount(BaseHeader, {
      props: {
        title: 'Test Page',
        description: 'This is a test description',
      },
    })

    expect(wrapper.text()).toContain('This is a test description')

    expect(wrapper.find('p').text()).toBe('This is a test description')
  })

  it('does not render description when not provided', () => {
    const wrapper = mount(BaseHeader, {
      props: {
        title: 'Test Page',
      },
    })

    expect(wrapper.find('p').exists()).toBe(false)
  })

  it('renders actions slot when provided', () => {
    const wrapper = mount(BaseHeader, {
      props: {
        title: 'Test Page',
      },
      slots: {
        actions: '<button>Action Button</button>',
      },
    })

    expect(wrapper.text()).toContain('Action Button')

    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('does not render actions container when no actions slot', () => {
    const wrapper = mount(BaseHeader, {
      props: {
        title: 'Test Page',
      },
    })

    expect(wrapper.find('.mt-4').exists()).toBe(false)
  })
})
