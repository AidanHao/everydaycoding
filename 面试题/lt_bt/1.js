// 性能不好，一直在入栈
function dfs(node){
    // 深度
    console.log(node.value);
    for(let child of node)
    {
        dfs(child)
    }
}