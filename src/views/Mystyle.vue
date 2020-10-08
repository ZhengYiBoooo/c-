<template>
  <div class="mysty">
    <!-- 商家信息 -->
    <div class="top-title" @click="myhome">
      <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="" class="logo" />
      <div class="top-title-con">
        <p>优小果</p>
        <p>手机：17733933505</p>
      </div>
    </div>
    <!-- 四宫格 -->
    <div class="y-grid">
      <div class="my-grid-tit">
        <span>我的订单</span>
        <span @click="myoder">全部订单 <van-icon name="arrow" /></span>
      </div>
      <div class="my-grid-box">
        <div class="my-grid-box-items" @click="waitpay(1)">
          <div class="my-grid-box-icon">
            <van-icon name="qr" />
          </div>
          <p>待支付</p>
        </div>
        <div class="my-grid-box-items" @click="waitpay(2)">
          <div class="my-grid-box-icon">
            <van-icon name="qr" />
          </div>
          <p>待发货</p>
        </div>
        <div class="my-grid-box-items" @click="waitpay(3)">
          <div class="my-grid-box-icon">
            <van-icon name="qr" />
          </div>
          <p>待收货</p>
        </div>
        <div class="my-grid-box-items" @click="refund">
          <div class="my-grid-box-icon">
            <van-icon name="qr" />
          </div>
          <p>退款/售后</p>
        </div>
      </div>
    </div>
    <!-- 收货详情 -->
    <div class="grid-list">
      <div class="grid-list-li" @click="receiving"><span>收货地址</span><van-icon name="arrow" /></div>
      <div class="grid-list-li" @click="contact"><span>联系客服</span><van-icon name="arrow" /></div>
      <div class="grid-list-li" @click="opinion"><span>意见反馈</span><van-icon name="arrow" /></div>
    </div>
  </div>
</template>
<script>
export default {
  methods:{
    myhome(){
      this.$router.push({
        name:'Myhome'
      })
    },
    myoder(){
      this.$router.push({
        name:'Oderall'
      })
    },
    waitpay(e){
      this.$router.push({
        name:'Oderall',
        query:{
          num:e
        }
      })
    },
    receiving(){
      this.$router.push({
        name:'Receive',
      })
    },
    contact(){
      this.$router.push({
        name:'Contact',
      })
    },
    opinion(){
      this.$router.push({
        name:'Opinion',
      })
    },
    refund(){
      this.$router.push({
        name:'Refund',
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.mysty {
  width: 100%;
  background: #fff;
  overflow: hidden;
  padding: 15px;
  padding-top: 30px;
  box-sizing: border-box;
  .top-title {
    width: 100%;
    display: flex;
    align-items: center;
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
        color: #626262;
        margin-bottom: 8px;
      }
      &:nth-of-type(2) {
        height: 11.5px;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #626262;
      }
    }
  }
  .y-grid {
    margin-top: 40px;
    background: #fff;
    padding: 15px;
    box-sizing: border-box;
    border-radius: 10px;
    box-shadow: 5px 5px 5px #eeee, -1px -1px 1px #eeee;
    .my-grid-tit {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        font-size: 16px;
        &:nth-of-type(1) {
          font-weight: bold;
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
          background: #7777;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 15px;
        }
        p {
          font-size: 14px;
          margin-top: 10px;
        }
      }
    }
  }
  .grid-list {
    width: 100%;
    overflow: hidden;
    margin-top: 30px;
    .grid-list-li{
      width: 100%;
      display: flex;
      align-items: center;
      padding: 10px;
      justify-content: space-between;
      box-sizing: border-box;
      margin-bottom: 10px;
      span{
        font-size: 16px;
      }
      i{
        font-size: 16px;
      }
    }
  }
}
</style>