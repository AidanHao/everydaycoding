<template>
  <nav>
    <!-- router-link 其实就是a标签  to表示要去的地址 -->
    <router-link to="/home">homddde</router-link>|
    <router-link to="/about">about</router-link>
  </nav>
  
  <!-- 路由窗口路由入口标签 vue 和 router配合工作 -->
  <!-- 所有写了router的文件就相当于搬到这里来写了↓ -->
  <router-view></router-view>
</template>

<style>
#app{
  text-align: center;
  font-size: 40px;
}
</style>