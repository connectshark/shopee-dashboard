<template>
<section>
  <h2 class=" font-bold text-2xl">蝦皮分潤儀表板</h2>
  <p>快速查看近期內容</p>
  <div>
    <label>
      <input class=" appearance-none ring-1 rounded p-2" type="date" :max="dayjs().format('YYYY-MM-DD')" :min="dayjs(dayjs().subtract(3, 'M')).format('YYYY-MM-DD')" v-model="startTime">
    </label>
  </div>
</section>
<section>
  <h3></h3>
  <p>{{ list.length }}</p>
  <DateLineChart v-if="lineView" :lineView="lineView"/>
</section>
  
<Teleport to="#modal">
  <Loading  v-if="state.loading"/>
</Teleport>
</template>

<script setup>
import dayjs from 'dayjs'
import Loading from '../components/loading.vue'
import { computed, reactive, ref } from 'vue'
import { useInfoStore } from '../stores/info'
import api from '../utils/api'
import graphQLParams from '../utils/graphQLParams'
import DateLineChart from '../components/dateLineChart.vue'


const list = ref([])
const state = reactive({
  loading: false
})
const store = useInfoStore()
const startTime = ref(dayjs().subtract(7, 'd').format('YYYY-MM-DD'))

const getRange = (scrollId = '') => {
  state.loading = true
  api.getProducts(graphQLParams.getRangeQuery(dayjs(startTime.value).unix(), scrollId), store.token)
  .then(res => {
      list.value = [...list.value, ...res.data.conversionReport.nodes]
      if (res.data.conversionReport.pageInfo.hasNextPage) {
        getRange(res.data.conversionReport.pageInfo.scrollId)
      } else {
        state.loading = false
      }
  })
  .catch(() => {

  })
}

const lineView = computed(() => {
  return list.value.reduce((sum, checkout) => {
    const ymd = dayjs.unix(checkout.purchaseTime).format('YYYY-MM-DD')
    if (!sum[ymd]) {
      sum[ymd] = 0
    }
    sum[ymd]++
    return sum
  }, {})
})


// getRange()
</script>