<script setup>
import HeaderWrapper from './components/headerWrapper.vue'
</script>

<template>
  <HeaderWrapper/>
  <div class=" grid grid-cols-6">
    <main class=" col-span-6">
      <router-view />
    </main>
  </div>
</template>
