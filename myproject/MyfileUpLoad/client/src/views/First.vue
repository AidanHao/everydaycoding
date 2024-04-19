<template>
    <div class="first">
        <!-- 轮播图 -->
        <div class="first-headbox">
            <div class="first-swiper">
                <el-carousel :interval="3000" type="card" height='10rem' autoplay>
                    <el-carousel-item v-for="item in 4" :key="item">
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="first-other">

            </div>

        </div>
        <!-- 用户信息 -->
        <div class="first-userinfo">
            <el-descriptions title="用户信息" border>
                <el-descriptions-item label="昵称">{{ state.nickname }}</el-descriptions-item>
                <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
                <el-descriptions-item label="地址">Suzhou</el-descriptions-item>
                <el-descriptions-item label="用户权限">
                    <el-tag size="small">{{ state.userpower }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="访问时间">{{ state.logintime }}</el-descriptions-item>
            </el-descriptions>
        </div>
    </div>
</template>

<script setup>
//引入计算函数
import convertMillisToDate from '../util/datecompute/index.js'
// 引入pinia
import { onBeforeMount, reactive } from 'vue';
import { userStore } from '../store'
import { storeToRefs } from 'pinia'
// 引入封装好的axios
import axios from '../api'
const store = userStore()
// 解构拿到数据
const { nickname, islogin } = storeToRefs(store)

const state = reactive({
    nickname: nickname.value,
    logintime: '',
    userpower: '普通用户'
})

// 拿到当前登录时间
state.logintime = convertMillisToDate(Date.now())

// 在转载阶段发送请求
onBeforeMount(async () => {
    const res = await axios.post('/first')
    console.log(res);
    state.nickname = res.data.nickname
    state.userpower = res.data.userpower == 'admin' ? '管理员' : '普通用户'
})


</script>

<style lang="less" scoped>
.first {
    width: 100%;
    height: 100%;

    // margin-top: -20px;
    .first-headbox {
        width: 100%;
        height: 10%;

        .first-swiper {
            width: 50%;
            height: 10%;
            position: relative;

            .el-carousel__item h3 {
                color: #475669;
                opacity: 0.75;
                line-height: 200px;
                margin: 0;
                text-align: center;
            }

            .el-carousel__item:nth-child(1) {
                background-color: #99a9bf;
                background: url(../../public/swiper/swiper1.jpg);
                background-size: 100% 100%;
            }

            .el-carousel__item:nth-child(2) {
                background-color: #99a9bf;
                background: url(../../public/swiper/swiper2.jpg);
                background-size: 100% 100%;

            }

            .el-carousel__item:nth-child(3) {
                background-color: #99a9bf;
                background: url(../../public/swiper/swiper3.jpg);
                background-size: 100% 100%;
            }

            .el-carousel__item:nth-child(4) {
                background-color: #99a9bf;
                background: url(../../public/swiper/swiper4.jpg);
                background-size: 100% 100%;
            }
        }
        .first-other{
        height: 10%;
        width: 100%;
    }

    }



    .first-userinfo {
        margin-top: 8rem;
    }

}
</style>