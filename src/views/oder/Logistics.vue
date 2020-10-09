<template>
  <div class="Logistics">
    <!-- 导航栏 -->
    <opInion
      :urls="'Waitpay'"
      :titleleft="'查看物流'"
      :titleright="''"
    ></opInion>

    <div class="Logistics-shop-title">
      <div class="Logistics-shop-img-wrap">
        <van-image
          round
          src="https://img.yzcdn.cn/vant/cat.jpeg"
          class="shopitems-img"
        />
        <div class="shop-mage">
          <span>共两件</span>
        </div>
      </div>
      <div class="Logistics-shop-img-p">
        <p>红富士苹果</p>
      </div>
      <div class="Logistics-shop-tit">
        <span>天天快递</span>
        <span>854488552471101145</span>
        <span>复制</span>
      </div>
      <div class="Logistics-shop-time">
        <van-steps direction="vertical" :active="2">
          <van-step>
            <h3>【城市】物流状态1</h3>
            <p>2016-07-12 12:40</p>
          </van-step>
          <van-step>
            <h3>【城市】物流状态2</h3>
            <p>2016-07-11 10:00</p>
          </van-step>
          <van-step>
            <h2>快件已发货</h2>
            <p>2016-07-10 09:30</p>
          </van-step>
        </van-steps>
      </div>
    </div>
  </div>
</template>
<script>
import opInion from "../../components/navbar/navbar.vue";
export default {
  components: {
    opInion,
  },
};
</script>
<style lang="scss" scoped>
.Logistics {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #fcfcfc;
  padding-top: 46px;
  box-sizing: border-box;
  .Logistics-shop-title {
    width: 100%;
    overflow: hidden;
    background: #fcfcfc;
    padding: 10px;
    box-sizing: border-box;
    .Logistics-shop-img-wrap {
      width: 100%;
      overflow: hidden;
      background: #fcfcfc;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 15px 0 15px 0;
      box-sizing: border-box;
      position: relative;
      .shopitems-img {
        width: 70px;
        height: 70px;
        border: 0px solid #888888;
        box-shadow: 5px 5px 5px #888888;
        img {
          width: 70px;
          height: 70px;
        }
      }
      .shop-mage {
        position: absolute;
        left: 50%;
        bottom: 14px;
        width: 70px;
        height: 35px;
        margin-left: -35px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-image: linear-gradient(#fff, #333, #000);
        opacity: 0.6;
        span {
          font-size: 13px;
          color: #fff;
          letter-spacing: 1px;
        }
      }
    }
    .Logistics-shop-img-p {
      width: 100%;
      overflow: hidden;
      background: #fcfcfc;
      display: flex;
      align-items: center;
      justify-content: center;
      p {
        font-size: 16px;
        letter-spacing: 1px;
      }
    }
    .Logistics-shop-tit {
      width: 100%;
      overflow: hidden;
      background: #fff;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      box-shadow: 0.133333rem 0.133333rem 0.133333rem #eeee,
        -0.026667rem -0.026667rem 0.026667rem #eeee;
      padding: 10px 0 10px 0;
      box-sizing: border-box;
      margin-top: 20px;
      span {
        font-size: 13px;
        color: #777;
        &:nth-of-type(3) {
          color: #0066ff;
        }
      }
    }
    .Logistics-shop-time {
      width: 100%;
      overflow: hidden;
      background: #fff;
      padding: 10px;
      box-sizing: border-box;
      margin-top: 20px;
      padding-left: 45px;
    }
  }
}
</style>