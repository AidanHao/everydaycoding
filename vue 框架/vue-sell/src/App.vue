<template>
  <v-header/>
  <router-view/>
</template>

<script>
import Header from '@/components/header/Header.vue'
import {getSeller} from '@/api'
export default{
  // 先声明一下
  components:{
    'v-header': Header
  },
  // ajax 最原始xml http request  然后是fetch  然后是
  //使用axios 它是一个库,是为了实现某一个功能 需要上线所以要加-S --save
  //需要把异步处理成同步 
  //created 叫做生命周期
  //我们对axios做一个统一封装
  created(){
    getSeller().then(res=>{
      console.log(res);
    })
  }
}
</script>


<style lang="less">


</style>
