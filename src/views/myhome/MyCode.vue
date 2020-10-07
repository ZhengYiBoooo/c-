<template>
  <div class="myphone">
    <!-- 导航栏 -->
    <van-nav-bar left-arrow @click-left="onClickLeft" id="addTop">
      <template #left> <van-icon name="arrow-left" size="18" /> </template>
    </van-nav-bar>

    <!-- 手机验证码 -->
    <div class="my-phone-wrap">
      <p>请输入验证码</p>
      <p>验证码已通过短信发送至+86 17733933505</p>
      <div class="verification-wrap">
        <input
          type="text"
          v-model="phoneValue"
          class="verification-phone"
          @blur="animate"
          maxlength="4"
          placeholder="请输入验证码"
        />
        <van-count-down :time="time" format="ss" class="verification-phones" />
      </div>
      <van-button
        type="primary"
        size="large"
        class="btn-phone"
        :disabled="!boo"
        :class="boo ? phonetrue : phonefalse"
        @click="yanzheng"
        >下一步</van-button
      >
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import { Notify } from "vant";
export default {
  data() {
    return {
      phone: "",
      value1: 0,
      phoneValue: "",
      value2: "a",
      boo: false,
      time:  60 * 1000,
      phonetrue: "phonetrue",
      phonefalse: "phonefalse",
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: "Myphone",
      });
    },
    animate() {
      var re = /^3456$/;
      let str = this.phoneValue;
      if (re.test(str)) {
        this.boo = true;
      } else {
        this.boo = false;
        Notify({ type: "danger", message: "请输入正确验证码" });
      }
    },
    mycode(){
        this.$router.push({
            name:'MyCode'
        })
    }
  },
};
</script>
<style lang="scss" scoped>
.myphone {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #fff;
  box-sizing: border-box;
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
  .my-phone-wrap {
    width: 100%;
    padding: 30px;
    overflow: hidden;
    box-sizing: border-box;
    p {
      &:nth-of-type(1) {
        font-weight: bold;
        font-size: 20px;
        margin-bottom: 15px;
      }
      &:nth-of-type(2) {
        font-weight: normal;
        font-size: 15px;
        color: #3333;
        margin-bottom: 20px;
      }
    }
    .verification-wrap {
      width: 100%;
      overflow: hidden;
      display: flex;
      justify-content: space-between;
      background: #eee;
      overflow: hidden;
      border: 1px solid #eee;
      .verification-num {
        background: #eee;
        width: 65px;
      }
      .verification-phone {
        width: 100%;
        border: none;
        height: 48px;
        background: #eee;
        color: #333;
        font-size: 16px;
        padding-left: 10px;
        box-sizing: border-box;
      }
      .verification-phones{
          width: 48px;
          height: 48px;
          line-height: 48px;
          text-align: center;
      }
    }
    .btn-phone {
      margin-top: 15px;
      background: #666;
      border: 0;
    }

    .phonetrue {
      background: #1989fa;
    }
    .phonefalse {
      background: #666;
    }
  }
}
</style>