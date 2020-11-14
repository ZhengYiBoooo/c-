<template>
  <div class="platform">
    <opInion
      :urls="$route.query.pages == 'wait' ? 'Waitpay' : 'Details'"
      :titleleft="''"
      :titleright="''"
      :centertitle="'退款详情'"
    ></opInion>
    <div class="platform-wrap">
      <div class="platform-wrap-title">
        <span v-show="$route.query.pages == 'wait' ? false : true"
          >商家拒绝退款</span
        >
      </div>

      <div class="shopitems-wrap">
        <div class="shopitems">
          <div class="shopitems-right-tit"></div>
          <div class="shopitems-right">
            <van-image
              round
              :src="
                $route.query.idss == undefined
                  ? imgd
                  : deleoder.goods.goodsImages
              "
              class="shopitems-img"
            />
            <div class="shopitems-cont">
              <p>
                {{
                  $route.query.idss == undefined
                    ? oldlist.name
                    : deleoder.goods.name
                }}
              </p>
              <p>
                {{
                  $route.query.idss == undefined
                    ? oldlist.weight
                    : deleoder.goods.weight
                }}g
              </p>
              <p>
                x{{
                  $route.query.idss == undefined
                    ? oldlist.quantity
                    : deleoder.goods.quantity
                }}
              </p>
            </div>
            <div class="shopitems-speci">
              <p>
                ￥{{
                  (
                    ($route.query.idss == undefined
                      ? oldlist.price
                      : deleoder.goods.price) / 1000
                  ).toFixed(2)
                }}
              </p>
            </div>
          </div>
        </div>
        <div class="platform-reason">
          <span>退款原因：</span>
          <span @click="popup"
            >{{ numname }}
            <van-icon name="arrow" />
          </span>
        </div>
        <div class="platform-refund">
          <div class="platform-refund-title">
            <span>退款金额：</span>
            <span
              >￥{{
                $route.query.idss == undefined? (oldlist.total / 1000): (deleoder.goods.total / 1000)
              }}</span
            >
          </div>
          <div class="platform-refund-bottom">
            <input
              type="text"
              :placeholder="newmaxpirse"
              v-model="pirestui"
              @keyup="pagepirse(pirestui)"
            />
          </div>
        </div>
        <div class="platform-explain-wrap">
          <div class="platform-explain">
            <span>退款说明：</span>
            <van-field
              v-model="message"
              rows="1"
              autosize
              type="textarea"
              placeholder="选填"
            />
          </div>
        </div>
        <div class="platform-upload">
          <div class="platform-upload-title">
            <span>上传凭证：</span>
            <span>最多上传5张</span>
          </div>
          <van-uploader
            v-model="fileList"
            multiple
            :after-read="afterRead"
            :max-count="5"
            accept="image/*"
          />
        </div>
      </div>
    </div>
    <button class="submitBtn" @click="sumitshop(oldlist)">提交</button>
    <van-popup v-model="show" round position="bottom" class="popoup">
      <p>退款原因</p>
      <ul class="popoup-ul">
        <li v-for="(item, indexs) in popouplist" :key="indexs">
          <span>{{ item.name }}</span>
          <input
            type="radio"
            :value="item.name"
            name="reand"
            @click="boxcheck(item)"
          />
        </li>
      </ul>
    </van-popup>
  </div>
</template>
<script>
import opInion from "../../components/navbar/navbar.vue";
import {
  b2expinfolist,
  b2removeshop,
  b2endpoint,
  b2cordedetail,
} from "../https/api";
export default {
  components: {
    opInion,
  },
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
      ],

      fileList: [],
      popouplist: [
        {
          id: 1,
          boo: false,
          name: "坏果烂果",
        },
        {
          id: 2,
          boo: false,
          name: "未收到货",
        },
        {
          id: 3,
          boo: false,
          name: "拍多拍错",
        },
        {
          id: 4,
          boo: false,
          name: "商品变质/发霉/有异物",
        },
        {
          id: 5,
          boo: false,
          name: "少件",
        },
      ],
      message: "",
      show: false,
      numname: "请选择",
      delsinfo: {},
      delsinfoid: "",
      maxpirse: "",
      maxpirsefree: "",
      newmaxpirse: "",
      // 退款金额
      pirestui: "",

      uploadImages: [],
      imgurllist: [],
      pddlistimg: "",
      goodsnums: "",
      newshopss: [],
      oldlist: {},
      deleoder: {},
      imgd: "",
    };
  },
  async created() {
    this.delsinfoid = this.$route.query.isd;
    this.goodsnums = this.$route.query.idnx;
    let obj = {
      id: this.delsinfoid,
    };
    const res = await b2expinfolist(obj);
    this.delsinfo = res.data;
    this.oldlist = this.delsinfo.goods[this.goodsnums];

    let objinfo = {
      id: this.$route.query.idss,
    };
    const ress = await b2cordedetail(objinfo);
    this.deleoder = ress.data;

    if (this.$route.query.idss == undefined) {
      let sdasd = this.oldlist.goodsImages.split(",");
      this.imgd = sdasd[sdasd.length - 1];
      this.maxpirse = this.delsinfo.total / 1000;
      this.maxpirsefree = this.delsinfo.shippingFare / 1000;
      this.newmaxpirse = `可修改，最多￥${
        this.maxpirse
      }`;
    } else {
      let sdasd = this.deleoder.goods.goodsImages.split(",");
      this.imgd = sdasd[sdasd.length - 1];
      this.maxpirse = this.deleoder.total / 1000;
      this.maxpirsefree = this.deleoder.shippingFare / 1000;
      this.newmaxpirse = `可修改，最多￥${
        this.maxpirse 
      }`;
    }
  },
  methods: {
    afterRead(file) {
      let formData = new window.FormData();
      formData.append("file", file.file);
      this.b2endpoint(formData);
    },
    popup() {
      this.show = true;
    },
    boxcheck(e) {
      this.numname = e.name;
      this.show = false;
    },
    sumitshop(e) {
      let sum = e.total / 1000;
      let sumstatus = 0;
      if (this.pirestui >= sum) {
        this.pirestui = sum;
        sumstatus = 1;
      } else {
        sumstatus = 2;
      }
      let obj = {
        // 1 全部退款 2 部分退款
        applyType: sumstatus,
        bigApplyAmount: this.pirestui,
        cause: this.numname,
        goodsId: this.oldlist.id,
        userRemark: this.message,
        voucher: this.pddlistimg,
      };
      this.$router.push({
        name: "Waitpay",
      });
      this.b2removeshop(obj);
    },
    async b2removeshop(e) {
      const res = await b2removeshop(e);
      console.log(res);
    },

    async b2endpoint(e) {
      const res = await b2endpoint(e);
      this.imgurllist.push(res.data.link);
      this.pddlistimg = this.imgurllist.join(",");
    },

    pagepirse(e) {
      let sum = this.oldlist.total / 1000 + this.delsinfo.shippingFare / 1000;

      if (this.pirestui >= sum) {
        this.pirestui = sum;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.platform {
  width: 100%;
  overflow: hidden;
  background: #f5f5f5;
  padding-top: 46px;
  box-sizing: border-box;
  .platform-wrap {
    width: 100%;
    overflow: hidden;
    background: #f5f5f5;
    margin-top: 10px;
    padding-bottom: 70px;
    box-sizing: border-box;
    .platform-wrap-title {
      width: 100%;
      overflow: hidden;
      background: #fff;
      padding-bottom: 10px;
      padding-left: 15px;
      padding-right: 10px;
      box-sizing: border-box;
      span {
        font-size: 13px;
      }
    }

    .shopitems-wrap {
      width: 100%;
      overflow: hidden;
      background: #fff;
      box-sizing: border-box;
      .shopitems {
        display: flex;
        justify-content: space-between;
        align-items: center;
        overflow: hidden;
        width: 100%;
        padding: 10px;
        padding-top: 0;
        padding-bottom: 10px;
        box-sizing: border-box;
        background: #fff;
        border-radius: 10px;
        margin-bottom: 10px;
        flex-wrap: wrap;
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
          padding-bottom: 10px;
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
            right: 10px;
            top: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            p {
              font-size: 15px;
              font-weight: 100;
              font-family: Microsoft YaHei;
              color: #242424;
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
      .platform-reason {
        width: 100%;
        display: flex;
        padding: 10px;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        span {
          font-size: 14px;
          color: #5e5e5e;
          &:nth-of-type(2) {
            display: flex;
            align-items: center;
            color: #5e5e5e;
          }
        }
      }
      .platform-refund {
        width: 100%;
        overflow: hidden;
        padding: 10px;
        box-sizing: border-box;
        background: #fff;
        padding-bottom: 0;
        .platform-refund-title {
          width: 100%;
          overflow: hidden;
          background: #fff;
          span {
            font-size: 14px;
            color: #5e5e5e;
            &:nth-of-type(2) {
              font-size: 15px;
              margin-left: 20px;
              color: #242424;
            }
          }
        }
        .platform-refund-bottom {
          width: 100%;
          overflow: hidden;
          background: #fff;
          border-bottom: 1px solid #eee;
          input {
            width: 100%;
            overflow: hidden;
            background: #fff;
            border: none;
            padding: 20px 0 20px 0;
            box-sizing: border-box;
            font-size: 13px;
          }
        }
      }
      .platform-explain-wrap {
        padding: 10px;
        box-sizing: border-box;
        padding-top: 0;
      }
      .platform-explain {
        width: 100%;
        overflow: hidden;
        background: #fff;
        box-sizing: border-box;
        display: flex;
        border-bottom: 1px solid #eee;
        span {
          width: 100px;
          font-size: 14px;
          line-height: 44px;
          text-align: left;
          color: #5e5e5e;
        }
      }
      .platform-upload {
        width: 100%;
        overflow: hidden;
        background: #fff;
        padding: 10px;
        box-sizing: border-box;
        .platform-upload-title {
          width: 100%;
          overflow: hidden;
          padding: 10px 0 10px 0;
          box-sizing: border-box;
          span {
            font-size: 14px;
            color: #5e5e5e;
            &:nth-of-type(2) {
              font-size: 12px;
              margin-left: 20px;
              color: #999;
            }
          }
        }
      }
    }
  }
  .submitBtn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    border: none;
    background: #01b549;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 0 15px 0;
    box-sizing: border-box;
    font-size: 18px;
  }
  .popoup {
    width: 100%;
    overflow: hidden;
    padding: 20px;
    box-sizing: border-box;
    p {
      font-size: 16px;
      text-align: center;
    }
    .popoup-ul {
      width: 100%;
      overflow: hidden;
      li {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 0 20px 0;
        box-sizing: border-box;
        border-bottom: 1px solid #eee;
        span {
          font-size: 15px;
        }
      }
    }
  }
}
</style>