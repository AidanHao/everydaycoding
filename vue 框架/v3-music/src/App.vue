<script setup>
  // import {onMounted} from 'vue'
  // import Menu from './components/layout/menu/Menu.vue';
  import Menu from '@/components/layout/menu/Menu.vue';
  import Header from '@/components/layout/header/Header.vue';
  import Discover from '@/views/discover/Discover.vue';
  // // 为什么解构要{} 因为传过来的时候是一个对象
  // import {getBanner} from '@/utils/api'
  // // 一个页面发送请求，会阻塞，
  // // 请求发送的时机在何时？
  // onMounted(async ()=>{
  //   const data = await getBanner();
  //   console.log(data);
  // })
</script>

<template>
  
  <router-view/>
</template>

<style scoped>
</style>
