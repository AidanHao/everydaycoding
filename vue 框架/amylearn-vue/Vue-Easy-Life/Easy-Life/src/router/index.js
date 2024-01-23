import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path:'/',
    redirect:'/index'
  },
  {
    path:'/index',
    component: () => import('@/views/index.vue'),
    meta:{
      title:'首页'
    }
  },
  {
    path:'/mywallet',
    component: () => import('@/views/my-wallet.vue'),
    meta:{
      title:'我的钱包'
    }
  },
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