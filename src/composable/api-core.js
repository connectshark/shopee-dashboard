import { onMounted, ref } from 'vue'
import { useUserStore } from '../stores/user'
import resentQuery from '../graphql/resent'
import { useTimeout } from '@vueuse/core'

const BASE_URL = import.meta.env.VITE_API_URL

const useFetch = () => {
  const store = useUserStore()
  
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
    const res = await fetch_response.json()
    loading.value = false
    if (res.errors) {
      error.value = true
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
    const graphQLParams = resentQuery()
    doFetch(graphQLParams)
  }

  /**
   * 讀取更多內容
   */
  const loadMore = () => {
    let purchaseTime = null
    if (ready.value) {
      scrollId.value = ''
      purchaseTime = result.value[result.value.length - 1].purchaseTime
    }
    const graphQLParams = resentQuery(scrollId.value, purchaseTime)
    doFetch(graphQLParams)
  }

  const init = () => {
    const graphQLParams = resentQuery()
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