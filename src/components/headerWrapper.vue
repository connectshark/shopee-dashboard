<template>
  <header class="bg-white/60">
    <div class="w-11/12 mx-auto max-w-6xl p-4 flex items-center justify-between">
      <router-link class="font-bold text-xl" to="/">蝦皮分潤後台</router-link>
      <button :class="{ 'block': !menu }" @click="menu = !menu" type="button" class="bg-stone-200 md:hidden rounded-md text-stone-500 hover:bg-stone-300">
        <i v-if="menu" class='bx bx-menu bx-sm align-middle'></i>
        <i v-else class='bx bx-x bx-sm align-middle'></i>
      </button>
    </div>
      <nav :class="{ 'hidden': menu }" class="md:block">
        <ul class="w-11/12 mx-auto max-w-6xl p-4">
          <template v-if="store.isLogin">
            <li class="border-b border-stone-300 p-2 last:border-none">
              <p>Hi! {{ store.username }}</p>
            </li>
            <li class="border-b border-stone-300 p-2 last:border-none hover:bg-stone-200 rounded-lg">
              <button @click="logout" class="text-left w-full" type="button">登出</button>
            </li>
          </template>
          <li v-else class="border-b border-stone-300 p-2 last:border-none rounded-lg">
            <p>登入查看報表</p>
          </li>
        </ul>
      </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const menu = ref(true)

const router = useRouter()
const store = useUserStore()
const logout = () => {
  store.token = ''
  store.username = ''
  store.avatar = ''
  router.push('/login')
}

</script>