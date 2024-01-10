<!-- App.vue -->
<script setup>
//这里就是子组件的引入
import JHead from './components/Jhead.vue'
import JMain from './components/JMain.vue'
import JSide from './components/JSide.vue'
import JAdver from './components/JAdver.vue'
import Item from './components/Item.vue'
</script>

<template>
  <!-- 子组件的使用 -->
  <div class="header">
    <JHead/>
  </div>
  <div class="body">
    <div class="aside"><JSide /></div>

    <div class="main"><JMain /></div>
    
    <div class="right"><JAdver /></div>
  </div>
</template>

<style scoped>

</style>
