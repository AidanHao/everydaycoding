import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from './router/index.js'
// 1. 引入你需要的组件
import { Form, Field, CellGroup,Button } from 'vant';
import { ActionBar, ActionBarIcon, ActionBarButton,NoticeBar, Swipe, SwipeItem,Search,Slider,Signature   } from 'vant';
// 2. 引入组件样式
import 'vant/lib/index.css';
const app = createApp(App)

// 3. 注册你需要的组件
app.use(Button)
app.use(Form);
app.use(Field);
app.use(CellGroup);

app.use(ActionBar);
app.use(ActionBarIcon);
app.use(ActionBarButton);
app.use(NoticeBar);
app.use(Swipe);
app.use(SwipeItem);
app.use(Search);
app.use(Slider);
app.use(Signature);

app.use(router)
app.mount('#app')
