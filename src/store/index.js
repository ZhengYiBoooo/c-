import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    access_token:localStorage.getItem('access_token')||'',
    avatar:localStorage.getItem('avatar')||'',
    shopcar:localStorage.getItem('shopcar')||[],
    addresslist:localStorage.getItem('addresslist')||[],
    ressid:localStorage.getItem('ressid')||'',
    oderinfoid:localStorage.getItem('oderinfoid')||'',
    serverid:localStorage.getItem('serverid')||'',
    usrseid:localStorage.getItem('usrseid')||'',
    addressId:localStorage.getItem('addressId')||'',
  },
  mutations: {
    show(state,data){
      state.access_token=data
      localStorage.setItem('access_token',data)
    },
    changeshop(state,data){
      state.shopcar=data
      localStorage.setItem('shopcar',data)
    },
    
    changeaddress(state,data){
      state.addresslist=data
      localStorage.setItem('addresslist',data)
    },

    ressidclick(state,data){
      state.ressid=data
      localStorage.setItem('ressid',data)
    },
    oderclick(state,data){
      state.oderinfoid=data
      localStorage.setItem('oderinfoid',data)
    },
    
    // 登录时服务商id
    updataserveId(state,data){
      state.serverid=data
      localStorage.setItem('serverid',data)
    },

    // 指定下标
    addId(state,data){
      state.addressId=data
      localStorage.setItem('addressId',data)
    },
    

    // 登录时用户id
    usersa(state,data){
      state.usrseid=data
      localStorage.setItem('usrseid',data)
    },
  },
  actions: {
  },
  modules: {
  }
})
