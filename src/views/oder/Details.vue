<template>
  <div class="details">
    <opInion
      :urls="'Refund'"
      :titleleft="''"
      :titleright="''"
      :centertitle="'退款详情'"
    ></opInion>
    <div class="details-title">
      <p>请等待商家处理</p>
      <p>还剩23时59分47秒</p>
    </div>
    <div class="details-wrap">
      <div class="details-wrap-info">
        <p>您已成功发起退款申请，请耐心等待商家处理</p>
      </div>
      <div class="details-info">
        <p>商家同意或超时未处理，系统将退款给您</p>
        <p>如果商家拒绝，您可以修改退款申请后再次发起，商家会重新处理</p>
        <div class="details-info-btn">
          <van-button
            type="default"
            size="normal"
            round
            plain
            class="detailsbtn"
            @click="platform(shoplistinfo.goods.id)"
            >修改申请</van-button
          >
        </div>
      </div>
      <div class="refund-details">
        <div class="refund-details-tit">
          <span>退款信息</span>
        </div>
        <div class="shopitems-wrap">
          <div class="shopitems">
            <div class="shopitems-right-tit"></div>
            <div class="shopitems-right">
              <van-image round :src="shoplistinfo.goods.goodsImages" class="shopitems-img" />
              <div class="shopitems-cont">
                <p>{{ shoplistinfo.goods.name }}</p>
                <p>{{ shoplistinfo.goods.weight}}</p>
                <p>x{{ shoplistinfo.goods.quantity }}</p>
              </div>
              <div class="shopitems-speci">
                <p>￥{{ (shoplistinfo.goods.price/1000).toFixed(2) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="shopitems-info">
        <div class="shopitems-info-content-wrap">
          <ul class="shopitems-info-content">
            <li>
              <span>退款金额：</span>
              <span>￥{{shoplistinfo.applyAmount/1000}}</span>
            </li>
            <li>
              <span>退款原因：</span>
              <span>{{shoplistinfo.cause}}</span>
            </li>
            <li>
              <span>申请时间：</span>
              <span>{{shoplistinfo.createTime}}</span>
            </li>
            <li>
              <span>订单编号：</span>
              <span>{{shoplistinfo.refundOrderNumAlias}}</span>
            </li>
          </ul>
        </div>

        <div class="details-info-btn">
          <van-button
            type="primary"
            size="small"
            round
            plain
            color="#999"
            class="detailsbtn"
            >官方客服</van-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import opInion from "../../components/navbar/navbar.vue";
import { b2cordedetail } from "../https/api";
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
      shoplistinfo:{},
      optionID:''
    };
  },
  async created() {
    this.optionID=this.$route.query.ids;
    let obj={
      id:optionID
    }
    const res = await b2cordedetail(obj);
    this.shoplistinfo=res.data;
  },
  methods: {
    platform(e) {
      this.$router.push({
        name: "Platform",
        query:{
          idss:e
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.details {
  width: 100%;
  overflow: hidden;
  background: #f7f4f8;
  padding-top: 46px;
  box-sizing: border-box;
  .details-title {
    width: 100%;
    padding: 20px;
    padding-top: 25px;
    padding-bottom: 25px;
    box-sizing: border-box;
    background: #01b44a;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    p {
      width: 100%;
      color: #fff;
      font-size: 15px;
      &:nth-of-type(1) {
        margin-bottom: 10px;
      }
    }
  }
  .details-wrap {
    width: 100%;
    overflow: hidden;
    background: #f7f4f8;
    // padding: 20px;
    box-sizing: border-box;
    margin-top: 10px;
    .details-wrap-info {
      width: 100%;
      overflow: hidden;
      background: #fff;
      padding: 20px;
      box-sizing: border-box;
      p {
        font-size: 15px;
      }
    }
    .details-info {
      width: 100%;
      overflow: hidden;
      background: #fff;
      padding: 20px;
      box-sizing: border-box;
      margin-bottom: 10px;
      p {
        width: 100%;
        font-size: 14px;
        color: #999;
        margin-bottom: 5px;
      }
      .details-info-btn {
        width: 100%;
        overflow: hidden;
        background: #fff;
        display: flex;
        flex-direction: row-reverse;
        margin-top: 20px;
        .detailsbtn {
          height: 35px;
          letter-spacing: 1px;
          margin-left: 10px;
        }
      }
    }
    .refund-details {
      width: 100%;
      overflow: hidden;
      padding: 20px;
      box-sizing: border-box;
      background: #fff;
      .refund-details-tit {
        width: 100%;
        overflow: hidden;
        background: #fff;
        padding: 10px 0 20px 0;
        span {
          font-size: 14px;
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
                  margin: 5px 0 2px 0;
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
              top: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-wrap: wrap;
              p {
                font-size: 15px;
                font-weight: 100;
                font-family: Microsoft YaHei;
                color: #000;
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
    }

    .shopitems-info {
      width: 100%;
      overflow: hidden;
      padding: 20px;
      padding-top: 10px;
      background: #fff;
      border-top: 1px solid #f5f5f5;
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
        width: 100%;
        overflow: hidden;
        display: flex;
        .shopitems-info-content {
          width: 100%;
          li {
            width: 100%;
            font-size: 15px;
            letter-spacing: 1px;
            display: flex;
            margin-bottom: 10px;
            span {
              color: #999;
              &:nth-of-type(1) {
                flex: 2;
              }
              &:nth-of-type(2) {
                flex: 6;
                color: #242424;
              }
            }
          }
        }
      }

      .details-info-btn {
        width: 100%;
        overflow: hidden;
        background: #fff;
        display: flex;
        flex-direction: row-reverse;
        .detailsbtn {
          width: 80px;
          height: 25px;
          letter-spacing: 1px;
        }
      }
    }
  }
}
</style>