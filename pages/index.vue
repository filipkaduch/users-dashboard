<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <BaseHeader
      title="Dashboard"
      description="Welcome to the Users Dashboard. Here's an overview of your platform."
    />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <BaseStats title="Total Users" :value="stats.totalUsers">
        <template #icon>
          <IconsUsers class="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" :aria-hidden="true" />
        </template>
      </BaseStats>

      <BaseStats title="Admin Users" :value="stats.totalAdmins">
        <template #icon>
          <IconsShieldCheck class="h-6 w-6 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" :aria-hidden="true" />
        </template>
      </BaseStats>

      <BaseStats title="Regular Users" :value="stats.totalRegularUsers">
        <template #icon>
          <IconsUser class="h-6 w-6 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" :aria-hidden="true" />
        </template>
      </BaseStats>
    </div>

    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <BaseCard
            v-if="authStore.isAdmin"
            title="Manage Users"
            description="View and manage all users in the system"
            to="/users"
          >
            <template #icon>
              <IconsUsers class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" :aria-hidden="true" />
            </template>
          </BaseCard>

          <BaseCard
            title="Analytics"
            description="View detailed analytics and reports"
          >
            <template #icon>
              <IconsChartBar class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" :aria-hidden="true" />
            </template>
          </BaseCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DashboardStats } from '~/types'

definePageMeta({
  middleware: 'auth'
})

const authStore = useAuthStore()

const stats = ref<DashboardStats>({
  totalUsers: 0,
  totalAdmins: 0,
  totalRegularUsers: 0
})

const fetchStats = async () => {
  try {
    const data = await $fetch('/api/stats')
    
    stats.value = data
  } catch (error) {
    console.error('Error fetching stats:', error)
  }
}

onMounted(async () => {
  await fetchStats()
})
</script> 