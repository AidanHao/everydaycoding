<template>
    <div class="newlogin">
        <div class="newshow">
            <div class="newshow-title">
                <h1>简介</h1>
                <hr>
                <text>{{ showNewJoin }}</text>
                <hr>
            </div>
            <div class="newshow-desc">
                <p>日志</p>
                <br>
                <p>2024.4.15实现基本的登录注册功能</p>
                <br>
                <p>1. Echart可视化模型</p>
                <br>
                <p>2. 文件上传切片</p>


                

            </div>
            <div class="newshow-btn">
                <el-button type="danger" round @click="closeNewJoin">关闭</el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
// defineProps已经内嵌可以不用引入了
// import { defineProps } from 'vue'
const props = defineProps({
    showNewJoin: {
        type: Boolean
    },
    Show: {
        type: Function
    }
})
const closeNewJoin = () => {
    console.log('你好');
    props.Show(props.showNewJoin)
}
</script>

<style lang="less" scoped>
.newlogin {
    width: 100vw;
    height: 100vh;
    position: absolute;
    background-color: rgba(187, 187, 187, 0.5);
    z-index: 100;

    .newshow {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 101;
        background-color: #fff;
        width: 30rem;
        height: 30rem;
        border: 1px solid rgba(187, 187, 187, 1);
        margin: 0 auto;
        border-radius: 0.3rem;
        box-shadow: 0 0 0.533rem 0 rgb(134, 134, 134);

        .newshow-title {
            text-align: center;
            margin-top: 1rem;
            font-size: 30px;
        }
        .newshow-desc{
            text-align: center
        }

        .newshow-btn {
            position: absolute;
            left: 50%;
            bottom: 0;
            text-align: center;
            transform: translate(-50%, -50%);
        }
    }

}
</style>