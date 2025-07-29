<template>
  <div
    v-if="totalPages > 1"
    class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
  >
    <div class="flex-1 flex justify-between sm:hidden">
      <button
        @click="$emit('previous')"
        :disabled="!hasPreviousPage"
        class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Go to previous page"
      >
        Previous
      </button>
      <button
        @click="$emit('next')"
        :disabled="!hasNextPage"
        class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Go to next page"
      >
        Next
      </button>
    </div>
    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Showing
          <span class="font-medium">{{ startItem }}</span>
          to
          <span class="font-medium">{{ endItem }}</span>
          of
          <span class="font-medium">{{ totalItems }}</span>
          results
        </p>
      </div>
      <div>
        <nav
          class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <button
            @click="$emit('previous')"
            :disabled="!hasPreviousPage"
            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Go to previous page"
          >
            <span class="sr-only">Previous</span>
            <IconsChevronLeft
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              :aria-hidden="true"
            />
          </button>

          <button
            v-for="page in visiblePages"
            :key="page"
            @click="$emit('pageChange', page)"
            :class="[
              page === currentPage
                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
              'relative inline-flex items-center px-4 py-2 border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500',
            ]"
            :aria-current="page === currentPage ? 'page' : undefined"
            :aria-label="`Go to page ${page}`"
          >
            {{ page }}
          </button>

          <button
            @click="$emit('next')"
            :disabled="!hasNextPage"
            class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Go to next page"
          >
            <span class="sr-only">Next</span>
            <IconsChevronRight
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              :aria-hidden="true"
            />
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
    hasPreviousPage: boolean
    hasNextPage: boolean
  }

  const props = defineProps<Props>()

  defineEmits<{
    previous: []
    next: []
    pageChange: [page: number]
  }>()

  const startItem = computed(
    () => (props.currentPage - 1) * props.itemsPerPage + 1
  )

  const endItem = computed(() =>
    Math.min(props.currentPage * props.itemsPerPage, props.totalItems)
  )

  const visiblePages = computed(() => {
    const total = props.totalPages

    const current = props.currentPage

    const delta = 2

    const range = []

    const rangeWithDots = []

    for (
      let i = Math.max(2, current - delta);
      i <= Math.min(total - 1, current + delta);
      i++
    ) {
      range.push(i)
    }

    if (current - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (current + delta < total - 1) {
      rangeWithDots.push('...', total)
    } else if (total > 1) {
      rangeWithDots.push(total)
    }

    return rangeWithDots
  })
</script>
