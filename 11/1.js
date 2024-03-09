const tree = [{
    id: 1,
    name: '一级 1',
    children: [{
        id: 4,
        name: '二级 1-1',
        children: [{
            id: 9,
            name: '三级 1-1-1'
        }, {
            id: 10,
            name: '三级 1-1-2'
        }]
    }, {
        id: 5,
        name: '二级 1-2',
        children: [{
            id: 11,
            name: '三级 1-2-1'
        }]
    }]
}, {
    id: 2,
    name: '一级 2',
    children: [{
        id: 6,
        name: '二级 2-1',
        children: [{
            id: 13,
            name: '三级 2-1-1'
        }]
    }]
}]
// 实现一个方法，getAllIdsByLevel(tree, level)获取指定小于等于level层级的所有id
function getAllIdsByLevel(tree, level){
    let allid= []
    if(level===1)
    {
        for(let i = 0 ;i<tree.length;i++)
        {
            allid.push(tree[i].id)
        }
    }else if(level > 1)
    {
        for(let i = 0 ;i<tree.length;i++)
        {
            allid.push(tree[i].id)
            allid.push(...getAllIdsByLevel(tree[i].children,level-1))
        } 
    }
    return allid
}

console.log(getAllIdsByLevel(tree,3));