<template>
    <div>
      <div class="head">
        <!-- v-model 双向数据绑定 -->
        <input type="text" v-model="message">
        <button @click="submit">确定</button>
      </div>
      <!-- 把数据传给子组件 -->
      <list :lists="lists"/>
    </div>
  </template>
  
  <script>
//   引入分三步，引入，再注册
    import list from '@/components/body1/List.vue'//引入
    export default {
        components:{
            list//注册
        },
      data(){
        return {
          lists:['html','css'],
          message:''
  
        }
      },
      watch:{
        lists(newVal){
            console.log(newVal);
        }
      },
      methods:{
        submit(){
          if(!this.message)return
          this.lists.push(this.message)
          this.message = ''
          
        }
      }
    }
  </script>
  
  <style lang="css" scoped>
  
  </style>
  