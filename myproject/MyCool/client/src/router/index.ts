import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Entry',
      component: () => import('../views/Entry.vue'),
      children: [
        {
          path: '/',
          redirect: '/Home'
        },
       {
        path: '/Home',
        name: 'Home',
        component: () => import('../views/Home/Home.vue'),
       },
       {
        path: '/Public',
        name: 'Public',
        component: () => import('../views/Public.vue'),
       },
       {
        path: '/Self',
        name: 'Self',
        component: () => import('../views/Self/Self.vue'),
       },
       {
        path: '/article/:id',
        name: 'ArticleDetail',
        component: () => import('../views/Article/ArticleDetail.vue'),
       }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login/Login.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/register/index.vue')
    }
  ],
})

export default router
