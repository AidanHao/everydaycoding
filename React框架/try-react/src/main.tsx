import React from 'react'
// DOM操作 单独位ReactDOM提供
import ReactDOM from 'react-dom/client'
// 根组件 .vue -> .tsx   .jsx -> tsx  template 放在函数里面 , JSX
import App from './App.tsx'
// 外部样式 交给vite 一切资源皆可打包
import './index.css'

// 创建一个根节点，把挂载点加载进来
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
