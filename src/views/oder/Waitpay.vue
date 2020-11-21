<template>
  <div class="waitpay">
    <!-- 导航栏 -->
    <opInion
      :urls="'Oderall'"
      :titleleft="''"
      :titleright="''"
      :centertitle="'订单详情'"
    ></opInion>

    <van-popup
      v-model="show"
      round
      position="bottom"
      @close="porpo"
    >
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
          :disabled="paylist != 2 && paylist != 1&&paylist != 5&&paylist != 6"
          >立即支付</van-button
        >
      </div>
    </van-popup>
    <div class="waitpa-wrap">
      <p class="wait-wrap-top-p">
        <span>{{ statusls }}</span>

        <van-icon name="arrow" />
      </p>
      <div class="wait-wrap" v-show="active == 1 || infomaster.status == 1">
        <p>等待买家付款</p>
        <p>30分钟内未支付订单自动取消</p>

        <div class="shopitems-bottom">
          <van-button
            type="primary"
            round
            size="small"
            @click="paysumit(infomaster.id)"
            >付款</van-button
          >
          <van-button
            plain
            type="default"
            round
            size="small"
            @click="cancel(infomaster.id)"
            >取消订单</van-button
          >
          <span class="shopimore">更多</span>
        </div>
      </div>

      <div class="wait-deliver" v-show="infomaster.status == 3">
        <div class="wait-deliver-img">
          <img src="../../assets/waitdeli.png" alt="" class="logo" />
        </div>
        <div class="wait-deliver-content">
          <p>包裹正在等待揽收</p>
          <p>2020-08-25 10:03:59</p>
        </div>
        <div class="wait-deliver-icon" @click="logistics(infomaster.id)">
          <van-icon name="arrow" color="#999" />
        </div>
      </div>
      <div class="address">
        <div class="wait-deliver-img" v-show="infomaster.status == 3">
          <img src="../../assets/position.png" alt="" class="logo" />
        </div>
        <div class="address-icon" v-show="infomaster.status != 3">
          <van-icon name="location-o" />
          <span>收货地址：</span>
        </div>
        <div class="address-text">
          <p>
            {{
              infomaster.shippingProvinceId == infomaster.shippingCityId
                ? infomaster.shippingCityId +
                  infomaster.shippingCountryId +
                  infomaster.shippingAddress
                : infomaster.shippingProvinceId +
                  infomaster.shippingCityId +
                  infomaster.shippingCountryId +
                  infomaster.shippingAddress
            }}
          </p>
          <p>{{ infomaster.shippingTel }}</p>
          <p>{{ infomaster.shippingName }}</p>
        </div>
      </div>
      <div class="shopitems" v-for="(item, index) in goodslist" :key="index">
        <div class="shopitems-right">
          <van-image round :src="item.urlgoodss" class="shopitems-img" />
          <div class="shopitems-cont">
            <p>{{ item.name }}</p>
            <p>{{ item.weight }}</p>
            <p>x{{ item.quantity }}</p>
          </div>
          <div class="shopitems-speci">
            <p>￥{{ (item.price / 1000).toFixed(2) }}</p>
            <van-button
              type="default"
              size="small"
              plain
              hairline
              round
              style="
                border-color: #999;
                position: absolute;
                right: 0;
                top: 40px;
                width: 77px;
              "
              v-show="infomaster.status == 2 || infomaster.status == 3"
              @click="deldeshop($store.state.oderinfoid, index, infomaster.id)"
              >{{
                infomaster.status == 2 ? "取消订单" : "申请退款"
              }}</van-button
            >
          </div>
        </div>
      </div>
      <div class="shopit-pires">
        <p>
          <span>商品金额：</span>
          <span><i>￥</i>{{ infomaster.total / 1000 }}</span>
        </p>
        <p>
          <span>配送费：</span>
          <span><i>￥</i>{{ infomaster.shippingFare / 1000 }}</span>
        </p>
        <p>
          <span>实付金额：</span>
          <span
            ><i>￥</i
            >{{
              infomaster.total / 1000 + infomaster.shippingFare / 1000
            }}</span
          >
        </p>
      </div>
      <div class="shopitems-info">
        <div class="shopitems-info-title">
          <span>订单信息</span>
        </div>
        <div class="shopitems-info-content-wrap">
          <ul class="shopitems-info-content">
            <li>
              <span>订单编号：</span>
              <span>{{ infomaster.orderNumAlias }}</span>
            </li>
            <li>
              <span>支付时间：</span>
              <span>{{
                infomaster.payTime == "" ? "暂未支付" : infomaster.payTime
              }}</span>
            </li>
            <li>
              <span>交易单号：</span>
              <span>{{
                infomaster.shippingNo == ""
                  ? "暂未进行交易"
                  : infomaster.shippingNo
              }}</span>
            </li>
            <li>
              <span>创建时间：</span>
              <span>{{ infomaster.createTime }}</span>
            </li>
            <li>
              <span>备注信息：</span>
              <span>{{
                infomaster.noteContent == ""
                  ? "暂无备注"
                  : infomaster.noteContent
              }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import { Dialog } from "vant";
import opInion from "../../components/navbar/navbar.vue";
import {
  b2expinfolist,
  shopcarfree,
  b2borderemove,
  b2AnOrder,
} from "../https/api";
import maps from "../js/map";
export default {
  components: {
    opInion,
  },
  data() {
    return {
      active: "",
      status: "",
      infomaster: {},
      statusls: "",
      goodslist: [],
      optinoID: "",
      maplist: {},
      show: false,

      paylist: "",
      mainid: "",
      rocallTime: "",
    };
  },
  async created() {
    this.maplist = maps;
    this.optinoID = this.$store.state.oderinfoid;
    let obj = {
      id: this.optinoID,
    };
    const ress = await b2expinfolist(obj);
    this.infomaster = ress.data;

    this.infomaster.goods.forEach((items) => {
      let imgobj = items.goodsImages.split(",");
      items.urlgoodss = imgobj[imgobj.length - 1];
    });
    this.active = this.$route.query.active;
    this.goodslist = this.infomaster.goods;
    this.infomaster.shippingProvinceId = this.maplist.province_list[
      this.infomaster.shippingProvinceId + "0000"
    ];
    this.infomaster.shippingCityId = this.maplist.city_list[
      this.infomaster.shippingCityId + "00"
    ];
    this.infomaster.shippingCountryId = this.maplist.county_list[
      this.infomaster.shippingCountryId
    ];
    // shopcarfree
    if (this.infomaster.status == 1) {
      this.statusls = "待付款";
    }
    if (this.infomaster.status == 2) {
      this.statusls = "待发货";
    }
    if (this.infomaster.status == 3) {
      this.statusls = "已发货";
    }
    if (this.infomaster.status == 4) {
      this.statusls = "已收货";
    }
    if (this.infomaster.status == 5) {
      this.statusls = "已完成";
    }
    if (this.infomaster.status == 6) {
      this.statusls = "已取消";
    }
    if (this.infomaster.status == 7) {
      this.statusls = "待退款";
    }
    if (this.infomaster.status == 8) {
      this.statusls = "部分退款";
    }
    if (this.infomaster.status == 9) {
      this.statusls = "退款完成";
    }

    if (this.infomaster.status == 10) {
      this.statusls = "售后驳回";
    }
    if (this.infomaster.status == 11) {
      this.statusls = "取消通过退款中";
    }

    let dtsad = new Date();
    let yy = [dtsad.getFullYear(), dtsad.getMonth() + 1, dtsad.getDate()];
    let bb = [dtsad.getHours(), dtsad.getMinutes(), dtsad.getSeconds()];
    let YMCA = [yy.join("-"), bb.join(":")].join(" ");
    this.ComputetTime(YMCA, this.infomaster.createTime);
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: "Oderall",
      });
    },
    async b2borderemove(e) {
      const res = await b2borderemove(e);
      if (res.code == 200) {
        this.$router.push({
          name: "Oderall",
        });
      }
    },
    cancel(e) {
      Dialog.confirm({
        title: "取消订单",
        message: "您确定要取消订单吗",
      })
        .then(() => {
          let obj = {
            id: e,
          };
          this.b2borderemove(obj);
        })
        .catch(() => {
          // on cancel
        });
    },
    logistics(e) {
      this.$router.push({
        name: "Logistics",
        query: {
          serId: e,
        },
      });
    },

    porpo() {},
    // 申请退款
    deldeshop(e, y, s) {
      if (this.infomaster.status == 2) {
        Dialog.confirm({
          title: "取消订单",
          message: "您确定要取消订单吗",
        })
          .then(() => {
            let obj = {
              id: s,
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
          name: "Platform",
          query: {
            isd: e,
            pages: "wait",
            idnx: y,
          },
        });
      }
    },
    paysumit(e) {
      this.show = true;
      this.mainid = e;
    },
    showPopup() {
      let obj = {
        id: this.mainid,
        payType: this.paylist,
      };
      this.b2AnOrder(obj);
      this.show = false;
    },

    clssa(e) {},
    async b2AnOrder(e) {
      const res = await b2AnOrder(e);
      this.$router.push({
        name: "Paypage",
        query: {
          es: res.data.payUrl,
          idp: this.mainid,
        },
      });
    },

    ComputetTime(data, dataws) {
      let st = data.replace(/\-/g, "/"), //当前服务器时间
        ct = dataws.replace(/\-/g, "/"); //创建订单时间
      let ts = new Date(st).getTime(),
        tc = new Date(ct).getTime();
      let cm = 30 * 60 * 1000 - (ts - tc);
      this.runBack(cm);
    },
    runBack(cm) {
      if (cm > 0) {
        cm > 60000
          ? (this.rocallTime =
              (new Date(cm).getMinutes() < 10
                ? "0" + new Date(cm).getMinutes()
                : new Date(cm).getMinutes()) +
              ":" +
              (new Date(cm).getSeconds() < 10
                ? "0" + new Date(cm).getSeconds()
                : new Date(cm).getSeconds()))
          : (this.rocallTime =
              "00:" +
              (new Date(cm).getSeconds() < 10
                ? "0" + new Date(cm).getSeconds()
                : new Date(cm).getSeconds()));
        let _msThis = this;
        setTimeout(function () {
          cm -= 1000;
          _msThis.runBack(cm);
        }, 1000);
      } else {
        console.log(123);
      }
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
  background: #f6f6f6;
  padding-bottom: 20px;
  .waitpa-wrap {
    background: #f6f6f6;
    .wait-wrap-top-p {
      padding: 20px;
      box-sizing: border-box;
      padding-top: 15px;
      padding-bottom: 15px;
      display: flex;
      align-items: center;
      span {
        font-size: 25px;
        font-weight: bold;
        letter-spacing: 1px;
        color: #555;
        background: #f6f6f6;
        margin-right: 10px;
      }
      i {
        font-size: 16px;
        color: #555;
        padding-top: 4px;
        box-sizing: border-box;
      }
    }
    .wait-wrap {
      overflow: hidden;
      width: 100%;
      padding: 20px;
      box-sizing: border-box;
      padding-bottom: 10px;
      box-sizing: border-box;
      background: #fff;
      flex-wrap: wrap;
      margin-bottom: 20px;
      p {
        &:nth-of-type(1) {
          font-size: 16px;
          font-weight: normal;
          margin-bottom: 10px;
          color: #383838;
        }
        &:nth-of-type(2) {
          font-size: 14px;
          font-weight: normal;
          color: #383838;
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
          margin-top: 20px;
          &:nth-of-type(1) {
            margin-left: 10px;
          }
        }
        .shopimore {
          position: absolute;
          left: 0;
          bottom: 6px;
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
    .wait-deliver {
      width: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
      padding: 20px;
      box-sizing: border-box;
      box-sizing: border-box;
      background: #fff;
      margin-bottom: 20px;
      .wait-deliver-img {
        width: 40px;
        height: 40px;
        overflow: hidden;
        border-radius: 50%;
        margin-right: 25px;
        background: #00b047;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 23px;
          height: 18px;
        }
      }
      .wait-deliver-content {
        overflow: hidden;
        display: flex;
        width: 200px;
        align-items: center;
        flex-wrap: wrap;
        margin-right: 40px;
        p {
          width: 100%;
          font-size: 15px;
          &:nth-of-type(1) {
            color: #242424;
            font-size: 16px;
            margin-bottom: 10px;
            letter-spacing: 1px;
          }
          &:nth-of-type(2) {
            color: #999;
          }
        }
      }
      .wait-deliver-icon {
        display: flex;
        align-items: center;
      }
    }
    .address {
      padding: 20px;
      box-sizing: border-box;
      width: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      background: #fff;
      align-items: flex-start;
      margin-bottom: 10px;

      .wait-deliver-img {
        width: 40px;
        height: 40px;
        overflow: hidden;
        border-radius: 50%;
        margin-right: 25px;
        background: #00b047;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 20px;
        }
      }
      .address-icon {
        overflow: hidden;
        display: flex;
        align-items: center;
        margin-right: 15px;
        i {
          font-size: 15px;
          margin-right: 3px;
          color: #00ae46;
        }
        span {
          font-size: 14px;
          color: #666;
        }
      }
      .address-text {
        font-size: 14px;
        color: #666;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        flex: 1;
        p {
          width: 230px;
          max-width: 230px;
          margin-bottom: 7px;
          word-break: break-all;
          overflow: hidden;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }

    .shopitems {
      padding: 20px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      overflow: hidden;
      width: 100%;
      padding-top: 20px;
      padding-bottom: 20px;
      background: #fff;
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
    }
    .shopit-pires {
      width: 100%;
      padding: 20px;
      box-sizing: border-box;
      overflow: hidden;
      background: #fff;
      margin-bottom: 20px;
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
    .shopitems-info {
      width: 100%;
      padding: 20px;
      box-sizing: border-box;
      overflow: hidden;
      padding-top: 10px;
      box-sizing: border-box;
      background: #fff;
      .shopitems-info-title {
        width: 100%;
        overflow: hidden;
        span {
          font-size: 18px;
          font-weight: 550;
          letter-spacing: 1px;
          color: #383838;
        }
      }
      .shopitems-info-content-wrap {
        margin-top: 10px;
        width: 100%;
        overflow: hidden;
        display: flex;
        .shopitems-info-content {
          width: 100%;
          li {
            font-size: 15px;
            letter-spacing: 1px;
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            span {
              &:nth-of-type(1) {
                color: #5e5e5e;
              }
              &:nth-of-type(2) {
                color: #242424;
              }
            }
          }
        }
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