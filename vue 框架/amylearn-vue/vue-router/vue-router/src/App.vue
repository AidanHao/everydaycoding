<script setup>

</script>

<template>
  <nav>
    <!-- 这个就是a标签 -->
    <router-link to="/home">首页</router-link>|
    <router-link to="/about">关于</router-link>
  </nav>

    <!-- 路由的入口 -->
  <!-- 相当于路由的内容都放在这个里面 -->
  <router-view></router-view>

</template>

<style scoped>
.app{
  text-align: center;
  font-size: 40px;
}
  </style>
