import { createWebHistory,createRouter } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
    {
        path:'/',
        redirect:'/home'
    },
    {
        path:'/home',
        component:Home,
        children:[]
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