const list = [
    {
        id:1001,
        parentId:0,
        name:'AA',
    },
    {
        id:1002,
        parentId:1001,
        name:'BB',
    },
    {
        id:1003,
        parentId:1001,
        name:'CC',
    },
    {
        id:1004,
        parentId:1003,
        name:'DD'
    },
    {
        id:1005,
        parentId:1003,
        name:'EE'
    },
    {
        id:1006,
        parentId:1002,
        name:'FF'
    },
    {
        id:1007,
        parentId:1002,
        name:'HH'
    },
    {
        id:1008,
        parentId:1004,
        name:'II'
    },
    {
        id:1009,
        parentId:1005,
        name:'JJ'
    },
]
  // 暴力解法
  function listToSimpleTree(data){
    const res = [];

    data.forEach(item=>{
        const parent = data.find(node =>node.id === item.parentId)
        if(parent){
            // 如果没有就初始化一下
            parent.children = parent.children || []
            parent.children.push(item)
        }else{
            // 一级节点
            res.push(item)
        }
    })

    return res
}
console.log(listToSimpleTree(list));