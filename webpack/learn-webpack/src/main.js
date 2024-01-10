// import {add} from './tools/add.js'
// import './style/index.css'
// // 我们想要通过某种手段将这种浏览器读不懂的语法转换为浏览器读得懂的语法


// // 假设main.js是总起的js文件，把其他工具js放在外面再引入使用
// console.log(add(1,2));
// console.log('hello');

import {createApp} from 'vue'
import App from './App.vue'
createApp(App).mount('#app')