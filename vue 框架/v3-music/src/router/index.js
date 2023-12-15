import { createRouter, createWebHashHistory } from "vue-router";

// 完成路由配置 URL => Component
// PC 兼容性 history兼容性不好
const router = createRouter({
    //有两种模式history 和 hash
    history:createWebHashHistory(),
    routes:[
        {
            path:'/',
            name:'home',
            // App.vue 是用来挂载的，不是用来写具体的
            component:()=> import('@/views/Root.vue'),
            redirect:{name:'discover'},
            children:[
                {
                    path:'discover',
                    name:'discover',
                    component: () =>import('@/views/discover/Discover.vue')
                }
            ]
            
        }
    ]
})

export default router