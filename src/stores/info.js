import { defineStore } from 'pinia'

export const useInfoStore = defineStore('info', {
  state: () => ({
    token: '',
    monthList: []
  }),
  getters: {
    totalCommission: (state) => {
      return state.monthList.reduce((sum, item) => {
        sum += parseInt(item.estimatedTotalCommission)
        return sum
      }, 0)
    },

    totalOrderAmount: state => {
      return state.monthList.reduce((sum, listItem) => {
        listItem.orders.forEach(order => {
          order.items.forEach(item => {
            sum += parseInt(item.actualAmount)
          })
        })
        return sum
      }, 0)
    },

    totalShopType: state => {
      return state.monthList.reduce((sum, listItem) => {
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
    },

    filterOrderShopName: state => {
      let sumArray = []
      const sum = state.monthList.reduce((sum, listItem) => {
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
    }
  },
  actions: {
  }
})
