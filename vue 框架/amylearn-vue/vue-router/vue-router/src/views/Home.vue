<template>
    <div>
        <router-link to="/home/newest">最新</router-link>|
        <router-link to="/home/recommend">推荐</router-link>
        <!-- 子路由入口 -->
        <router-view></router-view>
    </div>
</template>