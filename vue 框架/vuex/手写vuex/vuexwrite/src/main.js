import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from './store/index'


// vue 需要保持自身的简单 把其他工作交给生态中的插件
// 聚焦于就提供mvvm 嫁接
// use
createApp(App)
.use(store)
.mount('#app')
