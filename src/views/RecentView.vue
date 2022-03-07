<template>
<section v-if="state.errMsg" class=" pt-10">
  <p>尚未登入或是登入過期</p>
  <p>可以點擊按鈕重新整理或是重新登入</p>
  <p class=" underline">
    <input class=" bg-blue-200 mx-2 rounded p-2 cursor-pointer" type="button" value="重新整理一下" @click="reload">
    <router-link class=" bg-blue-200 mx-2 rounded p-2" to="/login">前往登入 ></router-link>
  </p>
</section>
<div v-else class=" w-11/12 mx-auto">
  <section class="pt-4">
    <h2 class=" font-bold text-2xl text-emerald-700">近日訂單</h2>
  </section>
  <div class=" top-0 left-0 sticky backdrop-blur-md bg-white/30 backdrop-saturate-150">
    <p class=" py-1">
      <span>{{rangeList.length}}筆  分潤合計: {{totalCommission}}元</span>
    </p>
  </div>
  <section class=" max-w-xl mx-auto">
    <div class=" py-4">
      <ul>
        <OrderItem v-for="order in rangeList" :key="order.checkoutId"
          :purchaseTime="order.purchaseTime"
          :estimatedTotalCommission="order.estimatedTotalCommission"
          :id="order.checkoutId"
          :orders="order.orders"
          :referrer="order.referrer"
          :utmContent="order.utmContent"
        />
      </ul>
      <p>
        <input type="button" @click="getMore" class=" bg-emerald-700 text-white rounded p-2 hover:opacity-80" value="讀取">
      </p>
    </div>
  </section>
  
</div>

<Teleport to="#modal">
  <Loading  v-if="state.loading"/>
</Teleport>
</template>

<script>
import dayjs from 'dayjs'
import { computed, reactive, ref } from 'vue'
import Loading from '../components/loading.vue'
import OrderItem from '../components/orderItem.vue'
import { useInfoStore } from '../stores/info'
import api from '../utils/api'
import graphQLParams from '../utils/graphQLParams'

export default {
  components: {
    Loading,
    OrderItem
  },
  setup () {
    const rangeList = ref([])
    const store = useInfoStore()
    const state = reactive({
      loading: false,
      errMsg: false
    })
    const reload = () => {
      state.errMsg = false
      rangeList.value = []
      getRange(graphQLParams.getRecentQuery(scrollId))
    }

    let scrollTime = ''
    let scrollId = ''
    const getRange = (query) => {
      state.loading = true
      api.getProducts(query, store.token)
        .then(res => {
          rangeList.value = [...rangeList.value, ...res.data.conversionReport.nodes]
          if (res.data.conversionReport.pageInfo.hasNextPage) {
            scrollId = res.data.conversionReport.pageInfo.scrollId
            scrollTime = dayjs().unix()
          }
          state.loading = false
        })
        .catch(() => {
          state.errMsg = true
          state.loading = false
        })
    }

    const totalCommission = computed(() => {
      return rangeList.value.reduce((sum, checkout) => {
        return sum + parseFloat(checkout.estimatedTotalCommission)
      }, 0)
    })

    const getMore = () => {
      if (dayjs().unix() - scrollTime > 30) {
        getRange(graphQLParams.getLastTimeQuery(rangeList.value[rangeList.value.length -1].purchaseTime - 1))
      } else {
        getRange(graphQLParams.getRecentQuery(scrollId))
      }
    }

    getRange(graphQLParams.getRecentQuery(scrollId))
    return {
      state,
      store,
      reload,
      rangeList,
      getMore,
      totalCommission
    }
  }
}
</script>