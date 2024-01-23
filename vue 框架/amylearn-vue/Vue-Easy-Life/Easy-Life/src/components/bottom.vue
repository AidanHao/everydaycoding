<template>
    <div class="bottom">
        <div class="text">
            <div class="iconfont icon-home"></div>
            
            <div>首页</div>
        </div>
        <div class="text">
            <div class="iconfont icon-wode"></div>
            <div class="">我的</div>
        </div>
    </div>
    <div class="box">

    </div>
</template>

<script setup>

</script>

<style lang="less" scoped>

.bottom{
    width: 100vw;
    height: 4.2rem;
    color: black;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.2rem;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1000;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    .text{
        height: 2rem;
        width: 2rem;
        font-size: 0.8rem;
        padding: 0 4.5rem;
        color: #8a8a8a;
        text-align: center;
        padding-bottom: 10px;
        .iconfont{
            font-size: 2rem;
            margin-right: 0.5rem;
            padding-bottom: 2px;
        }
        }
    }
</style>