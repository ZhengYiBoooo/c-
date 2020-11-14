<template>
  <div class="refund">
    <opInion
      :urls="'Mystyle'"
      :titleleft="''"
      :titleright="''"
      :centertitle="'退款售后'"
    ></opInion>
    <van-empty description="还没有记录哦~" v-show="newredend.length == 0" />
    <div class="refund-wrap" v-show="newredend.length != 0">
      <div class="shopitems" v-for="(item, index) in newredend" :key="index">
        <div class="shopitems-right-tit">
          <!-- <p><span>{{item.createTime}}</span></p> -->
          <p><span>申请退款</span></p>
        </div>
        <div class="shopitems-right">
          <van-image
            round
            :src="item.goods.goodsImages"
            class="shopitems-img"
          />
          <div class="shopitems-cont">
            <p>{{ item.goods.name }}</p>
            <p>{{ item.goods.weight }}</p>
            <p>x{{ item.goods.quantity }}</p>
          </div>
          <div class="shopitems-speci">
            <p>￥{{ (item.goods.price / 1000).toFixed(2) }}</p>
          </div>
        </div>

        <div class="shopitems-bottom">
          <div class="shopit-pires">
            <p>
              <span>商品金额：</span>
              <span
                ><i>￥</i
                >{{ (item.goods.price / 1000) * item.goods.quantity }}</span
              >
            </p>
            <p>
              <span>实付金额：</span>
              <span><i>￥</i>{{ item.actualAmount }}</span>
            </p>
          </div>
        </div>
        <div class="shopitems-bottom">
          <van-button
            plain
            type="default"
            round
            size="small"
            @click="details(item.goods.id)"
            >查看详情</van-button
          >
          <!-- <van-button plain type="default" round size="small"
            >修改申请</van-button
          > -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import opInion from "../../components/navbar/navbar.vue";
import { b2exderrefundlist, b2dealWithAfterSales } from "../https/api";
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
      newredend: [],
    };
  },
  async created() {
    const res = await b2exderrefundlist();
    if (res.code == 200) {
      this.newredend = res.data.records;
    }
  },
  methods: {
    details(e) {
      this.$router.push({
        name: "Details",
        query: {
          ids: e,
        },
      });
    },
    deldebox() {
      let obj = {
        id,
        status,
      };
      this.b2dealWithAfterSales(obj);
    },
    async b2dealWithAfterSales(e) {
      const res = await b2dealWithAfterSales(e);
    },
  },
};
</script>
<style lang="scss" scoped>
.refund {
  width: 100%;
  height: 100vh;
  background: #f5f5f5;
  padding-top: 46px;
  box-sizing: border-box;
  overflow: hidden;
  overflow-y: auto;
  .refund-wrap {
    width: 100%;
    overflow: hidden;
    // padding: 20px;
    background: #f5f5f5;
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
        border-bottom: 1px solid #eee;
        padding-bottom: 10px;
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
          right: 0;
          top: 0px;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          p {
            font-size: 18px;
            font-weight: 100;
            font-family: Microsoft YaHei;
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

        .shopit-pires {
          width: 100%;
          padding-bottom: 20px;
          overflow: hidden;
          box-sizing: border-box;
          background: #fff;
          p {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-top: 10px;
            &:last-child {
              span {
                &:last-child {
                  color: #f25047;
                }
                i {
                  color: #f25047;
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
}
</style>