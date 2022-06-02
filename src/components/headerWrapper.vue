<template>
  <header class="border-b border-gray-300 py-4">
    <div class="mx-auto w-11/12 flex items-center justify-between md:w-10/12 max-w-screen-xl">
      <h1>
        <router-link to="/" class=" font-bold"><i class='bx bx-chalkboard'></i>蝦皮電台</router-link>
      </h1>
      <template v-if="store.picture">
        <figure>
          <img class=" inline-block w-4 align-middle" @error="$event.target.src = 'https://picsum.photos/16/16'" :src="store.picture" :alt="store.name">
          <p class=" inline-block align-middle">{{ store.name }}</p>
        </figure>
      </template>
      <div v-else>
        <router-link to="/login"><i class='bx bx-log-in'></i>登入</router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useInfoStore } from '../stores/info'

const store = useInfoStore()
</script>