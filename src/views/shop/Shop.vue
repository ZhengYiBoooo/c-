<template>
  <div id="wrap">
    <!-- 顶部跳转 -->
    <van-nav-bar
      id="nvbar"
      left-text=""
      :title="items"
      left-arrow
      @click-left="onClickLeft"
      :fixed="true"
      :class="boo ? navf : navt"
      ><template #left>
        <van-icon name="arrow-left" size="18" />
      </template>
    </van-nav-bar>
    <!-- 商品轮播图 -->
    <van-swipe
      @change="onChange"
      class="shop-swipe"
      :autoplay="autopa"
      id="videowrap"
    >
      <van-swipe-item v-for="(item, index) in shopmimglist" :key="index">
        <img :src="item" alt="" />
        <video
          :src="item"
          class="vidw"
          controls
          @play="paysd"
          @pause="pausesd"
        ></video>
      </van-swipe-item>
      <!-- <video width=" 100%" height="100%" src="" controls="controls" poster="../../assets/logo.png"> </video> -->

      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }}/{{ shoplength }}</div>
      </template>
    </van-swipe>
    <!-- 商品信息 -->
    <!-- goodsOldPrice 货物原价  goodsOldTotal 旧货物合计  goodsQuantity 货物数量  goodsShippingFare 货物运费  goodsCategory 货品类别  supplierStock 供应商库存   -->
    <div class="shop-info">
      <div class="shop-info-left">
        <p>￥{{ newshoplist.price / 1000 }}</p>
        <p>{{ newshoplist.goodsName }}</p>
        <p>
          <span>{{ newshoplist.weight }}</span>
        </p>
      </div>
      <div class="shop-info-right">
        <p>已售：{{ newshoplist.sales }}</p>
      </div>
    </div>
    <!-- 送货时长 -->
    <div class="shop-info-time">
      <span v-for="(item, index) in servlist" :key="index">{{ item }}</span>
    </div>
    <!-- 商家店铺跳转 -->
    <div class="shop-info-name">
      <div class="shop-info-name-img">
        <img :src="userinfolist.logo" alt="" />
      </div>
      <div class="shop-info-name-box">
        <p>{{ userinfolist.shopName }}</p>
        <p>商品 {{ userinfolist.stock }}</p>
      </div>
    </div>
    <!-- 分享 -->
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
    />
    
    <!-- 购物车 -->
    <van-goods-action>
      <van-goods-action-icon icon="cart-o" text="购物车" @click="onClickIcon" />

      <van-goods-action-button
        color="#01B44A"
        type="danger"
        text="加入购物车"
        @click="joincar"
      />
    </van-goods-action>

    <!-- 商品详情图片富文本 -->
    <div class="shop-img-info" v-for="(item, index) in fuwenben" :key="index">
      <img :src="item" alt="" />
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
var navtap = document.querySelector(".nvbar");
import { listshopinfo, userinfo ,usercarsave} from "../https/api";
export default {
  data() {
    return {
      showShare: false,
      options: [
        [
          { name: "微信", icon: "wechat" },
          { name: "微博", icon: "weibo" },
          { name: "QQ", icon: "qq" },
        ],
        [
          { name: "复制链接", icon: "link" },
          { name: "分享海报", icon: "poster" },
          { name: "二维码", icon: "qrcode" },
        ],
      ],
      showvideo: true,
      i: 0,
      current: 0,
      boo: false,
      navf: "navfff",
      navt: "navtran",
      items: "",
      fod: {
        id: "",
      },
      newshoplist: {},
      fuwenben: [],
      shopmimglist: [],
      shoplength: "",
      serverid: {
        id: "1123598821738675203",
      },
      userinfolist: {},
      servlist: [],
      videurl: "",
      autopa: 3000,
      shopinf:{
        goodsId:''
      }
    };
  },
  created() {
    this.fod.id = this.$route.query.re;
    this.listshopinfo();
    this.userinfo();
  },
  methods: {
    
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.showShare = true;
    },

    onChange(index) {
      this.current = index;
    },

    onClickIcon() {
      this.$router.push({
        name:'Shopcar'
      })
    },
    handleScroll() {
      // 页面滚动距顶部距离
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      var scroll = scrollTop - this.i;
      this.i = scrollTop;
      if (scrollTop < 46) {
        this.boo = false;
        this.items = "";
      } else {
        this.boo = true;
        this.items = this.newshoplist.goodsName;
      }
    },
    async userinfo() {
      const res = await userinfo(this.serverid);
      this.userinfolist = res.data;
    },
    async listshopinfo() {
      const res = await listshopinfo(this.fod);
      this.newshoplist = res.data;
      this.videurl = res.data.videoUrl;
      this.fuwenben = this.newshoplist.content.split(",");
      if (this.newshoplist.goodsImages.indexOf(",") == -1) {
        this.shopmimglist.push(this.newshoplist.goodsImages);
        if (res.data.videoUrl == "") {
        } else {
          this.shopmimglist.unshift(res.data.videoUrl);
        }
      } else {
        this.shopmimglist = this.newshoplist.goodsImages.split(",");
        if (res.data.videoUrl == "") {
        } else {
          this.shopmimglist.unshift(res.data.videoUrl);
        }
      }
      this.shoplength = this.shopmimglist.length;
      this.servlist = this.newshoplist.service.split(",");
      this.shopinf.goodsId=this.newshoplist.goodsId;
    },
    handlePlayVideo(is_media, idx, jumpData) {
      // 若是视handlePlayVideo频，且视频地址存在，点击播放
      if (is_media == 1 && jumpData.value) {
        let c_video_box = document.getElementById("video-box_" + idx);
        let c_video = document.getElementById("video_" + idx);
        // console.log('当前视频',c_video);
        c_video_box.style.zIndex = 5;
        this.curLunboIdx = idx;
        if (c_video) {
          c_video.play();
        }
      }
      //否则是图片，存在jumpData就跳转
      if (is_media == 0 && jumpData) {
        this.toJump(jumpData);
      }
    },
    paysd() {
      this.autopa = 0;
    },
    pausesd() {
      let timer=null;
      var that=this;
      timer=setTimeout(function () {
        that.autopa = 3000;
      }, 1000);
    },
    joincar(){
      this.usercarsave(this.shopinf);
    },
    async usercarsave(e){
      const res=await usercarsave(e);
      Toast.success({
        message:'成功添加购物车',
        duration:500
      });
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
};
</script>
<style lang="scss" scoped>
.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
}
.shop-swipe {
  width: 100%;
  height: 200px;
  overflow: hidden;
  img {
    width: 100%;
  }
  .vidw {
    width: 100%;
    height: 100%;
  }
}
#wrap {
  background: #f6f6f6;
  position: relative;
  #nvbar {
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
  }
  .navfff {
    background: #fff;
    color: #000;
  }
  .navtran {
    background: transparent;
    color: transparent;
  }
}
.shop-info {
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  background: #fff;
  .shop-info-left {
    p {
      &:nth-of-type(1) {
        font-size: 20px;
        color: red;
      }
      &:nth-of-type(2) {
        font-size: 14px;
        color: #000;
        margin: 10px 0 10px 0;
      }
      &:nth-of-type(3) {
        font-size: 10px;
        color: #667;
        span {
          &:nth-of-type(1) {
            margin-right: 20px;
          }
        }
      }
    }
  }
  .shop-info-right {
    p {
      &:nth-of-type(1) {
        font-size: 10px;
        color: #667;
      }
    }
  }
}
.shop-info-time {
  width: 100%;
  margin: 10px 0 10px 0;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background: #fff;
  span {
    font-size: 10px;
    color: #667;
    margin-right: 20px;
  }
}
.shop-info-name {
  width: 100%;
  padding: 10px 15px 10px 15px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background: #fff;
  margin-bottom: 10px;
  .shop-info-name-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .shop-info-name-box {
    margin-left: 10px;
    p {
      &:nth-of-type(1) {
        font-size: 14px;
        color: #000;
        margin: 0 0 5px 0;
      }
      &:nth-of-type(2) {
        font-size: 10px;
        color: #667;
      }
    }
  }
}
.shop-img-info {
  width: 100%;
  img {
    width: 100%;
  }
}
.vide {
  width: 100%;
  height: 200px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  background: #fff;
}
</style>