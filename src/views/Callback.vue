<template>
  <div class="min-h-screen">
    <h1>登入中...</h1>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
const props = defineProps(['accessToken', 'avatar', 'username'])
const store = useUserStore()
store.token = props.accessToken
store.username = props.username
store.avatar = props.avatar
const router = useRouter()
router.replace('/')
</script>