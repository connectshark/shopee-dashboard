import { defineStore } from 'pinia'

export const useInfoStore = defineStore('info', {
  state: () => ({
    token: '',
    picture: '',
    name: ''
  }),
  getters: {
  },
  actions: {
  }
})
