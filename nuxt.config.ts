// https://nuxt.com/docs/api/configuration/nuxt-config
// import { defineNuxtConfig } from 'nuxt'
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@element-plus/nuxt',
    'nuxt-icon'
  ],
  runtimeConfig: {
    apiSecret: '123',
    public: {
      baseUrl: process.env.BASE_URL || 'http://localhost:5131/',
    },
  },
  elementPlus: { /** Options */ },

})



