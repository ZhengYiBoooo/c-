<template>
  <div class="mygender">
    <!-- 导航栏 -->
    <van-nav-bar left-arrow @click-left="onClickLeft" id="addTop"
      ><template #left>
        <van-icon name="arrow-left" size="18" />
        <span>性别</span>
      </template>
    </van-nav-bar>
    <!-- 男女 -->
    <div class="gender-wrap">
      <div class="gender-man" @click="gender('男')">男</div>
      <div class="gender-man" @click="gender('女')">女</div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    onClickLeft() {
      this.$router.push({
        name: "Myhome",
      });
    },
    gender(e) {
      //传递一个map，addressInfo是key，info是value
      //调用router回退页面
      this.$router.push({
          name:"Myhome",
          query:{
              ctr:e
          }
      })
    },
  },
};
</script>
<style lang="scss" scoped>
.mygender {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #eee;
  padding-top: 46px;
  box-sizing: border-box;
  #addTop {
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 19;
    width: 100%;
    &::after {
      position: absolute;
      box-sizing: border-box;
      content: " ";
      pointer-events: none;
      top: -50%;
      right: -50%;
      bottom: -50%;
      left: -50%;
      border: none;
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
    }
    i {
      color: #333;
    }
    span {
      font-size: 18px;
      margin-left: 20px;
    }
  }
  .gender-wrap {
    width: 100%;
    overflow: hidden;
    background: #fff;
    padding: 15px;
    box-sizing: border-box;
    margin-top: 10px;
    .gender-man {
      width: 100%;
      display: flex;
      align-items: center;
      font-size: 16px;
      padding-top: 10px;
      padding-bottom: 10px;
      &:nth-of-type(1) {
        border-bottom: 1px solid #eee;
      }
    }
  }
}
</style>