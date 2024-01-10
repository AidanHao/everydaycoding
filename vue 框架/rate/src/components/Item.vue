<template>
    <div>
       大肥羊村:{{ users }}
    </div>
</template>

<script setup>
// defineProps api 获取父组件传过来的参数
import { defineProps } from 'vue';
 const {users} = defineProps(['users'])
</script>

<style scoped>

</style>