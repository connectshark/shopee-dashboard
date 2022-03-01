<template>
  <figure v-if="res.picture">
    <img class=" inline-block w-4 align-middle" :src="res.picture" :alt="res.name">
    <p class=" inline-block align-middle">{{ res.name }}</p>
  </figure>
  <div v-else>
    <router-link to="/login"><i class='bx bx-log-in'></i>登入</router-link>
  </div>
</template>

<script setup>
import { useInfoStore } from '../stores/info'
import api from '../utils/api'

const store = useInfoStore()
const res = await api.getUserDetail(store.token)
</script>