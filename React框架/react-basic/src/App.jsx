

import React from 'react'
import ExitComponent from './components/ExitComponent';
import ClassComponent from './components/ClassComponent';

function HelloReact(){
    const handler = (e)=>{
        console.log('按钮被点击',e);
    }

    return (
        <div>
            <p>这是一个函数组件</p>
            {/* React 都是on + 事件名 首字母要大写 */}
            <button onClick={handler}>click</button>
        </div>
    )
}

// 类组件要继承React.Component 要先引入react
class HelloVue extends React.Component{
    render(){
        return (
            <div>
                这是一个类组件  
            </div>
            
        )
    }
}


function App(){
    return (
        <div className="app">
            {/* 函数式组件必须要大写，组件的首字母一定要大写 */}
            <HelloReact></HelloReact>
            <HelloVue />
            {
                HelloReact()
            }
            <hr />
            <ExitComponent></ExitComponent>
            <ClassComponent/>
        </div>
    )
}

export default App