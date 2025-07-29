import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseStats from '~/components/base/stats/BaseStats.vue'

describe('BaseStats', () => {
  it('renders title and value correctly', () => {
    const wrapper = mount(BaseStats, {
      props: {
        title: 'Total Users',
        value: 150
      }
    })

    expect(wrapper.text()).toContain('Total Users')
    expect(wrapper.text()).toContain('150')
    expect(wrapper.find('dt').text()).toBe('Total Users')
    expect(wrapper.find('dd').text()).toBe('150')
  })

  it('renders string values correctly', () => {
    const wrapper = mount(BaseStats, {
      props: {
        title: 'Status',
        value: 'Active'
      }
    })

    expect(wrapper.find('dd').text()).toBe('Active')
  })

  it('renders default icon when no icon slot provided', () => {
    const wrapper = mount(BaseStats, {
      props: {
        title: 'Test',
        value: 100
      }
    })

    const icon = wrapper.find('svg')
    expect(icon.exists()).toBe(true)
    expect(icon.classes()).toContain('h-6', 'w-6', 'text-gray-400')
  })

  it('renders custom icon when icon slot provided', () => {
    const wrapper = mount(BaseStats, {
      props: {
        title: 'Test',
        value: 100
      },
      slots: {
        icon: '<svg class="custom-icon">Custom Icon</svg>'
      }
    })

    const customIcon = wrapper.find('.custom-icon')
    expect(customIcon.exists()).toBe(true)
    expect(customIcon.text()).toBe('Custom Icon')
  })

  it('has correct CSS classes', () => {
    const wrapper = mount(BaseStats, {
      props: {
        title: 'Test',
        value: 100
      }
    })

    expect(wrapper.classes()).toContain('bg-white', 'overflow-hidden', 'shadow', 'rounded-lg')
    expect(wrapper.find('.p-5').exists()).toBe(true)
    expect(wrapper.find('.flex').exists()).toBe(true)
    expect(wrapper.find('.items-center').exists()).toBe(true)
  })

  it('renders with different value types', () => {
    const numberWrapper = mount(BaseStats, {
      props: {
        title: 'Number',
        value: 42
      }
    })

    const stringWrapper = mount(BaseStats, {
      props: {
        title: 'String',
        value: 'Hello'
      }
    })

    expect(numberWrapper.find('dd').text()).toBe('42')
    expect(stringWrapper.find('dd').text()).toBe('Hello')
  })
}) 