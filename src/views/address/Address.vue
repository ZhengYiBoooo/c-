<template>
  <div class="address">
    <!-- 导航栏 -->
    <van-nav-bar
      left-arrow
      @click-left="onClickLeft"
      id="addTop"
      title="填写订单"
      ><template #left>
        <van-icon name="arrow-left" size="18" />
      </template>
    </van-nav-bar>

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
    <!-- 提交订单 -->
    <div class="Totalprice" v-show="padyUrl == '' ? true : false">
      <p>
        <span>商品金额</span><span>￥{{ (numsum / 1000).toFixed(2) }}</span>
      </p>
      <p>
        <span>配送费</span
        ><span>{{ bgm == false ? "￥" + goodsfree : ssss }}</span>
      </p>
      <div class="Totalprice-sum">
        <van-button
          round
          type="info"
          color="#01B44A"
          class="btn"
          @click="showssss"
          :disabled="bgm == true"
          >提交订单</van-button
        >
        <span
          >实付
          <span
            >￥{{
              goodsfree == 0
                ? (numsum / 1000).toFixed(2)
                : (numsum / 1000 + goodsfree).toFixed(2)
            }}</span
          ></span
        >
      </div>
    </div>
    <div class="wrap" v-show="padyUrl == '' ? true : false">
      <!-- 订单中心 -->
      <div class="add-body">
        <!-- 订单地址选项 -->
        <div class="add-list-edit-ol" v-if="bgm == true">
          <div class="add-list-edit-ol-ress" @click="clickicress">
            <p>请选择收货地址</p>
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="add-list-edit" v-if="bgm == false">
          <div class="add-list-right">
            <div class="add-right-tit">
              <span>{{ newlsitfshop.shippingName }}</span>
              <span>{{ newlsitfshop.shippingTel }}</span>
              <span>{{ newlsitfshop.label }}</span>
              <span v-show="newlsitfshop.isDefault == 1 ? true : false"
                >默认</span
              >
            </div>
            <div class="add-right-bottom">
              <p>
                <span>{{ newlsitfshop.shippingProvinceId }}</span>
                <span>{{ newlsitfshop.shippingCityId }}</span>
                <span>{{ newlsitfshop.shippingCountryId }}</span>
                {{ newlsitfshop.shippingAddress }}
              </p>
            </div>

            <van-icon
              name="arrow"
              class="add-right-bottom-icon"
              @click="receive"
            />
          </div>
        </div>
        <!-- 订单商品列表 -->
        <div class="add-list-shop">
          <div
            class="shopitems"
            v-for="(item, index) in newshoplist"
            :key="index"
          >
            <div class="shopitems-right">
              <van-image round :src="item.thumbnail" class="shopitems-img" />
              <div class="shopitems-cont">
                <p>{{ item.goodsName }}</p>
                <p>{{ item.weight }}</p>
              </div>
              <div class="shopitems-speci">
                <p>￥{{ (item.price / 1000).toFixed(2) }}</p>
                <span>x{{ item.goodsCount }}</span>
              </div>
            </div>
          </div>
          <div class="distribution">
            <div class="distribution-con">
              <van-cell-group>
                <van-field
                  v-model="value"
                  label="订单备注"
                  placeholder="若有所需可在此处填写"
                />
              </van-cell-group>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import maps from "../js/map";
import $ from "jquery";
import {
  userexpress,
  userexpsubmit,
  b2bordersubmit,
  shopcarfree,
  userexpsuinfos2,
} from "../https/api";
export default {
  data() {
    return {
      value: "",
      newlist: [],
      num: 0,
      show: false,
      bgm: false,
      ssss: "请先添加收货地址",
      maplist: {},
      searchResult: [],
      shopaddlist: [],
      newshoplist: [],
      addaress: [],
      padyUrl: "",
      goodfree: {
        ids: "",
        countryId: "",
      },
      goodsfree: "",
      newlsitfshop: {},
      b2expreslist: [],
      paylist: "",
      payurls: "",
      sdasd: {},
      lisdadwq: {},
      ssssss: {},
      qqqqq: "",
      osodsd: {},
    };
  },
  created() {
    this.userexpress();
    this.maplist = maps;
    let yysd=JSON.parse(this.$store.state.addresslist);
    // console.log(isNaN(
    //     parseFloat(JSON.parse(this.$store.state.addresslist)[0].shippingCountryId)
    //   ),
    //   "22222222222222222222222222222222"
    // );
    this.newshoplist = JSON.parse(this.$store.state.shopcar);
    let statusId = [];
    this.newshoplist.map((item) => {
      statusId.push(item.goodsId);
    });
    statusId = statusId.join(",");
    this.goodfree.ids = statusId;


    if (
      isNaN(
        parseFloat(JSON.parse(this.$store.state.addresslist).shippingCountryId)
      ) == false
    ) {
      this.newlsitfshop = JSON.parse(this.$store.state.addresslist);
      console.log(this.newlsitfshop, "33333333333333");
      this.newlsitfshop.shippingProvinceId = this.maplist.province_list[
        this.newlsitfshop.shippingProvinceId + "0000"
      ];
      this.newlsitfshop.shippingCityId = this.maplist.city_list[
        this.newlsitfshop.shippingCityId + "00"
      ];

      this.newlsitfshop.shippingCountryId = this.maplist.county_list[
        this.newlsitfshop.shippingCountryId
      ];
    } else {
      this.newlsitfshop = JSON.parse(this.$store.state.addresslist);
      console.log(this.newlsitfshop,'ppppppppppppppppp')
    }

    if (this.$store.state.addresslist.length != 0) {
      let sdobhs = {
        id: JSON.parse(this.$store.state.addresslist).id,
      };
      if (sdobhs.id != undefined && this.$store.state.addresslist != "") {
        userexpsuinfos2(sdobhs).then((res) => {
          this.goodfree.countryId = res.data.shippingProvinceId;
          shopcarfree(this.goodfree).then((ress) => {
            this.goodsfree = ress.data.fee / 1000;
          });
        });
      }
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: "Shopcar",
      });
    },

    addarea(e) {
      this.addaress = e;
    },

    onDelete() {
      Toast("delete");
    },

    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区",
          },
        ];
      } else {
        this.searchResult = [];
      }
    },

    showssss() {
      this.show = true;
    },

    showPopup() {
      let mnmn = this.newshoplist;
      mnmn.map((item) => {
        item.quantity = item.goodsCount;
        item.servicerGoodsId = item.servicerGoodsId;
      });
      let b2bord = {
        goodsDTOList: mnmn,
        noteContent: this.value,
        payType: this.paylist,
        shippingFare: this.goodsfree,
        total: this.goodsfree + this.numsum / 1000,
        shippingId: this.newlsitfshop.id,
        storeId: this.$store.state.serverid,
      };
      b2bordersubmit(b2bord).then((res) => {
        if (res.code == 200) {
          console.log(res, "dingdan");
          // this.payurls = res.data.payUrl;
          this.padyUrl = res.data.payUrl;
          // window.open(this.payurls,'_self');
          this.$router.push({
            name: "Paypage",
            query: {
              es: this.padyUrl,
              idp: res.data.shopId,
            },
          });
          Toast({
            message: "提交订单...",
            duration: 500,
            position: "bottom",
          });
        } else {
          Toast({
            message: res.msg,
            duration: 1000,
            position: "bottom",
          });
        }
      });
      this.show = false;
    },

    receive() {
      this.$router.push({
        name: "Receive",
        query: {
          tag: "Receive",
        },
      });
    },
    clssa(e) {},
    async userexpress() {
      const res = await userexpress();
      let yy = res.data.records;
      console.log(res);
      let sss = yy.filter((item) => {
        return item.isDefault == 1;
      });
      this.ssssss = sss[0];
      if (this.$store.state.addressId == "") {
        this.lisdadwq = res.data.records[res.data.records.length - 1];
      } else {
        this.lisdadwq = res.data.records[this.$store.state.addressId];
      }
      // 判断收货默认地址和是否有地址
      let objdefault = res.data.records;
      let objs = objdefault.filter((item) => {
        return item.isDefault == 1;
      });
      // if (objs.length <= 0) {
      //   this.shopaddlist = res.data.records[0];
      // } else {
      //   for (var i = 0; i < objs.length; i++) {
      //     this.shopaddlist = objs[0];
      //   }
      // }
      if (res.data.records.length <= 0 || objs.length <= 0) {
        this.bgm = true;
      } else {
        this.bgm = false;
      }

      // if (this.shopaddlist != undefined) {
      //   this.shopaddlist.shippingProvinceId = this.maplist.province_list[
      //     this.shopaddlist.shippingProvinceId + "0000"
      //   ];
      //   this.shopaddlist.shippingCityId = this.maplist.city_list[
      //     this.shopaddlist.shippingCityId + "00"
      //   ];
      //   this.shopaddlist.shippingCountryId = this.maplist.county_list[
      //     this.shopaddlist.shippingCountryId
      //   ];
      // }
    },
    porpo() {},
    async b2bordersubmit(e) {
      const res = await b2bordersubmit(e);
      if (res.code == 200) {
      } else {
      }
    },
    clickicress() {
      this.$router.push({
        name: "Editress",
        query: {
          num: 10,
          ress: 1,
        },
      });
    },
  },
  computed: {
    numsum() {
      var n = 0;
      this.newshoplist.forEach((item) => {
        return (n += item.price * item.goodsCount);
      });
      return n;
    },
  },
};
</script>
<style lang="scss" scoped>
.address {
  #addTop {
    background: #f7f7f7;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 19;
    width: 100%;
    i {
      color: #333;
    }
    span {
      margin-left: 40px;
    }
  }
  .wrap {
    width: 100%;
    background: #f7f7f7;
    padding-bottom: 200px;
    padding-top: 46px;
    .add-body {
      width: 100%;
      background: #f7f7f7;
      padding: 10px;
      box-sizing: border-box;
      .add-list-edit {
        width: 100%;
        background: #fff;
        border-radius: 10px;
        display: flex;
        align-items: center;
        padding: 10px;
        box-sizing: border-box;
        .add-list-img {
          width: 40px;
          height: 40px;
          .shopitems-img {
            height: 40px;
            width: 40px;
          }
        }
        .add-list-right {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          padding-left: 10px;
          box-sizing: border-box;
          position: relative;
          .add-right-tit {
            width: 100%;
            span {
              &:nth-of-type(1) {
                font-size: 15px;
                margin-right: 20px;
              }
              &:nth-of-type(2) {
                font-size: 10px;
                color: #777777;
              }
              &:nth-of-type(3) {
                font-size: 14px;
                color: #fff;
                position: absolute;
                right: 20px;
                top: 5px;
                background: #00cc66;
                padding: 0 10px 0 10px;
              }
              &:nth-of-type(4) {
                font-size: 14px;
                color: #fff;
                position: absolute;
                right: 70px;
                top: 5px;
                background: #c5c5c5;
                padding: 0 10px 0 10px;
              }
            }
          }
          .add-right-bottom {
            width: 100%;
            margin-top: 6px;
            p {
              font-size: 14px;
              max-width: 75%;
              overflow: hidden;
              word-wrap: break-word;
            }
          }

          .add-right-bottom-icon {
            position: absolute;
            right: -6px;
          }
        }
      }
      .add-list-shop {
        width: 100%;
        background: #fff;
        border-radius: 10px;
        margin-top: 10px;
        overflow: hidden;
        .shopitems {
          display: flex;
          justify-content: space-between;
          align-items: center;
          overflow: hidden;
          width: 100%;
          padding-top: 20px;
          padding-bottom: 20px;
          padding-left: 10px;
          box-sizing: border-box;
          .shopitems-right {
            width: 95%;
            padding-left: 20px;
            display: flex;
            align-items: center;
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
                  color: #333;
                  font-family: Microsoft YaHei;
                }
              }
            }
            .shopitems-speci {
              position: absolute;
              right: 10px;
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
        }
        .distribution {
          overflow: hidden;
          width: 100%;
          padding: 20px;
          box-sizing: border-box;
          .distribution-tit {
            font-size: 15px;
            text-align: right;
            color: #7777;
          }
          .distribution-con {
            span {
              &:nth-of-type(1) {
                font-size: 13px;
                margin-right: 30px;
              }
              &:nth-of-type(2) {
                font-size: 13px;
                color: #7777;
              }
            }
          }
        }
      }
    }
  }
  .Totalprice {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #fff;
    z-index: 100;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 10px;
    overflow: hidden;
    p {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 10px 0 10px 0;
      span {
        font-size: 15px;
        font-weight: 100;
      }
    }
    .Totalprice-sum {
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
      margin-top: 10px;
      span {
        font-size: 14px;
        span {
          color: red;
        }
      }
      .btn {
        margin-left: 20px;
      }
    }
  }
  .add-list-edit-ol {
    .add-list-edit-ol-add {
      padding: 0;
      background: #fff;
      border-radius: 10px;
      overflow: hidden;
      .van-address-edit {
        .van-button--danger {
          background: #fff;
        }
      }
    }
    .add-list-edit-ol-ress {
      width: 100%;
      background: #fff;
      border-radius: 10px;
      padding: 10px 15px 10px 20px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      p {
        font-size: 15px;
      }
      i {
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

.ifms {
  width: 100%;
  height: 100vh;
  #page {
    background: red;
  }
}
</style>