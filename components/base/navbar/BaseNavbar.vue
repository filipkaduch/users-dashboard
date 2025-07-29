<template>
  <nav 
    class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40"
    role="navigation"
    aria-label="Main navigation"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex-shrink-0">
          <NuxtLink 
            to="/" 
            class="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            aria-label="Go to home page"
          >
            {{ brandName }}
          </NuxtLink>
        </div>

        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <NuxtLink
              v-for="item in filteredNavigationItems"
              :key="item.path"
              :to="item.path"
              class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              :class="{ 'text-blue-600 bg-blue-50': $route.path === item.path }"
              aria-current="page"
            >
              {{ item.label }}
            </NuxtLink>
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <div v-if="isAuthenticated" class="flex items-center space-x-3">
            <span class="text-sm text-gray-700 hidden lg:block">
              Welcome, {{ userFullName }}
            </span>
            <button
              @click="$emit('logout')"
              class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              aria-label="Logout from account"
            >
              Logout
            </button>
          </div>

          <button
            @click="toggleMobileMenu"
            class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            aria-controls="mobile-menu"
            :aria-expanded="mobileMenuOpen"
          >
            <span class="sr-only">Open main menu</span>
            <IconsMenu
              v-if="!mobileMenuOpen"
              class="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              :aria-hidden="true"
            />

            <IconsX
              v-else
              class="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              :aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </div>

    <div
      v-show="mobileMenuOpen"
      class="md:hidden"
      id="mobile-menu"
      role="menu"
    >
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
        <NuxtLink
          v-for="item in navigationItems"
          :key="item.path"
          :to="item.path"
          class="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium transition-colors"
          :class="{ 'text-blue-600 bg-blue-50': $route.path === item.path }"
          @click="closeMobileMenu"
          aria-current="page"
        >
          {{ item.label }}
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
interface NavigationItem {
  path: string
  label: string
  requiresAuth?: boolean
  requiresAdmin?: boolean
}

interface Props {
  brandName?: string
  navigationItems?: NavigationItem[]
  isAuthenticated?: boolean
  userFullName?: string
  isAdmin?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  brandName: 'Users Dashboard',
  navigationItems: () => [
    { path: '/', label: 'Dashboard' },
    { path: '/users', label: 'Users', requiresAdmin: true }
  ],
  isAuthenticated: false,
  userFullName: '',
  isAdmin: false
})

defineEmits<{
  logout: []
}>()

const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

const filteredNavigationItems = computed(() => {
  return props.navigationItems.filter(item => {
    if (item.requiresAuth && !props.isAuthenticated) return false

    if (item.requiresAdmin && !props.isAdmin) return false

    return true
  })
})

watch(() => useRoute().path, () => {
  closeMobileMenu()
})
</script> 