<template>
  <div>
    <!-- 顶部跳转 -->
    <van-nav-bar
      left-text="返回"
      right-text="分享"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      :fixed="true"
      class="nvbar"
    />
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
        <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="">
        <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="">
        <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="">
        <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="">
        <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="">
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";

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

      current: 0,
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
.nvbar {
  background: transparent;
  border: none !important;
}
.shop-info {
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  padding: 0 15px 15px 15px;
  box-sizing: border-box;
  border-bottom: 1px solid #dedede;
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
.shop-img-info{
    width: 100%;
    img{
        width: 100%;
    }
}
</style>