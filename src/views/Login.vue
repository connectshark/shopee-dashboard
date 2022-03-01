<template>
  <div class="py-4">
    <a :href="url" class=" p-4 inline-block rounded-xl text-white bg-blue-600"><i class='bx bxl-google'></i>登入</a>
  </div>
</template>


<script>
export default {
  setup () {
    const REDIRECT_RUL = import.meta.env.VITE_REDIRECT_RUL
    const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
    const url = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${REDIRECT_RUL}/callback&scope=openid email profile https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&response_type=code&client_id=${CLIENT_ID}`
    
    return {
      url
    }
  }
}
</script>