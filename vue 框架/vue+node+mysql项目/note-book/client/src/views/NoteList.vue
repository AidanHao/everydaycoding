<template>
    <div class="note-list">
        <ul>
            <li>
                <div class="img">
                    <img src="https://tx-free-imgs2.acfun.cn/kimg/EJjM1y8qPQoFYWNmdW4SBWltYWdlGi02OTc0NDIyNF9jYWMxNThjZmVkMTQ0NWU3ODZiNmZjOGJmZmQ4ODY1Zi5wbmc.png" alt="">
                </div>
                <p class="time">2023/05/20</p>
                <p class="title">今天去吃了猪脚饭</p>
            </li>
            <li>
                <div class="img">
                    <img src="https://tx-free-imgs2.acfun.cn/kimg/EJjM1y8qPQoFYWNmdW4SBWltYWdlGi02OTc0NDIyNF9jYWMxNThjZmVkMTQ0NWU3ODZiNmZjOGJmZmQ4ODY1Zi5wbmc.png" alt="">
                </div>
                <p class="time">2023/05/20</p>
                <p class="title">今天去吃了猪脚饭啊啊啊啊啊啊啊啊啊啊</p>
            </li>
            <li>
                <div class="img">
                    <img src="https://tx-free-imgs2.acfun.cn/kimg/EJjM1y8qPQoFYWNmdW4SBWltYWdlGi02OTc0NDIyNF9jYWMxNThjZmVkMTQ0NWU3ODZiNmZjOGJmZmQ4ODY1Zi5wbmc.png" alt="">
                </div>
                <p class="time">2023/05/20</p>
                <p class="title">今天去吃了猪脚饭</p>
            </li>
        </ul>
    </div>
</template>

<script setup>
// 页面加载中 发请求 拿到当前分类的数据 来到第二个页面的时候发请求
// 在vue 里面有一些生命周期
// template必须由vue编译完才能去挂载 

// 接口请求想放哪就放哪，一般可以再onMounted 因为有一些数据可能要影响Dom结构 
// 先编译再执行 再挂载
// console.log('hello',document.querySelector('.note-list'));
// import { onBeforeMount,onMounted,onUnmounted } from 'vue'
// onBeforeMount(()=>{
//     console.log('onBeforeMount');
// })
onMounted(()=>{
    // console.log('onMounted',document.querySelector('.note-list') );
    //页面加载中发请求，拿到当前分类的数据
    
})
// // 卸载的时候一般会干一些清除定时器的操作

// onUnmounted(()=>{
//     console.log('卸载');
// })

// updata有点类似computed监听器一样
</script>

<style lang="less" scoped>
.note-list{
    width: 100%;
    box-sizing: border-box;
    padding: 1rem 0.667rem 0;//rem会根据根字体进行变化
    ul{
        // display: flex;
        // width: 8rem;
        // justify-content:space-between;

        // flex-wrap: wrap;
        // overflow: hidden;

        display: grid;//网格布局
        grid-template-columns: 1fr 1fr;//这个是列
        grid-gap: 50px;//设置每一列的宽度
        li{
            // width: 50%;
            // padding: 0 10px 0 10px;
            // box-sizing: border-box;//把内边距算到自己的宽度里面
            // float: left;

            img{
                width: 100%;
                // width: 2rem;
                border-radius: 0.27;
            }
            .time{
                font-size: 0.37rem;
                color: rgba(16, 16, 16, 1);
                margin: 10px 0 5px 0;
            }
            .title{
                width: 3.5rem;
                font-size: 0.37rem;
                color: rgba(16, 16, 16, 1);
                // 超出部分变为...
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;    
            }
        }
    }
}
</style>