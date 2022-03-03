<template>
<section v-if="errMsg" class=" pt-10">
  <p>尚未登入或是登入過期</p>
  <p class=" underline text-violet-300">
    <router-link to="/login">前往登入 ></router-link>
  </p>
</section>
<section v-else class=" w-11/12 mx-auto">
  <h2 class=" font-bold text-2xl py-2 text-emerald-700">{{ new Date().getMonth() }}月度總結</h2>
  <div class=" grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-4">
    <p class=" rounded-xl p-2 bg-slate-200">預估佣金: <i class='bx bx-dollar-circle' ></i>{{ totalCommission.toLocaleString() }}</p>
    <p class=" rounded-xl p-2 bg-slate-200">訂單數量: {{ list.length.toLocaleString() }}筆</p>
    <p class=" rounded-xl p-2 bg-slate-200">訂單金額: <i class='bx bx-dollar-circle' ></i>{{ totalOrderAmount.toLocaleString() }}</p>
    <p class=" rounded-xl p-2 bg-slate-200">消費第一名店家: {{ totalOrderShopName[0].name }}</p>
    <ShopTypeChart v-if="!loading" :totalShopType="totalShopType"/>
    <ShopNameChart v-if="!loading" :totalOrderShopName="totalOrderShopName"/>
  </div>
</section>

<Teleport to="#modal">
  <Loading  v-if="loading"/>
</Teleport>
</template>

<script>
import { computed, ref } from 'vue'
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
    const loading = ref(true)
    const store = useInfoStore()
    const list = ref([])
    const errMsg = ref(false)

    const getList = (scrollId = '') => {
      api.getProducts(graphQLParams.lastMonthQuery(scrollId), store.token)
        .then(res => {
          list.value = [...list.value, ...res.data.conversionReport.nodes]
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

    const totalCommission = computed(() => {
      return list.value.reduce((sum, item) => {
        sum += parseInt(item.estimatedTotalCommission)
        return sum
      }, 0)
    })

    const totalOrderAmount = computed(() => {
      return list.value.reduce((sum, listItem) => {
        listItem.orders.forEach(order => {
          order.items.forEach(item => {
            sum += parseInt(item.actualAmount)
          })
        })
        return sum
      }, 0)
    })
    const totalShopType = computed(() => {
      return list.value.reduce((sum, listItem) => {
        let name = {
          C2C_NON_CB: '一般境內',
          C2C_CB: '一般境外',
          SHOPEE_MALL_CB: '商城境外',
          SHOPEE_MALL_NON_CB: '商城境內',
          PREFERRED_NON_CB:'優選境內',
          PREFERRED_CB:'優選境外',
        }
        listItem.orders.forEach(order => {
          sum[name[order.shopType]]++
        })
        return sum
      }, {
        一般境內: 0,
        一般境外: 0,
        優選境內: 0,
        優選境外: 0,
        商城境內: 0,
        商城境外: 0
      })
    })
    const totalOrderShopName = computed(() => {
      let sumArray = []
      const sum = list.value.reduce((sum, listItem) => {
        listItem.orders.forEach(order => {
          order.items.forEach(item => {
            if (!sum[item.shopName]) {
              sum[item.shopName] = 0
            }
            sum[item.shopName]++
          })
        })
        return sum
      }, {})
      for ( const [key, value] of Object.entries(sum)) {
        sumArray.push({
          name: key,
          value: value
        })
      }
      return sumArray.sort((a, b) => a.value < b.value ? 1 : -1).filter((shop, index) => index < 5)
    })
    getList()
    return {
      errMsg,
      list,
      loading,
      totalCommission,
      totalOrderAmount,
      totalOrderShopName,
      totalShopType
    }
  }
}
</script>