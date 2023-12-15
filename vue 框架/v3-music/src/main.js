import { createApp } from 'vue'
// 完成tailwind的初始化
import './tailwind.css'
// import './style.css'吗
import App from './App.vue'
import router from './router'

createApp(App)
.use(router)
.mount('#app')
