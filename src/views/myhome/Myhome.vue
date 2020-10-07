<template>
  <div class="myhome">
    <!-- 导航栏 -->
    <van-nav-bar left-arrow @click-left="onClickLeft" id="addTop"
      ><template #left> <van-icon name="arrow-left" size="18" /> </template
      ><template #right>
        <span>个人资料</span>
      </template>
    </van-nav-bar>
    <!-- 用户信息 -->
    <div class="my-home-wrap">
      <div class="my-home-items">
        <span>头像</span>
        <div class="my-home-img">
          <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="" class="logo" />
        </div>
      </div>
      <div
        class="my-home-children"
        style="padding-right: 12px; box-sizing: border-box"
      >
        <span>昵称</span>
        <span>优小果</span>
      </div>
      <div class="my-home-children">
        <span>性别</span>
        <span @click="mygender"
          >{{ gener }}
          <van-icon name="arrow" />
        </span>
      </div>
      <div class="my-home-children">
        <span>手机</span>
        <span @click="myphone"
          >17733933505
          <van-icon name="arrow" />
        </span>
      </div>
      <!-- 退出登陆 -->
      <van-button type="primary" size="large" round class="btn"
        >退出登陆</van-button
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      gener: "请选择",
    };
  },
  created() {
    this.gener = this.$route.query.ctr;
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: "Mystyle",
      });
    },
    mygender() {
      this.$router.push({
        name: "MyGender",
      });
    },
    myphone() {
      this.$router.push({
        name: "Myphone",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.myhome {
  width: 100%;
  background: #fff;
  padding-top: 46px;
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
      font-size: 16px;
    }
  }
  .my-home-wrap {
    width: 100%;
    background: #fff;
    overflow: hidden;
    padding: 15px;
    box-sizing: border-box;
    .my-home-items {
      width: 100%;
      overflow: hidden;
      border-bottom: 1px solid #eee;
      padding: 10px 0 20px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        font-size: 15px;
        font-weight: bold;
      }
      .my-home-img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .my-home-children {
      width: 100%;
      overflow: hidden;
      padding: 20px 0 20px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &:nth-of-type(1) {
      }
      span {
        font-size: 15px;
        font-weight: bold;
        &:nth-of-type(2) {
          font-size: 15px;
          font-weight: normal;
          display: flex;
          align-items: center;
        }
      }
    }
    .btn {
      margin-top: 50px;
    }
  }
}
</style>