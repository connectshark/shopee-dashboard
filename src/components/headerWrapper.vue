<template>
  <header class="bg-white/60">
    <div class="w-11/12 mx-auto max-w-6xl p-4 flex items-center justify-between">
      <router-link class="font-bold text-xl" to="/">蝦皮分潤後台</router-link>
      <nav>
        <button v-if="store.isLogin" @click="logout" type="button">登出</button>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const router = useRouter()
const store = useUserStore()
const logout = () => {
  store.token = ''
  store.username = ''
  store.avatar = ''
  router.push('/login')
}

</script>