<template>
  <div class="receive">
    <!-- 导航栏 -->
    <van-nav-bar left-arrow @click-left="onClickLeft" id="addTop">
      <template #left>
        <van-icon name="arrow-left" size="18" /><span>我的收货地址</span>
      </template>
      <template #right> <span class="sp-right">添加新地址</span> </template>
    </van-nav-bar>

    <div class="receive-wrap">
      <div class="receive-items">
        <div class="receive-items-left">
          <div class="receive-items-left-title">
            <span>王小明</span>
            <span>136 3714 0505</span>
            <span>家 默认</span>
          </div>
        </div>
        <div class="receive-items-right">
          <van-icon name="newspaper-o" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    onClickLeft() {
      this.$router.push({
        name: "Mystyle",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.receive {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  padding-top: 46px;
  box-sizing: border-box;
  background: #fcfcfc;
  #addTop {
    background: #fcfcfc;
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
      font-size: 16px;
      &:nth-of-type(1) {
        margin-left: 20px;
      }
    }
    .sp-right {
      color: #999;
    }
  }
  .receive-wrap {
    width: 100%;
    overflow: hidden;
    background: #fcfcfc;
    padding: 20px;
    box-sizing: border-box;
    .receive-items {
      width: 100%;
      background: #fff;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .receive-items-left {
        .receive-items-left-title {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          span {
            font-size: 13px;
          }
        }
      }
    }
  }
}
</style>