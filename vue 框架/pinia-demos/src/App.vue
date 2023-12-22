<script setup>
// 以组件为开发单元
import  TodoList from './components/TodoList.vue' 
import {ref} from 'vue'
//const addTodo = () => {
//
//}
// const todos = ref([{
//   text:'haha'
// }]
// )
// todos 来到 vuex mapState pinia
import {useTodoStore} from './store/todo.js'
const {todos,addTodo} = useTodoStore()

// const todoStore = useTodoStore()
// console.log(todoStore.todos);
</script>

<template>
  <div>
    <TodoList 
    :todos="todos" 
    :addTodo="addTodo"/>
    <Item/>
    <Bang :title="作者榜" :items="authors"/>
  </div>
</template>

<style scoped>
</style>
