<template>
  <div class="home">
    
    <van-tabbar v-model="active" active-color="#07c160" inactive-color="#000">
      <van-tabbar-item icon="home-o" @click="home">首页</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data(){
    return {
      active: 0,
    }
  },
  methods:{
    home(e){
      if(!this.$route.name=='About'){
        this.$router.push({
          name:'About'
        })
      }
    }
  }
}
</script>