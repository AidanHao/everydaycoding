<template>
    <ElScrollbar>
    <!-- element-plus 用户体验的直觉 滚动的列表，详情页 -->
        <div class="mt-10 pl-6 pr-6 space-y-1.5" v-for="menuItem in menus">
            <div class="menu-title text-main">{{ menuItem.name }}</div>
            <div class="menu-item hover-bg-main text-main"
            v-for="menu in menuItem.menus"
            :key="menu.key"
            :class="{'active':currentKey === menu.key}"
            @click="changeMenu(menu)"
            >
            <!-- 动态绑定 -->
            <!-- "menu.icon"每个menu icon 的数据 -->
            <!-- :icon:"menu.icon" -->
            <!-- 为什么size不需要加冒号，因为它不要执行js -->
            <!-- 是属性 -->
            <IconPark :icon="menu.icon" size="18" :theme="menu.theme"/>
            <span class="ml-1">{{ menu.name }}</span>

            </div>
        </div>

    
</ElScrollbar>
</template>

<script setup>

import IconPark from '@/components/common/IconPark.vue'
// 模块化 hooks 编程 
// 让数据分离 离开组件，一旦分离，组件就很好读
// 固定的范式 use 开头 函数式编程
// 引入的时候要解构
import {useMenu} from './useMenu.js'
const { menus,currentKey,changeMenu} = useMenu()

// import {ref} from 'vue'
// npm i @icon-park/vue-next 安装模型库
// 里面定义了导入哪些图标
// import {Planet, Music, VideoOne, Fm, Like, Computer, DownloadThree, PlayTwo} from '@icon-park/vue-next';

// 解构图标并且加入对象
// import IconPark from '@/components/common/IconPark.vue'
// let currentKey = ref('discover')

// const changeMenu = (menu)=>{
//     currentKey.value = menu.key
// }

//     const menus = ref([
//         {
//             name: "在线音乐",
//             menus: [
//                 {
//                     name: "推荐",
//                     key: "discover",
//                     icon: Planet,
//                     theme: 'outline',
//                 },
//                 {
//                     name: "音乐馆",
//                     key: "music",
//                     icon: Music,
//                     theme: 'outline',
//                 },
//                 {
//                     name: "视频",
//                     key: "video",
//                     icon: VideoOne,
//                     theme: 'outline',
//                 },
//                 {
//                     name: "电台",
//                     key: "dj",
//                     icon: Fm,
//                     theme: 'outline',
//                 },
//             ]
//         },
//         {
//             name: "我的音乐",
//             menus: [
//                 {
//                     name: "我喜欢",
//                     key: "love",
//                     icon: Like,
//                     theme: 'outline',
//                 },
//                 {
//                     name: "本地歌曲",
//                     key: "local",
//                     icon: Computer,
//                     theme: 'outline',
//                 },
//                 {
//                     name: "下载歌曲",
//                     key: "download",
//                     icon: DownloadThree,
//                     theme: 'outline',
//                 },
//                 {
//                     name: "最近播放",
//                     key: "recently",
//                     icon: PlayTwo,
//                     theme: 'outline'
//                 },
//             ]
//         }
//     ])

</script>

<style scoped>
/* 将一些类集合起来 */
/* 谁具有这些属性就会具有里面包括的属性 */
    .menu-title{
        @apply text-xs pl-4 pr-4 pb-2;
    }
    .menu-item{
        @apply text-sm pl-4 pr-4 pt-1.5 pb-1.5 rounded cursor-pointer transition-colors flex items-center
    }
    /* 谁具有.active属性就会具有下面的属性 */
    .active{
        /* gradient渐变色 */
        @apply bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-50 cursor-default
    }
</style>