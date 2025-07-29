<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h1 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h1>
        <p class="mt-2 text-center text-sm text-gray-600">
          Use any user credentials from the users.json file
        </p>
      </div>
      
      <form 
        class="mt-8 space-y-6" 
        @submit.prevent="$emit('submit', form)"
        novalidate
      >
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">Email address</label>
            <input
              id="email"
              v-model="form.email"
              name="email"
              type="email"
              autocomplete="email"
              required
              :disabled="isLoading"
              :aria-invalid="errors.email ? 'true' : 'false'"
              :aria-describedby="errors.email ? 'email-error' : undefined"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="Email address"
            />
            <div 
              v-if="errors.email" 
              id="email-error" 
              class="mt-1 text-sm text-red-600"
              role="alert"
            >
              {{ errors.email }}
            </div>
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              v-model="form.password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              :disabled="isLoading"
              :aria-invalid="errors.password ? 'true' : 'false'"
              :aria-describedby="errors.password ? 'password-error' : undefined"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="Password"
            />
            <div 
              v-if="errors.password" 
              id="password-error" 
              class="mt-1 text-sm text-red-600"
              role="alert"
            >
              {{ errors.password }}
            </div>
          </div>
        </div>

        <div v-if="loginError" class="rounded-md bg-red-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <IconsExclamationCircle class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" />
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">
                Login failed
              </h3>
              <div class="mt-2 text-sm text-red-700">
                {{ loginError }}
              </div>
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
            :aria-describedby="isLoading ? 'loading-text' : undefined"
          >
            <span v-if="isLoading" class="absolute left-0 inset-y-0 flex items-center pl-3">
              <IconsSpinner class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" />
            </span>
            <span v-if="isLoading" id="loading-text" class="sr-only">Signing in...</span>
            {{ isLoading ? 'Signing in...' : 'Sign in' }}
          </button>
        </div>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-gray-50 text-gray-500">Sample Credentials</span>
            </div>
          </div>
          <div class="mt-4 text-xs text-gray-500 space-y-1">
            <p><strong>Admin:</strong> john.doe@example.com / password123</p>
            <p><strong>User:</strong> jane.smith@example.com / password123</p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
interface LoginForm {
  email: string
  password: string
}

interface FormErrors {
  email?: string
  password?: string
}

interface Props {
  form: LoginForm
  errors: FormErrors
  isLoading: boolean
  loginError: string
}

defineProps<Props>()

defineEmits<{
  submit: [form: LoginForm]
}>()
</script> 