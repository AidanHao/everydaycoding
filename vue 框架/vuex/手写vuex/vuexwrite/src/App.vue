<script setup>
import {computed} from 'vue'
// hooks编程   还有一个,mapState拿到单一状态树
import {useStore} from './store/gvuex'
const store = useStore()
// 因为数据不是本地的数据，不能用ref和reactive 用computed比较合适
let count = computed(()=>store.state.count)
let double = computed(()=>store.getters.double)

function add(){
  store.commit('add')//store是一个单例对象，commit是这个对象的方法
}

function asyncAdd(){
  store.dispatch('asyncAdd')
}

</script>

<template>
<div>
  {{ count }} * 2 = {{ double }}
  <br>
  <button @click="asyncAdd">async add</button>
  <button @click="add">add</button>
</div>
</template>

<style scoped>
</style>
