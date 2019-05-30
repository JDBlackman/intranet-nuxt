import pkg from './package'

export default {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: "College of Science Intranet",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://use.typekit.net/mmu6pha.css' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.7.2/css/all.css' }
      //{ rel: 'stylesheet', href: 'https://unpkg.com/bootstrap-material-design@4.1.1/dist/css/bootstrap-material-design.min.css'}
    ],
    script: [
      { src: 'https://www.gstatic.com/firebasejs/6.0.2/firebase-app.js' },
      { src: 'https://www.gstatic.com/firebasejs/6.0.2/firebase-messaging.js'},
      { src: 'firebase-messaging.js' }
    ]
  },

  cache: true,

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~assets/css/main.css'
  ],

  router: {
    middleware: ['i18n', 'auth']
  },

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['~plugins/i18n.js', '~plugins/bus'],

  /*
  ** Nuxt.js modulesay
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    '@nuxtjs/pwa',
    '@nuxtjs/component-cache',
    'cookie-universal-nuxt',
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },


  manifest: {
    gcm_sender_id: '103953800507',
    gcm_sender_id_comment: "Do not change the GCM Sender ID",
    lang: 'en',
    start_url: '/',
    background_color:'#242b69',
    short_name: "CoS Hub",
    name: "College of Scince Hub",
    description: "Your Hub for everything Swansea Univeristy College of Science",
  },

  /** Nuxt PWA Workbox**/
  workbox: {
    offlineStrategy: 'CacheFirst',
    importScripts: [
      'firebase-messaging-sw.js'
    ],
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
