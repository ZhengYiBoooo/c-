<template>
  <div class="about">
    <!-- 商家名称 -->
    <div class="top-title">
      <img :src="userinfolist.logo" alt="" class="logo" />
      <div class="top-title-con">
        <p>{{ userinfolist.shopName }}</p>
        <p>商品：{{ userinfolist.stock }}</p>
      </div>
    </div>
    <!-- 搜索框 -->
    <van-search
      v-model="search"
      placeholder="请输入搜索关键词"
      shape="round"
      input-align="center"
    />
    <!-- 商品分类列表 -->
    <div class="shop-swiper">
      <div class="shop-wrap">
        <div
          class="shop-items"
          v-for="(item, index) in newusershoplist"
          :key="index"
          @click="fentop(index, item)"
        >
          <div class="shop-swiper-img" :class="yang == index ? 'toptab' : ''">
            <img :src="item.imgUrl" />
          </div>
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
    <!-- 侧栏分类商品 -->
    <div
      class="shop-list-right"
      @touchstart="touchStart($event)"
      @touchend="touchEnd($event)"
    >
      <div class="classs" style="overflow-y: auto">
        <van-sidebar v-model="active" @change="inde(active)">
          <van-sidebar-item
            :title="item.name"
            v-for="(item, index) in newusershoplist"
            :key="index"
            @click="clickindex(item)"
          />
        </van-sidebar>
      </div>

      <div class="shop-list-right-wrap">
        <div class="tree-shop-wrap">
          <div class="tree-select-tit">
            <p>{{ titlename }}</p>
          </div>
          <div
            class="tree-select-items"
            v-for="(item, index) in tableData"
            :key="index"
          >
            <div class="tree-select-items-img" @click="shop(item.id)">
              <img :src="item.thumbnail" alt="" />
            </div>
            <div class="tree-select-items-content">
              <p>{{ item.goodsName }}</p>
              <p>{{ item.weight }}</p>
              <p>￥{{ item.price / 1000 }}</p>
            </div>
            <div
              class="shoppay"
              @click="addcar(item)"
              v-show="item.goodsCount < 1"
            >
              <van-icon name="shopping-cart-o" color="#fff" :badge="badges" />
            </div>
            <van-stepper
              class="goodsCo"
              :min="0"
              v-model="item.goodsCount"
              v-show="item.goodsCount >= 1"
              theme="round"
              button-size="22"
              disable-input
              @minus="jianshop(item)"
              @plus="jiashop(item)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  logintoken,
  shoplist,
  userinfo,
  listclass,
  servicergoods,
  usercarsave,
  usercarlist,
  listshopinfo,
  listclassclick,
  userupdate,
  usergoremove,
} from "./https/api";
import { Toast } from "vant";
export default {
  data() {
    return {
      active: 0,
      sum: 74,
      value: "",
      values: "",
      yang: 0,
      userlist: {
        password: "21232f297a57a5a743894a0e4a801fc3",
        tenantId: "000000",
        username: "manager",
      },
      userinfolist: {},
      usershoplist: [],
      newusershoplist: [],
      listcla: {},
      listclabox: {
        goodsCategoryId: 2,
        userId: 1123598821738675203,
        current: 1,
      },

      servicerglist: [],
      shopacrsave: {
        goodsCount: "1",
        goodsId: "2",
      },

      search: "",
      serverid: {
        id: "",
      },
      clicklistshop: [],
      titlename: "",
      badges: "",
      statyscar: [],
      indexpage: "",
      newsadaslish: {
        currents: 1,
      },
      startX: 0,
      startY: 0,
      isLoading: false,
      loadMoreText: "上拉加载更多",
    };
  },
  async created() {
    // const ress = await usercarlist();
    // this.statyscar = ress.data;
    this.serverid.id = this.$store.state.serverid;
    const res = await shoplist();
    this.usershoplist = res.data;
    let childlist = this.usershoplist.filter((item) => {
      return item.children != undefined;
    });
    childlist.map((item) => {
      this.newusershoplist = this.newusershoplist.concat(item.children);
    });
    this.newusershoplist.unshift({
      name: "全部",
      imgUrl: "https://s1.ax1x.com/2020/10/04/0GBWOx.th.png",
      id: "",
    });
    this.userinfo();
    // this.servicergoods(ress);
    this.clickindex({
      name: "全部",
      imgUrl: "https://s1.ax1x.com/2020/10/04/0GBWOx.th.png",
      id: "",
    });
  },
  methods: {
    inde(index) {
      this.yang = index;
      this.active = index;
    },
    touchStart(e) {
      this.startY = e.targetTouches[0].pageY;
      this.startX = e.targetTouches[0].pageX;
    },

    scrollToEnd(e) {
      let scrollHeight = this.$el.children[3].children[0].scrollHeight;
      let clientHeight = this.$el.children[3].children[0].clientHeight;
      let scrollTop = this.$el.children[3].children[0].scrollTop;
      if (scrollTop + clientHeight >= scrollHeight || this.enableLoadMore) {
        // this.currents++;
        console.log("到底了");
      }
    },
    touchEnd(e) {
      if (this.isLoading) {
        return;
      }
      let endX = e.changedTouches[0].pageX,
        endY = e.changedTouches[0].pageY,
        dy = this.startY - endY,
        dx = endX - this.startX;
      if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
        return;
      }
      if (endY < this.startY) {
        this.scrollToEnd(e);
      }
    },
    clickindex(e) {
      this.indexpage = e.id;
      this.titlename = e.name;
      let obj = {
        userId: this.$store.state.serverid,
        goodsCategoryId: e.id,
      };
      this.listclassclick(obj);
    },
    async listclassclick(e) {
      const res = await listclassclick(e);
      this.clicklistshop = res.data.records;
    },
    shop(e) {
      this.$router.push({
        name: "Shop",
        query: {
          re: e,
        },
      });
    },
    fentop(e, a) {
      this.yang = e;
      this.active = e;
      this.titlename = a.name;
      let obj = {
        userId: this.$store.state.serverid,
        goodsCategoryId: a.id,
      };
      this.listclassclick(obj);
    },
    timer() {
      return setTimeout(() => {
        this.userinfo();
      }, 300);
    },
    async userinfo() {
      const res = await userinfo(this.serverid);
      this.userinfolist = res.data;
    },
    // async servicergoods(e) {
    //   const res = await servicergoods();
    //   this.servicerglist = res.data.records;
    //   let sog = e.data;
    //   // this.statyscard
    //   sog.map((item) => {
    //     this.servicerglist.filter((items, index) => {
    //       return items.goodsName != "";
    //     });
    //   });
    //   // this.usercarlist();
    // },
    addcar(e) {
      if (e.goodsCount > e.stock || e.goodsCount > e.supplierStock) {
        Toast.fail({
          message: "仓库库存不足",
          duration: 500,
        });
      } else {
        let objet = {
          goodsId: e.goodsId,
        };
        this.usercarsave(objet);
        // this.usercarlist();
        Toast.success({
          message: "成功添加购物车",
          duration: 500,
        });
      }
    },
    userupdate(e) {
      userupdate(e).then((res) => {
        if (res.code == 200) {
          Toast.success({
            message: res.msg,
            duration: 500,
          });
        } else {
          Toast.fail({
            message: res.msg,
            duration: 500,
          });
        }
        this.listclassclick(e);
      });
      // if (res.code == 200) {
      //   console.log(this.indexpage);
      //   let obj = {
      //     goodsCategoryId: this.indexpage,
      //   };
      //   this.listclassclick(obj);
      // }else{
      //   console.log(res);
      // }
    },
    jianshop(e) {
      if (e.goodsCount <= 1) {
        e.goodsCount = 1;
        let obj = {
          ids: e.userGoodsCarId,
        };
        this.usergoremove(obj);
      } else {
        e.goodsCount--;
        let obj = {
          goodsCount: e.goodsCount,
          id: e.userGoodsCarId,
        };
        this.userupdate(obj);
      }
    },

    async usergoremove(e) {
      const res = await usergoremove(e);
    },
    jiashop(e) {
      e.goodsCount++;
      let obj = {
        goodsCount: e.goodsCount,
        id: e.userGoodsCarId,
      };
      this.userupdate(obj);
    },

    async usercarsave(e) {
      const res = await usercarsave(e);
      if (res.code == 200) {
        let obj = {
          userId: this.$store.state.serverid,
          goodsCategoryId: this.indexpage,
        };
        this.listclassclick(obj);
      }
    },
    // async usercarlist() {
    //   const res = await usercarlist();
    // },
  },
  computed: {
    tableData() {
      const search = this.search;
      if (search) {
        return this.clicklistshop.filter((data) => {
          return Object.keys(data).some((key) => {
            return String(data[key]).toLowerCase().indexOf(search) > -1;
          });
        });
      }
      return this.clicklistshop;
    },
  },
};
</script>
<style lang="scss" scoped>
.about {
  width: 100%;
  height: 100vh;
  padding-top: 60px;
  background: #fff;
  box-sizing: border-box;
  overflow: hidden;
}
.top-title {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding: 10px 15px 10px 15px;
  box-sizing: border-box;
}
.logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}
.top-title-con {
  p {
    &:nth-of-type(1) {
      height: 13.5px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #626262;
      margin-bottom: 10px;
    }
    &:nth-of-type(2) {
      height: 11.5px;
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #626262;
    }
  }
}
.shop-swiper {
  width: 100%;
  height: 70px;
  position: relative;
  overflow-x: scroll;
  border-bottom: 1px solid #eee;
  .shop-wrap {
    position: absolute;
    height: 70px;
    left: 0;
    top: 0;
    display: flex;
    overflow: hidden;
    .shop-items {
      width: 45px;
      height: 70px;
      margin: 0 5px 0 5px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .toptab {
        border-color: #00ae46 !important;
      }
      .shop-swiper-img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        border: 1px solid #fff;
        overflow: hidden;
        padding: 2px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      p {
        width: 100%;
        // width: 41px;
        height: 21px;
        font-size: 7px;
        font-family: PingFang SC;
        text-align: center;
        font-weight: 500;
        color: #626262;
      }
    }
  }
}
.van-tree-select__content {
  overflow-y: auto;
  flex: 3;
  position: relative;
}
.shop-list-right {
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
  .classs {
    width: 80px;
    height: 55vh;
    position: relative;
    padding-bottom: 50px;
    .van-sidebar {
      overflow-y: auto;
      position: absolute;
      left: 0;
      top: 0;
      a {
        &:before {
          background: #03b64c;
        }
      }
    }
  }
}
.shop-list-right-wrap {
  width: 100%;
  overflow-y: auto;
  position: relative;
  flex: 2;
  padding-bottom: 100px;
  box-sizing: border-box;
}
.tree-shop-wrap {
  width: 100%;
  padding-top: 50px;
  padding-bottom: 250px;
  box-sizing: border-box;
}
.tree-select-tit {
  width: 100%;
  height: 50px;
  padding: 0 10px 0 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1111111;
  p {
    width: 100%;
    height: 100%;
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #626262;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
  }
}
.tree-select-items {
  width: 100%;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 5px;
  box-sizing: border-box;
  .tree-select-items-img {
    width: 60px;
    height: 60px;
    background: #ffffff;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .tree-select-items-content {
    padding-top: 15px;
    padding-left: 15px;
    box-sizing: border-box;
    p {
      &:nth-of-type(1) {
        height: 26px;
        font-size: 13px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #242424;
      }
      &:nth-of-type(2) {
        height: 23px;
        font-size: 13px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #9f9f9f;
      }
      &:nth-of-type(3) {
        height: 28px;
        font-size: 13px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #f24f46;
        margin-top: 10px;
      }
    }
  }
  .goodsCo {
    position: absolute;
    right: 10px;
  }
  .shoppay {
    width: 30px;
    height: 30px;
    position: absolute;
    right: 10px;
    top: 50%;
    margin-top: -15px;
    background: linear-gradient(0deg, #01ba4c, #00ae46);
    border-radius: 50%;
    text-align: center;
    font-size: 13px;
    line-height: 35px;
  }
}
</style>