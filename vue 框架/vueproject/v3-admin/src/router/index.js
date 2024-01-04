// 后台系统，为什么用history模式 Hash丑但是兼容性好，但是history用的html5的history.pushState方法 后台系统不是用户访问的，后台管理系统是公司内部访问的 chrome 
// 用户端 移动项目没这个问题 一定是html5以上， 如果是pc端 政府，企业 

import {createRouter,createWebHistory} from 'vue-router'
import {usePermissStore} from '../store/permiss'
import Home from '../views/Home.vue';//直接引入 只要应用首页就可以，因为导入它需要开销，

// const data = usePermissStore(); //hooks 函数式编程
// console.log(data);



//路由配置 后台管理系统
//设置数组 admin 能拿到[1,2,3]  user 拿到[1] 通过useRouter找到meta.permiss 你要访问的页面需要的权限 includes 判断true or false 

const routes = [
    {
        path:'/',
        redirect:'/dashboard'//重定向 状态码30x 301~302
    },
    {
        path:'/',
        name:'Home',//useRouter push 方法拿到
        component:Home,//使用layout
        children:[
            {
                path:'/dashboard',
                name:'dashboard',
                meta:{
                    title:'系统首页',//路由守卫
                    permiss:'1'//哪些页面可以看的
                },
                component:()=>import('../views/Dashboard.vue')
            },
            {
                path:'/table',
                name:'basetable',
                meta:{
                    title:'表格',//路由守卫
                    permiss:'2'//哪些页面可以看的
                },
                //动态挂载路由，异步
                component:()=>import('../views/Table.vue')
            }
        ]
    },
    {
        path:'/403',
        name:'403',
        meta:{
            title:'没有权限'
        },
        component:()=>import('../views/403.vue')
    },
]

const router = createRouter({
    history:createWebHistory(),
    routes
})

//路由守卫
router.beforeEach((to,from,next)=>{
    document.title = `${to.meta.title} | 后台管理系统`;
    // 登录后的用户角色
    // const role = localStorage.getItem('ms_username');
    const role = 'admin'; //先假设我们拿到了
        const permiss = usePermissStore();
    //可以拿到角色
    // console.log(permiss)
    if(!role&&to.path!=='/login'){
        next('/login');
    }else if(to.meta.permiss&&
        !permiss.roleList[role].includes(to.meta.permiss)){
        next('/403')
    }else{
        next()
    }
})
export default router