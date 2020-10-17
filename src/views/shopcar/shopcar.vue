<template>
  <div id="shopcar">
    <!-- 顶部标题 -->
    <van-empty
      description="暂还没有商品哦~"
      v-show="shopca.length <= 0 ? true : false"
    />
    <div class="shopcar-tit">
      <span>购物车</span>
      <span v-show="checkitems" @click="demoremove">删除</span>
    </div>
    <!-- 购物车商品信息 -->
    <div class="shoplist">
      <div class="shopitems" v-for="(item, index) in shopca" :key="index">
        <!-- 选则商品 -->
        <van-checkbox
          v-model="item.boo"
          icon-size="15px"
          class="icon-sliy"
          :value="item.id"
          @click="chidrencheck(item.id)"
        ></van-checkbox>
        <!-- 选项右侧信息 -->
        <div class="shopitems-right">
          <van-image round :src="item.thumbnail" class="shopitems-img" />
          <div class="shopitems-cont">
            <p>{{ item.goodsName }}</p>
            <p>中果 / {{ item.jin }}斤</p>
            <p>￥{{ (2 * item.goodsCount).toFixed(2) }}</p>
          </div>
          <div class="shopitems-speci">
            <span
              @click="
                item.goodsCount == 1 ? (item.goodsCount = 1) : item.goodsCount--
              "
              >-</span
            >
            <span>{{ item.goodsCount }}</span>
            <span @click="shoplevae">+</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 提交购物车 -->
    <van-submit-bar
      :price="totalPrice"
      button-text="去结算"
      :suffix-label="freight"
      :disabled="boo"
      @submit="pushaddress"
      button-color="#01B44A"
    >
      <van-checkbox v-model="checked" @click="checkall">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>
<script>
import { Dialog } from "vant";
import { usercarlist, usercarsave, usergoremove } from "../https/api";
export default {
  data() {
    return {
      priceNum: 2000,
      delele: false,
      lav: 20,
      freight: `运费:0元`,
      boo: true,
      checked: false,
      checkitems: false,
      checkedlist: [],
      num: 1,
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
      demo: "",
      sss: 0,
      numsr: [],
      shopca: [],
      shopacrsave: {
        goodsCount: "1",
        goodsId: "2",
      },
      shopremoves: {
        ids: "1",
      },
    };
  },
  created() {
    this.usercarlist();
  },
  methods: {
    say(e) {
      console.log(e);
    },
    chidrencheck(id) {
      if (this.checkedlist.indexOf(id) > -1) {
        this.remove(this.checkedlist, id);
      } else {
        this.checkedlist.push(id);
      }
      if (this.checkedlist.length >= 1) {
        this.checkitems = true;
        this.boo = false;
      } else {
        this.checkitems = false;
        this.boo = true;
      }
      if (this.checkedlist.length < this.shopca.length) {
        this.checked = false;
      } else {
        this.checked = true;
      }
      console.log(this.shopca);
      console.log(this.checkedlist);
    },
    checkall() {
      if (!this.checked) {
        this.shopca.forEach((item) => {
          item.boo = false;
        });
        this.checkedlist = [];
        this.checkitems = false;
        this.boo = true;
      } else {
        this.shopca.forEach((item) => {
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
      var that = this;
      this.$options.methods.dsasdasd(that);
      Dialog.confirm({
        message: "确定删除勾选商品吗",
      })
        .then(() => {
          that.dsasdasd();
          this.shopca = this.shopca.filter((item) => item.boo != true);
          this.checkedlist = [];
        })
        .catch(() => {});
    },
    pushaddress() {
      let shoplist = this.shopca.filter((item) => item.boo == true);
      this.$router.push({
        name: "Address",
      });
      console.log(shoplist);
      this.$store.commit("changeshop", JSON.stringify(shoplist));
    },
    dsasdasd(that) {
      this.usergoremove();
    },
    async usergoremove() {
      const res = await usergoremove(this.shopremoves);
      console.log(res);
    },
    async usercarlist() {
      const res = await usercarlist();
      this.shopca = res.data;
    },
    async usercarsave() {
      const res = await usercarsave(this.shopacrsave);
      this.usercarlist();
      console.log(res);
    },
    shoplevae() {
      this.usercarsave();
    },
  },
  computed: {
    totalPrice: function () {
      var total = 0;
      for (var i = 0; i < this.shopca.length; i++) {
        if (this.shopca[i].boo == true) {
          var item = this.shopca[i];
          total += 2 * item.goodsCount;
        }
      }
      return total * 100;
    },
  },
};
</script>
<style lang="scss" scoped>
#shopcar {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: #fff;
  .shopcar-tit {
    width: 100%;
    display: flex;
    background: #fff;
    justify-content: space-between;
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
        color: #d4d4d4;
        font-size: 15px;
      }
    }
  }
}
.van-submit-bar {
  bottom: 50px;
}
.shoplist {
  width: 100%;
  overflow: hidden;
  margin-top: 63px;
  padding: 20px;
  margin-bottom: 133px;
  box-sizing: border-box;
  .shopitems {
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
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
          &:nth-of-type(3) {
            font-size: 15px;
            font-weight: 100;
            font-family: Microsoft YaHei;
            color: red;
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
            background: #8888;
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
</style>