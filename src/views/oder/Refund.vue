<template>
  <div class="refund">
    <opInion
      :urls="'Mystyle'"
      :titleleft="'退款售后'"
      :titleright="''"
    ></opInion>
    <div class="refund-wrap">
      <div class="shopitems" v-for="(item, index) in list" :key="index">
        <div class="shopitems-right-tit">
          <p><span>2020-09-29</span><span>09:58:11</span></p>
          <p><span>申请退款</span></p>
        </div>
        <div class="shopitems-right">
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
          @click="details"
            >查看详情</van-button
          >
          <van-button plain type="default" round size="small"
            >修改申请</van-button
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
  methods:{
    details(){
      this.$router.push({
        name:'Details'
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.refund {
  width: 100%;
  background: #fff;
  padding-top: 46px;
  box-sizing: border-box;
  overflow: hidden;
  .refund-wrap {
    width: 100%;
    overflow: hidden;
    padding: 20px;
    background: #fff;
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
}
</style>