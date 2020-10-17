<template>
  <div id="wrap">
    <!-- 顶部跳转 -->
    <van-nav-bar
      id="nvbar"
      left-text=""
      :title="items"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      :fixed="true"
      :class="boo ? navf : navt"
      ><template #left>
        <van-icon name="arrow-left" size="18" />
      </template>
      <template #right>
        <van-icon name="share-o" size="18" />
      </template>
    </van-nav-bar>
    <!-- 商品轮播图 -->
    <van-swipe @change="onChange" class="shop-swipe">
      <van-swipe-item>
        <img :src="newshoplist.goodsImages" alt="" />
      </van-swipe-item>
      <van-swipe-item>
        <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="" />
      </van-swipe-item>
      <van-swipe-item>
        <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="" />
      </van-swipe-item>
      <van-swipe-item>
        <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="" />
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }}/4</div>
      </template>
    </van-swipe>
    <!-- 商品信息 -->
    <!-- goodsOldPrice 货物原价  goodsOldTotal 旧货物合计  goodsQuantity 货物数量  goodsShippingFare 货物运费  goodsCategory 货品类别  supplierStock 供应商库存   -->
    <div class="shop-info">
      <div class="shop-info-left">
        <p>￥{{ newshoplist.price }}</p>
        <p>{{ newshoplist.goodsName }}</p>
        <p>中果 {{ newshoplist.weight }}斤</p>
      </div>
      <div class="shop-info-right">
        <p>已售：{{ newshoplist.goodsOldTotal - newshoplist.goodsQuantity }}</p>
        <p>运费：{{ newshoplist.goodsShippingFare }}元</p>
      </div>
    </div>
    <!-- 送货时长 -->
    <div class="shop-info-time">
      <span>V24小时发货</span>
      <span>V隔日达</span>
    </div>
    <!-- 商家店铺跳转 -->
    <div class="shop-info-name">
      <div class="shop-info-name-img">
        <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="" />
      </div>
      <div class="shop-info-name-box">
        <p>噼里啪啦官方旗舰店</p>
        <p>商品 74</p>
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
      <van-goods-action-icon icon="chat-o" text="客服" @click="onClickIcon" />
      <van-goods-action-icon icon="cart-o" text="购物车" @click="onClickIcon" />

      <van-goods-action-button color="#01B44A" type="danger" text="立即购买" />
    </van-goods-action>
    <!-- 商品详情图片富文本 -->
    <div class="shop-img-info">
      <iframe src="//player.bilibili.com/player.html?aid=287448006&bvid=BV1vf4y1B7nH&cid=246089163&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
      <video src="https://www.bilibili.com/video/BV1vf4y1B7nH/" controls="controls"></video>
      <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="" />
      <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="" />
      <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="" />
      <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="" />
      <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="" />
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
var navtap = document.querySelector(".nvbar");
import { listshopinfo } from "../https/api";
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
      i: 0,
      current: 0,
      boo: false,
      navf: "navfff",
      navt: "navtran",
      items: "",
      infoid: "",
      newshoplist: {},
    };
  },
  created() {
    this.infoid = this.$route.query.re;
    this.listshopinfo();
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
      Toast("点击图标");
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

    async listshopinfo() {
      const res = await listshopinfo(this.infoid);
      this.newshoplist = res.data;
      console.log(this.newshoplist);
    },
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
  img {
    width: 100%;
  }
}
#wrap {
  background: #f6f6f6;
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
  align-items: center;
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
      }
    }
  }
  .shop-info-right {
    p {
      &:nth-of-type(1) {
        font-size: 10px;
        color: #667;
      }
      &:nth-of-type(2) {
        font-size: 10px;
        color: #667;
        margin: 20px 0 0 0;
      }
    }
  }
}
.shop-info-time {
  width: 100%;
  margin: 10px 0 10px 0;
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #dedede;
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
</style>