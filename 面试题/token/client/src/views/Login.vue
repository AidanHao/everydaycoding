<template>
  <div id="max">
  <div id="box">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  // import axios from 'axios'
  import {login} from '../api/user.js'
  import {useRouter} from 'vue-router'
  
  const router = useRouter()

  const username = ref('')
  const password = ref('')
  
  const onSubmit = (values) => {
    // console.log(values);
    // 发请求
    // axios第二个参数一定要是一个对象
    // axios.post('http://localhost:3000/login',values)
    // .then((res)=>{
    //     console.log(res.data.token);// res就是后端给我们返回的结果
    //     localStorage.setItem('token',res.data.token);
    //     router.push('/home')
    // })

    login(values).then((res)=>{
      console.log(res);
      localStorage.setItem('token',res.token);
      router.push('/home')
      // window.location.href = '/home'
    })
  }
  </script>
  
  <style lang="css" scoped>
  #max{
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  </style>