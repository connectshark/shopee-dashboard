import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    token: '',
    username: '',
    avatar: ''
  }),
  getters: {
    isLogin () {
      return this.token !== ''
    }
  },
  actions: {
  }
})
