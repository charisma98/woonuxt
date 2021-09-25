export default {
  target: "static",
  components: true,
  head: {
    title: "WooNuxt",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Next generation front end for WooCommerce thats build with Nuxt.",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/icon.svg" }],
  },

  modules: ["@nuxtjs/pwa", "@nuxtjs/axios", "@nuxtjs/auth-next"],
  buildModules: ["@nuxtjs/tailwindcss", "@nuxt/image", "nuxt-graphql-request"],

  graphql: {
    clients: {
      default: {
        endpoint: `${process.env.WORDPRESS_URL}/graphql`,
        options: {
          credentials: "include",
          mode: "cors",
        },
      },
    },
  },

  auth: {
    strategies: {
      google: {
        responseType: "id_token token",
        codeChallengeMethod: "",
        clientId: process.env.GOOGLEID,
        clientSecret: process.env.GOOGLESECRET,
      },
    },
  },

  image: {
    provider: "static",
    domains: [process.env.WORDPRESS_URL],
  },

  // https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en",
    },
  },

  publicRuntimeConfig: {
    perPage: 12,
  },

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: "/products/page/:pageNumber",
        component: resolve(__dirname, "pages/products"),
      });
      routes.push({
        path: "/product-category/:categorySlug",
        component: resolve(__dirname, "pages/products"),
      });
      routes.push({
        path: "/product-category/:categorySlug/page/:pageNumber",
        component: resolve(__dirname, "pages/products"),
      });
    },
  },
};
