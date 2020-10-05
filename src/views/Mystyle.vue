<template>
  <div class="mysty">
    <div class="top-title">
      <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="" class="logo" />
      <div class="top-title-con">
        <p>优小果</p>
        <p>手机：17733933505</p>
      </div>
    </div>
    <div class="y-grid">
      <van-grid class="my-grid" :gutter="10" style="padding-left: 0">
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
      </van-grid>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.mysty {
  width: 100%;
  background: #fff;
  overflow: hidden;
  padding: 15px;
  padding-top: 30px;
  box-sizing: border-box;
  .top-title {
    width: 100%;
    display: flex;
    align-items: center;
  }
  .logo {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 10px;
  }
  .top-title-con {
    margin-top: -10px;
    p {
      &:nth-of-type(1) {
        height: 13.5px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #626262;
        margin-bottom: 8px;
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
  .y-grid {
    margin-top: 40px;
    .my-grid {
    }
  }
}
</style>