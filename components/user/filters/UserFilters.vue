<template>
  <div class="bg-white shadow rounded-lg mb-6">
    <div class="px-4 py-5 sm:p-6">
      <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Filters</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label
            for="search"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Search Users
          </label>
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <IconsSearch
                class="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                :aria-hidden="true"
              />
            </div>
            <input
              id="search"
              :value="searchQuery"
              @input="
                $emit(
                  'update:searchQuery',
                  ($event.target as HTMLInputElement).value
                )
              "
              type="text"
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search by name or email..."
              aria-label="Search users by name or email"
            />
          </div>
        </div>

        <div>
          <label
            for="country"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Filter by Country
          </label>
          <select
            id="country"
            :value="selectedCountry"
            @change="
              $emit(
                'update:selectedCountry',
                ($event.target as HTMLSelectElement).value
              )
            "
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            aria-label="Filter users by country"
          >
            <option value="">All Countries</option>
            <option
              v-for="country in countries"
              :key="country"
              :value="country"
            >
              {{ country }}
            </option>
          </select>
        </div>

        <div class="flex items-end">
          <button
            @click="$emit('clearFilters')"
            class="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            aria-label="Clear all filters"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    searchQuery: string
    selectedCountry: string
    countries: string[]
  }

  defineProps<Props>()

  defineEmits<{
    'update:searchQuery': [value: string]
    'update:selectedCountry': [value: string]
    clearFilters: []
  }>()
</script>
