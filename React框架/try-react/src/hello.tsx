// UI 组件 连状态都没有 性能不需要更新
// store 

// 引入react的类
import * as React from "react";// FC 类型的声明
// 声明一个Props 接口
interface Props{
    userName:string
}

// ts 会严格校验
// function Component 声明是一个函数式组件 一定呀返回JSX
// props 参数对象
const Hello:React.FC<Props> = (Props)=>{
    return (
        <div>
            Hello Component
            <h1>{Props.userName}</h1>
        </div>
        
    )
}
export default Hello