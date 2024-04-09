import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
      children:[
        {
          path: '/',
          redirect:'/first'
        },
        {
          path: '/first',
          name: 'first',
          component: () => import('../views/First.vue')
        },
        {
          path:'/bigfiles',
          name:'bigfiles',
          component: () => import('../views/BigFiles.vue')
        },
        {
          path:'/video',
          name:'video',
          component: () => import('../views/Video.vue')
        },
        {
          path:'/radio',
          name:'radio',
          component: () => import('../views/Radio.vue')
        },
        {
          path:'/image',
          name:'image',
          component: () => import('../views/Image.vue')
        },
        {
          path:'/another',
          name:'another',
          component: () => import('../views/Another.vue')
        }
      ]
    },
    {
      path:'/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    }
  ]
})


// 路径白名单


// 路由守卫
router.beforeEach((to,from,next)=>{//to是目的地，from是来源地

  document.title = to.meta.title//可以修改浏览器标签栏上的东西

  if(to.path=='/login'){
    if(sessionStorage.getItem('userInfo')){
      router.push('/first')
      return
    }
    next()
    return
  }
  next()
})


export default router
