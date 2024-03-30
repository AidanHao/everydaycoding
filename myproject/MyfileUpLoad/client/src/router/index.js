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

export default router
