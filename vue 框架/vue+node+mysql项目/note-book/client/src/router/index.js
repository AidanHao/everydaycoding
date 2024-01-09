import { createRouter, createWebHistory } from "vue-router";
const routes = [
    {
        path:'/',
        redirect:'/noteClass'
    }
    ,
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue'),
        meta:{
            title:'登录'
        }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/Register.vue'),
        meta:{
            title:'注册'
        }
    },
    {
        path: '/noteclass',
        name: 'noteclass',
        component: () => import('../views/NoteClass.vue'),
        meta:{
            title:'笔记分类'
        }
    },
    {
        path: '/noteList',
        name: 'noteList',
        component: () => import('../views/NoteList.vue'),
        meta:{
            title:'笔记列表'
        }
    },
    {
        path: '/noteDetail',
        name: 'noteDetail',
        component: () => import('../views/noteDetail.vue'),
        meta:{
            title:'笔记详情'
        }
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

//路径白名单
const whitePath = ['/login', '/register']


// 路由守卫 也被称为钩子函数
router.beforeEach((to, from, next) => {//to是目的地，from是来源地

    document.title=to.meta.title//可以修改浏览器标签栏上的东西

    if (!whitePath.includes(to.path)) {//你想去详情页
        if (!sessionStorage.getItem('userInfo')) {//没登陆
            router.push('/login')
            return //就不走后面的逻辑
        }
        next()
        return
    }

    next()//让你的下一跳能够成功，它会拦截，如果没有调用的话，页面会被截止 类似于koa里面的next()
})

export default router