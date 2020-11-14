<template>
  <div class="myhome">
    <!-- 导航栏 -->

    <opInion
      :urls="'Mystyle'"
      :titleleft="''"
      :titleright="''"
      :centertitle="'个人信息'"
    ></opInion>

    <!-- 用户信息 -->
    <div class="my-home-wrap">
      <div class="my-home-items">
        <div class="my-home-img">
          <img :src="scrimg" alt="" class="logo" />
        </div>
        <van-uploader :after-read="afterRead" >
          <van-button icon="plus" type="primary" style="border:none;background:#fff">修改头像</van-button>
        </van-uploader>
      </div>
      <div
        class="my-home-children"
      >
        <span>昵称</span>
        <span @click="mynames">优小果
          <van-icon name="arrow" />
        </span>
      </div>
      <div class="my-home-children">
        <span>性别</span>
        <span @click="mygender"
          >{{ gener }}
          <van-icon name="arrow" />
        </span>
      </div>
      <div class="my-home-children">
        <span>手机</span>
        <span @click="myphone"
          >17733933505
          <van-icon name="arrow" />
        </span>
      </div>
      <!-- 退出登陆 -->
      <van-button type="primary" size="large" round class="btn"
        >退出登陆</van-button
      >
    </div>
  </div>
</template>
<script>
import opInion from "../../components/navbar/navbar.vue";
export default {
  components: {
    opInion,
  },
  data() {
    return {
      gener: "请选择",
      scrimg:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602938511015&di=3964a67339022caba9ca7c00528bbde7&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F70%2F91%2F01300000261284122542917592865.jpg'
    };
  },
  created() {
    this.gener = this.$route.query.ctr;
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: "Mystyle",
      });
    },
    mygender() {
      this.$router.push({
        name: "MyGender",
      });
    },
    myphone() {
      this.$router.push({
        name: "Myphone",
      });
    },
    
    afterRead(file) {
      this.scrimg=file.file.name;
    },
    mynames(){
      this.$router.push({
        name: "Mynames",
      });
    }
  },
};
</script>
<style lang="scss" scoped>
.myhome {
  width: 100%;
  background: #fff;
  padding-top: 46px;
  .my-home-wrap {
    width: 100%;
    background: #fff;
    overflow: hidden;
    padding: 15px;
    box-sizing: border-box;
    .my-home-items {
      width: 100%;
      overflow: hidden;
      border-bottom: 1px solid #eee;
      padding: 10px 0 20px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      span {
        font-size: 15px;
        color: #00ae47;
      }
      i{
        display: none;
      }
      .my-home-img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .my-home-children {
      width: 100%;
      overflow: hidden;
      padding: 20px 0 20px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        font-size: 15px;
        font-weight: bold;
        &:nth-of-type(2) {
          font-size: 15px;
          font-weight: normal;
          display: flex;
          align-items: center;
        }
      }
    }
    .btn {
      margin-top: 50px;
    }
  }
}
</style>