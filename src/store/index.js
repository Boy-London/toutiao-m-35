import Vue from "vue";
import Vuex from "vuex";

import createPersistedState from "vuex-persistedstate"; //导入插件。
Vue.use(Vuex);
export default new Vuex.Store({
  // plugins 用专门用来配置vuex插件的
  // 调用该函数可以增加一个配置项！

  
  plugins: [
    createPersistedState({
      key: "HEIMA_TOUTIAO", //指定token名称
      // storage:window.sessionStorage,  //选择保存的位置，会客存储，本地存储
      // 使用本插件就无需去定义存储本地的方法了,只要触发这个函数即可自动存储,是响应式的！
      reducer({ tokenObj }) {
        //指定需要持久化的数据,默认全部保存
        return {
          tokenObj,
        };
      },
    }),
  ], //调用一下这个函数,即可实现本地存储!
  
  state: {
    // 定义存储token
    tokenObj: {},
  },
  mutations: {
    SET_TOKEN(state, tokenObj) {
      state.tokenObj = tokenObj;
    },
  },
  actions: {},
  modules: {},
  
  getters: {
    //定义登录与未登录变量
    isLogin(state) {
      //两次取反表示转为布尔值
      return !!state.tokenObj.token;
    },

  },
});
