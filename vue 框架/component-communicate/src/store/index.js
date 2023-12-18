// import {} from 'vuex'
import {createStore} from "vuex"

const store = createStore({
    state(){//data 公共数据源
        return {
            lists:['html','css','js']
        }
    },//只有仓库管理员能动仓库里面的数据
    mutations:{//methods 第一个参数是内定的，第二个参数是人为传递进去的
        listsAdd(state,val){
            state.lists.push(val)
        }

    }
})

export default store