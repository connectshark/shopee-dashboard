<script setup>

</script>

<template>
<p class=" py-4">
  <router-link class=" mx-2 inline-block bg-emerald-700 text-white rounded p-2 hover:opacity-80" to="/b/">後台首頁</router-link>
  <router-link class=" mx-2 inline-block bg-emerald-700 text-white rounded p-2 hover:opacity-80" to="/b/month">上月總結</router-link>
  <router-link class=" mx-2 inline-block bg-emerald-700 text-white rounded p-2 hover:opacity-80" to="/b/recent">近期清單</router-link>
</p>
  
  <router-view/>
</template>