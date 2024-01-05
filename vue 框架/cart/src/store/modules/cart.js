const state = {
    items:[]
}
const getters ={

}
const actions = {
    addProductToCart({commit,state},product){
        if(product.inventory>0){
            // 这个state是解构来的
            const cartItem = state.items.find(item=>item.id ===product.id)
            if(!cartItem){
                commit('pushProductToCart',{id:product.id})
            }else{
                commit('incrementItemQuantity',cartItem)
            }
        }
    }
    // 维护库存这些
}
const mutations = {
    pushProductToCart(state,{id}){
        state.items.push({
            id,
            quantity:1
        })
    },
    incrementItemQuantity(state,{id}){
        const cartItem = state.items.find(item=>item.id ===id)
        cartItem.quantity++
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