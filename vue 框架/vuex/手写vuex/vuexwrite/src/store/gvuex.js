// 状态里面的响应式是vue自己封装的
import { computed, inject ,reactive} from "vue"

const STORE_KEY = '__stote__'
// vue3.0版本
function useStore(){
    return inject(STORE_KEY)
}
class Store{// 单一状态树对象
    constructor(options){
        this.$options =options
        // 私有的
        // Store.state.xxxx
        this._state = reactive({
            data:options.state()
        })
        this._mutations = options.mutations
        this._actions = options.actions
        this.getters = {}

        Object.keys(options.getters).forEach(name=>{
            const fn = options.getters[name]
            // store.getters.double 要延迟执行，computed比较合适
            this.getters[name] = computed(()=>fn(this.state))//computed有响应式，语法格式也是一个函数，函数的返回值就是getters的属性值，是执行一下函数拿到结果的
        })
    }
    // store.state
    // 这样就完成了对状态的保护
    get state(){
        return this._state.data
    }
    // 
    commit= (type,payload)=>{
        // 调用mutations的时候第一个就类似
        // 第二个状态要怎么修改
        const entry = this._mutations[type]
        // 通过解构赋值 this->{{commit}}
        entry && entry(this.state,payload)
    }

    dispatch(type,payload){
        const entry = this._actions[type]
        return entry && entry(this,payload)
    }
    install(app){
        // console.log(app);
        // 电台 发布者 provide inject
        // 订阅者只要inject一下就可以使用 全局共享状态
        app.provide(STORE_KEY,this)
    }
}

function createStore(options){
    return new Store(options)
}
export {createStore,useStore}