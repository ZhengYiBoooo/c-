<template>
  <div class="address">
    <!-- 导航栏 -->
    <van-nav-bar left-arrow @click-left="onClickLeft" id="addTop"
      ><template #left>
        <van-icon name="arrow-left" size="18" />
        <span>填写订单</span>
      </template>
    </van-nav-bar>

    <van-popup v-model="show" round position="bottom" :style="{ height: '40%' }"
      >内容</van-popup
    >
    <!-- 提交订单 -->
    <div class="Totalprice">
      <p>
        <span>商品金额</span><span>￥{{ numsum.toFixed(2) }}</span>
      </p>
      <p><span>配送费</span><span>￥3</span></p>
      <div class="Totalprice-sum">
        <van-button
          round
          type="info"
          color="#01B44A"
          class="btn"
          @click="showPopup"
          >提交订单</van-button
        >
        <span
          >实付 <span>￥{{ (numsum + 3).toFixed(2) }}</span></span
        >
      </div>
    </div>
    <div class="wrap">
      <!-- 订单中心 -->
      <div class="add-body">
        <!-- 订单地址选项 -->
        <div class="add-list-edit-ol" v-if="bgm == false">
          <van-address-edit
            class="add-list-edit-ol-add"
            :area-list="areaList"
            show-search-result
            save-button-text="保存并使用"
            :search-result="searchResult"
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @delete="onDelete"
            @change-detail="onChangeDetail"
          />
        </div>
        <div class="add-list-edit" v-if="bgm == false">
          <div class="add-list-img">
            <van-image
              round
              src="https://img.yzcdn.cn/vant/cat.jpeg"
              class="shopitems-img"
            />
          </div>
          <div class="add-list-right">
            <div class="add-right-tit">
              <span>王小明</span>
              <span>136 3714 0505</span>
              <span>家</span>
            </div>
            <div class="add-right-bottom">
              <p>浙江省杭州市萧山区金鸡路知稼苑停车场 入口21幢906</p>
            </div>

            <van-icon name="arrow" class="add-right-bottom-icon" @click="receive" />
          </div>
        </div>
        <!-- 订单商品列表 -->
        <div class="add-list-shop">
          <div class="shopitems" v-for="(item, index) in newlist" :key="index">
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
          </div>
          <div class="distribution">
            <div class="distribution-tit">配送费￥3</div>
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
export default {
  data() {
    return {
      value: "",
      newlist: [],
      num: 0,
      show: false,
      bgm: false,
      areaList: {
        province_list: {
          110000: "北京市",
          120000: "天津市",
        },
        city_list: {
          110100: "北京市",
          110200: "县",
          120100: "天津市",
          120200: "县",
        },
        county_list: {
          110101: "东城区",
          110102: "西城区",
          110105: "朝阳区",
          110106: "丰台区",
          120101: "和平区",
          120102: "河东区",
          120103: "河西区",
          120104: "南开区",
          120105: "河北区",
          // ....
        },
      },

      searchResult: [],
    };
  },
  created() {
    this.newlist = JSON.parse(this.$route.query.res);
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onSave() {
      Toast("save");
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
    showPopup() {
      this.show = true;
    },
    receive(){
      this.$router.push({
        name:'Receive'
      })
    }
  },
  computed: {
    numsum() {
      var n = 0;
      this.newlist.forEach((item) => {
        return (n += item.pires * item.num);
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
            }
          }
          .add-right-bottom {
            width: 100%;
            margin-top: 6px;
            p {
              font-size: 14px;
              max-width: 90%;
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
  }
}
</style>