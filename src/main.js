import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入字体图标
import '@/assets/fonts/iconfont.css'

// 全部引入 vant组件
import Vant from 'vant';
import 'vant/lib/index.css'; 
Vue.use(Vant);


//导入flexible动态设置包！根据不同设备的变化px字体大小,让rem动起来!
import "amfe-flexible"


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
