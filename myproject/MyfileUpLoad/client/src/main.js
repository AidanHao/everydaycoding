

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//初始化样式
import './assets/style/reset.css'

// 导入ui库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
const pinia = createPinia()

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(pinia)

app.mount('#app')
