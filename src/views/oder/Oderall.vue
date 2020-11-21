<template>
  <div class="oder">
    <!-- 导航栏 -->

    <opInion
      :urls="'Mystyle'"
      :titleleft="''"
      :titleright="''"
      :centertitle="'我的订单'"
    ></opInion>

    <van-popup v-model="show" round position="bottom" @close="porpo">
      <div class="paywrap">
        <div class="payitems">
          <div class="payitems-left">
            <img src="../../assets/zfbpay.jpg" alt="" />
            <p>支付宝支付</p>
          </div>
          <input
            type="radio"
            class="payitems-rad"
            name="language"
            :value="paylist"
            @change="clssa((paylist = 1))"
          />
        </div>
        <div class="payitems">
          <div class="payitems-left">
            <img src="../../assets/wxpay.png" alt="" />
            <p>微信支付</p>
          </div>
          <input
            type="radio"
            class="payitems-rad"
            name="language"
            :value="paylist"
            @change="clssa((paylist = 2))"
          />
        </div>

        <div class="payitems">
          <div class="payitems-left">
            <img src="../../assets/zfbpay.jpg" alt="" />
            <p>第三方支付宝支付</p>
          </div>
          <input
            type="radio"
            class="payitems-rad"
            name="language"
            :value="paylist"
            @change="clssa((paylist = 5))"
          />
        </div>
        <div class="payitems">
          <div class="payitems-left">
            <img src="../../assets/wxpay.png" alt="" />
            <p>第三方微信支付</p>
          </div>
          <input
            type="radio"
            class="payitems-rad"
            name="language"
            :value="paylist"
            @change="clssa((paylist = 6))"
          />
        </div>
        <van-button
          type="primary"
          size="large"
          @click="showPopup"
          :disabled="
            paylist != 2 && paylist != 1 && paylist != 5 && paylist != 6
          "
          >立即支付</van-button
        >
      </div>
    </van-popup>
    <van-tabs v-model="active" @click="sadasd(active)">
      <van-empty
        v-show="nulllist.length == 0 ? true : false"
        :description="nullname"
      />
      <van-tab :title="v.name" v-for="(v, k) in numlists" :key="k">
        <div class="wrap">
          <div
            class="shopitems"
            v-for="(item, index) in newshoplist"
            :key="index"
          >
            <div class="shopitems-right-tit">
              <p>
                <span>{{ item.createTime }}</span>
              </p>
              <p>
                <span>{{ item.statuslsss }}</span>
              </p>
            </div>
            <div
              class="shopitems-right"
              @click="waitpay(item)"
              v-for="(items, indexs) in item.goods"
              :key="indexs"
            >
              <van-image round :src="items.urlgoodss" class="shopitems-img" />
              <div class="shopitems-cont">
                <p>{{ items.name }}</p>
                <p>{{ items.weight }}</p>
                <p>x{{ items.quantity }}</p>
                <!-- <p>运费{{ item.jin }}元</p> -->
              </div>
              <div class="shopitems-speci">
                <p>￥{{ (items.total / 1000).toFixed(2) }}</p>
                <!-- <p>{{ item.pires }}</p> -->
                <!-- <p>x{{ item.num }}</p> -->
              </div>
            </div>
            <div class="waitpay-pricennull">
              <span
                ><i>￥</i
                >{{
                  (item.total / 1000 + item.shippingFare / 1000).toFixed(2)
                }}</span
              >
              <span>应付</span>
              <span>共{{ item.goods.length }}件商品</span>
            </div>
            <div
              class="shopitems-bottom"
              v-show="item.status == 2 || item.status == 3"
            >
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
            <div
              class="shopitems-bottom"
              v-show="item.status == 1 || item.status == 3"
            >
              <van-button
                type="primary"
                round
                size="small"
                @click="ggpires(item)"
                >{{ item.status == 1 ? "付款" : "确认收货" }}</van-button
              >
              <van-button
                plain
                type="default"
                round
                size="small"
                @click="odernoclick(item)"
                >{{ item.status == 1 ? "取消订单" : "查看物流" }}</van-button
              >
              <span class="shopimore">更多</span>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { Dialog, Toast } from "vant";
import opInion from "../../components/navbar/navbar.vue";
import { b2borderlist, b2borderemove, b2AnOrder } from "../https/api";
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
      b2list: [],
      numlists: [
        {
          name: "全部",
        },
        {
          name: "待支付",
        },
        {
          name: "待发货",
        },
        {
          name: "待收货",
        },
      ],
      ordno: "",
      statusls: "",
      newstatus: [],
      newshoplist: [],
      nulllist: [],
      nullname: "",
      show: false,

      paylist: "",
      mainid: "",
      payurls: "",
      bonumboo: "",
    };
  },
  async created() {
    let str = this.$route.query.num;
    this.active = str;
    const res = await b2borderlist();
    this.b2list = res.data.records;
    this.newshoplist = this.b2list;
    this.newshoplist.forEach((item) => {
      item.goods.forEach((items) => {
        let imgobj = items.goodsImages.split(",");
        items.urlgoodss = imgobj[imgobj.length - 1];
      });
    });
    for (let i = 0; i < this.newshoplist.length; i++) {
      if (this.newshoplist[i].status == 1) {
        this.newshoplist[i].statuslsss = "待付款";
      }
      if (this.newshoplist[i].status == 2) {
        this.newshoplist[i].statuslsss = "待发货";
      }
      if (this.newshoplist[i].status == 3) {
        this.newshoplist[i].statuslsss = "已发货";
      }
      if (this.newshoplist[i].status == 4) {
        this.newshoplist[i].statuslsss = "已收货";
      }
      if (this.newshoplist[i].status == 5) {
        this.newshoplist[i].statuslsss = "已完成";
      }
      if (this.newshoplist[i].status == 6) {
        this.newshoplist[i].statuslsss = "已取消";
      }
      if (this.newshoplist[i].status == 7) {
        this.newshoplist[i].statuslsss = "待退款";
      }
      if (this.newshoplist[i].status == 8) {
        this.newshoplist[i].statuslsss = "部分退款";
      }
      if (this.newshoplist[i].status == 9) {
        this.newshoplist[i].statuslsss = "退款完成";
      }
      if (this.newshoplist[i].status == 10) {
        this.newshoplist[i].statuslsss = "售后驳回";
      }
      if (this.newshoplist[i].status == 11) {
        this.newshoplist[i].statuslsss = "取消通过退款中";
      }
    }

    if (this.active == 0) {
      this.nullname = "暂时还没有待发货订单~";
    }
    if (this.active == 1) {
      this.nullname = "暂时还没有待支付订单~";
    }
    if (this.active == 2) {
      this.nullname = "暂时还没有待发货订单~";
    }
    if (this.active == 3) {
      this.nullname = "暂时还没有待收货订单~";
    }
    this.sadasd(this.active);
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: "Mystyle",
      });
    },
    async b2borderemove(e) {
      const res = await b2borderemove(e);
      if (res.code == 200) {
        b2borderlist().then((res) => {
          this.b2list = res.data.records;
          this.newshoplist = this.b2list;
          this.newshoplist.forEach((item) => {
            item.goods.forEach((items) => {
              let imgobj = items.goodsImages.split(",");
              items.urlgoodss = imgobj[imgobj.length - 1];
            });
          });
          for (let i = 0; i < this.newshoplist.length; i++) {
            if (this.newshoplist[i].status == 1) {
              this.newshoplist[i].statuslsss = "待付款";
            }
            if (this.newshoplist[i].status == 2) {
              this.newshoplist[i].statuslsss = "待发货";
            }
            if (this.newshoplist[i].status == 3) {
              this.newshoplist[i].statuslsss = "已发货";
            }
            if (this.newshoplist[i].status == 4) {
              this.newshoplist[i].statuslsss = "已收货";
            }
            if (this.newshoplist[i].status == 5) {
              this.newshoplist[i].statuslsss = "已完成";
            }
            if (this.newshoplist[i].status == 6) {
              this.newshoplist[i].statuslsss = "已取消";
            }
            if (this.newshoplist[i].status == 7) {
              this.newshoplist[i].statuslsss = "待退款";
            }
            if (this.newshoplist[i].status == 8) {
              this.newshoplist[i].statuslsss = "部分退款";
            }
            if (this.newshoplist[i].status == 9) {
              this.newshoplist[i].statuslsss = "退款完成";
            }
            if (this.newshoplist[i].status == 10) {
              this.newshoplist[i].statuslsss = "售后驳回";
            }
            if (this.newshoplist[i].status == 11) {
              this.newshoplist[i].statuslsss = "取消通过退款中";
            }
          }
        });
      }
    },
    odernoclick(e) {
      if (e.status == 1) {
        Dialog.confirm({
          title: "取消订单",
          message: "您确定要取消订单吗",
        })
          .then(() => {
            let obj = {
              id: e.id,
            };
            this.b2borderemove(obj);
            Toast({
              message: "成功取消订单",
              duration: 600,
            });
          })
          .catch(() => {});
      } else {
        this.$router.push({
          name: "Logistics",
          query: {
            ids: e.id,
          },
        });
      }
    },
    waitpay(e) {
      this.$store.commit("oderclick", e.id);
      this.$router.push({
        name: "Waitpay",
        query: {
          active: this.active,
        },
      });
    },
    sadasd(e) {
      if (e == 0) {
        this.nullname = "暂时还没有待发货订单~";
        this.newshoplist = this.b2list.filter((item) => {
          return (
            item.status == 1 ||
            item.status == 2 ||
            item.status == 3 ||
            item.status == 4 ||
            item.status == 5 ||
            item.status == 6 ||
            item.status == 7 ||
            item.status == 8 ||
            item.status == 9
          );
        });
        this.nulllist = this.newshoplist;
      }
      if (e == 1) {
        this.nullname = "暂时还没有待支付订单~";
        this.newshoplist = this.b2list.filter((item) => {
          return item.status == 1;
        });
        this.nulllist = this.newshoplist;
      }
      if (e == 2) {
        this.nullname = "暂时还没有待发货订单~";
        this.newshoplist = this.b2list.filter((item) => {
          return item.status == 2;
        });
        this.nulllist = this.newshoplist;
      }
      if (e == 3) {
        this.nullname = "暂时还没有待收货订单~";
        this.newshoplist = this.b2list.filter((item) => {
          return item.status == 3;
        });
        this.nulllist = this.newshoplist;
      }
    },
    ggpires(e) {
      if (e.status == 1) {
        this.show = true;
        this.mainid = e.id;
      } else {
        Toast({
          message: "收货成功",
          duration: 700,
        });
      }
    },
    clssa(e) {},
    showPopup() {
      let obj = {
        id: this.mainid,
        payType: this.paylist,
      };
      this.b2AnOrder(obj);
      Toast.loading({
        message: "正在进行支付中...",
        forbidClick: true,
      });
      this.show = false;
    },

    async b2AnOrder(e) {
      const res = await b2AnOrder(e);
      this.payurls = res.data.payUrl;
      this.$router.push({
        name: "Paypage",
        query: {
          es: this.payurls,
          idp: this.mainid,
        },
      });
    },
    porpo() {},
  },
};
</script>
<style lang="scss" scoped>
.oder {
  width: 100%;
  height: 100vh;
  overflow-y: auto;
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
        border-radius: 50%;
        overflow: hidden;
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
    .waitpay-pricennull {
      width: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
      span {
        font-size: 13px;
        &:nth-of-type(1) {
          font-size: 18px;
          i {
            font-style: normal;
            font-size: 12px;
          }
        }
        &:nth-of-type(2) {
          margin-right: 5px;
        }
        &:nth-of-type(3) {
          margin-right: 10px;
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
              i {
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

.paywrap {
  width: 100%;
  overflow: hidden;
  background: #fff;
  padding: 20px;
  box-sizing: border-box;
  .payitems {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
    .payitems-left {
      display: flex;
      align-items: center;
      img {
        width: 25px;
        height: 25px;
        margin-right: 15px;
        border-radius: 5px;
      }
      p {
        font-size: 18px;
        color: #676568;
      }
    }
    .payitems-rad {
      width: 15px;
      height: 15px;
    }
  }
}
</style>
<style lang="scss" scoped>
.dsds .van-tabs__line {
  background-color:#000;
}
</style>