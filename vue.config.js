const px2rem = require('postcss-px2rem');

// 配置基本大小
const postcss = px2rem({
  // 基准大小 baseSize，需要和rem.js中相同
  remUnit: 16
})

// 使用等比适配插件
module.exports = {
  productionSourceMap: false, //去除打包后js的map文件
  publicPath: process.env.NODE_ENV === 'production' ? '/device/' : '/',
  assetsDir: 'static',
  lintOnSave: true,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          postcss
        ]
      }
    }
  }
}
