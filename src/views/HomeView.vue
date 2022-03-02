<template>
<section v-if="errMsg" class=" pt-10">
  <p>尚未登入或是登入過期</p>
  <p class=" underline text-violet-300">
    <router-link to="/login">前往登入 ></router-link>
  </p>
</section>
<section v-else class=" w-11/12 mx-auto">
  <h2 class=" font-bold text-2xl py-2 text-emerald-700">{{ new Date().getMonth() }}月度總結</h2>
  <div class=" grid grid-cols-1 md:grid-cols-2 gap-1">
    <p class=" rounded-xl p-2 bg-slate-200">預估佣金: {{ totalCommission.toLocaleString() }}</p>
    <p class=" rounded-xl p-2 bg-slate-200">訂單數量: {{ list.length.toLocaleString() }}</p>
    <p class=" rounded-xl p-2 bg-slate-200">訂單金額: {{ totalOrderAmount.toLocaleString() }}</p>
  </div>
</section>
<Teleport to="#modal">
  <Loading  v-if="loading"/>
</Teleport>
</template>

<script>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import Loading from '../components/loading.vue'
import { useInfoStore } from '../stores/info'
import api from '../utils/api'
import graphQLParams from '../utils/graphQLParams'

export default {
  components: {
    Loading
  },
  setup () {
    const loading = ref(true)
    const store = useInfoStore()
    const router = useRouter()
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
          loading.value = false
          errMsg.value = true
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
    getList()
    return {
      errMsg,
      list,
      loading,
      totalCommission,
      totalOrderAmount
    }
  }
}
</script>