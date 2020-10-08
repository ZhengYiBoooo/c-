<template>
  <div>
    <van-nav-bar left-arrow @click-left="onClickLeft" id="addTop">
      <template #left>
        <van-icon name="arrow-left" size="18" />
        <span>{{name}}</span>
      </template>
      <template #right>
        <span>{{titleright}}</span>
      </template>
    </van-nav-bar>
  </div>
</template>
<script>
export default {
  data() {
    return {
        name:this.titleleft
    };
  },
  props:['urls','titleleft','titleright'],
  methods: {
    onClickLeft() {
      this.$router.push({
        name: this.urls,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
#addTop {
  background: #fff;
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
</style>