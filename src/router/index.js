import { createRouter, createWebHistory } from 'vue-router'
import { useInfoStore } from '../stores/info'
import HomeView from '../views/HomeView.vue'
import BoardView from '../views/BoardView.vue'

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
    path: '/b',
    beforeEnter: (to, from, next) => {
      const store = useInfoStore()
      if (store.token) {
        next()
      } else {
        next({ path: '/login' })
      }
    },
    component: BoardView,
    children: [
      {
        path: '',
        name: 'range',
        component: () => import('../views/RangeView.vue')
      },
      {
        path: 'month',
        name: 'month',
        component: () => import('../views/MonthView.vue')
      },
      {
        path: 'recent',
        name: 'recent',
        component: () => import('../views/RecentView.vue')
      },
      {
        path: '/:pathMatch(.*)*',
        redirect: {
          name: 'range'
        }
      }
    ]
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
