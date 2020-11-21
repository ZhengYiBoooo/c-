<template>
  <div id="shopcar">
    <!-- 顶部标题 -->
    <van-empty
      style="margin-top: 30px"
      image="https://img.yzcdn.cn/vant/custom-empty-image.png"
      description="暂还没有商品哦~"
      v-show="shopca.length <= 0 ? true : false"
    />
    <div class="shopcar-tit">
      <span>购物车</span>
      <span v-show="checkitems" @click="demoremove">删除</span>
    </div>
    <!-- 购物车商品信息 -->
    <div class="shoplist">
      <div class="shopitems" v-for="item in shopca" :key="item.id">
        <!-- 选则商品 -->
        <van-checkbox
          v-model="item.boo"
          icon-size="15px"
          class="icon-sliy"
          :value="item.id"
          @click="chidrencheck(item)"
          :disabled="
            item.servicerStatus != 2 ||
            item.servicerStock <= 0 ||
            item.supplierStock <= 0 ||
            item.goodsCount > item.supplierStock ||
            item.goodsCount > item.servicerStock
          "
        ></van-checkbox>
        <!-- 选项右侧信息 -->
        <div class="shopitems-right">
          <van-image
            round
            :src="item.thumbnail"
            class="shopitems-img"
            @click="shopifo(item.servicerGoodsId)"
          />
          <div class="shopitems-cont">
            <p>
              {{ item.goodsName
              }}<span style="margin-left: 10px">{{ item.weight }}</span>
            </p>
            <p
              v-show="
                item.servicerStatus == 2 &&
                item.goodsCount <= item.servicerStock &&
                item.goodsCount <= item.supplierStock
              "
            >
              ￥{{ item.price / 1000 }}<span>/份</span>
            </p>
            <p
              v-show="
                item.servicerStatus != 2 ||
                item.supplierStock == 0 ||
                item.servicerStock == 0 ||
                item.goodsCount > item.supplierStock ||
                item.goodsCount > item.servicerStock
              "
            >
              <span>补货中</span>
            </p>
          </div>
          <div
            class="shopitems-speci"
            v-show="
              item.servicerStatus == 2 &&
              item.goodsCount <= item.servicerStock &&
              item.goodsCount <= item.supplierStock
            "
          >
            <span @click="shopnumup(item)">-</span>
            <span @click="clicksy(item)">{{ item.goodsCount }}</span>
            <span @click="shopnumupdata(item)">+</span>
          </div>
        </div>

        <div
          class="shopitemss"
          v-show="
            item.servicerStatus != 2 ||
            item.supplierStock == 0 ||
            item.servicerStock == 0 ||
            item.goodsCount > item.supplierStock ||
            item.goodsCount > item.servicerStock
          "
        >
          <van-icon name="delete" @click="dele(item)" />
        </div>
        <div
          class="shopitemss-co-wrap"
          v-show="
            item.servicerStatus != 2 ||
            item.supplierStock == 0 ||
            item.servicerStock == 0 ||
            item.goodsCount > item.servicerStock ||
            item.goodsCount > item.supplierStock
          "
        >
          <div
            class="shopitemss-content"
            v-show="
              item.servicerStatus != 2 ||
              item.supplierStock == 0 ||
              item.servicerStock == 0 ||
              item.goodsCount > item.servicerStock ||
              item.goodsCount > item.supplierStock
            "
          >
            <span>{{
              item.supplierStock == 0 || item.servicerStock == 0
                ? (qin = "已售罄")
                : item.servicerStatus == 2
                ? (qin = "库存不足")
                : (qin = "已下架")
            }}</span>
          </div>

          <div
            class="shopitems-speci"
            v-show="
              item.servicerStatus == 2 &&
              item.supplierStock > 0 &&
              item.servicerStock > 0 &&
              (item.goodsCount > item.supplierStock ||
                item.goodsCount > item.servicerStock)
            "
          >
            <span @click="shopnumup(item)">-</span>
            <span @click="clicksy(item)">{{ item.goodsCount }}</span>
            <span @click="shopnumupdata(item)">+</span>
          </div>
        </div>
      </div>
    </div>
    <van-dialog
      v-model="show"
      title="请输入商品数量"
      show-cancel-button
      @confirm="conf"
    >
      <div class="shopnums">
        <input type="text" v-model="clicknum" />
      </div>
    </van-dialog>
    <!-- 提交购物车 -->
    <van-submit-bar
      :price="totalPrice"
      button-text="去结算"
      :suffix-label="freight"
      :disabled="boo"
      @submit="pushaddress"
      button-color="#01B44A"
    >
      <van-checkbox v-model="checked" @click="checkall" :disabled="shopsdstatus"
        >全选</van-checkbox
      >
    </van-submit-bar>

    <!-- <iframe src="" frameborder="0"></iframe> -->
    <!-- <button @click="popopo=true">点击</button>
    <iframe src="https://www.baidu.com" frameborder="0" class="ifms" v-show="popopo==true"></iframe> -->
  </div>
</template>
<script>
import { Dialog } from "vant";
import {
  usercarlist,
  usercarsave,
  usergoremove,
  userupdate,
} from "../https/api";
import { Toast } from "vant";
export default {
  data() {
    return {
      shopsdstatus: false,
      priceNum: 2000,
      delele: false,
      lav: 20,
      freight: ``,
      boo: true,
      checkeds: false,
      checked: false,
      checkitems: false,
      checkedlist: [],
      num: 1,
      show: false,
      demo: "",
      sss: 0,
      popopo: false,
      numsr: [],
      shopca: [],
      shopacrsave: {
        goodsCount: "1",
        goodsId: "2",
      },
      shopremoves: {
        ids: "",
      },
      clickId: "",
      clicknum: "",
      kucun: "",
      qin: "以手勤",
      shopcas: {},
    };
  },
  created() {
    this.usercarlist();
  },
  methods: {
    say(e) {},
    chidrencheck(item) {
      console.log(item);
      if (
        item.servicerStatus != 2 ||
        item.servicerStock <= 0 ||
        item.supplierStock <= 0 ||
        item.goodsCount > item.supplierStock ||
        item.goodsCount > item.servicerStock
      ) {
        return;
      }
      let sheng = this.shopca.filter((item) => {
        return (
          item.servicerStatus == 2 &&
          item.goodsCount <= item.servicerStock &&
          item.goodsCount <= item.supplierStock &&
          item.supplierStock != 0 &&
          item.servicerStock != 0
        );
      });

      let id = item.id;
      if (this.checkedlist.indexOf(id) > -1) {
        this.remove(this.checkedlist, id);
      } else {
        this.checkedlist.push(id);
      }

      let dengs = sheng.filter((item) => {
        return item.boo == true;
      });
      if (dengs.length >= 1) {
        this.checkitems = true;
        this.boo = false;
      } else {
        this.checkitems = false;
        this.boo = true;
      }
      if (this.checkedlist.length < sheng.length) {
        this.checked = false;
      } else {
        this.checked = true;
      }
    },
    checkall() {
      // shopca.length <= 0 ? true : false
      let sheng = this.shopca.filter((item) => {
        return (
          item.servicerStatus == 2 &&
          item.goodsCount <= item.servicerStock &&
          item.goodsCount <= item.supplierStock &&
          item.supplierStock != 0 &&
          item.servicerStock != 0
        );
      });
      if (!this.checked) {
        console.log(this.checked);
        sheng.forEach((item) => {
          item.boo = false;
        });
        this.checkedlist = [];
        this.checkitems = false;
        this.boo = true;
      } else {
        sheng.forEach((item) => {
          item.boo = true;
          if (this.checkedlist.indexOf(item.id) < 0) {
            this.checkedlist.push(item.id);
          }
        });
        this.checkitems = true;
        this.boo = false;
      }
    },
    remove(arr, val) {
      var index = arr.indexOf(val);
      if (index > -1) {
        arr.splice(index, 1);
      }
    },
    demoremove() {
      this.shopremoves.ids = this.checkedlist.join(",");
      let sheng = this.shopca.filter((item) => {
        return (
          item.servicerStatus == 2 &&
          item.goodsCount <= item.servicerStock &&
          item.goodsCount <= item.supplierStock &&
          item.supplierStock != 0 &&
          item.servicerStock != 0
        );
      });
      console.log(sheng);
      Dialog.confirm({
        message: "确定删除勾选商品吗",
      })
        .then(() => {
          this.usergoremove(this.shopremoves);
          this.checkitems = false;
          this.boo = true;
          this.checked = false;
          this.checkedlist = [];
          this.shopsdstatus = true;
        })
        .catch(() => {});
    },
    pushaddress() {
      let shoplist = this.shopca.filter((item) => item.boo == true);
      this.$router.push({
        name: "Address",
      });
      this.$store.commit("changeshop", JSON.stringify(shoplist));
    },
    dele(e) {
      let obj = {
        ids: e.id,
      };
      this.usergoremove(obj);
    },
    async usergoremove(e) {
      const res = await usergoremove(e);
      if (res.code == 200) {
        this.usercarlist();
      }
    },
    async usercarlist() {
      const res = await usercarlist();
      this.shopca = res.data;
      let sheng = this.shopca.filter((item) => {
        return (
          item.servicerStatus == 2 &&
          item.goodsCount <= item.servicerStock &&
          item.goodsCount <= item.supplierStock &&
          item.supplierStock != 0 &&
          item.servicerStock != 0
        );
      });
      if (sheng.length <= 0) {
        console.log(this.shopsdstatus);
        this.shopsdstatus = true;
      } else {
        this.shopsdstatus = false;
      }
    },
    async usercarsave() {
      const res = await usercarsave(this.shopacrsave);
      if (res.code == 200) {
        this.usercarlist();
      }
    },
    async userupdate(e) {
      const res = await userupdate(e);
      if (res.code == 200) {
        this.usercarlists();
      }
    },
    usercarlists() {
      usercarlist().then((res) => {
        this.shopca = res.data;
        let sheng = this.shopca.filter((item) => {
          return (
            item.servicerStatus == 2 &&
            item.goodsCount <= item.servicerStock &&
            item.goodsCount <= item.supplierStock &&
            item.supplierStock != 0 &&
            item.servicerStock != 0
          );
        });
        if (sheng.length <= 0) {
          console.log(this.shopsdstatus);
          this.shopsdstatus = true;
        } else {
          this.shopsdstatus = false;
        }
      });
      // const res = await usercarlist();
      // this.shopca = res.data;
      // let sheng = this.shopca.filter((item) => {
      //   return (
      //     item.servicerStatus == 2 &&
      //     item.goodsCount <= item.servicerStock &&
      //     item.goodsCount <= item.supplierStock &&
      //     item.supplierStock != 0 &&
      //     item.servicerStock != 0
      //   );
      // });
      // if (sheng.length <= 0) {
      //   console.log(this.shopsdstatus);
      //   this.shopsdstatus = true;
      // } else {
      //   this.shopsdstatus = false;
      // }
    },
    // 购物车数量增加
    shopnumupdata(e) {
      if (
        e.goodsCount + 1 > e.supplierStock ||
        e.goodsCount + 1 > e.servicerStock
      ) {
        Toast.fail({
          message: "仓库库存不足",
          duration: 500,
        });
      } else {
        e.goodsCount++;
        let obj = {
          goodsCount: e.goodsCount,
          id: e.id,
        };
        this.userupdate(obj);
        this.shopcas.map((res) => {
          if (this.shopcas.id == e.id) {
            e.goodsCount = this.shopcas.goodsCount;
          }
        });
      }
    },
    //购物车数量减少
    shopnumup(e) {
      if (e.goodsCount <= 1) {
        e.goodsCount = 1;
        Toast.fail({
          message: "商品数量必须大于1",
          duration: 500,
        });
      } else {
        e.goodsCount--;
        let obj = {
          goodsCount: e.goodsCount,
          id: e.id,
        };
        this.userupdate(obj);
        this.shopcas.map((res) => {
          if (this.shopcas.id == e.id) {
            e.goodsCount = this.shopcas.goodsCount;
          }
        });
      }
    },
    clicksy(e) {
      this.show = true;
      this.clickId = e.id;
      this.clicknum = e.goodsCount;
      this.kucun = e.supplierStock;
    },
    conf() {
      if (this.clicknum <= 0) {
        this.clicknum = 1;
        // Toast.fail({
        //   message: "商品数量必须大于1",
        //   duration: 500,
        // });
      } else {
        if (this.clicknum > this.kucun) {
          this.clicknum = this.kucun;
          // Toast.fail({
          //   message: "仓库库存不足",
          //   duration: 500,
          // });
        } else {
          let obj = {
            goodsCount: this.clicknum,
            id: this.clickId,
          };
          this.userupdate(obj);
          this.shopcas.map((res) => {
            if (this.shopcas.id == e.id) {
              e.goodsCount = this.shopcas.goodsCount;
            }
          });
        }
      }
    },

    // 1318080051446358017
    shopifo(e) {
      this.$router.push({
        name: "Shop",
        query: {
          re: e,
        },
      });
    },
    // item.goodsCount == 1 ? (item.goodsCount = 1) : item.goodsCount--
    btnyyy() {
      window.open("https://www.baidu.com", "_self");
    },
  },
  computed: {
    totalPrice: function () {
      var total = 0;
      for (var i = 0; i < this.shopca.length; i++) {
        if (this.checkedlist.indexOf(this.shopca[i].id) !== -1) {
          var item = this.shopca[i];
          total += (item.price * item.goodsCount) / 1000;
        }
      }
      return total * 100;
    },
    // totalPrice() {
    //               var totalprice = 0;
    //               //未加入选择框时的计算总价
    //               /*
    //                   //方法一
    //                 /!*  for(var i=0;i<this.goods.length;i++){
    //                     totalprice += this.goods[i].num*this.goods[i].price
    //                   }*!/
    //                   //方法二
    //                   this.goods.forEach( (v,k)=>{
    //                     totalprice += v.num*v.price;
    //                   });*/
    //               //加入选择框以后的计算总价
    //               this.goods.forEach((v, k) => {
    //                   if (this.allSelectedGoods.indexOf(v.id) !== -1) {
    //                       totalprice += v.price * v.num;
    //                   }
    //               });
    //               return totalprice
    //           },
  },
  watch: {
    // checkitems(val){
    //   if(this.boo==true){
    //     val=false
    //   }else{
    //     val=true
    //   }
    // }
  },
};
</script>
<style lang="scss" scoped>
#shopcar {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  overflow-y: auto;
  background: #f5f5f5;
  padding-top: 63px;
  .shopcar-tit {
    width: 100%;
    display: flex;
    background: #fff;
    justify-content: center;
    align-items: center;
    padding: 20px;
    overflow: hidden;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000000;
    span {
      &:nth-of-type(1) {
        color: #777;
        font-size: 17px;
      }
      &:nth-of-type(2) {
        color: #00ae46;
        font-size: 15px;
        position: absolute;
        right: 15px;
        top: 20px;
      }
    }
  }
}
.van-submit-bar {
  bottom: 50px;
}
.shoplist {
  width: 100%;
  overflow-y: auto;
  padding-top: 0;
  background: #f5f5f5;
  margin-top: 15px;
  padding-bottom: 100px;
  .shopitems {
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    width: 100%;
    background: #fff;
    padding: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    box-sizing: border-box;
    position: relative;

    .icon-sliy {
      position: relative;
      z-index: 2;
    }
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
            margin-bottom: 20px;
          }
          &:nth-of-type(2) {
            font-size: 15px;
            font-weight: 100;
            font-family: Microsoft YaHei;
            color: red;
            span {
              color: #8888;
            }
          }
          &:nth-of-type(3) {
            font-size: 15px;
            font-weight: 100;
            font-family: Microsoft YaHei;
            span {
              color: #8888;
            }
          }
        }
      }
      .shopitems-speci {
        position: absolute;
        right: 10px;
        bottom: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          font-size: 20px;
          font-weight: 100;
          font-family: Microsoft YaHei;
          &:nth-of-type(1) {
            width: 10px;
          }
          &:nth-of-type(2) {
            width: 40px;
            font-size: 15px;
            max-width: 40px;
            background: #f6f6f6;
            text-align: center;
            margin: 0 10px 0 10px;
          }
          &:nth-of-type(3) {
            width: 10px;
          }
        }
      }
    }
    .shopitemss {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 90px;
      background: #eee;
      z-index: 10;
      opacity: 0.4;
      i {
        position: absolute;
        right: 20px;
        top: 15px;
      }

      .shopitems-speci {
        position: absolute;
        right: 30px;
        bottom: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          font-size: 20px;
          font-weight: 100;
          font-family: Microsoft YaHei;
          &:nth-of-type(1) {
            width: 10px;
          }
          &:nth-of-type(2) {
            width: 40px;
            font-size: 15px;
            max-width: 40px;
            background: #f6f6f6;
            text-align: center;
            margin: 0 10px 0 10px;
          }
          &:nth-of-type(3) {
            width: 10px;
          }
        }
      }
    }

    .shopitemss-co-wrap {
      width: 100%;
      height: 90px;
      position: absolute;
      left: 0;
      top: 0;
      .shopitemss-content {
        position: absolute;
        left: 60px;
        top: 50%;
        margin-top: -17.5px;

        height: 25px;
        display: flex;
        align-items: center;
        background: #333;
        justify-content: center;
        border-radius: 20px;
        padding: 5px 10px 5px 10px;
        box-sizing: border-box;
        color: #fff;
        z-index: 10;
        font-size: 14px;
      }
      .shopitems-speci {
        position: absolute;
        right: 30px;
        bottom: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 100;
        span {
          font-size: 20px;
          font-weight: 100;
          font-family: Microsoft YaHei;
          &:nth-of-type(1) {
            width: 10px;
          }
          &:nth-of-type(2) {
            width: 40px;
            font-size: 15px;
            max-width: 40px;
            background: #ddd;
            text-align: center;
            margin: 0 10px 0 10px;
          }
          &:nth-of-type(3) {
            width: 10px;
          }
        }
      }
    }
  }
}
.shopnums {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  input {
    width: 100%;
    height: 40px;
    border: none;
    border-bottom: 1px solid #03b64c;
  }
}
.ifms {
  width: 100%;
  height: 100vh;
  #page {
    background: red;
  }
}
</style>