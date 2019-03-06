const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  router: {
    middleware: ['routerbefore', 'i18n'],
    extendRoutes(routes, resolve) {
    }

  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: 'blue',height:"5px", failedColor: 'yellow' },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/icon/iconfont.css',
    '@/assets/css/main.css',
    '@/assets/css/self.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/crypto',
    '@/plugins/axios',
    {src:'@/plugins/cookies.js',ssr:false},
    {src:'@/plugins/util.js'},
    '@/plugins/i18n.js',
    '@/plugins/init.js',
    {src:'@/plugins/vue-schart.js',ssr:false}
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    progress: { failedColor: 'yellow' }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */

    vendor: ['@/plugins/element-ui',
      '@/plugins/crypto',
      '@/plugins/axios',
      '@/plugins/cookies.js',
      '@/plugins/util.js',
      '@/plugins/i18n.js',
      '@/plugins/init.js',
      '@/plugins/vue-schart.js',],
    extend(config, ctx) {

    }
  }
}
