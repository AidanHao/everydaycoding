<template>
    首页
    <!-- 子路由 -->
    
    <nav>
        <!-- 相当于a标签 -->
        <!-- to一定要补全 -->
        <router-link to="/home/newest">最新</router-link>|
        <router-link to="/home/recommend">推荐</router-link>

    </nav>
    <!-- 添加入口 -->
    <router-view></router-view>
</template>