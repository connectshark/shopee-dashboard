<script setup>
const BASE_URL = import.meta.env.VITE_API_URL
fetch(BASE_URL + `/user`).then(response => response.json())
  .then(res => console.log(res))
</script>

<template>
  <div class="">
    hello
    <router-link to="/b">進入後台</router-link>
    <router-link to="/login">登入</router-link>
  </div>
</template>