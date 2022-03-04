<template>
<section v-if="state.errMsg" class=" pt-10">
  <p>尚未登入或是登入過期</p>
  <p>可以點擊按鈕重新整理或是重新登入</p>
  <p class=" underline">
    <input class=" bg-blue-200 mx-2 rounded p-2 cursor-pointer" type="button" value="重新整理一下" @click="reload">
    <router-link class=" bg-blue-200 mx-2 rounded p-2" to="/login">前往登入 ></router-link>
  </p>
</section>
<section v-else class=" w-11/12 mx-auto">
  <h2 class=" font-bold text-2xl py-2 text-emerald-700">{{ new Date().getMonth() }}月度總結</h2>
  <div class=" grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-4">
    <p class=" rounded-xl p-2 bg-slate-200">預估佣金: <i class='bx bx-dollar-circle' ></i>{{ store.totalCommission.toLocaleString() }}</p>
    <p class=" rounded-xl p-2 bg-slate-200">訂單數量: {{ store.monthList.length.toLocaleString() }}筆</p>
    <p class=" rounded-xl p-2 bg-slate-200">訂單金額: <i class='bx bx-dollar-circle' ></i>{{ store.totalOrderAmount.toLocaleString() }}</p>
    <p class=" rounded-xl p-2 bg-slate-200" v-if="store.filterOrderShopName.length > 0">消費次數最多店家: {{ store.filterOrderShopName[0].name }}</p>
    <p class=" rounded-xl p-2 bg-slate-200" v-else>消費次數最多店家: 無店家</p>
    <ShopTypeChart v-if="!state.loading" :totalShopType="store.totalShopType"/>
    <ShopNameChart v-if="!state.loading" :filterOrderShopName="store.filterOrderShopName"/>
  </div>
</section>

<Teleport to="#modal">
  <Loading  v-if="state.loading"/>
</Teleport>
</template>

<script>
import { reactive, ref } from 'vue'
import Loading from '../components/loading.vue'
import ShopTypeChart from '../components/shopTypeChart.vue'
import { useInfoStore } from '../stores/info'
import api from '../utils/api'
import graphQLParams from '../utils/graphQLParams'
import ShopNameChart from '../components/shopNameChart.vue'

export default {
  components: {
    Loading,
    ShopTypeChart,
    ShopNameChart
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
      store.monthList = []
      getList()
    }


    const getList = (scrollId = '') => {
      state.loading = true
      api.getProducts(graphQLParams.lastMonthQuery(scrollId), store.token)
        .then(res => {
          store.monthList = [...store.monthList, ...res.data.conversionReport.nodes]
          if (res.data.conversionReport.pageInfo.hasNextPage) {
            getList(res.data.conversionReport.pageInfo.scrollId)
          } else {
            state.loading = false
          }
        })
        .catch(() => {
          state.errMsg = true
          state.loading = false
        })
    }

    getList()
    return {
      state,
      store,
      reload,
      rangeList
    }
  }
}
</script>