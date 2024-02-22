<template>
    <div class="index-all">
        <Header />
        <router-view></router-view>
        <Bottom />
    </div>
</template>

<script setup>
import Header from '@/components/header.vue'
import Bottom from '@/components/bottom.vue'

</script>

<style lang="less" scoped>
.index-all {
    background: #F2F2F2;
}
</style>