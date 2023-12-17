const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 配置跨域处理
  devServer:{
    proxy:{
      // api代码我们的目标地址 是一个代理
      '/api':{
        target:'http://ustbhuangyi.com/sell/',
        // 允许换源，跨域v
        changeOrigin:true,
        pathRewrite:{
          '^/api':'/api'
        }

      }
    }
  }
})
