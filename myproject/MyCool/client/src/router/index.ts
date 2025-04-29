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
        path: '/Community',
        name: 'Community',
        component: () => import('../views/Community/Community.vue'),
       },
       {
        path: '/community/post/:id',
        name: 'PostDetail',
        component: () => import('../views/Community/PostDetail.vue'),
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
      path: '/Login',
      name: 'Login',
      component: () => import('../views/Login/Login.vue')
    },
    {
      path: '/Register',
      name: 'Register',
      component: () => import('../views/register/index.vue')
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      children: [
        {
          path: '',
          redirect: '/admin/dashboard'
        },
        {
          path: 'dashboard',
          name: 'AdminDashboard',
          component: () => import('../views/admin/Dashboard.vue')
        },
        {
          path: 'articles',
          name: 'AdminArticles',
          component: () => import('../views/admin/Articles.vue')
        },
        {
          path: 'users',
          name: 'AdminUsers',
          component: () => import('../views/admin/Users.vue')
        },
        {
          path: 'settings',
          name: 'AdminSettings',
          component: () => import('../views/admin/Settings.vue')
        }
      ]
    }
  ],
})

export default router
