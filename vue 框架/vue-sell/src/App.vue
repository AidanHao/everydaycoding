<template>
  <v-header/>
  <router-view/>
</template>
<script>
import Header from '@/components/header/Header.vue'
export default{
  // 先声明一下
  components:{
    'v-header': Header
  }
}
</script>


<style lang="less">


</style>
