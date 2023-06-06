import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import * as VueRouter from 'vue-router'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

const routes = [
  {
    path: '/', 
    component: () => import('./components/WelcomePage.vue')
  },
  {
    path: '/cricket',
    name: 'Cricket',
    component: () => import('./components/CricketPage.vue')
  },
]

const router = VueRouter.createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: VueRouter.createWebHistory(),
  routes, // short for `routes: routes`
})

createApp(App).use(router).use(vuetify).mount('#app')
