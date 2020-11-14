<template>
  <div class="Logistics">
    <!-- 导航栏 -->
    <opInion
      :urls="'Waitpay'"
      :titleleft="'查看物流'"
      :titleright="''"
    ></opInion>

    <div class="Logistics-shop-title">
      <div class="ics-shop-im">
        <div class="Logistics-shop-img-wrap">
          <van-image
            round
            src="https://img.yzcdn.cn/vant/cat.jpeg"
            class="shopitems-img"
          />
        </div>
        <div class="Logistics-shop-img-p">
          <p>{{listinfo.goods.name}}</p>
        </div>
      </div>
      <div class="Logistics-shop-tit">
        <span>天天快递</span>
        <span>{{ copyurl }}</span>
        <span v-clipboard:copy="copyurl" v-clipboard:success="onCopy"
          >复制</span
        >
      </div>
      <div class="Logistics-shop-time">
        <van-steps direction="vertical">
          <van-step
            class="Logistics-shop-itemsadd"
            v-for="(item, index) in shippingT"
            :key="index"
          >
            <h3>{{item}}</h3>
            <p>10-1512:40</p>
          </van-step>
        </van-steps>
      </div>
    </div>
  </div>
</template>
<script>
import opInion from "../../components/navbar/navbar.vue";
import { Toast } from "vant";
import { b2expinfolist } from "../https/api";
export default {
  data() {
    return {
      copyurl: "854488552471101145",
      shippingT: "",
      serids: "",
      listinfo:{}
    };
  },
  created() {
    this.serids = this.$route.query.serid;

    // this.shippingT = JSON.parse(item.shippingTraces);
    // var arr = [];
    // this.shippingT = this.shippingTraces.msg.xiangxiwuliu.split("<br>");
    // this.shippingTraces.map((res) => {
    //   arr.push(res.split("|"));
    // });
  },
  components: {
    opInion,
  },
  methods: {
    onCopy() {
      Toast({ message: "复制成功", duration: 500 });
    },
    async b2expinfolist() {
      const res = await b2expinfolist(this.serids);
      if (res.status == 200) {
        this.listinfo=res.data;
        this.shippingT = res.data.shippingTraces;
        var arr = [];
        this.shippingT = JSON.parse(this.shippingT);
        this.shippingT = this.shippingT.msg.xiangxiwuliu.split("<br>");
        this.shippingT.map((res) => {
          arr.push(res.split("|"));
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.Logistics {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #f5f5f5;
  padding-top: 46px;
  box-sizing: border-box;
  .Logistics-shop-title {
    width: 100%;
    overflow: hidden;
    background: #f5f5f5;
    padding: 10px;
    box-sizing: border-box;
    .ics-shop-im {
      background: #fff;
      border-radius: 10px;
      overflow: hidden;
      padding-bottom: 20px;
      box-sizing: border-box;
    }
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
        font-size: 15px;
        letter-spacing: 1px;
        color: #606060;
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
      border-radius: 10px;
      padding: 10px;
      margin-top: 10px;
      box-sizing: border-box;
      .van-steps--vertical {
        overflow: none !important;
      }
      .Logistics-shop-itemsadd {
        position: relative;
      }
    }
  }
}
</style>