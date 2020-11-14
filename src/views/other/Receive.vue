<template>
  <div class="receive">
    <!-- 导航栏 -->

    <van-nav-bar
      left-arrow
      @click-left="onClickLeft"
      id="addTop"
      title="收货地址"
    >
      <template #left>
        <van-icon name="arrow-left" size="18" />
      </template>
      <template #right>
        <span
          class="sp-right"
          v-show="$route.query.tag != 'Receive'"
          @click="Editressnew"
          >新增地址</span
        >
      </template>
    </van-nav-bar>
    <van-empty description="暂未编辑地址~" v-show="presslist.length==0"/>
    <div class="receive-wrap">
      <div
        class="receive-items"
        v-for="(item, index) in presslist"
        :key="index"
      >
        <div class="receive-items-left" @click="newshopadd(item,index)">
          <div class="receive-items-left-title">
            <div class="receive-items-left-title-info">
              <span>{{ item.shippingProvinceId }}{{ item.shippingCityId }}{{ item.shippingCountryId }}{{ item.shippingAddress }}</span>
 
            </div>
            <span class="receive-items-tag"
              ><van-tag
                color="#c5c5c5"
                v-show="item.isDefault == 1 ? true : false"
                >默认</van-tag
              ><van-tag color="#00CC66">{{ item.label }}</van-tag></span
            >
          </div>
          <div class="receive-items-left-bottom">
            <p>
              <span>{{ item.shippingName }}</span>
              <span>{{ item.shippingTel }}</span>
            </p>
          </div>
        </div>
        <div class="receive-items-right" v-show="$route.query.tag != 'Receive'">
          <van-icon name="newspaper-o" @click="editress(item, index)" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import maps from "../js/map";
import { userexpress } from "../https/api";
export default {
  data() {
    return {
      presslist: [],
      maplist: {},
      newmaplis: [],
    };
  },
  created() {
    this.userexpress();
    this.maplist = maps;
  },
  methods: {
    onClickLeft() {
      if (this.$route.query.tag == "Receive") {
        this.$router.push({
          name: "Address",
        });
        
      } else {
        this.$router.push({
          name: "Mystyle",
        });
      }
    },
    newshopadd(e,i) {
      if (this.$route.query.tag == "Receive") {
        this.$router.push({
          name: "Address",
        });
        this.$store.commit("changeaddress", JSON.stringify(e));
        this.$store.commit('addId',i);
      } else {
        return;
      }
    },
    editress(e, ind) {
      this.$router.push({
        name: "Editress",
        query: {
          ids: e,
          inde: ind,
          asd:e.id
        },
      });
    },
    Editressnew() {
      this.$router.push({
        name: "Editress",
        query: {
          num: "10",
        },
      });
    },
    async userexpress() {
      const res = await userexpress();
      this.presslist = res.data.records;
      this.newmaplis = res.data.records;
      this.presslist.forEach((v, k) => {
        v.shippingProvinceId = this.maplist["province_list"][
          v.shippingProvinceId + "0000"
        ];
        v.shippingCityId = this.maplist["city_list"][v.shippingCityId + "00"];
        v.shippingCountryId = this.maplist["county_list"][v.shippingCountryId];
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.receive {
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  padding-top: 46px;
  box-sizing: border-box;
  background: #f6f6f6;
  #addTop {
    background: #fcfcfc;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 19;
    width: 100%;
    &::after {
      position: absolute;
      box-sizing: border-box;
      content: " ";
      pointer-events: none;
      top: -50%;
      right: -50%;
      bottom: -50%;
      left: -50%;
      border: none;
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
    }
    i {
      color: #333;
    }
    span {
      font-size: 16px;
      &:nth-of-type(1) {
        margin-left: 20px;
      }
    }
    .sp-right {
      font-size: 13px;
      color: #999;
    }
  }
  .receive-wrap {
    width: 100%;
    overflow: hidden;
    background: #f6f6f6;
    margin-top: 20px;
    .receive-items {
      width: 100%;
      background: #fff;
      padding: 20px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px;
      padding-bottom: 20px;
      box-sizing: border-box;
      border-bottom: 1px solid #eee;
      .receive-items-left {
        width: 100%;
        margin-right: 35px;
        .receive-items-left-title {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .receive-items-left-title-info {
            max-width: 193px;
            span {
              display: inline-block;
              overflow: hidden;
              word-wrap: break-word;
            }
          }
          .receive-items-tag {
            display: flex;
            align-items: center;
            .van-tag {
              width: 30px;
              display: flex;
              align-items: center;
              margin: 0 4px 0 4px;
              justify-content: center;
              flex-direction: row;
            }
          }
          span {
            font-size: 13px;
          }
        }
        .receive-items-left-bottom {
          margin-top: 10px;
          p {
            font-size: 15px;
            display: flex;
            align-items: center;
            span {
              &:nth-of-type(1) {
                margin-right: 10px;
              }
              &:nth-of-type(2) {
                font-size: 13px;
                color: #a3a3a3;
              }
            }
          }
        }
      }
    }
  }
}
</style>