<template>
  <div class="wrap">
    <div class="top-title" style="display: none">
      <img :src="userimg" alt="" class="logo" @click="myhome" />
      <div class="top-title-con">
        <p>优小果</p>
        <p>手机：17733933505</p>
      </div>
    </div>
    <div class="mysty">
      <!-- 商家信息 -->
      <!-- <div class="mynews">
        <van-icon name="chat-o" color="#fff" @click="mynews" />
      </div> -->
      <!-- 四宫格 -->
      <div class="y-grid">
        <div class="my-grid-tit">
          <span>我的订单</span>
          <span @click="myoder">全部订单 <van-icon name="arrow" /></span>
        </div>
        <div class="my-grid-box">
          <div class="my-grid-box-items" @click="waitpay(1)">
            <div class="my-grid-box-icon">
              <img src="../assets/waitpay.png" alt="" />
              <!-- <van-icon name="qr" /> -->
            </div>
            <p>待支付</p>
          </div>
          <div class="my-grid-box-items" @click="waitpay(2)">
            <div class="my-grid-box-icon">
              <img src="../assets/waitdeliver.png" alt="" />
              <!-- <van-icon name="qr" /> -->
            </div>
            <p>待发货</p>
          </div>
          <div class="my-grid-box-items" @click="waitpay(3)">
            <div class="my-grid-box-icon">
              <img src="../assets/waitReceiving.png" alt="" />
              <!-- <van-icon name="qr" /> -->
            </div>
            <p>待收货</p>
          </div>
          <div class="my-grid-box-items" @click="refund">
            <div class="my-grid-box-icon">
              <img src="../assets/waitrefund.png" alt="" />
              <!-- <van-icon name="qr" /> -->
            </div>
            <p>退款/售后</p>
          </div>
        </div>
      </div>
      <!-- 收货详情 -->

      <div class="ys-grid">
        <div class="my-grid-tit">
          <span>我的服务</span>
        </div>
        <div class="my-grid-box">
          <div class="my-grid-box-items" @click="receiving">
            <div class="my-grid-box-icon">
              <img src="../assets/address.png" alt="" />
            </div>
            <p>收货地址</p>
          </div>
          <div class="my-grid-box-items" @click="contact">
            <div class="my-grid-box-icon">
              <img src="../assets/customer.png" alt="" />
              <!-- <van-icon name="qr" /> -->
            </div>
            <p>联系客服</p>
          </div>

          <div class="my-grid-box-items" @click="mynews">
            <div class="my-grid-box-icon">
              <van-icon name="chat-o" color="#07c160" />
              <!-- <van-icon name="qr" /> -->
            </div>
            <p>消息通知</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userimg: this.$store.state.avatar,
    };
  },
  created() {},
  methods: {
    myhome() {
      this.$router.push({
        name: "Myhome",
      });
    },
    myoder() {
      this.$router.push({
        name: "Oderall",
      });
    },
    waitpay(e) {
      this.$router.push({
        name: "Oderall",
        query: {
          num: e,
        },
      });
    },
    receiving() {
      this.$router.push({
        name: "Receive",
      });
    },
    contact() {
      this.$router.push({
        name: "Contact",
      });
    },
    opinion() {
      this.$router.push({
        name: "Opinion",
      });
    },
    refund() {
      this.$router.push({
        name: "Refund",
      });
    },
    mynews() {
      this.$router.push({
        name: "Mynews",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100vh;
  background: #f7f4f8;
}
.mysty {
  width: 100%;
  background: #f7f4f8;
  overflow: hidden;
  padding: 15px;
  box-sizing: border-box;
  .y-grid {
    background: #fff;
    padding: 15px;
    box-sizing: border-box;
    border-radius: 10px;
    // box-shadow: 5px 5px 5px #eeee, -1px -1px 1px #eeee;
    margin-bottom: 15px;
    .my-grid-tit {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        font-size: 16px;
        &:nth-of-type(1) {
          font-weight: bold;
          color: #454545;
        }
        &:nth-of-type(2) {
          color: #7777;
          display: flex;
          font-size: 13px;
          align-items: center;
        }
      }
    }
    .my-grid-box {
      width: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 20px;
      .my-grid-box-items {
        width: 60px;
        background: #fff;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
        .my-grid-box-icon {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 15px;
          img {
            width: 100%;
          }
        }
        p {
          font-size: 14px;
          margin-top: 10px;
          color: #717171;
        }
      }
    }
  }
  .ys-grid {
    background: #fff;
    padding: 15px;
    box-sizing: border-box;
    border-radius: 10px;
    .my-grid-tit {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        font-size: 16px;
        &:nth-of-type(1) {
          font-weight: bold;
          color: #454545;
        }
        &:nth-of-type(2) {
          color: #7777;
          display: flex;
          align-items: center;
        }
      }
    }
    .my-grid-box {
      width: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
      margin-top: 20px;
      justify-content: space-between;
      .my-grid-box-items {
        width: 60px;
        background: #fff;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 5px;
        i {
          display: inline-block;
          width: 20px;
          height: 20px;
          font-size: 20px;
        }
        .my-grid-box-icon {
          width: 20px;
          height: 20px;
          justify-content: center;
          border-radius: 15px;
          img {
            width: 100%;
          }
        }
        p {
          font-size: 14px;
          margin-top: 20px;
          color: #717171;
        }
      }
    }
  }
}

.top-title {
  width: 100%;
  display: flex;
  align-items: center;
  padding-top: 40px;
  box-sizing: border-box;
  background: linear-gradient(
    -3deg,
    rgba(84, 180, 95, 0.61),
    rgba(136, 215, 104, 0.61)
  );
  padding-bottom: 30px;
}
.logo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 10px;
}
.top-title-con {
  margin-top: -10px;
  p {
    &:nth-of-type(1) {
      height: 13.5px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #fff;
      margin-bottom: 8px;
    }
    &:nth-of-type(2) {
      height: 11.5px;
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #fff;
    }
  }
}
// .mynews {
//   position: fixed;
//   right: 20px;
//   top: 20px;
//   z-index: 1000;
//   text-align: right;
//   i{
//     font-size: 20px;
//   }
// }
</style>