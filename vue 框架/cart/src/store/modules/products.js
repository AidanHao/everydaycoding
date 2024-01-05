import shop from '../../api/shop'
//单纯的想数据
const state = {
    all:[]
}
const getters ={

}
const actions = {
    getAllProducts({commit}){//为何解构 actions 中函数都可以解构commit ， 调用相应的mutations actions 可以被dispatch
        shop.getProducts(products=>{
            commit('setProducts', products)
        })

    }
}
// 规则 同步的 可变的
const mutations = {
    setProducts(state,products){
        state.all = products;
    }
}
//store.cart.state.
export default {
    namespaced:true,//给分支添加命名空间
    state,
    getters,
    actions,
    mutations
}