<template>
  <main>
    <div class="z-10 sticky top-0 left-0 text-center backdrop-blur-xl space-x-2">
      <h2 class=" text-2xl leading-loose">統計欄位</h2>
      <p class=" inline-block align-middle">
        <i class='bx bx-list-ul'></i>
        <span>{{ result.length }}</span>
      </p>
      <p class=" inline-block align-middle">
        <i class='bx bx-dollar-circle'></i>
        <span>{{ totalCommission.toFixed(2) }}</span>
      </p>
      <p class=" inline-block align-middle">
        <i class='bx bx-mobile'></i>
        <span>{{ totalDevice.APP }}</span>
      </p>
      <p class=" inline-block align-middle">
        <i class='bx bx-desktop'></i>
        <span>{{ totalDevice.WEB }}</span>
      </p>
    </div>
    <ul v-auto-animate class="mx-auto max-w-7xl grid md:grid-cols-2 lg:grid-cols-3 gap-4 w-11/12 py-4">
      <Report
        v-for="report in result"
        :key="report.checkoutId"
        :purchaseTime="report.purchaseTime"
        :estimatedTotalCommission="report.estimatedTotalCommission"
        :checkoutId="report.checkoutId"
        :referrer="report.referrer"
        :device="report.device"
        :orders="report.orders"
        :utmContent="report.utmContent"
      />
      <li v-if="error" class=" md:col-span-2 lg:col-span-3 text-center">
        <button @click="reload()" class="text-stone-500 leading-loose bg-stone-200 hover:bg-stone-300 p-1 rounded-xl transition" type="button">重新整理</button>
      </li>
      <li v-if="loading" class=" md:col-span-2 lg:col-span-3 text-center">
        <span>
          <i class='bx bx-md bx-loader bx-spin' ></i>
        </span>
      </li>
      <li class=" md:col-span-2 lg:col-span-3 text-center" v-if="hasNextPage">
        <button @click="loadMore()" type="button" class=" bg-primary text-white p-2 rounded-lg inline-block text-md">更多</button>
      </li>
    </ul>
  </main>
</template>

<script setup>
import { useFetch } from '../composable/api-core'
import Report from '../components/Report.vue'
import { computed } from '@vue/reactivity'

const {
  result,
  error,
  reload,
  loading,
  loadMore,
  hasNextPage
} = useFetch()

const totalCommission = computed(() => {
  return result.value.reduce((sum, item) => {
    return sum += parseFloat(item.estimatedTotalCommission)
  }, 0)
})

const totalDevice = computed(() => {
  return result.value.reduce((sum, item) => {
    if (!sum[item.device]) {
      sum[item.device] = 0
    }
    sum[item.device]++
    return sum
  }, {})
})

</script>