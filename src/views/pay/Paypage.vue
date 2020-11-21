<template>
  <div class="wrap">
    <opInion
      :urls="'Oderall'"
      :titleleft="''"
      :titleright="''"
      :centertitle="'支付'"
    ></opInion>
    <div v-show="padyUrl != ''">
      <div class="qrcode" ref="qrCodeUrl"></div>
    </div>
    <div
      v-html="zhifubao"
      style="height: 100px"
      class="bodys"
      v-show="padyUrl != ''"
    >
      <!-- {{ zhifubao }} -->
    </div>
    <!-- <button @click="dias">点击跳转</button> -->

    <iframe
      :src="padyUrl"
      frameborder="0"
      class="ifms"
      v-show="padyUrl == ''"
    ></iframe>
  </div>
</template>

<script>
import axios from "axios";
import opInion from "../../components/navbar/navbar.vue";
// import QRCode from "../js/qrcode";
import QRCode from "qrcodejs2";
import wx from "weixin-js-sdk";
import { b2expinfolist } from "../https/api";

export default {
  components: {
    opInion,
  },
  data() {
    return {
      list: "hello world↵hello world↵hello world",
      payusers: "weixin://wxpay/bizpayurl?pr=NvPoopZ00",
      usermain: "",
      zhifubao: "",
      cuo: "",
      smallPro: "",
      paymoe: "",
      padyUrl: "",
    };
  },
  created() {
    let abc = "hello123 <world↵hello";
    if (this.$route.query.es == undefined) {
    } else {
      if (this.$route.query.es.charAt(0) == "w") {
        this.padyUrl='';
        this.usermain = this.$route.query.es;
        console.log(this.usermain);
        console.log(this.padyUrl);
      }
      if (this.$route.query.es.charAt(0) == "<") {
        this.padyUrl='';
        this.zhifubao = this.$route.query.es;
        // let ab = this.zhifubao.substr(this.zhifubao.indexOf("<script"));
        // this.zhifubao = this.zhifubao.replace(ab, "");
      } else {
        this.padyUrl = this.$route.query.es;
        // window.open(this.cuo,'_self');
      }
    }
    let as = abc.substr(abc.indexOf("<world"));

    // clearInterval(timer);
    // var that = this;

    // var timer = null;
    // timer = setInterval(function () {
    //   let obj = {
    //     id: that.$route.query.idp,
    //   };
    //   b2expinfolist(obj).then((res) => {
    //     if (res.code == 200) {
    //       console.log(res.data.status);
    //       if (res.data.status != 1) {
    //         clearInterval(timer);
    //         that.$router.push({
    //           name: "Oderall",
    //         });
    //       }
    //     }
    //   });
    // }, 3000);
  },
  methods: {
    creatQrCode() {
      var qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: this.usermain, // 需要转换为二维码的内容
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });
    },
    dias() {
      wx.miniProgram.navigateTo({
        url: "/pages/models/waitPay/waitPay",
      });
    },
  },
  mounted() {
    this.creatQrCode();
    if (document.forms[0] != undefined) {
      this.$nextTick(() => {
        document.forms[0].submit(); //这里就是获取第一个表单并提交
      });
    }
  },
};
</script>

<style>
.bodys form input {
  margin: 0 auto;
  border: none;
  padding: 20px 30px 20px 30px;
  border-radius: 10px;
  box-sizing: border-box;
  display: block !important;
}
</style>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  padding-top: 46px;
  box-sizing: border-box;
  background: #fff;
}
.qrcode {
  margin: 100px auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bodys {
  form {
    height: 100px;
    input {
      display: block !important;
    }
  }
  script {
    display: none;
  }
}

.ifms {
  width: 100%;
  height: 100vh;
  #page {
    background: red;
  }
}
</style>