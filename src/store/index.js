import { createStore } from 'vuex'

const store = createStore({
  state: {
    list: [],
    email: '',
    user: '',
    avatar: '',
    orderBy: true
  },
  mutations: {
    prodList: (state, list) => state.list = list,
    user: (state, data) => {
      state.email = data.email,
      state.user = data.name,
      state.avatar = data.avatar
    },
    changeOrderSortBy: (state, change) => state.orderBy = change
  },
  actions: {
    setUser ({ commit }, data) {
      commit('user', data.data)
    }
  },
  getters: {
    listFilter (state) {
      return state.list.map(order => {
        const list = order.orders[0].items.map(item => {
          return {
            name: item.itemName,
            id: item.itemId,
            modelId: item.modelId,
            qty: item.qty,
            img: item.imageUrl,
            status: item.fraudStatus,
            amount: item.actualAmount,
            price: item.itemPrice
          }
        })
        const totalAmount = order.orders[0].items.reduce((sum, item) => {
          return sum + parseInt(item.actualAmount)
        }, 0)
        return {
          purchaseTime: order.purchaseTime,
          orderId: order.checkoutId,
          estimatedTotalCommission: order.estimatedTotalCommission,
          list: list,
          orderCount: order.orders[0].items.length,
          device: order.device,
          utm: order.utmContent,
          totalAmount: totalAmount
        }
      }).sort((a, b) => {
        if (state.orderBy) {
          return a.purchaseTime < b.purchaseTime ? 1 : -1
        } else {
          return a.purchaseTime > b.purchaseTime ? 1 : -1
        }
      })
    }
  }
})

export default store