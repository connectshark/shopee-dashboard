<template>
  <header class="border-b border-gray-300 py-4">
    <div class="mx-auto w-11/12 flex items-center justify-between md:w-10/12 max-w-screen-xl">
      <h1>
        <router-link to="/" class=" font-bold"><i class='bx bx-chalkboard'></i>蝦皮電台</router-link>
      </h1>
      <Suspense>
        <template #default>
          <User/>
        </template>
        <template #fallback>
          <p>loading...</p>
        </template>
      </Suspense>
    </div>
  </header>
</template>

<script setup>
import User from './user.vue'
</script>