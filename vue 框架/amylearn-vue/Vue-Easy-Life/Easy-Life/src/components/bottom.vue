<template>
    <div class="bottom">
        <div class="text index" @click="toLife" :style="`color: ${fontColor1};`">
            <div class="iconfont icon-home"></div>
            
            <div>首页</div>
        </div>
        <div class="text mine " @click="toMine" :style="`color: ${fontColor2};`">
            <div class="iconfont icon-wode"></div>
            <div class="">我的</div>
        </div>
    </div>
    <div class="box">

    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'
const router = useRouter()

// 定义的颜色
const fontColor1 = ref('#8a8a8a')
const fontColor2 = ref('#8a8a8a')

 // const url = window.location.pathname
// console.log(url);

// 点击首页
const toLife = () => {
    router.push('/index/life')
    fontColor1.value = '#5C78FF'
    fontColor2.value = '#8a8a8a'
}
// 点击我的
const toMine = () =>{
    router.push('/index/mine')
    fontColor1.value = '#8a8a8a'
    fontColor2.value = '#5C78FF'
}


// 改变颜色的方法
const changecolor = ()=>{
    if(window.location.pathname=='/index/life'){
        fontColor1.value = '#5C78FF'
        fontColor2.value = '#8a8a8a'
    }else if(window.location.pathname=='/index/mine'){
        fontColor1.value = '#8a8a8a'
        fontColor2.value = '#5C78FF'
    }
}

// 装载页面
onMounted(()=>{
    changecolor()
})

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
        // color: #8a8a8a;
        // color:#5C78FF;
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