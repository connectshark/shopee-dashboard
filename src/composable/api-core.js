import { onMounted, ref } from 'vue'
import { useUserStore } from '../stores/user'
import { useTimeout } from '@vueuse/core'
import useGraphql from './useGraphql'

const BASE_URL = import.meta.env.VITE_API_URL

const useFetch = () => {
  const store = useUserStore()
  const {
    queryReport
  } = useGraphql()
  
  const loading = ref(false)
  const result = ref([])
  const scrollId = ref('')
  const error = ref(false)
  const hasNextPage = ref(false)

  const { ready, start, stop } = useTimeout(30000, { controls: true })
  const doFetch = async (graphQLParams) => {
    stop()
    loading.value = true
    error.value = false
    hasNextPage.value = false
    const fetch_response = await fetch(BASE_URL + '/shopee', {
      method: 'POST',
      body: JSON.stringify({
        payload: graphQLParams
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${store.token}`
      }
    })
    if (fetch_response.status === 403) {
      loading.value = false
      error.value = 'token 過期,請重新登入'
      return
    }
    const res = await fetch_response.json()
    loading.value = false
    if (res.errors) {
      error.value = res.errors[0].message
    }
    if (res.data) {
      result.value = [...result.value, ...res.data.conversionReport.nodes]
      scrollId.value = res.data.conversionReport.pageInfo.scrollId
      hasNextPage.value = res.data.conversionReport.pageInfo.hasNextPage
    }
    start()
  }

  /**
   * 錯誤時重新讀取內容
   */
  const reload = () => {
    result.value = []
    scrollId.value = ''
    const graphQLParams = useGraphql()
    doFetch(graphQLParams)
  }

  /**
   * 讀取更多內容
   */
  const loadMore = () => {
    let purchaseTimeEnd = null
    if (ready.value) {
      scrollId.value = ''
      purchaseTimeEnd = result.value[result.value.length - 1].purchaseTime
    }
    const graphQLParams = queryReport({
      scrollId: `"${scrollId.value}"`,
      purchaseTimeEnd
    })
    doFetch(graphQLParams)
  }

  const init = () => {
    const graphQLParams = queryReport()
    doFetch(graphQLParams)
  }

  onMounted(init)
  return {
    loading,
    result,
    hasNextPage,
    scrollId,
    error,
    reload,
    loadMore
  }
}
export {
  useFetch
}