<template>
<section v-if="errMsg" class=" pt-10">
  <p>尚未登入或是登入過期</p>
  <p>可以點擊按鈕重新整理或是重新登入</p>
  <p class=" underline text-violet-300">
    <input type="button" value="重新整理一下" @click="reload">
    <router-link to="/login">前往登入 ></router-link>
  </p>
</section>
<section v-else class=" w-11/12 mx-auto">
  <h2 class=" font-bold text-2xl py-2 text-emerald-700">近7天總結</h2>
  <h2 class=" font-bold text-2xl py-2 text-emerald-700">{{ new Date().getMonth() }}月度總結</h2>
  <div class=" grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-4">
    <p class=" rounded-xl p-2 bg-slate-200">預估佣金: <i class='bx bx-dollar-circle' ></i>{{ store.totalCommission.toLocaleString() }}</p>
    <p class=" rounded-xl p-2 bg-slate-200">訂單數量: {{ store.monthList.length.toLocaleString() }}筆</p>
    <p class=" rounded-xl p-2 bg-slate-200">訂單金額: <i class='bx bx-dollar-circle' ></i>{{ store.totalOrderAmount.toLocaleString() }}</p>
    <p class=" rounded-xl p-2 bg-slate-200" v-if="store.filterOrderShopName.length > 0">消費次數最多店家: {{ store.filterOrderShopName[0].name }}</p>
    <ShopTypeChart v-if="!loading" :totalShopType="store.totalShopType"/>
    <ShopNameChart v-if="!loading" :filterOrderShopName="store.filterOrderShopName"/>
  </div>
</section>

<Teleport to="#modal">
  <Loading  v-if="loading"/>
</Teleport>
</template>

<script>
import { ref } from 'vue'
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
    const loading = ref(false)
    const store = useInfoStore()
    const errMsg = ref(false)
    const reload = () => {
      errMsg.value = false
      store.monthList = []
      getList()
    }

    const getList = (scrollId = '') => {
      loading.value = true
      api.getProducts(graphQLParams.lastMonthQuery(scrollId), store.token)
        .then(res => {
          store.monthList = [...store.monthList, ...res.data.conversionReport.nodes]
          if (res.data.conversionReport.pageInfo.hasNextPage) {
            getList(res.data.conversionReport.pageInfo.scrollId)
          } else {
            loading.value = false
          }
        })
        .catch(() => {
          errMsg.value = true
          loading.value = false
        })
    }

    getList()
    return {
      errMsg,
      loading,
      store,
      reload
    }
  }
}
</script>