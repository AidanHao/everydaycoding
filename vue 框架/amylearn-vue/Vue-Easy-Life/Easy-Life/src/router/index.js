import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path:'/',
    redirect:'/index'
  },
  // 首页
  {
    path:'/index',
    component: () => import('@/views/index.vue'),
    meta:{
      title:'首页'
    },
    children:[
      {
        path:'/index',
        redirect:'/index/life'
      },
      {
        path:'life',
        component:() => import('@/views/life.vue')
      },
      {
        path:'mine',
        component:() => import('@/views/mine.vue')
      },
      
    ]
  },
  // 我的钱包
  {
    path:'/mywallet',
    component: () => import('@/views/my-wallet.vue'),
    meta:{
      title:'我的钱包'
    }
  },
  // 卡包
  {
    path:'/mycard',
    component: () => import('@/views/my-card.vue'),
    meta:{
      title:'我的卡包'
    }
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router