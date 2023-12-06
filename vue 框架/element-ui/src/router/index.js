import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path:'/',
    // 路由按区加载
    component:()=>import('@/views/Login.vue')
  },
  {
    // path:'/home/:user',

    // 第二种传参 
    // path:'/home',

    // 第三种
    // path:'/home/:user',

    // 第四种
    path:'/home',


    name:'home',
    component:()=>import('@/views/Home.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
