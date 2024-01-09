<template>
    <div class="note-list">
        <ul v-if="state.noteList.length">
            <li v-for="item in state.noteList" :key="item.id" @click="goNoteDetail(item.id)">
                <div class="img">
                    <img :src="item.head_img" alt="">
                </div>
                <p class="time">{{ item.c_time }}</p>
                <p class="title">{{ item.title }}</p>
            </li>
        </ul>
        <p class="empty" v-else>当前分类下还没有文章哦</p>
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
// onMounted(()=>{
//     // console.log('onMounted',document.querySelector('.note-list') );
//     //页面加载中发请求，拿到当前分类的数据
    
// })
// // 卸载的时候一般会干一些清除定时器的操作

// onUnmounted(()=>{
//     console.log('卸载');
// })

// updata有点类似computed监听器一样


import { onMounted,reactive } from 'vue';
// useRoute 是vue封装的当前路由的详情，更加方便获取参数router包含了route
import {useRouter,useRoute} from 'vue-router'
import axios  from '../api';
// import { reactive } from 'vue';//引入数据源

const router = useRouter()
const route = useRoute()//当前路由详情
// console.log(router);//_value表示这个属性是私有的属性
// console.log(router.currentRoute.value);
// console.log(route.query.title);
const state = reactive({
    noteList:[]
})


// await放在全局是可以的因为setup已经给你封装好了
onMounted(async()=>{
    //页面加载中发请求，拿到当前分类的数据
    const {data} = await axios.post('/findNoteListByType',{
        note_type:route.query.title
    })
    // console.log(data);
     state.noteList = data
    
})
const goNoteDetail = (id)=>{
    // 最好再向后端请求一下数据
    router.push({
        path:'/noteDetail',
        query:{
            id
        }
    })
}

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
                height: 4rem;
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
    .empty{
        color: rgb(7, 206, 241);
    }
}
</style>