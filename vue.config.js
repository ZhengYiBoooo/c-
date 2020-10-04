module.exports = {
  
  publicPath:"./", //用法和webpack本身的output.publickPath用法一致
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
}