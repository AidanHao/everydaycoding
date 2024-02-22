<template>
    <!-- vue自带的组件 -->
    <component :is="component"></component>
</template>

<script setup>
import {computed} from 'vue'
import {useRouter} from '../myRouter/index.js'

const router = useRouter() //在当前组件注入了router
console.log(router)
    const component = computed(()=>{
        // 找到对应路径的path返回相应的组件 组件映射关系
        // 如果当前url是'/'就返回Home.vue
        const route = router.routes.find((route)=>{
            return route.path === router.current.value

        })
        return route ? route.component :null
    })
</script>
