import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  // plugins 用专门用来配置vuex插件的
  // 调用该函数可以增加一个配置项！
  plugins: [createPersistedState(
    {
      key: 'HEIMA_TOUTIAO', //指定token名称
      // storage:window.sessionStorage,  //选择保存的位置，会客存储，本地存储
      reducer({tokenObj }) { //指定需要持久化的数据,默认全部保存
        return {
           tokenObj,
        }
      }
      }

  )], //调用一下这个函数,即可实现本地存储!
  state: {
    // 定义存储token
    tokenObj: {
       
     }
  },
  mutations: {
    SET_TOKEN(state, tokenObj) {
      state.tokenObj = tokenObj
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
  },
})
