<template>
  <div class="oder">
    <!-- 导航栏 -->
    <van-nav-bar left-arrow @click-left="onClickLeft" id="addTop"
      ><template #left>
        <van-icon name="arrow-left" size="18" /> <span>我的订单</span></template
      >
    </van-nav-bar>
    <van-tabs v-model="active">
      <van-tab title="全部">
        <div class="wrap">
          <div class="shopitems" v-for="(item, index) in list" :key="index">
            <div class="shopitems-right-tit">
              <p><span>2020-09-29</span><span>09:58:11</span></p>
              <p><span>待支付</span></p>
            </div>
            <div class="shopitems-right"  @click="waitpay">
              <van-image round :src="item.url" class="shopitems-img" />
              <div class="shopitems-cont">
                <p>{{ item.shop }}</p>
                <p>中果 / {{ item.jin }}斤</p>
              </div>
              <div class="shopitems-speci">
                <p>￥{{ (item.pires * item.num).toFixed(2) }}</p>
                <span>x{{ item.num }}</span>
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
              </div>
              <div class="shopitems-speci">
                <p>￥{{ (item.pires * item.num).toFixed(2) }}</p>
                <span>x{{ item.num }}</span>
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
            <div class="shopitems-right"  @click="waitpay">
              <van-image round :src="item.url" class="shopitems-img" />
              <div class="shopitems-cont">
                <p>{{ item.shop }}</p>
                <p>中果 / {{ item.jin }}斤</p>
              </div>
              <div class="shopitems-speci">
                <p>￥{{ (item.pires * item.num).toFixed(2) }}</p>
                <span>x{{ item.num }}</span>
              </div>
            </div>
            <div class="shopitems-bottom">
              <span class="shopitems-wait-shipment">实付款￥136.9</span>
              <span class="shopitems-wait-shipment2">总价￥136.9</span>
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
            <div class="shopitems-right"  @click="waitpay">
              <van-image round :src="item.url" class="shopitems-img" />
              <div class="shopitems-cont">
                <p>{{ item.shop }}</p>
                <p>中果 / {{ item.jin }}斤</p>
              </div>
              <div class="shopitems-speci">
                <p>￥{{ (item.pires * item.num).toFixed(2) }}</p>
                <span>x{{ item.num }}</span>
              </div>
            </div>

            <div class="shopitems-bottom">
              <span class="shopitems-wait-shipment">实付款￥136.9</span>
              <span class="shopitems-wait-shipment2">总价￥136.9</span>
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
import { Dialog } from 'vant';
export default {
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
    waitpay(){
      this.$router.push({
        name:'Waitpay'
      })
    }
  },
};
</script>
<style lang="scss" scoped>
.oder {
  width: 100%;
  overflow: hidden;
  padding-top: 46px;
  box-sizing: border-box;
}
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
.wrap {
  width: 100%;
  overflow: hidden;
  background: #fff;
  padding: 20px;
  box-sizing: border-box;
  .shopitems {
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    width: 100%;
    padding: 20px;
    padding-bottom: 10px;
    box-sizing: border-box;
    background: #fff;
    border-radius: 10px;
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
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
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
            margin: 10px 0 10px 0;
            color: #8888;
            font-family: Microsoft YaHei;
          }
        }
      }
      .shopitems-speci {
        position: absolute;
        right: -20px;
        top: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        p {
          font-size: 15px;
          font-weight: 100;
          font-family: Microsoft YaHei;
          color: red;
          width: 100%;
          text-align: center;
        }
        span {
          font-size: 20px;
          font-weight: 100;
          display: block;
          font-family: Microsoft YaHei;
          width: 40px;
          font-size: 15px;
          max-width: 40px;
          text-align: center;
          margin: 0 10px 0 10px;
          margin-top: 10px;
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