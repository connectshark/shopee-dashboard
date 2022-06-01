<template>
<section>
  <ul class=" gap-4 grid grid-cols-1 w-5/6 mx-auto lg:grid-cols-2 xl:grid-cols-3">
    <li class="flex" v-for="item in list" :key="item.categoryId">
      <img class=" mr-4 object-cover w-20 h-20" :src="item.imageUrl" :alt="item.categoryId">
      <div class=" text-left w-full">
        <p>{{ item.offerName }}</p>
        <p>{{ dayjs.unix(item.periodStartTime).format('M/DD') }} ~ {{ dayjs.unix(item.periodEndTime).format('M/DD') }} </p>
        <p @click="copy(item.offerLink)" class=" bg-gray-700 text-white p-1 rounded">{{ item.offerLink }} <i class='bx bx-copy'></i></p>
      </div>
    </li>
  </ul>
</section>
</template>

<script setup>
import graphQLParams from '../utils/graphQLParams'
import api from '../utils/api'
import { useInfoStore } from '../stores/info'
import { ref } from 'vue'
import dayjs from 'dayjs'
import copy from 'copy-text-to-clipboard'


const list = ref([])

const store = useInfoStore()
api.getProducts(graphQLParams.getShopeeOffer(), store.token)
  .then(res => {
    console.log(res)
    list.value = res.data.shopeeOfferV2.nodes
  })
</script>