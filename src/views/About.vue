<template>
  <div class="about">
    <!-- 商家名称 -->
    <div class="top-title">
      <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="" class="logo" />
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
          @click="fentop(index)"
        >
          <div class="shop-swiper-img" :class="yang == index ? 'toptab' : ''">
            <img :src="item.imgUrl" />
          </div>
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
    <!-- 侧栏分类商品 -->
    <div class="shop-list-right">
      <van-sidebar v-model="active" @change="inde(active)">
        <van-sidebar-item
          :title="item.name"
          v-for="(item, index) in newusershoplist"
          :key="index"
        />
      </van-sidebar>

      <div class="shop-list-right-wrap">
        <div class="tree-shop-wrap">
          <div class="tree-select-tit">
            <p>全部</p>
          </div>
          <div class="tree-select-items"  v-for="(item,index) in tableData" :key="index">
            <div class="tree-select-items-img" @click="shop(item.id)">
              <img :src="item.goodsImages" alt="" />
            </div>
            <div class="tree-select-items-content">
              <p>{{item.goodsName}}</p>
              <p>中果 5斤</p>
              <p>￥16.90</p>
            </div>
            <div class="shoppay" @click="addcar(item)">
              <van-icon name="shopping-cart-o" color="#fff" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { logintoken, shoplist, userinfo, listclass,servicergoods,usercarsave ,usercarlist,listshopinfo} from "./https/api";
export default {
  data() {
    return {
      active: 0,
      sum: 74,
      value: "",
      yang: 0,
      top_list: [
        {
          text: "全部",
          url: "https://img.yzcdn.cn/vant/cat.jpeg",
        },
        {
          text: "柠檬",
          url: "https://img.yzcdn.cn/vant/cat.jpeg",
        },
        {
          text: "猕猴桃",
          url: "https://img.yzcdn.cn/vant/cat.jpeg",
        },
        {
          text: "蓝莓",
          url: "https://img.yzcdn.cn/vant/cat.jpeg",
        },
        {
          text: "香蕉",
          url: "https://img.yzcdn.cn/vant/cat.jpeg",
        },
        {
          text: "牛油果",
          url: "https://img.yzcdn.cn/vant/cat.jpeg",
        },
        {
          text: "百香果",
          url: "https://img.yzcdn.cn/vant/cat.jpeg",
        },
        {
          text: "西瓜",
          url: "https://img.yzcdn.cn/vant/cat.jpeg",
        },
        {
          text: "句子",
          url: "https://img.yzcdn.cn/vant/cat.jpeg",
        },
      ],
      userlist: {
        password: "21232f297a57a5a743894a0e4a801fc3",
        tenantId: "000000",
        username: "manager",
      },
      userinfolist: {},
      usershoplist: [],
      newusershoplist: [],
      listcla:{},
      listclabox:{
        goodsCategoryId:2,
        userId:1123598821738675203,
        current:1
      },
      
      servicerg:{
        size:'',
        current:''
      },
      servicerglist:[],
      shopacrsave:{
        goodsCount:'1',
        goodsId:'2'
      },
      
      search: "",
    };
  },
  async created() {
     const res = await shoplist();
      this.usershoplist = res.data;
      this.usershoplist.map((item) => {
        this.newusershoplist = this.newusershoplist.concat(item.children);
      });
    this.userinfo();
    this.listclass();
    this.servicergoods();
  },
  methods: {
    inde(index) {
      this.yang = index;
      this.active = index;
      console.log();
    },
    shop(e) {
      this.$router.push({
        name: "Shop",
        query:{
          re:e
        }
      });
    },
    fentop(e) {
      this.yang = e;
      this.active = e;
    },
    timer(){
        return setTimeout(()=>{
          this.userinfo()
        },300)
    },
    async userinfo() {
      const res = await userinfo();
      this.userinfolist = res.data;
    },
    async listclass() {
      const res = await listclass(this.listclabox);
    },
    async servicergoods(){
      const res=await servicergoods(this.servicerg);
      this.servicerglist=res.data.records;
    },
    addcar(e){
      console.log(e.goodsId);
      let objet={
        goodsId:e.goodsId,
        goodsCount:'1'
      }
      this.usercarsave(objet);
      this.usercarlist();
    },
    async usercarsave(e){
      const res=await usercarsave(e);
      console.log(this.servicerglist);
    },
    async usercarlist(){
      const res=await usercarlist();
      console.log(res);
    },
  },
    computed: {
    tableData() {
      const search = this.search;
      if (search) {
        return this.servicerglist.filter((data) => {
          return Object.keys(data).some((key) => {
            return String(data[key]).toLowerCase().indexOf(search) > -1;
          });
        });
      }
      return this.servicerglist;
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
  border-bottom: 1px solid #dedede;
  .shop-wrap {
    position: absolute;
    height: 70px;
    left: 0;
    top: 0;
    display: flex;
    .shop-items {
      width: 45px;
      height: 70px;
      margin: 0 5px 0 5px;
      .toptab {
        border-color: #00ae46 !important;
      }
      .shop-swiper-img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        border: 1px solid #fff;
        overflow: hidden;
        text-align: center;
        padding: 1px;

        img {
          width: 45px;
          height: 45px;
          border-radius: 50%;
        }
      }
      p {
        width: 41px;
        height: 21px;
        font-size: 10px;
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
}
.shop-list-right-wrap {
  width: 100%;
  overflow-y: auto;
  position: relative;
  flex: 2;
}
.tree-shop-wrap {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  padding-top: 50px;
  padding-bottom: 150px;
  box-sizing: border-box;
}
.tree-select-tit {
  width: 100%;
  height: 50px;
  padding: 0 10px 0 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dedede;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1111111;
  p {
    width: 42px;
    height: 21px;
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #626262;
  }
}
.tree-select-items {
  width: 100%;
  border-bottom: 1px solid #dedede;
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
  .shoppay {
    width: 30px;
    height: 30px;
    position: absolute;
    right: 10px;
    bottom: 10px;
    background: linear-gradient(0deg, #01ba4c, #00ae46);
    border-radius: 50%;
    text-align: center;
    font-size: 13px;
    line-height: 35px;
  }
}
</style>