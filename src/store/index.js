import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate' // 导入插件。
Vue.use(Vuex)
export default new Vuex.Store({
  // plugins 用专门用来配置vuex插件的
  // 调用该函数可以增加一个配置项！

  plugins: [
    createPersistedState({
      key: 'HEIMA_TOUTIAO', // 指定token名称
      // storage:window.sessionStorage,  //选择保存的位置，会客存储，本地存储
      // 使用本插件就无需去定义存储本地的方法了,只要触发这个函数即可自动存储,是响应式的！
      reducer({ tokenObj, myChannels, histories }) {
        // 指定需要持久化的数据,默认全部保存
        return {
          tokenObj,
          myChannels,
          // 在vuex配置历史记录！
          histories
        }
      }
    })
  ], // 调用一下这个函数,即可实现本地存储!
  state: {
    // 定义存储token
    tokenObj: {},
    // 本地存储我的数据
    myChannels: [],
    histories: [] // 保存搜索历史记录
  },
  mutations: {
    SET_TOKEN(state, tokenObj) {
      state.tokenObj = tokenObj
    },
    // 利用插件的配置项在本地存储我的数据!
    SET_MY_CHANNELS(state, channels) {
      state.myChannels = channels
    },
    // 调用一下这个函数,即可实现本地存储历史记录!
    SET_HISTORIES(state, histories) {
      state.histories = histories
    }
  },
  actions: {},
  modules: {},

  getters: {
    // 定义登录与未登录变量
    isLogin(state) {
      // 两次取反表示转为布尔值
      return !!state.tokenObj.token
    }
  }
})
