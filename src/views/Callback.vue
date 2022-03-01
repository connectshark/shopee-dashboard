<template>
  <div>
    <p v-if="detail">{{ detail }}</p>
    <p v-else><i class='bx bx-loader-alt bx-spin' ></i></p>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useInfoStore } from '../stores/info'
import api from '../utils/api'
export default {
  setup () {
    const detail = ref('')
    const store = useInfoStore()
    const route = useRoute()
    const router = useRouter()
    api.oauthLogin(route.query.code)
      .then(res => {
        if (res.err) {
          detail.value = res.err.detail
        } else {
          store.token = res
          router.push('/')
        }
      })
    

    return {
      detail
    }
  }
}
</script>