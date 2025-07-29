<template>
  <LoginForm
    :form="form"
    :errors="errors"
    :is-loading="authStore.isLoading"
    :login-error="loginError"
    @submit="handleLogin"
  />
</template>

<script setup lang="ts">
import type { LoginCredentials } from '~/types'

definePageMeta({
  layout: false
})

const authStore = useAuthStore()

const router = useRouter()

const form = ref<LoginCredentials>({
  email: '',
  password: ''
})

const errors = ref<Partial<LoginCredentials>>({})

const loginError = ref<string>('')

const validateForm = (): boolean => {
  errors.value = {}
  
  if (!form.value.email) {
    errors.value.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'Please enter a valid email address'
  }
  
  if (!form.value.password) {
    errors.value.password = 'Password is required'
  }
  
  return Object.keys(errors.value).length === 0
}

const handleLogin = async (loginForm: LoginCredentials) => {
  loginError.value = ''
  
  form.value = loginForm
  
  if (!validateForm()) {
    return
  }
  
  const success = await authStore.login(form.value)

  if (success) {
    router.push('/')
  } else {
    loginError.value = 'Invalid email or password. Please try again.'
  }
}

onMounted(() => {
  if (authStore.isAuthenticated) {
    router.push('/')
  }
})
</script> 