// 配置总的服务请求地址,基地址

// 导入store 中的token 令牌
import store from '@/store'

// 导入axios
import axios from 'axios'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net', // 基地址
  timeout: '3000' // 请求延时 超过时间直接404
})
export default request // 向外暴露

/** 不要用传统的 :axios.defaults.baseURL:'xxxxxxx'
传统的配置会导致一个项目只能用一个baseurl地址!
而aixos.create()方法可以配置多个url地址,适用不同的请求方法!

*/

// 配置请求拦截器
// 先导入vuex中的 token! import store from '@/store'=
request.interceptors.request.use(function (config) {
  // 在导入的vuex中,将tooken令牌对象进行结构！
  const {
    getters: { isLogin },
    state: { tokenObj }
  } = store

  // 根据令牌首先判断用户是否登录！
  if (isLogin) {
    // 每次get请求都传递token 令牌！
    config.headers.Authorization = `Bearer ${tokenObj.token}`
  }
  return config
})
