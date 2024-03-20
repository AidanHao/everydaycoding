const oldChildren = n1.children
const newChildren = n2.children

let lastIndex = 0 // ?

for(let i = 0; i<newChildren.length;i++){
    const newVNode = newChildren(i)
    let j = 0
    let find = false
    // 创建dom节点，并且挂载到页面是性能开销是最大的
    for(j;j < oldChildren.length;j++){
        if(newVNode.key === oldVNode.key){
            find = true
            pathch(oldVNode, newVNode,container)
            if(j < lastIndex){
                // 插入元素比新增元素，性能好很多 insertBefore
                const anchor = prevVNode.el.nextSibing
                const prevNode = newChildren[i-1]
                if(prevNode){
                    
                }
                insert(newVNode.val,container,anchor)
            }
        }else{
            lastIndex = j
        }
        break
    }
}