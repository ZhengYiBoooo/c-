const webpack = require('webpack');
module.exports = {

  publicPath: "./", //用法和webpack本身的output.publickPath用法一致
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 37.5 //根据设计图 
            //375的图就给37.5，也就是1rem=37.5px
          })
        ]
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        port:8080,
        // target:'http://192.168.0.3',
        target: 'http://47.108.68.7:9200',//后端的接口地址
        changeOrigin: true, //开启跨域
        pathRewrite: {
          '^/api': '',//这里即为重写后的地址，baseURL里的地址要换成这个
        },
      },
      'qqq':{
        target: 'weixin://wxpay/bizpayurl?pr=eJj8Fmf00',//后端的接口地址
      }
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",

        jQuery: "jquery",
        "windows.jQuery": "jquery"
      })
    ]
  },
}