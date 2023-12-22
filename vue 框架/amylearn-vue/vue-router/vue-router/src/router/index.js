//引入一个东西 来自vue-router
import { createWebHistory,createRouter } from 'vue-router'
//引入页面
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Newest from '../views/homeChild/newest.vue'


const routes = [
    {
        path:'/',
        redirect:'/home'
    },
    {
        path:'/home',
        component:Home,
        //子路由
        children:[
            {
                path:'/home',
                redirect:'/home/newest'
            },
            {
                // 二级路由不要加斜杠,如果要加就要补全
                path:'newest',
                component:Newest,
            },
            {
                // 不引入的写法
                path:'recommend',
                component:()=>import('../views/homeChild/recommend.vue')
            }
        ]
    },
    {
        path:'/about',
        component:About
    }

]


//定义一个变量调用createRouter
const router = createRouter({
    history:createWebHistory(),//路由模式
    // routes:routes
    routes
})

//抛出路由，相互引入
export default router