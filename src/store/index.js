import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    access_token:localStorage.getItem('access_token')||'',
    avatar:localStorage.getItem('avatar')||'',
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
