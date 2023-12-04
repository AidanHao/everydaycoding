import { createApp } from 'vue'
// 以对象的形式读取到
import App from './App.vue'
// import router from './router/index.js'
// 可以省略index.js 默认找它
import router from './router'

// use(router)让router先生效再挂载
createApp(App).use(router).mount('#app')
