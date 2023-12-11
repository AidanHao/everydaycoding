
<template>
    <!-- 给项目带来图标 开源项目 -->
    <!-- Component 是vue组件的声明方式  (声明我是组件)Component + is "组件" is等待你传组件 等待被别人入侵式的组件声明方式 -->
    <Component :is="icon" :theme="theme" :size="size" :spin="spin" :fill="fill" :strokeLinecap="strokeLinecap"
               :strokeLinejoin="strokeLinejoin" :strokeWidth="strokeWidth"/>
  </template>
  
  <script setup >
//   定义父组件传过来的参数
  import { defineProps } from 'vue'; //可以不引入
//  子组件使用父组件传过来的props 先声明了才能用 为了安全
  defineProps(['icon', 'theme', 'size', 'spin', 'fill', 'strokeLinecap', 'strokeLinejoin', 'strokeWidth'])
  </script>