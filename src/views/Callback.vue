<template>
  <div class="min-h-screen">
    <div v-if="error" class=" text-center">
      <p>{{ props.error }}</p>
      <p>{{ props.detail }}</p>
      <p>
        <router-link class=" hover:text-primary hover:underline" to="/login">重新去登入></router-link>
      </p>
    </div>
    <h1 v-else>登入中...</h1>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
const props = defineProps(['accessToken', 'avatar', 'username', 'error', 'detail'])
const store = useUserStore()

if (!props.error) {
  store.token = props.accessToken
  store.username = props.username
  store.avatar = props.avatar
  const router = useRouter()
  router.replace('/')
}

</script>