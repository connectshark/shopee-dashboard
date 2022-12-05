import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        withoutAuth: true
      },
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/callback',
      name: 'callback',
      component: () => import('../views/Callback.vue'),
      meta: {
        withoutAuth: true
      },
      props: route => {
        return {
          accessToken: route.query.accessToken,
          username: route.query.username,
          avatar: route.query.avatar
        }
      }
    }
  ]
})
router.beforeEach((to, from) => {
  const store = useUserStore()
  if (to.meta.withoutAuth === undefined && !store.isLogin) {
    return {
      path: '/login'
    }
  }
})

export default router
