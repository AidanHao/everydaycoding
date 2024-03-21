// 来自于 facebook JS Way 不用学那么多 API
// react 哲学 能用JS表达的就不要用 API 
// 函数就是组件
// 返回一段template的旧式组件
// hooks
// 最简单的组件 数据和视图
import * as React from 'react'
import Hello from './hello'
import NameEditComponent from './nameEdit'
function App() {
  // 在react里面 reactive 提供了一个hooks函数
  // name 是状态的名字
  // setName 调用它可以修改值 响应式
  // 有点像ref  name.value
  // react 函数式
  const [name,setName] = React.useState('initialName')
  const obj = {a:1}  // model
  // HTMLInputElement <T> 相对于类型的传参
  const setUsernameState = (event:React.ChangeEvent<HTMLInputElement>)=>{
    setName(event.target.value)
  }

  // JS 在js里面写的是html react 
  // react 引入了 JSX 语法 是React 表示模板的创新写法 允许你在js里面写HTML
  // HTML 是表示 UI界面 最直接,最简单的方式

  return (
    // view
    // 文档碎片组件
    <>
      <div>
        APP
        {/* view model */}
        {obj.a}
        <Hello userName={name}/>
        <NameEditComponent userName ={name} onChange = {setUsernameState}/>
      </div>
    </>
  )
}
// 函数式编程
export default App
