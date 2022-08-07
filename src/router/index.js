import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'characters',
    component: () => import('../views/Characters.vue')
  },
  {
    path: '/character',
    name: 'character',
    component: () => import('../views/Character.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
