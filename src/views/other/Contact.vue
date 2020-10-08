<template>
  <div class="contact">
    <!-- 导航栏 -->
    <van-nav-bar left-arrow @click-left="onClickLeft" id="addTop">
      <template #left>
        <van-icon name="arrow-left" size="18" />
        <span>联系客服</span>
      </template>
    </van-nav-bar>

    <div class="contact-wrap">
      <div class="contact-wrap-title">
        <p>平台客服服务时间为：<span>早9:00—晚5.30</span></p>
        <p>客服电话：<span>电话电话电话电话</span></p>
        <p>客服 Q Q：<span>号码号码号码</span></p>
        <p>客服微信：<span>号码号码号码</span></p>
      </div>
      <div class="contact-wrap-body">
        <div class="contact-wrap-body-tit">
          <p>或者您可以选择在线留言：</p>
          <p>
            <span>手机号码：</span>
            <input type="text" placeholder="请输入您的手机号" />
          </p>
        </div>
        <div class="contact-wrap-body-text">
          <p>请输入您想咨询的问题：</p>
          <textarea class="contact-wrap-body-ipt" v-model="message"></textarea>
          <p>我们将于24小时类与您致电,请保持手机畅通。</p>
          <button class="contact-btn" @click="contactbtn">确定提交</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Dialog } from "vant";
import { Toast } from "vant";
export default {
  data() {
    return {
      message: "",
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: "Mystyle",
      });
    },
    contactbtn() {
      Dialog.confirm({
        message: "您确定要提交该咨询的问题吗",
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
.contact {
  width: 100%;
  overflow: hidden;
  padding-top: 46px;
  box-sizing: border-box;
  background: #fff;

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
      &:nth-of-type(1) {
        margin-left: 20px;
      }
    }
    .sp-right {
      color: #999;
    }
  }
  .contact-wrap {
    width: 100%;
    background: #fff;
    padding: 20px;
    box-sizing: border-box;
    .contact-wrap-title {
      width: 100%;
      overflow: hidden;
      margin-bottom: 45px;
      p {
        font-size: 16px;
        margin-bottom: 10px;
        span {
          color: skyblue;
        }
      }
    }
    .contact-wrap-body {
      width: 100%;
      overflow: hidden;
      .contact-wrap-body-tit {
        width: 100%;
        overflow: hidden;
        p {
          &:nth-of-type(1) {
            font-size: 18px;
            color: #999;
            margin-bottom: 10px;
          }
          &:nth-of-type(2) {
            font-size: 16px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            input {
              width: 200px;
              font-size: 12px;
              padding: 5px 0 5px 5px;
              box-sizing: border-box;
            }
          }
        }
      }
      .contact-wrap-body-text {
        width: 100%;
        overflow: hidden;
        p {
          font-size: 14px;
        }
        .contact-wrap-body-ipt {
          width: 99%;
          height: 200px;
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
}
</style>