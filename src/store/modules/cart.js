import axios from 'axios'
export default {
  namespaced: true,
  state () {
    return {
      list: []
    }
  },
  mutations: {
    updataList (stats, newList) {
      stats.list = newList
    },
    updataCount (state, obj) {
      console.log(obj)
      const re = state.list.find(item => item.id === obj.id)
      console.log('這' + obj.newCount)
      re.count = obj.newCount
    }
  },
  actions: {
    async getList (context) {
      const re = await axios.get(' http://localhost:3000/cart')
      context.commit('updataList', re.data)
    },
    async updataList (context, obj) {
      console.log(obj)
      const re = await axios.patch(`http://localhost:3000/cart/${obj.id}`, { count: obj.newCount })
      console.log(re)
      context.commit('updataCount', { id: obj.id, newCount: obj.newCount })
    }
  },
  getters: {
    total (state) {
      return state.list.reduce((sum, item) => sum + item.count, 0)
    },
    totalPrice (state) {
      return state.list.reduce((sum, item) => sum + item.count * item.price, 0)
    }
  }

}
