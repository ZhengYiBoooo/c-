<template>
  <div class="Editress">
    <!-- 导航栏 -->
    <van-nav-bar left-arrow @click-left="onClickLeft" id="addTop" :title="core">
      <template #left>
        <van-icon name="arrow-left" size="18" />
      </template>
    </van-nav-bar>

    <div class="Editress-wrap">
      <van-address-edit
        class="Editress-edit"
        :area-list="maplist"
        :show-delete="boo"
        show-set-default
        :address-info="list"
        show-search-result
        tel-maxlength="11"
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="userexre(list.id)"
      >
        <template>
          <div class="tagtop">
            <span>地址标签</span>
            <span>
              <van-tag
                :plain="item.boo"
                :color="item.color"
                @click="labeltouch(item)"
                v-for="(item, index) in lsittag"
                :key="index"
                >{{ item.name }}</van-tag
              >
            </span>
          </div>
        </template>
      </van-address-edit>
    </div>
  </div>
</template>
<script>
import maps from "../js/map";
import { Toast } from "vant";
import {
  userexpsubmit,
  userexpress,
  userexpxiugai,
  userexremove,
} from "../https/api";
export default {
  data() {
    return {
      searchResult: [],
      lsittag: [
        {
          name: "家",
          boo: true,
          color: "#00CC66",
        },
        {
          name: "公司",
          boo: true,
          color: "#1989FA",
        },
        {
          name: "其他",
          boo: true,
          color: "#666666",
        },
      ],
      core: this.$route.query.num == "10" ? "添加收货地址" : "编辑收货地址",
      boo: this.$route.query.num == "10" ? false : true,
      maplist: {},
      userinfo: {},
      list: {},
      labelitems:''
    };
  },
  created() {
    this.userinfo = this.$route.query.ids;
    console.log(this.userinfo);
    this.maplist = maps;
    if (this.$route.query.num == "10") {
      this.list = {};
    } else {
      this.list = {
        name: this.userinfo.shippingName,
        tel: this.userinfo.shippingTel,
        addressDetail: this.userinfo.shippingAddress,
        areaCode: this.userinfo.shippingCountryId,
        id: this.userinfo.id,
      };
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: "Receive",
      });
    },
    onSave(content) {
      console.log(content);
      console.log(this.maplist);
      if (this.$route.query.num == "10") {
        let userexpsubmitlist = {
          label: this.labelitems,
          shippingAddress: content.addressDetail,
          shippingCityId: content.city,
          shippingCountryId: content.areaCode,
          shippingName: content.name,
          shippingProvinceId: content.province,
          shippingTel: content.tel,
        };
        this.userexpsubmit(userexpsubmitlist);
        this.userexpress();
        this.$router.push({
          name: "Receive",
        });
      } else {
        let userexpsubmitxiugai = {
          label: this.labelitems,
          shippingAddress: content.addressDetail,
          shippingCityId: content.city,
          shippingCountryId: content.areaCode,
          shippingName: content.name,
          shippingProvinceId: content.province,
          shippingTel: content.tel,
          id: content.id,
        };
        this.userexpxiugai(userexpsubmitxiugai);
        this.userexpress();
        this.$router.push({
          name: "Receive",
        });
      }
    },
    async userexpsubmit(e) {
      const res = await userexpsubmit(e);
      console.log(res.data);
    },

    async userexpress() {
      const res = await userexpress();
      console.log(res.data);
    },
    async userexpxiugai(e) {
      const res = await userexpxiugai(e);
      console.log(res);
    },
    userexre(e) {
      this.userexremove(e);
      this.$router.push({
        name: "Receive",
      });
    },
    async userexremove(e) {
      const res = await userexremove(e);
      console.log(res, "删除地址");
    },

    labeltouch(e) {
      if (e.boo == true) {
        for (var i = 0; i < this.lsittag.length; i++) {
          this.lsittag[i].boo = true;
        }
        e.boo = false;
      }else{
        for (var i = 0; i < this.lsittag.length; i++) {
          this.lsittag[i].boo = true;
        }
        e.boo = true;
      }
      this.labelitems=e.name;
      console.log(this.labelitems)
    },
  },
};
</script>
<style lang="scss" scoped>
.Editress {
  width: 100%;
  overflow: hidden;
  padding-top: 46px;
  box-sizing: border-box;

  #addTop {
    background: #f3f3f3;
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
      color: #999;
    }
  }
  .Editress-wrap {
    width: 100%;
    overflow: hidden;
    padding: 10px;
    box-sizing: border-box;
    background: #fff;
    .Editress-edit {
      .tagtop {
        padding: 10px 16px 10px 16px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
          &:nth-of-type(1) {
            font-size: 14px;
            font-style: normal;
          }
          &:nth-of-type(2) {
            display: flex;
            span {
              margin: 0 5px 0 5px;
              padding: 5px 10px 5px 10px;
              box-sizing: border-box;
            }
          }
        }
      }
    }
  }
}
</style>