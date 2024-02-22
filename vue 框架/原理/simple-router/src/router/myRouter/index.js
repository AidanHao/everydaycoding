import {ref} from 'vue'
import RouterLink from './RouterLink.vue'
import RouterView from './RouterView.vue'

// 注入，需要provide
import {inject} from 'vue'


const ROUTER_KEY = '_router_'//这是一个标记

function useRouter(){
    return inject(ROUTER_KEY)
}

function createRouter(options) {
    return new Router(options)//调用就返回一个实例对象
}

// options.history的执行结果就是这个函数的执行结果
function createWebHashHistory(){
    // 绑定事件，绑定一个fn回调函数
    function bindEvents(fn){
        // 监听hashchange 就执行回调函数fn，在浏览器路径#后面都是hash值，当这个哈希值发生变化时，我们就可以监听js自带的hashchange事件，就能够捕获到hash值的变更 
        window.addEventListener('hashchange', fn)
    }
    // 返回了一个对象，对象里面有一个函数
    return {
        // 这是一个函数
        bindEvents,
        // 返回一个函数，这个函数里面有一个url属性，这个url属性就是当前的路径
        // 通过window.location.hash获取当前的路径
        // window.location.hash.slice(1) || '/' 代表当前的路径，如果当前的路径为空，就默认为'/'
        // window.location.hash.slice(1) 代表当前的路径，如果当前的路径为空，就默认为'/'
        url:window.location.hash.slice(1) || '/'
    }
}

// es6 构造方法
class Router{
    constructor(options){
        // 拿到两个参数
        this.history = options.history
        this.routes = options.routes
        // 路由要能读到当前的路径
        this.current = ref(this.history.url)

        // 在函数初始化的时候直接调用掉history的bindEvents函数
        this.history.bindEvents(() => {
            // 这个箭头函数就是fn回调函数
           this.current.value= window.location.hash.slice(1)
        })
    }
    // vue内定的官方方法，第三方插件一定要具备install方法
    install(app){
        console.log(app);
        // ROUTER_KEY是我们声明的标记，this指向的是Router类
        app.provide(ROUTER_KEY,this)

        // 注册全局组件
        app.component('router-link',RouterLink)
        app.component('router-view',RouterView)

    }
}
//抛出
export {
        createRouter,
        createWebHashHistory,
        useRouter
}