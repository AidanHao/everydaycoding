import {createWebHistory,createRouter} from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Newest from '../views/homeChild/newest.vue'


const routes = [
    {
        path:'',
        redirect:'/home',
    },
  
    {
        // path是提前写好的固定的
        path: '/home',//路由路径
        component: Home,//路由组件
        children: [
            // 重定向
            {
                path: '/home',
                redirect: '/home/newest',
            },
            {
                // 二级路由前面不要接/
                path:'newest',
                component: Newest,
            },
            {
                path:'recommend',
                // 不打花括号相当于return
                component:() => import('../views/homeChild/recommend.vue')
            }
        ]
    },
    {
        path: '/about',
        component: About
    },
]

const router = createRouter({
    history:createWebHistory(),//路由history模式，可以选hash模式
    // routes: routes
    routes
})
// 默认抛出，这样就能在另外一个js里面引用这个东西了
// import 和 export是一对
export default router