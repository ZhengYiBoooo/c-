<template>
  <div class="wrap">
    <!-- 导航栏 -->
    <opInion
      :urls="'Mystyle'"
      :titleleft="'消息通知'"
      :titleright="''"
    ></opInion>

    <div class="wrap-box">
      <div class="wrap-box-items">
        <div class="wrap-box-items-imgs">
          <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="" />
        </div>
        <div class="wrap-box-items-text">
          <p>消息通知</p>
          <p>您提交的退款申请已通过</p>
        </div>
        <div class="wrap-box-items-right">
          <span>2020-11-28</span>
          <span>13:45</span>
        </div>
      </div>
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
    return {};
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
  overflow: hidden;
  background: #fff;
  padding-top: 46px;
  box-sizing: border-box;
  .wrap-box {
    width: 100%;
    overflow: hidden;
    padding: 20px;
    box-sizing: border-box;
    background: #fff;
    .wrap-box-items {
      width: 100%;
      overflow: hidden;
      padding-bottom: 20px;
      padding-top: 20px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #eee;
      .wrap-box-items-imgs{
          width: 50px;
          height: 50px;
          overflow: hidden;
          margin-right: 10px;
          border-radius: 50%;
          img{
              width: 100%;
              height: 100%;
          }
      }
      .wrap-box-items-text{
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          width: 170px;
          p{
              width: 100%;
              font-size: 13px;
              &:nth-of-type(1){
                  font-size: 15px;
                  font-weight: bold;
                  margin-bottom: 6px;
              }
              &:nth-of-type(2){
                  color: #999;
              }
          }
      }
      .wrap-box-items-right{
          display: flex;
          justify-content: space-between;
          span{
              font-size: 13px;
                  color: #999;
                  &:nth-of-type(1){
                      margin-right:5px;
                  }
          }
      }
    }
  }
}
</style>