export default {
  /*
   ** Headers of the page
   ** Doc: https://vue-meta.nuxtjs.org/api/#metainfo-properties
   */
  head: {
    title: "EddieChineseChess",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Chinese chess by EddiOnTheCode"
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href:
          "https://play-lh.googleusercontent.com/61UiKWiHuRRCPhbhkuT7Amm1dRw6EAtGZ4qmwyll11V7J4zqKhG2Q5Xt_IJYfzYEUYQ"
      }
    ]
  },
  build: {
    loaders: {
      sass: {
        implementation: require("sass")
      },
      scss: {
        implementation: require("sass")
      }
    }
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  modules: ["@nuxtjs/style-resources"],
  /*
   ** Nuxt.js modules
   ** Doc: https://modules.nuxtjs.org
   */
  css: ["~assets/lib/css/bootstrap.min.css"],
  styleResources: {
    // scss: ["~assets/scss/resource/_index.scss", "~assets/scss/common/common.scss"]
  },

  /*
   ** Global CSS
   ** Doc: https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-css
   */

  /*
   ** Plugins to load before mounting the App
   ** Doc: https://nuxtjs.org/docs/2.x/directory-structure/plugins
   */
  plugins: []
};
