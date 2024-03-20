// patches 的过程 我们有哪些改变要收集呢？
// [{type:}]
// patchFlag 变量 响应式业务后生成的 哪种类型的改变

[{type:patchFlag}]

const PatchFlags = {
    CLASS:1,
    TEXT:2,
    STYLE:4,
    // ...
    ELEMENT:8,
    COMPONENT:16
    // ...
}
patchFlag = 1 //0001
patchFlag = 2 //0010
if(patchFlag & PatchFlags.CLASS){//true
    if(oldProps.class!==newProps.class)
    {
        hotPatchProp(el,'class',null,newProps.class,isSVG)
    }
}else if(patchFlag & PatchFlags.STYLE){
    // 组件改变
}else if(shapeFlag & ShapeFlag.ELEMENT){
    //节点的改变
}