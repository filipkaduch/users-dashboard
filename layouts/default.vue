<template>
  <div class="min-h-screen bg-gray-50">
    <a 
      href="#main-content" 
      class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
    >
      Skip to main content
    </a>

    <BaseNavbar
      :is-authenticated="authStore.isAuthenticated"
      :user-full-name="authStore.userFullName"
      :is-admin="authStore.isAdmin"
      @logout="handleLogout"
    />

    <main id="main-content" class="flex-1">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()

const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  
  router.push('/login')
}
</script> 