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
    port: 8080, //默认的打开端口号
    open: true, //自动打开浏览器
    host: 'localhost', //本地地址
    proxy: {
      '/api': {
        target: 'http://192.168.0.50',//后端的接口地址
        changeOrigin: true, //开启跨域
        pathRewrite: {
          '^/api': '',//这里即为重写后的地址，baseURL里的地址要换成这个
        },
      }
    }
  }
}