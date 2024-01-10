<template>
    <div>
        JMain
        <div v-for="user in users">
            <Item  :users="user"/>
        </div>
        
    </div>
</template>

<script setup>
    import {ref} from 'vue'
    import Item from './Item.vue'
    // 提供数据，做一个模型层
    let users = ref(['美羊羊','喜羊羊','沸羊羊'])
    setTimeout(()=>{
        users.value = [...users.value,'懒羊羊']
    },2000)
</script>

<style scoped>

</style>