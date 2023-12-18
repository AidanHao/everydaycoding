<template>
    <div>
        <div class="body">
        <ul>
          <li v-for="(item,index) in lists" :key="index">{{ item }}</li>
        </ul>
      </div>
      <!-- 修改props -->
      <button @click="changeProps">修改props</button>
    </div>
</template>

<script>
    export default {
        // 接收父组件传给来的值
        props:['lists'],
        data(){
            return {}
        },
        methods:{
            changeProps(){
                this.lists[0] = 'HTML'//vue2会有警告，这个写法官方不建议
            }
        }
    }
</script>

<style lang="css" scoped>

</style>