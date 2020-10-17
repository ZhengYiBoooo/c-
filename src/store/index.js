import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    access_token:localStorage.getItem('access_token')||'',
    avatar:localStorage.getItem('avatar')||'',
    shopcar:localStorage.getItem('shopcar')||[],
  },
  mutations: {
    show(state,data){
      state.access_token=data
      localStorage.setItem('access_token',data)
    },
    changeshop(state,data){
      state.shopcar=data
      localStorage.setItem('shopcar',data)
    }
  },
  actions: {
  },
  modules: {
  }
})
