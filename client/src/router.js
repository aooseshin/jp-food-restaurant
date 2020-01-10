import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue';

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } 
    return { x: 0, y: 0 }
  },
  routes: [
    { path: '/:lang', component: Home, name: 'home' },
    { path: '/', component: Home, name: 'home' },
  ]
})

export default router