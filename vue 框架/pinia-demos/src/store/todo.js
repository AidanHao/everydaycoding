// todo 数据管理模块 state actions
import { ref } from 'vue'
import {defineStore} from 'pinia';
// vue3.0 hook 函数
//定义一个参数
export const useTodoStore = defineStore("todo",() => {
    // 定义了一个响应式数据ref
    const todos = ref([
        {txt :'年前脱单',}
    ])
    const addTodo = () =>{
        todos.value.push({txt: '吃饭'})
    }
    return {
        todos,
        addTodo,
    }
})