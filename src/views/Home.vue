<template>
  <div class="home">
    <van-tabbar
      v-model="active"
      active-color="#07c160"
      inactive-color="#000"
      @change="abcd"
      z-index="1000000"
    >
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
  created() {
    let router_path = this.$route.path;
    if (router_path == "/about") {
      this.active = 0;
    } else if (router_path == "/shopcar") {
      this.active = 1;
    } else  {
      this.active = 2;
    }
  },
  methods: {
    abcd(active) {
      if (active == 0) {
        this.$router.push({
          path: "about",
        });
      }
      if (active == 1) {
        this.$router.push({
          path: "shopcar",
        });
      }
      if (active == 2) {
        this.$router.push({
          path: "mystyle",
        });
      }
    },
  },
};
</script>