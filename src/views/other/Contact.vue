<template>
  <div class="contact">
    <!-- 导航栏 -->
    <van-nav-bar
      left-arrow
      @click-left="onClickLeft"
      id="addTop"
      title="联系客服"
    >
      <template #left>
        <van-icon name="arrow-left" size="18" />
      </template>
    </van-nav-bar>

    <div class="contact-wrap">
      <div class="contact-wrap-title">
        <p>平台客服服务时间为：<span>早9:00—晚5.30</span></p>
        <p>客服电话：<span>235321236</span></p>
        <p>客服 QQ：<span>15784232140</span></p>
        <p>客服微信：<span>12584624512</span></p>
      </div>
      <div class="contact-wrap-body">
        <div class="contact-wrap-body-tit">
          <p>或者您可以选择在线留言：</p>
          <p>
            <span>手机号码：</span>
            <input type="text" placeholder="请输入您的手机号" v-model="phones" maxlength="11"/>
          </p>
        </div>
        <div class="contact-wrap-body-text">
          <p>请输入您想咨询的问题：</p>
          <textarea class="contact-wrap-body-ipt" v-model="message"></textarea>
          <p class="contact-wrap-bo">我们将于24小时内与您致电,请保持手机畅通。</p>
          <van-button type="primary" size="large" round @click="contactbtn">提交</van-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Dialog } from "vant";
import { Toast } from "vant";
import {zixuninfo} from "../https/api"
export default {
  data() {
    return {
      message: "",
      phones:''
    };
  },
  created(){
    console.log(this.$store.state)
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
          let obj={
            phone:this.phones,
            userId:this.$store.state.usrseid,
            content:this.message
          }
          this.zixuninfo(obj);
          this.$router.push({
            name:'Mystyle'
          })
          Toast.success("提交成功");
          
        })
        .catch(() => {
          Toast.fail("提交失败");
        });
    },
    async zixuninfo(e){
      const res=await zixuninfo(e);
      console.log(res);
    }
  },
};
</script>
<style lang="scss" scoped>
.contact {
  width: 100%;
  overflow: hidden;
  padding-top: 46px;
  box-sizing: border-box;
  background: #f6f6f6;

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
    background: #f6f6f6;
    .contact-wrap-title {
      width: 100%;
      overflow: hidden;
      padding: 20px;
      box-sizing: border-box;
      background: #fff;
      margin-top: 20px;
      p {
        font-size: 16px;
        margin-bottom: 10px;
        color: #5D5D5D;
        span {
          color: #232323;
        }
      }
    }
    .contact-wrap-body {
      width: 100%;
      overflow: hidden;
      padding: 20px;
      box-sizing: border-box;
      background: #fff;
      margin-top: 20px;
      .contact-wrap-body-tit {
        width: 100%;
        overflow: hidden;
        p {
          &:nth-of-type(1) {
            font-size: 18px;
            color: #999;
            margin-bottom: 15px;
          }
          &:nth-of-type(2) {
            font-size: 16px;
            margin-bottom: 15px;
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
          font-size: 16px;
          color: #333333;
        }
        .contact-wrap-bo{
          color: #7F7F7F;
          font-size: 15px;
          margin-bottom: 20px;
          letter-spacing: 1px;
        }
        .contact-wrap-body-ipt {
          width: 99%;
          height: 150px;
          margin-top: 15px;
          font-size: 13px;
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