// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  app: {
    baseURL: '/Wanderabout/',
    buildAssetsDir: 'assets'
  },

  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
  },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    'pinia-plugin-persistedstate'
  ]
})