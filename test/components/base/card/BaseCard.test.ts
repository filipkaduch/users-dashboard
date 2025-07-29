import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseCard from '~/components/base/card/BaseCard.vue'
import { NuxtLink } from '#components'

describe('BaseCard', () => {
  it('renders title and description correctly', () => {
    const wrapper = mount(BaseCard, {
      props: {
        title: 'Test Card',
        description: 'This is a test description',
      },
    })

    expect(wrapper.text()).toContain('Test Card')

    expect(wrapper.text()).toContain('This is a test description')
  })

  it('renders as a link when to prop is provided', () => {
    const wrapper = mount(BaseCard, {
      props: {
        title: 'Test Card',
        description: 'Test description',
        to: '/test',
      },
      global: {
        stubs: {
          NuxtLink: true,
        },
      },
    })

    expect(wrapper.findComponent(NuxtLink).exists()).toBe(true)
  })

  it('renders as a div when no to prop is provided', () => {
    const wrapper = mount(BaseCard, {
      props: {
        title: 'Test Card',
        description: 'Test description',
      },
    })

    expect(wrapper.find('div').exists()).toBe(true)

    expect(wrapper.find('a').exists()).toBe(false)
  })

  it('renders default icon when no icon slot provided', () => {
    const wrapper = mount(BaseCard, {
      props: {
        title: 'Test',
        description: 'Test description',
      },
    })

    const icon = wrapper.find('svg')

    expect(icon.exists()).toBe(true)
  })

  it('renders custom icon when icon slot provided', () => {
    const wrapper = mount(BaseCard, {
      props: {
        title: 'Test',
        description: 'Test description',
      },
      slots: {
        icon: '<svg class="custom-icon">Custom Icon</svg>',
      },
    })

    const customIcon = wrapper.find('.custom-icon')

    expect(customIcon.exists()).toBe(true)

    expect(customIcon.text()).toBe('Custom Icon')
  })
})
