<template>
    <!-- 语义化标签 -->
    <section class="todoapp">
        <header class="header">
            <h1>todos</h1>
            <!-- 页面上有表单，让光标自动聚焦，不用再点一下
                事件绑定 v-bind:on  @ 修饰符
            -->
            <input 
                class="new-todo"
                autofocus
                autocomplete="off"
                placeholder="What needs to be done?"
                @keyup.enter="addTodo"
            >
        </header>
        <section class="main" v-show="todos.length">
            <!-- 在做逻辑是， vue 开发，要紧密关心数据和 -->
            <input 
                type="checkbox" 
                class="toggle-all" 
                id="toggle-all"
                :checked="allChecked"
            >
            <label for="toggle-all"></label>
            <ul class="todo-list">
                <TodoItem
                    v-for="(todo, index) in filterTodos"
                    :key="index"
                    :todo="todo"
                />
            </ul>
        </section>
        <footer class="footer" v-show="todos.length">
            <span class="todo-count">
                <strong>{{ remaining }}</strong>
            </span>
            <ul class="filters">
                <li v-for="(val, key) in filters">
                    <a 
                    :href="'#/' + key"
                    :class="{ selected: visibility === key}"
                    @click="visibility = key"
                    >{{key}}</a>
                </li>
            </ul>
        </footer>
    </section>
</template>

<script setup>
import TodoItem from './TodoItem.vue'
import { ref, computed } from 'vue'
// 组件可以使用的数据状态 私有响应式数据 ref  props 父组件提供的
// computed 来源 ref ,props , computed  / vuex|pinia  
// 数据混在一起了 vue  MVVM 
// all/active/complted   不同的done 
    // todoList  n todoItem  MVVM   filterTodos = todos 
    // tab visibility
    // 数据驱动界面
// 字符串的类型表达  todos.value.filter(todo.done  !todo.done   tdo)
// 枚举
const filters = {
    all : todos => todos,
    active: todos => todos.filter(todo => !todo.done),
    completed: todos => todos.filter(todo => todo.done)
}

const visibility = ref('all');  // change 
const todos = ref([
    {   id: 1,
        text: '吃饭',
        done: true
    },
    {   id: 2,
        text: '喝酒',
        done: false
    },
    {   id: 3,
        text: '圆梦之星',
        done: false
    }

]); // 容器 所有任务 store
const allChecked = computed(() => todos.value.every(todo => todo.done)); // computed  todos every 
const filterTodos = 
    computed(() => filters[visibility.value](todos.value)); // computed  todos + visibility
const remaining = computed(() => todos.value.filter(todo => !todo.done).length) // computed

const addTodo = (e) => {
    const text = e.target.value;
    if (text.trim()) {
        // vuex, action
        todos.value.push({text, done: false})
    }
    e.target.value = '';
}

</script>
<style scoped>

</style>




<!-- <template>
    <section class="todoapp">
        <header class="header">
            <h1>todos</h1>
             页面上有表单，让光标自动聚焦，不用再点一下
                事件绑定 相当于v-bind:on @修饰符
            
            <input type="text"
            class="new-todo"
            autofocus
            autocomplete="off"
            placeholder="what needs to be done"
            @keyup.enter="addTodo"
            >
        </header>
        <TodoItem/>
    </section>
</template>

<script setup>
    import TodoItem from './TodoItem.vue'
    // 组件可以使用的数据状态 ref私有数据，属于组件本身的 props父组件传过来的，不是自己的 computed 基于数据进行计算出来的，来源 ref，props computed / vuex | pinia
    // 数据混在一起了 
    // 这是一个最复杂的todos应用 vue MVVM
    // all/active/complted 不同的done
    // todoList -> n -> todoItem -> MVVM -> filterTodos = todos
    // tab切换 visibility
    // 数据驱动界面
    // 字符串的类型表达 todos.value.filter(todo.done !todo.done todo)
    // 声明一个枚举
    const filters = {
        all:todos =>todos,
        active: todos.filter(todo=>!todo.done),
        completed: todos=>todos.filter(todo=>todo.done)
    }
    const visibility = ref('all');// change事件
    const todos = ref([
        {
            id:1,
            text:'吃饭',
            done:false
        },
        {
            id:2,
            text:'喝酒',
            done:false
        },
        {
            id:3,
            text:'圆梦之星',
            done:false
        },
        {
            id:4,
            text:'刷题',
            done:false
        },
    ])// 容器 负责承载所有任务 store仓库
    const allChecked = computed(()=>todos.value.every(todo => todo.done));//computed 根据todos来算一下调用every
    const filterTodos = computed(()=>filters[visibility.value](todos.value)); //computed todos + visibility  它才是真男人
    const remaining=computed(()=>todos.value.filter(todo=>!todo.done).length) //computed
    const addTodo = (e)=>{
        const test = e.target.value;
        if(text.trim()){
            todos.value.push({text,done:false})
        }
        e.target.value = '';
    }
    import {ref , computed} from 'vue'
    
</script>

<style scoped>

</style> -->