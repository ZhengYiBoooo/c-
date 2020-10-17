<template>
  <div class="oder">
    <!-- 导航栏 -->

    <opInion
      :urls="'Mystyle'"
      :titleleft="''"
      :titleright="''"
      :centertitle="'我的订单'"
    ></opInion>

    <van-tabs v-model="active">
      <van-tab title="全部">
        <div class="wrap">
          <div class="shopitems" v-for="(item, index) in list" :key="index">
            <div class="shopitems-right-tit">
              <p><span>2020-09-29</span><span>09:58:11</span></p>
              <p><span>待支付</span></p>
            </div>
            <div class="shopitems-right" @click="waitpay">
              <van-image round :src="item.url" class="shopitems-img" />
              <div class="shopitems-cont">
                <p>{{ item.shop }}</p>
                <p>中果 / {{ item.jin }}斤</p>
                <p>x{{ item.num }}</p>
                <!-- <p>运费{{ item.jin }}元</p> -->
              </div>
              <div class="shopitems-speci">
                <p>￥{{ (item.pires * item.num).toFixed(2) }}</p>
                <!-- <p>{{ item.pires }}</p> -->
                <!-- <p>x{{ item.num }}</p> -->
              </div>
            </div>
            <div class="shopitems-bottom">
              <van-button plain type="primary" round size="small"
                >付款</van-button
              >
              <van-button plain type="default" round size="small"
                >取消订单</van-button
              >
              <span class="shopimore">更多</span>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="待付款">
        <div class="wrap">
          <div class="shopitems" v-for="(item, index) in list" :key="index">
            <div class="shopitems-right-tit">
              <p><span>2020-09-29</span><span>09:58:11</span></p>
              <p><span>待支付</span></p>
            </div>
            <div class="shopitems-right" @click="waitpay">
              <van-image round :src="item.url" class="shopitems-img" />
              <div class="shopitems-cont">
                <p>{{ item.shop }}</p>
                <p>中果 / {{ item.jin }}斤</p>
                <p>x{{ item.num }}</p>
                <!-- <p>运费{{ item.jin }}元</p> -->
              </div>
              <div class="shopitems-speci">
                <p>￥{{ (item.pires * item.num).toFixed(2) }}</p>
                <!-- <p>{{ item.pires }}</p> -->
                <!-- <p>x{{ item.num }}</p> -->
              </div>
            </div>
            <div class="shopitems-bottom">
              <van-button plain type="primary" round size="small"
                >付款</van-button
              >
              <van-button
                plain
                type="default"
                round
                size="small"
                @click="cancel"
                >取消订单</van-button
              >
              <span class="shopimore">更多</span>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="待发货">
        <div class="wrap">
          <div class="shopitems" v-for="(item, index) in list" :key="index">
            <div class="shopitems-right-tit">
              <p><span>2020-09-29</span><span>09:58:11</span></p>
              <p><span>买家已付款</span></p>
            </div>
            <div class="shopitems-right" @click="waitpay">
              <van-image round :src="item.url" class="shopitems-img" />
              <div class="shopitems-cont">
                <p>{{ item.shop }}</p>
                <p>中果 / {{ item.jin }}斤</p>
                <p>x{{ item.num }}</p>
                <!-- <p>运费{{ item.jin }}元</p> -->
              </div>
              <div class="shopitems-speci">
                <p>￥{{ (item.pires * item.num).toFixed(2) }}</p>
                <!-- <p>{{ item.pires }}</p> -->
                <!-- <p>x{{ item.num }}</p> -->
              </div>
            </div>
            <div class="shopitems-bottom">
              <div class="shopit-pires">
                <p>
                  <span>商品金额：</span>
                  <span><i>￥</i>136.9</span>
                </p>
                <p>
                  <span>配送费：</span>
                  <span><i>￥</i>3</span>
                </p>
                <p>
                  <span>实付金额：</span>
                  <span><i>￥</i>139.9</span>
                </p>
              </div>
            </div>
            <!-- <div class="shopitems-bottom">
              <van-button plain type="primary" round size="small"
                >付款</van-button
              >
              <van-button plain type="default" round size="small"
                >取消订单</van-button
              >
              <span class="shopimore">更多</span>
            </div> -->
          </div>
        </div>
      </van-tab>
      <van-tab title="待收货">
        <div class="wrap">
          <div class="shopitems" v-for="(item, index) in list" :key="index">
            <div class="shopitems-right-tit">
              <p><span>2020-09-29</span><span>09:58:11</span></p>
              <p><span>卖家已发货</span></p>
            </div>
            <div class="shopitems-right" @click="waitpay">
              <van-image round :src="item.url" class="shopitems-img" />
              <div class="shopitems-cont">
                <p>{{ item.shop }}</p>
                <p>中果 / {{ item.jin }}斤</p>
                <p>x{{ item.num }}</p>
                <!-- <p>运费{{ item.jin }}元</p> -->
              </div>
              <div class="shopitems-speci">
                <p>￥{{ (item.pires * item.num).toFixed(2) }}</p>
                <!-- <p>{{ item.pires }}</p> -->
                <!-- <p>x{{ item.num }}</p> -->
              </div>
            </div>

            <div class="shopitems-bottom">
              <div class="shopit-pires">
                <p>
                  <span>商品金额：</span>
                  <span><i>￥</i>136.9</span>
                </p>
                <p>
                  <span>配送费：</span>
                  <span><i>￥</i>3</span>
                </p>
                <p>
                  <span>实付金额：</span>
                  <span><i>￥</i>139.9</span>
                </p>
              </div>
            </div>
            <div class="shopitems-bottom">
              <van-button plain type="primary" round size="small"
                >确认收货</van-button
              >
              <van-button plain type="default" round size="small"
                >查看物流</van-button
              >
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { Dialog } from "vant";
import opInion from "../../components/navbar/navbar.vue";
export default {
  components: {
    opInion,
  },
  data() {
    return {
      active: 0,

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
  created() {
    let str = this.$route.query.num;
    this.active = str;
    console.log(this.active);
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: "Mystyle",
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
    waitpay() {
      this.$router.push({
        name: "Waitpay",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.oder {
  width: 100%;
  overflow: hidden;
  padding-top: 46px;
  box-sizing: border-box;
  background: #f6f6f6;
}
.wrap {
  width: 100%;
  overflow: hidden;
  background: #f6f6f6;
  padding-top: 20px;
  padding-bottom: 20px;
  box-sizing: border-box;
  .shopitems {
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    width: 100%;
    padding: 15px;
    padding-bottom: 10px;
    box-sizing: border-box;
    background: #fff;
    margin-bottom: 10px;
    flex-wrap: wrap;
    box-shadow: 0.133333rem 0.133333rem 0.133333rem #eeee,
      -0.026667rem -0.026667rem 0.026667rem #eeee;
    .shopitems-right-tit {
      width: 100%;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 10px;
      box-sizing: border-box;
      p {
        &:nth-of-type(1) {
          span {
            font-size: 13px;
            color: #777;
            &:nth-of-type(1) {
              margin-right: 20px;
            }
          }
        }
        &:nth-of-type(2) {
          span {
            font-size: 15px;
            color: #00cc33;
          }
        }
      }
    }

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
    .shopitems-bottom {
      width: 100%;
      background: #fff;
      margin-top: 10px;
      display: flex;
      flex-direction: row-reverse;
      flex-wrap: nowrap;
      align-items: center;
      position: relative;
      box-sizing: border-box;
      // justify-content: space-between;
      
    .shopit-pires {
      width: 100%;
      padding: 20px;
      padding-left: 0;
      padding-right: 0;
      overflow: hidden;
      box-sizing: border-box;
      background: #fff;
      p {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 10px;
        &:nth-of-type(1) {
          border-top: 1px solid #eee;
        }
        &:last-child {
          span {
            &:last-child {
              color: red;
            }
            i{
              
            color: red;
            }
          }
        }
        span {
          font-size: 16px;
          font-weight: 100;
          &:nth-of-type(1) {
            color: #5e5e5e;
          }
          i {
            font-style: normal;
            color: #000;
            font-size: 12px;
          }
        }
      }
    }
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
        bottom: 5px;
        font-size: 14px;
        color: #686868;
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
}
</style>