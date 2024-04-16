<template>

    <div class="login">
        <h1>注册</h1>
        <div class="login-wrapper">
            <!-- <el-alert title="Error alert" type="error" /> -->
            <div class="avatar">
                <img src="../../public/img/login-avatar.jpg" alt="">
            </div>
            <div class="nickname-wrapper">
                <el-input v-model="state.nickname" style="width: 240px" placeholder="昵称" clearable />
            </div>
            <div class="input-wrapper">
                <el-input v-model="state.username" style="width: 240px" placeholder="账号" clearable />
            </div>
            <div class="password-wrapper">
                <el-input v-model="state.password" style="width: 240px" type="password" placeholder="请输入密码"
                    show-password clearable />
            </div>
            <div class="password-wrapper">
                <el-input v-model="state.repassword" style="width: 240px" type="password" placeholder="确认密码"
                    show-password clearable />
            </div>
            <div class="login-button">
                <el-button type="primary" plain @click="onSubmit">注册</el-button>
                <el-button type="danger" plain @click="loginoff">取消</el-button>
            </div>

        </div>

    </div>
</template>

<script setup>

import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { h } from 'vue'
import { ElMessage } from 'element-plus'

// 引入封装好的axios
import axios from '../api'

const router = useRouter()//路由
const state = reactive({//账号密码
    nickname: '',
    username: '',
    password: '',
    repassword: '',
})

//注册按钮
const onSubmit = async function () {
    if(state.nickname ==''){
        ElMessage({
            message: h('p', { style: 'line-height: 1; font-size: 14px' }, [
                h('span', null, ' 错误！ '),
                h('i', { style: 'color: red' },'用户名不能为空'),
            ]),
        })
    }else if(state.username == ''){
        ElMessage({
            message: h('p', { style: 'line-height: 1; font-size: 14px' }, [
                h('span', null, ' 错误！ '),
                h('i', { style: 'color: red' }, '账号不能为空'),
            ]),
        })
    }else if(state.password==''){
        ElMessage({
            message: h('p', { style: 'line-height: 1; font-size: 14px' }, [
                h('span', null, ' 错误！ '),
                h('i', { style: 'color: red' }, '密码不能为空'),
            ]),
        })
    }else if(state.repassword==''){
        ElMessage({
            message: h('p', { style: 'line-height: 1; font-size: 14px' }, [
                h('span', null, ' 错误！ '),
                h('i', { style: 'color: red' }, '请输入确认密码'),
            ]),
        })
    }else if(state.password !== state.repassword) {
        ElMessage({
            message: h('p', { style: 'line-height: 1; font-size: 14px' }, [
                h('span', null, ' 错误！ '),
                h('i', { style: 'color: red' }, '两次输入的密码不一致'),
            ]),
        })
    } else {
        // 发请求给后端
        const data = await axios.post('/register',{
            username: state.username,
            password: state.password,
            nickname: state.nickname,
        })
        ElMessage({
            message: h('p', { style: 'line-height: 1; font-size: 14px' }, [
                h('span', null, '恭喜你！ '),
                h('i', { style: 'color: teal' }, '注册成功'),
            ]),
        })
        // 注册完进入登录界面
        setTimeout(() => {
            router.push('/login')
        }, 1500);
    }
}

const loginoff = function () {
    router.push('/login')
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

        .nickname-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 10%;
            margin-bottom: 1rem;
        }

        .input-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
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
    }

}
</style>