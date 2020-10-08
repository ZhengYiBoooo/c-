<template>
  <div class="details">
    <opInion
      :urls="'Refund'"
      :titleleft="'退款详情'"
      :titleright="''"
    ></opInion>
    <div class="details-title">
      <p>请等待商家处理</p>
      <p>还剩23时59分47秒</p>
    </div>
    <div class="details-wrap">
      <div class="details-wrap-info">
        <p>您已成功发起退款申请，请耐心等待商家处理</p>
        <p>商家拒绝了退款</p>
      </div>
      <div class="details-info">
        <p>商家同意或超时未处理，系统将退款给您</p>
        <p>如果商家拒绝，您可以修改退款申请后再次发起，商家 会重新处理</p>
        <div class="details-info-btn">
          <van-button
            type="primary"
            size="small"
            round
            plain
            color="#ff0066"
            class="detailsbtn"
            >修改申请</van-button
          >
          <van-button
            type="primary"
            size="small"
            round
            plain
            color="#ff0066"
            class="detailsbtn"
            @click="platform"
            >平台申诉</van-button
          >
        </div>
      </div>
      <div class="refund-details">
        <div class="refund-details-tit">
          <span>退款信息</span>
        </div>
        <div class="shopitems-wrap">
          <div class="shopitems" v-for="(item, index) in list" :key="index">
            <div class="shopitems-right-tit"></div>
            <div class="shopitems-right">
              <van-image round :src="item.url" class="shopitems-img" />
              <div class="shopitems-cont">
                <p>{{ item.shop }}</p>
                <p>中果 / {{ item.jin }}斤</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="shopitems-info">
        <div class="shopitems-info-content-wrap">
          <ul class="shopitems-info-content">
            <li>
              <span>退款金额</span>
              <span>￥19.9</span>
            </li>
            <li>
              <span>退款原因</span>
              <span>坏果烂果</span>
            </li>
            <li>
              <span>申请时间</span>
              <span>2020-05-06 15:05:36</span>
            </li>
            <li>
              <span>订单编号</span>
              <span>155338552411</span>
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
    };
  },
  methods:{
      platform(){
          this.$router.push({
              name:'Platform'
          })
      }
  }
};
</script>
<style lang="scss" scoped>
.details {
  width: 100%;
  overflow: hidden;
  background: #fff;
  padding-top: 46px;
  box-sizing: border-box;
  .details-title {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    background: #ff0066;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    p {
      width: 100%;
      color: #fff;
      font-size: 15px;
      &:nth-of-type(1) {
        margin-bottom: 30px;
      }
    }
  }
  .details-wrap {
    width: 100%;
    overflow: hidden;
    background: #fff;
    padding: 20px;
    box-sizing: border-box;
    .details-wrap-info {
      width: 100%;
      overflow: hidden;
      background: #fff;
      padding-bottom: 20px;
      border-bottom: 1px solid #eee;
      box-sizing: border-box;
      p {
        font-size: 15px;
      }
    }
    .details-info {
      width: 100%;
      overflow: hidden;
      background: #fff;
      padding-top: 10px;
      padding-bottom: 20px;
      border-bottom: 1px solid #eee;
      box-sizing: border-box;
      p {
        width: 100%;
        font-size: 14px;
        color: #999;
        margin-bottom: 10px;
      }
      .details-info-btn {
        width: 100%;
        overflow: hidden;
        background: #fff;
        display: flex;
        flex-direction: row-reverse;
        margin-top: 20px;
        .detailsbtn {
          width: 80px;
          height: 25px;
          letter-spacing: 1px;
          margin-left: 10px;
        }
      }
    }
    .refund-details {
      width: 100%;
      overflow: hidden;
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
        padding: 5px;
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
                flex: 5;
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