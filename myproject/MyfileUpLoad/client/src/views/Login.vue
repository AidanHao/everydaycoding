<template>

    <div class="login">
        <h1>登录</h1>
        <div class="login-wrapper">
            <div class="avatar">
                <img src="../../public/img/login-avatar.jpg" alt="">
            </div>
            <div class="input-wrapper">
                <el-input v-model="state.username" style="width: 240px" placeholder="账号" clearable />
            </div>
            <div class="password-wrapper">
                <el-input v-model="state.password" style="width: 240px" type="password" placeholder="请输入密码"
                    show-password clearable />
            </div>
            <div class="login-button">
                <el-button type="primary" plain @click="onSubmit">登录</el-button>
                <el-button type="danger" plain @click="loginoff">取消</el-button>
            </div>
            <p class="register" @click="register">新用户？点击这里注册</p>

        </div>

    </div>
</template>

<script setup>

import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { h } from 'vue'


// 引入封装好的axios
import axios from '../api'

const router = useRouter()//路由
const state = reactive({//账号密码
    username: '',
    password: '',
})

// 发送请求
const onSubmit = async () => {
    if (state.username == '') {
        ElMessage({
            message: h('p', { style: 'line-height: 1; font-size: 14px' }, [
                h('span', null, ' 错误！ '),
                h('i', { style: 'color: red' }, '账号不能为空'),
            ]),
        })
    } else if (state.password == '') {
        ElMessage({
            message: h('p', { style: 'line-height: 1; font-size: 14px' }, [
                h('span', null, ' 错误！ '),
                h('i', { style: 'color: red' }, '密码不能为空'),
            ]),
        })
    } else {
        // 将账号密码发送给后端
        // console.log(state.username, state.password);
        const res = await axios.post('/login', {
            username: state.username,
            password: state.password
        })
        // console.log(res);
        // 保存用户信息
        sessionStorage.setItem('userInfo', JSON.stringify(res.data))//使用json将对象转为字符串，存储在session当中，session只能存字符串
        router.push('first')
    }
}



const loginoff = function () {
    router.push('/first')
}

const register = function () {
    router.push('/register')
}
</script>

<style lang="less" scoped>
.login {
    width: 100vw;
    height: 100vh;
    background: url(../../public/img/log-bg.jpg);
    background-size: 100%;
    padding: 0 0.3rem;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;

    h1 {
        height: 5rem;
        text-align: center;
        margin-top: 5rem;
        font-size: 2rem;
    }

    .login-wrapper {
        background: url(../../public/img/log-bg2.jpg);
        background-size: cover;
        width: 30rem;
        height: 30rem;
        border: 1px solid rgba(187, 187, 187, 1);
        margin: 0 auto;
        border-radius: 0.3rem;
        box-shadow: 0 0 0.533rem 0 rgba(170, 170, 170, 1);
        position: relative;

        .avatar {
            width: 7rem;
            height: 7rem;
            overflow: hidden;
            border-radius: 50%;
            margin: 1rem auto 0.77rem;

            img {
                width: 100%;
            }
        }

        .input-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 10%;
            margin-bottom: 1rem;
        }

        .password-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 1rem;
        }

        .login-button {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .register {
            text-align: center;
            position: absolute;
            bottom: 1rem;
            left: 50%;
            transform: translate(-50%);
            color: rgb(255, 123, 0);
        }
    }

}
</style>