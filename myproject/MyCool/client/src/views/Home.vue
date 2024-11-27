<template>
    <div class="Home">
        <div class="Home_Welcome">
        </div>
        <div class="Home_Introduce">
        </div>
        <div class="Home_Last">
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="less" scoped>
.Home {
    width: 100%;
    height: 100%;
    .Home_Welcome {
        height: 100%;
        width: 100%;
        background: url(../../public/你的名字.jpg);
        background-size:cover;
        background-color: rgba(104, 104, 99);
    }
    .Home_Introduce {
        height: 100%;
        width: 100%;
        background-color: rgb(119, 178, 161);
    }
    .Home_Last{
        height: 100%;
        width: 100%;
        background: url(../../public/木鱼.jpg);
        background-size:cover;
    }
}
</style>