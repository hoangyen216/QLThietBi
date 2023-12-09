// https://nuxt.com/docs/api/configuration/nuxt-config
// import { defineNuxtConfig } from 'nuxt'
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@element-plus/nuxt',
    'nuxt-icon',
    '@pinia/nuxt',
  ],
  runtimeConfig: {
    apiSecret: '123',
    public: {
      baseUrl: process.env.BASE_URL || 'http://192.168.0.109:5131/',
    },
  },

  elementPlus: { /** Options */ },
  css: ["bootstrap/dist/css/bootstrap.min.css"],

  ssr: false,
})



