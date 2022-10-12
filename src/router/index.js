import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//views路由组件,组件要求首字母大写
// import Login from '@/views/Login'


const routes = [
  // 一级路由一般配置在app.js
  // 二级路由配置在父级的展示页!
  {
    path: '/',
    redirect: '/ ', //默认的子路由！
    component: () => import('@/views/Layout'),

  // 路由显示注意children的拼写!!
   // redirect 默认路由！    
    children: [
    // 子路由的path,如果不加 / ,自动将父级的路由的path和自己的path
      {
        path: '/ ',
        component: () => import('@/views/Home'),
      },
      {
        path: '/video',
        component: () => import('@/views/Video'),
      },
      {
        path: '/qa',
        component: () => import('@/views/QA'),
      },
      {
        path: '/profile',
        component: () => import('@/views/My'),
      },
    ]
  },

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
