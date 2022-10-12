
// 因为vant组件默认使用的时37.5为适配
//但根据自己的公司的项目,例如设计稿时750,就会引发冲突！
//所以必须要自定义配置,vant用37.5,设计稿用75
module.exports = {
    plugins: {
      'postcss-pxtorem': {
        rootValue({ file }) { //一个file参数
      //通过indeof == -1语法表示查找到是vant组件，不是就用 75设计稿
          return file.indexOf('vant') !== -1 ? 37.5 : 75;
          // 或者 rootValue: ({ file }) => (/vant/.test(file) ? 37.5 : 75),
        },
        //所有元素，例如width,heihgt
        propList: ['*']
      }
    }
}
  



// vant官方提供适配对象！
// // postcss.config.js
// module.exports = {
//   plugins: {
//     // postcss-pxtorem 插件的版本需要 >= 5.0.0
//     'postcss-pxtorem': {
//       rootValue({ file }) {
//         return file.indexOf('vant') !== -1 ? 37.5 : 75;
//       },
//       propList: ['*'],
//     },
//   },
// };