<template>
  <main class="w-4/5 mx-auto text-center">
    <a class=" bg-slate-400 p-4 rounded-2xl inline-block text-white hover:opacity-70" :href="url">登入按鈕</a>
  </main>
</template>

<script setup>
const REDIRECT_RUL = import.meta.env.VITE_API_URL + `/login/google`
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
const url = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${REDIRECT_RUL}&scope=openid email profile https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&response_type=code&client_id=${CLIENT_ID}`
</script>