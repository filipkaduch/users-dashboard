// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss'
  ],
  typescript: {
    strict: false,
    typeCheck: false,
    shim: false
  },
  nitro: {
    compatibilityDate: '2025-07-28'
  },
  vite: {
    define: {
      global: 'globalThis'
    },
    optimizeDeps: {
      include: ['vue', 'vue-router']
    }
  },
  app: {
    head: {
      title: 'Users Dashboard',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'User management dashboard with authentication' }
      ]
    }
  }
}) 