<template>
  <div class="receive">
    <!-- 导航栏 -->

    <van-nav-bar left-arrow @click-left="onClickLeft" id="addTop">
      <template #left>
        <van-icon name="arrow-left" size="18" /><span>我的收货地址</span>
      </template>
      <template #right>
        <span class="sp-right" @click="Editressnew">添加新地址</span>
      </template>
    </van-nav-bar>
    <div class="receive-wrap">
      <div
        class="receive-items"
        v-for="(item, index) in presslist"
        :key="index"
      >
        <div class="receive-items-left">
          <div class="receive-items-left-title">
            <div class="receive-items-left-title-info">
              <span>{{ item.shippingName }}</span>
              <span>{{ item.shippingTel }}</span>
            </div>
            <span class="receive-items-tag"
              ><van-tag color="#00CC66">{{ item.label }}</van-tag></span
            >
          </div>
          <div class="receive-items-left-bottom">
            <p>{{ item.shippingAddress }}</p>
          </div>
        </div>
        <div class="receive-items-right">
          <van-icon name="newspaper-o" @click="editress(item)" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { userexpress } from "../https/api";
export default {
  data() {
    return {
      presslist: [],
    };
  },
  created() {
    this.userexpress();
  },
  methods: {
    onClickLeft() {
      if (this.$route.query.tag == "Receive") {
        this.$router.push({
          name: "Address",
        });
      } else {
        this.$router.push({
          name: "Mystyle",
        });
      }
    },
    editress(e) {
      this.$router.push({
        name: "Editress",
        query: {
          ids: e,
        },
      });
    },
    Editressnew() {
      this.$router.push({
        name: "Editress",
        query: {
          num: "10",
        },
      });
    },
    async userexpress() {
      const res = await userexpress();
      this.presslist = res.data.records;
      console.log(this.presslist);
    },
  },
};
</script>
<style lang="scss" scoped>
.receive {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  padding-top: 46px;
  box-sizing: border-box;
  background: #fcfcfc;
  #addTop {
    background: #fcfcfc;
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
  .receive-wrap {
    width: 100%;
    overflow: hidden;
    background: #fcfcfc;
    padding: 20px;
    box-sizing: border-box;
    .receive-items {
      width: 100%;
      background: #fff;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
      padding-bottom: 20px;
      box-sizing: border-box;
      box-shadow: 5px 5px 5px #eeee, -1px -1px 1px #eeee;
      margin-bottom: 20px;
      .receive-items-left {
        width: 100%;
        margin-right: 35px;
        .receive-items-left-title {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .receive-items-left-title-info {
            display: flex;
            justify-content: space-between;
            span {
              &:nth-of-type(1) {
                margin-right: 30px;
              }
            }
          }
          .receive-items-tag {
            .van-tag {
              margin: 0 4px 0 4px;
            }
          }
          span {
            font-size: 13px;
          }
        }
        .receive-items-left-bottom {
          margin-top: 10px;
          p {
            font-size: 15px;
          }
        }
      }
    }
  }
}
</style>