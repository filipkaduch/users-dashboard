<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <BaseHeader
      title="Users Management"
      description="View and manage all users in the system."
    />

    <UserFilters
      :search-query="searchQuery"
      :selected-country="selectedCountry"
      :countries="usersStore.countries"
      @update:search-query="usersStore.setSearchQuery"
      @update:selected-country="usersStore.setSelectedCountry"
      @clear-filters="usersStore.clearFilters"
    />

    <div class="mb-4">
      <p class="text-sm text-gray-600">
        {{
          `Showing ${usersStore.paginatedUsers.length} of ${usersStore.totalItems} users`
        }}
        <span v-if="usersStore.searchQuery || usersStore.selectedCountry">
          (filtered)
        </span>
      </p>
    </div>

    <UserTable
      :users="usersStore.paginatedUsers"
      :empty-state-message="
        usersStore.searchQuery || usersStore.selectedCountry
          ? 'Try adjusting your search or filter criteria.'
          : 'No users available.'
      "
    />

    <BasePagination
      v-if="usersStore.totalPages > 1"
      :current-page="usersStore.currentPage"
      :total-pages="usersStore.totalPages"
      :total-items="usersStore.totalItems"
      :items-per-page="usersStore.itemsPerPage"
      :has-previous-page="usersStore.hasPreviousPage"
      :has-next-page="usersStore.hasNextPage"
      @previous="usersStore.previousPage"
      @next="usersStore.nextPage"
      @page-change="usersStore.setCurrentPage"
    />
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    middleware: ['auth', 'admin'],
  })

  const usersStore = useUsersStore()

  const searchQuery = computed({
    get: () => usersStore.searchQuery,
    set: (value: string) => usersStore.setSearchQuery(value),
  })

  const selectedCountry = computed({
    get: () => usersStore.selectedCountry,
    set: (value: string) => usersStore.setSelectedCountry(value),
  })

  onMounted(async () => {
    await usersStore.loadUsers()
  })
</script>
