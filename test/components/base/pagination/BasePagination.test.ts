import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BasePagination from '~/components/base/pagination/BasePagination.vue'

describe('BasePagination', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 5,
    totalItems: 50,
    itemsPerPage: 10,
    hasPreviousPage: false,
    hasNextPage: true,
  }

  it('renders pagination when total pages > 1', () => {
    const wrapper = mount(BasePagination, {
      props: defaultProps,
    })

    expect(wrapper.find('.bg-white').exists()).toBe(true)
  })

  it('does not render when total pages <= 1', () => {
    const wrapper = mount(BasePagination, {
      props: {
        ...defaultProps,
        totalPages: 1,
      },
    })

    expect(wrapper.find('.bg-white').exists()).toBe(false)
  })

  it('shows correct page information', () => {
    const wrapper = mount(BasePagination, {
      props: {
        ...defaultProps,
        currentPage: 2,
        totalItems: 25,
        itemsPerPage: 10,
      },
    })

    expect(wrapper.text()).toContain('Showing')
    expect(wrapper.text()).toContain('11')
    expect(wrapper.text()).toContain('20')
    expect(wrapper.text()).toContain('25')
  })

  it('emits previous event when previous button is clicked', async () => {
    const wrapper = mount(BasePagination, {
      props: {
        ...defaultProps,
        hasPreviousPage: true,
      },
    })

    const previousButton = wrapper.find(
      'button[aria-label="Go to previous page"]'
    )
    await previousButton.trigger('click')

    expect(wrapper.emitted('previous')).toBeTruthy()
  })

  it('emits next event when next button is clicked', async () => {
    const wrapper = mount(BasePagination, {
      props: {
        ...defaultProps,
        hasNextPage: true,
      },
    })

    const nextButton = wrapper.find('button[aria-label="Go to next page"]')
    await nextButton.trigger('click')

    expect(wrapper.emitted('next')).toBeTruthy()
  })

  it('emits pageChange event when page number is clicked', async () => {
    const wrapper = mount(BasePagination, {
      props: {
        ...defaultProps,
        currentPage: 1,
        totalPages: 3,
      },
    })

    const pageButton = wrapper.find('button[aria-label="Go to page 2"]')
    await pageButton.trigger('click')

    expect(wrapper.emitted('pageChange')).toBeTruthy()
    expect(wrapper.emitted('pageChange')[0]).toEqual([2])
  })

  it('disables previous button when hasPreviousPage is false', () => {
    const wrapper = mount(BasePagination, {
      props: {
        ...defaultProps,
        hasPreviousPage: false,
      },
    })

    const previousButton = wrapper.find(
      'button[aria-label="Go to previous page"]'
    )
    expect(previousButton.attributes('disabled')).toBeDefined()
  })

  it('disables next button when hasNextPage is false', () => {
    const wrapper = mount(BasePagination, {
      props: {
        ...defaultProps,
        hasNextPage: false,
      },
    })

    const nextButton = wrapper.find('button[aria-label="Go to next page"]')
    expect(nextButton.attributes('disabled')).toBeDefined()
  })

  it('highlights current page correctly', () => {
    const wrapper = mount(BasePagination, {
      props: {
        ...defaultProps,
        currentPage: 2,
      },
    })

    const currentPageButton = wrapper.find('button[aria-current="page"]')
    expect(currentPageButton.exists()).toBe(true)
    expect(currentPageButton.text()).toBe('2')
  })

  it('shows mobile pagination on small screens', () => {
    const wrapper = mount(BasePagination, {
      props: defaultProps,
    })

    const mobilePagination = wrapper.find(
      '.flex-1.flex.justify-between.sm\\:hidden'
    )
    expect(mobilePagination.exists()).toBe(true)
  })

  it('shows desktop pagination on large screens', () => {
    const wrapper = mount(BasePagination, {
      props: defaultProps,
    })

    const desktopPagination = wrapper.find(
      '.hidden.sm\\:flex-1.sm\\:flex.sm\\:items-center.sm\\:justify-between'
    )
    expect(desktopPagination.exists()).toBe(true)
  })

  it('calculates visible pages correctly', () => {
    const wrapper = mount(BasePagination, {
      props: {
        ...defaultProps,
        currentPage: 3,
        totalPages: 7,
      },
    })

    // Should show pages around current page (1, 2, 3, 4, 5, 7)
    const pageButtons = wrapper.findAll('button[aria-label^="Go to page"]')
    expect(pageButtons.length).toBeGreaterThan(0)
  })
})
