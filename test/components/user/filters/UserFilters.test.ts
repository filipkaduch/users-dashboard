import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UserFilters from '~/components/user/filters/UserFilters.vue'

describe('UserFilters', () => {
  const defaultProps = {
    searchQuery: '',
    selectedCountry: '',
    countries: ['United States', 'Canada', 'United Kingdom'],
  }

  it('renders search input correctly', () => {
    const wrapper = mount(UserFilters, {
      props: defaultProps,
    })

    const searchInput = wrapper.find(
      'input[placeholder="Search by name or email..."]'
    )

    expect(searchInput.exists()).toBe(true)

    expect(searchInput.attributes('aria-label')).toBe(
      'Search users by name or email'
    )
  })

  it('renders country filter correctly', () => {
    const wrapper = mount(UserFilters, {
      props: defaultProps,
    })

    const countrySelect = wrapper.find(
      'select[aria-label="Filter users by country"]'
    )

    expect(countrySelect.exists()).toBe(true)

    expect(countrySelect.find('option[value=""]').text()).toBe('All Countries')
  })

  it('renders all countries in dropdown', () => {
    const wrapper = mount(UserFilters, {
      props: defaultProps,
    })

    const countryOptions = wrapper.findAll('option')

    expect(countryOptions).toHaveLength(4)

    expect(countryOptions[1].text()).toBe('United States')

    expect(countryOptions[2].text()).toBe('Canada')

    expect(countryOptions[3].text()).toBe('United Kingdom')
  })

  it('emits update:searchQuery when search input changes', async () => {
    const wrapper = mount(UserFilters, {
      props: defaultProps,
    })

    const searchInput = wrapper.find(
      'input[placeholder="Search by name or email..."]'
    )
    await searchInput.setValue('john')

    expect(wrapper.emitted('update:searchQuery')).toBeTruthy()

    expect(wrapper.emitted('update:searchQuery')?.[0]).toEqual(['john'])
  })

  it('emits update:selectedCountry when country select changes', async () => {
    const wrapper = mount(UserFilters, {
      props: defaultProps,
    })

    const countrySelect = wrapper.find(
      'select[aria-label="Filter users by country"]'
    )
    await countrySelect.setValue('United States')

    expect(wrapper.emitted('update:selectedCountry')).toBeTruthy()

    expect(wrapper.emitted('update:selectedCountry')?.[0]).toEqual([
      'United States',
    ])
  })

  it('emits clearFilters when clear button is clicked', async () => {
    const wrapper = mount(UserFilters, {
      props: defaultProps,
    })

    const clearButton = wrapper.find('button[aria-label="Clear all filters"]')
    await clearButton.trigger('click')

    expect(wrapper.emitted('clearFilters')).toBeTruthy()
  })

  it('shows current search query value', () => {
    const wrapper = mount(UserFilters, {
      props: {
        ...defaultProps,
        searchQuery: 'john doe',
      },
    })

    const searchInput = wrapper.find(
      'input[placeholder="Search by name or email..."]'
    )

    expect(searchInput.element?.value).toBe('john doe')
  })

  it('shows current selected country value', () => {
    const wrapper = mount(UserFilters, {
      props: {
        ...defaultProps,
        selectedCountry: 'United States',
      },
    })

    const countrySelect = wrapper.find(
      'select[aria-label="Filter users by country"]'
    )

    expect(countrySelect.element?.value).toBe('United States')
  })

  it('has correct CSS classes', () => {
    const wrapper = mount(UserFilters, {
      props: defaultProps,
    })

    expect(wrapper.classes()).toEqual([
      'bg-white',
      'shadow',
      'rounded-lg',
      'mb-6',
    ])
    expect(wrapper.find('.px-4.py-5.sm\\:p-6').exists()).toBe(true)
  })

  it('renders filter title correctly', () => {
    const wrapper = mount(UserFilters, {
      props: defaultProps,
    })

    expect(wrapper.text()).toContain('Filters')
    expect(wrapper.find('h3').text()).toBe('Filters')
  })

  it('renders search label correctly', () => {
    const wrapper = mount(UserFilters, {
      props: defaultProps,
    })

    const searchLabel = wrapper.find('label[for="search"]')
    expect(searchLabel.text()).toBe('Search Users')
  })

  it('renders country filter label correctly', () => {
    const wrapper = mount(UserFilters, {
      props: defaultProps,
    })

    const countryLabel = wrapper.find('label[for="country"]')
    expect(countryLabel.text()).toBe('Filter by Country')
  })

  it('renders clear filters button text correctly', () => {
    const wrapper = mount(UserFilters, {
      props: defaultProps,
    })

    const clearButton = wrapper.find('button[aria-label="Clear all filters"]')
    expect(clearButton.text()).toBe('Clear Filters')
  })
})
