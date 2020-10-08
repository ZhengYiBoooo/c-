<template>
  <div class="platform">
    <opInion
      :urls="'Details'"
      :titleleft="'平台申诉'"
      :titleright="''"
    ></opInion>
    <div class="platform-wrap">
      <div class="platform-wrap-title">
        <span>商家拒绝退款</span>
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
        <div class="platform-reason">
          <span>退款原因</span>
          <span @click="popup"
            >{{ numname }}
            <van-icon name="arrow" />
          </span>
        </div>
        <div class="platform-refund">
          <div class="platform-refund-title">
            <span>退款金额</span>
            <span>￥19.9</span>
          </div>
          <div class="platform-refund-bottom">
            <input
              type="text"
              placeholder="可修改，最多119.4￥，含运费￥0.00"
            />
          </div>
        </div>
        <div class="platform-explain">
          <span>退款说明</span>
          <van-field
            v-model="message"
            rows="1"
            autosize
            type="textarea"
            placeholder="选填"
          />
        </div>
        <div class="platform-upload">
          <div class="platform-upload-title">
            <span>上传凭证</span>
            <span>最多上传5张</span>
          </div>
          <van-uploader
            v-model="fileList"
            multiple
            :after-read="afterRead"
            :max-count="5"
          />
        </div>
      </div>
    </div>
    <button class="submitBtn">提交</button>
    <van-popup v-model="show" round position="bottom" class="popoup">
      <p>退款原因</p>
      <ul class="popoup-ul">
        <li v-for="(item, indexs) in popouplist" :key="indexs">
          <span>{{ item.name }}</span>
          <input type="checkbox" v-model="item.boo" @click="boxcheck" />
        </li>
      </ul>
    </van-popup>
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

      fileList: [],
      popouplist: [
        {
          id: 1,
          boo: false,
          name: "商品变质/发霉/有异物",
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
          name: "少件",
        },
        {
          id: 5,
          boo: false,
          name: "其他",
        },
      ],
      message: "",
      show: false,
      bolist: [],
      numname: "请选择",
    };
  },
  created() {
    console.log(this.bolist);
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
    popup() {
      this.show = true;
    },
    boxcheck() {
      for(var i=0;i<this.popouplist.length;i++){
        console.log(this.popouplist[i])
      }
      // console.log(
      //   this.popouplist.filter((item) => {
      //     return item.boo != false;
      //   })
      // );
    },
  },
};
</script>
<style lang="scss" scoped>
.platform {
  width: 100%;
  overflow: hidden;
  background: #fff;
  padding-top: 46px;
  box-sizing: border-box;
  .platform-wrap {
    width: 100%;
    overflow: hidden;
    background: #fff;
    padding: 20px;
    padding-top: 0;
    padding-bottom: 70px;
    box-sizing: border-box;
    .platform-wrap-title {
      width: 100%;
      overflow: hidden;
      background: #fff;
      padding-bottom: 10px;
      box-sizing: border-box;
      padding-left: 5px;
      span {
        font-size: 13px;
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
      .platform-reason {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0 10px 0;
        box-sizing: border-box;
        span {
          font-size: 14px;
          &:nth-of-type(2) {
            display: flex;
            align-items: center;
          }
        }
      }
      .platform-refund {
        width: 100%;
        overflow: hidden;
        background: #fff;
        .platform-refund-title {
          width: 100%;
          overflow: hidden;
          background: #fff;
          span {
            font-size: 14px;
            &:nth-of-type(2) {
              font-size: 13px;
              margin-left: 20px;
              color: red;
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
      .platform-explain {
        width: 100%;
        overflow: hidden;
        background: #fff;
        padding: 10px 0 10px 0;
        box-sizing: border-box;
        display: flex;
        border-bottom: 1px solid #eee;
        span {
          width: 100px;
          font-size: 14px;
          line-height: 44px;
          text-align: left;
        }
      }
      .platform-upload {
        width: 100%;
        overflow: hidden;
        background: #fff;
        .platform-upload-title {
          width: 100%;
          overflow: hidden;
          padding: 10px 0 10px 0;
          box-sizing: border-box;
          span {
            font-size: 14px;
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
    background: red;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 0 15px 0;
    box-sizing: border-box;
    font-size: 14px;
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