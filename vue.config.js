const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //因为eslint 语法检查严格！练习时关闭！
  lintOnSave: false, //关闭eslit 语法检查！！
})
