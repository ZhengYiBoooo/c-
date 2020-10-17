<template>
  <div class="myhome">
    <!-- 导航栏 -->

    <opInion
      :urls="'Myhome'"
      :titleleft="''"
      :titleright="'确定'"
      :centertitle="'修改昵称'"
    ></opInion>

    <!-- 用户信息 -->
    <div class="my-home-wrap">
      <div class="my-home-items">
        <van-cell-group>
          <van-field
            v-model="value2"
            clearable
            placeholder="显示清除图标"
          />
        </van-cell-group>
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
    return {
      value1: "",
      value2: "123",
    };
  },
  created() {
    this.gener = this.$route.query.ctr;
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.myhome {
  width: 100%;
  height: 100vh;
  background: #f6f6f6;
  overflow: hidden;
  padding-top: 46px;
  .my-home-wrap {
    width: 100%;
    background: #fff;
    overflow: hidden;
    padding: 15px;
    box-sizing: border-box;
  }
}
</style>