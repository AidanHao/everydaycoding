import {createStore} from './gvuex'
// import {createStore} from 'vuex'
// 全局共享状态 组件树 单一状态树
// 状态树对象 里面有一个modules 相当于分支，里面有很多节点state
// $store.state.goods.item
// 单例模式
const store = createStore({
    state(){
        return {
            count:1
        }
    },
    getters:{
        double(state){
            return state.count * 2
        }
    },
    mutations:{
        add(state){
            state.count++
        }
    },
    actions:{
        // actions里面都会有一个对象，提交一个mutations触发修改
        asyncAdd({commit}){
            setTimeout(()=>{
                commit('add')
            },1000)
        }
    }
})

export default store