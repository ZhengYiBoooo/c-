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
        <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="" />
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
    <div class="shop-info">
      <div class="shop-info-left">
        <p>￥29.90</p>
        <p>红富士苹果</p>
        <p>中果 5斤</p>
      </div>
      <div class="shop-info-right">
        <p>已售：12</p>
        <p>运费：3元</p>
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
      <van-goods-action-button
        color="#be99ff"
        type="warning"
        text="加入购物车"
      />
      <van-goods-action-button color="#7232dd" type="danger" text="立即购买" />
    </van-goods-action>
    <!-- 商品详情图片富文本 -->
    <div class="shop-img-info">
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
    };
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
        this.items=""
      } else {
        this.boo = true;
        this.items="富士苹果"
      }
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
    height: 300px;
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
    i{
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