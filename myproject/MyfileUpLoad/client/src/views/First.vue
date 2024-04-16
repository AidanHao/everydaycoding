<template>
    <div class="first">
        <el-carousel :interval="4000" type="card" height='15rem'  autoplay>
            <el-carousel-item v-for="item in 4" :key="item">
                <h3 text="2xl" justify="center"></h3>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script setup>
// 引入封装好的axios
import axios from '../api'
const handle = async () => {
    // 将账号密码发送给后端
    const res = await axios.post('/login')

}



</script>

<style lang="less" scoped>
.first {
    width: 100%;
    height: 100%;
    // margin-top: -20px;

    // background-color: red;
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
        background-size:100% 100% ;
    }

    .el-carousel__item:nth-child(2) {
        background-color: #99a9bf;
        background: url(../../public/swiper/swiper2.jpg);
        background-size:100% 100% ;

    }
    .el-carousel__item:nth-child(3) {
        background-color: #99a9bf;
        background: url(../../public/swiper/swiper3.jpg);
        background-size:100% 100% ;
    }
    .el-carousel__item:nth-child(4) {
        background-color: #99a9bf;
        background: url(../../public/swiper/swiper4.jpg);
        background-size:100% 100% ;
    }
    
}
</style>