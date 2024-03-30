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
                <text>简单地用父子组件传参，传方法实现了一个自己写的弹窗</text>
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
    background-color: rgba(187, 187, 187, 1);
    opacity: 0.5;
    z-index: 1;

    .newshow {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
        opacity: 1;
        background-color: #fff;
        width: 30rem;
        height: 30rem;
        border: 1px solid rgba(187, 187, 187, 1);
        margin: 0 auto;
        border-radius: 0.3rem;
        box-shadow: 0 0 0.533rem 0 rgb(37, 37, 37);

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