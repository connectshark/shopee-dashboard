<template>
  <header class="bg-white/60">
    <div class="w-11/12 mx-auto max-w-6xl p-4 flex items-center justify-between">
      <router-link class=" text-xl" to="/">蝦皮分潤後台</router-link>
      <button v-if="store.token" @click="logout" class="text-stone-500 bg-stone-200 hover:bg-stone-300 p-1 rounded-xl transition" type="button">登出</button>
    </div>
  </header>
</template>

<script setup>
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