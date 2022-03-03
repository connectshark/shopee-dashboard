import { createRouter, createWebHistory } from 'vue-router'
import { useInfoStore } from '../stores/info'
import HomeView from '../views/HomeView.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    beforeEnter: (to, from, next) => {
      const store = useInfoStore()
      if (store.token) {
        next()
      } else {
        next({ path: '/login' })
      }
    },
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/callback',
    name: 'callback',
    component: () => import('../views/Callback.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
