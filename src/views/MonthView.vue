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
    <p class=" rounded-xl p-2 bg-slate-200">預估佣金: <i class='bx bx-dollar-circle' ></i>{{ totalCommission.toLocaleString() }}</p>
    <p class=" rounded-xl p-2 bg-slate-200">訂單數量: {{ monthList.length.toLocaleString() }}筆</p>
    <p class=" rounded-xl p-2 bg-slate-200">訂單金額: <i class='bx bx-dollar-circle' ></i>{{ totalOrderAmount.toLocaleString() }}</p>
    <p class=" rounded-xl p-2 bg-slate-200" v-if="filterOrderShopName.length > 0">消費次數最多店家: {{ filterOrderShopName[0].name }}</p>
    <p class=" rounded-xl p-2 bg-slate-200" v-else>消費次數最多店家: 無店家</p>
    <ShopTypeChart v-if="!state.loading" :totalShopType="totalShopType"/>
    <ShopNameChart v-if="!state.loading" :filterOrderShopName="filterOrderShopName"/>
  </div>
</section>

<Teleport to="#modal">
  <Loading  v-if="state.loading"/>
</Teleport>
</template>

<script>
import { computed, reactive, ref } from 'vue'
import Loading from '../components/loading.vue'
import ShopTypeChart from '../components/shopTypeChart.vue'
import api from '../utils/api'
import graphQLParams from '../utils/graphQLParams'
import ShopNameChart from '../components/shopNameChart.vue'
import { useInfoStore } from '../stores/info'

export default {
  components: {
    Loading,
    ShopTypeChart,
    ShopNameChart
  },
  setup () {
    const store = useInfoStore()
    const monthList = ref([])
    const state = reactive({
      loading: false,
      errMsg: false
    })
    const reload = () => {
      state.errMsg = false
      monthList.value = []
      getList()
    }


    const getList = (scrollId = '') => {
      state.loading = true
      api.getProducts(graphQLParams.lastMonthQuery(scrollId), store.token)
        .then(res => {
          monthList.value = [...monthList.value, ...res.data.conversionReport.nodes]
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

    const totalCommission = computed(() => {
      return monthList.value.reduce((sum, item) => {
        sum += parseInt(item.estimatedTotalCommission)
        return sum
      }, 0)
    })

    const totalOrderAmount = computed(() => {
      return monthList.value.reduce((sum, listItem) => {
        listItem.orders.forEach(order => {
          order.items.forEach(item => {
            sum += parseInt(item.actualAmount)
          })
        })
        return sum
      }, 0)
    })

    const totalShopType = computed(() => {
      return monthList.value.reduce((sum, listItem) => {
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

    const filterOrderShopName = computed(() => {
      let sumArray = []
      const sum = monthList.value.reduce((sum, listItem) => {
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
      state,
      monthList,
      reload,
      totalCommission,
      totalOrderAmount,
      totalShopType,
      filterOrderShopName
    }
  }
}
</script>