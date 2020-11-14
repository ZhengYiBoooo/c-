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
        @change-area="addarea"
        :tel-validator="validator"
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
  userexpsuinfos,
  userexpsuinfos2,
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
      labelitems: "",
      addaress: [],
      str: "123456",
      lablist: [],
      indexs: "",
      newnewlist: {},
      ifnosalist: {},
      mastelist: {
        userId: "",
      },
      str: /^1/g,
    };
  },
  async created() {
    if (this.$route.query.asd != undefined) {
      this.mastelist.userId = this.$route.query.asd;
      const infose = await userexpsuinfos(this.mastelist);
      this.ifnosalist = infose.data;
    }
    const res = await userexpress();
    this.lablist = res.data.records;
    this.userinfo = this.$route.query.ids;
    this.indexs = this.$route.query.inde;
    this.maplist = maps;
    if (this.$route.query.num == "10") {
      this.list = {};
    } else {
      let defaultids = "";
      if (this.userinfo.isDefault == "1") {
        defaultids = true;
      } else {
        defaultids = false;
      }
      this.list = {
        name: this.userinfo.shippingName,
        tel: this.userinfo.shippingTel,
        addressDetail: this.userinfo.shippingAddress,
        areaCode: this.lablist[this.indexs].shippingCountryId,
        id: this.userinfo.id,
        province: this.userinfo.shippingProvinceId,
        city: this.userinfo.shippingCityId,
        isDefault: defaultids,
      };
      console.log(this.userinfo);
    }
  },
  methods: {
    validator(e) {
      console.log(e);
      let myreg1 = /^1[3456789]\d{9}$/;
      let myreg2 = /^[2][3,4,5,7,8][0-9]{6}$/;
      if (!myreg1.test(e) && !myreg2.test(e)) {
        console.log("手机号错误");
        return false;
      } else {
        console.log("手机号正确");
        return true;
      }
    },
    onClickLeft() {
      if (this.$route.query.ress == 1) {
        this.$router.push({
          name: "Address",
        });
      } else {
        this.$router.push({
          name: "Receive",
        });
      }
    },
    addarea(e) {
      this.addaress = e;
    },
    onSave(content) {
      let defaultid = "";
      if (content.isDefault == true) {
        defaultid = "1";
      } else {
        defaultid = "0";
      }
      if (this.$route.query.ress == "1" && this.$route.query.num == "10") {
        let userexpsubmitlist = {
          label: this.labelitems,
          shippingAddress: content.addressDetail,
          shippingCityId: this.addaress[1].code.substr(0, 4),
          shippingCountryId: content.areaCode,
          shippingName: content.name,
          shippingProvinceId: this.addaress[0].code.substr(0, 2),
          shippingTel: content.tel,
          isDefault: "1",
        };
        var that = this;
        console.log(userexpsubmitlist);
        userexpsubmit(userexpsubmitlist)
          .then((res) => {
            if (res.code == 200) {
              userexpress().then((ress) => {
                if (ress.code == 200) {
                  let obj = {
                    id: ress.data.records[0].id,
                  };
                  userexpsuinfos2(obj).then((v) => {
                    that.$store.commit("changeaddress", JSON.stringify(v.data));
                    if (v.code == 200) {
                      this.$router.push({
                        name: "Address",
                      });
                    }
                  });
                }
              });
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (
        this.$route.query.num == "10" &&
        this.$route.query.ress == undefined
      ) {
        let userexpsubmitlist = {
          label: this.labelitems,
          shippingAddress: content.addressDetail,
          shippingCityId: this.addaress[1].code.substr(0, 4),
          shippingCountryId: content.areaCode,
          shippingName: content.name,
          shippingProvinceId: this.addaress[0].code.substr(0, 2),
          shippingTel: content.tel,
          isDefault: defaultid,
        };
        var that = this;
        userexpsubmit(userexpsubmitlist)
          .then((res) => {
            if (res.code == 200) {
              userexpress().then((ress) => {
                if (ress.code == 200) {
                  let obj = {
                    id: ress.data.records[ress.data.records.length - 1].id,
                  };
                  let yyy = ress.data.records.filter((item) => {
                    return item.isDefault == 1;
                  });
                  userexpsuinfos2(obj).then((v) => {
                    that.$store.commit("changeaddress", JSON.stringify(v.data));
                    if (v.code == 200) {
                      this.$router.push({
                        name: "Receive",
                      });
                    }
                  });
                }
              });
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        if (this.addaress.length <= 0) {
          let userexpsubmitxiugai = {
            label: this.labelitems,
            shippingAddress: content.addressDetail,
            shippingCityId: this.ifnosalist.shippingCityId,
            shippingCountryId: content.areaCode,
            shippingName: content.name,
            shippingProvinceId: this.ifnosalist.shippingProvinceId,
            shippingTel: content.tel,
            id: content.id,
            isDefault: defaultid,
          };
          userexpxiugai(userexpsubmitxiugai)
            .then((res) => {
              if (res.code == 200) {
                if (
                  this.userinfo.id ==
                  JSON.parse(this.$store.state.addresslist).id
                ) {
                  let obj = {
                    id: this.userinfo.id,
                  };
                  var that = this;
                  userexpsuinfos2(obj).then((res) => {
                    this.$store.commit(
                      "changeaddress",
                      JSON.stringify(res.data)
                    );

                    if (res.code == 200) {
                      this.$router.push({
                        name: "Receive",
                      });
                    }
                    
                  });
                } else {
                  this.$router.push({
                    name: "Receive",
                  });
                }
              }
            })
            .catch((e) => {
              console.log(e);
            });

          // this.$store.commit(
          //   "changeaddress",
          //   JSON.stringify(userexpsubmitxiugai)
          // );
        } else {
          let userexpsubmitxiugai = {
            label: this.labelitems,
            shippingAddress: content.addressDetail,
            shippingCityId: this.addaress[1].code.substr(0, 4),
            shippingCountryId: content.areaCode,
            shippingName: content.name,
            shippingProvinceId: this.addaress[0].code.substr(0, 2),
            shippingTel: content.tel,
            id: content.id,
            isDefault: defaultid,
          };
          userexpxiugai(userexpsubmitxiugai)
            .then((res) => {
              if (res.code == 200) {
                if (
                  this.userinfo.id ==
                  JSON.parse(this.$store.state.addresslist).id
                ) {
                  let obj = {
                    id: this.userinfo.id,
                  };
                  var that = this;
                  userexpsuinfos2(obj).then((res) => {
                    that.$store.commit(
                      "changeaddress",
                      JSON.stringify(res.data)
                    );
                    if (res.code == 200) {
                      this.$router.push({
                        name: "Receive",
                      });
                    }
                  });
                } else {
                  this.$router.push({
                    name: "Receive",
                  });
                }
              }
            })
            .catch((e) => {
              console.log(e);
            });
          // this.$store.commit(
          //   "changeaddress",
          //   JSON.stringify(userexpsubmitxiugai)
          // );
        }
      }
    },
    async userexpress() {
      const res = await userexpress();
      this.newnewlist = res.data.records[0];
    },
    userexre(e) {
      this.userexremove(e);
    },
    async userexremove(e) {
      const res = await userexremove(e);
      if (res.code == 200) {
        userexpress().then((res) => {
          this.$store.commit("addId", this.$store.state.addressId - 1);
          if (this.$store.state.addressId < 0) {
            localStorage.removeItem("addressId");
          }
          if (res.data.records.length <= 0) {
            localStorage.removeItem("addresslist");
            this.$router.go(0);
          }
        });
        this.$router.push({
          name: "Receive",
        });
      }
    },

    labeltouch(e) {
      if (e.boo == true) {
        for (var i = 0; i < this.lsittag.length; i++) {
          this.lsittag[i].boo = true;
        }
        e.boo = false;
      } else {
        for (var i = 0; i < this.lsittag.length; i++) {
          this.lsittag[i].boo = true;
        }
        e.boo = true;
      }
      this.labelitems = e.name;
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