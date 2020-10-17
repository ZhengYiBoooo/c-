<template>
  <div class="login">
    <van-form
      validate-first
      @failed="onFailed"
      @submit="onsubmit"
      class="osubmit"
    >
      <!-- 通过 pattern 进行正则校验 -->
      <van-field
        v-model="loginlist.username"
        name="username"
        placeholder="请输入用户名"
        class="valu"
        :rules="[{ pattern, message: '请输入正确用户名' }]"
      />
      <!-- 通过 validator 进行函数校验 -->
      <van-field
        v-model="loginlist.password"
        name="password"
        type="password"
        class="valu2"
        placeholder="请输入密码"
        :rules="[{ pattern, message: '请输入正确密码' }]"
      />
      <div style="margin-top: 16px; width: 100%">
        <van-button round block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import md5 from "js-md5";
import { Notify } from "vant";
import { logintoken } from "./https/api";
export default {
  data() {
    return {
      value3: "",
      pattern: /admin/,
      patterns: /admin/,
      loginlist: {
        username: "",
        password: "",
      },
      access_token: "",
      listmore: {},
    };
  },
  async created() {
    this.listmore = this.$route.query;
    const res = await logintoken(this.listmore);
    console.log(res);

    this.$store.commit("show", res.access_token);
    // localStorage.setItem("access_token", res.access_token);
    if (res.role_name == "cuser") {
      this.$router.push({
        name: "Home",
        query: {},
      });
    }
  },
  methods: {
    onFailed(errorInfo) {
      Notify({ type: "danger", message: "登录失败", duration: 1000 });

      console.log(this.loginlist);
    },
    async onsubmit(el) {
      // this.loginlist.password = md5(this.loginlist.password);
      // const res = await logintoken(this.loginlist);
      // this.access_token=res.access_token;
      // localStorage.setItem('avatar',res.avatar);
      // localStorage.setItem('access_token',this.access_token);
      // Notify({ type: "primary", message: "登录成功", duration: 1000 });
      // this.$router.push({
      //   name: "Home",
      // });
    },
  },
};
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: url("../assets/login.png");
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  .osubmit {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    position: absolute;
    bottom: 20%;
    .valu {
      width: 100%;
      border-radius: 10px;
      overflow: hidden;
    }
    .valu2 {
      width: 100%;
      border-radius: 10px;
      overflow: hidden;
      margin-top: 20px;
    }
  }
}
</style>