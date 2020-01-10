import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLodash from 'vue-lodash'

import './plugins/element.js'
import './assets/normalize.css'
import './assets/scss/layout.scss'

import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false

Vue.use(VueLodash)
Vue.use(VueAxios, axios)
Vue.prototype.$axios = axios

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDioklanx9D8vavzHZrYl1wgKLkTL6Xd48',
    libraries: 'places', // This is required if you use the Autocomplete plugin
  },
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
