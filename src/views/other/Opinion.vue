<template>
  <div class="opinion">
    <!-- 导航栏 -->
    <van-nav-bar left-arrow @click-left="onClickLeft" id="addTop">
      <template #left>
        <van-icon name="arrow-left" size="18" />
        <span>意见反馈</span>
      </template>
    </van-nav-bar>
    <div class="opinion-wrap">
      <div class="contact-wrap-body-text">
        <p>请输入您要反馈的内容</p>
        <textarea class="contact-wrap-body-ipt" v-model="message"></textarea>
        <button class="contact-btn" @click="contactbtn">确定提交</button>
      </div>
    </div>
  </div>
</template>
<script>
import { Dialog } from "vant";
import { Toast } from "vant";
export default {
  data(){
    return {
      message:''
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: "Mystyle",
      });
    },
    contactbtn() {
      Dialog.confirm({
        message: "您确定要提交该反馈的问题吗",
      })
        .then(() => {
          Toast.success("提交成功");
        })
        .catch(() => {
          Toast.fail("提交失败");
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.opinion {
  width: 100%;
  background: #fff;
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
      font-size: 16px;
      letter-spacing: 2px;
      &:nth-of-type(1) {
        margin-left: 20px;
      }
    }
    .sp-right {
      color: #999;
    }
  }
  .opinion-wrap {
    width: 100%;
    overflow: hidden;
    background: #fff;
    padding: 20px;
    box-sizing: border-box;

    .contact-wrap-body-text {
      width: 100%;
      overflow: hidden;
      p {
        font-size: 15px;
      }
      .contact-wrap-body-ipt {
        width: 99%;
        height: 230px;
        margin-top: 10px;
      }
      .contact-btn {
        color: #fff;
        border: none;
        font-size: 14px;
        background: #0099ff;
        border-radius: 5px;
        padding: 10px 40px 10px 40px;
        margin-top: 10px;
      }
    }
  }
}
</style>