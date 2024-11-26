// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/css/custom-styles.css"],
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/svg-sprite",
    "pinia-plugin-persistedstate/nuxt",
    "nuxt-viewport",
    "@nuxt/image",
  ],
  build: {
    transpile: ['pinia-plugin-persistedstate'],
  },
  image: {
    domains: ["https://m.media-amazon.com"],
    dir: "assets/img",
  },
  tailwindcss: {
    cssPath: ["~/assets/css/tailwind.css", { injectPosition: "first" }],
    configPath: "tailwind.config",
    exposeConfig: {
      level: 2,
    },
    viewer: true,
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  svgSprite: {
    input: "~/assets/svg",
  },
});