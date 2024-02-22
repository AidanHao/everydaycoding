// import {createRouter,createWebHistory,createWebHashHistory} from 'vue-router'
import {createRouter,createWebHashHistory} from './myRouter'
import Home from '../views/Home.vue'
import About from '../views/About.vue'


const routes = [
    {
        path:'/',
        name:'home',
        component:Home
    },
    {
        path:'/about',
        name:'about',
        component:About
    }
]

const router = createRouter({
    // history:createWebHistory(),//history模式 hash模式
    history:createWebHashHistory(),//hash模式
    routes
})

export default router