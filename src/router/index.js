import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//views路由组件,组件要求首字母大写
// import Login from '@/views/Login'


const routes = [
  {
    path: '/login', //path路径
    // 路由懒加载，可用箭头函数写！
    component: () => import("@/views/Login")
  }
  
]

const router = new VueRouter({
  routes
})

export default router
