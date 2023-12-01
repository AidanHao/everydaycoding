<!-- View -->
<template>
    <div>
        JMain
        <div v-for="user in users">
            <Item :user = "user"/>
        </div>
        
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Item from './Item.vue'
//提供数据，模型
// 模型层
let users = ref([])
setTimeout(() => {
    // 数据响应式
    // ref语法的用法
    users.value = [...users.value, 'Yiko',]
}, 2000);
fetch('https://k9gtiz.laf.run/add-todo')
.then(res => res.json())
.then(data=>{
    users.value=data.data.map(item => item.txt)
})
</script>

<style  scoped>

</style>