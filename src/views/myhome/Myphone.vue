<template>
  <div class="myphone">
    <!-- 导航栏 -->
    <van-nav-bar left-arrow @click-left="onClickLeft" id="addTop">
      <template #left> <van-icon name="arrow-left" size="18" /> </template>
    </van-nav-bar>

    <!-- 手机验证码 -->
    <div class="my-phone-wrap">
      <p>请输入原手机号</p>
      <p>通过安全环境检测可以换绑</p>
      <div class="verification-wrap">
        <van-dropdown-menu class="verification-num">
          <van-dropdown-item v-model="value1" :options="option1" />
        </van-dropdown-menu>
        <input
          type="text"
          v-model="phoneValue"
          class="verification-phone"
          @blur="animate"
          maxlength="11"
          placeholder="请输入手机号"
        />
      </div>
      <van-button
        type="primary"
        size="large"
        class="btn-phone"
        :disabled="!boo"
        :class="boo ? phonetrue : phonefalse"
        @click="mycode"
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
      phonetrue: "phonetrue",
      phonefalse: "phonefalse",
      option1: [
        { text: "+86", value: 0 },
        { text: "+852", value: 1 },
        { text: "+853", value: 2 },
        { text: "+82", value: 3 },
      ],
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: "Myhome",
      });
    },
    animate() {
      var re = /^1(3|4|5|6|7|8|9)\d{9}$/;
      let str = this.phoneValue;
      if (re.test(str)) {
        this.boo = true;
      } else {
        this.boo = false;
        Notify({ type: "danger", message: "请输入正确手机号码" });
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
        background: #eee;
        color: #333;
        font-size: 16px;
        padding-left: 10px;
        box-sizing: border-box;
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