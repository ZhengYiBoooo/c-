<template>
  <div class="waitpay">
    <!-- 导航栏 -->
    <van-nav-bar left-arrow @click-left="onClickLeft" id="addTop"
      ><template #left> <van-icon name="arrow-left" size="18" /></template
      ><template #right> <span>订单详情</span></template>
    </van-nav-bar>

    <div class="waitpa-wrap">
      <div class="wait-wrap">
        <p>待支付</p>
        <p>等待买家付款</p>
        <p>30分钟内未支付订单自动取消</p>

        <div class="shopitems-bottom">
          <van-button plain type="primary" round size="small">付款</van-button>
          <van-button plain type="default" round size="small" @click="cancel"
            >取消订单</van-button
          >
          <span class="shopimore">更多</span>
        </div>
      </div>
      <div class="address">
        <div class="address-icon">
          <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="" class="logo" />
        </div>
        <div class="address-text">
          浙江省杭州市萧山区金鸡路知稼苑停车场入口21幢906<span
          ></span>王小明<span></span>13637140505
        </div>
      </div>

      <div class="shopitems" v-for="(item, index) in list" :key="index">
        <div class="shopitems-right">
          <van-image round :src="item.url" class="shopitems-img" />
          <div class="shopitems-cont">
            <p>{{ item.shop }}</p>
            <p>中果 / {{ item.jin }}斤</p>
            <p>运费{{ item.jin }}元</p>
          </div>
          <div class="shopitems-speci">
            <p>实付￥{{ (item.pires * item.num).toFixed(2) }}</p>
            <p>{{ item.pires }}</p>
            <p>x{{ item.num }}</p>
          </div>
        </div>
      </div>
      <div class="shopit-pires">
        <p>
          <span> <i>总价</i>￥136.9</span>
          <span> <i>运费</i>￥3</span>
          <span> <i>实付款</i>￥139.9</span>
        </p>
      </div>
      <div class="shopitems-info">
        <div class="shopitems-info-title">
          <span>订单信息</span>
        </div>
        <div class="shopitems-info-content-wrap">
          <ul class="shopitems-info-content">
            <li>
              <span>订单编号</span>
              <span>12755478555544</span>
            </li>
            <li>
              <span>支付时间</span>
              <span>暂未支付</span>
            </li>
            <li>
              <span>交易单号</span>
              <span>55452278555544</span>
            </li>
            <li>
              <span>创建时间</span>
              <span>2020-08-25 10:03:59</span>
            </li>
            <li>
              <span>备注信息</span>
              <span>备注内容备注内容备注内容备备注内容备注内容备注内容备</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      list: [
        {
          shop: "红",
          url: "https://img.yzcdn.cn/vant/cat.jpeg",
          pires: 36.9,
          boo: false,
          jin: 5,
          num: 1,
          id: 1,
        },
        {
          shop: "红富",
          url: "https://img.yzcdn.cn/vant/cat.jpeg",
          pires: 36.9,
          boo: false,
          jin: 5,
          num: 1,
          id: 2,
        },
        {
          shop: "红富士",
          url: "https://img.yzcdn.cn/vant/cat.jpeg",
          pires: 36.9,
          boo: false,
          jin: 5,
          num: 1,
          id: 3,
        },
        {
          shop: "红富士苹",
          url: "https://img.yzcdn.cn/vant/cat.jpeg",
          pires: 36.9,
          boo: false,
          jin: 5,
          num: 1,
          id: 4,
        },
        {
          shop: "红富士苹果",
          url: "https://img.yzcdn.cn/vant/cat.jpeg",
          pires: 36.9,
          boo: false,
          jin: 5,
          num: 1,
          id: 5,
        },
      ],
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: "Oderall",
      });
    },

    cancel() {
      Dialog.confirm({
        title: "取消订单",
        message: "您确定要取消订单吗",
      })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.waitpay {
  width: 100%;
  overflow: hidden;
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
    }
  }
  .waitpa-wrap {
    background: #fff;
    padding: 30px;
    box-sizing: border-box;
    .wait-wrap {
      overflow: hidden;
      width: 100%;
      padding-bottom: 10px;
      box-sizing: border-box;
      background: #fff;
      margin-bottom: 10px;
      flex-wrap: wrap;
      p {
        &:nth-of-type(1) {
          font-size: 18px;
          font-weight: bold;
          letter-spacing: 1px;
        }
        &:nth-of-type(2) {
          font-size: 16px;
          font-weight: normal;
          margin-top: 20px;
          margin-bottom: 10px;
        }
        &:nth-of-type(3) {
          font-size: 16px;
          font-weight: normal;
        }
      }
      .shopitems-bottom {
        width: 100%;
        background: #fff;
        margin-top: 20px;
        display: flex;
        flex-direction: row-reverse;
        flex-wrap: nowrap;
        align-items: center;
        position: relative;
        box-sizing: border-box;
        box-sizing: border-box;
        // justify-content: space-between;
        button {
          width: 80px;
          max-width: 80px;
          &:nth-of-type(1) {
            margin-left: 10px;
          }
        }
        .shopimore {
          position: absolute;
          left: 0;
          top: 5px;
          font-size: 14px;
        }
        .shopitems-wait-shipment {
          font-size: 15px;
          margin-left: 20px;
        }
        .shopitems-wait-shipment2 {
          font-size: 15px;
        }
      }
    }
    .address {
      width: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      .address-icon {
        width: 40px;
        height: 40px;
        overflow: hidden;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .address-text {
        max-width: 260px;
        font-size: 14px;
        color: #666;
        padding: 20px 0 20px 0;
        box-sizing: border-box;
        span {
          padding-left: 10px;
          padding-right: 10px;
        }
      }
    }

    .shopitems {
      display: flex;
      justify-content: space-between;
      align-items: center;
      overflow: hidden;
      width: 100%;
      padding-top: 20px;
      padding-bottom: 20px;
      box-sizing: border-box;
      .shopitems-right {
        width: 100%;
        display: flex;
        align-items: center;
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
        .shopitems-cont {
          overflow: hidden;
          margin-left: 20px;
          p {
            &:nth-of-type(1) {
              font-size: 15px;
              font-weight: 100;
              font-family: Microsoft YaHei;
              overflow: hidden;
              text-overflow: clip;
              text-overflow: ellipsis;
              white-space: nowrap;
              max-width: 90px;
            }
            &:nth-of-type(2) {
              font-size: 15px;
              font-weight: 100;
              margin: 5px 0 5px 0;
              color: #8888;
              font-family: Microsoft YaHei;
            }
            &:nth-of-type(3) {
              font-size: 15px;
              font-weight: 100;
              color: #8888;
              font-family: Microsoft YaHei;
            }
          }
        }
        .shopitems-speci {
          position: absolute;
          right: 5px;
          top: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          p {
            font-size: 15px;
            font-weight: 100;
            font-family: Microsoft YaHei;
            width: 100%;
            text-align: center;
            text-align: right;
            &:nth-of-type(2) {
              margin-top: 3px;
              margin-bottom: 6px;
              color: #999;
            }
            &:nth-of-type(3) {
              color: #999;
            }
          }
        }
      }
    }
    .shopit-pires {
      width: 100%;
      overflow: hidden;
      p {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding-top: 10px;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
        span {
          font-size: 16px;
          font-weight: 100;
          i {
            font-style: normal;
            color: #999;
          }
        }
      }
    }
    .shopitems-info {
      width: 100%;
      overflow: hidden;
      padding-top: 10px;
      box-sizing: border-box;
      .shopitems-info-title {
        width: 100%;
        overflow: hidden;
        span {
          font-size: 18px;
          font-weight: 600;
          letter-spacing: 1px;
        }
      }
      .shopitems-info-content-wrap {
        margin-top: 10px;
        width: 100%;
        overflow: hidden;
        display: flex;
        .shopitems-info-content {
          li {
            font-size: 15px;
            letter-spacing: 1px;
            margin-bottom: 10px;
            display: flex;
            span {
              &:nth-of-type(1) {
                margin-right: 40px;
                flex: 1;
              }
              &:nth-of-type(2) {
                flex: 3;
              }
            }
          }
        }
      }
    }
  }
}
</style>